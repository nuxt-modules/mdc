<template>
  <p>
    [Custom Paragraph]
    <MDCSlot
      :use="$slots.default"
      unwrap="p"
    />
  </p>
</template>
