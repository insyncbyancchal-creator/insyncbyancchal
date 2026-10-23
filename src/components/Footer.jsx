'use client'

import Link from 'next/link'
import { ArrowUpRight, Instagram, MapPin, Mail, Phone, SlidersHorizontal, Sparkles } from 'lucide-react'

export default function Footer({ siteSettings, onOpenConsultation }) {
  const settings = siteSettings || {
    studioName: 'AURA | Luxury Interior Atelier',
    contactEmail: 'concierge@aura-interior.atelier',
    contactPhone: '+1 (212) 555-0199',
    studioAddress: '740 Park Avenue, 18th Floor, New York, NY 10021',
  }

  return (
    <footer className="relative bg-[#070709] text-[#F7F5F0] border-t border-[#D4AF37]/20 pt-24 pb-12 overflow-hidden">
      {/* Background Gold Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl tracking-[0.25em] text-[#F7F5F0] block">
                A U R A
              </span>
              <span className="text-[10px] tracking-[0.35em] text-[#D4AF37] uppercase block mt-1">
                Luxury Architectural Atelier
              </span>
            </Link>

            <p className="text-sm text-[#9A9A9E] leading-relaxed max-w-sm">
              Sculpting world-class residential estates, sky penthouses, and bespoke hospitality spaces through timeless materiality and architectural precision.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center space-x-2 text-xs tracking-widest uppercase py-3 px-6 rounded-none border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
              >
                <span>Inquire Private Commission</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              Explore Portfolio
            </h4>
            <ul className="space-y-2.5 text-sm text-[#9A9A9E]">
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Residential Villas
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Sky Penthouses
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Commercial Ateliers
                </Link>
              </li>
              <li>
                <Link href="/#before-after" className="hover:text-white transition-colors">
                  Transformation Slider
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services & Deliverables
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              Atelier Contact
            </h4>
            <ul className="space-y-3 text-sm text-[#9A9A9E]">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{settings.studioAddress}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-white transition-colors">
                  {settings.contactEmail}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{settings.contactPhone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <a
                  href="https://wa.me/919888800000?text=Hello%20Insync%20by%20Ancchal%2C%20I%20would%20like%20to%20enquire%20about%20a%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-[#D4AF37] hover:text-[#25D366] transition-colors"
                >
                  <span>Chat on WhatsApp ↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* CMS Admin Link for Client */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              Client Portal
            </h4>
            <p className="text-xs text-[#9A9A9E] leading-relaxed">
              Full editorial access to update, replace or add project images, stories & services.
            </p>
            <Link
              href="/admin"
              target="_blank"
              className="inline-flex items-center space-x-2 text-xs tracking-widest uppercase py-3 px-5 rounded-none glass-panel border border-[#D4AF37]/30 text-white/90 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
              <span>Sanity Studio CMS</span>
            </Link>
          </div>
        </div>

        {/* Sub-Footer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#9A9A9E] space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} AURA Luxury Interior Atelier. All Rights Reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Art Commission
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/admin" target="_blank" className="text-[#D4AF37] hover:underline">
              Sanity CMS Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
