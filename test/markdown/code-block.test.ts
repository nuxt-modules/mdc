import { expect, it } from 'vitest'
import { parseMarkdown } from '../utils/parser'

const md = `
\`\`\`ts
class C {
  private name: string = "foo"
}
\`\`\`
`.trim()

it('Simple code block', async () => {
  const { body } = await parseMarkdown(md, {
    highlight: false
  })
  expect(body).toHaveProperty('type', 'root')
  expect(body.children).toHaveLength(1)
  expect(body.children).toMatchInlineSnapshot(`
    [
      {
        "children": [
          {
            "children": [
              {
                "type": "text",
                "value": "class C {
      private name: string = "foo"
    }
    ",
              },
            ],
            "props": {
              "__ignoreMap": "",
            },
            "tag": "code",
            "type": "element",
          },
        ],
        "props": {
          "className": [
            "language-ts",
          ],
          "code": "class C {
      private name: string = "foo"
    }
    ",
          "language": "ts",
          "meta": "",
        },
        "tag": "pre",
        "type": "element",
      },
    ]
  `)
})
