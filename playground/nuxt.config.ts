export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
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
  nitro: {
    experimental: {
      wasm: true
    }
  },
  devtools: {
    enabled: true
  }
})
