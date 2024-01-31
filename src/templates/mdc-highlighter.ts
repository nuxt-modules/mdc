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

    /**
     * Key: language alias or id for lookup
     * Value: language id or language registration
     */
    const langsMap = new Map<string, string | LanguageRegistration>()
    options.langs?.forEach((lang) => {
      if (typeof lang === 'string') {
        const info = bundledLanguagesInfo.find(i => i.aliases?.includes?.(lang) || i.id === lang)
        if (!info) {
          throw new Error(`[mdc] Could not find shiki language: ${lang}`)
        }
        langsMap.set(info.id, info.id)
        for (const alias of info.aliases || []) {
          langsMap.set(alias, info.id)
        }
      }
      else {
        langsMap.set(lang.name, lang)
      }
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

      'const bundledLangs = {',
      ...Array.from(langsMap.entries())
        .map(([name, lang]) => typeof lang === 'string'
          ? JSON.stringify(name) + `: () => import('shiki/langs/${lang}.mjs'),`
          : JSON.stringify(name) + ': ' + JSON.stringify(lang) + ','),
      '}',
      'const bundledThemes = {',
        ...themes.map((theme: string | ThemeRegistration) => typeof theme === 'string'
          ? JSON.stringify(theme) + `: () => import('shiki/themes/${theme}.mjs').then(r => r.default),`
          : JSON.stringify(theme.name) + ': ' + JSON.stringify(theme) + ','),
      '}',
      'const options = ' + JSON.stringify({
        theme: options.theme,
        wrapperStyle: options.wrapperStyle
      }),
      'const highlighter = createShikiHighlighter({ bundledLangs, bundledThemes, options, getMdcConfigs })',
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
