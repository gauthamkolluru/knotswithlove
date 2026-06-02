'use client'

import Image from 'next/image'
import { useCurrency } from '@/components/CurrencyProvider'
import { urlFor } from '@/lib/imageUrl'
import { addToCart } from '@/lib/cart'
import { oppositeCurrency } from '@/lib/currency'
import {
  formatMoney,
  resolveCheckoutUrl,
  resolveProductPrice,
  resolveProductPriceOptional,
} from '@/lib/money'
import type { Product } from '@/sanity/lib/types'

const FALLBACK_PRODUCTS: Product[] = [
  {
    _id: '1',
    name: 'Boho Basket',
    priceUsdAmount: 12,
    priceInrAmount: 999,
    badge: 'Bestseller',
    color: 'plh-rose',
    description:
      'a handcrafted boho storage basket — sturdy, cosy, and somehow makes every room look like it has its life together.',
  },
  {
    _id: '2',
    name: 'Sunflower Coaster Set',
    priceUsdAmount: 5,
    priceInrAmount: 399,
    color: 'plh-yellow',
    description:
      'set of 4 little sunflower coasters. honestly, too pretty to put a mug on — but please do anyway.',
  },
  {
    _id: '3',
    name: 'Sage Plant Hanger',
    priceUsdAmount: 8,
    priceInrAmount: 649,
    badge: 'New',
    color: 'plh-sage',
    description:
      'a macramé-inspired plant hanger in sage green cotton. your plants deserve nice things too.',
  },
  {
    _id: '4',
    name: 'Chunky Throw Blanket',
    priceUsdAmount: 28,
    priceInrAmount: 2299,
    color: 'plh-blue',
    description:
      'the kind of blanket you pick up, wrap yourself in, and refuse to put down. made for slow mornings.',
  },
  {
    _id: '5',
    name: 'Pastel Trinket Pouch',
    priceUsdAmount: 6,
    priceInrAmount: 499,
    color: 'plh-lavender',
    description:
      "a tiny drawstring pouch in the softest pastels — for jewellery, earbuds, or whatever you can't find at 8am.",
  },
  {
    _id: '6',
    name: 'Market Tote Bag',
    priceUsdAmount: 10,
    priceInrAmount: 799,
    badge: 'New',
    color: 'plh-peach',
    description:
      'an open-weave crochet tote in natural cotton — goes with everything and holds more than it looks like it should.',
  },
]

function addToCartAndScroll(
  name: string,
  money: ReturnType<typeof resolveProductPrice>,
  checkoutUrl: string | null,
) {
  addToCart(name, money, checkoutUrl ?? undefined)
  const cartEl = document.getElementById('cart')
  if (cartEl) cartEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function ShopSection({ products }: { products: Product[] | null }) {
  const { currency } = useCurrency()
  const list = products && products.length > 0 ? products : FALLBACK_PRODUCTS

  return (
    <section id="shop" className="section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">shop handmade pieces</h2>
          <p className="section-subtitle">
            every single item is crocheted by hand — no two pieces are exactly alike, and that&apos;s
            the whole point ✨
          </p>
          <hr className="brand-divider" />
        </div>

        <div className="shop-grid">
          {list.map((product) => {
            const imgUrl = product.image
              ? urlFor(product.image).width(420).height(420).fit('crop').url()
              : null
            const unitPrice = resolveProductPrice(product, currency)
            const checkoutUrl = resolveCheckoutUrl(product, currency)
            const altCurrency = oppositeCurrency(currency)
            const altPrice = resolveProductPriceOptional(product, altCurrency)
            const inStock = product.inStock !== false

            return (
              <div key={product._id} className="shop-card">
                <div className={`shop-card-img ${!imgUrl ? (product.color || 'plh-rose') : ''}`}>
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={product.name}
                      width={420}
                      height={210}
                      className="shop-card-photo"
                    />
                  ) : (
                    <i className="fas fa-shopping-bag shop-card-icon" />
                  )}
                </div>
                <div className="shop-card-body">
                  <div className="shop-card-header">
                    <h5 className="shop-card-name">{product.name}</h5>
                    {product.badge && <span className="shop-badge">{product.badge}</span>}
                  </div>
                  <p className="shop-card-desc">{product.description}</p>
                  <div className="shop-card-footer">
                    <div className="shop-price-block">
                      <span className="shop-price">{formatMoney(unitPrice)}</span>
                      {altPrice && (
                        <span className="shop-price-alt text-muted text-sm">
                          Also {formatMoney(altPrice)}
                        </span>
                      )}
                    </div>
                    <div className="shop-card-actions">
                      {checkoutUrl ? (
                        <a
                          href={checkoutUrl}
                          className="btn-shop-buy"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fas fa-lock" />
                          Buy now
                        </a>
                      ) : (
                        <button type="button" className="btn-shop-buy" disabled title="Add checkout link in Studio">
                          Buy soon
                        </button>
                      )}
                      <button
                        type="button"
                        className="btn-shop-add"
                        onClick={() => addToCartAndScroll(product.name, unitPrice, checkoutUrl)}
                        disabled={!inStock}
                      >
                        <i className="fas fa-shopping-bag" />
                        {inStock ? 'Add to cart' : 'Out of stock'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <p className="shop-footer-note">
          Prices follow your selected currency (USD / INR). Checkout opens PayPal or Gumroad when
          links are set in Studio.{' '}
          <a href="#contact" className="brand-link">
            Custom orders ✉️
          </a>
        </p>
      </div>
    </section>
  )
}
