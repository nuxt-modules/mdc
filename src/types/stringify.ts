import type { Options as RemarkStringifyOptions } from 'remark-stringify'
import type { RemarkMDCOptions } from 'remark-mdc'

export interface MDCStringifyOptions {
  plugins?: {
    remarkStringify?: {
      options?: RemarkStringifyOptions
    }
    remarkMDC?: {
      options?: RemarkMDCOptions
    }
  }
}
