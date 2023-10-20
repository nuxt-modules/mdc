<template>
  <div>
    This is possibly dangerous, you should implement your own <ProseCode>ProseScript</ProseCode> element.
  </div>
</template>

<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: ''
  }
})
</script>
