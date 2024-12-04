import { unified, type Processor } from 'unified'
import rehypeRemark from 'rehype-remark'
import gfm from 'remark-gfm'
import mdc, { stringifyFrontMatter } from 'remark-mdc'
import stringify from 'remark-stringify'
import type { MDCParseOptions, MDCRoot } from '@nuxtjs/mdc'
import { mdcRehype, mdcRehypeHandlers, mdcRehypeNodeHandlers } from './mdc-rehype'

export function createStringifyProcessor(_inlineOptions: MDCParseOptions = {}): Processor {
  return unified()
    .use(function jsonParser(this: Processor) {
      this.parser = function (root: string) {
        return JSON.parse(root)
      }
    })
    .use(mdcRehype)
    .use(rehypeRemark, {
      handlers: mdcRehypeHandlers as never,
      nodeHandlers: mdcRehypeNodeHandlers as never
    })
    .use(gfm)
    .use(mdc)
    .use(stringify, {
      bullet: '-',
      emphasis: '_',
      rule: '-',
      listItemIndent: 'one',
      fence: '`',
      fences: true
    })
}

export function createMarkdownStringifier(options: MDCParseOptions = {}) {
  const processor = createStringifyProcessor(options)

  async function stringify(value: any, data: Record<string, any> = {}): Promise<string> {
    const result = await processor.process({ value: JSON.stringify(value) })

    return stringifyFrontMatter(data, result.value as string)
  }

  return stringify
}

export async function stringifyMarkdown(MDCAst: MDCRoot, data: Record<string, any>, options: MDCParseOptions = {}) {
  const processor = createMarkdownStringifier(options)
  if (!MDCAst) return null
  return await processor(MDCAst, data)
}
