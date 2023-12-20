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
                      "style": "--shiki-default:#F97583",
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
                      "style": "--shiki-default:#B392F0",
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
                      "style": "--shiki-default:#E1E4E8",
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
                      "style": "--shiki-default:#F97583",
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
                      "style": "--shiki-default:#FFAB70",
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
                      "style": "--shiki-default:#F97583",
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
                      "style": "--shiki-default:#79B8FF",
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
                      "style": "--shiki-default:#F97583",
                    },
                    "tag": "span",
                    "type": "element",
                  },
                  {
                    "children": [
                      {
                        "type": "text",
                        "value": " "foo"
    ",
                      },
                    ],
                    "props": {
                      "style": "--shiki-default:#9ECBFF",
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
                        "value": "}
    ",
                      },
                    ],
                    "props": {
                      "style": "--shiki-default:#E1E4E8",
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
              "__ignoreMap": "",
            },
            "tag": "code",
            "type": "element",
          },
        ],
        "props": {
          "className": "language-ts shiki shiki-themes github-dark",
          "code": "class C {
      private name: string = "foo"
    }
    ",
          "language": "ts",
          "meta": "",
          "style": "",
        },
        "tag": "pre",
        "type": "element",
      },
      {
        "children": [
          {
            "type": "text",
            "value": "html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}",
          },
        ],
        "props": {},
        "tag": "style",
        "type": "element",
      },
    ]
  `)
})
