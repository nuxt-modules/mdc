declare module '#mdc-configs' {
  import type { MdcConfig } from './types/config'

  function getMdcConfigs(): Promise<MdcConfig[]>
  export { getMdcConfigs }
}

declare module '#mdc-imports' {
  import type { RehypePlugin, RemarkPlugin } from './types'
  import type { RehypeHighlightOption } from './runtime/highlighter/rehype'

  const remarkPlugins: Record<string, false | RemarkPlugin>
  const rehypePlugins: Record<string, false | RehypePlugin>
  const highlight: RehypeHighlightOption
  export { remarkPlugins, rehypePlugins, highlight }
}

declare module '#mdc-highlighter' {
  import type { Highlighter } from './types/highlighter'

  const highlighter: Highlighter
  export default highlighter
}
