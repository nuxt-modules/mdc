import { eventHandler, getQuery } from 'h3'
import highlighter from '#mdc-highlighter'

export default eventHandler(async (event) => {
  const { code, lang, theme: themeString, options: optionsStr } = getQuery(event)
  const theme = JSON.parse(themeString as string)
  const options = optionsStr ? JSON.parse(optionsStr as string) : {}
  return await highlighter(code, lang, theme, options)
})
