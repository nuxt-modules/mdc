// @ts-expect-error missing types
import type { Processor } from 'remark-rehype/lib'
import type { MDCParseOptions, RehypePlugin, RemarkPlugin } from '../../../types'

export const useProcessorPlugins = async (
  processor: Processor,
  plugins: Exclude<MDCParseOptions['rehype'] | MDCParseOptions['remark'], undefined>['plugins'] = {}
) => {
  const toUse = Object.entries(plugins).filter(p => p[1] !== false) as Array<[string, RemarkPlugin | RehypePlugin]>

  for (const plugin of toUse) {
    const instance = plugin[1].instance || await import(/* @vite-ignore */ plugin[0]).then(m => m.default || m)
    processor.use(instance, plugin[1].options)
  }
}
