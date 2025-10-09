<template>
  <div>
    <slot name="header" mdc-unwrap="p" />
    <slot />
    <slot name="footer" :href="href" />
  </div>
</template>

<script setup>
const href = 'https://example.com'
</script>
