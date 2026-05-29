'use client'

import { useEffect } from 'react'
import { logger } from '@/lib/logger'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    logger.error('app error boundary', {
      message: error.message,
      digest: error.digest,
    })
  }, [error])

  return (
    <main className="section">
      <div className="container text-center">
        <h1 className="section-title">Something went wrong</h1>
        <p className="section-subtitle">Please try again. If the problem continues, refresh the page.</p>
        <button type="button" className="btn-contact" onClick={reset}>
          Try again
        </button>
      </div>
    </main>
  )
}
