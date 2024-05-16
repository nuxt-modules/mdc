<template>
  <MDC
    v-slot="{ body, data }"
    :value="md"
  >
    <MDCRenderer
      :body="body"
      :data="data"
      :components="{ p: 'global-paragraph' }"
    />
  </MDC>
</template>

<script setup lang="ts">
const md = `
---
title: Sample
---

Sample paragraph
`.trim()
</script>
