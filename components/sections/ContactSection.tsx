"use client"

interface Channel {
  _key?: string
  icon?: string
  label?: string
  value?: string
  href?: string
}

interface Contact {
  heading?: string
  intro?: string
  channels?: Channel[]
}

const FALLBACK_CHANNELS: Channel[] = [
  { _key: '1', icon: 'fas fa-envelope', label: 'email',     value: 'hello@knotswithlove.in',  href: 'mailto:hello@knotswithlove.in' },
  { _key: '2', icon: 'fab fa-instagram', label: 'instagram', value: '@knotswithlove',          href: '#' },
  { _key: '3', icon: 'fab fa-whatsapp',  label: 'whatsapp',  value: 'available on request',    href: '#' },
]

export default function ContactSection({ contact }: { contact: Contact | null }) {
  const heading  = contact?.heading  || 'say hi!'
  const intro    = contact?.intro    || 'custom order? a question? just want to tell me what you\'re crocheting right now? my inbox is always open 💌'
  const channels = contact?.channels && contact.channels.length > 0 ? contact.channels : FALLBACK_CHANNELS

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">{heading}</h2>
          <p className="section-subtitle">{intro}</p>
          <hr className="brand-divider" />
        </div>

        <div className="contact-layout">
          <div>
            <h5 className="contact-group-title">Reach out</h5>
            {channels.map((ch, i) => (
              <div key={ch._key || i} className="contact-channel">
                <div className="contact-icon">
                  <i className={ch.icon || 'fas fa-envelope'} />
                </div>
                <div>
                  <div className="contact-label">{ch.label}</div>
                  <a href={ch.href || '#'} className="contact-value">
                    {ch.value}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h5 className="contact-group-title">Send a message</h5>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input type="text" className="form-control" placeholder="Harshita" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-control" placeholder="you@example.com" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input type="text" className="form-control" placeholder="Custom order / Question / Just saying hi!" />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-control" rows={5} placeholder="Tell me what you have in mind..." />
              </div>
              <button type="submit" className="btn-contact">
                <i className="fas fa-paper-plane" />
                Send Message
              </button>
              <p className="form-note">
                Form submission coming soon — for now, reach out via email or Instagram.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
