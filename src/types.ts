import type { MdcThemeOptions } from './runtime/highlighter/types'
import type { BundledLanguage, LanguageRegistration } from 'shikiji'

export interface UnistPlugin {
  src?: string
  options?: Record<string, any>
}

export interface ModuleOptions {
  /**
   * The highlighter to be used for highlighting code blocks.
   *
   * Set to `custom` to provide your own highlighter function.
   * Set to `shiki` to use the builtin highlighter based on Shiki.
   *
   * @default 'shiki'
   */
  highlighter?: 'shiki' | 'custom' | false | { path: string }

  /**
   * Shikiji setup Options, only available when `highlighter` is `shiki`.
   */
  shiki?: {
    /**
     * Builtin languages to be loaded by Shikiji
     */
    langs?: (BundledLanguage | LanguageRegistration)[]
    /**
     * Themes to be loaded by Shikiji
     */
    theme?: MdcThemeOptions
    /**
     * Inject background color to code block wrapper
     *
     * @default false
     */
    wrapperStyle?: boolean | string
  }

  /**
   * @deprecated provide the setup in `mdc.config.ts` instead.
   */
  remarkPlugins?: Record<string, UnistPlugin>
  /**
   * @deprecated provide the setup in `mdc.config.ts` instead.
   */
  rehypePlugins?: Record<string, UnistPlugin>

  highlight?: {
    /**
     * @deprecated set `highlighter` to `custom` and provide the function in `mdc.config.ts` instead.
     */
    highlighter?: string

    /**
     * Default theme that will be used for highlighting code blocks.
     */
    theme?: MdcThemeOptions
    /**
     * Preloaded languages that will be available for highlighting code blocks.
     */
    preload?: string[]
    /**
     * Inject background color to code block wrapper
     *
     * @default false
     */
    wrapperStyle?: boolean | string
  } | false

  headings?: {
    anchorLinks?: {
      [heading in 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6']?: boolean
    }
  }

  components?: {
    prose?: boolean
    map?: Record<string, string>
  }
}

