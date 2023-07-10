import type { Element } from '../types/hast'
import type { Theme as ShikiTheme, IThemedToken } from 'shiki-es'

export type Theme = ShikiTheme | Record<string, ShikiTheme>

export type HighlightThemedTokenStyle = Pick<IThemedToken, 'color' | 'fontStyle'> & { background?: string }

export type TokenStyleMap = Record<string, { 
  style: Record<string, HighlightThemedTokenStyle>
  className: string
}>

export interface HighlightParams {
  code: string
  lang: string
  theme: Theme
}

export interface HighlighterOptions {
  styleMap: TokenStyleMap
  highlights: Array<number>
}

export interface HighlightThemedToken {
  content: string
  style?: Record<string, HighlightThemedTokenStyle>
}

export interface HighlightThemedTokenLine {
  key: string
  tokens: HighlightThemedToken[]
}

export type Highlighter = (code: string, lang: string, theme: Theme) => Promise<{ tree: Element[], className: string, style: string }>