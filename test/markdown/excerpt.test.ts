import { expect, it } from "vitest"
import { parseMarkdown } from "../utils/parser"

const md = `
# Foo

Bar

<!-- more -->

Baz
`.trim()

it('Excerpt', async () => {
  const { excerpt } = await parseMarkdown(md)
    
  expect(excerpt).toHaveProperty('type', 'root')
  expect(excerpt).toHaveProperty('children[0].tag', 'h1')
  expect(excerpt).toHaveProperty('children[1].tag', 'p')
  expect(excerpt).toHaveProperty('children[1].children[0].value', 'Bar')
})