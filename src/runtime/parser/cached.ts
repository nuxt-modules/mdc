import type { MDCParseOptions, MDCParserResult, MDCRoot } from '@nuxtjs/mdc'

export function createCachedParser(parserOptions: MDCParseOptions) {
  // Create a processor with the necessary plugins
  let processor: import('unified').Processor<undefined, undefined, undefined, undefined, undefined> | undefined

  let lastValue = ''
  let lastParse: MDCParserResult | undefined

  return async function parse(value: string) {
    if (!processor) {
      processor = await import('@nuxtjs/mdc/runtime').then(m => m.createParseProcessor({
        ...parserOptions,
        keepPosition: true
      }))
    }

    // If the value is not the same as the last value, reset the parser
    if (!value.startsWith(lastValue)) {
      lastValue = ''
      lastParse = undefined
    }

    let startOffset = 0
    if (lastParse?.body?.children.length && lastParse.body.children.length > 1) {
      const lastCompleteNode = lastParse.body.children[lastParse.body.children.length - 2]
      if (lastCompleteNode?.position?.end) {
        startOffset = lastCompleteNode.position.end
      }
    }

    const processorResult = await processor!.process({ value: value.slice(startOffset) })
    const result = processorResult?.result as MDCParserResult
    if (result) {
      const body = {
        type: 'root',
        children: [
          ...(startOffset > 0 ? (lastParse?.body?.children.slice(0, -1) || []) : []),
          ...result.body.children.map(child => ({
            ...child,
            position: child.position && {
              start: child.position.start + startOffset,
              end: child.position.end + startOffset
            }
          }))
        ]
      } as MDCRoot

      lastParse = { ...result, body }
      lastValue = value

      return lastParse
    }
  }
}
