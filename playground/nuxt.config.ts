export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '../src/module'
  ],

  mdc: {
    highlight: {
      theme: {
        default: 'vitesse-light',
        dark: 'material-theme-palenight'
      },
      shikiEngine: 'javascript',
      preload: [
        'sql'
      ]
    },
    remarkPlugins: {
      'remark-mdc': {
        options: {
          experimental: {
            autoUnwrap: true
          }
        }
      }
    }
  },

  devtools: {
    enabled: true
  },

  compatibilityDate: '2024-09-16'
})
