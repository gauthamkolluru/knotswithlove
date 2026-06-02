'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  CURRENCY_EVENT,
  currencyFromCountryCode,
  readStoredCurrency,
  writeStoredCurrency,
} from '@/lib/currency'
import { loadCart, saveCart } from '@/lib/cart'
import type { Currency } from '@/lib/money'

interface CurrencyContextValue {
  currency: Currency
  geoCurrency: Currency
  setCurrency: (next: Currency) => void
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null)

export function CurrencyProvider({
  geoCountry,
  children,
}: {
  geoCountry: string | null
  children: ReactNode
}) {
  const geoCurrency = useMemo(() => currencyFromCountryCode(geoCountry), [geoCountry])
  const [currency, setCurrencyState] = useState<Currency>(geoCurrency)

  useEffect(() => {
    setCurrencyState(readStoredCurrency() ?? geoCurrency)
  }, [geoCurrency])

  useEffect(() => {
    const sync = () => setCurrencyState(readStoredCurrency() ?? geoCurrency)
    window.addEventListener(CURRENCY_EVENT, sync)
    return () => window.removeEventListener(CURRENCY_EVENT, sync)
  }, [geoCurrency])

  const setCurrency = useCallback((next: Currency) => {
    const cart = loadCart()
    if (cart.some((item) => item.currency !== next)) {
      saveCart([])
    }
    writeStoredCurrency(next)
    setCurrencyState(next)
  }, [])

  const value = useMemo(
    () => ({ currency, geoCurrency, setCurrency }),
    [currency, geoCurrency, setCurrency],
  )

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext)
  if (!ctx) {
    throw new Error('useCurrency must be used within CurrencyProvider')
  }
  return ctx
}
