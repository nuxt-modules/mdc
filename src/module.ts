import { defineNuxtModule, extendViteConfig, addComponent, addComponentsDir, createResolver, addServerHandler, addTemplate, addImports, addServerImports, useNitro } from '@nuxt/kit'
import fs from 'fs'
import type { ModuleOptions, ShikiRuntimeOptions } from './types'
import { defu } from 'defu'
import { registerMDCSlotTransformer } from './utils/vue-mdc-slot'
import { resolve } from 'pathe'
import { useNuxt } from '@nuxt/kit'
import * as templates from './templates'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/mdc',
    configKey: 'mdc'
  },
  // Default configuration options of the Nuxt module
  defaults: {
    remarkPlugins: {},
    rehypePlugins: {},
    highlight: false,
    headings: {
      anchorLinks: {
        h1: false,
        h2: true,
        h3: true,
        h4: true,
        h5: false,
        h6: false
      }
    },
    components: {
      prose: true,
      map: {}
    },
    shiki: {}
  },
  async setup(options, nuxt) {
    resolveOptions(options)

    console.dir(options, { depth: 5 })

    const resolver = createResolver(import.meta.url)

    nuxt.options.nitro.alias = nuxt.options.nitro.alias || {}
    nuxt.options.runtimeConfig.public.mdc = defu(nuxt.options.runtimeConfig.public.mdc, {
      components: {
        prose: options.components!.prose!,
        map: options.components!.map!
      },
      headings: options.headings!
    })

    // @ts-ignore TODO: we may not need this anymore
    nuxt.options.runtimeConfig.mdc = defu(nuxt.options.runtimeConfig.mdc, {
      highlight: options.highlight ? {
        theme: options.highlight!.theme!,
        wrapperStyle: options.highlight!.wrapperStyle!
      } : {}
    })

    nuxt.hook('vite:extendConfig', (viteConfig) => {
      const optimizeList = ['debug', 'flat', 'node-emoji', 'extend', 'hast-util-raw']

      viteConfig.optimizeDeps ||= {}
      viteConfig.optimizeDeps.include ||= []
      const list = viteConfig.optimizeDeps.include
      optimizeList.forEach((pkg) => {
        if (!list.includes(pkg)) {
          list.push(pkg)
        }
      })
    })

    if (options.highlighter) {
      // Enable unwasm for shikiji
      nuxt.hook('ready', () => {
        const nitro = useNitro()
        const addWasmSupport = (_nitro: typeof nitro) => {
          if (nitro.options.experimental?.wasm) { return }
          _nitro.options.externals = _nitro.options.externals || {}
          _nitro.options.externals.inline = _nitro.options.externals.inline || []
          _nitro.options.externals.inline.push(id => id.endsWith('.wasm'))
          _nitro.hooks.hook('rollup:before', async (_, rollupConfig) => {
            const { rollup: unwasm } = await import('unwasm/plugin')
            rollupConfig.plugins = rollupConfig.plugins || []
              ; (rollupConfig.plugins as any[]).push(unwasm({
                ..._nitro.options.wasm as any,
              }))
          })
        }
        addWasmSupport(nitro)
        nitro.hooks.hook('prerender:init', (prerenderer) => {
          addWasmSupport(prerenderer)
        })
      })

      // Add server handlers
      addServerHandler({
        route: '/api/_mdc/highlight',
        handler: resolver.resolve('./runtime/highlighter/event-handler')
      })

      options.rehypePlugins ||= {}
      options.rehypePlugins.highlight ||= {}
      options.rehypePlugins.highlight.src ||= await resolver.resolvePath('./runtime/highlighter/rehype')
      options.rehypePlugins.highlight.options ||= {}
      options.rehypePlugins.highlight.options.theme ||= options.shiki?.theme
    }

    const registerTemplate: typeof addTemplate = (options) => {
      const nuxt = useNuxt()
      const name = (options as any).filename.replace(/\.m?js$/, '')
      const alias = '#' + name
      const results = addTemplate({
        ...options as any,
        write: true, // Write to disk for Nitro to consume
      })
      nuxt.options.alias[alias] = results.dst
      nuxt.options.nitro.alias = nuxt.options.nitro.alias || {}
      nuxt.options.nitro.alias[alias] = nuxt.options.alias[alias]
      nuxt.options.nitro.externals ||= {}
      nuxt.options.nitro.externals.inline ||= []
      nuxt.options.nitro.externals.inline.push(nuxt.options.alias[alias])
      nuxt.options.nitro.externals.inline.push(alias)
      return results as any
    }

    // mdc.config.ts support
    const mdcConfigs: string[] = []
    for (const layer of nuxt.options._layers) {
      let path = resolve(layer.config.srcDir, 'mdc.config.ts')
      if (fs.existsSync(path)) {
        mdcConfigs.push(path)
      }
      else {
        path = resolve(layer.config.srcDir, 'mdc.config.js')
        if (fs.existsSync(path)) {
          mdcConfigs.push(path)
        }
      }
    }

    registerTemplate({
      filename: 'mdc-configs.mjs',
      getContents: templates.mdcConfigs,
      options: { configs: mdcConfigs },
    })

    // Add highlighter
    registerTemplate({
      filename: 'mdc-highlighter.mjs',
      getContents: templates.mdcHighlighter,
      options: {
        highlighter: options.highlighter,
        shikiPath: resolver.resolve('../dist/runtime/highlighter/shiki'),
        shikiOptions: options.shiki || {}
      },
    })

    // Add imports template
    registerTemplate({
      filename: 'mdc-imports.mjs',
      getContents: templates.mdcImports,
      options,
    })

    // Add components
    addComponent({ name: 'MDC', filePath: resolver.resolve('./runtime/components/MDC') })
    addComponent({ name: 'MDCRenderer', filePath: resolver.resolve('./runtime/components/MDCRenderer') })
    addComponent({ name: 'MDCSlot', filePath: resolver.resolve('./runtime/components/MDCSlot') })

    // Add composables
    addImports({ from: resolver.resolve('./runtime/utils/node'), name: 'flatUnwrap', as: 'unwrapSlot' })

    // Add parser
    addImports({ from: resolver.resolve('./runtime/parser'), name: 'parseMarkdown', as: 'parseMarkdown' })
    addServerImports([{ from: resolver.resolve('./runtime/parser'), name: 'parseMarkdown', as: 'parseMarkdown' }])

    // Register prose components
    if (options.components?.prose) {
      addComponentsDir({
        path: resolver.resolve('./runtime/components/prose'),
        pathPrefix: false,
        prefix: '',
        global: true
      })
    }

    extendViteConfig((config) => {
      config.optimizeDeps = config.optimizeDeps || {}
      config.optimizeDeps.exclude = config.optimizeDeps.exclude || []
      config.optimizeDeps.exclude.push('@nuxtjs/mdc')
    })

    // Register user global components
    const _layers = [...nuxt.options._layers].reverse()
    for (const layer of _layers) {
      const srcDir = layer.config.srcDir
      const globalComponents = resolver.resolve(srcDir, 'components/mdc')
      const dirStat = await fs.promises.stat(globalComponents).catch(() => null)
      if (dirStat && dirStat.isDirectory()) {
        nuxt.hook('components:dirs', (dirs: any[]) => {
          dirs.unshift({
            path: globalComponents,
            global: true,
            pathPrefix: false,
            prefix: ''
          })
        })
      }
    }

    registerMDCSlotTransformer(resolver)
  }
})

declare module '@nuxt/schema' {
  interface RuntimeConfig {
    mdc: {
      highlight: ShikiRuntimeOptions
    }
  }

  interface PublicRuntimeConfig {
    mdc: {
      components: {
        prose: boolean
        map: Record<string, string>
      }
      headings: ModuleOptions['headings']
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
        headings: ModuleOptions['headings']
      }
    }
  }
}

function resolveOptions(options: ModuleOptions) {
  if (options.highlighter == null)
    options.highlighter = options.highlight === false ? false : 'shiki'

  if (typeof options.highlight !== 'boolean' && options.highlight?.highlighter)
    options.highlighter ??= { path: options.highlight?.highlighter }

  if (options.highlighter) {
    options.shiki ||= {}
    if (options.highlight) {
      options.shiki.wrapperStyle ||= options.highlight?.wrapperStyle
      options.shiki.theme ||= options.highlight?.theme
    }

    options.shiki.theme ||= {
      default: 'github-light',
      dark: 'github-dark'
    }
    options.shiki.langs ||= [
      'js',
      'ts',
      'vue',
      'css',
      'html',
    ]

    if (options.highlight && options.highlight.preload) {
      options.shiki.langs.push(...options.highlight.preload as any || [])
    }
  }
}
