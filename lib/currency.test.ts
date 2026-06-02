import { describe, expect, it } from 'vitest'
import { currencyFromCountryCode, oppositeCurrency } from '@/lib/currency'

describe('currencyFromCountryCode', () => {
  it('uses INR for India', () => {
    expect(currencyFromCountryCode('IN')).toBe('INR')
  })

  it('defaults to USD for other countries', () => {
    expect(currencyFromCountryCode('US')).toBe('USD')
    expect(currencyFromCountryCode(null)).toBe('USD')
  })
})

describe('oppositeCurrency', () => {
  it('switches between USD and INR', () => {
    expect(oppositeCurrency('USD')).toBe('INR')
    expect(oppositeCurrency('INR')).toBe('USD')
  })
})
