import { expect, it } from 'vitest'
import { parseMarkdown } from '../utils/parser'

const md = `
\`\`\`ts {2,3}
class C {
  private name: string = "foo"
  private age: number = 18
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
  expect((body.children[0] as any).props?.highlights).toEqual([2, 3])
  expect((body.children[0] as any).children[0].children[1].props.class).toEqual(['line', 'highlight'])
  expect((body.children[0] as any).children[0].children[2].props.class).toEqual(['line', 'highlight'])
})
