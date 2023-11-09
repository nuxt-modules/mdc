import { vi } from 'vitest'
import { parseMarkdown as _parseMarkDown } from '../../src/runtime/parser'
import type { MDCParseOptions } from '../../src/runtime/types'
import type { Theme } from '../../src/runtime/shiki/types'
import { useShikiHighlighter } from '../../src/runtime/shiki/highlighter'
import rehypeShiki from '../../src/runtime/shiki'

vi.mock('#mdc-imports', () => {
  return {
    remarkPlugins: {},
    rehypePlugins: {},
    highlight: {}
  }
})

export const parseMarkdown = (md: string, options: MDCParseOptions = {}) => {
  if (options.highlight !== false) {
    options.highlight = options.highlight || {}
    options.highlight.theme = options.highlight.theme || 'github-light'

    options.highlight.highlighter = async (code: string, lang: string, theme: Theme, highlights) => {
      const shikiHighlighter = useShikiHighlighter({})
      return await shikiHighlighter.getHighlightedAST(code as string, lang as any, theme as Theme, { highlights })
    }
    options.rehype = options.rehype || {}
    options.rehype.plugins = options.rehype?.plugins || {}
    options.rehype.plugins.highlight = options.rehype?.plugins.highlight || {}
    options.rehype.plugins.highlight.instance = rehypeShiki
  }

  return _parseMarkDown(md, options)
}
