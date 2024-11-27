/**
 * Pick keys from an object
 */
export function pick(obj: Record<string, any>, keys: string[]) {
  return keys.reduce((acc, key) => {
    const value = get(obj, key)
    if (value !== undefined) {
      acc[key] = value
    }
    return acc
  }, {} as Record<string, any>)
}

/**
 * Get value from object by key with dot notation
 */
function get(obj: Record<string, any>, key: string) {
  return key.split('.').reduce((acc, k) => acc && acc[k], obj)
}
