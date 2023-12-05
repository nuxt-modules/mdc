import { expect, it } from 'vitest'
import { parseMarkdown } from '../utils/parser'

const md = `
\`\`\`ts {1-3} [@[...slug\\\\].vue] meta=meta-value
class C {
  private name: string = "foo"
}

const c = new C()
\`\`\`
`.trim()

it('Code block with Props', async () => {
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

    const c = new C()
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

    const c = new C()
    ",
          "filename": "@[...slug].vue",
          "highlights": [
            1,
            2,
            3,
          ],
          "language": "ts",
          "meta": "meta=meta-value",
        },
        "tag": "pre",
        "type": "element",
      },
    ]
  `)
})