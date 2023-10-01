import { flatUnwrap } from './node'
import { ssrRenderSlot as _ssrRenderSlot } from 'vue/server-renderer'

export const ssrRenderSlot = (slots: Record<string, any>, name: string, props: any, fallbackRenderFn: (() => void) | null, push: any, parentComponent: any, slotScopeId?: string | undefined) => {
  if (slots[name]) {
    return _ssrRenderSlot({ ...slots, [name]: () => flatUnwrap(slots[name](), props?.unwrap) }, name, props, fallbackRenderFn, push, parentComponent, slotScopeId)
  }

  return _ssrRenderSlot(slots, name, props, fallbackRenderFn, push, parentComponent, slotScopeId)
}
