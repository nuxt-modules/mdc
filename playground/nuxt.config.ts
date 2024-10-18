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

  compatibilityDate: '2024-09-16'
})
