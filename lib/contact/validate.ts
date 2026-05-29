const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CONTROL_CHARS_RE = /[\r\n\x00-\x1f\x7f]/g

export const CONTACT_LIMITS = {
  name: 100,
  subject: 200,
  message: 5000,
} as const

export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

export type ContactValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; status: 400; error: string }

export function sanitizeEmailSubjectField(value: string): string {
  return value.replace(CONTROL_CHARS_RE, ' ').replace(/\s+/g, ' ').trim()
}

export function buildEmailSubject(name: string, subject: string): string {
  const safeName = sanitizeEmailSubjectField(name) || 'Visitor'
  const safeSubject = sanitizeEmailSubjectField(subject) || '(no subject)'
  return `New message from ${safeName}: ${safeSubject}`
}

export function validateContactBody(body: unknown): ContactValidationResult {
  if (!body || typeof body !== 'object') {
    return { ok: false, status: 400, error: 'Invalid request body.' }
  }

  const record = body as Record<string, unknown>

  if (record.website && typeof record.website === 'string' && record.website.trim()) {
    return { ok: false, status: 400, error: 'Invalid request.' }
  }

  if (typeof record.name !== 'string' || typeof record.email !== 'string' || typeof record.message !== 'string') {
    return { ok: false, status: 400, error: 'Name, email, and message are required.' }
  }

  const name = record.name.trim()
  const email = record.email.trim()
  const subject = typeof record.subject === 'string' ? record.subject.trim() : ''
  const message = record.message.trim()

  if (!name || !email || !message) {
    return { ok: false, status: 400, error: 'Name, email, and message are required.' }
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, status: 400, error: 'Invalid email address.' }
  }
  if (name.length > CONTACT_LIMITS.name) {
    return { ok: false, status: 400, error: `Name must be under ${CONTACT_LIMITS.name} characters.` }
  }
  if (subject.length > CONTACT_LIMITS.subject) {
    return { ok: false, status: 400, error: `Subject must be under ${CONTACT_LIMITS.subject} characters.` }
  }
  if (message.length > CONTACT_LIMITS.message) {
    return { ok: false, status: 400, error: `Message must be under ${CONTACT_LIMITS.message} characters.` }
  }

  return { ok: true, data: { name, email, subject, message } }
}

export type ContactDeliveryStatus = 'full' | 'partial_sanity' | 'partial_email' | 'failed'

export function resolveContactDeliveryStatus(savedToSanity: boolean, emailSent: boolean): ContactDeliveryStatus {
  if (savedToSanity && emailSent) return 'full'
  if (savedToSanity && !emailSent) return 'partial_sanity'
  if (!savedToSanity && emailSent) return 'partial_email'
  return 'failed'
}

export function contactDeliveryMessage(status: ContactDeliveryStatus): string {
  switch (status) {
    case 'full':
      return 'Message sent! I\'ll get back to you soon.'
    case 'partial_sanity':
      return 'Your message was saved, but the email notification failed. We still received it and will follow up.'
    case 'partial_email':
      return 'We got your email, but saving to our inbox failed. Please try again if you don\'t hear back.'
    default:
      return 'Failed to send your message. Please try again.'
  }
}
