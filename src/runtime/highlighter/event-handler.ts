import { eventHandler, getQuery } from 'h3'
import highlighter from '#mdc-highlighter'

export default eventHandler(async (event) => {
  const { code, lang, theme: themeString, highlights: highlightsString } = getQuery(event)
  const theme = JSON.parse(themeString as string)
  const highlights = highlightsString ? JSON.parse(highlightsString as string) as number[] : undefined
  return await highlighter(code, lang, theme, { highlights })
})
