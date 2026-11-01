'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Menu, X } from 'lucide-react'
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
  )
}

export default function Navbar({ siteSettings: initialSettings }) {
  const [siteSettings, setSiteSettings] = useState(initialSettings || null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

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

  useEffect(() => {
    let ticking = false
    let lastScrolled = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY || window.pageYOffset || 0
          const shouldScroll = y > 30
          if (shouldScroll !== lastScrolled) {
            lastScrolled = shouldScroll
            setScrolled(shouldScroll)
          }
          ticking = false
        })
        ticking = true
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ]

  // Hero section routes where navbar is hidden at the top and slides in upon scrolling down
  const currentPath = (pathname || '').replace(/\/$/, '') || '/'
  const hasHeroSection = ['/', '/about', '/portfolio', '/services', '/contact'].includes(currentPath)
  const isVisible = (!hasHeroSection || scrolled) || mobileOpen

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

  return (
    <>
      {/* Full-bleed Fixed Navbar Header - Flush to top with zero side or upper gaps */}
      <header
        className={`fixed top-0 inset-x-0 z-[60] w-full ${
          isVisible ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Full Width Edge-to-Edge Architectural Bar */}
        <motion.div
          initial={false}
          animate={{
            y: isVisible ? 0 : -100,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{
            type: 'tween',
            ease: [0.16, 1, 0.3, 1],
            duration: 0.35,
          }}
          className="w-full rounded-none bg-[#FBF9F6]/96 backdrop-blur-2xl border-b border-[#C5A059]/40 shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_8px_rgba(197,160,89,0.15)] px-6 sm:px-10 lg:px-14 py-3 sm:py-3.5 grid grid-cols-[auto_1fr] md:grid-cols-[1fr_auto_1fr] items-center will-change-transform relative"
        >
          {/* Bottom Prominent Golden Hairline Accent running 100% full width */}
          <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent pointer-events-none" />

          {/* Left: Brand Logo (Sleek Slim Profile) */}
          <div className="flex items-center justify-start">
            <Link href="/" className="group flex items-center shrink-0 py-0.5" aria-label="Insync by Ancchal">
              <div className="relative h-7 sm:h-8 md:h-8.5 flex items-center">
                <BrandLogo className="h-full w-auto transition-transform duration-300 group-hover:scale-105" />
              </div>
            </Link>
          </div>

          {/* Center: Desktop Nav Links (Symmetrically Centered) */}
          <nav className="hidden md:flex items-center justify-center space-x-1 sm:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  suppressHydrationWarning
                  className="relative px-4 sm:px-5 py-2 text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium transition-colors z-10 block"
                >
                  <span
                    suppressHydrationWarning
                    className={isActive ? 'text-[#C5A059] font-semibold' : 'text-[#1A1A1A]/75 hover:text-[#C5A059]'}
                  >
                    {link.name}
                  </span>

                  {/* Active Rectangular Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activePillSmooth"
                      className="absolute inset-0 rounded-none bg-[#C5A059]/10 border border-[#C5A059]/50 shadow-[inset_0_0_8px_rgba(197,160,89,0.15)] z-[-1]"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right: Actions, WhatsApp & Inquire CTA */}
          <div className="flex items-center justify-end">
            <div className="hidden sm:flex items-center space-x-2.5 sm:space-x-3 shrink-0">
              {/* Instagram */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center text-[#1A1A1A]/70 hover:text-[#C5A059] transition-all group"
                title="Instagram Profile"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-4 h-4 text-[#C5A059] group-hover:scale-110 transition-transform" />
              </a>

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center text-[#1A1A1A]/70 hover:text-[#25D366] transition-all group"
                title="Chat on WhatsApp"
                aria-label="Chat with Insync by Ancchal on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#C5A059] group-hover:text-[#25D366] group-hover:scale-110 transition-all" />
              </a>

              {/* Email */}
              <a
                href={emailUrl}
                className="w-8 h-8 flex items-center justify-center text-[#1A1A1A]/70 hover:text-[#C5A059] transition-all group"
                title="Email Insync by Ancchal"
                aria-label="Email Insync by Ancchal"
              >
                <Mail className="w-4 h-4 text-[#C5A059] group-hover:scale-110 transition-transform" />
              </a>

              {/* INQUIRE CTA */}
              <Link
                href="/contact"
                className="ml-2 px-5 py-2 rounded-none border-[1.5px] border-[#C5A059] text-[#1A1A1A] hover:bg-[#C5A059] hover:text-white text-[11px] sm:text-[11.5px] uppercase tracking-[0.24em] font-semibold transition-all duration-300 shadow-xs active:scale-98 inline-block"
              >
                {inquireLabel}
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-[#1A1A1A] hover:text-[#C5A059] p-2.5 -mr-1 transition-colors rounded-none touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer active:scale-95"
              aria-label="Toggle Navigation"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Drawer Overlay - Flush under header */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[54px] sm:top-[58px] inset-x-0 z-[59] w-full max-h-[calc(100dvh-54px)] overflow-y-auto rounded-none bg-[#FBF9F6]/98 backdrop-blur-2xl text-[#1A1A1A] p-6 sm:p-8 border-b-[1.5px] border-[#C5A059] shadow-2xl space-y-5 md:hidden"
          >
            {/* Mobile Drawer Brand Logo Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-[#C5A059]/20">
              <Link href="/" onClick={() => setMobileOpen(false)} aria-label="Insync by Ancchal" className="touch-manipulation">
                <BrandLogo className="h-7 sm:h-8 w-auto" />
              </Link>
            </div>

            <div className="flex flex-col space-y-2.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    suppressHydrationWarning
                    onClick={() => setMobileOpen(false)}
                    className={`font-serif text-2xl px-4 py-3 rounded-none transition-all flex items-center min-h-[48px] touch-manipulation cursor-pointer active:scale-[0.98] ${
                      isActive
                        ? 'text-[#C5A059] bg-[#C5A059]/10 border border-[#C5A059]/40'
                        : 'text-[#1A1A1A] hover:text-[#C5A059]'
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              })}
            </div>

            {/* Mobile Primary Inquire Button */}
            <div className="pt-2">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-3.5 px-6 border-[1.5px] border-[#C5A059] bg-[#C5A059] text-white hover:bg-[#9A7B39] text-xs uppercase tracking-[0.24em] font-semibold transition-all duration-200 active:scale-[0.98] block touch-manipulation cursor-pointer shadow-sm"
              >
                {inquireLabel}
              </Link>
            </div>

            <div className="flex items-center space-x-3 pt-5 border-t border-[#C5A059]/20 justify-between">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 py-2 px-1 text-xs uppercase tracking-widest text-[#C5A059] touch-manipulation"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 py-2 px-1 text-xs uppercase tracking-widest text-[#25D366] touch-manipulation"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>

              <a
                href={emailUrl}
                className="flex items-center space-x-1.5 py-2 px-1 text-xs uppercase tracking-widest text-[#1A1A1A]/80 hover:text-[#C5A059] touch-manipulation"
              >
                <Mail className="w-4 h-4 text-[#C5A059]" />
                <span>Email</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
