'use client'

/**
 * Embedded Sanity Studio.
 * Accessible at /studio — this is the content management portal for Harshita.
 */

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
