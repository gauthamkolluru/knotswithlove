import { describe, expect, it } from 'vitest'
import {
  formatMoney,
  lineTotal,
  parseLegacyPriceString,
  resolveProductPrice,
  sumMoney,
} from '@/lib/money'

describe('formatMoney', () => {
  it('formats USD with two decimals', () => {
    expect(formatMoney({ amount: 12.5, currency: 'USD' })).toBe('$12.50')
  })

  it('formats INR with two decimals', () => {
    expect(formatMoney({ amount: 499.99, currency: 'INR' })).toBe('₹499.99')
  })
})

describe('parseLegacyPriceString', () => {
  it('parses dollar strings', () => {
    expect(parseLegacyPriceString('$12.50')).toEqual({ amount: 12.5, currency: 'USD' })
  })

  it('parses rupee strings', () => {
    expect(parseLegacyPriceString('₹1,250.75')).toEqual({ amount: 1250.75, currency: 'INR' })
  })

  it('returns null for empty input', () => {
    expect(parseLegacyPriceString('')).toBeNull()
  })
})

describe('resolveProductPrice', () => {
  it('prefers numeric Sanity fields', () => {
    expect(resolveProductPrice({ priceAmount: 10.25, priceCurrency: 'USD' })).toEqual({
      amount: 10.25,
      currency: 'USD',
    })
  })

  it('falls back to legacy price string', () => {
    expect(resolveProductPrice({ price: '$8.00' })).toEqual({ amount: 8, currency: 'USD' })
  })
})

describe('sumMoney', () => {
  it('sums same-currency amounts', () => {
    expect(
      sumMoney([
        { amount: 5, currency: 'USD' },
        { amount: 12.5, currency: 'USD' },
      ]),
    ).toEqual({ amount: 17.5, currency: 'USD' })
  })

  it('returns null for mixed currencies', () => {
    expect(
      sumMoney([
        { amount: 5, currency: 'USD' },
        { amount: 100, currency: 'INR' },
      ]),
    ).toBeNull()
  })
})

describe('lineTotal', () => {
  it('multiplies amount by quantity', () => {
    expect(lineTotal({ amount: 12.5, currency: 'USD' }, 2)).toEqual({
      amount: 25,
      currency: 'USD',
    })
  })
})
