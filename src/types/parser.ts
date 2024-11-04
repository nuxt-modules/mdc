import type { VFile } from 'vfile'
import type { Options as RehypeOption } from 'remark-rehype'
import type { MdcConfig } from './config'
import type { MDCData, MDCRoot } from './tree'
import type { Toc } from './toc'
import type { RehypeHighlightOption } from './highlighter'

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
    options?: RehypeOption
    plugins?: Record<string, false | RehypePlugin>
  }

  highlight?: RehypeHighlightOption | false

  rootDocument?: VFile

  toc?: {
    /**
     * Maximum heading depth to include in the table of contents.
     */
    depth?: number
    searchDepth?: number
  }

  keepComments?: boolean

  /**
   * Inline mdc.config.ts
   */
  configs?: MdcConfig[]
}

export interface MDCParserResult {
  data: MDCData
  body: MDCRoot
  excerpt: MDCRoot | undefined
  toc: Toc | undefined
}
