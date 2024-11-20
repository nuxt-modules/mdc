import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import { parseFrontMatter } from 'remark-mdc'
import type { Options as VFileOptions } from 'vfile'
import { defu } from 'defu'
import type { MdcConfig, MDCData, MDCElement, MDCParseOptions, MDCParserResult, MDCRoot, Toc } from '@nuxtjs/mdc'
import { nodeTextContent } from '../utils/node'
import { useProcessorPlugins } from './utils/plugins'
import { defaults } from './options'
import { generateToc } from './toc'
import { compileHast } from './compiler'

let moduleOptions: Partial<typeof import('#mdc-imports')> | undefined
let generatedMdcConfigs: MdcConfig[] | undefined

export const createProcessor = async (inlineOptions: MDCParseOptions = {}) => {
  if (!moduleOptions) {
    moduleOptions = await import('#mdc-imports' /* @vite-ignore */).catch(() => ({}))
  }
  if (!generatedMdcConfigs) {
    generatedMdcConfigs = await import('#mdc-configs' /* @vite-ignore */)
      .then(r => r.getMdcConfigs())
      .catch(() => ([]))
  }

  const mdcConfigs = [
    ...generatedMdcConfigs || [],
    ...(inlineOptions.configs || [])
  ]

  // TODO: remove the passing in @nuxt/content and then we could remove this line
  if (inlineOptions.highlight != null && inlineOptions.highlight != false && inlineOptions.highlight.highlighter !== undefined && typeof inlineOptions.highlight.highlighter !== 'function') {
    // eslint-disable-next-line nuxt/prefer-import-meta
    if (process.dev)
      console.warn('[@nuxtjs/mdc] `highlighter` passed to `parseMarkdown` is should be a function, but got ' + JSON.stringify(inlineOptions.highlight.highlighter) + ', ignored.')
    inlineOptions = {
      ...inlineOptions,
      highlight: {
        ...inlineOptions.highlight
      }
    }
    delete (inlineOptions.highlight as any).highlighter
  }

  const options = defu(inlineOptions, {
    remark: { plugins: moduleOptions?.remarkPlugins },
    rehype: { plugins: moduleOptions?.rehypePlugins },
    highlight: moduleOptions?.highlight
  }, defaults) as MDCParseOptions

  if (options.rehype?.plugins?.highlight) {
    options.rehype.plugins.highlight.options = {
      ...(options.rehype.plugins.highlight.options || {}),
      ...(options.highlight || {})
    }
  }

  let processor = unified()

  // mdc.config.ts hooks
  for (const config of mdcConfigs) {
    processor = await config.unified?.pre?.(processor) || processor
  }

  // Use `remark-parse` plugin to parse markdown input
  processor.use(remarkParse as any)

  // mdc.config.ts hooks
  for (const config of mdcConfigs) {
    processor = await config.unified?.remark?.(processor) || processor
  }

  // Apply custom plugins to extend remark capabilities
  await useProcessorPlugins(processor as any, options.remark?.plugins)

  // Turns markdown into HTML to support rehype
  processor.use(remark2rehype as any, (options.rehype as any)?.options)

  // mdc.config.ts hooks
  for (const config of mdcConfigs) {
    processor = await config.unified?.rehype?.(processor) || processor
  }

  // Apply custom plugins to extend rehype capabilities
  await useProcessorPlugins(processor as any, options.rehype?.plugins)

  // Apply compiler
  processor.use(compileHast, options)

  // mdc.config.ts hooks
  for (const config of mdcConfigs) {
    processor = await config.unified?.post?.(processor) || processor
  }

  return {
    processor,
    parser: async function parse(md: string, { fileOptions }: { fileOptions?: VFileOptions } = {}): Promise<MDCParserResult> {
      // Extract front matter data
      const { content, data: frontmatter } = await parseFrontMatter(md)

      // Start processing stream
      const processedFile = await processor.process({ ...fileOptions, value: content, data: frontmatter })

      const result = processedFile.result as { body: MDCRoot, excerpt: MDCRoot | undefined }

      // Update data with processor data
      const data: MDCData = Object.assign(
        contentHeading(result.body),
        frontmatter,
        processedFile?.data || {}
      )

      // Generate toc if it is not disabled in front-matter
      let toc: Toc | undefined
      if (data.toc !== false) {
        const tocOption = defu(data.toc || {}, options.toc)
        toc = generateToc(result.body, tocOption)
      }

      return {
        data,
        body: result.body,
        excerpt: result.excerpt,
        toc
      }
    }
  }
}

export const createMarkdownParser = async (inlineOptions: MDCParseOptions = {}) => (await createProcessor(inlineOptions)).parser

export const parseMarkdown = async (md: string, markdownParserOptions: MDCParseOptions = {}, parseOptions: { fileOptions?: VFileOptions } = {}) => {
  // Create parser
  const parser = await createMarkdownParser(markdownParserOptions)

  // Parse markdown
  return parser(md, parseOptions)
}

export function contentHeading(body: MDCRoot) {
  let title = ''
  let description = ''
  const children = body.children
    // top level `text` and `hr` can be ignored
    .filter(node => node.type === 'element' && node.tag !== 'hr')

  if (children.length && (children[0] as MDCElement).tag === 'h1') {
    /**
     * Remove node
     */
    const node = children.shift()!

    /**
     * Generate title
     */
    title = nodeTextContent(node)
  }

  if (children.length && (children[0] as MDCElement).tag === 'p') {
    /**
     * Remove node
     */
    const node = children.shift()!

    /**
     * Generate description
     */
    description = nodeTextContent(node)
  }

  return {
    title,
    description
  }
}
