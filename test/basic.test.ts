import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    server: true
  })

  it('render vue component from component-map', async () => {
    const html = await $fetch('/component-map/vue-component')

    expect(html).toContain('[Custom Paragraph]')
    expect(html).toContain('Sample paragraph')
  })

  it('render component (by it\'s name) from component-map', async () => {
    const html = await $fetch('/component-map/component-name')

    expect(html).toContain('[Global Paragraph]')
    expect(html).toContain('Sample paragraph')
  })
})
