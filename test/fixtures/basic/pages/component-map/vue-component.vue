<template>
  <MDC
    v-slot="{ body, data }"
    :value="md"
  >
    <MDCRenderer
      :body="body"
      :data="data"
      :components="{ p: CustomParagraph }"
    />
  </MDC>
</template>

<script setup lang="ts">
import CustomParagraph from '~/components/CustomParagraph.vue'

const md = `
---
title: Sample
---

Sample paragraph
`.trim()
</script>
