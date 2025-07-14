import { describe, expect, it } from 'vitest'
import { parseMarkdown, stringifyMarkdown } from '../utils/parser'

describe('Markdown Binding', () => {
  const markdowns = [
    '{{ foo }}',
    '{{ foo || \'Foo\' }}',
    '{{ foo || \'Foo\' }}, bar',
    '{{ foo || \'Foo\' }}. bar',
    `Hello{{ name }}`,
    `Hello {{ name }}`,
    `Hello{{ name }},`,
    `Hello {{ name }},`,
    `Hello {{ name }} ,`
  ]

  for (const markdown of markdowns) {
    it(markdown, async () => {
      const ast = await parseMarkdown(markdown)
      const regenerated = await stringifyMarkdown(ast.body)

      expect(regenerated?.trim()).toEqual(markdown)
    })
  }
})
