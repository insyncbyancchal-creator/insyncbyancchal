'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function AboutHero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true)
    }
  }, [])

  return (
    <section
      aria-label="About Hero"
      className="relative w-full h-[78vh] sm:h-[85vh] lg:h-[90vh] bg-white overflow-hidden select-none flex items-center justify-center"
    >
      {/* Pristine White Loading Placeholder - Zero Black Screen */}
      {!isLoaded && (
        <div className="absolute inset-0 z-[5] bg-white flex flex-col items-center justify-center pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse [animation-delay:150ms]" />
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse [animation-delay:300ms]" />
          </div>
        </div>
      )}

      {/* 100% Natural Background Photo with Cinematic Ambient Scale */}
      <div className="absolute inset-0 w-full h-full bg-white overflow-hidden">
        <motion.img
          ref={imgRef}
          src="/about/about-hero.jpg"
          onLoad={() => setIsLoaded(true)}
          alt="Insync by Ancchal Atelier"
          initial={{ scale: 1.08 }}
          animate={{ scale: isLoaded ? 1 : 1.08 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full h-full object-cover object-center bg-white transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Subtle Dark Vignette for Text Legibility */}
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
      </div>

      {/* Centerpiece Hero Title: Architectural Brand Typography with Golden Accents */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-3 sm:gap-4"
        >
          {/* Eyebrow */}
          <span className="text-[11px] sm:text-[12px] font-sans uppercase tracking-[0.32em] text-[#E5BA69] font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            ATELIER PHILOSOPHY
          </span>

          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8">
            {/* Left Golden Line */}
            <div className="w-10 sm:w-16 md:w-24 h-[1.5px] bg-[#C5A059] shadow-[0_2px_8px_rgba(0,0,0,0.6)]" />

            {/* Clean Architectural Brand Typography: ABOUT */}
            <h1
              className={`font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.22em] uppercase font-light transition-colors duration-700 ${
                isLoaded
                  ? 'text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]'
                  : 'text-[#1A1A1A]'
              }`}
            >
              ABOUT
            </h1>

            {/* Right Golden Line */}
            <div className="w-10 sm:w-16 md:w-24 h-[1.5px] bg-[#C5A059] shadow-[0_2px_8px_rgba(0,0,0,0.6)]" />
          </div>

          {/* Subtitle */}
          <p className="text-[12.5px] sm:text-[14px] font-serif tracking-[0.16em] text-white/90 uppercase font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] max-w-md">
            IN PURSUIT OF QUIET HARMONY
          </p>
        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        className={`absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 transition-colors duration-700 pointer-events-none ${
          isLoaded
            ? 'text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]'
            : 'text-[#1A1A1A]/70'
        }`}
      >
        <span className="text-[9px] font-sans uppercase tracking-[0.3em] font-medium">
          SCROLL TO EXPLORE
        </span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#C5A059]" />
      </motion.div>
    </section>
  )
}
