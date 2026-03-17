// Vulnerability documentation
// ─────────────────────────────────────────────────────────────────────────────
// [UNFIXABLE — infrastructure] Rate limiting: This endpoint has no distributed
// rate limiting. In a serverless/edge environment, in-memory counters do not
// persist across instances, so per-IP throttling requires an external store.
// Mitigation: add Upstash Redis + @upstash/ratelimit (recommended for Vercel),
// or enforce rate limits at the CDN/WAF layer (e.g. Cloudflare Rate Limiting).
// A client-side honeypot field can additionally deter automated bots.
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import { Resend } from 'resend'

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const resend = new Resend(process.env.RESEND_API_KEY)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_NAME = 100
const MAX_SUBJECT = 200
const MAX_MESSAGE = 5000

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { name, email, subject, message } = body as Record<string, unknown>

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
  }

  const trimName    = name.trim()
  const trimEmail   = email.trim()
  const trimSubject = typeof subject === 'string' ? subject.trim() : ''
  const trimMessage = message.trim()

  if (!trimName || !trimEmail || !trimMessage) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
  }
  if (!EMAIL_RE.test(trimEmail)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
  }
  if (trimName.length > MAX_NAME) {
    return NextResponse.json({ error: `Name must be under ${MAX_NAME} characters.` }, { status: 400 })
  }
  if (trimSubject.length > MAX_SUBJECT) {
    return NextResponse.json({ error: `Subject must be under ${MAX_SUBJECT} characters.` }, { status: 400 })
  }
  if (trimMessage.length > MAX_MESSAGE) {
    return NextResponse.json({ error: `Message must be under ${MAX_MESSAGE} characters.` }, { status: 400 })
  }

  const doc = {
    _type: 'contactSubmission',
    name:        trimName,
    email:       trimEmail,
    subject:     trimSubject,
    message:     trimMessage,
    submittedAt: new Date().toISOString(),
  }

  const [sanityResult, emailResult] = await Promise.allSettled([
    writeClient.create(doc),
    resend.emails.send({
      from:    'onboarding@resend.dev',
      to:      'harshita.sripada@gmail.com',
      subject: `New message from ${trimName}: ${trimSubject || '(no subject)'}`,
      text:    `Name: ${trimName}\nEmail: ${trimEmail}\nSubject: ${trimSubject || '—'}\n\n${trimMessage}`,
    }),
  ])

  const savedToSanity = sanityResult.status === 'fulfilled'
  const emailSent     = emailResult.status === 'fulfilled'

  if (!savedToSanity) console.error('contact: Sanity write failed', sanityResult.reason)
  if (!emailSent)     console.error('contact: Resend failed', emailResult.reason)

  if (!savedToSanity && !emailSent) {
    return NextResponse.json({ error: 'Failed to send your message. Please try again.' }, { status: 500 })
  }

  // At least one delivery path succeeded — treat as success.
  // If only email failed: data is in Sanity Studio. If only Sanity failed: owner was notified.
  return NextResponse.json({ success: true })
}
