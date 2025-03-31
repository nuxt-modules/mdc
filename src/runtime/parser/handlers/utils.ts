/**
 * Parses the value defined next to 3 back ticks
 * in a codeblock and set line-highlights or
 * filename from it
 */
export function parseThematicBlock(lang: string) {
  /**
   * Language property on node is missing
   */
  if (!lang?.trim()) {
    return {
      language: undefined,
      highlights: undefined,
      filename: undefined,
      meta: undefined
    }
  }

  const languageMatches = lang.replace(/[{|[](.+)/, '').match(/^[^ \t]+(?=[ \t]|$)/)
  const highlightTokensMatches = lang.match(/\{([^}]*)\}/)
  const filenameMatches = lang.match(/\[(.*)\]/)

  const meta = lang
    .replace(languageMatches?.[0] ?? '', '')
    .replace(highlightTokensMatches?.[0] ?? '', '')
    .replace(filenameMatches?.[0] ?? '', '')
    .trim()

  // Process filename to handle backslashes correctly
  let filename = undefined
  if (filenameMatches?.[1]) {
    // Only unescape special regex characters but preserve path backslashes
    filename = filenameMatches[1].replace(/\\([[\]{}().*+?^$|])/g, '$1')
  }

  return {
    language: languageMatches?.[0] || undefined,
    highlights: parseHighlightedLines(highlightTokensMatches?.[1] || undefined),
    // https://github.com/nuxt/content/pull/2169
    filename,
    meta
  }
}

function parseHighlightedLines(lines?: string | null) {
  const lineArray = String(lines || '')
    .split(',')
    .filter(Boolean)
    .flatMap((line) => {
      const [start, end] = line.trim().split('-').map(a => Number(a.trim()))
      return Array.from({ length: (end || start) - start + 1 }).map((_, i) => start + i)
    })
  return lineArray.length ? lineArray : undefined
}

const TAG_NAME_REGEXP = /^<\/?([\w-]+)(\s[^>]*?)?\/?>/
export function getTagName(value: string) {
  const result = String(value).match(TAG_NAME_REGEXP)

  return result && result[1]
}
