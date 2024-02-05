import { defineNuxtModule, extendViteConfig, addComponent, addComponentsDir, createResolver, addServerHandler, addTemplate, addImports, addServerImports, useNitro } from '@nuxt/kit'
import fs from 'fs'
import type { ModuleOptions } from './types'
import { defu } from 'defu'
import { registerMDCSlotTransformer } from './utils/vue-mdc-slot'
import { resolve } from 'pathe'
import type { BundledLanguage } from 'shiki'
import * as templates from './templates'

export const DefaultHighlightLangs: BundledLanguage[] = [
  'js',
  'jsx',
  'json',
  'ts',
  'tsx',
  'vue',
  'css',
  'html',
  'vue',
  'bash',
  'md',
  'mdc',
  'yaml'
]

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
  },
  async setup(options, nuxt) {
    resolveOptions(options)

    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.mdc = defu(nuxt.options.runtimeConfig.public.mdc, {
      components: {
        prose: options.components!.prose!,
        map: options.components!.map!
      },
      headings: options.headings!
    })

    if (options.highlight) {
      // Enable unwasm for shiki
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
    }

    const registerTemplate: typeof addTemplate = (options) => {
      const name = (options as any).filename.replace(/\.m?js$/, '')
      const alias = '#' + name
      const results = addTemplate({
        ...options as any,
        write: true, // Write to disk for Nitro to consume
      })

      nuxt.options.nitro.alias ||= {}
      nuxt.options.nitro.externals ||= {}
      nuxt.options.nitro.externals.inline ||= []

      nuxt.options.alias[alias] = results.dst
      nuxt.options.nitro.alias[alias] = nuxt.options.alias[alias]
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
    await nuxt.callHook('mdc:configSources', mdcConfigs)

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
        shikiPath: resolver.resolve('../dist/runtime/highlighter/shiki'),
        options: options.highlight,
        // When WASM support enabled in Nitro, we could use the .wasm file directly for Cloudflare Workers
        useWasmAssets: !nuxt.options.dev && !!nuxt.options.nitro.experimental?.wasm
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

    // Update Vite optimizeDeps
    extendViteConfig((config) => {
      const include = [
        'remark-gfm', // from runtime/parser/index.ts
        'remark-emoji', // from runtime/parser/index.ts
        'remark-mdc', // from runtime/parser/index.ts
        'remark-rehype', // from runtime/parser/index.ts
        'rehype-raw', // from runtime/parser/index.ts
        'parse5', // transitive deps of rehype
        'unist-util-visit', // from runtime/highlighter/rehype.ts
        'unified', // deps by all the plugins
        'debug', // deps by many libraries but it's not an ESM
      ]
      const exclude = [
        '@nuxtjs/mdc' // package itself, it's a build time module
      ]
      config.optimizeDeps ||= {}
      config.optimizeDeps.exclude ||= []
      config.optimizeDeps.include ||= []

      for (const pkg of include) {
        if (!config.optimizeDeps.include.includes(pkg)) {
          config.optimizeDeps.include.push(pkg)
        }
      }

      for (const pkg of exclude) {
        if (!config.optimizeDeps.exclude.includes(pkg)) {
          config.optimizeDeps.exclude.push(pkg)
        }
      }
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


function resolveOptions(options: ModuleOptions) {
  if (options.highlight !== false) {
    options.highlight ||= {}
    options.highlight.highlighter ||= 'shiki'
    options.highlight.theme ||= {
      default: 'github-light',
      dark: 'github-dark'
    }
    options.highlight.langs ||= DefaultHighlightLangs

    if (options.highlight.preload) {
      options.highlight.langs.push(...options.highlight.preload as any || [])
    }
  }
}

declare module '@nuxt/schema' {
  interface NuxtHooks {
    'mdc:configSources': (configs: string[]) => void
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
