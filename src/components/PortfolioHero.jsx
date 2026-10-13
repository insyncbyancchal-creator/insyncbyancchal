'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function PortfolioHero() {
  return (
    <section
      aria-label="Portfolio Hero"
      className="relative w-full h-[78vh] sm:h-[85vh] lg:h-[90vh] bg-[#1A1A1A] overflow-hidden select-none flex items-center justify-center"
    >
      {/* 100% Natural Background Photo - No dark overlays applied */}
      {/* File location: public/portfolio/portfolio-hero.jpg or public/video/portfolio-hero.jpg */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/portfolio/portfolio-hero.jpg"
          onError={(e) => {
            e.currentTarget.src = "/video/portfolio-hero.jpg"
          }}
          alt="Insync Interiors Portfolio Atelier"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Centerpiece Hero Title: Matching Brand Text Style with Architectural Golden Lines */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8"
        >
          {/* Left Golden Line */}
          <div className="w-10 sm:w-16 md:w-24 h-[1.5px] bg-[#C5A059] shadow-[0_2px_8px_rgba(0,0,0,0.6)]" />

          {/* Clean Architectural Brand Typography: PORTFOLIO */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.24em] text-white uppercase font-light drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
            PORTFOLIO
          </h1>

          {/* Right Golden Line */}
          <div className="w-10 sm:w-16 md:w-24 h-[1.5px] bg-[#C5A059] shadow-[0_2px_8px_rgba(0,0,0,0.6)]" />
        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] pointer-events-none"
      >
        <span className="text-[11px] sm:text-[11.5px] font-sans uppercase tracking-[0.25em] font-medium">
          EXPLORE PROJECTS
        </span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#C5A059]" />
      </motion.div>
    </section>
  )
}
