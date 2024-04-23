export async function mdcConfigs({ options }: any) {
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
