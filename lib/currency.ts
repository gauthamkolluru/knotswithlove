import type { Currency } from '@/lib/money'
import { isCurrency } from '@/lib/money'

export const CURRENCY_STORAGE_KEY = 'kwl_currency'
export const CURRENCY_EVENT = 'kwl_currency_changed'

export function currencyFromCountryCode(code: string | null | undefined): Currency {
  return code?.toUpperCase() === 'IN' ? 'INR' : 'USD'
}

export function readStoredCurrency(): Currency | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CURRENCY_STORAGE_KEY)
    return isCurrency(raw) ? raw : null
  } catch {
    return null
  }
}

export function writeStoredCurrency(currency: Currency): void {
  localStorage.setItem(CURRENCY_STORAGE_KEY, currency)
  window.dispatchEvent(new Event(CURRENCY_EVENT))
}

export function oppositeCurrency(currency: Currency): Currency {
  return currency === 'USD' ? 'INR' : 'USD'
}
