import { describe, expect, it } from 'vitest'
import { parseMarkdown } from '../utils/parser'

const md = `
::block-component{prop=value}
Default slot
::
`.trim()

describe('Single Block Compoennt', () => {
  it('', async () => {
    const { data, body } = await parseMarkdown(md)

    expect(Object.keys(data)).toHaveLength(2)

    expect(body.children).toHaveLength(1)
    expect(body.children[0]).toMatchObject({
      type: 'element',
      tag: 'block-component',
      props: {
        prop: 'value'
      }
    })
  })
})
