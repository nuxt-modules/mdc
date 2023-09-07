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
                    "children": [
                      {
                        "type": "text",
                        "value": "class",
                      },
                    ],
                    "props": {
                      "style": "color:#F97583",
                    },
                    "tag": "span",
                    "type": "element",
                  },
                  {
                    "children": [
                      {
                        "type": "text",
                        "value": " C",
                      },
                    ],
                    "props": {
                      "style": "color:#B392F0",
                    },
                    "tag": "span",
                    "type": "element",
                  },
                  {
                    "children": [
                      {
                        "type": "text",
                        "value": " {",
                      },
                    ],
                    "props": {
                      "style": "color:#E1E4E8",
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
                        "value": "  private",
                      },
                    ],
                    "props": {
                      "style": "color:#F97583",
                    },
                    "tag": "span",
                    "type": "element",
                  },
                  {
                    "children": [
                      {
                        "type": "text",
                        "value": " name",
                      },
                    ],
                    "props": {
                      "style": "color:#FFAB70",
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
                      "style": "color:#F97583",
                    },
                    "tag": "span",
                    "type": "element",
                  },
                  {
                    "children": [
                      {
                        "type": "text",
                        "value": " string",
                      },
                    ],
                    "props": {
                      "style": "color:#79B8FF",
                    },
                    "tag": "span",
                    "type": "element",
                  },
                  {
                    "children": [
                      {
                        "type": "text",
                        "value": " =",
                      },
                    ],
                    "props": {
                      "style": "color:#F97583",
                    },
                    "tag": "span",
                    "type": "element",
                  },
                  {
                    "children": [
                      {
                        "type": "text",
                        "value": " \\"foo\\"",
                      },
                    ],
                    "props": {
                      "style": "color:#9ECBFF",
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
                      "style": "color:#E1E4E8",
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
              {
                "children": [],
                "props": {
                  "class": "line",
                  "line": 4,
                },
                "tag": "span",
                "type": "element",
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
          "className": "language-ts shiki shiki-themes github-dark",
          "code": "class C {
      private name: string = \\"foo\\"
    }
    ",
          "filename": undefined,
          "highlights": undefined,
          "language": "ts",
          "meta": "",
          "style": "background-color:#24292e;color:#e1e4e8",
        },
        "tag": "pre",
        "type": "element",
      },
      {
        "children": [
          {
            "type": "text",
            "value": "",
          },
        ],
        "props": {},
        "tag": "style",
        "type": "element",
      },
    ]
  `)
})