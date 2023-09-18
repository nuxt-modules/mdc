import { expect, it } from 'vitest'
import { parseMarkdown } from '../utils/parser'

const md = `
\`code\`{class="class-name-1 class-name-2"}
`.trim()

it('', async () => {
  const { body } = await parseMarkdown(md)

    expect(body).toHaveProperty('type', 'root')
    expect(body).toHaveProperty('children[0].tag', 'p')
    expect(body).toHaveProperty('children[0].children[0].tag', 'code')
    expect(body).toHaveProperty('children[0].children[0].props.className', 'class-name-1 class-name-2')
    expect(body).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "type": "text",
                    "value": "code",
                  },
                ],
                "props": {
                  "className": "class-name-1 class-name-2",
                },
                "tag": "code",
                "type": "element",
              },
            ],
            "props": {},
            "tag": "p",
            "type": "element",
          },
        ],
        "type": "root",
      }
    `)
})
