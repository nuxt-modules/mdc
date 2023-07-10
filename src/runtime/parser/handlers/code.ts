import type { H } from 'mdast-util-to-hast'
import { detab } from 'detab'
import { u } from 'unist-builder'
import type { MdastContent } from 'mdast-util-to-hast/lib'
import { parseThematicBlock } from './utils'

type Node = MdastContent & {
  lang: string
  meta: string
  value: string
}

export default (h: H, node: Node) => {
  const lang = (node.lang || '') + ' ' + (node.meta || '')
  const { language, highlights, filename, meta } = parseThematicBlock(lang)
  const value = node.value ? detab(node.value + '\n') : ''

  const codeElement = h(
    node,
    'code',
    { __ignoreMap: '', className: [`language-${language}`] },
    [u('text', value)]
  )

  return h(
    node.position,
    'code',
    { language, filename, highlights, meta, code: value },
    [h(node, 'pre', {}, [ codeElement])]
  )
}
