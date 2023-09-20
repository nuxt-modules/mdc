import type { Element } from '../types/hast'
import type { BuiltinTheme, ThemedToken } from 'shikiji'

export type Theme = BuiltinTheme | Record<string, BuiltinTheme>

export type HighlightThemedTokenStyle = Pick<ThemedToken, 'color' | 'fontStyle'> & { background?: string }

export interface HighlightParams {
  code: string
  lang: string
  theme: Theme
}

export interface HighlighterOptions {
  highlights: number[]
}

export interface HighlightThemedToken {
  content: string
  style?: Record<string, HighlightThemedTokenStyle>
}

export interface HighlightThemedTokenLine {
  key: string
  tokens: HighlightThemedToken[]
}

export interface HighlightResult {
  tree: Element[],
  className: string,
  style: string,
  inlineStyle: string,
}

export type Highlighter = (code: string, lang: string, theme: Theme, highlights: number[]) => Promise<HighlightResult>
