import type { BuiltinLanguage, BuiltinTheme } from 'shikiji'
import { loadWasm } from 'shikiji'
import { eventHandler, getQuery, lazyEventHandler } from 'h3'
import { useShikiHighlighter } from './highlighter'
import { useRuntimeConfig } from '#imports'

export default lazyEventHandler(async () => {
  const { highlight } = useRuntimeConfig().mdc

  await loadWasm((imports) =>
    import('shikiji/onig.wasm' as string)
      .then((mod: any) => mod.default(imports))
      .then((exports) => ({ exports }))
  )

  const shiki = useShikiHighlighter(highlight)

  return eventHandler(async (event) => {
    const { code, lang, theme: themeString, highlights: highlightsString } = getQuery(event)
    const theme = JSON.parse(themeString as string)
    const highlights = highlightsString ? JSON.parse(highlightsString as string) as number[] : undefined

    return await shiki.getHighlightedAST(code as string, lang as BuiltinLanguage, theme as BuiltinTheme, { highlights })
  })
})
