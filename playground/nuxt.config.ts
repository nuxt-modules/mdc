export default defineNuxtConfig({
  modules: [
    '@nuxthq/ui',
    '../src/module'
  ],
  // ssr: false,
  mdc: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      }
    }
  },
  devtools: {
    enabled: true
  }
})
