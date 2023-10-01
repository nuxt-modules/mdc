![Nuxt MDC](https://github.com/nuxt-modules/mdc/assets/904724/ce6aa142-0820-4bcc-988c-a926cf03f0a5)

# Nuxt MDC

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

MDC supercharges regular Markdown to write documents interacting deeply with any Vue component. MDC stands for MarkDown Components.

- [✨ &nbsp;Release Notes](https://github.com/nuxt-modules/mdc/releases)
- [🏀 &nbsp;Online Playground](https://stackblitz.com/github/nuxt-modules/mdc?file=playground%2Fapp.vue)
- [🧩 &nbsp;VS Code Extension](https://marketplace.visualstudio.com/items?itemName=Nuxt.mdc)

## Features

- Mix Markdown syntax with HTML tags or Vue components
- Unwrap any generated content (ex: `<p>` added by each Markdown paragraph)
- Use Vue components with named slots
- Support inline components
- Add attributes and classes to inline HTML tags

Learn more about the MDC syntax on https://content.nuxtjs.org/guide/writing/mdc

## Install

```bash
# Using npm
npm install --save-dev @nuxtjs/mdc

# Using yarn
yarn add --dev @nuxtjs/mdc

# Using pnpm
pnpm add --dev @nuxtjs/mdc
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
  <MDC :value="md" tag="article" />
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

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/mdc/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@nuxtjs/mdc

[npm-downloads-src]: https://img.shields.io/npm/dm/@nuxtjs/mdc.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/mdc

[license-src]: https://img.shields.io/github/license/nuxt-modules/mdc.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://github.com/nuxt-modules/mdc/blob/main/LICENSE

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
