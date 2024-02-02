import { expect, it } from 'vitest'
import { parseMarkdown } from '../utils/parser'

const md = `
\`const codeInline: string = 'highlighted code inline'\`{lang="ts"}
`.trim()

it('', async () => {
    const { body } = await parseMarkdown(md, {
        highlight: {
            theme: 'github-dark'
        }
    })

    expect(body).toHaveProperty('type', 'root')
    expect(body.children).toHaveLength(2)
    expect(body).toHaveProperty('children[0].tag', 'p')
    expect(body).toHaveProperty('children[0].children[0].tag', 'code')
    expect(body).toHaveProperty('children[0].children[0].props.language', 'ts')
    expect(body).toHaveProperty('children[0].children[0].props.className', 'language-ts shiki shiki-themes github-dark')
    expect(body).toMatchInlineSnapshot(`
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
                        "value": "const",
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
                        "value": " codeInline",
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
                        "value": " 'highlighted code inline'",
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
                  "className": "language-ts shiki shiki-themes github-dark",
                  "language": "ts",
                  "style": "",
                },
                "tag": "code",
                "type": "element",
              },
            ],
            "props": {},
            "tag": "p",
            "type": "element",
          },
          {
            "children": [
              {
                "type": "text",
                "value": "html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}",
              },
            ],
            "props": {},
            "tag": "style",
            "type": "element",
          },
        ],
        "type": "root",
      }
    `)
})
