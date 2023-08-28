# Nuxt MDC

MDC supercharges regular Markdown to write documents interacting deeply with any Vue component.

## Install

```bash
# Using Yarn
yarn add --dev @nuxtjs/mdc
# Using NPM
npm install --save-dev @nuxtjs/mdc
```

Then, add `@nuxtjs/mdc` to the modules section of your `nuxt.config.ts`

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxtjs/mdc']
})
```

## Use

Parse MDC content in any environment:

```ts [parse-mdc.ts]
import { parseMarkdown } from '@nuxtjs/mdc/runtime'

async function main(mdc: string) {
  const ast = await parseMarkdown(mdc)

  // Do your magic with parsed AST tree

  return ast
}
```

Render MDC content with `<MDC>` component:

```html
<template>
  <MDC :value="md"  tag="article" />
</template>

<script setup lang="ts">
const md = `
::alert
Hello MDC
::
`
</script>
```


## 💻 Development

- Clone repository
- Install dependencies using `pnpm install`
- Prepare using `pnpm dev:prepare`
- Try playground using `pnpm dev`

## License

[MIT](./LICENSE) - Made with 💚
