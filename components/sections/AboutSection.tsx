import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/imageUrl'

interface Value {
  _key?: string
  icon?: string
  title?: string
  description?: string
}

interface About {
  heading?: string
  photo?: { asset: { _ref: string } }
  story?: unknown[]
  values?: Value[]
}

const FALLBACK_VALUES: Value[] = [
  { _key: '1', icon: 'fas fa-heart',  title: 'made with love',       description: 'every piece is handcrafted by me — no machines, no shortcuts. just hands, a hook, and a lot of heart.' },
  { _key: '2', icon: 'fas fa-leaf',   title: 'quality yarn only',    description: 'soft, quality materials that feel as good as they look. life\'s too short for scratchy yarn.' },
  { _key: '3', icon: 'fas fa-gift',   title: 'custom orders welcome', description: 'have a specific colour, size or idea in mind? i take custom orders and love a good creative challenge.' },
]

const FALLBACK_STORY = `I'm **Harshita Sreepada**, and I've been crocheting since the day I decided I needed a hobby that wasn't just scrolling.

What started as something to do with my hands on slow evenings turned into *Knots with Love* — a small handmade brand I'm genuinely, irrationally proud of. I make things for homes, for hands, for the people you love, and sometimes just for the sheer joy of making them.

Every piece I sell is crocheted by me, start to finish. No factories, no shortcuts — just yarn, a hook, and probably a podcast playing in the background. I like imperfections in handmade things because they're proof that a real person made it.

So if you've ever wanted something that was made *specifically* to be loved — you're in the right place 🧶`

export default function AboutSection({ about }: { about: About | null }) {
  const heading = about?.heading || "hey, it's me!"
  const values  = about?.values && about.values.length > 0 ? about.values : FALLBACK_VALUES
  const photoUrl = about?.photo
    ? urlFor(about.photo).width(520).height(520).fit('crop').url()
    : null

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">{heading}</h2>
          <hr className="brand-divider" />
        </div>

        <div className="about-layout">
          <div className="about-photo-wrap">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt="Harshita Sreepada"
                width={260}
                height={260}
                className="about-photo"
              />
            ) : (
              <div className="about-photo-placeholder">
                <span>Photo coming soon</span>
              </div>
            )}
          </div>

          <div className="about-story">
            {about?.story ? (
              <PortableText value={about.story as Parameters<typeof PortableText>[0]['value']} />
            ) : (
              FALLBACK_STORY.split('\n\n').map((para, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: para
                  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.+?)\*/g, '<em>$1</em>')
                }} />
              ))
            )}
          </div>
        </div>

        <div className="values-grid">
          {values.map((v, i) => (
            <div key={v._key || i} className="value-card">
              <div className="value-icon">
                <i className={v.icon || 'fas fa-heart'} />
              </div>
              <h5 className="value-title">{v.title}</h5>
              <p className="text-muted text-sm">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
