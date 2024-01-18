import type { ElementContent } from 'hast'
import type { BuiltinTheme } from 'shikiji'

export type MdcThemeOptions = BuiltinTheme | string | Record<string, BuiltinTheme | string>

export interface HighlighterOptions {
  highlights?: number[]
}

export interface HighlightResult {
  tree: ElementContent[],
  className?: string,
  style?: string,
  inlineStyle?: string,
}

export type Highlighter = (code: string, lang: string, theme: MdcThemeOptions, options: Partial<HighlighterOptions>) => Promise<HighlightResult>
