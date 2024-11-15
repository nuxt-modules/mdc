import { pascalCase } from 'scule'
import type { UnistPlugin } from '../types/module'

export async function mdcImports({ options }: any) {
  const imports: string[] = []
  const { imports: remarkImports, definitions: remarkDefinitions } = processUnistPlugins(options.remarkPlugins)
  const { imports: rehypeImports, definitions: rehypeDefinitions } = processUnistPlugins(options.rehypePlugins)

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
    `export const highlight = ${JSON.stringify({
      theme: options.highlight?.theme,
      wrapperStyle: options.highlight?.wrapperStyle
    })}`
  ].join('\n')
}

function processUnistPlugins(plugins: Record<string, UnistPlugin>) {
  const imports: string[] = []
  const definitions: string[] = []
  Object.entries(plugins).forEach(([name, plugin]) => {
    const instanceName = `_${pascalCase(name).replace(/\W/g, '')}`
    if (plugin) {
      imports.push(`import ${instanceName} from '${plugin.src || name}'`)
      if (Object.keys(plugin).length) {
        definitions.push(`  '${name}': { instance: ${instanceName}, options: ${JSON.stringify(plugin.options || plugin)} },`)
      } else {
        definitions.push(`  '${name}': { instance: ${instanceName} },`)
      }
    } else {
      definitions.push(`  '${name}': false,`)
    }
  })

  return { imports, definitions }
}
