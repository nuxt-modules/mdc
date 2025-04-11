import type { CodeToHastOptions } from 'shiki/core'
import type { HighlighterCore, LanguageInput, ShikiTransformer, ThemeInput, RegexEngine } from '@shikijs/types'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import type { Element } from 'hast'
import type { MdcConfig, Highlighter } from '@nuxtjs/mdc'

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
  /* Shiki regex engine */
  engine?: RegexEngine | Promise<RegexEngine>
}

export function createShikiHighlighter({
  langs = [],
  themes = [],
  bundledLangs = {},
  bundledThemes = {},
  getMdcConfigs,
  options: shikiOptions,
  engine
}: CreateShikiHighlighterOptions = {}): Highlighter {
  let shiki: ReturnType<typeof _getShiki> | undefined
  let configs: Promise<MdcConfig[]> | undefined

  async function _getShiki() {
    const { createHighlighterCore, addClassToHast, isSpecialLang, isSpecialTheme } = await import('shiki/core')
    const { transformerNotationDiff, transformerNotationErrorLevel, transformerNotationFocus, transformerNotationHighlight } = await import('@shikijs/transformers')

    const shiki: HighlighterCore = await createHighlighterCore({
      langs,
      themes,
      engine: engine || createJavaScriptRegexEngine()
    })

    for await (const config of await getConfigs()) {
      await config.shiki?.setup?.(shiki)
    }

    return {
      shiki,
      addClassToHast,
      isSpecialLang,
      isSpecialTheme,
      transformers: [
        transformerNotationDiff(),
        transformerNotationErrorLevel(),
        transformerNotationFocus(),
        transformerNotationHighlight()
      ] as ShikiTransformer[]
    }
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

  const highlighter: Highlighter = async (code, lang, theme, options = {}) => {
    const {
      shiki,
      addClassToHast,
      isSpecialLang,
      isSpecialTheme,
      transformers: baseTransformers
    } = await getShiki()

    const codeToHastOptions: Partial<CodeToHastOptions<string, string>> = {
      defaultColor: false,
      meta: {
        __raw: options.meta
      }
    }

    // Custom embedded languages
    if (lang === 'ts-type' || lang === 'typescript-type') {
      lang = 'typescript'
      codeToHastOptions.grammarContextCode = 'let a:'
    } else if (lang === 'vue-html' || lang === 'vue-template') {
      lang = 'vue'
      codeToHastOptions.grammarContextCode = '<template>'
    }

    const themesObject = { ...(typeof theme === 'string' ? { default: theme } : (theme || {})) }
    const loadedThemes = shiki.getLoadedThemes()
    const loadedLanguages = shiki.getLoadedLanguages()

    if (typeof lang === 'string' && !loadedLanguages.includes(lang) && !isSpecialLang(lang)) {
      if (bundledLangs[lang]) {
        await shiki.loadLanguage(bundledLangs[lang])
      } else {
        // eslint-disable-next-line nuxt/prefer-import-meta
        if (process.dev) {
          console.warn(`[@nuxtjs/mdc] Language "${lang}" is not loaded to the Shiki highlighter, fallback to plain text. Add the language to "mdc.highlight.langs" to fix this.`)
        }
        lang = 'text'
      }
    }

    for (const [color, theme] of Object.entries(themesObject)) {
      if (typeof theme === 'string' && !loadedThemes.includes(theme) && !isSpecialTheme(theme)) {
        if (bundledThemes[theme]) {
          await shiki.loadTheme(bundledThemes[theme])
        } else {
          // eslint-disable-next-line nuxt/prefer-import-meta
          if (process.dev) {
            console.warn(`[@nuxtjs/mdc] Theme "${theme}" is not loaded to the Shiki highlighter. Add the theme to "mdc.highlight.themes" to fix this.`)
          }
          themesObject[color] = 'none'
        }
      }
    }

    const transformersMap = new Map<string, ShikiTransformer>()
    for (const transformer of baseTransformers) {
      transformersMap.set(transformer.name || `transformer:${Math.random()}-${transformer.constructor.name}`, transformer)
    }

    for (const config of await getConfigs()) {
      const newTransformers = typeof config.shiki?.transformers === 'function'
        ? await config.shiki?.transformers(code, lang, theme, options)
        : config.shiki?.transformers || []
      for (const transformer of newTransformers) {
        transformersMap.set(transformer.name || `transformer:${Math.random()}-${transformer.constructor.name}`, transformer)
      }
    }

    const root = shiki.codeToHast(code.trimEnd(), {
      lang,
      ...codeToHastOptions,
      themes: themesObject,
      transformers: [
        ...transformersMap.values(),
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
                node.children.length === 1 && node.children[0].type === 'element'
                && node.children[0].children.length === 1 && node.children[0].children[0].type === 'text'
                && node.children[0].children[0].value === ''
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
          }
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
      .forEach((color) => {
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
      style: styles.join('')
    }
  }

  return highlighter
}
