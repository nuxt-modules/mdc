import { createResolver } from "@nuxt/kit"
import type { UnistPlugin } from "../types"
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
      highlighter = highlighter.replace(`"${options.highlight.highlighter}"`, "syntaxHighlighter")
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

function processUnistPlugins (plugins: Record<string, UnistPlugin>) {
  const imports: string[] = []
  const definitions: string[] = []
  Object.entries(plugins).forEach(([name, plugin]) => {
    imports.push(`import ${pascalCase(name)} from '${name}'`)
    if (Object.keys(plugin).length) {
      definitions.push(`  '${name}': { instance: ${pascalCase(name)}, ...(${JSON.stringify(plugin)}) },`)
    } else {
      definitions.push(`  '${name}': { instance: ${pascalCase(name)} },`)
    }
  })

  return { imports, definitions }
}