import { RENDER_SLOT, type NodeTransform, type ElementNode } from '@vue/compiler-core'
import { type Resolver, extendViteConfig } from '@nuxt/kit'

export const registerMDCSlotTransformer = (resolver: Resolver) => {
    extendViteConfig((config) => {
    const compilerOptions = (config as any).vue.template.compilerOptions

    config.plugins = config.plugins || []
    config.plugins!.push({
      name: 'mdc-render-slot-import',
      enforce: 'post',
      transform(code) {
        if (code.includes('_renderMDCSlot')) {
          return `import { renderSlot as _renderMDCSlot } from '${resolver.resolve('./runtime/utils/slot')}';\n${code}`
        }
      }
    })

    compilerOptions.nodeTransforms = [
      <NodeTransform>function viteMDCSlot(node: ElementNode, context) {
        if (node.tag === 'MDCSlot') {
          const transform = context.ssr ?
            context.nodeTransforms.find(nt => nt.name === 'ssrTransformSlotOutlet') :
            context.nodeTransforms.find(nt => nt.name === 'transformSlotOutlet')

          return () => {
            node.tag = 'slot'
            node.type = 1
            node.tagType = 2

            transform?.(node, context)

            const codegen = context.ssr ? (node as any).ssrCodegenNode : node.codegenNode
            codegen.arguments.unshift(codegen.callee === RENDER_SLOT ? '_renderSlot' : '_ssrRenderSlot')
            codegen.callee = '_renderMDCSlot'
          }
        }

        if (context.nodeTransforms[0].name !== 'viteMDCSlot') {
          const index = context.nodeTransforms.findIndex(f => f.name === 'viteMDCSlot')
          const nt = context.nodeTransforms.splice(index, 1)
          context.nodeTransforms.unshift(nt[0])
        }
      }
    ]
  })
}
