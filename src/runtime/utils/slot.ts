import { flatUnwrap } from './node'
import { renderSlot as _renderSlot } from 'vue'

export const renderSlot = (slots: Record<string, any>, name: string, props: any, ...rest: any[]) => {
  if (slots[name]) {
    return _renderSlot({ ...slots, [name]: () => flatUnwrap(slots[name](), props?.unwrap) }, name, props, ...rest)
  }

  return _renderSlot(slots, name, props, ...rest)
}
