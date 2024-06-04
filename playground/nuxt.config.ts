export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '../src/module'
  ],
  // @ts-ignore - Ignore invalid property error; mdc is a local module
  mdc: {
    highlight: {
      theme: {
        default: 'vitesse-light',
        dark: 'material-theme-palenight'
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
