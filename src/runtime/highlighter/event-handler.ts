import { eventHandler, getQuery } from 'h3'

export default eventHandler(async (event) => {
  const { code, lang, theme: themeString, options: optionsStr } = getQuery(event)
  const theme = JSON.parse(themeString as string)
  const options = optionsStr ? JSON.parse(optionsStr as string) : {}
  const highlighter = await import('#mdc-highlighter').then(m => m.default)
  return await highlighter(code, lang, theme, options)
})
