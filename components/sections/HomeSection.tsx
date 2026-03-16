import Image from 'next/image'
import { urlFor } from '@/lib/imageUrl'

interface SiteSettings {
  title?: string
  greeting?: string
  authorName?: string
  subtitle?: string
  description?: string
  heroImage?: { asset: { _ref: string } }
}

export default function HomeSection({ settings }: { settings: SiteSettings | null }) {
  const greeting    = settings?.greeting    || "hey, it's"
  const authorName  = settings?.authorName  || 'Harshita'
  const subtitle    = settings?.subtitle    || 'maker, crocheter & the one tying all these knots'
  const description = settings?.description || 'welcome to my cosy corner of handmade things — slow crafts, pretty yarn, and pieces made with way too much love. if something\'s been stitched by hand and wrapped with care, it probably came from here ✨'
  const brandName   = settings?.title       || 'Knots with Love'

  const heroImageUrl = settings?.heroImage
    ? urlFor(settings.heroImage).width(680).height(680).fit('crop').url()
    : null

  return (
    <section id="home">
      <div className="container">
        <div className="home-inner">
          <div className="home-left">
            <h1 className="home-greeting">{greeting} {authorName}</h1>
            <p className="home-subtitle">{subtitle}</p>
            <p className="home-description">{description}</p>
            <p className="home-tagline">
              <span className="brand-name">{brandName}</span>
            </p>
          </div>
          <div className="home-right">
            {heroImageUrl ? (
              <Image
                src={heroImageUrl}
                alt={authorName}
                width={340}
                height={340}
                className="home-author-image"
                priority
              />
            ) : (
              <Image
                src="/hero-placeholder.svg"
                alt="Harshita Sreepada — photo coming soon"
                width={360}
                height={360}
                className="home-hero-illustration"
                priority
              />
            )}
          </div>
        </div>
      </div>
      <a href="#shop" className="home-arrow" aria-label="Scroll to shop">
        <i className="fas fa-chevron-down" />
      </a>
    </section>
  )
}
