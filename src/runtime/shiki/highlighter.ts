import { getHighlighter, ThemeInput, Highlighter, BuiltinLanguage, BuiltinTheme } from 'shikiji'
// import { consola } from 'consola'
import type { HighlightResult, HighlighterOptions, Theme } from './types'
import { Element } from '../types/hast'

// Re-create logger locally as utils cannot be imported from here
// const logger = consola.withTag('@nuxtjs/mdc')

export const useShikiHighlighter = createSingleton((opts?: any) => {
  // Grab highlighter config from publicRuntimeConfig
  const { theme, preload } = opts || {}

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
    const highlighter = await getShikiHighlighter()
    const { highlights = [] } = opts || {}

    const themesObject = typeof theme === 'string' ? { default: theme } : (theme || {})
    const themeNames = Object.values(themesObject) as BuiltinTheme[]

    if (themeNames.length) {
      await Promise.all(themeNames.map(theme => highlighter.loadTheme(theme)))
    }

    if (lang && !highlighter.getLoadedLanguages().includes(lang)) {
      await highlighter.loadLanguage(lang)
    }

    const root = highlighter.codeToHast(code, {
      lang,
      themes: themesObject,
      defaultColor: 'default',
      transforms: {
        line(node, line) {
          node.properties ||= {}
          if (highlights.includes(line)) {
            node.properties.class = (node.properties.class || '') + ' highlight'
          }
          node.properties.line = line
        },
      }
    })

    const preEl = root.children[0] as Element
    const codeEl = preEl.children[0] as Element

    const style = Object.keys(themesObject)
      .filter(color => color !== 'default')
      .map(color => `html.${color} .shiki, html.${color} .shiki span { color: var(--shiki-${color}) !important; background: var(--shiki-${color}-bg) !important; }`)
      .join('\n')

    return {
      tree: codeEl.children as Element[],
      className: preEl.properties.class as string,
      inlineStyle: preEl.properties.style  as string,
      style,
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
