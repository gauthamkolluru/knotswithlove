export function countryFromRequestHeaders(
  headers: { get(name: string): string | null },
): string | null {
  const candidates = ['x-vercel-ip-country', 'cf-ipcountry', 'x-country-code']
  for (const name of candidates) {
    const value = headers.get(name)?.trim()
    if (value) return value.toUpperCase()
  }
  return null
}
