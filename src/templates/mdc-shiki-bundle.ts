export async function mdcShikijiBundle({ options: { themes, langs, options } }: any) {
  return [
    'export const langs = [',
    ...langs.map((lang: string) => `  import('shikiji/langs/${lang}.mjs'),`),
    ']',
    'export const themes = [',
    ...themes.map((theme: string) => `  import('shikiji/themes/${theme}'),`),
    ']',
    'export const options = ' + JSON.stringify(options || '{}'),
  ].join('\n')
}
