import { NextResponse } from 'next/server'
import { getSiteSettings } from '@/sanity/lib/client'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const settings = await getSiteSettings()
    return NextResponse.json({ ok: true, settings })
  } catch (error) {
    return NextResponse.json({ ok: false, error: error?.message || 'Failed to fetch settings' }, { status: 500 })
  }
}
