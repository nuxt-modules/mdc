import { rehypeHighlight as rehypeHighlightUniversal, type RehypeHighlightOption } from './rehype'
import type { HighlightResult } from './types'

const defaults: RehypeHighlightOption = {
  theme: {},
  async highlighter(code, lang, theme, options) {
    try {
      if (typeof process !== 'undefined' && process.browser && window.sessionStorage.getItem('mdc-shiki-highlighter') === 'browser') {
        return import('#mdc-highlighter').then(h => h.default(code, lang, theme, options)).catch(() => ({}))
      }

      return await $fetch('/api/_mdc/highlight', {
        params: {
          code,
          lang,
          theme: JSON.stringify(theme),
          options: JSON.stringify(options)
        }
      })
    } catch (e: any) {
      if (typeof process !== 'undefined' && process.browser && e?.response?.status === 404) {
        window.sessionStorage.setItem('mdc-shiki-highlighter', 'browser')
        return this.highlighter?.(code, lang, theme, options)!
      }
    }

    return Promise.resolve({ tree: [{ type: 'text', value: code }], className: '', style: '' } as HighlightResult)
  }
}

export default rehypeHighlight

export function rehypeHighlight(opts: Partial<RehypeHighlightOption> = {}) {
  const options = { ...defaults, ...opts } as RehypeHighlightOption

  return rehypeHighlightUniversal(options)
}
