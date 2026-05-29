'use client'

import { useEffect, useState } from 'react'
import {
  type CartItem,
  CART_EVENT,
  cartItemMoney,
  loadCart,
  removeFromCart,
} from '@/lib/cart'
import { formatMoney, lineTotal, sumMoney } from '@/lib/money'

export default function CartSection() {
  const [items, setItems] = useState<CartItem[]>([])

  const load = () => setItems(loadCart())

  useEffect(() => {
    load()
    window.addEventListener(CART_EVENT, load)
    return () => window.removeEventListener(CART_EVENT, load)
  }, [])

  const remove = (name: string) => setItems(removeFromCart(name))

  const lineTotals = items.map((item) => lineTotal(cartItemMoney(item), item.qty))
  const subtotal = sumMoney(lineTotals)
  const mixedCurrency = items.length > 0 && subtotal === null

  return (
    <section id="cart" className="section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Cart</h2>
          <p className="section-subtitle">Your handpicked pieces, waiting to go home with you.</p>
          <hr className="brand-divider" />
        </div>

        {items.length === 0 ? (
          <div className="text-center" style={{ padding: '3rem 0' }}>
            <div className="cart-empty-icon"><i className="fas fa-shopping-bag" /></div>
            <h5 className="text-muted" style={{ marginBottom: '0.5rem' }}>Your cart is empty</h5>
            <p className="text-muted text-sm">
              Browse the <a href="#shop" className="brand-link">shop</a> and add something you love.
            </p>
          </div>
        ) : (
          <>
            <div className="cart-table-wrap">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const unit = cartItemMoney(item)
                    const total = lineTotal(unit, item.qty)
                    return (
                      <tr key={item.name}>
                        <td>{item.name}</td>
                        <td>{item.qty}</td>
                        <td>{formatMoney(unit)}</td>
                        <td>{formatMoney(total)}</td>
                        <td>
                          <button className="btn-remove" onClick={() => remove(item.name)} aria-label={`Remove ${item.name}`}>
                            <i className="fas fa-times" />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="cart-summary-wrap">
              <div className="cart-summary">
                {mixedCurrency ? (
                  <p className="form-note text-muted text-sm">
                    Items use different currencies. Line totals are shown above; checkout will support one currency at a time.
                  </p>
                ) : (
                  <>
                    <div className="cart-summary-row">
                      <span>Subtotal</span>
                      <span>{subtotal ? formatMoney(subtotal) : '—'}</span>
                    </div>
                    <div className="cart-summary-row text-muted text-sm">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="cart-summary-total">
                      <span>Total</span>
                      <span>{subtotal ? formatMoney(subtotal) : '—'}</span>
                    </div>
                  </>
                )}
                <button className="btn-checkout" onClick={() => alert('Checkout coming soon!')}>
                  <i className="fas fa-lock" />
                  Proceed to Checkout
                </button>
                <p className="form-note" style={{ marginTop: '0.5rem' }}>Secure checkout coming soon.</p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
