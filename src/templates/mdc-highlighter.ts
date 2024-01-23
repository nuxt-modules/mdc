import fs from 'fs/promises'
import { existsSync } from 'fs'
import type { ModuleOptions } from '@nuxt/schema'

export async function mdcHighlighter({
  options: {
    highlighter,
    shikiPath
  }
}: {
  options: {
    highlighter: ModuleOptions['highlighter']
    shikiPath: string
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
    return [
      'import { getMdcConfigs } from \'#mdc-configs\'',
      'import * as shikiOptions from \'#mdc-shiki-bundle\'',
      code,
      'const highlighter = createShikiHighlighter({ ...shikiOptions, getMdcConfigs })',
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
