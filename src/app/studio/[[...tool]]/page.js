'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0C]">
      <NextStudio config={config} />
    </div>
  )
}
