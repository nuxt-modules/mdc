import { createResolver } from '@nuxt/kit'
import type { UnistPlugin } from '../types'
import { pascalCase } from 'scule'

export const mdcImportTemplate = async ({ nuxt, options }: any) => {
  const resolver = createResolver(import.meta.url)

  const imports: string[] = []
  const { imports: remarkImports, definitions: remarkDefinitions } = processUnistPlugins(options.remarkPlugins)
  const { imports: rehypeImports, definitions: rehypeDefinitions } = processUnistPlugins(options.rehypePlugins)

  let highlighter = 'false'
  if (options.highlight) {
    highlighter = JSON.stringify(options.highlight)
    if (options.highlight.highlighter) {
      const path = await resolver.resolvePath(options.highlight.highlighter, { alias: nuxt.options.alias })
      imports.push(`import syntaxHighlighter from '${path}'`)
      highlighter = highlighter.replace(`"${options.highlight.highlighter}"`, 'syntaxHighlighter')
    }
  }

  return [
    ...remarkImports,
    ...rehypeImports,
    ...imports,
    '',
    'export const remarkPlugins = {',
    ...remarkDefinitions,
    '}',
    '',
    'export const rehypePlugins = {',
    ...rehypeDefinitions,
    '}',
    '',
    `export const highlight = ${highlighter}`
  ].join('\n')
}

export const mdcConfigsTemplate = async ({ options }: any) => {
  return [
    'let configs',
    'export function getMdcConfigs () {',
    'if (!configs) {',
    '  configs = Promise.all([',
    ...options.configs.map((item: string) => `    import('${item}').then(m => m.default),`),
    '  ])',
    '}',
    'return configs',
    '}'
  ].join('\n')
}

export const mdcHighlighterTemplate = async ({ options: { highlighter, shikiPath } }: any) => {
  if (!highlighter)
    return 'export default () => { throw new Error(\'[@nuxtjs/mdc] No highlighter specified\') }'

  if (highlighter === 'shiki') {
    return [
      'import { highlighter } from ' + JSON.stringify(shikiPath),
      'export default highlighter'
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

  throw new Error(`[@nuxtjs/mdc] Unknown highlighter: ${highlighter}`)
}



export const mdcShikijiBundle = async ({ options: { themes, langs, options } }: any) => {

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


function processUnistPlugins(plugins: Record<string, UnistPlugin>) {
  const imports: string[] = []
  const definitions: string[] = []
  Object.entries(plugins).forEach(([name, plugin]) => {
    imports.push(`import ${pascalCase(name)} from '${plugin.src || name}'`)
    if (Object.keys(plugin).length) {
      definitions.push(`  '${name}': { instance: ${pascalCase(name)}, options: ${JSON.stringify(plugin.options || plugin)} },`)
    } else {
      definitions.push(`  '${name}': { instance: ${pascalCase(name)} },`)
    }
  })

  return { imports, definitions }
}
