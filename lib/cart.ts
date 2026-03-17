export interface CartItem {
  name: string
  price: string
  qty: number
}

const CART_KEY = 'kwl_cart'
export const CART_EVENT = 'kwl_cart_updated'

export function loadCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveCart(items: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
  window.dispatchEvent(new Event(CART_EVENT))
}

export function addToCart(name: string, price: string): void {
  const items = loadCart()
  const existing = items.find((i) => i.name === name)
  if (existing) {
    existing.qty += 1
  } else {
    items.push({ name, price, qty: 1 })
  }
  saveCart(items)
}

export function removeFromCart(name: string): CartItem[] {
  const next = loadCart().filter((i) => i.name !== name)
  saveCart(next)
  return next
}

export function parsePrice(s: string): number {
  return parseInt(s.replace(/[^0-9]/g, ''), 10) || 0
}
