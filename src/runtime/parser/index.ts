import type { MDCParseOptions, MDCRoot } from "../types"
import { unified } from 'unified'
import remarkParse from "remark-parse"
import remark2rehype from 'remark-rehype'
import remarkMDC, { parseFrontMatter } from 'remark-mdc'
import { defu } from 'defu'
import { useProcessorPlugins } from "./utils/plugins"
import { compileHast } from "./compiler"
import { defaults } from './options'
import { rehypeShiki } from "./shiki"

export const parseMarkdown = async (md: string, opts: MDCParseOptions = {}) => {
  const options = defu(opts, defaults)

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

  const astTree = await processor.process({ value: content, data })
  Object.assign(data, astTree?.data || {})

  return {
    data,
    toc: [],
    body: astTree.result as MDCRoot
  }
}
