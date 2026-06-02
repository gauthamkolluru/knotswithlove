import { describe, expect, it } from 'vitest'
import {
  formatMoney,
  lineTotal,
  parseLegacyPriceString,
  resolveCheckoutUrl,
  resolveProductPrice,
  resolveProductPriceOptional,
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
  it('prefers dual USD field when active currency is USD', () => {
    expect(
      resolveProductPrice({ priceUsdAmount: 8, priceInrAmount: 499, priceAmount: 99, priceCurrency: 'INR' }, 'USD'),
    ).toEqual({ amount: 8, currency: 'USD' })
  })

  it('prefers dual INR field when active currency is INR', () => {
    expect(resolveProductPrice({ priceUsdAmount: 8, priceInrAmount: 499 }, 'INR')).toEqual({
      amount: 499,
      currency: 'INR',
    })
  })

  it('prefers legacy numeric fields when currency matches', () => {
    expect(resolveProductPrice({ priceAmount: 10.25, priceCurrency: 'USD' }, 'USD')).toEqual({
      amount: 10.25,
      currency: 'USD',
    })
  })

  it('falls back to legacy price string when currency matches', () => {
    expect(resolveProductPrice({ price: '$8.00' }, 'USD')).toEqual({ amount: 8, currency: 'USD' })
  })
})

describe('resolveProductPriceOptional', () => {
  it('returns null when alternate currency price is missing', () => {
    expect(resolveProductPriceOptional({ priceUsdAmount: 5 }, 'INR')).toBeNull()
  })
})

describe('resolveCheckoutUrl', () => {
  it('returns https checkout url for active currency', () => {
    expect(
      resolveCheckoutUrl(
        { checkoutUrlUsd: 'https://paypal.me/example', checkoutUrlInr: 'https://gumroad.com/l/x' },
        'INR',
      ),
    ).toBe('https://gumroad.com/l/x')
  })

  it('rejects non-https urls', () => {
    expect(resolveCheckoutUrl({ checkoutUrlUsd: 'http://insecure.example' }, 'USD')).toBeNull()
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
