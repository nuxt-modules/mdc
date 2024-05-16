declare module '#mdc-configs' {
  import type { MdcConfig } from './runtime/types/config'

  function getMdcConfigs(): Promise<MdcConfig[]>
  export { getMdcConfigs }
}

declare module '#mdc-imports' {
  import type { RehypePlugin, RemarkPlugin } from './runtime/types'
  import type { RehypeHighlightOption } from './runtime/highlighter/rehype'

  const remarkPlugins: Record<string, false | RemarkPlugin>
  const rehypePlugins: Record<string, false | RehypePlugin>
  const highlight: RehypeHighlightOption
  export { remarkPlugins, rehypePlugins, highlight }
}

declare module '#mdc-highlighter' {
  import type { Highlighter } from '../runtime/highlighter/types'

  const highlighter: Highlighter
  export default highlighter
}
