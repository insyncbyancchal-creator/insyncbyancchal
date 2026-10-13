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
          <div className="flex flex-col">
            <span className="font-serif text-3xl tracking-[0.24em] text-[#1A1A1A] font-light leading-none">
              INSYNC
            </span>
            <span className="text-[12px] tracking-[0.28em] uppercase text-[#C5A059] font-semibold mt-1">
              BY ANCHAL
            </span>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-8 text-[13px] tracking-[0.18em] uppercase text-[#555048] font-medium">
            <Link href="/" className="hover:text-[#1A1A1A] transition-colors">Home</Link>
            <Link href="/portfolio" className="hover:text-[#1A1A1A] transition-colors">Portfolio</Link>
            <Link href="/about" className="hover:text-[#1A1A1A] transition-colors">About</Link>
            <Link href="/services" className="hover:text-[#1A1A1A] transition-colors">Services</Link>
            <Link href="/contact" className="hover:text-[#1A1A1A] transition-colors">Contact</Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A1A1A] hover:text-[#C5A059] transition-colors"
              title="Instagram"
            >
              <InstagramIcon className="w-4 h-4 text-[#C5A059]" />
            </a>

            <a
              href="mailto:contact@insyncinteriors.com"
              className="text-[#1A1A1A] hover:text-[#C5A059] transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4 text-[#C5A059]" />
            </a>
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
