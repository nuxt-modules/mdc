import type { MDCParseOptions } from '@nuxtjs/mdc'
import handlers from './handlers'

export const defaults: MDCParseOptions = {
  remark: {
    plugins: {}
  },
  rehype: {
    options: {
      handlers,
      allowDangerousHtml: true
    },
    plugins: {}
  },
  highlight: false,
  toc: {
    searchDepth: 2,
    depth: 2
  }
}
