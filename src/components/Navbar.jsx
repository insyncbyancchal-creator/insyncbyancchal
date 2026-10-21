'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Menu, X } from 'lucide-react'

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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ]

  // Keep floating capsule navbar visible with prominent golden rim line and luxury backdrop
  const isVisible = true

  return (
    <>
      {/* Fixed Outer Container - Wide horizontal span */}
      <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-3 sm:px-6 md:px-8 pointer-events-none">
        {/* GPU Accelerated Long & Slim Capsule */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            type: 'tween',
            ease: [0.16, 1, 0.3, 1],
            duration: 0.4,
          }}
          className="w-full max-w-[1520px] rounded-full bg-[#FBF9F6]/96 backdrop-blur-2xl border-[1.5px] border-[#C5A059] shadow-[0_8px_30px_rgba(0,0,0,0.06),0_2px_14px_rgba(197,160,89,0.25)] px-5 sm:px-8 py-2 sm:py-2.5 flex items-center justify-between pointer-events-auto will-change-transform relative"
        >
          {/* Top Prominent Golden Line Accent */}
          <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent pointer-events-none" />
          {/* Bottom Golden Hairline Accent */}
          <div className="absolute bottom-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent pointer-events-none" />

          {/* Left Brand Logo (Sleek Slim Profile) */}
          <Link href="/" className="group flex items-center shrink-0 py-0.5" aria-label="iNSYNC by Ancchal">
            <div className="relative h-7 sm:h-8 md:h-8.5 flex items-center">
              <img
                src="/logo-gold.png?v=gold_v2"
                alt="iNSYNC by Ancchal"
                className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 sm:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  suppressHydrationWarning
                  className="relative px-4 sm:px-5 py-1.5 text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium transition-colors z-10 block"
                >
                  <span
                    suppressHydrationWarning
                    className={isActive ? 'text-[#C5A059] font-semibold' : 'text-[#1A1A1A]/75 hover:text-[#C5A059]'}
                  >
                    {link.name}
                  </span>

                  {/* Active Rounded Capsule Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activePillSmooth"
                      className="absolute inset-0 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/50 shadow-[inset_0_0_8px_rgba(197,160,89,0.15)] z-[-1]"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right Action Section */}
          <div className="hidden sm:flex items-center space-x-2.5 shrink-0">
            <div className="h-5 w-[1px] bg-[#C5A059]/30 mr-1" />

            <a
              href="https://www.instagram.com/insync_interiors/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-[#1A1A1A]/70 hover:text-[#C5A059] hover:bg-[#C5A059]/10 transition-all"
              title="Instagram Profile"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[#C5A059]" />
            </a>

            <a
              href="mailto:contact@insyncinteriors.com"
              className="p-2 rounded-full text-[#1A1A1A]/70 hover:text-[#C5A059] hover:bg-[#C5A059]/10 transition-all"
              title="Email Insync Interiors"
            >
              <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
            </a>

            <Link
              href="/contact"
              className="ml-1.5 px-4 py-1.5 rounded-full border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-white text-[11.5px] uppercase tracking-[0.2em] font-semibold transition-all"
            >
              INQUIRE
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#1A1A1A] hover:text-[#C5A059] p-2 transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg rounded-3xl bg-[#FBF9F6]/98 backdrop-blur-2xl text-[#1A1A1A] p-8 border-[1.5px] border-[#D4AF67]/70 shadow-2xl space-y-6 md:hidden"
          >
            {/* Mobile Drawer Brand Logo Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#C5A059]/20">
              <Link href="/" onClick={() => setMobileOpen(false)}>
                <img
                  src="/logo-gold.png?v=gold_v2"
                  alt="iNSYNC by Ancchal"
                  className="h-8 w-auto object-contain"
                />
              </Link>
            </div>

            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    suppressHydrationWarning
                    onClick={() => setMobileOpen(false)}
                    className={`font-serif text-2xl px-4 py-2.5 rounded-xl transition-all ${
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

            <div className="flex items-center space-x-6 pt-6 border-t border-[#C5A059]/20 justify-between">
              <a
                href="https://www.instagram.com/insync_interiors/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#C5A059]"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram</span>
              </a>

              <a
                href="mailto:contact@insyncinteriors.com"
                className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#1A1A1A]/80 hover:text-[#C5A059]"
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
