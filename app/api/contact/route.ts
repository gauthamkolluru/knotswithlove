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

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
  }

  // Save to Sanity
  await writeClient.create({
    _type: 'contactSubmission',
    name,
    email,
    subject: subject || '',
    message,
    submittedAt: new Date().toISOString(),
  })

  // Send email via Resend
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'harshita.sripada@gmail.com',
    subject: `New message from ${name}: ${subject || '(no subject)'}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || '—'}\n\n${message}`,
  })

  return NextResponse.json({ success: true })
}
