export const formatQueryString = (query: Record<string, any>) => {
  return Object.keys(query)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
    .join("&")
}
