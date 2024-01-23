import fs from 'fs/promises'
import { existsSync } from 'fs'
import type { ModuleOptions } from '@nuxt/schema'
import type { ShikiModuleOptions } from '../types'
import type { LanguageRegistration, ThemeRegistration } from 'shikiji/core'

export async function mdcHighlighter({
  options: {
    highlighter,
    shikiPath,
    shikiOptions
  }
}: {
  options: {
    highlighter: ModuleOptions['highlighter']
    shikiPath: string,
    shikiOptions: ShikiModuleOptions
  }
}) {
  if (!highlighter)
    return 'export default () => { throw new Error(\'[@nuxtjs/mdc] No highlighter specified\') }'

  if (highlighter === 'shiki') {
    const file = [
      shikiPath,
      shikiPath + '.mjs',
    ].find((file) => existsSync(file))
    if (!file)
      throw new Error(`[@nuxtjs/mdc] Could not find shiki highlighter: ${shikiPath}`)
    const code = await fs.readFile(file, 'utf-8')


    const { bundledLanguagesInfo } = await import('shikiji/langs')

    const langs = new Set<string | LanguageRegistration>()
    shikiOptions.langs?.forEach((lang) => {
      if (typeof lang === 'string') {
        const id = bundledLanguagesInfo.find(i => i.aliases?.includes?.(lang))?.id || lang
        if (!bundledLanguagesInfo.find(i => i.id === id)) {
          console.error(`[@nuxtjs/mdc] Could not find shikiji language: ${lang}`)
          return
        }
        langs.add(id)
      }
      else
        langs.add(lang)
    })

    const themes = typeof shikiOptions?.theme === 'string'
    ? [shikiOptions?.theme]
    : Object.values(shikiOptions?.theme || {})

    return [
      'import { getMdcConfigs } from \'#mdc-configs\'',
      code,

      'const langs = [',
      ...Array.from(langs)
        .map((lang) => typeof lang === 'string'
          ? `  import('shikiji/langs/${lang}.mjs'),`
          : '  ' + JSON.stringify(lang) + ','),
      ']',
      'const themes = [',
      ...themes.map((theme: string | ThemeRegistration) => typeof theme === 'string'
        ? `  import('shikiji/themes/${theme}.mjs'),`
        : '  ' + JSON.stringify(theme) + ','),
      ']',
      'const options = ' + JSON.stringify({
        theme: shikiOptions.theme,
        wrapperStyle: shikiOptions.wrapperStyle
      }),
      'const highlighter = createShikiHighlighter({ langs, themes, options, getMdcConfigs })',
      'export default highlighter',
    ].join('\n')
  }

  if (highlighter === 'custom') {
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

  if ('path' in highlighter) {
    return 'export { default } from ' + JSON.stringify(highlighter.path)
  }

  throw new Error(`[@nuxtjs/mdc] Unknown highlighter: ${highlighter}`)
}
