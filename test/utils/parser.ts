import { vi } from 'vitest'
import { parseMarkdown as _parseMarkDown } from "../../src/runtime/parser"
import { MDCParseOptions } from '../../src/runtime/types'
import { Theme, TokenStyleMap } from '../../src/runtime/shiki/types'
import { useShikiHighlighter } from "../../src/runtime/shiki/highlighter"

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

    options.highlight.highlighter = async (code: string, lang: string, theme: Theme) => {
      const shikiHighlighter = useShikiHighlighter({})

      const styleMap: TokenStyleMap = {}

      const { tree, className } = await shikiHighlighter.getHighlightedAST(code as string, lang as any, theme as Theme, { styleMap })

      return {
        tree,
        className,
        style: shikiHighlighter.generateStyles(styleMap),
      }
    }
  }

  return _parseMarkDown(md, options)
}