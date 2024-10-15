<template>
  <nav>
    <li>
      <NuxtLink to="/">
        MDC Page
      </NuxtLink>
    </li>
    <li>
      <NuxtLink to="/second">
        Second Page
      </NuxtLink>
    </li>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #333;
  padding: 0 0 16px;
  margin: 0 0 8px;
}

li {
  display: block;
}

a {
  display: block;
  background: lightseagreen;
  color: #fff;
  padding: 4px 8px;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: seagreen;
  }
}
</style>
