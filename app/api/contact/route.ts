// Vulnerability documentation
// ─────────────────────────────────────────────────────────────────────────────
// [UNFIXABLE — infrastructure] Rate limiting: This endpoint has no distributed
// rate limiting. See docs/FUTURE_WORK.md for planned mitigation options.
// A honeypot field is implemented to deter basic bots.
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import { Resend } from 'resend'
import {
  buildEmailSubject,
  contactDeliveryMessage,
  resolveContactDeliveryStatus,
  validateContactBody,
} from '@/lib/contact/validate'
import { logger } from '@/lib/logger'

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const validation = validateContactBody(body)
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: validation.status })
  }

  const { name, email, subject, message } = validation.data
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'
  const toEmail = process.env.CONTACT_TO_EMAIL || 'harshita.sripada@gmail.com'

  const doc = {
    _type: 'contactSubmission',
    name,
    email,
    subject,
    message,
    submittedAt: new Date().toISOString(),
  }

  const [sanityResult, emailResult] = await Promise.allSettled([
    writeClient.create(doc),
    resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: buildEmailSubject(name, subject),
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || '—'}\n\n${message}`,
    }),
  ])

  const savedToSanity = sanityResult.status === 'fulfilled'
  const emailSent = emailResult.status === 'fulfilled'
  const status = resolveContactDeliveryStatus(savedToSanity, emailSent)

  if (!savedToSanity) {
    logger.error('contact: Sanity write failed', {
      error: sanityResult.status === 'rejected' ? String(sanityResult.reason) : 'unknown',
    })
  }
  if (!emailSent) {
    logger.error('contact: Resend failed', {
      error: emailResult.status === 'rejected' ? String(emailResult.reason) : 'unknown',
    })
  }

  if (status === 'failed') {
    return NextResponse.json({ error: contactDeliveryMessage(status) }, { status: 500 })
  }

  return NextResponse.json({
    success: true,
    status,
    message: contactDeliveryMessage(status),
  })
}
