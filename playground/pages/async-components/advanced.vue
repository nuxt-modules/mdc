<template>
  <div>
    <PageNav />
    <div
      v-if="ast"
      class="page-mdc-content prose"
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

<style scoped>
:deep(h1) {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
}

:deep(h2) {
  font-size: 20px;
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
