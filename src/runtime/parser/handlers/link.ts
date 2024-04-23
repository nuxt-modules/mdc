import { type State } from 'mdast-util-to-hast'
import type { Element, Properties } from 'hast'
import type { Link } from 'mdast'
import { normalizeUri } from 'micromark-util-sanitize-uri'

export default function link(state: State, node: Link & { attributes?: Properties }) {
  const properties: Properties = {
    ...((node.attributes || {})),
    href: normalizeUri(node.url)
  }

  if (node.title !== null && node.title !== undefined) {
    properties.title = node.title
  }

  const result: Element = {
    type: 'element',
    tagName: 'a',
    properties,
    children: state.all(node)
  }
  state.patch(node, result)
  return state.applyData(node, result)
}
