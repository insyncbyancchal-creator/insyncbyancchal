'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function HomeClosingCta() {
  return (
    <section
      id="home-cta"
      aria-label="Start a Project Consultation"
      className="relative w-full pt-4 sm:pt-6 lg:pt-8 pb-16 sm:pb-20 lg:pb-24 bg-[#FBF9F6] text-[#1A1A1A] overflow-hidden select-none"
    >
      {/* Subtle Ambient Golden Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[340px] bg-[#C5A059]/06 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center relative z-10">
        
        {/* Headline: Let's design something together with Smooth Scroll Entrance */}
        <motion.h2
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-50px' }}
          className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1A1A1A] font-light leading-[1.25] tracking-[0.05em] max-w-2xl mx-auto"
        >
          LET’S DESIGN{' '}
          <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">something</span>{' '}
          TOGETHER.
        </motion.h2>

        {/* Delicate Gold Architectural Hairline */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-4 origin-center"
        />

        {/* Single Centered Button with Golden Luxury Hover Effect */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-40px' }}
          className="mt-8 sm:mt-9 flex justify-center"
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-3.5 px-8 sm:px-11 py-3.5 sm:py-4 bg-[#1A1A1A] text-[#FBF9F6] rounded-none border border-[#C5A059]/40 hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#1A1A1A] hover:-translate-y-0.5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_4px_16px_rgba(27,26,23,0.1)] hover:shadow-[0_12px_36px_rgba(197,160,89,0.38)] active:scale-98 cursor-pointer touch-manipulation min-h-[48px]"
            aria-label="Start a conversation with Insync by Ancchal"
          >
            <span className="text-[10.5px] sm:text-[11px] font-sans uppercase tracking-[0.28em] font-semibold transition-colors duration-300">
              START A CONVERSATION
            </span>
            <ArrowUpRight className="w-4 h-4 text-[#C5A059] group-hover:text-[#1A1A1A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
