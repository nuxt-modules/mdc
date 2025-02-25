export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '../src/module'
  ],

  devtools: {
    enabled: true
  },

  mdc: {
    highlight: {
      theme: {
        default: 'vitesse-light',
        dark: 'material-theme-palenight'
      },
      shikiEngine: 'oniguruma',
      preload: [
        'sql'
      ]
    }
  },

  compatibilityDate: '2024-09-16'
})
