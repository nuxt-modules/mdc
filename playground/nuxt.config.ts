import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxtjs/mdc'
  ],
  devtools: {
    enabled: true
  },
  css: ['~/assets/css/main.css'],

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
