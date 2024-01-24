import type { Processor } from 'unified'
import type { HighlighterCore, ShikijiTransformer } from 'shikiji'
import type { Highlighter, HighlighterOptions, MdcThemeOptions } from './runtime/highlighter/types'

export type Awaitable<T> = T | Promise<T>

export interface MdcConfig {
  /**
   * Hooks for the unified markdown pipeline
   */
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

  /**
   * Hooks for shikiji
   */
  shiki?: {
    /**
     * Get transformers for shikiji
     */
    transformers?: ShikijiTransformer[] | ((code: string, lang: string, theme: MdcThemeOptions, options: Partial<HighlighterOptions>) => Awaitable<ShikijiTransformer[]>)
    /**
     * Custom setup for shikiji instance, only called once on server or client
     */
    setup?: (highlighter: HighlighterCore) => Awaitable<void>
  }
}

export function defineConfig(config: MdcConfig) {
  return config
}
