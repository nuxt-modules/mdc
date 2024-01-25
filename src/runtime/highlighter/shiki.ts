import { getHighlighterCore, addClassToHast, isSpecialLang, isSpecialTheme } from 'shikiji/core'
import type { HighlighterCore, LanguageInput, ShikijiTransformer, ThemeInput } from 'shikiji'
import type { Highlighter } from './types'
import type { Element } from 'hast'
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
} from 'shikiji-transformers'
import type { MdcConfig } from '../types/config'

export interface CreateShikiHighlighterOptions {
  langs: LanguageInput[]
  themes: ThemeInput[]
  options: { wrapperStyle?: string }
  getMdcConfigs: () => Promise<MdcConfig[]>
}

export function createShikiHighlighter({
  langs,
  themes,
  getMdcConfigs,
  options: shikiOptions
}: CreateShikiHighlighterOptions): Highlighter {
  async function _getShiki() {
    const shiki = await getHighlighterCore({
      langs,
      themes,
      loadWasm: () => import('shikiji/wasm')
    })

    const configs = await getMdcConfigs()
    for (const config of configs) {
      await config.shiki?.setup?.(shiki)
    }

    return shiki
  }

  let shiki: Promise<HighlighterCore> | undefined

  async function getShiki() {
    if (!shiki) {
      shiki = _getShiki()
    }
    return shiki
  }

  const baseTransformers: ShikijiTransformer[] = [
    transformerNotationDiff(),
    transformerNotationFocus(),
    transformerNotationHighlight(),
    transformerNotationErrorLevel(),
  ]

  const highlighter: Highlighter = async (code, lang, theme, options = {}) => {
    const shiki = await getShiki()

    const themesObject = typeof theme === 'string' ? { default: theme } : (theme || {})

    if (!shiki.getLoadedLanguages().includes(lang) && !isSpecialLang(lang)) {
      if (process.dev) {
        console.warn(`[mdc] Language "${lang}" is not loaded to the Shiki highlighter, fallback to plain text. Add the language to "mdc.highlight.langs" to fix this.`)
      }
      lang = 'text'
    }

    const loadedThemes = shiki.getLoadedThemes()
    for (const color of Object.keys(themesObject)) {
      const theme = themesObject[color]
      if (!loadedThemes.includes(theme) && isSpecialTheme(theme)) {
        if (process.dev) {
          console.warn(`[mdc] Theme "${theme}" is not loaded to the Shiki highlighter. Add the theme to "mdc.highlight.themes" to fix this.`)
        }
        themesObject[color] = 'none'
      }
    }

    const transformers: ShikijiTransformer[] = [
      ...baseTransformers,
    ]

    for (const config of await getMdcConfigs()) {
      const newTransformers = typeof config.shiki?.transformers === 'function'
        ? await config.shiki?.transformers(code, lang, theme, options)
        : config.shiki?.transformers || []
      transformers.push(...newTransformers)
    }


    const root = shiki.codeToHast(code.trimEnd(), {
      lang,
      themes: themesObject,
      defaultColor: false,
      meta: {
        __raw: options.meta
      },
      transformers: [
        ...transformers,
        {
          name: 'mdc:highlight',
          line(node, line) {
            if (options.highlights?.includes(line))
              addClassToHast(node, 'highlight')
            node.properties.line = line
          }
        },
        {
          name: 'mdc:newline',
          line(node) {
            // Add newline to end of lines if needed
            if (code?.includes('\n')) {
              // Set newline for empty lines
              if (node.children.length === 0 || (
                node.children.length === 1 && node.children[0].type === 'element' &&
                node.children[0].children.length === 1 && node.children[0].children[0].type === 'text' &&
                node.children[0].children[0].value === ''
              )) {
                node.children = [{
                  type: 'element',
                  tagName: 'span',
                  properties: {
                    emptyLinePlaceholder: true
                  },
                  children: [{ type: 'text', value: '\n' }]
                }]
                return
              }

              // Add newline to end of lines
              const last = node.children.at(-1)
              if (last?.type === 'element' && last.tagName === 'span') {
                const text = last.children.at(-1)

                if (text?.type === 'text')
                  text.value += '\n'
              }
            }
          },
        }]
    })

    const preEl = root.children[0] as Element
    const codeEl = preEl.children[0] as Element

    const wrapperStyle = shikiOptions.wrapperStyle
    preEl.properties.style = wrapperStyle
      ? (typeof wrapperStyle === 'string'
        ? wrapperStyle
        : preEl.properties.style)
      : ''

    const styles: string[] = []
    Object.keys(themesObject)
      .forEach(color => {
        const colorScheme = color !== 'default' ? `.${color}` : ''

        styles.push(
          wrapperStyle ? `${colorScheme} .shiki,` : '',
          `html .${color} .shiki span {`,
          `color: var(--shiki-${color});`,
          `background: var(--shiki-${color}-bg);`,
          `font-style: var(--shiki-${color}-font-style);`,
          `font-weight: var(--shiki-${color}-font-weight);`,
          `text-decoration: var(--shiki-${color}-text-decoration);`,
          '}'
        )

        styles.push(
          `html${colorScheme} .shiki span {`,
          `color: var(--shiki-${color});`,
          `background: var(--shiki-${color}-bg);`,
          `font-style: var(--shiki-${color}-font-style);`,
          `font-weight: var(--shiki-${color}-font-weight);`,
          `text-decoration: var(--shiki-${color}-text-decoration);`,
          '}'
        )
      })

    return {
      tree: codeEl.children,
      className: Array.isArray(preEl.properties.class)
        ? preEl.properties.class.join(' ')
        : preEl.properties.class as string,
      inlineStyle: preEl.properties.style as string,
      style: styles.join(''),
    }
  }

  return highlighter
}
