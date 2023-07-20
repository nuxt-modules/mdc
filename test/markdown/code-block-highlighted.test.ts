import { expect, it } from 'vitest'
import { parseMarkdown } from '../utils/parser'

const md = `
\`\`\`ts
class C {
  private name: string = "foo"
}
\`\`\`
`.trim()

it('Highlighted code block', async () => {
  const { body } = await parseMarkdown(md, {
    highlight: {
      theme: 'github-dark'
    }
  })
  expect(body).toHaveProperty('type', 'root')
  expect(body.children).toHaveLength(2)
  expect(body.children).toMatchInlineSnapshot(`
    [
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "type": "text",
                    "value": "class",
                  },
                ],
                "props": {
                  "class": "ct-857441",
                },
                "tag": "span",
                "type": "element",
              },
              {
                "children": [
                  {
                    "type": "text",
                    "value": " ",
                  },
                ],
                "props": {
                  "class": "ct-767297",
                },
                "tag": "span",
                "type": "element",
              },
              {
                "children": [
                  {
                    "type": "text",
                    "value": "C",
                  },
                ],
                "props": {
                  "class": "ct-806137",
                },
                "tag": "span",
                "type": "element",
              },
              {
                "children": [
                  {
                    "type": "text",
                    "value": " {
    ",
                  },
                ],
                "props": {
                  "class": "ct-767297",
                },
                "tag": "span",
                "type": "element",
              },
            ],
            "props": {
              "class": "line",
              "line": 1,
            },
            "tag": "span",
            "type": "element",
          },
          {
            "children": [
              {
                "children": [
                  {
                    "type": "text",
                    "value": "  ",
                  },
                ],
                "props": {
                  "class": "ct-767297",
                },
                "tag": "span",
                "type": "element",
              },
              {
                "children": [
                  {
                    "type": "text",
                    "value": "private",
                  },
                ],
                "props": {
                  "class": "ct-857441",
                },
                "tag": "span",
                "type": "element",
              },
              {
                "children": [
                  {
                    "type": "text",
                    "value": " ",
                  },
                ],
                "props": {
                  "class": "ct-767297",
                },
                "tag": "span",
                "type": "element",
              },
              {
                "children": [
                  {
                    "type": "text",
                    "value": "name",
                  },
                ],
                "props": {
                  "class": "ct-657843",
                },
                "tag": "span",
                "type": "element",
              },
              {
                "children": [
                  {
                    "type": "text",
                    "value": ":",
                  },
                ],
                "props": {
                  "class": "ct-857441",
                },
                "tag": "span",
                "type": "element",
              },
              {
                "children": [
                  {
                    "type": "text",
                    "value": " ",
                  },
                ],
                "props": {
                  "class": "ct-767297",
                },
                "tag": "span",
                "type": "element",
              },
              {
                "children": [
                  {
                    "type": "text",
                    "value": "string",
                  },
                ],
                "props": {
                  "class": "ct-533739",
                },
                "tag": "span",
                "type": "element",
              },
              {
                "children": [
                  {
                    "type": "text",
                    "value": " ",
                  },
                ],
                "props": {
                  "class": "ct-767297",
                },
                "tag": "span",
                "type": "element",
              },
              {
                "children": [
                  {
                    "type": "text",
                    "value": "=",
                  },
                ],
                "props": {
                  "class": "ct-857441",
                },
                "tag": "span",
                "type": "element",
              },
              {
                "children": [
                  {
                    "type": "text",
                    "value": " ",
                  },
                ],
                "props": {
                  "class": "ct-767297",
                },
                "tag": "span",
                "type": "element",
              },
              {
                "children": [
                  {
                    "type": "text",
                    "value": "\\"foo\\"
    ",
                  },
                ],
                "props": {
                  "class": "ct-244866",
                },
                "tag": "span",
                "type": "element",
              },
            ],
            "props": {
              "class": "line",
              "line": 2,
            },
            "tag": "span",
            "type": "element",
          },
          {
            "children": [
              {
                "children": [
                  {
                    "type": "text",
                    "value": "}",
                  },
                ],
                "props": {
                  "class": "ct-767297",
                },
                "tag": "span",
                "type": "element",
              },
            ],
            "props": {
              "class": "line",
              "line": 3,
            },
            "tag": "span",
            "type": "element",
          },
        ],
        "props": {
          "className": "language-ts github-dark",
          "code": "class C {
      private name: string = \\"foo\\"
    }
    ",
          "filename": undefined,
          "highlights": undefined,
          "language": "ts",
          "meta": "",
        },
        "tag": "pre",
        "type": "element",
      },
      {
        "children": [
          {
            "type": "text",
            "value": ".github-dark{color:#e1e4e8;background:#24292e;}.ct-857441{color:#F97583;}.ct-767297{color:#E1E4E8;}.ct-806137{color:#B392F0;}.ct-657843{color:#FFAB70;}.ct-533739{color:#79B8FF;}.ct-244866{color:#9ECBFF;}",
          },
        ],
        "props": {},
        "tag": "style",
        "type": "element",
      },
    ]
  `)
})