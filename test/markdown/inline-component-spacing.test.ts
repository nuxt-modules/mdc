import { expect, it } from 'vitest'
import { parseMarkdown, stringifyMarkdown } from '../utils/parser'

it('Add space before and after :br', async () => {
  const input = `Hello\\\nWorld`

  const { body } = await parseMarkdown(input)
  const output = await stringifyMarkdown(body)

  expect(output).toBe(`Hello :br\nWorld\n`)
})

it('Add space before :br', async () => {
  const input = `\\\nWorld`

  const { body } = await parseMarkdown(input)
  const output = await stringifyMarkdown(body)

  expect(output).toBe(`:br\nWorld\n`)
})

it('Ensure spacing between inline components', async () => {
  const input = `This is a :test :for components :spacing`

  const { body } = await parseMarkdown(input)
  const output = await stringifyMarkdown(body)

  expect(output).toBe(`This is a :test :for components :spacing\n`)
})

it('Allow punctuation after inline components', async () => {
  const input = `This is a :test :for components :spacing,`

  const { body } = await parseMarkdown(input)
  const output = await stringifyMarkdown(body)

  expect(output).toBe(`This is a :test :for components :spacing,\n`)
})

it('No spacing inside inline components', async () => {
  const inputs = [
    `**:component[text]{.class}**`,
    `*:component[text]{.class}*`,
    `[:component[text]{.class}]`
  ]

  for (const input of inputs) {
    const { body } = await parseMarkdown(input)
    const output = await stringifyMarkdown(body)

    expect(output).toBe(input + '\n')
  }
})
