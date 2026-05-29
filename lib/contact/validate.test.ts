import { describe, expect, it } from 'vitest'
import {
  buildEmailSubject,
  contactDeliveryMessage,
  resolveContactDeliveryStatus,
  validateContactBody,
} from '@/lib/contact/validate'

describe('validateContactBody', () => {
  it('accepts valid payload', () => {
    const result = validateContactBody({
      name: 'Ada',
      email: 'ada@example.com',
      subject: 'Hello',
      message: 'Hi there',
    })
    expect(result.ok).toBe(true)
  })

  it('rejects honeypot submissions', () => {
    const result = validateContactBody({
      name: 'Bot',
      email: 'bot@example.com',
      message: 'spam',
      website: 'http://spam.test',
    })
    expect(result).toEqual({ ok: false, status: 400, error: 'Invalid request.' })
  })

  it('rejects invalid email', () => {
    const result = validateContactBody({
      name: 'Ada',
      email: 'not-an-email',
      message: 'Hi',
    })
    expect(result.ok).toBe(false)
  })
})

describe('buildEmailSubject', () => {
  it('strips control characters from subject fields', () => {
    expect(buildEmailSubject('Ada\n', 'Custom\r\norder')).toBe('New message from Ada: Custom order')
  })
})

describe('contact delivery status', () => {
  it('maps partial sanity success', () => {
    expect(resolveContactDeliveryStatus(true, false)).toBe('partial_sanity')
    expect(contactDeliveryMessage('partial_sanity')).toMatch(/saved/)
  })

  it('maps full success', () => {
    expect(resolveContactDeliveryStatus(true, true)).toBe('full')
  })
})
