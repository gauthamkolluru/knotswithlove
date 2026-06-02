'use client'

import { useEffect, useState } from 'react'
import { useCurrency } from '@/components/CurrencyProvider'
import {
  type CartItem,
  CART_EVENT,
  cartItemMoney,
  loadCart,
  removeFromCart,
} from '@/lib/cart'
import { CURRENCY_EVENT } from '@/lib/currency'
import { formatMoney, lineTotal, sumMoney } from '@/lib/money'

export default function CartSection() {
  const { currency } = useCurrency()
  const [items, setItems] = useState<CartItem[]>([])

  const load = () => setItems(loadCart())

  useEffect(() => {
    load()
    window.addEventListener(CART_EVENT, load)
    window.addEventListener(CURRENCY_EVENT, load)
    return () => {
      window.removeEventListener(CART_EVENT, load)
      window.removeEventListener(CURRENCY_EVENT, load)
    }
  }, [])

  const remove = (name: string) => setItems(removeFromCart(name))

  const itemsInCurrency = items.filter((item) => item.currency === currency)
  const lineTotals = itemsInCurrency.map((item) => lineTotal(cartItemMoney(item), item.qty))
  const subtotal = sumMoney(lineTotals)
  const mixedCurrency = items.length > 0 && items.some((item) => item.currency !== currency)
  const singleCheckoutUrl =
    itemsInCurrency.length === 1 ? itemsInCurrency[0].checkoutUrl : undefined

  const proceedCheckout = () => {
    if (singleCheckoutUrl) {
      window.open(singleCheckoutUrl, '_blank', 'noopener,noreferrer')
      return
    }
    if (itemsInCurrency.length > 1) {
      window.alert('Checkout one item at a time using Buy now on the shop, or keep a single item in the cart.')
      return
    }
    window.alert('Add a checkout link in Studio, or use Buy now on the product card.')
  }

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
            <div className="cart-empty-icon">
              <i className="fas fa-shopping-bag" />
            </div>
            <h5 className="text-muted" style={{ marginBottom: '0.5rem' }}>
              Your cart is empty
            </h5>
            <p className="text-muted text-sm">
              Browse the{' '}
              <a href="#shop" className="brand-link">
                shop
              </a>{' '}
              and add something you love.
            </p>
          </div>
        ) : (
          <>
            {mixedCurrency && (
              <p className="form-note text-muted text-sm text-center mb-3">
                Some items use another currency. Switch USD/INR in the menu, or remove those items.
              </p>
            )}
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
                    const dimmed = item.currency !== currency
                    return (
                      <tr key={item.name} className={dimmed ? 'cart-row-muted' : undefined}>
                        <td>{item.name}</td>
                        <td>{item.qty}</td>
                        <td>{formatMoney(unit)}</td>
                        <td>{formatMoney(total)}</td>
                        <td className="cart-cell-remove">
                          <button
                            type="button"
                            className="btn-remove"
                            onClick={() => remove(item.name)}
                            aria-label={`Remove ${item.name}`}
                          >
                            <i className="fas fa-trash-can" aria-hidden="true" />
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
                {itemsInCurrency.length === 0 ? (
                  <p className="form-note text-muted text-sm">
                    No items in {currency}. Change currency or add items from the shop.
                  </p>
                ) : (
                  <>
                    <div className="cart-summary-row">
                      <span>Subtotal ({currency})</span>
                      <span>{subtotal ? formatMoney(subtotal) : '—'}</span>
                    </div>
                    <div className="cart-summary-row text-muted text-sm">
                      <span>Shipping</span>
                      <span>At payment provider</span>
                    </div>
                    <div className="cart-summary-total">
                      <span>Total</span>
                      <span>{subtotal ? formatMoney(subtotal) : '—'}</span>
                    </div>
                  </>
                )}
                <button
                  type="button"
                  className="btn-checkout"
                  onClick={proceedCheckout}
                  disabled={itemsInCurrency.length === 0}
                >
                  <i className="fas fa-lock" />
                  {singleCheckoutUrl ? 'Proceed to secure checkout' : 'Proceed to checkout'}
                </button>
                <p className="form-note" style={{ marginTop: '0.5rem' }}>
                  {singleCheckoutUrl
                    ? 'Opens PayPal or Gumroad in a new tab.'
                    : 'One item with a checkout link required, or use Buy now on each product.'}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
