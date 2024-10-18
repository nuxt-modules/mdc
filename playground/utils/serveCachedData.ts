import type { NuxtApp } from '#app'
/**
 * Serve cached data if exists and not expired, otherwise getCachedData returns null/undefined and triggers the fetch.
 *
 * @returns An object with the following properties:
 *   - transform: A function that transforms the input data by adding a `_fetched_at` property to determine the TTL.
 *   - getCachedData: A function that retrieves the cached data based on a given key and checks if it has expired.
 * @example const { transform, getCachedData } = serveCachedData()
 * const { data } = await usePortalApi('/api/v2/portal', { transform, getCachedData })
 */
export default function serveCachedData() {
  return {
    // Force the type of `input` to `DataT` since it will only be utilized with the `transform` property
    transform<DataT>(input: DataT): Omit<DataT, 'fetched-at'> {
      return {
        // Add a new _fetched_at property to determine the TTL in the getCachedData below
        _fetched_at: new Date(),
        ...input
      }
    },
    getCachedData(key: string, nuxtApp: NuxtApp) {
      // Serve cached data for the length of the useFetchCacheTtlSeconds, if it exists
      const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]

      // If no data has been fetched yet, just return
      if (!data) {
        return
      }

      // Is the data older than the desired TTL?
      const expirationDate = new Date(data._fetched_at)
      const ttl = 1800
      expirationDate.setTime(expirationDate.getTime() + ttl * 1000)
      const isExpired = expirationDate.getTime() < Date.now()
      if (isExpired) {
        // Refetch the data
        return
      }

      // There is data and not expired, return the cached data
      return data
    }
  }
}
