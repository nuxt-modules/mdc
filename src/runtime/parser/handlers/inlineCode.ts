import { type State } from 'mdast-util-to-hast'
import type { Element, Text, Properties } from 'hast'
import type { InlineCode } from 'mdast'

export default function inlineCode (state: State, node: InlineCode & { attributes?: Properties }) {
  const language = node.attributes?.language || node.attributes?.lang
  const text: Text = { type: 'text', value: node.value.replace(/\r?\n|\r/g, ' ') }
  state.patch(node, text)

  const result: Element = {
    type: 'element',
    tagName: 'code',
    properties: node.attributes || {},
    children: [text]
  }

  const classes = (result.properties.class as string || '').split(' ')
  delete result.properties.class

  if (language) {
    result.properties.language = language
    delete result.properties.lang

    classes.push('language-' + language)
  }

  result.properties.className = classes.join(' ')

  state.patch(node, result)
  return state.applyData(node, result)
}
