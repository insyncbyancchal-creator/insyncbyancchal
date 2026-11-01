'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import BrandLogo from '@/components/BrandLogo'
import WhatsAppIcon from '@/components/WhatsAppIcon'

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

import { useState, useEffect } from 'react'

export default function SimpleFooter({ siteSettings: initialSettings }) {
  const [siteSettings, setSiteSettings] = useState(initialSettings || null)

  useEffect(() => {
    if (initialSettings) {
      setSiteSettings(initialSettings)
      return
    }
    let isCancelled = false
    fetch('/api/site-settings')
      .then((res) => res.json())
      .then((data) => {
        if (!isCancelled && data?.ok && data?.settings) {
          setSiteSettings(data.settings)
        }
      })
      .catch(() => {})
    return () => {
      isCancelled = true
    }
  }, [initialSettings])

  // Computed dynamic URLs from Sanity Site Settings (flexible format parser)
  const rawWa = (siteSettings?.whatsappNumber || '919877417531').trim()
  const whatsappUrl = rawWa.startsWith('http')
    ? rawWa
    : `https://wa.me/${rawWa.replace(/\D/g, '') || '919877417531'}?text=Hello%20Insync%20by%20Ancchal%2C%20I%20would%20like%20to%20enquire%20about%20a%20project`

  const rawEmail = (siteSettings?.contactEmail || 'hello@insyncinteriors.com').trim()
  const emailUrl = rawEmail.startsWith('mailto:') ? rawEmail : `mailto:${rawEmail}`

  const rawInsta = (siteSettings?.instagramUrl || 'https://www.instagram.com/insync_byancchal/').trim()
  const instagramUrl = rawInsta.startsWith('http')
    ? rawInsta
    : `https://www.instagram.com/${rawInsta.replace(/^@/, '')}/`

  const inquireLabel = siteSettings?.enquireButtonText || 'INQUIRE'
  const studioAddress = siteSettings?.studioAddress || 'INSYNC INTERIORS • SCF - 1, Third Floor, I Block Market, Sarabha Nagar (Opp. Nav Durga Mata Mandir), Ludhiana 141001'

  return (
    <footer className="bg-[#FBF9F6] text-[#1A1A1A] py-8 sm:py-10 px-6 md:px-12 border-t border-[#1A1A1A]/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto space-y-6 sm:space-y-7"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="group inline-flex items-center shrink-0" aria-label="Insync by Ancchal">
            <BrandLogo className="h-8 sm:h-9 w-auto transition-transform duration-300 group-hover:scale-105" />
          </Link>

          {/* Quick Nav Links (matching Navbar sequence) */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-[12px] sm:text-[13px] tracking-[0.18em] uppercase text-[#555048] font-medium">
            <Link href="/" className="hover:text-[#1A1A1A] transition-colors py-1.5 touch-manipulation">Home</Link>
            <Link href="/about" className="hover:text-[#1A1A1A] transition-colors py-1.5 touch-manipulation">About</Link>
            <Link href="/portfolio" className="hover:text-[#1A1A1A] transition-colors py-1.5 touch-manipulation">Portfolio</Link>
            <Link href="/services" className="hover:text-[#1A1A1A] transition-colors py-1.5 touch-manipulation">Services</Link>
            <Link href="/contact" className="hover:text-[#1A1A1A] transition-colors py-1.5 touch-manipulation">Contact</Link>
          </div>

          {/* Social Links & Inquire Button matching Navbar */}
          <div className="flex items-center space-x-2.5 sm:space-x-3.5 shrink-0">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center text-[#1A1A1A]/70 hover:text-[#C5A059] transition-all group touch-manipulation active:scale-95"
              title="Instagram Profile"
              aria-label="Instagram Profile"
            >
              <InstagramIcon className="w-4 h-4 text-[#C5A059] group-hover:scale-110 transition-transform" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center text-[#1A1A1A]/70 hover:text-[#25D366] transition-all group touch-manipulation active:scale-95"
              title="Chat on WhatsApp"
              aria-label="Chat with Insync by Ancchal on WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#C5A059] group-hover:text-[#25D366] group-hover:scale-110 transition-all" />
            </a>

            <a
              href={emailUrl}
              className="w-9 h-9 flex items-center justify-center text-[#1A1A1A]/70 hover:text-[#C5A059] transition-all group touch-manipulation active:scale-95"
              title="Email Insync by Ancchal"
              aria-label="Email Insync by Ancchal"
            >
              <Mail className="w-4 h-4 text-[#C5A059] group-hover:scale-110 transition-transform" />
            </a>

            <Link
              href="/contact"
              className="ml-2 px-5 py-2.5 rounded-none border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-white text-[11px] sm:text-[11.5px] uppercase tracking-[0.24em] font-semibold transition-all inline-flex items-center justify-center touch-manipulation cursor-pointer active:scale-95"
            >
              {inquireLabel}
            </Link>
          </div>
        </div>

        {/* Sub Footer Bar (Single clean 1px divider line & compact luxury layout) */}
        <div className="pt-5 sm:pt-6 border-t border-[#1A1A1A]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#8C857B] gap-3">
          <div>© {new Date().getFullYear()} INSYNC BY ANCCHAL. All Rights Reserved.</div>

          {/* Right side: Atelier location + credit aligned neatly with 1-line tight spacing */}
          <div className="flex flex-col sm:items-end text-left sm:text-right gap-1 font-sans text-[11px] sm:text-[11.5px]">
            <span>{studioAddress}</span>
            <p>
              Design and Developed by{' '}
              <a
                href="https://dikshabhatt.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#555048] hover:text-[#C5A059] hover:underline underline-offset-4 transition-colors font-medium"
              >
                Diksha Bhatt
              </a>{' '}
              and{' '}
              <a
                href="https://sachinparihar.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#555048] hover:text-[#C5A059] hover:underline underline-offset-4 transition-colors font-medium"
              >
                Sachin Parihar
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
