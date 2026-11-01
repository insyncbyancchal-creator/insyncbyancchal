'use client'

import { useEffect } from 'react'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.lenis) {
        window.lenis.destroy()
        delete window.lenis
      }
      document.documentElement.classList.remove('lenis', 'lenis-smooth', 'lenis-stopped', 'js-preload')
      document.body.classList.remove('lenis', 'lenis-smooth', 'lenis-stopped')
      document.documentElement.style.overflow = 'auto'
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0C]" data-lenis-prevent="true">
      <NextStudio config={config} />
    </div>
  )
}
