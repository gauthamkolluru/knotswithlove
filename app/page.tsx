import { sanityFetch } from '@/sanity/lib/client'
import {
  productsQuery,
  inspirationPostsQuery,
  aboutQuery,
  contactQuery,
  siteSettingsQuery,
} from '@/sanity/lib/queries'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HomeSection from '@/components/sections/HomeSection'
import ShopSection from '@/components/sections/ShopSection'
import InspirationSection from '@/components/sections/InspirationSection'
import AboutSection from '@/components/sections/AboutSection'
import ContactSection from '@/components/sections/ContactSection'
import CartSection from '@/components/sections/CartSection'

// Fallback revalidation every 60s. Sanity webhooks trigger instant on-demand revalidation.
export const revalidate = 60

export default async function Home() {
  const [products, inspirationPosts, about, contact, settings] = await Promise.all([
    sanityFetch({ query: productsQuery }).catch(() => null),
    sanityFetch({ query: inspirationPostsQuery }).catch(() => null),
    sanityFetch({ query: aboutQuery }).catch(() => null),
    sanityFetch({ query: contactQuery }).catch(() => null),
    sanityFetch({ query: siteSettingsQuery }).catch(() => null),
  ])

  return (
    <>
      <Navbar brandName={(settings as { title?: string } | null)?.title} />
      <main>
        <HomeSection        settings={settings as Parameters<typeof HomeSection>[0]['settings']} />
        <ShopSection        products={products as Parameters<typeof ShopSection>[0]['products']} />
        <InspirationSection posts={inspirationPosts as Parameters<typeof InspirationSection>[0]['posts']} settings={settings as Parameters<typeof InspirationSection>[0]['settings']} />
        <AboutSection       about={about as Parameters<typeof AboutSection>[0]['about']} />
        <ContactSection     contact={contact as Parameters<typeof ContactSection>[0]['contact']} />
        <CartSection />
      </main>
      <Footer brandName={(settings as { title?: string } | null)?.title} />
    </>
  )
}
