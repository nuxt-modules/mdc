export const unsafeLinkPrefix = [
  'javascript:',
  'data:text/html',
  'vbscript:',
  'data:text/javascript',
  'data:text/vbscript',
  'data:text/css',
  'data:text/plain',
  'data:text/xml'
]

export const validateProp = (attribute: string, value: string) => {
  if (attribute.startsWith('on')) {
    return false
  }

  if (attribute === 'href' || attribute === 'src') {
    return !unsafeLinkPrefix.some(prefix => value.toLowerCase().startsWith(prefix))
  }

  return true
}

export const validateProps = (props?: Record<string, any>) => {
  if (!props) {
    return {}
  }
  return Object.fromEntries(
    Object.entries(props).filter(([name, value]) => {
      const isValid = validateProp(name, value)

      if (!isValid) {
        // eslint-disable-next-line no-console
        console.warn(`[nuxt-mdc] removing unsafe attribute: ${name}="${value}"`)
      }

      return isValid
    })
  )
}
