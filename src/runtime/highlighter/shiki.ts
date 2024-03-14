import { addClassToHast, isSpecialLang, isSpecialTheme } from 'shiki/core'
import type { HighlighterCore, LanguageInput, ShikiTransformer, ThemeInput } from 'shiki'
import type { Highlighter } from './types'
import type { Element } from 'hast'
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
} from '@shikijs/transformers'
import type { MdcConfig } from '../types/config'
// @ts-expect-error - `nuxt-shiki` is installed by the module.
import { loadShiki } from '#imports'

export interface CreateShikiHighlighterOptions {
  /* An array of themes to be loaded initially */
  themes?: ThemeInput[]
  /* An array of languages to be loaded initially */
  langs?: LanguageInput[]
  /* An object of themes to be loaded lazily */
  bundledThemes?: Record<string, ThemeInput>
  /* An object of languages to be loaded lazily */
  bundledLangs?: Record<string, LanguageInput>
  /* Extra options for renderer */
  options?: { wrapperStyle?: string }
  /* A function to custom mdc configs */
  getMdcConfigs?: () => Promise<MdcConfig[]>
}

export function createShikiHighlighter({
  bundledLangs = {},
  bundledThemes = {},
  getMdcConfigs,
  options: shikiOptions
}: CreateShikiHighlighterOptions = {}): Highlighter {
  let shiki: Promise<HighlighterCore> | undefined
  let configs: Promise<MdcConfig[]> | undefined

  async function _getShiki() {
    const shiki = await loadShiki()

    for await (const config of await getConfigs()) {
      await config.shiki?.setup?.(shiki)
    }

    return shiki
  }

  async function getShiki() {
    if (!shiki) {
      shiki = _getShiki()
    }
    return shiki
  }

  async function getConfigs() {
    if (!configs) {
      configs = Promise.resolve(getMdcConfigs?.() || [])
    }
    return configs
  }

  const baseTransformers: ShikiTransformer[] = [
    transformerNotationDiff(),
    transformerNotationFocus(),
    transformerNotationHighlight(),
    transformerNotationErrorLevel(),
  ]

  const highlighter: Highlighter = async (code, lang, theme, options = {}) => {
    const shiki = await getShiki()

    const themesObject = typeof theme === 'string' ? { default: theme } : (theme || {})
    const loadedThemes = shiki.getLoadedThemes()
    const loadedLanguages = shiki.getLoadedLanguages()

    if (typeof lang === 'string' && !loadedLanguages.includes(lang) && !isSpecialLang(lang)) {
      if (bundledLangs[lang]) {
        await shiki.loadLanguage(bundledLangs[lang])
      }
      else {
        if (import.meta.dev) {
          console.warn(`[@nuxtjs/mdc] Language "${lang}" is not loaded to the Shiki highlighter, fallback to plain text. Add the language to "mdc.highlight.langs" to fix this.`)
        }
        lang = 'text'
      }
    }

    for (const [color, theme] of Object.entries(themesObject)) {
      if (typeof theme === 'string' && !loadedThemes.includes(theme) && !isSpecialTheme(theme)) {
        if (bundledThemes[theme]) {
          await shiki.loadTheme(bundledThemes[theme])
        }
        else {
          if (import.meta.dev) {
            console.warn(`[@nuxtjs/mdc] Theme "${theme}" is not loaded to the Shiki highlighter. Add the theme to "mdc.highlight.themes" to fix this.`)
          }
          themesObject[color] = 'none'
        }
      }
    }

    const transformers: ShikiTransformer[] = [
      ...baseTransformers,
    ]

    for (const config of await getConfigs()) {
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

    const wrapperStyle = shikiOptions?.wrapperStyle
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
