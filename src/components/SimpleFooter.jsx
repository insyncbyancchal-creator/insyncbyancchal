'use client'

import Link from 'next/link'
import { Mail } from 'lucide-react'

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

export default function SimpleFooter() {
  return (
    <footer className="bg-[#FBF9F6] text-[#1A1A1A] py-16 px-6 md:px-12 border-t border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-[#1A1A1A]/10">
          {/* Logo */}
          <Link href="/" className="group inline-flex items-center shrink-0" aria-label="iNSYNC by Ancchal">
            <img
              src="/logo-gold.png?v=gold_v2"
              alt="iNSYNC by Ancchal"
              className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Quick Nav Links (matching Navbar sequence) */}
          <div className="flex flex-wrap items-center gap-8 text-[13px] tracking-[0.18em] uppercase text-[#555048] font-medium">
            <Link href="/" className="hover:text-[#1A1A1A] transition-colors">Home</Link>
            <Link href="/about" className="hover:text-[#1A1A1A] transition-colors">About</Link>
            <Link href="/portfolio" className="hover:text-[#1A1A1A] transition-colors">Portfolio</Link>
            <Link href="/services" className="hover:text-[#1A1A1A] transition-colors">Services</Link>
            <Link href="/contact" className="hover:text-[#1A1A1A] transition-colors">Contact</Link>
          </div>

          {/* Social Links & Inquire Button matching Navbar */}
          <div className="flex items-center space-x-2.5 sm:space-x-3.5 shrink-0">
            <a
              href="https://www.instagram.com/insync_interiors/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-[#1A1A1A]/70 hover:text-[#C5A059] hover:bg-[#C5A059]/10 transition-all"
              title="Instagram Profile"
            >
              <InstagramIcon className="w-4 h-4 text-[#C5A059]" />
            </a>

            <a
              href="mailto:contact@insyncinteriors.com"
              className="p-2 rounded-full text-[#1A1A1A]/70 hover:text-[#C5A059] hover:bg-[#C5A059]/10 transition-all"
              title="Email Insync Interiors"
            >
              <Mail className="w-4 h-4 text-[#C5A059]" />
            </a>

            <Link
              href="/contact"
              className="ml-1.5 px-4 py-1.5 rounded-full border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-white text-[11.5px] uppercase tracking-[0.2em] font-semibold transition-all inline-block"
            >
              INQUIRE
            </Link>
          </div>
        </div>

        {/* Sub Footer Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C857B] space-y-4 sm:space-y-0">
          <div>© {new Date().getFullYear()} INSYNC INTERIORS. All Rights Reserved.</div>
          <div>Ludhiana Atelier • SCF - 1, Third Floor, Sarabha Nagar</div>
        </div>
      </div>
    </footer>
  )
}
