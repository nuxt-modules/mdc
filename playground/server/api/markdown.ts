import { defineEventHandler, getQuery } from '#imports'

export default defineEventHandler(async (event) => {
  // Simulate a 200ms delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  const query = getQuery(event)
  const name = query.name || ''
  let content = ''

  if (!name) {
    content = `# Advanced Async Example

This page contains an advanced async component example (below) that simulates async data fetching inside of the \`MDCRenderer\` component.

You can refresh the page to see there are no hydration errors in the console.

Navigate to the [No Async Components page](/async-components/no-async), refresh, and then click on the [Advanced Async Example](/async-components/advanced) link to see the client-side routing waits for the nested content to resolve.

## 8 MDC nested snippets

:page-snippet{ name="document" }
:page-snippet{ name="document" }
:page-snippet{ name="document" }
:page-snippet{ name="document" }
:page-snippet{ name="document" }
:page-snippet{ name="document" }
:page-snippet{ name="document" }
:page-snippet{ name="document" }
`
  } else if (name === 'snippet') {
    content = `
Nested paragraph content.
`
  }

  return {
    content
  }
})
