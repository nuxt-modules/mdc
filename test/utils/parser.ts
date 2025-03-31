import { vi } from 'vitest'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'
import { createShikiHighlighter } from '../../src/runtime/highlighter/shiki'
import { rehypeHighlight } from '../../src/runtime/highlighter/rehype-nuxt'
import type { MDCParseOptions } from '../../src/types'
import { parseMarkdown as _parseMarkDown } from '../../src/runtime/parser'

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
        import('@shikijs/langs/typescript'),
        import('@shikijs/langs/javascript')
      ],
      themes: [
        import('@shikijs/themes/github-light'),
        import('@shikijs/themes/github-dark')
      ],
      options: {},
      getMdcConfigs: async () => [],
      engine: createOnigurumaEngine(import('shiki/wasm'))
    })

    options.highlight.highlighter = highlighter
    options.rehype = options.rehype || {}
    options.rehype.plugins = options.rehype?.plugins || {}
    options.rehype.plugins.highlight = options.rehype?.plugins.highlight || {}
    options.rehype.plugins.highlight.instance = rehypeHighlight
  }

  return _parseMarkDown(md, options)
}
