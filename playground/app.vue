<template>
  <div class="grid grid-cols-2 h-screen">
    <textarea
      v-model="md"
      class="w-full p-4"
    />
    <MDC
      v-slot="{ data, body }"
      tag="article"
      :value="md"
      class="p-4"
    >
      <h1>{{ data?.name }}</h1>
      <MDCRenderer
        tag="div"
        :body="body"
        :data="data"
        :prose="false"
      />
    </MDC>
  </div>
</template>

<script setup>
import { useDark, useLocalStorage } from '@vueuse/core'

useDark()

const key = 'nuxt-mdc-playground-code'
const md = useLocalStorage(key,
`---
name: Sam
---

# Simple

Simple paragraph

Inline code: \`const codeInline: string = 'highlighted code inline'\`{lang="ts"}

Code block:
\`\`\`typescript[filename]{1,3-5}meta
import { parseMarkdown } from '@nuxtjs/mdc/runtime'

async function main(mdc: string) {
  const ast = await parseMarkdown(mdc)

  // Do your magic with parsed AST tree

  return ast
}
\`\`\`
`)
</script>

<style>
.line {
  display: block;
}
.line.highlight {
  width: 100%;
  background-color: #8882 !important;
}
.line:empty::before {
  content: "\200b";
}
</style>
