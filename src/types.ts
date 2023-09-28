import type { Theme } from './runtime/shiki/types'

export interface UnistPlugin {
  src?: string
  options?: Record<string, any>
}

export interface ModuleOptions {
  remarkPlugins?: Record<string, UnistPlugin>
  rehypePlugins?: Record<string, UnistPlugin>

  highlight?: {
    highlighter?: string
    /**
     * Default theme that will be used for highlighting code blocks.
     */
    theme?: Theme
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