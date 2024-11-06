import { vi } from 'vitest'
import { createWasmOnigEngine } from 'shiki/engine/oniguruma'
import remarkGFM from 'remark-gfm'
import remarkMDC from 'remark-mdc'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSortAttributeValues from 'rehype-sort-attribute-values'
import rehypeSortAttributes from 'rehype-sort-attributes'
import rehypeRaw from 'rehype-raw'
import { createShikiHighlighter } from '../../src/runtime/highlighter/shiki'
import { rehypeHighlight } from '../../src/runtime/highlighter/rehype-nuxt'
import type { MDCParseOptions } from '../../src/types'
import { parseMarkdown as _parseMarkDown } from '../../src/runtime/parser'

vi.mock('#mdc-imports', () => {
  return {
    remarkPlugins: {
      'remark-mdc': {
        instance: remarkMDC
      },
      'remark-gfm': {
        instance: remarkGFM
      }
    },
    rehypePlugins: {
      'rehype-external-links': {
        instance: rehypeExternalLinks
      },
      'rehype-sort-attribute-values': {
        instance: rehypeSortAttributeValues
      },
      'rehype-sort-attributes': {
        instance: rehypeSortAttributes
      },
      'rehype-raw': {
        instance: rehypeRaw,
        options: {
          passThrough: ['element']
        }
      }
    },
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
        import('shiki/langs/typescript.mjs'),
        import('shiki/langs/javascript.mjs')
      ],
      themes: [
        import('shiki/themes/github-light.mjs'),
        import('shiki/themes/github-dark.mjs')
      ],
      options: {},
      getMdcConfigs: async () => [],
      engine: createWasmOnigEngine(import('shiki/wasm'))
    })

    options.highlight.highlighter = highlighter
    options.rehype = options.rehype || {}
    options.rehype.plugins = options.rehype?.plugins || {}
    options.rehype.plugins.highlight = options.rehype?.plugins.highlight || {}
    options.rehype.plugins.highlight.instance = rehypeHighlight
  }

  return _parseMarkDown(md, options)
}
