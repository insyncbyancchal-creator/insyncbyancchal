'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'

const PROJECTS = [
  {
    id: 1,
    title: 'Celica Home',
    location: 'KOLKATA',
    description:
      'A serene 5,000 sq. ft. duplex designed for light, calm, and connection with warm curved plaster and organic textiles.',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=85&w=1600&auto=format&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=85&w=1600&auto=format&fit=crop',
    details:
      'Completed in 2024. Featuring custom hand-plastered terracotta wall reliefs, low-profile boucle modular seating, bespoke travertine coffee tables, and floor-to-ceiling recessed architectural glazing.',
  },
  {
    id: 2,
    title: 'Skylight Residence',
    location: 'LUDHIANA',
    description:
      'A bespoke 7,200 sq. ft. architectural villa with double-height travertine walls, fluted oak millwork, and monolithic proportions.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=1600&auto=format&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=85&w=1600&auto=format&fit=crop',
    details:
      'Completed in 2024. Features a grand architectural chandelier suite, custom brass inlays, Italian Statuario marble floors, and motorized bronze window louvers.',
  },
  {
    id: 3,
    title: 'Oasis Wellness Sanctuary',
    location: 'CHANDIGARH',
    description:
      'Harmonizing natural daylight, indoor reflecting pools, and hand-troweled Venetian plaster walls across an open-concept estate.',
    image:
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=85&w=1600&auto=format&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=85&w=1600&auto=format&fit=crop',
    details:
      'Completed in 2024. Centered around a private zen courtyard with monolithic water features, acoustic wood slat ceiling baffles, and integrated circadian rhythm lighting.',
  },
  {
    id: 4,
    title: 'The Solstice Penthouse',
    location: 'GURUGRAM',
    description:
      'A glass-encased sky sanctuary combining minimal lines, brushed champagne brass accents, and raw monolithic travertine architecture.',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=85&w=1600&auto=format&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=85&w=1600&auto=format&fit=crop',
    details:
      'Completed in 2023. Custom suspended bronze fireplace, full-height bookmatched Calacatta marble wall reveals, and 360-degree panoramic skyline views.',
  },
  {
    id: 5,
    title: 'Villa Riviera Estates',
    location: 'GOA',
    description:
      'Double-height grand foyer, curved boucle furniture, and seamless indoor-outdoor tropical terrace transitions.',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=85&w=1600&auto=format&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=85&w=1600&auto=format&fit=crop',
    details:
      'Completed in 2023. Coastal contemporary architecture featuring hand-carved stone pillars, teak louvers, and bespoke linen upholstery.',
  },
]

export default function PortfolioShowcase() {
  const [modalProject, setModalProject] = useState(null)

  return (
    <section id="portfolio-showcase" className="relative w-full bg-[#FFFFFF] text-[#1A1A1A] py-16 sm:py-24 select-none">
      {/* Top Divider (Clean, slightly thicker luxury gold line, no dots) */}
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-12 lg:px-16 mb-12 sm:mb-16">
        <div className="w-full border-t-[1.5px] border-[#D4AF67]/60" />
      </div>

      {/* Down-Scrolling Projects List (Occupying left and right space cleanly) */}
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-12 lg:px-16 space-y-16 sm:space-y-24">
        {PROJECTS.map((project) => (
          <div key={project.id}>
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16"
            >
              {/* Left Column: Anchored Left, Modest Refined Typography */}
              <div className="w-full lg:w-[36%] xl:w-[32%] shrink-0 space-y-4 sm:space-y-5 text-left">
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#C5A059] font-normal tracking-tight">
                    {project.title}
                  </h2>
                  <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#1A1A1A] font-semibold block pt-0.5">
                    {project.location}
                  </span>
                </div>

                <p className="text-[14.5px] sm:text-[15.5px] text-[#3E3A34] font-normal leading-relaxed max-w-md">
                  {project.description}
                </p>

                {/* Explore Project Outline Button */}
                <div className="pt-2">
                  <button
                    onClick={() => setModalProject(project)}
                    className="px-6 py-2.5 border border-[#C5A059] text-[#C5A059] text-[11px] uppercase tracking-[0.22em] font-semibold hover:bg-[#C5A059] hover:text-white transition-all duration-300 inline-block cursor-pointer shadow-xs"
                  >
                    EXPLORE PROJECT
                  </button>
                </div>
              </div>

              {/* Right Column: Anchored Right, Wide Landscape Rectangle with Hover Reveal */}
              <div className="w-full lg:w-[64%] xl:w-[68%] flex justify-end">
                <div
                  onClick={() => setModalProject(project)}
                  className="group relative w-full aspect-[16/10] max-h-[380px] sm:max-h-[440px] rounded-2xl sm:rounded-3xl border border-[#C5A059]/20 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-700 cursor-pointer bg-[#F3F0EA]"
                >
                  {/* Primary Photo */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Secondary Hover Reveal Photo (Crossfades Smoothly on Hover) */}
                  <img
                    src={project.hoverImage}
                    alt={`${project.title} detail`}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gentle Ambient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
                </div>
              </div>
            </motion.div>

            {/* Separator Line Between Projects (1.5px warm gold, no dots) */}
            <div className="w-full mt-16 sm:mt-24">
              <div className="w-full border-t-[1.5px] border-[#D4AF67]/60" />
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Project Lightbox Modal */}
      <AnimatePresence>
        {modalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setModalProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#FFFFFF] rounded-3xl overflow-hidden shadow-2xl border border-[#C5A059]/30"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalProject(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 border border-black/10 flex items-center justify-center text-[#1A1A1A] hover:bg-[#C5A059] hover:text-white transition-colors shadow-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 sm:p-5 bg-[#FBF9F6]">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                  <img
                    src={modalProject.image}
                    alt={modalProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                  <img
                    src={modalProject.hoverImage}
                    alt={`${modalProject.title} detail`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-3 bg-[#FFFFFF]">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#C5A059] font-light">
                    {modalProject.title}
                  </h3>
                  <span className="text-[11px] uppercase tracking-widest text-[#1A1A1A] font-bold">
                    {modalProject.location}
                  </span>
                </div>

                <p className="text-xs text-[#66625C] leading-relaxed font-light">
                  {modalProject.description}
                </p>

                <p className="text-xs text-[#8C857B] leading-relaxed border-t border-[#C5A059]/20 pt-3 font-light">
                  {modalProject.details}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
