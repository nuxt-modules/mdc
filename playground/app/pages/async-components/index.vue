<template>
  <div>
    <PageNav />
    <div
      v-if="ast"
      class="page-mdc-content prose dark:prose-invert"
    >
      <MDCRenderer
        v-if="ast.body"
        :body="ast.body"
        :data="ast.data"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { parseMarkdown } from '@nuxtjs/mdc/runtime'
import { useAsyncData } from '#imports'

const md = `# Simple Async Example

:async-component

This page contains a simple async component example (above) that simulates async data fetching inside of the \`MDCRenderer\` component.

You can refresh the page to see there are no hydration errors in the console.

Navigate to the [No Async Components page](/async-components/no-async), refresh, and then click on the [Simple Async Example](/async-components) link to see the client-side routing waits for the nested content to resolve.
`
const { data: ast } = await useAsyncData<any>(() => parseMarkdown(md))
</script>

<style scoped>
h1,
:deep(h1) {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
}

.page-mdc-content {
  padding: 20px;
}

:deep(p) {
  margin: 0 0 16px;

  a {
    color: #4ade80;
  }
}
</style>
