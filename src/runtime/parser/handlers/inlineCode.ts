import { type State } from 'mdast-util-to-hast'
import { type Element, type Text, type Properties } from 'hast'
import { type InlineCode } from 'mdast'

export default function inlineCode (state: State, node: InlineCode & { attributes?: Properties }) {
  const text: Text = { type: 'text', value: node.value.replace(/\r?\n|\r/g, ' ') }
  state.patch(node, text)

  const result: Element = {
    type: 'element',
    tagName: 'code',
    properties: node.attributes || {},
    children: [text]
  }
  state.patch(node, result)
  return state.applyData(node, result)
}
