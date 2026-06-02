'use client'

import { useCurrency } from '@/components/CurrencyProvider'
import type { Currency } from '@/lib/money'

const OPTIONS: { value: Currency; label: string }[] = [
  { value: 'USD', label: 'USD $' },
  { value: 'INR', label: 'INR ₹' },
]

export default function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency()

  return (
    <div className="currency-toggle" role="group" aria-label="Display currency">
      {OPTIONS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className={`currency-toggle-btn${currency === value ? ' active' : ''}`}
          aria-pressed={currency === value}
          onClick={() => setCurrency(value)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
