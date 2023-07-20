<template>
  <p>
    [Global Paragraph]
    <ContentSlot
      :use="$slots.default"
      unwrap="p"
    />
  </p>
</template>