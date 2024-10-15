<template>
  <div class="root">
    <Suspense suspensible>
      <NuxtPage />
    </Suspense>
  </div>
</template>

<style scoped>
.root {
  margin: 0;
  padding: 20px;
}

:deep(h1) {
  font-size: 20px;
  margin-bottom: 20px;
}
</style>
