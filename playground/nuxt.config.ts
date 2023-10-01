export default defineNuxtConfig({
  modules: [
    '@nuxthq/ui',
    '../src/module'
  ],
  // ssr: false,
  mdc: {
    highlight: {
      theme: {
        default: 'vitesse-light',
        dark: 'material-theme-palenight',
      },
      preload: [
        'sql'
      ]
    }
  },
  devtools: {
    enabled: true
  }
})
