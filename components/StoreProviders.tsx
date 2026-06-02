'use client'

import type { ReactNode } from 'react'
import { CurrencyProvider } from '@/components/CurrencyProvider'

export default function StoreProviders({
  geoCountry,
  children,
}: {
  geoCountry: string | null
  children: ReactNode
}) {
  return <CurrencyProvider geoCountry={geoCountry}>{children}</CurrencyProvider>
}
