export function computeHighlightRanges(input: string[] | string) {
  const numbers = Array.isArray(input) ? input.map(Number) : input.split(',').map(Number) // Convert string to array of numbers
  const ranges = []
  let start = numbers[0]

  for (let i = 1; i <= numbers.length; i++) {
    if (numbers[i] !== numbers[i - 1] + 1) {
      if (start === numbers[i - 1]) {
        ranges.push(`${start}`)
      } else {
        ranges.push(`${start}-${numbers[i - 1]}`)
      }
      start = numbers[i]
    }
  }

  return ranges.join(',')
}

export function refineCodeLanguage(language?: string) {
  if (language === 'text') {
    return undefined
  }

  return language
}
