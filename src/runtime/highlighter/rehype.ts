import type { Root, Element } from 'hast'
import { visit } from 'unist-util-visit'
import { toString } from 'hast-util-to-string'
import type { HighlightResult, Highlighter, MdcThemeOptions } from './types'

export interface RehypeHighlightOption {
  theme?: MdcThemeOptions
  highlighter?: Highlighter
}

const defaults: RehypeHighlightOption = {
  theme: {
    default: 'github-light',
    dark: 'github-dark'
  },
  async highlighter(code, lang, theme, highlights) {
    if (process.browser && window.sessionStorage.getItem('mdc-shiki-highlighter') === 'browser') {
      return import('#mdc-highlighter').then(h => h.default(code, lang, theme, highlights))
    }

    console.log({rehypeHighlight})

    try {
      return await $fetch('/api/_mdc/highlight', {
        params: {
          code,
          lang,
          theme: JSON.stringify(theme),
          highlights: JSON.stringify(highlights)
        }
      })
    } catch (e: any) {
      if (process.browser && e?.response?.status === 404) {
        window.sessionStorage.setItem('mdc-shiki-highlighter', 'browser')
        return this.highlighter?.(code, lang, theme, highlights)!
      }
    }

    return Promise.resolve({ tree: [{ type: 'text', value: code }], className: '', style: '' } as HighlightResult)
  }
}

export default rehypeHighlight

export function rehypeHighlight(opts: RehypeHighlightOption = {}) {
  const options = { ...defaults, ...opts }

  return async (tree: Root) => {
    const tasks: Promise<void>[] = []
    const styles: string[] = []
    visit(
      tree,
      node => ['pre', 'code'].includes((node as Element).tagName) && !!((node as Element).properties?.language || (node as Element).properties?.highlights),
      (node) => {
        const _node = node as Element
        const task = options.highlighter!(
          toString(node as any),
          _node.properties!.language as string,
          options.theme!,
          { highlights: (_node.properties!.highlights ?? []) as number[] }
        )
          .then(({ tree, className, style, inlineStyle }) => {
            _node.properties!.className = ((_node.properties!.className || '') + ' ' + className).trim()
            _node.properties!.style = ((_node.properties!.style || '') + ' ' + inlineStyle).trim()

            if ((_node.children[0] as Element)?.tagName === 'code') {
              (_node.children[0] as Element).children = tree
            } else {
              _node.children = (tree[0] as any).children || tree[0]
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
