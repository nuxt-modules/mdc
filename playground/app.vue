<template>
  <div class="">
    <div class="p-1 flex gap-1">
      <UButton v-for="(example, name) in examples" :key="name" size="xs" @click="md = example">
        {{ name }}
      </UButton>
    </div>
    <div class="grid grid-cols-3 h-screen">
      <textarea
        v-model="md"
        class="w-full p-4 bg-gray-600 font-mono text-sm"
      />
      <MDC
        v-slot="{ data, body }"
        :value="md"
      >
        <pre class="h-screen overflow-auto bg-gray-700 text-xs">{{ body }}</pre>
        <article class="p-4 prose prose-invert bg-gray-900">
          <h1 v-if="data?.title">
            {{ data.title }}
          </h1>
          <MDCRenderer
            v-if="body"
            :body="body"
            :data="data"
          />
        </article>
      </MDC>
    </div>
  </div>
</template>

<script setup>
import { useDark, useLocalStorage } from '@vueuse/core'

useDark()

const examples = {
  default: `---
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
`,
  table: `| Item              | In Stock | Price |
| :---------------- | :------: | ----: |
| Python **Hat**    |   True   | 23.99 |
| SQL Hat           |   True   | 23.99 |
| Codecademy Tee    |  False   | 19.99 |
| Codecademy Hoodie |  False   | 42.99 |`
}

const key = 'nuxt-mdc-playground-code'
const md = useLocalStorage(key, examples.default)
</script>

<style>
pre {
  padding: 1em 0 !important;
  --tw-prose-pre-bg: #8881 !important;
}
.line {
  display: block;
  padding: 0 1rem;
}
.line.highlight {
  width: 100%;
  background-color: #8881 !important;
}
.line.diff.remove {
  background-color: rgba(194, 58, 58, 0.3) !important;
}
.line.diff.add {
  background-color: rgba(46, 141, 46, 0.3) !important;
}
.line.diff.remove::before {
  content: '-';
  color: #c23a3a;
  position: absolute;
}
.line.diff.add::before {
  content: '+';
  color: #23b73c;
  position: absolute;
}
</style>
