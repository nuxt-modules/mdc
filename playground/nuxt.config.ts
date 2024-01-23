export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '../src/module'
  ],
  nitro: {
    experimental: {
      wasm: true
    }
  },
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
