import { getHighlighter, type ThemeInput, type Highlighter, type BuiltinLanguage, type BuiltinTheme } from 'shikiji'
import type { HighlightResult, HighlighterOptions, Theme } from './types'
import type { Element } from '../types/hast'

export const useShikiHighlighter = createSingleton((opts?: any) => {
  // Grab highlighter config from publicRuntimeConfig
  const { theme, preload, wrapperStyle } = opts || {}

  let promise: Promise<Highlighter> | undefined
  const getShikiHighlighter = () => {
    if (!promise) {
      // Initialize highlighter with defaults
      promise = getHighlighter({
        themes: [
          ((theme as any)?.default || theme || 'dark-plus') as BuiltinTheme,
        ],
        langs: [
          ...(preload || []),
          'diff',
          'json',
          'js',
          'ts',
          'css',
          'shell',
          'html',
          'md',
          'yaml',
          'vue',
          'mdc'
        ] as any[]
      }).then((highlighter) => {
        // Load all themes on-demand
        const themes = Object.values(typeof theme === 'string' ? { default: theme } : (theme || {})) as ThemeInput[]

        if (themes.length) {
          return Promise
            .all(themes.map(theme => highlighter.loadTheme(theme)))
            .then(() => highlighter)
        }
        return highlighter
      })
    }
    return promise
  }

  const getHighlightedAST = async (code: string, lang: BuiltinLanguage, theme: Theme, opts?: Partial<HighlighterOptions>): Promise<HighlightResult> => {
    try {
      const highlighter = await getShikiHighlighter()
      const { highlights = [] } = opts || {}

      const themesObject = typeof theme === 'string' ? { default: theme } : (theme || {})
      const themeNames = Object.values(themesObject) as BuiltinTheme[]

      if (themeNames.length) {
        await Promise.all(themeNames.map(theme => highlighter.loadTheme(theme)))
      }

      if (lang && !highlighter.getLoadedLanguages().includes(lang)) {
        try {
          await highlighter.loadLanguage(lang)
        } catch (error: any) {
          if (highlights.length) {
            console.warn('[@nuxtjs/mdc] Defaulting to no language to be able to highlight lines:', error.message)
            // @ts-ignore
            lang = ''
          } else throw error
        }
      }

      const root = highlighter.codeToHast(code.trimEnd(), {
        lang,
        themes: themesObject,
        defaultColor: false,
        transformers: [{
          line(node, line) {
            node.properties ||= {}
            if (highlights.includes(line)) {
              node.properties.class = (node.properties.class || '') + ' highlight'
            }
            node.properties.line = line

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

      preEl.properties.style = wrapperStyle ? (typeof wrapperStyle === 'string' ? wrapperStyle : preEl.properties.style) : ''

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

          styles.unshift(
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
        tree: codeEl.children as Element[],
        className: preEl.properties.class as string,
        inlineStyle: preEl.properties.style  as string,
        style: styles.join(''),
      }
    } catch (error: any) {
      console.warn('[@nuxtjs/mdc] Failed to highlight code block:', error.message)
      return {
        tree: [{ type: 'text', value: code }],
        className: '',
        inlineStyle: '',
        style: ''
      }
    }
  }

  return {
    getHighlightedAST,
  }
})

function createSingleton<T, Params extends Array<any>>(fn: (...arg: Params) => T) {
  let instance: T | undefined
  return (...args: Params) => {
    if (!instance) {
      instance = fn(...args)
    }
    return instance
  }
}
