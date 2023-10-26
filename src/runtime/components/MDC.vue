<template>
  <slot
    :data="data?.data"
    :body="data?.body"
    :toc="data?.toc"
    :excerpt="data?.excerpt"
  >
    <MDCRenderer
      v-if="body"
      :tag="tag"
      :class="props.class"
      :body="body"
      :data="data?.data"
    />
  </slot>
</template>

<script setup lang="ts">
import { hash } from 'ohash'
import { useAsyncData } from 'nuxt/app'
import { parseMarkdown } from '../parser'
import { watch, computed, type PropType } from 'vue'
import type { MDCParseOptions } from '../types'

const props = defineProps({
  tag: {
    type: [String, Boolean],
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
  },
  /**
   * Options for `parseMarkdown`
   */
  parserOptions: {
    type: Object as PropType<MDCParseOptions>,
    default: () => ({})
  },
  /**
   * Class to be applied to the root element
   */
  class: {
    type: [String, Array, Object],
    default: ''
  }
})

const key = computed(() => hash(props.value))

const { data, refresh } = await useAsyncData(key.value, async () => {
  if (typeof props.value !== 'string') {
    return props.value
  }
  return await parseMarkdown(props.value, props.parserOptions)
})

const body = computed(() => props.excerpt ? data.value?.excerpt : data.value?.body)

watch(() => props.value, () => {
  refresh()
})
</script>
