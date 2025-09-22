import type { Processor } from 'unified'
import { unified } from 'unified'
import gfm from 'remark-gfm'
import mdc, { stringifyFrontMatter } from 'remark-mdc'
import stringify from 'remark-stringify'
import type { MDCStringifyOptions, MDCRoot } from '@nuxtjs/mdc'
import { mdcRemark } from './mdc-remark'

export function createStringifyProcessor(options: MDCStringifyOptions = {}) {
  return unified()
    .use(function jsonParser(this: Processor) {
      this.parser = function (root: string) {
        return JSON.parse(root)
      }
    })
    .use(mdcRemark)
    .use(gfm)
    .use(mdc, options?.plugins?.remarkMDC?.options || {})
    .use(stringify, {
      bullet: '-',
      emphasis: '*',
      rule: '-',
      listItemIndent: 'one',
      fence: '`',
      fences: true,
      ...options?.plugins?.remarkStringify?.options
    })
}

export function createMarkdownStringifier(options: MDCStringifyOptions = {}) {
  const processor = createStringifyProcessor(options)

  async function stringify(value: any, data: Record<string, any> = {}): Promise<string> {
    const result = await processor.process({ value: JSON.stringify(value) })

    // Stringify front matter returns empty string if no data is provided
    if (Object.keys(data).length) {
      return stringifyFrontMatter(data, result.value as string)
    }

    return result.value as string
  }

  return stringify
}

export async function stringifyMarkdown(MDCAst: MDCRoot, data: Record<string, any>, options: MDCStringifyOptions = {}) {
  const processor = createMarkdownStringifier(options)
  if (!MDCAst) return null
  return await processor(MDCAst, data)
}
