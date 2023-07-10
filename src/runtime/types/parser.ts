import type { Options as RehypeOption } from 'remark-rehype'
import { Theme, Highlighter } from '../shiki/types'

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
  },
  rehype?: {
    options?: RehypeOption,
    plugins?: Record<string, false | RehypePlugin>
  },
  highlight?: {
    theme?: Theme
    highlighter?: Highlighter
  } | false
}
