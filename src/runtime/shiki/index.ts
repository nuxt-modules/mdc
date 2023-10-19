import type { Root, Element } from '../types/hast'
import { visit } from 'unist-util-visit'
import { toString } from 'hast-util-to-string'
import type { Highlighter, Theme } from './types'

interface RehypeShikiOption {
  theme?: Theme
  highlighter?: Highlighter
}

const defaults: RehypeShikiOption = {
  theme: {
    default: 'github-light',
    dark: 'github-dark'
  },
  highlighter: (code, lang, theme, highlights) => {
    return $fetch('/api/_mdc/highlight', {
      params: {
        code,
        lang,
        theme: JSON.stringify(theme),
        highlights: JSON.stringify(highlights)
      }
    })
  }
}

export function rehypeShiki(opts: RehypeShikiOption = {}) {
  const options = { ...defaults, ...opts }

  return async (tree: Root) => {
    const tasks: Promise<void>[] = []
    const styles: string[] = []
    visit(
      tree,
      node => ['pre', 'code'].includes((node as Element).tagName) && !!(node as Element).properties?.language,
      (node) => {
        const _node = node as Element
        const task = options.highlighter!(
          toString(node as any),
          _node.properties!.language as string,
          options.theme!,
          (_node.properties!.highlights ?? []) as number[]
        )
          .then(({ tree, className, style, inlineStyle }) => {
            _node.properties!.className = ((_node.properties!.className || '') + ' ' + className).trim()
            _node.properties!.style = ((_node.properties!.style || '') + ' ' + inlineStyle).trim()

            if ((_node.children[0] as Element)?.tagName === 'code') {
              (_node.children[0] as Element).children = tree
            } else {
              _node.children = tree[0].children
            }

            if (style)
              styles.push(style)
          })

        tasks.push(task)
      }
    )

    if (tasks.length) {
      await Promise.all(tasks)

      tree.children.push({
        type: 'element',
        tagName: 'style',
        children: [{ type: 'text', value: cleanCSS(styles.join('')) }],
        properties: {}
      })
    }
  }
}

const cleanCSS = (css: string) => {
  const styles = css
    .split('}')
    .filter(s => Boolean(s.trim()))
    .map(s => s.trim() + '}')

  return Array
    .from(new Set(styles))
    .join('')
}
