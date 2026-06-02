import { describe, expect, it } from 'vitest'
import { countryFromRequestHeaders } from '@/lib/geo'

describe('countryFromRequestHeaders', () => {
  it('reads vercel country header', () => {
    const headers = new Headers({ 'x-vercel-ip-country': 'in' })
    expect(countryFromRequestHeaders(headers)).toBe('IN')
  })

  it('returns null when no geo headers', () => {
    expect(countryFromRequestHeaders(new Headers())).toBeNull()
  })
})
