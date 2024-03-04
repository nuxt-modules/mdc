export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '../src/module'
  ],
  // @ts-ignore
  mdc: {
    highlight: {
      theme: {
        default: 'vitesse-light',
        dark: 'material-theme-palenight',
      },
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
  }
})
