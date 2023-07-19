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
      tree,
      node => (node as Element).tagName === 'pre' && !!(node as Element).properties?.language,
      (node) => {
        const _node = node as Element
        const task = options.highlighter!(toString(node as any), _node.properties!.language as string, options.theme!)
          .then(({ tree, className, style }) => {
            _node.children = tree
            _node.properties!.className = ((_node.properties!.className || '') + ' ' + className).trim()
            
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