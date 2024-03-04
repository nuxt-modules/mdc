<template>
  <p>
    [Global Paragraph]
    <MDCSlot
      :use="$slots.default"
      unwrap="p"
    />
  </p>
</template>