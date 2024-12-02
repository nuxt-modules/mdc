import type { MDCData } from './tree'

export interface MDCRenderOptions {
  documentMeta: MDCData
  parentScope: any
  resolveComponent: (component: any) => any
}
