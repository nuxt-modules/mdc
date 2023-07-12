import { expect, it } from "vitest"
import { parseMarkdown } from "../utils/parser"

const md = `
hello

  

world
`.trim()

it('No empty line or paragraph', async () => {
    const { data, body } = await parseMarkdown(md)

    expect(Object.keys(data)).toHaveLength(2)

    expect(body.children).toHaveLength(2)
    expect(body.children).toMatchObject([
      {
        type: 'element',
        tag: 'p',
        children: [{ type: 'text', value: 'hello'}]
      },
      {
        type: 'element',
        tag: 'p',
        children: [{ type: 'text', value: 'world'}]
      }
    ])
})