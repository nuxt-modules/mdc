<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import type { MDCParserResult } from '@nuxtjs/mdc'
import { stringifyMarkdown } from '../../src/runtime/stringify'
import { markdownFeatures, samllDemo, table } from '../utils/markdowns'
import { parseMarkdown } from '../../src/runtime'
import { useColorMode } from '#build/imports'

const examples = {
  default: samllDemo,
  features: markdownFeatures,
  table
}

const colorMode = useColorMode()
const source = useLocalStorage('nuxt-mdc-playground-code', examples.default)
const outputFromMDC = ref<string | null>('')
const ast = ref<MDCParserResult>()
const mounted = ref(false)

watch([source, mounted], async () => {
  if (mounted.value) {
    ast.value = await parseMarkdown(source.value)
    outputFromMDC.value = await stringifyMarkdown(ast.value.body, ast.value.data)
  }
})

onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <div class="flex w-screen h-screen">
    <div class="fixed left-0 right-0 h-12 px-2 p-1 backdrop-blur-xl flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
      <div>
        <UButton v-for="(example, name) in examples" :key="name" size="xs" :color="source === example ? 'green' : 'gray'" variant="ghost" @click="source = example">
          {{ name }}
        </UButton>
        .
        <UButton size="xs" color="gray" variant="ghost" to="/async-components">
          Async Components
        </UButton>
      </div>
      <UButton :icon="colorMode.preference === 'dark' ? 'lucide-moon' : 'lucide-sun'" color="gray" variant="ghost" size="xs" @click="colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'" />
    </div>
    <div class="flex flex-1 pt-12">
      <div class="flex-1 flex flex-col border-2 border-neutral-900">
        <code class="text-xs px-2 py-1">Source</code>
        <Editor v-model:code="source" class="flex-1" />
        <!-- MDC AST -->
        <code class="text-xs px-2 py-1">MDC AST</code>
        <Editor :code="JSON.stringify(ast?.body, null, 2) || ''" language="json" class="flex-1" read-only />
      </div>
      <div class="flex-1 h-full flex flex-col  border-2 border-neutral-900">
        <code class="text-xs px-2 py-1">Source -> MDC -> Render</code>
        <div class="flex-1 overflow-scroll prose dark:prose-invert p-4">
          <MDCRenderer
            v-if="ast"
            :body="ast!.body"
            :data="ast!.data"
            class="flex-1"
          />
        </div>
        <code class="text-xs px-2 py-1">Source -> MDC -> Markdown</code>

        <Editor :code="outputFromMDC || ''" class="flex-1" read-only />
      </div>
    </div>
  </div>
</template>
