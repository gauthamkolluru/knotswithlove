import type { Currency } from '@/lib/money'

export interface SanityImage {
  asset: { _ref: string }
}

export interface SiteSettings {
  title?: string
  greeting?: string
  authorName?: string
  subtitle?: string
  description?: string
  heroImage?: SanityImage
  instagramUrl?: string
  instagramHandle?: string
}

export interface Product {
  _id: string
  name: string
  description?: string
  priceUsdAmount?: number
  priceInrAmount?: number
  checkoutUrlUsd?: string
  checkoutUrlInr?: string
  priceAmount?: number
  priceCurrency?: Currency
  price?: string
  badge?: string
  image?: SanityImage
  color?: string
  inStock?: boolean
}

export interface InspirationPost {
  _id: string
  caption: string
  image?: SanityImage
  color?: string
}

export interface AboutValue {
  _key?: string
  icon?: string
  title?: string
  description?: string
}

export interface About {
  heading?: string
  photo?: SanityImage
  story?: unknown[]
  values?: AboutValue[]
}

export interface ContactChannel {
  _key?: string
  icon?: string
  label?: string
  value?: string
  href?: string
}

export interface Contact {
  heading?: string
  intro?: string
  channels?: ContactChannel[]
}
