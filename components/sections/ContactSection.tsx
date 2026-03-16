"use client"

import { useState } from 'react'

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

  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

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
            {status === 'sent' ? (
              <p className="form-note">Message sent! I&apos;ll get back to you soon 💌</p>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input name="name" type="text" className="form-control" placeholder="Harshita" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input name="email" type="email" className="form-control" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input name="subject" type="text" className="form-control" placeholder="Custom order / Question / Just saying hi!" value={form.subject} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea name="message" className="form-control" rows={5} placeholder="Tell me what you have in mind..." value={form.message} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn-contact" disabled={status === 'sending'}>
                  <i className="fas fa-paper-plane" />
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>
                {status === 'error' && (
                  <p className="form-note" style={{ color: 'red' }}>Something went wrong. Please try emailing directly.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
