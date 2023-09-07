import type { Root, Element } from '../types/hast'
import { visit } from 'unist-util-visit'
import { toString } from 'hast-util-to-string'
import { defu } from 'defu'
import type { Highlighter, Theme, TokenStyleMap } from './types'
import { useShikiHighlighter } from './highlighter'
import { type Lang } from 'shiki-es'

interface RehypeShikiOption {
  theme?: Theme
  highlighter?: Highlighter
}

const defaults: RehypeShikiOption = {
  theme: {
    default: 'github-light',
    dark: 'github-dark'
  },
  highlighter: async (code, lang, theme, highlights) => {
    const shikiHighlighter = useShikiHighlighter({})

    const styleMap: TokenStyleMap = {}

    const { tree, className } = await shikiHighlighter.getHighlightedAST(code as string, lang as Lang, theme as Theme, { styleMap, highlights })

    return {
      tree,
      className,
      style: shikiHighlighter.generateStyles(styleMap),
      styleMap
    }
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
        const task = options.highlighter!(toString(node as any), _node.properties!.language as string, options.theme!, (_node.properties!.highlights ?? []) as number[])
          .then(({ tree, className, style }) => {
            _node.properties!.className = ((_node.properties!.className || '') + ' ' + className).trim()

            if ((_node.children[0] as Element)?.tagName === 'code') {
              (_node.children[0] as Element).children = tree
            } else {
              _node.children = tree
            }

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