import { defineNuxtModule, addComponent, createResolver, addServerHandler, addTemplate } from '@nuxt/kit'
import fs from 'fs'
import { mdcImportTemplate } from './utils/templates';
import type { ModuleOptions } from './types';

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-mdc',
    configKey: 'mdc'
  },
  // Default configuration options of the Nuxt module
  defaults: {
    remarkPlugins: {},
    rehypePlugins: {},
    highlight: false,
    components: {
      prose: true,
      map: {}
    }
  },
  async setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public = {
      mdc: {
        components: {
          prose: options.components!.prose!,
          map: options.components!.map!
        }
      }
    }

    // Add imports template
    addTemplate({ filename: 'mdc-imports.mjs', getContents: mdcImportTemplate, options })

    // Add components
    addComponent({ name: 'MDC', filePath: resolver.resolve('./runtime/components/MDC') })
    addComponent({ name: 'MDCRenderer', filePath: resolver.resolve('./runtime/components/MDCRenderer') })
    addComponent({ name: 'MDCSlot', filePath: resolver.resolve('./runtime/components/MDCSlot') })
    
    // Add server handlers
    addServerHandler({ route: '/api/_mdc/highlight', handler: resolver.resolve('./runtime/shiki/event-handler') })

    // Register user global components
    const _layers = [...nuxt.options._layers].reverse()
    for (const layer of _layers) {
      const srcDir = layer.config.srcDir
      const globalComponents = resolver.resolve(srcDir, 'components/content')
      const dirStat = await fs.promises.stat(globalComponents).catch(() => null)
      if (dirStat && dirStat.isDirectory()) {
        nuxt.hook('components:dirs', (dirs) => {
          dirs.unshift({
            path: globalComponents,
            global: true,
            pathPrefix: false,
            prefix: ''
          })
        })
      }
    }
  }
})

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    mdc: {
      components: {
        prose: boolean
        map: Record<string, string>
      }
    }
  }

  interface ConfigSchema {
    runtimeConfig: {
      public?: {
        mdc: {
          components: {
            prose: boolean
            map: Record<string, string>
          }
        }
      }
    }
  }
}