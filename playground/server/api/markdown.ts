import { defineEventHandler, getQuery } from '#imports'

export default defineEventHandler(async (event) => {
  // Simulate a 200ms delay
  await new Promise(resolve => setTimeout(resolve, 250))

  const query = getQuery(event)
  const name = query.name || ''
  let content = ''

  if (!name) {
    content = `
# MDC nested snippets

:page-snippet{ name="document" }
:page-snippet{ name="document" }
:page-snippet{ name="document" }
:page-snippet{ name="document" }
:page-snippet{ name="document" }
:page-snippet{ name="document" }
`
  } else {
    content = `
- Nested content
`
  }

  return {
    content
  }
})
