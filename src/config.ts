import type { Processor } from 'unified'
import type { HighlighterCore, ShikijiTransformer } from 'shikiji'
import type { Highlighter } from './runtime/highlighter/types'

export type Awaitable<T> = T | Promise<T>

export interface MdcConfig {
  unified?: {
    /**
     * Custom setup for unified processor before other plugins
     */
    pre?: (processor: Processor) => Awaitable<void | Processor>
    /**
     * Custom setup for unified processor after remark but before rehype
     */
    remark?: (processor: Processor) => Awaitable<void | Processor>
    /**
     * Custom setup for unified processor after rehype
     */
    rehype?: (processor: Processor) => Awaitable<void | Processor>
    /**
     * Custom setup for unified processor after all plugins
     */
    post?: (processor: Processor) => Awaitable<void | Processor>
  }

  /**
   * Custom hightlighter, available when `highlighter` is set to `custom`
   */
  highlighter?: Highlighter

  shikiji?: {
    transformers?: ShikijiTransformer[]
    setup?: (highlighter: HighlighterCore) => Awaitable<void>
  }
}

export function defineConfig(config: MdcConfig) {
  return config
}
