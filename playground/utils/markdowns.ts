export const samllDemo = `---
title: Sam
---

# Simple

Simple paragraph

Inline code \`const codeInline: string = 'highlighted code inline'\`{lang="ts"} can be contained in paragraphs.

Code block:
\`\`\`typescript[filename]{1,3-5}meta
import { parseMarkdown } from '@nuxtjs/mdc/runtime'

async function main(mdc: string) {
  const ast = await parseMarkdown(mdc)
  // Do your magic with parsed AST tree

  return ast // [!code ++]
  return ast // [!code --]
}
\`\`\`
`

export const markdownFeatures = `
# Sample Markdown Snippet

## Features of Markdown

Markdown supports various features that allow you to format your text easily. Here are some examples:

### 1. Headers
You can create headers by using the \`#\` symbol. The number of \`#\` symbols indicates the level of the header.

### 2. Emphasis
You can emphasize text using:
- **Bold**: \`**bold text**\` or \`__bold text__\`
- *Italic*: \`*italic text*\` or \`_italic text_\`
- ~~Strikethrough~~: \`~~strikethrough~~\`

### 3. Lists
You can create ordered and unordered lists:
- Unordered list:
  - Item 1
  - Item 2
    - Subitem 2.1
- Ordered list:
  1. First item
  2. Second item

### 4. Links
You can create links using the following syntax: [Link Text](http://example.com)

### 5. Images
You can embed images using: ![Alt Text](http://example.com/image.jpg)

### 6. Code
You can include inline code using backticks: \`console.log('Hello, World!')\`

You can also create code blocks:

\`\`\`javascript
function greet() {
  console.log('Hello, World!');
}
\`\`\`

Value:
- \`object\`: will customize the link generation.
  - \`h1: boolean\`{lang=ts}: Whether render **anchor link** for \`H1\` tags or not.
    - Sub list


## Table

| Feature     | Description                                                     |
| ----------- | --------------------------------------------------------------- |
| Headers     | Create headers using the \`#\` symbol.                            |
| Emphasis    | Use \`**bold**\`, \`*italic*\`, and \`~~strikethrough~~\`.            |
| Lists       | Create ordered and unordered lists.                             |
| Links       | Create links with \`[Link Text](http://example.com)\`.            |
| Images      | Embed images using \`![Alt Text](http://example.com/image.jpg)\`. |
| Code        | Include inline code with backticks: \`\` \`code\` \`\`.               |

## Components

::component-name{attribute=value}
---
attribute2: value
prop2: value
prop4: prop4 value
---

Default slot content

#footer

This is a footer, with a link to [Nuxt](https://nuxt.com)
::

`

export const table = `| Item              | In Stock | Price |
| :---------------- | :------: | ----: |
| Python **Hat**    |   True   | 23.99 |
| SQL Hat           |   True   | 23.99 |
| Codecademy Tee    |  False   | 19.99 |
| Codecademy Hoodie |  False   | 42.99 |`
