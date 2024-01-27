import fs from 'fs/promises'
import { existsSync } from 'fs'
import type { LanguageRegistration, ThemeRegistration } from 'shiki/core'
import type { ModuleOptions } from '../types'

export async function mdcHighlighter({
  options: {
    shikiPath,
    options
  }
}: {
  options: {
    shikiPath: string,
    options: ModuleOptions['highlight']
  }
}) {
  if (!options || !options.highlighter)
    return 'export default () => { throw new Error(\'[@nuxtjs/mdc] No highlighter specified\') }'

  if (options.highlighter === 'shiki') {
    const file = [
      shikiPath,
      shikiPath + '.mjs',
    ].find((file) => existsSync(file))

    if (!file)
      throw new Error(`[@nuxtjs/mdc] Could not find shiki highlighter: ${shikiPath}`)

    const code = await fs.readFile(file, 'utf-8')

    const { bundledLanguagesInfo } = await import('shiki/langs')

    const langs = new Set<string | LanguageRegistration>()
    options.langs?.forEach((lang) => {
      if (typeof lang === 'string') {
        const id = bundledLanguagesInfo.find(i => i.aliases?.includes?.(lang))?.id || lang
        if (!bundledLanguagesInfo.find(i => i.id === id)) {
          console.error(`[@nuxtjs/mdc] Could not find shiki language: ${lang}`)
          return
        }
        langs.add(id)
      }
      else
        langs.add(lang)
    })

    const themes = Array.from(new Set([
      ...typeof options?.theme === 'string'
        ? [options?.theme]
        : Object.values(options?.theme || {}),
      ...options?.themes || []
    ]))

    return [
      'import { getMdcConfigs } from \'#mdc-configs\'',
      code,

      'const langs = [',
      ...Array.from(langs)
        .map((lang) => typeof lang === 'string'
          ? `  import('shiki/langs/${lang}.mjs'),`
          : '  ' + JSON.stringify(lang) + ','),
      ']',
      'const themes = [',
      ...themes.map((theme: string | ThemeRegistration) => typeof theme === 'string'
        ? `  import('shiki/themes/${theme}.mjs'),`
        : '  ' + JSON.stringify(theme) + ','),
      ']',
      'const options = ' + JSON.stringify({
        theme: options.theme,
        wrapperStyle: options.wrapperStyle
      }),
      'const highlighter = createShikiHighlighter({ langs, themes, options, getMdcConfigs })',
      'export default highlighter',
    ].join('\n')
  }

  if (options.highlighter === 'custom') {
    return [
      'import { getMdcConfigs } from \'#mdc-configs\'',
      `export default function (...args) {
        '  const configs = await getMdcConfigs()`,
      '  for (const config of configs) {',
      '    if (config.highlighter) {',
      '      return config.highlighter(...args)',
      '    }',
      '  }',
      '  throw new Error(\'[@nuxtjs/mdc] No custom highlighter specified\')',
      '}'
    ].join('\n')

  }

  // custom highlighter path
  return 'export { default } from ' + JSON.stringify(options.highlighter)
}
