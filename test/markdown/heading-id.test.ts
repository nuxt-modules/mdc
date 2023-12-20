import { expect, it } from 'vitest'
import { parseMarkdown } from '../utils/parser'

const md = `
# Hello
# Hello World
# <a href="#xx"></a> Foo
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

    const ids = [
      'hello',
      'hello-world',
      'foo',
      'c-great' ,
      '_1-introduction',
      'ending-space',
      'slash-in-title',
      'starting-dash',
      'ending-dash',
      'dash'
    ]
    ids.forEach((id, index) => {
      expect((body.children[index] as any).props.id).toEqual(id)
    })
})
