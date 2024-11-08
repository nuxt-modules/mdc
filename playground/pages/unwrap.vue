<script setup>
const mdList = `
- Hello
- World
`

const mdc = `
::hero
Hello World

#description
This is a description
::

::callout
This is a callout
::

::list
- Hello
- World
::
`
</script>

<template>
  <div class="p-4 prose dark:prose-invert">
    <div>No unwrap:</div>
    <MDC value="Hello **world**" />
    <div>Unwrap `p`:</div>
    <MDC unwrap="p" value="Hello **world**" />
    <hr />
    <div>No unwrap:</div>
    <MDC :value="mdList" />
    <div>Unwrap `ul`:</div>
    <MDC unwrap="ul" :value="mdList" />
    <div>Unwrap `ul li`:</div>
    <MDC unwrap="ul li" :value="mdList" />
    <hr />
    <MDC :value="mdc" />
  </div>
</template>
