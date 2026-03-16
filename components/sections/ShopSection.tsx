'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/imageUrl'

interface Product {
  _id: string
  name: string
  description?: string
  price: string
  badge?: string
  image?: { asset: { _ref: string } }
  color?: string
  inStock?: boolean
}

const FALLBACK_PRODUCTS: Product[] = [
  { _id: '1', name: 'Boho Basket',        price: '$12', badge: 'Bestseller', color: 'plh-rose',     description: 'a handcrafted boho storage basket — sturdy, cosy, and somehow makes every room look like it has its life together.' },
  { _id: '2', name: 'Sunflower Coaster Set', price: '$5',  color: 'plh-yellow',  description: 'set of 4 little sunflower coasters. honestly, too pretty to put a mug on — but please do anyway.' },
  { _id: '3', name: 'Sage Plant Hanger',  price: '$8',  badge: 'New',        color: 'plh-sage',    description: 'a macramé-inspired plant hanger in sage green cotton. your plants deserve nice things too.' },
  { _id: '4', name: 'Chunky Throw Blanket', price: '$28', color: 'plh-blue',    description: 'the kind of blanket you pick up, wrap yourself in, and refuse to put down. made for slow mornings.' },
  { _id: '5', name: 'Pastel Trinket Pouch', price: '$6',  color: 'plh-lavender', description: 'a tiny drawstring pouch in the softest pastels — for jewellery, earbuds, or whatever you can\'t find at 8am.' },
  { _id: '6', name: 'Market Tote Bag',    price: '$10', badge: 'New',        color: 'plh-peach',   description: 'an open-weave crochet tote in natural cotton — goes with everything and holds more than it looks like it should.' },
]

function addToCart(name: string, price: string) {
  try {
    const items: { name: string; price: string; qty: number }[] =
      JSON.parse(localStorage.getItem('kwl_cart') || '[]')
    const existing = items.find((i) => i.name === name)
    if (existing) { existing.qty += 1 } else { items.push({ name, price, qty: 1 }) }
    localStorage.setItem('kwl_cart', JSON.stringify(items))
    window.dispatchEvent(new Event('kwl_cart_updated'))
    const cartEl = document.getElementById('cart')
    if (cartEl) cartEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } catch { /* noop */ }
}

export default function ShopSection({ products }: { products: Product[] | null }) {
  const list = products && products.length > 0 ? products : FALLBACK_PRODUCTS

  return (
    <section id="shop" className="section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">shop handmade pieces</h2>
          <p className="section-subtitle">every single item is crocheted by hand — no two pieces are exactly alike, and that&apos;s the whole point ✨</p>
          <hr className="brand-divider" />
        </div>

        <div className="shop-grid">
          {list.map((product) => {
            const imgUrl = product.image
              ? urlFor(product.image).width(420).height(420).fit('crop').url()
              : null

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
                    <span className="shop-price">{product.price}</span>
                    <button
                      className="btn-shop-add"
                      onClick={() => addToCart(product.name, product.price)}
                      disabled={product.inStock === false}
                    >
                      <i className="fas fa-shopping-bag" />
                      {product.inStock === false ? 'Out of stock' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <p className="shop-footer-note">
          want something custom or have a specific idea in mind?{' '}
          <a href="#contact" className="brand-link">let&apos;s talk ✉️</a>
        </p>
      </div>
    </section>
  )
}
