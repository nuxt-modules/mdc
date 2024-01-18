import type { MDCData, MDCElement, MDCParseOptions, MDCRoot, Toc } from '../types'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import { parseFrontMatter } from 'remark-mdc'
import { defu } from 'defu'
import { useProcessorPlugins } from './utils/plugins'
import { compileHast } from './compiler'
import { defaults } from './options'
import { generateToc } from './toc'
import { nodeTextContent } from '../utils/node'
import { getMdcConfigs } from '#mdc-configs'

// TODO: maybe cache the processors in a way

let moduleOptions: Partial<typeof import('#mdc-imports')> | undefined
export const parseMarkdown = async (md: string, opts: MDCParseOptions = {}) => {
  const configs = await getMdcConfigs()
  if (!moduleOptions) {
    moduleOptions = await import('#mdc-imports' /* @vite-ignore */).catch(() => ({}))
  }
  const options = defu(opts, {
    remark: { plugins: moduleOptions?.remarkPlugins },
    rehype: { plugins: moduleOptions?.rehypePlugins },
    highlight: moduleOptions?.highlight,
  }, defaults) as MDCParseOptions

  if (options.rehype?.plugins?.highlight) {
    options.rehype.plugins.highlight.options = options.highlight || {}
  }

  let processor = unified()

  // mdc.config.ts hooks
  for (const config of configs) {
    processor = await config.unified?.pre?.(processor) || processor
  }

  // Use `remark-parse` plugin to parse markdown input
  processor.use(remarkParse as any)

  // mdc.config.ts hooks
  for (const config of configs) {
    processor = await config.unified?.remark?.(processor) || processor
  }

  // Apply custom plugins to extend remark capabilities
  await useProcessorPlugins(processor as any, options.remark?.plugins)

  // Turns markdown into HTML to support rehype
  processor.use(remark2rehype as any, (options.rehype as any)?.options)

  // mdc.config.ts hooks
  for (const config of configs) {
    processor = await config.unified?.rehype?.(processor) || processor
  }

  // Apply custom plugins to extend rehype capabilities
  await useProcessorPlugins(processor as any, options.rehype?.plugins)

  // Apply compiler
  processor.use(compileHast)

  // mdc.config.ts hooks
  for (const config of configs) {
    processor = await config.unified?.post?.(processor) || processor
  }

  // Extract front matter data
  const { content, data: frontmatter } = await parseFrontMatter(md)

  // Start processing stream
  const processedFile = await processor.process({ value: content, data: frontmatter })

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

export function contentHeading (body: MDCRoot) {
  let title = ''
  let description = ''
  const children = body.children
    // top level `text` and `hr` can be ignored
    .filter(node => node.type !== 'text' && node.tag !== 'hr')

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
