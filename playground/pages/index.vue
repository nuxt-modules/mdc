<template>
  <div>
    <PageNav />
    <div
      v-if="ast"
      class="page-mdc-content"
    >
      <Suspense suspensible>
        <MDCRenderer
          v-if="ast.body"
          :body="ast.body"
          :data="ast.data"
        />
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import { parseMarkdown } from '@nuxtjs/mdc/runtime'
import { useRoute, computed, serveCachedData, useFetch, useAsyncData } from '#imports'

const route = useRoute()
const fetchKey = computed((): string => `portal-page${route.path.replace(/\//g, '-')}`)

const { transform, getCachedData } = serveCachedData()
const { data: pageData } = await useFetch('/api/markdown', {
  key: fetchKey.value,
  transform,
  getCachedData
})
const { data: ast } = await useAsyncData<any>(() => parseMarkdown(pageData.value?.content || ''), {
  transform,
  getCachedData
})
</script>
