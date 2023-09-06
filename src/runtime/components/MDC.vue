<template>
  <component :is="tag">
    <slot
      :data="data?.data"
      :body="data?.body"
      :toc="data?.toc"
      :excerpt="data?.excerpt"
    >
      <MDCRenderer
        :body="excerpt ? data?.excerpt : data?.body"
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
  /**
   * Raw markdown string or parsed markdown object from `parseMarkdown`
   */
  value: {
    type: [String, Object],
    required: true
  },
  /**
   * Render only the excerpt
   */
  excerpt: {
    type: Boolean,
    default: false
  }
})

const key = computed(() => hash(props.value))

const { data, refresh } = await useAsyncData(key.value, async () => {
  if (typeof props.value !== 'string') {
    return props.value
  }
  return await parseMarkdown(props.value)
})

watch(() => props.value, () => {
  refresh()
})
</script>