<template>
  <div>
    <PageNav />
    <div
      v-if="ast"
      class="page-mdc-content"
    >
      <UAlert
        color="blue"
        variant="subtle"
        class="mb-4"
      >
        <template #description>
          <p class="mb-2">
            You can refresh the page to see there are no hydration errors in the console.
          </p>
          <p>
            Navigate to the <ULink to="/async-components/second">
              /second
            </ULink> page, refresh, and then click on the <b>Async Components</b> link to see the client-side routing waits for the nested content to resolve.
          </p>
        </template>
      </UAlert>
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
h1,
:deep(h1) {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
}

.page-mdc-content {
  padding: 20px;
}
</style>
