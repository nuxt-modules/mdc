<template>
  <div>
    Rendering the <ProseCode>script</ProseCode> element is dangerous and is disabled by default. Consider implementing your own <ProseCode>ProseScript</ProseCode> element to have control over script rendering.
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
