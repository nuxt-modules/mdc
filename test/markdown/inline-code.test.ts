import { expect, it } from 'vitest'
import { parseMarkdown } from '../utils/parser'

const md = `
\`code\`
`.trim()

it('Html `<code>` should render as inline code', async () => {
  const { body } = await parseMarkdown(md)
  
  expect(body).toHaveProperty('type', 'root')
  expect(body).toHaveProperty('children[0].tag', 'p')
  expect(body).toHaveProperty('children[0].children[0].tag', 'code')
})