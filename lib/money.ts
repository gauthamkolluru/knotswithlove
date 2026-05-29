export const CURRENCIES = ['USD', 'INR'] as const
export type Currency = (typeof CURRENCIES)[number]

export interface Money {
  amount: number
  currency: Currency
}

const LOCALE_BY_CURRENCY: Record<Currency, string> = {
  USD: 'en-US',
  INR: 'en-IN',
}

export function isCurrency(value: unknown): value is Currency {
  return typeof value === 'string' && (CURRENCIES as readonly string[]).includes(value)
}

export function formatMoney(money: Money, locale?: string): string {
  return new Intl.NumberFormat(locale ?? LOCALE_BY_CURRENCY[money.currency], {
    style: 'currency',
    currency: money.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(money.amount)
}

export function parseLegacyPriceString(raw: string): Money | null {
  const trimmed = raw.trim()
  if (!trimmed) return null

  const upper = trimmed.toUpperCase()
  let currency: Currency = 'USD'
  if (trimmed.includes('₹') || upper.includes('INR') || upper.includes('RS')) {
    currency = 'INR'
  }

  const numeric = trimmed.replace(/[^0-9.]/g, '')
  const amount = Number.parseFloat(numeric)
  if (!Number.isFinite(amount) || amount < 0) return null

  return { amount, currency }
}

export interface PriceFields {
  priceAmount?: number
  priceCurrency?: string
  price?: string
}

export function resolveProductPrice(fields: PriceFields, fallback: Money = { amount: 0, currency: 'USD' }): Money {
  if (typeof fields.priceAmount === 'number' && Number.isFinite(fields.priceAmount) && isCurrency(fields.priceCurrency)) {
    return { amount: fields.priceAmount, currency: fields.priceCurrency }
  }
  if (typeof fields.price === 'string') {
    const legacy = parseLegacyPriceString(fields.price)
    if (legacy) return legacy
  }
  return fallback
}

export function sumMoney(items: Money[]): Money | null {
  if (items.length === 0) return null
  const currency = items[0].currency
  if (!items.every((item) => item.currency === currency)) return null
  const amount = items.reduce((total, item) => total + item.amount, 0)
  return { amount, currency }
}

export function lineTotal(unit: Money, qty: number): Money {
  return { amount: unit.amount * qty, currency: unit.currency }
}
