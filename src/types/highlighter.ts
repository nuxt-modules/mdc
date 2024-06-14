import type { ElementContent } from 'hast'
import type { BuiltinTheme } from 'shiki'

export type MdcThemeOptions = BuiltinTheme | string | Record<string, BuiltinTheme | string>

export interface HighlighterOptions {
  highlights?: number[]
  meta?: string
}

export interface HighlightResult {
  tree: ElementContent[]
  className?: string
  style?: string
  inlineStyle?: string
}

export type Highlighter = (code: string, lang: string, theme: MdcThemeOptions, options: Partial<HighlighterOptions>) => Promise<HighlightResult>

export interface RehypeHighlightOption {
  theme?: MdcThemeOptions
  highlighter?: Highlighter
}
