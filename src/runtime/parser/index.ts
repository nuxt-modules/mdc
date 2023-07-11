import type { MDCParseOptions, MDCRoot, Toc } from "../types"
import { unified } from 'unified'
import remarkParse from "remark-parse"
import remark2rehype from 'remark-rehype'
import remarkMDC, { parseFrontMatter } from 'remark-mdc'
import { defu } from 'defu'
import { useProcessorPlugins } from "./utils/plugins"
import { compileHast } from "./compiler"
import { defaults } from './options'
import { rehypeShiki } from "./shiki"
import { generateToc } from "./toc"

export const parseMarkdown = async (md: string, opts: MDCParseOptions = {}) => {
  const options = defu(opts, defaults)

  // Extract front matter data
  const { content, data } = await parseFrontMatter(md)

  const processor = unified()

  // Use `remark-parse` plugin to parse markdown input
  processor.use(remarkParse)

  // Use `remark-mdc` plugin to parse mdc syntax
  processor.use(remarkMDC)

  // Apply custom plugins to extend remark capabilities
  await useProcessorPlugins(processor, options.remark?.plugins)

  // Turns markdown into HTML to support rehype
  processor.use(remark2rehype, options.rehype?.options)

  if (options.highlight) {
    processor.use(rehypeShiki, options.highlight)
  }

  // Apply custom plguins to extend rehybe capabilities
  await useProcessorPlugins(processor, options.rehype?.plugins)

  // Apply compiler
  processor.use(compileHast)

  // Start processing stream
  const processedFile = await processor.process({ value: content, data })

  const result = processedFile.result as { body: MDCRoot, excerpt: MDCRoot | undefined }
  // Update data with processor data
  Object.assign(data, processedFile?.data || {})

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
