import { vi } from 'vitest'
import { parseMarkdown as _parseMarkDown } from '../../src/runtime/parser'
import type { MDCParseOptions } from '../../src/runtime/types'
import  { rehypeHighlight } from '../../src/runtime/highlighter/rehype'
import { createShikiHighlighter } from '../../src/runtime/highlighter/shiki'

vi.mock('#mdc-imports', () => {
  return {
    remarkPlugins: {},
    rehypePlugins: {},
    highlight: {}
  }
})

vi.mock('#mdc-configs', () => {
  return {
    getMdcConfigs: async () => []
  }
})

export const parseMarkdown = (md: string, options: MDCParseOptions = {}) => {
  if (options.highlight !== false) {
    options.highlight = options.highlight || {}
    options.highlight.theme = options.highlight.theme || 'github-light'

    const highlighter = createShikiHighlighter({
      langs: [
        import('shikiji/langs/typescript.mjs'),
        import('shikiji/langs/javascript.mjs'),
      ],
      themes: [
        import('shikiji/themes/github-light.mjs'),
        import('shikiji/themes/github-dark.mjs'),
      ],
      options: {},
      getMdcConfigs: async () => []
    })

    options.highlight.highlighter = highlighter
    options.rehype = options.rehype || {}
    options.rehype.plugins = options.rehype?.plugins || {}
    options.rehype.plugins.highlight = options.rehype?.plugins.highlight || {}
    options.rehype.plugins.highlight.instance = rehypeHighlight
  }

  return _parseMarkDown(md, options)
}
