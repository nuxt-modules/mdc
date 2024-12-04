import type { Options as RemarkStringifyOptions } from 'remark-stringify'

export interface MDCStringifyOptions {
  plugins?: {
    remarkStringify?: {
      options?: RemarkStringifyOptions
    }
  }
}
