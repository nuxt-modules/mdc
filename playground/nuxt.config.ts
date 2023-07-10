export default defineNuxtConfig({
  modules: [
    '@nuxthq/ui',
    '../src/module'
  ],
  mdc: {
    highlight: {
      theme: 'github-dark'
    }
  },
  devtools: { enabled: true }
})
