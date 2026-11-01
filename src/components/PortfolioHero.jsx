'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function PortfolioHero() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <section
      aria-label="Portfolio Hero"
      className="relative w-full h-[78vh] sm:h-[85vh] lg:h-[90vh] bg-[#141312] overflow-hidden select-none flex items-center justify-center"
    >
      {/* 100% Natural Background Photo with Seamless Hardware Accelerated Fade */}
      <div className="absolute inset-0 w-full h-full bg-[#141312] overflow-hidden">
        <img
          src="/portfolio/portfolio-hero.jpg"
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            e.currentTarget.src = "/video/portfolio-hero.jpg"
          }}
          alt="Insync by Ancchal Portfolio Atelier"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className={`w-full h-full object-cover object-center transition-opacity duration-700 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Subtle cinematic gradient overlay for flawless high contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/40 pointer-events-none" />
      </div>

      {/* Centerpiece Hero Title: Matching Brand Text Style with Architectural Golden Lines */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8"
        >
          {/* Left Golden Line */}
          <div className="w-10 sm:w-16 md:w-24 h-[1.5px] bg-[#C5A059] shadow-[0_2px_8px_rgba(0,0,0,0.6)]" />

          {/* Clean Architectural Brand Typography: PORTFOLIO */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.24em] uppercase font-light text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
            PORTFOLIO
          </h1>

          {/* Right Golden Line */}
          <div className="w-10 sm:w-16 md:w-24 h-[1.5px] bg-[#C5A059] shadow-[0_2px_8px_rgba(0,0,0,0.6)]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-[10.5px] sm:text-[11.5px] font-sans uppercase tracking-[0.3em] text-[#C5A059] font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
        >
          SELECTED COMMISSIONS · 2022 — 2026
        </motion.p>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] pointer-events-none">
        <span className="text-[11px] sm:text-[11.5px] font-sans uppercase tracking-[0.25em] font-medium">
          EXPLORE PROJECTS
        </span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#C5A059]" />
      </div>
    </section>
  )
}
