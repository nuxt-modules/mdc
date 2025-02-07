import { expect, it } from 'vitest'
import { parseMarkdown } from '../utils/parser'

const md = `
# Some headline

Following are some image links:

![absolute image](/path/to/my/image.png)

![relative image](../relative/path/to/image.png)

![image](https://placehold.co/200x200.png)

`.trim()

it('Sanity test for image links, all should be allowed', async () => {
  const { body } = await parseMarkdown(md)

  expect(body.children[2].children[0].tag).toEqual('img')
  expect(body.children[2].children[0].props.src).toEqual('/path/to/my/image.png')

  expect(body.children[3].children[0].tag).toEqual('img')
  expect(body.children[3].children[0].props.src).toEqual('../relative/path/to/image.png')

  expect(body.children[4].children[0].tag).toEqual('img')
  expect(body.children[4].children[0].props.src).toEqual('https://placehold.co/200x200.png')
})
