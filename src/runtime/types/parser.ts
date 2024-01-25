import type { Options as RehypeOption } from 'remark-rehype'
import type { RehypeHighlightOption } from '../highlighter/rehype'
import type { MdcConfig } from './config'

export interface RemarkPlugin {
  instance?: any
  options?: Array<any> | Record<string, any>
}

export interface RehypePlugin {
  instance?: any
  options?: Array<any> | Record<string, any>
}

export interface MDCParseOptions {
  remark?: {
    plugins?: Record<string, false | RemarkPlugin>
  }

  rehype?: {
    options?: RehypeOption,
    plugins?: Record<string, false | RehypePlugin>
  }

  highlight?: RehypeHighlightOption | false

  toc?: {
    /**
     * Maximum heading depth to include in the table of contents.
     */
    depth?: number
    searchDepth?: number
  }

  /**
   * Inline mdc.config.ts
   */
  configs?: MdcConfig[]
}
