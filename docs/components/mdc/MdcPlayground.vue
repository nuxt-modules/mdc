<template>
  <div class="wrapper">
    <textarea
      v-model="md"
      class="w-full p-4"
    />
    <MDC
      tag="article"
      :value="md"
      class="p-4"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const md = ref(`---
title: Hello MDC
---

# {{ title }}

Try me

> Set not thy heart on any good or gain.
> Omar Khayyam

\`\`\`html
  <MDC
    tag="article"
    :value="markdownContent"
  />
\`\`\`
`)
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr)); 
  height: 400px; 
  border: 1px solid;
  overflow: hidden;
  border-radius: 0.25rem; 
}
.wrapper > article {
  overflow: scroll;
}
.p-4 {
  padding: 1em;
}
</style>