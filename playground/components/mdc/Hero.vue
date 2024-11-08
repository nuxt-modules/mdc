<template>
  <section class="pt-4">
    <h1 class="text-4xl">
      <MDCSlot :use="$slots.default" unwrap="p" />
    </h1>
    <MDCSlot :use="$slots.description" />
  </section>
</template>
