import { flatUnwrap } from './node'

export const renderSlot = (vuewRenderSlot: any, slots: Record<string, any>, name: string, props: any, ...rest: any[]) => {
  if (slots[name]) {
    return vuewRenderSlot({ ...slots, [name]: () => flatUnwrap(slots[name](), props?.unwrap) }, name, props, ...rest)
  }

  return vuewRenderSlot(slots, name, props, ...rest)
}