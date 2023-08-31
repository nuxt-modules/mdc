<template>
  <component :is="tag">
    <slot
      :data="data?.data"
      :body="data?.body"
    >
      <MDCRenderer
        :body="data?.body"
        :data="data?.data"
      />
    </slot>
  </component>
</template>

<script setup lang="ts">
import { hash } from 'ohash'
import { useAsyncData } from 'nuxt/app'
import { parseMarkdown } from '../parser'
import { watch, computed } from 'vue'

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

const key = computed(() => hash(props.value))

const { data, refresh } = await useAsyncData(key.value, async () => await parseMarkdown(props.value, { highlight: {}}))

watch(() => props.value, () => {
  refresh()
})
</script>