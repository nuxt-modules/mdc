
import type { UnistPlugin } from '../types'
import { pascalCase } from 'scule'

export async function mdcImports({ options }: any) {
  const imports: string[] = []
  const { imports: remarkImports, definitions: remarkDefinitions } = processUnistPlugins(options.remarkPlugins)
  const { imports: rehypeImports, definitions: rehypeDefinitions } = processUnistPlugins(options.rehypePlugins)

  return [
    'import highlight from \'#mdc-highlighter\'',
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
    'export { highlight }',
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
