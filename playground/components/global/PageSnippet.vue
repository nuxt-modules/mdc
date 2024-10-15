<template>
  <Suspense suspensible>
    <MDCRenderer
      v-if="!!snippetName && ast?.body && !snippetError"
      :body="ast.body"
      :data="ast.data"
      :data-testid="!!snippetName ? snippetName : undefined"
    />
  </Suspense>
</template>

<script setup lang="ts">
/**
 * This component is exposed as `snippet` in MDC markdown files
 */
import { parseMarkdown } from '@nuxtjs/mdc/runtime'
import type { MDCParserResult, MDCRoot } from '@nuxtjs/mdc'
import { computed, provide, inject, useState, useId, serveCachedData, useAsyncData, useFetch } from '#imports'

const props = defineProps({
  /** The snippet name */
  name: {
    type: String,
    /*
     * We set the prop to not required (even though it is required to render the snippet)
     * so that the logic of parsing recursive snippets can pass
     * an empty `name` and avoid warnings.
     */
    required: false,
    default: ''
  }
})

// Determine the snippet name
const snippetName = computed((): string => String(props.name || '').trim() || '')

// Provide/inject parent nodes to filter out
const SNIPPET_INJECTION_KEY = 'snippet-parent-nodes'
const SNIPPET_NESTING_LEVEL_INJECTION_KEY = 'snippet-nesting-level'

const componentId = useId()

const snippetParentNodes = useState(`page-snippet-${componentId}`, () => new Set([...inject<Set<string>>(SNIPPET_INJECTION_KEY, new Set()), snippetName.value].filter(item => item.trim() !== '')))
const snippetNestingLevel = useState<number>(`page-snippet-level-${componentId}`, () => Number(inject<number>(SNIPPET_NESTING_LEVEL_INJECTION_KEY, 0)))

provide(SNIPPET_INJECTION_KEY, new Set([...snippetParentNodes.value].filter(item => item.trim() !== '')))
provide(SNIPPET_NESTING_LEVEL_INJECTION_KEY, snippetNestingLevel.value + 1)

const fetchKey = computed((): string => `portal-snippet-${(snippetName.value || componentId || '').replace(/\//g, '-')}`)

const { transform, getCachedData } = serveCachedData()
const { data: snippetData, error: snippetError } = await useFetch('/api/markdown', {
  query: {
    name: 'snippet'
  },
  // Reuse the same key to avoid re-fetching the document, e.g. `portal-page-about`
  key: fetchKey.value,
  immediate: !!snippetName.value, // Do not immediately fetch in case there's no snippet name
  retry: false, // Do not retry on 404 in case the snippet doesn't exist
  transform,
  getCachedData
})

const nodes = [...snippetParentNodes.value].join('|')
// Strip out recursive snippet(s), looking for `name` prop in the content
const snippetRegex = new RegExp(`(name)(=|:)( )?('|"|\`)?('|"|\`)?(${nodes})('|"|\`)?('|"|\`)?`, 'i')
// Important: Replace $6 with an empty string to remove the snippet name from the content; must be a space to avoid evaluating as a boolean prop.
const sanitizedData = String(snippetData.value?.content || '')?.replace(snippetRegex, `$1$2$3$4$5${String(' ')}$7`) || ''
// Alternatively, you could utilize the levels variable to only allow nesting `n` levels deep:
// const sanitizedData = snippetNestingLevel.value < 3 ? String(snippetData.value?.content || '')?.replace(snippetRegex, `$1$2$3$4$5${String(' ')}$7`) || '' : ''

const removeInvalidSnippets = (obj: Record<string, any>): Record<string, any> | null => {
  if (Array.isArray(obj)) {
    // Recursively handle arrays by filtering out invalid objects and processing children
    return obj
      .map(item => removeInvalidSnippets(item))
      .filter(item => item !== null)
  } else if (typeof obj === 'object' && obj !== null) {
    // Check if the object has 'tag' property and the required 'props.name' condition
    if (
      obj.tag
      // If the tag matches `snippet` or `page-snippet` (this component)
      && obj.tag === 'page-snippet'
      && obj.props
      && typeof obj.props.name === 'string'
      // If name is empty, or includes a parent snippet with the same name
      && (obj.props.name.trim() === '' || snippetParentNodes.value.has(obj.props.name))
    ) {
      // Remove the object if it matches the criteria
      return null
    }

    // Recursively process each key of the object
    const newObj: Record<string, any> = {}
    for (const key in obj) {
      // Using the 'in' operator to check for the existence of the property
      if (key in obj) {
        const result = removeInvalidSnippets(obj[key])
        if (result !== null) {
          newObj[key] = result
        }
      }
    }
    return newObj
  }

  // Return other types (strings, numbers, etc.) as-is
  return obj
}

const { data: ast, execute: parseSnippetData } = await useAsyncData(`parsed-${fetchKey.value}`, async (): Promise<MDCParserResult> => {
  const parsed = await parseMarkdown(sanitizedData)

  // Extract the `body` and destructure the rest of the document
  const { body, ...parsedDoc } = parsed

  // Important: Remove invalid snippets from the AST
  const processedBody = removeInvalidSnippets(body)

  // Return the MDCParserResult with the sanitized body
  return {
    ...parsedDoc,
    body: processedBody as MDCRoot
  }
}, {
  immediate: false, // Do not immediately process the snippet data
  dedupe: 'defer',
  deep: false,
  transform,
  getCachedData
})

// Only fire if there is content and no error
if (!!snippetName.value && (!!sanitizedData && !!snippetData.value?.content) && !snippetError.value) {
  await parseSnippetData()
}

if (snippetName.value && snippetError.value) {
  console.error(`snippet(${snippetName.value}) `, 'could not render snippet', snippetError.value)
}
</script>
