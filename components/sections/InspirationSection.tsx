import Image from 'next/image'
import { urlFor } from '@/lib/imageUrl'

interface InspirationPost {
  _id: string
  caption: string
  image?: { asset: { _ref: string } }
  color?: string
}

interface SiteSettings {
  instagramHandle?: string
  instagramUrl?: string
}

const FALLBACK_POSTS: InspirationPost[] = [
  { _id: '1', caption: 'spring pastels collection just dropped ✨ lilac, mint & the softest cream you\'ve ever seen', color: 'ig-rose' },
  { _id: '2', caption: 'this is what 3 hours of crocheting looks like. worth it 💛', color: 'ig-yellow' },
  { _id: '3', caption: 'custom order for a baby shower 🎀 made with the most ridiculous amount of love', color: 'ig-sage' },
  { _id: '4', caption: 'slow sunday morning + strong coffee + yarn = the only kind of morning i want', color: 'ig-blue' },
  { _id: '5', caption: 'when a customer sends you a photo of their order in its new home 🥹 this is why i do it', color: 'ig-lavender' },
  { _id: '6', caption: 'new market tote is finally here and i am OBSESSED with how it turned out', color: 'ig-peach' },
]

export default function InspirationSection({
  posts,
  settings,
}: {
  posts: InspirationPost[] | null
  settings: SiteSettings | null
}) {
  const list   = posts && posts.length > 0 ? posts : FALLBACK_POSTS
  const handle = settings?.instagramHandle || '@knotswithlove'
  const igUrl  = settings?.instagramUrl    || '#'

  return (
    <section id="inspiration" className="section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">follow the journey</h2>
          <p className="section-subtitle">behind the scenes, work in progress, and the occasional yarn disaster 🧶</p>
          <a href={igUrl} className="ig-handle" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram" style={{ marginRight: '0.3rem' }} />
            {handle}
          </a>
          <hr className="brand-divider" />
        </div>

        <div className="ig-grid">
          {list.map((post) => {
            const imgUrl = post.image
              ? urlFor(post.image).width(400).height(400).fit('crop').url()
              : null

            return (
              <a
                key={post._id}
                href={igUrl}
                className={`ig-cell ${!imgUrl ? (post.color || 'ig-rose') : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={post.caption}
              >
                {imgUrl && (
                  <Image
                    src={imgUrl}
                    alt={post.caption}
                    fill
                    sizes="(max-width: 576px) 50vw, 33vw"
                    className="ig-cell-photo"
                  />
                )}
                {!imgUrl && (
                  <div className="ig-cell-icon">
                    <i className="fab fa-instagram" />
                  </div>
                )}
                <div className="ig-cell-overlay">
                  <p className="ig-caption">{post.caption}</p>
                </div>
              </a>
            )
          })}
        </div>

        <div className="ig-cta">
          <a href={igUrl} className="btn-ig" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram" style={{ marginRight: '0.5rem' }} />
            follow us on instagram
          </a>
        </div>
      </div>
    </section>
  )
}
