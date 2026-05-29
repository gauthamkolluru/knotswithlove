"use client"

import { useState } from 'react'
import type { Contact } from '@/sanity/lib/types'

const FALLBACK_CHANNELS = [
  { _key: '1', icon: 'fas fa-envelope', label: 'email', value: 'hello@knotswithlove.in', href: 'mailto:hello@knotswithlove.in' },
  { _key: '2', icon: 'fab fa-instagram', label: 'instagram', value: '@knotswithlove', href: '#' },
  { _key: '3', icon: 'fab fa-whatsapp', label: 'whatsapp', value: 'available on request', href: '#' },
]

type FormStatus = 'idle' | 'sending' | 'sent' | 'partial' | 'error'

export default function ContactSection({ contact }: { contact: Contact | null }) {
  const heading = contact?.heading || 'say hi!'
  const intro = contact?.intro || 'custom order? a question? just want to tell me what you\'re crocheting right now? my inbox is always open 💌'
  const channels = contact?.channels && contact.channels.length > 0 ? contact.channels : FALLBACK_CHANNELS

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', website: '' })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setStatusMessage('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus('error')
        setStatusMessage(typeof data.error === 'string' ? data.error : 'Something went wrong. Please try emailing directly.')
        return
      }
      const message = typeof data.message === 'string' ? data.message : 'Message sent! I\'ll get back to you soon.'
      setStatus(data.status === 'full' ? 'sent' : 'partial')
      setStatusMessage(message)
      setForm({ name: '', email: '', subject: '', message: '', website: '' })
    } catch {
      setStatus('error')
      setStatusMessage('Something went wrong. Please try emailing directly.')
    }
  }

  const showForm = status === 'idle' || status === 'sending' || status === 'error'

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
            {!showForm ? (
              <p className="form-note">{statusMessage} 💌</p>
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
                <div className="form-group" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={handleChange} />
                </div>
                <button type="submit" className="btn-contact" disabled={status === 'sending'}>
                  <i className="fas fa-paper-plane" />
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>
                {status === 'error' && (
                  <p className="form-note" style={{ color: 'red' }}>{statusMessage}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
