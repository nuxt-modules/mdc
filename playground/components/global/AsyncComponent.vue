<template>
  <Suspense suspensible>
    <UAlert
      color="primary"
      variant="subtle"
      class="my-4"
    >
      <template #description>
        <h2 class="font-semibold">
          Async Component
        </h2>
        <p>
          This is an async component that simulates async data fetching inside of the MDCRenderer component.
        </p>
      </template>
    </UAlert>
  </Suspense>
</template>

<script setup lang="ts">
// Simulate async data fetching
await new Promise(resolve => setTimeout(resolve, 2500))
</script>

<style scoped>
p {
  margin: 0;
}
</style>
