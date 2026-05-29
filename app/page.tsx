import { sanityFetch } from '@/sanity/lib/client'
import {
  productsQuery,
  inspirationPostsQuery,
  aboutQuery,
  contactQuery,
  siteSettingsQuery,
} from '@/sanity/lib/queries'
import { logger } from '@/lib/logger'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HomeSection from '@/components/sections/HomeSection'
import ShopSection from '@/components/sections/ShopSection'
import InspirationSection from '@/components/sections/InspirationSection'
import AboutSection from '@/components/sections/AboutSection'
import ContactSection from '@/components/sections/ContactSection'
import CartSection from '@/components/sections/CartSection'
import type { About, Contact, InspirationPost, Product, SiteSettings } from '@/sanity/lib/types'

export const revalidate = 60

async function fetchSection<T>(label: string, query: string): Promise<T | null> {
  try {
    return await sanityFetch<T>({ query })
  } catch (err) {
    logger.error('sanity fetch failed', {
      section: label,
      error: err instanceof Error ? err.message : String(err),
    })
    return null
  }
}

export default async function Home() {
  const [products, inspirationPosts, about, contact, settings] = await Promise.all([
    fetchSection<Product[]>('products', productsQuery),
    fetchSection<InspirationPost[]>('inspiration', inspirationPostsQuery),
    fetchSection<About>('about', aboutQuery),
    fetchSection<Contact>('contact', contactQuery),
    fetchSection<SiteSettings>('siteSettings', siteSettingsQuery),
  ])

  return (
    <>
      <Navbar brandName={settings?.title} />
      <main>
        <HomeSection settings={settings} />
        <ShopSection products={products} />
        <InspirationSection posts={inspirationPosts} settings={settings} />
        <AboutSection about={about} />
        <ContactSection contact={contact} />
        <CartSection />
      </main>
      <Footer brandName={settings?.title} />
    </>
  )
}
