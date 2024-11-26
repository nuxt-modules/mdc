import type { NodeTransform, ElementNode, DirectiveNode } from '@vue/compiler-core'
import { type Resolver, extendViteConfig } from '@nuxt/kit'

export const registerMDCSlotTransformer = (resolver: Resolver) => {
  extendViteConfig((config) => {
    const compilerOptions = (config as any).vue.template.compilerOptions
    compilerOptions.nodeTransforms = [
      <NodeTransform> function viteMDCSlot(node: ElementNode, context) {
        const isVueSlotWithUnwrap = node.tag === 'slot' && node.props.find(p => p.name === 'mdc-unwrap' || (p.name === 'bind' && (p as DirectiveNode).rawName === ':mdc-unwrap'))
        const isMDCSlot = node.tag === 'MDCSlot'

        if (isVueSlotWithUnwrap || isMDCSlot) {
          const transform = context.ssr
            ? context.nodeTransforms.find(nt => nt.name === 'ssrTransformSlotOutlet')
            : context.nodeTransforms.find(nt => nt.name === 'transformSlotOutlet')

          return () => {
            node.tag = 'slot'
            node.type = 1
            node.tagType = 2

            transform?.(node, context)

            const codegen = context.ssr ? (node as any).ssrCodegenNode : node.codegenNode
            codegen.callee = context.ssr ? '_ssrRenderMDCSlot' : '_renderMDCSlot'

            const importExp = context.ssr ? '{ ssrRenderSlot as _ssrRenderMDCSlot }' : '{ renderSlot as _renderMDCSlot }'
            if (!context.imports.some(i => String(i.exp) === importExp)) {
              context.imports.push({
                exp: importExp,
                path: resolver.resolve(`./runtime/utils/${context.ssr ? 'ssrSlot' : 'slot'}`)
              })
            }
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
