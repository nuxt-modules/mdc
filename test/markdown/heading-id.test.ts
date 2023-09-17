import { expect, it } from 'vitest'
import { parseMarkdown } from '../utils/parser'

const md = `
# Hello
# Hello World
# <a href="#xx" /> Foo
## C. Great
## 1. Introduction
## ending space
### Slash - in - Title
### -Starting dash
### Ending dash-
### -Dash-
`.trim()

it('Heading id', async () => {
    const { data, body } = await parseMarkdown(md)

    expect(Object.keys(data)).toHaveLength(2)

    expect(body.children).toMatchObject([
      { props: { id: 'hello'} },
      { props: { id: 'hello-world'} },
      { props: { id: 'foo'} },
      { props: { id: 'c-great' } },
      { props: { id: '_1-introduction' } },
      { props: { id: 'ending-space' } },
      { props: { id: 'slash-in-title' } },
      { props: { id: 'starting-dash' } },
      { props: { id: 'ending-dash' } },
      { props: { id: 'dash' } },
    ])
})
