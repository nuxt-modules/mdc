<template>
  <component :is="tag">
    <slot
      :data="data?.data"
      :body="data?.body"
    >
      <MDCRenderer
        :value="data?.body"
        :data="data?.data"
      />
    </slot>
  </component>
</template>

<script setup lang="ts">
import { useAsyncData } from 'nuxt/app'
import { parseMarkdown } from '../parser'
import { watch } from 'vue'

const props = defineProps({
  tag: {
    type: String,
    default: 'div'
  },
  value: {
    type: String,
    required: true
  }
})

const { data, refresh } = await useAsyncData(async () => await parseMarkdown(props.value, { highlight: {}}))

watch(() => props.value, () => {
  refresh()
})
</script>