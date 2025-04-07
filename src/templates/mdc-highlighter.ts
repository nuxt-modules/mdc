import fs from 'node:fs/promises'
import { existsSync } from 'node:fs'
import type { LanguageRegistration, ThemeRegistration } from 'shiki/core'
import { bundledLanguagesInfo } from 'shiki/bundle/full'
import type { ModuleOptions } from '../types/module'

export async function mdcHighlighter({
  options: {
    shikiPath,
    options,
    useWasmAssets
  }
}: {
  options: {
    shikiPath: string
    options: ModuleOptions['highlight']
    useWasmAssets: boolean
  }
}) {
  if (!options || !options.highlighter)
    return 'export default () => { throw new Error(\'[@nuxtjs/mdc] No highlighter specified\') }'

  if (options.highlighter === 'shiki') {
    const file = [
      shikiPath,
      shikiPath + '.mjs'
    ].find(file => existsSync(file))

    if (!file)
      throw new Error(`[@nuxtjs/mdc] Could not find shiki highlighter: ${shikiPath}`)

    let code = await fs.readFile(file, 'utf-8')

    if (useWasmAssets) {
      code = code.replace(
        /import\((['"])shiki\/wasm\1\)/,
        // We can remove the .client condition once Vite supports WASM ESM import
        'import.meta.client ? import(\'shiki/wasm\') : import(\'shiki/onig.wasm\')'
      )
    }

    /**
     * Key: language alias or id for lookup
     * Value: language id or language registration
     */
    const langsMap = new Map<string, string | LanguageRegistration>()
    options.langs?.forEach((lang) => {
      if (typeof lang === 'string') {
        const info = bundledLanguagesInfo.find(i => i.aliases?.includes?.(lang) || i.id === lang)
        if (!info) {
          throw new Error(`[@nuxtjs/mdc] Could not find shiki language: ${lang}`)
        }
        langsMap.set(info.id, info.id)
        for (const alias of info.aliases || []) {
          langsMap.set(alias, info.id)
        }
      } else {
        langsMap.set(lang.name, lang)
      }
    })

    const themes = Array.from(new Set([
      ...typeof options?.theme === 'string'
        ? [options?.theme]
        : Object.values(options?.theme || {}),
      ...options?.themes || []
    ]))

    const {
      shikiEngine = 'oniguruma'
    } = options

    return [
      'import { getMdcConfigs } from \'#mdc-configs\'',
      shikiEngine === 'javascript'
        // `createJavaScriptRegexEngine` import comes from `shiki.ts` file
        ? ''// 'import { createJavaScriptRegexEngine } from \'shiki/engine/javascript\''
        : 'import { createOnigurumaEngine } from \'shiki/engine/oniguruma\'',
      code,
      'const bundledLangs = {',
      ...Array.from(langsMap.entries())
        .map(([name, lang]) => typeof lang === 'string'
          ? JSON.stringify(name) + `: () => import('@shikijs/langs/${lang}').then(r => r.default || r),`
          : JSON.stringify(name) + ': ' + JSON.stringify(lang) + ','),
      '}',
      'const bundledThemes = {',
      ...themes.map((theme: string | ThemeRegistration) => typeof theme === 'string'
        ? JSON.stringify(theme) + `: () => import('@shikijs/themes/${theme}').then(r => r.default || r),`
        : JSON.stringify(theme.name) + ': ' + JSON.stringify(theme) + ','),
      '}',
      'const options = ' + JSON.stringify({
        theme: options.theme,
        wrapperStyle: options.wrapperStyle
      }),
      shikiEngine === 'javascript'
        ? 'const engine = createJavaScriptRegexEngine({ forgiving: true })'
        : `const engine = createOnigurumaEngine(() => import('shiki/wasm'))`,
      'const highlighter = createShikiHighlighter({ bundledLangs, bundledThemes, options, getMdcConfigs, engine })',
      'export default highlighter'
    ].join('\n')
  }

  if (options.highlighter === 'custom') {
    return [
      'import { getMdcConfigs } from \'#mdc-configs\'',
      'export default async function (...args) {',
      '  const configs = await getMdcConfigs()',
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
