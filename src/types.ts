import type { Theme } from './runtime/shiki/types'

export interface UnistPlugin {
  src?: string
  options?: Record<string, any>
}

export interface ModuleOptions {
  remarkPlugins?: Record<string, UnistPlugin>
  rehypePlugins?: Record<string, UnistPlugin>
  highlight?: {
    theme?: Theme
    highlighter?: string 
  } | false

  components?: {
    prose?: boolean
    map?: Record<string, string>
  }
}