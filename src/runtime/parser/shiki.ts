import type { Root, Element } from '../types/hast'
import { visit } from 'unist-util-visit'
import { toString } from 'hast-util-to-string'
import { defu } from 'defu'
import type { Highlighter, Theme } from '../shiki/types'

interface RehypeShikiOption {
  theme?: Theme
  highlighter?: Highlighter
}

const defaults: RehypeShikiOption = {
  theme: {
    default: 'github-dark',
    dark: 'github-light'
  },
  highlighter: (code, lang, theme) => {
    return $fetch('/api/_mdc/highlight', {
      params: {
        code,
        lang,
        theme: JSON.stringify(theme)
      }
    })
  }
}

export function rehypeShiki (opts: RehypeShikiOption = {}) {
  const options = defu(opts, defaults)
  
  return async (tree: Root) => {
    const tasks: Promise<void>[] = []
    const styles: string[] = []
    visit(
      tree as any,
      (node) => node.type === 'element' && (node as Element).tagName === 'code' && !!(node as Element).properties!.language,
      (node) => {
        const _node = node as Element
        const t = options.highlighter!(toString(node as any), _node.properties!.language as string, options.theme!)
          .then(({ tree, className, style }) => {
            let parent = _node
            if ((_node.children[0] as Element).tagName === 'pre') {
              parent = _node.children[0] as Element
            }
            parent.children = tree
            parent.properties!.className = ((_node.properties!.className || '') + ' ' + className).trim()
            
            styles.push(style)
          })

        tasks.push(t)
      }
    )
    if (tasks.length) { 
      await Promise.all(tasks)

      tree.children.push({
        type: 'element',
        tagName: 'style',
        children: [{ type: 'text', value: styles.join('') }],
        properties: {}
      })
    }
  }
}