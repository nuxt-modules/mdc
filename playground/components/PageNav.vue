<template>
  <nav class="p-1 flex gap-1 justify-between items-center border-b-2 border-b-gray-600 mb-2 px-5 py-4">
    <ul class="flex gap-1">
      <li>
        <UButton class="block" size="xs" to="/async-components">
          Simple Async Example
        </UButton>
      </li>
      <li>
        <UButton class="block" size="xs" to="/async-components/advanced">
          Advanced Async Example
        </UButton>
      </li>
      <li>
        <UButton class="block" size="xs" to="/async-components/no-async">
          No Async Components
        </UButton>
      </li>
    </ul>
    <ul class="flex gap-1">
      <li>
        <UButton class="block" size="xs" to="/">
          Back to Playground
        </UButton>
      </li>
    </ul>
  </nav>
</template>
