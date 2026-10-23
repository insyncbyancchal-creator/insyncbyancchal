'use client'

import React, { useEffect, useRef, useState } from 'react'
import { MapPin, Clock, Mail, Send, CheckCircle2 } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

// Statement text for horizontal split-text scroll
const SPLIT_TEXT = "INSYNC BY ANCCHAL • WANT TO CONTACT WITH US?"

export default function FooterSection() {
  const wrapperRef = useRef(null)
  const textRef = useRef(null)
  const formRef = useRef(null)

  const [sent, setSent] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })

  useEffect(() => {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    if (!wrapperRef.current || !textRef.current) return

    const wrapper = wrapperRef.current
    const text = textRef.current

    // 1. Horizontal Scroll Tween
    const scrollTween = gsap.to(text, {
      xPercent: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        start: 'top top',
        end: '+=2500px',
        scrub: 1,
        anticipatePin: 1,
      },
    })

    // 2. Container Animation Character Split Scatter Effect
    const chars = text.querySelectorAll('.split-char')
    const ctx = gsap.context(() => {
      chars.forEach((char) => {
        // Random offset and rotation matching user GSAP spec
        const randomY = Math.floor(Math.random() * 400 - 200)
        const randomRot = Math.floor(Math.random() * 40 - 20)

        gsap.from(char, {
          yPercent: randomY,
          rotation: randomRot,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: char,
            containerAnimation: scrollTween,
            start: 'left 100%',
            end: 'left 30%',
            scrub: 1,
          },
        })
      })
    })

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  // Split string into individual character spans
  const characters = SPLIT_TEXT.split('')

  return (
    <div id="contact" className="relative w-full bg-[#FBF9F6] text-[#1A1A1A]">
      {/* 1. GSAP SplitText Container Animation Pinned Section */}
      <section
        ref={wrapperRef}
        className="Horizontal relative overflow-hidden h-screen w-full flex items-center bg-[#FBF9F6] border-b border-[#C5A059]/20"
      >
        <div className="container w-full max-w-none px-4">
          <h3
            ref={textRef}
            className="Horizontal__text heading-xl flex w-max whitespace-nowrap gap-[4vw] pl-[100vw] font-serif tracking-tight select-none"
          >
            {characters.map((char, index) => {
              const isGold = index >= 18
              return (
                <span
                  key={index}
                  className={`split-char inline-block text-[clamp(2.5rem,8vw,10rem)] font-light leading-none transition-colors ${
                    isGold ? 'text-[#C5A059] italic font-normal' : 'text-[#1A1A1A]'
                  }`}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              )
            })}
          </h3>
        </div>
      </section>

      {/* 2. Main Studio Enquiry Form Card Section (Clean layout without wavy line) */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-24">
        {/* Header Badge */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-none border border-[#C5A059]/40 bg-[#F3F0EA] shadow-sm mb-4">
            <span className="w-2 h-2 rounded-none bg-[#C5A059] animate-pulse" />
            <span className="text-[12px] uppercase tracking-[0.22em] text-[#C5A059] font-semibold">
              INSYNC ATELIER
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#1A1A1A]">
            Initiate a <span className="montecarlo-regular italic text-[#C5A059]">Commission</span>
          </h2>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="font-sans relative z-20 mx-auto w-full rounded-none bg-[#1A1A1A] p-8 sm:p-14 text-[#FBF9F6] shadow-2xl border border-[#C5A059]/40"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Studio Address & Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="font-serif text-3xl md:text-4xl tracking-[0.24em] text-[#FBF9F6] font-light block leading-none">
                  INSYNC
                </span>
                <span className="text-[12px] tracking-[0.28em] uppercase text-[#C5A059] font-semibold block">
                  BY ANCCHAL
                </span>
                <p className="text-xs md:text-sm text-[#FBF9F6]/70 leading-relaxed font-light max-w-md pt-2">
                  We welcome private inquiries for high-end residential, penthouse, and commercial architectural interior commissions.
                </p>
              </div>

              {/* Address & Office Hours Card */}
              <div className="space-y-4 bg-white/05 p-6 rounded-none border border-white/10 text-xs text-[#FBF9F6]">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#C5A059] font-semibold uppercase tracking-wider mb-1">Studio Address</strong>
                    <span>SCF - 1, Third Floor, I Block Market, Sarabha Nagar (Opp. Nav Durga Mata Mandir), Ludhiana – 141001</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-3 border-t border-white/10">
                  <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#C5A059] font-semibold uppercase tracking-wider mb-1">Office Hours</strong>
                    <span>Monday – Saturday: 10:00 AM – 6:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Clickable Social, WhatsApp & Email Links */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <a
                  href="https://www.instagram.com/insync_interiors/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#FBF9F6] hover:text-[#C5A059] transition-colors"
                >
                  <InstagramIcon className="w-4 h-4 text-[#C5A059]" />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://wa.me/919888800000?text=Hello%20Insync%20by%20Ancchal%2C%20I%20would%20like%20to%20enquire%20about%20a%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#FBF9F6] hover:text-[#25D366] transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#C5A059] hover:text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="mailto:contact@insyncinteriors.com"
                  className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#FBF9F6] hover:text-[#C5A059] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#C5A059]" />
                  <span>contact@insyncinteriors.com</span>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Form Inputs */}
            <div className="lg:col-span-7 bg-white/05 p-6 sm:p-10 rounded-none border border-white/10 space-y-6">
              <h3 className="font-serif text-3xl text-[#FBF9F6] font-light">
                Send an <span className="montecarlo-regular italic font-normal text-[#C5A059]">Enquiry</span>
              </h3>

              {sent ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-none bg-[#C5A059]/10 border border-[#C5A059] text-[#C5A059] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl text-[#FBF9F6]">Thank You for Reaching Out</h4>
                  <p className="text-xs text-[#FBF9F6]/70 max-w-sm mx-auto">
                    Your enquiry has been successfully transmitted. Our team will contact you shortly.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] uppercase tracking-wider text-[#C5A059] mb-1.5 font-semibold">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ancchal Sharma"
                        className="w-full rounded-none border border-white/20 bg-white/05 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-[#C5A059] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] uppercase tracking-wider text-[#C5A059] mb-1.5 font-semibold">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.com"
                        className="w-full rounded-none border border-white/20 bg-white/05 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-[#C5A059] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] uppercase tracking-wider text-[#C5A059] mb-1.5 font-semibold">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-none border border-white/20 bg-white/05 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-[#C5A059] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] uppercase tracking-wider text-[#C5A059] mb-1.5 font-semibold">Project Scope & Details</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your property location, residence size, and desired timeline..."
                      className="w-full rounded-none border border-white/20 bg-white/05 px-4 py-3 text-xs text-white placeholder-white/40 outline-none focus:border-[#C5A059] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-none bg-[#C5A059] text-[#1A1A1A] font-bold text-xs tracking-widest uppercase flex items-center justify-center space-x-2 hover:bg-white transition-all duration-300 shadow-lg cursor-pointer"
                  >
                    <span>{sent ? "Message sent ✓" : "Submit Studio Enquiry"}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sub Footer Bar */}
          <div className="pt-8 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FBF9F6]/60 space-y-4 sm:space-y-0">
            <div>© {new Date().getFullYear()} INSYNC BY ANCCHAL. All Rights Reserved.</div>
            <div className="flex items-center space-x-6">
              <span className="hover:text-white">Ludhiana Atelier</span>
              <span>•</span>
              <span className="hover:text-white">Privacy & Terms</span>
            </div>
          </div>
        </form>
      </section>
    </div>
  )
}
