import handlers from './handlers'
import remarkEmoji from 'remark-emoji'
import remarkGFM  from 'remark-gfm'
import remarkMDC from 'remark-mdc'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSortAttributeValues from 'rehype-sort-attribute-values'
import rehypeSortAttributes from 'rehype-sort-attributes'
import rehypeRaw from 'rehype-raw'
import type { MDCParseOptions } from '../types'

export const defaults: MDCParseOptions = {
  remark: {
    plugins: {
      'remark-mdc': {
        instance: remarkMDC,
      },
      'remark-emoji': {
        instance: remarkEmoji
      },
      'remark-gfm': {
        instance: remarkGFM
      }
    }
  },
  rehype: {
    options: {
      // @ts-ignore
      handlers,
      allowDangerousHtml: true
    },
    plugins: {
      'rehype-external-links': {
        instance: rehypeExternalLinks
      },
      'rehype-sort-attribute-values': {
        instance: rehypeSortAttributeValues
      },
      'rehype-sort-attributes': {
        instance: rehypeSortAttributes
      },
      'rehype-raw': {
        instance: rehypeRaw,
        options: {
          passThrough: ['element']
        }
      }
    }
  },
  highlight: false,
  toc: {
    searchDepth: 2,
    depth: 2
  }
}
