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

That's it! You can start writing and rendering markdown files ✨

## Rendering

`@nuxtjs/mdc` exposes three components to render markdown files.

### `<MDC>`

Using `<MDC>`, you can parse and render markdown contents right inside your components/pages. This component takes raw markdown, parses it using the `parseMarkdown` function, and then renders it with `<MDCRenderer>`.

```html
<script setup lang="ts">
const md = `
::alert
Hello MDC
::
`
</script>

<template>
  <MDC :value="md" tag="article" />
</template>
```

Note that `::alert` will use the `components/global/Alert.vue` component.

### `<MDCRenderer>`

This component will take the result of [`parseMarkdown`](#parsing-markdown) function and render the contents. For example, this is an extended version of the sample code in the [Browser section](#browser) which uses `MDCRenderer` to render the parsed markdown.

```html [mdc-test.vue]
<script setup lang="ts">
import { parseMarkdown } from '@nuxtjs/mdc/runtime'

const ast = await useAsyncData('markdown', () => parseMarkdown('::alert\nMissing markdown input\n::'))
</script>

<template>
  <MDCRenderer :body="ast.body" :data="ast.data" />
</template>
```

### `<MDCSlot>`

This component is a replacement for Vue's `<slot/>` component, specifically designed for MDC. Using this component, you can render a component's children while removing one or multiple wrapping elements. In the below example, the Alert component receives text and its default slot (children). But if the component renders this slot using the normal `<slot/>`, it will render a `<p>` element around the text.

```md [markdown.md]
::alert
This is an Alert
::
```

```html [Alert.vue]
<template>
  <div class="alert">
    <!-- Slot will render <p> tag around the text -->
    <slot />
  </div>
</template>
```

It is the default behavior of markdown to wrap every text inside a paragraph. MDC didn't come to break markdown behavior; instead, the goal of MDC is to make markdown powerful. In this example and all similar situations, you can use `<MDCSlot />` to remove unwanted wrappers.

```html [Alert.vue]
<template>
  <div class="alert">
    <!-- MDCSlot will only render the actual text without the wrapping <p> -->
    <MDCSlot unwrap="p" />
  </div>
</template>
```

### Prose Components

Prose components are a list of components that will be rendered instead of regular HTML tags. For example, instead of rendering a `<p>` tag, `@nuxtjs/mdc` renders a `<ProseP>` component. This is useful when you want to add extra features to your markdown files. For example, you can add a `copy` button to your code blocks.

You can disable prose components by setting the `prose` option to `false` in `nuxt.config.ts`. Or extend the map of prose components to add your own components.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxtjs/mdc'],
  mdc: {
    components: {
      prose: false, // Disable predefined prose components
      map: {
        p: 'MyCustomPComponent'
      }
    }
  }
})
```

Here is the list of available prose components:

| Tag | Component | Source | Description |
| -- | -- | -- | -- |
| `p` | `<ProseP>` | [ProseP.vue](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProseP.vue) | Paragraph |
| `h1` | `<ProseH1>` | [ProseH1.vue](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProseH1.vue) | Heading 1 |
| `h2` | `<ProseH2>` | [ProseH2.vue](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProseH2.vue) | Heading 2 |
| `h3` | `<ProseH3>` | [ProseH3.vue](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProseH3.vue) | Heading 3 |
| `h4` | `<ProseH4>` | [ProseH4.vue](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProseH4.vue) | Heading 4 |
| `h5` | `<ProseH5>` | [ProseH5.vue](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProseH5.vue) | Heading 5 |
| `h6` | `<ProseH6>` | [ProseH6.vue](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProseH6.vue) | Heading 6 |
| `ul` | `<ProseUl>` | [ProseUl.vue](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProseUl.vue) | Unordered List |
| `ol` | `<ProseOl>` | [ProseOl.vue](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProseOl.vue) | Ordered List |
| `li` | `<ProseLi>` | [ProseLi.vue](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProseLi.vue) | List Item |
| `blockquote` | `<ProseBlockquote>` | [ProseBlockquote.vue](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProseBlockquote.vue) | Blockquote |
| `hr` | `<ProseHr>` | [ProseHr.vue](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProseHr.vue) | Horizontal Rule |
| `pre` | `<ProsePre>` | [ProsePre.vue](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProsePre.vue) | Preformatted Text |
| `code` | `<ProseCode>` | [ProseCode.vue](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProseCode.vue) | Code Block |
| `table` | `<ProseTable>` | [ProseTable.vue](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProseTable.vue) | Table |
| `thead` | `<ProseThead>` | [ProseThead.vue](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProseThead.vue) | Table Head |
| `tbody` | `<ProseTbody>` | [ProseTbody.vue](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProseTbody.vue) | Table Body |
| `tr` | `<ProseTr>` | [ProseTr.vue](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProseTr.vue) | Table Row |
| `th` | `<ProseTh>` | [ProseTh.vue](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProseTh.vue) | Table Header |
| `td` | `<ProseTd>` | [ProseTd.vue](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProseTd.vue) | Table Data |
| `a` | `<ProseA>` | [ProseA.vue](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProseA.vue) | Anchor Link |
| `img` | `<ProseImg>` | [ProseImg.vue](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProseImg.vue) | Image |
| `em` | `<ProseEm>` | [ProseEm.vue](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProseEm.vue) | Emphasis |
| `strong` | `<ProseStrong>` | [ProseStrong.vue](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProseStrong.vue) | Strong |

## Parsing Markdown

Nuxt MDC exposes a handy helper to parse MDC files. You can import the `parseMarkdown` function from `@nuxtjs/mdc/runtime` and use it to parse markdown files written with MDC syntax.

### Node.js

```ts
// server/api/parse-mdc.ts
import { parseMarkdown } from '@nuxtjs/mdc/runtime'

export default eventHandler(async () => {
  const mdc = [
    '# Hello MDC',
    '',
    '::alert',
    'This is an Alert',
    '::'
  ].join('\n')

  const ast = await parseMarkdown(mdc)

  return ast
})
```

### Browser

The `parseMarkdown` function is a universal helper, and you can also use it in the browser, for example inside a Vue component.

```vue
<script setup lang="ts">
import { parseMarkdown } from '@nuxtjs/mdc/runtime'

const ast = await useAsyncData('markdown', () => parseMarkdown('::alert\nMissing markdown input\n::'))
</script>

<template>
  <MDCRenderer :body="ast.body" :data="ast.data" />
</template>
```

### Options

The `parseMarkdown` helper also accepts options as the second argument to control the parser's behavior. (Checkout [`MDCParseOptions` interface↗︎](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/types/parser.ts)).

| Name | Default | Description |
| --  | -- | -- |
| `remark.plugins` | `{}` | Register / Configure parser's remark plugins. |
| `rehype.options` | `{}` | Configure `remark-rehype` options.  |
| `rehype.plugins` | `{}` | Register / Configure parser's rehype plugins. |
| `highlight` | `false` | Control whether code blocks should highlight or not. You can also provide a custom highlighter.  |
| `toc.depth` | `2` | Maximum heading depth to include in the table of contents.  |
| `toc.searchDepth` | `2` | Maximum depth of nested tags to search for heading. |

Checkout [`MDCParseOptions` types↗︎](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/types/parser.ts).

## Configurations

You can configure the module by providing the `mdc` property in your `nuxt.config.js`; here are the default options:

```ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@nuxtjs/mdc'],
  mdc: {
    remarkPlugins: {
      plugins: {
        // Register/Configure remark plugin to extend the parser
      }
    },
    rehypePlugins: {
      options: {
        // Configure rehype options to extend the parser
      },
      plugins: {
        // Register/Configure rehype plugin to extend the parser
      }
    },
    headings: {
      anchorLinks: {
        // Enable/Disable heading anchor links. { h1: true, h2: false }
      }
    },
    highlight: false, // Control syntax highlighting
    components: {
      prose: false, // Add predefined map to render Prose Components instead of HTML tags, like p, ul, code
      map: {
        // This map will be used in `<MDCRenderer>` to control rendered components
      }
    }
  }
})
```

Checkout [`ModuleOptions` types↗︎](https://github.com/nuxt-modules/mdc/blob/main/src/types.ts).

## Contributing

You can contribute to this module online with CodeSandbox:

[![Edit @nuxtjs/mdc](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/nuxt-modules/mdc/tree/main/?fontsize=14&hidenavigation=1&theme=dark)

Or locally:

1. Clone this repository
2. Install dependencies using `pnpm install`
3. Start the development server using `pnpm dev`

## License

[MIT License](https://github.com/nuxt-modules/mdc/blob/main/LICENSE)

Copyright (c) NuxtLabs

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/mdc/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@nuxtjs/mdc

[npm-downloads-src]: https://img.shields.io/npm/dm/@nuxtjs/mdc.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/mdc

[license-src]: https://img.shields.io/github/license/nuxt-modules/mdc.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://github.com/nuxt-modules/mdc/blob/main/LICENSE


[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
