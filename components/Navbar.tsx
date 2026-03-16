'use client'

import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { label: 'Home',        href: '#home' },
  { label: 'Shop',        href: '#shop' },
  { label: 'Inspiration', href: '#inspiration' },
  { label: 'About',       href: '#about' },
  { label: 'Contact',     href: '#contact' },
  { label: 'Cart',        href: '#cart', isCart: true },
]

export default function Navbar({ brandName }: { brandName?: string }) {
  const [transparent, setTransparent] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [activeSection, setActiveSection] = useState('home')

  // Transparent only when at the top (home section)
  useEffect(() => {
    const onScroll = () => {
      const homeEl = document.getElementById('home')
      if (!homeEl) { setTransparent(false); return }
      const bottom = homeEl.getBoundingClientRect().bottom
      setTransparent(bottom > 80)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section highlight
  useEffect(() => {
    const sections = ['home', 'shop', 'inspiration', 'about', 'contact', 'cart']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Cart count from localStorage
  useEffect(() => {
    const update = () => {
      try {
        const items: { qty: number }[] = JSON.parse(localStorage.getItem('kwl_cart') || '[]')
        setCartCount(items.reduce((s, i) => s + i.qty, 0))
      } catch { setCartCount(0) }
    }
    update()
    window.addEventListener('kwl_cart_updated', update)
    return () => window.removeEventListener('kwl_cart_updated', update)
  }, [])

  return (
    <nav className={`navbar${transparent && !menuOpen ? ' transparent' : ''}`}>
      <div className="navbar-inner">
        <a href="#home" className="navbar-brand brand-name">
          {brandName || 'Knots with Love'}
        </a>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`} />
        </button>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          {NAV_LINKS.map(({ label, href, isCart }) => (
            <li key={href}>
              <a
                href={href}
                className={activeSection === href.slice(1) ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {label}
                {isCart && cartCount > 0 && (
                  <span className="nav-cart-badge">{cartCount}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
