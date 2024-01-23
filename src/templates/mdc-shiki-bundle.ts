import type { LanguageRegistration, ThemeRegistration } from 'shikiji/types.mjs'

export async function mdcShikijiBundle({ options: { themes, langs, options } }: any) {
  const { bundledLanguagesAlias } = await import('shikiji/langs')

  const langsSet = new Set<string | LanguageRegistration>(langs)
  langs.forEach((lang: string) => {
    if (typeof lang === 'string')
      // @ts-expect-error TODO: remove this comment when shikiji/types is fixed
      langsSet.add(bundledLanguagesAlias[lang]?.id || lang)
    else
      langsSet.add(lang)
  })

  return [
    'export const langs = [',
    ...Array.from(langsSet)
      .map((lang) => typeof lang === 'string'
        ? `  import('shikiji/langs/${lang}.mjs'),`
        : '  ' + JSON.stringify(lang) + ','),
    ']',
    'export const themes = [',
    ...themes.map((theme: string | ThemeRegistration) => typeof theme === 'string'
      ? `  import('shikiji/themes/${theme}'),`
      : '  ' + JSON.stringify(theme) + ','),
    ']',
    'export const options = ' + JSON.stringify(options || {}),
  ].join('\n')
}
