import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    logger.warn('revalidate: invalid secret')
    return NextResponse.json({ message: 'Invalid or missing secret' }, { status: 401 })
  }

  try {
    revalidatePath('/')
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    logger.error('revalidate: revalidatePath failed', {
      error: err instanceof Error ? err.message : String(err),
    })
    return NextResponse.json({ message: 'Revalidation failed.' }, { status: 500 })
  }
}
