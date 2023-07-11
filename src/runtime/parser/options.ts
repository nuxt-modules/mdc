import handlers from './handlers'
import remarkEmoji from 'remark-emoji'
import remarkGFM  from 'remark-gfm'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSortAttributeValues from "rehype-sort-attribute-values"
import rehypeSortAttributes from "rehype-sort-attributes"
import rehypeRaw from "rehype-raw"
import type { MDCParseOptions } from '../types'
// @ts-ignore
import { remarkPlugins, rehypePlugins, highlight } from '#mdc-imports'

export const defaults: MDCParseOptions = {
  remark: {
    plugins: {
      'remark-emoji': {
        instance: remarkEmoji
      },
      'remark-gfm': {
        instance: remarkGFM
      },
      ...remarkPlugins
    }
  },
  rehype: {
    options: {
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
      },
      ...rehypePlugins
    }
  },
  highlight
}
