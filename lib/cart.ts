import { type Currency, isCurrency, parseLegacyPriceString, type Money } from '@/lib/money'

export interface CartItem {
  name: string
  amount: number
  currency: Currency
  qty: number
  checkoutUrl?: string
}

const CART_KEY = 'kwl_cart'
export const CART_EVENT = 'kwl_cart_updated'

function normalizeCartItem(raw: unknown): CartItem | null {
  if (!raw || typeof raw !== 'object') return null
  const item = raw as Record<string, unknown>
  if (typeof item.name !== 'string') return null

  const qty = typeof item.qty === 'number' && item.qty > 0 ? Math.floor(item.qty) : 1

  if (typeof item.amount === 'number' && Number.isFinite(item.amount) && isCurrency(item.currency)) {
    const checkoutUrl =
      typeof item.checkoutUrl === 'string' && item.checkoutUrl.startsWith('https://')
        ? item.checkoutUrl
        : undefined
    return { name: item.name, amount: item.amount, currency: item.currency, qty, checkoutUrl }
  }

  if (typeof item.price === 'string') {
    const legacy = parseLegacyPriceString(item.price)
    if (legacy) {
      return { name: item.name, amount: legacy.amount, currency: legacy.currency, qty }
    }
  }

  return null
}

export function loadCart(): CartItem[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY) || '[]')
    if (!Array.isArray(parsed)) return []
    return parsed.map(normalizeCartItem).filter((item): item is CartItem => item !== null)
  } catch {
    return []
  }
}

export function saveCart(items: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
  window.dispatchEvent(new Event(CART_EVENT))
}

export function addToCart(name: string, money: Money, checkoutUrl?: string): void {
  const items = loadCart()
  const safeUrl =
    typeof checkoutUrl === 'string' && checkoutUrl.startsWith('https://') ? checkoutUrl : undefined
  const existing = items.find((item) => item.name === name)
  if (existing) {
    existing.qty += 1
    if (safeUrl) existing.checkoutUrl = safeUrl
  } else {
    items.push({
      name,
      amount: money.amount,
      currency: money.currency,
      qty: 1,
      checkoutUrl: safeUrl,
    })
  }
  saveCart(items)
}

export function removeFromCart(name: string): CartItem[] {
  const next = loadCart().filter((item) => item.name !== name)
  saveCart(next)
  return next
}

export function cartItemCount(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.qty, 0)
}

export function cartItemMoney(item: CartItem): Money {
  return { amount: item.amount, currency: item.currency }
}
