'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const PROJECTS = [
  {
    id: 1,
    title: 'The Solstice Penthouse',
    location: 'GURUGRAM',
    category: 'Penthouse Residence',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=85&w=1600&auto=format&fit=crop',
    slug: 'the-solstice-penthouse',
  },
  {
    id: 2,
    title: 'Skylight Residence',
    location: 'LUDHIANA',
    category: 'Bespoke Villa',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=1600&auto=format&fit=crop',
    slug: 'skylight-residence',
  },
  {
    id: 3,
    title: 'Oasis Wellness Sanctuary',
    location: 'CHANDIGARH',
    category: 'Wellness Estate',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=85&w=1600&auto=format&fit=crop',
    slug: 'oasis-wellness-sanctuary',
  },
  {
    id: 4,
    title: 'Celica Home Duplex',
    location: 'KOLKATA',
    category: 'Residential Duplex',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=85&w=1600&auto=format&fit=crop',
    slug: 'celica-home',
  },
  {
    id: 5,
    title: 'Villa Riviera Estates',
    location: 'GOA',
    category: 'Coastal Residence',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=85&w=1600&auto=format&fit=crop',
    slug: 'villa-riviera-estates',
  },
  {
    id: 6,
    title: 'Classical Mahogany Study',
    location: 'SARABHA NAGAR, LUDHIANA',
    category: 'Private Atelier',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=85&w=1600&auto=format&fit=crop',
    slug: 'skylight-residence',
  },
  {
    id: 7,
    title: 'Contemporary Velvet Lounge',
    location: 'GOLF COURSE ROAD, GURUGRAM',
    category: 'Luxury Suite',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=85&w=1600&auto=format&fit=crop',
    slug: 'the-solstice-penthouse',
  },
]

export default function ProjectShowcaseSlider() {
  const [activeIndex, setActiveIndex] = useState(1)
  const [viewportWidth, setViewportWidth] = useState(1280)

  // Fluid responsive measurements
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % PROJECTS.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const isDesktop = viewportWidth >= 1024
  const isTablet = viewportWidth >= 640 && viewportWidth < 1024
  const isMobile = viewportWidth < 640

  // Dynamic fluid spacing calculated from screen width so cards gracefully fan out and cover the left & right edges
  const halfW = Math.max(500, viewportWidth / 2)
  const spacing3 = isDesktop ? Math.round(halfW - 90) : isTablet ? 460 : 320
  const spacing2 = isDesktop ? Math.round(spacing3 * 0.67) : isTablet ? 320 : 220
  const spacing1 = isDesktop ? Math.round(spacing3 * 0.35) : isTablet ? 175 : 130

  return (
    <section
      id="project-showcase"
      className="relative w-full min-h-[90vh] lg:h-[calc(100vh-2rem)] lg:max-h-[900px] lg:min-h-[660px] py-6 sm:py-8 lg:py-10 bg-[#FBF9F6] text-[#1A1A1A] flex flex-col justify-between overflow-hidden select-none"
    >
      {/* 1. Top Section Header: Exactly matching Reference (Top-Left aligned) */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-2 shrink-0">
        <div className="text-left">
          <span className="text-[10.5px] sm:text-[11px] font-sans uppercase tracking-[0.28em] text-[#C5A059] font-semibold mb-1 block">
            PORTFOLIO SHOWCASE
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1A1A1A] font-light tracking-tight">
            Signature Projects
          </h3>
        </div>
      </div>

      {/* 2. Coverflow Carousel Stage: Expanded to cover full width from edge to edge with bigger, majestic cards */}
      <div className="relative w-full my-auto flex items-center justify-center h-[390px] sm:h-[430px] lg:h-[470px] xl:h-[495px] overflow-hidden">
        {PROJECTS.map((project, index) => {
          // Circular offset calculation relative to activeIndex
          let offset = index - activeIndex
          if (offset < -Math.floor(PROJECTS.length / 2)) offset += PROJECTS.length
          if (offset > Math.floor(PROJECTS.length / 2)) offset -= PROJECTS.length

          const isCenter = offset === 0

          let xPos = 0
          let width = 330
          let height = 445
          let opacity = 0
          let zIndex = 0
          let darkOverlay = 0.5

          if (offset === 0) {
            // Center active card: Tallest, crisp, bold & prominent in foreground
            xPos = 0
            width = isDesktop ? (viewportWidth >= 1440 ? 340 : 325) : isTablet ? 265 : 215
            height = isDesktop ? (viewportWidth >= 1440 ? 465 : 445) : isTablet ? 365 : 305
            opacity = 1
            zIndex = 35
            darkOverlay = 0
          } else if (offset === -1) {
            // Immediate Left: overlapping under center card, vertically centered
            xPos = -spacing1
            width = isDesktop ? 280 : isTablet ? 220 : 170
            height = isDesktop ? 390 : isTablet ? 315 : 245
            opacity = isMobile ? 0.9 : 0.95
            zIndex = 25
            darkOverlay = 0.35
          } else if (offset === 1) {
            // Immediate Right: overlapping under center card, vertically centered
            xPos = spacing1
            width = isDesktop ? 280 : isTablet ? 220 : 170
            height = isDesktop ? 390 : isTablet ? 315 : 245
            opacity = isMobile ? 0.9 : 0.95
            zIndex = 25
            darkOverlay = 0.35
          } else if (offset === -2) {
            // Mid Left: overlapping under immediate left card
            xPos = -spacing2
            width = isDesktop ? 240 : isTablet ? 180 : 130
            height = isDesktop ? 340 : isTablet ? 265 : 195
            opacity = isMobile ? 0 : 0.85
            zIndex = 15
            darkOverlay = 0.55
          } else if (offset === 2) {
            // Mid Right: overlapping under immediate right card
            xPos = spacing2
            width = isDesktop ? 240 : isTablet ? 180 : 130
            height = isDesktop ? 340 : isTablet ? 265 : 195
            opacity = isMobile ? 0 : 0.85
            zIndex = 15
            darkOverlay = 0.55
          } else if (offset === -3) {
            // Far Left edge card: covers all the way to screen boundary
            xPos = -spacing3
            width = isDesktop ? 210 : isTablet ? 150 : 100
            height = isDesktop ? 295 : isTablet ? 220 : 155
            opacity = isDesktop ? 0.75 : 0
            zIndex = 5
            darkOverlay = 0.68
          } else if (offset === 3) {
            // Far Right edge card: covers all the way to screen boundary
            xPos = spacing3
            width = isDesktop ? 210 : isTablet ? 150 : 100
            height = isDesktop ? 295 : isTablet ? 220 : 155
            opacity = isDesktop ? 0.75 : 0
            zIndex = 5
            darkOverlay = 0.68
          } else {
            xPos = offset < 0 ? -spacing3 - 200 : spacing3 + 200
            width = 170
            height = 240
            opacity = 0
            zIndex = 0
            darkOverlay = 0.9
          }

          return (
            <motion.div
              key={project.id}
              onClick={() => setActiveIndex(index)}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
              }}
              animate={{
                x: `calc(-50% + ${xPos}px)`,
                y: '-50%',
                width,
                height,
                opacity,
                zIndex,
              }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1], // Apple-style smooth coverflow ease
              }}
              className={`rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer ${
                isCenter
                  ? 'border-[1.5px] border-[#C5A059] shadow-[0_22px_50px_-10px_rgba(27,26,23,0.25),0_0_22px_rgba(197,160,89,0.22)]'
                  : 'border border-black/10 hover:border-[#C5A059]/40 shadow-sm'
              }`}
            >
              {/* Architectural Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover pointer-events-none transition-transform duration-700 hover:scale-105"
              />

              {/* Receding Dark Overlay for Depth of Field (Dimmed when not center) */}
              <div
                className="absolute inset-0 bg-black transition-opacity duration-500 pointer-events-none"
                style={{ opacity: darkOverlay }}
              />

              {/* Center Active Project Details Overlay */}
              <AnimatePresence>
                {isCenter && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.35 }}
                    className="absolute bottom-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-t from-black/85 via-black/45 to-transparent flex items-end justify-between"
                  >
                    <div className="space-y-0.5">
                      <span className="text-[11.5px] sm:text-[12px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold block">
                        {project.category} • {project.location}
                      </span>
                      <h4 className="font-serif text-sm sm:text-base md:text-lg text-white font-normal tracking-wide">
                        {project.title}
                      </h4>
                    </div>

                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="w-8 sm:w-9 h-8 sm:h-9 rounded-none bg-[#C5A059] text-[#1A1A1A] flex items-center justify-center hover:bg-white transition-colors shadow-md shrink-0 ml-3 group"
                      aria-label={`Explore ${project.title}`}
                    >
                      <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 group-hover:scale-110 transition-transform" />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* 3. Bottom Control Bar: Connecting line spans across matching expanded width */}
      <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-8 pb-2 shrink-0">
        <div className="relative w-full flex items-center justify-between">
          {/* Continuous horizontal hairline running across */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#C5A059]/35 pointer-events-none" />

          {/* Left Arrow Button [ < ] */}
          <button
            onClick={prevSlide}
            aria-label="Previous Project"
            className="relative z-10 w-9 sm:w-10 h-9 sm:h-10 bg-[#FBF9F6] border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer shadow-xs active:scale-95 group rounded-none"
          >
            <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Center Link Button [ SEE MORE PROJECTS ] */}
          <Link
            href="/portfolio"
            className="relative z-10 px-6 sm:px-8 py-2 sm:py-2.5 bg-[#FBF9F6] border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-all duration-300 text-[11.5px] sm:text-[12px] uppercase tracking-[0.22em] font-semibold flex items-center gap-2 shadow-xs group rounded-none"
          >
            <span className="group-hover:tracking-[0.25em] transition-all duration-300">SEE MORE PROJECTS</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          {/* Right Arrow Button [ > ] */}
          <button
            onClick={nextSlide}
            aria-label="Next Project"
            className="relative z-10 w-9 sm:w-10 h-9 sm:h-10 bg-[#FBF9F6] border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer shadow-xs active:scale-95 group rounded-none"
          >
            <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}
