import type { Element, Text } from '../types/hast'
import type { BuiltinTheme } from 'shikiji'

export type Theme = BuiltinTheme | Record<string, BuiltinTheme>

export interface HighlighterOptions {
  highlights: number[]
  twoslash?: boolean
}

export interface HighlightResult {
  tree: (Element | Text)[],
  className: string,
  style: string,
  inlineStyle: string,
}

export type Highlighter = (code: string, lang: string, theme: Theme, highlights: number[], meta?: string) => Promise<HighlightResult>
