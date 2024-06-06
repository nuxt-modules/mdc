import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  typescript: {
    tsConfig: {
      compilerOptions: {
        paths: {
          '@nuxtjs/mdc/config': [
            fileURLToPath(new URL('./src/config.ts', import.meta.url))
          ]
        }
      },
      exclude: [
        fileURLToPath(new URL('./docs', import.meta.url)),
        fileURLToPath(new URL('./playground', import.meta.url))
      ]
    },
    strict: true,
    includeWorkspace: true
  }
})
