
declare module '#mdc-configs' {
  function getMdcConfigs(): Promise<ModuleOptions[]>
  export { getMdcConfigs }
}

declare module '#mdc-shiki-bundle' {
  const langs: Promise<any>[]
  const themes: Promise<any>[]
  const options: {
    wrapperStyle?: boolean | string
  }
  export { langs, themes, options }
}

declare module '#mdc-imports' {
  import type { RehypePlugin, RemarkPlugin } from './runtime/types'

  const remarkPlugins: Record<string, false | RemarkPlugin>
  const rehypePlugins: Record<string, false | RehypePlugin>
  const highlight: {
    highlighter?: string
    theme?: Theme
    preload?: string[]
    inject?: boolean
  }
  export { remarkPlugins, rehypePlugins, highlight }
}

declare module '#mdc-highlighter' {
  import type { Highlighter } from '../runtime/highlighter/types'
  const highlighter: Highlighter
  export default highlighter
}
