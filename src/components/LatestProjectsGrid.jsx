'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/data/projects'

export default function LatestProjectsGrid() {
  // Show exactly 3 featured projects in a single curated row
  const displayProjects = projects.slice(0, 3)

  return (
    <section
      id="latest-projects"
      aria-label="Latest Architectural Projects"
      className="relative w-full pt-18 sm:pt-22 lg:pt-26 pb-16 sm:pb-20 lg:pb-24 bg-[#FBF9F6] text-[#1A1A1A] overflow-hidden select-none"
    >
      {/* Subtle Ambient Atmosphere Glow */}
      <div className="absolute top-1/3 -left-36 w-96 h-96 bg-[#C5A059]/04 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-36 w-96 h-96 bg-[#C5A059]/04 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl xl:max-w-[84rem] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 relative z-10">
        
        {/* Section Header: Centered & Minimal */}
        <div className="text-center mb-12 sm:mb-16 space-y-2.5">
          <span className="text-[12.5px] sm:text-[13px] font-sans uppercase tracking-[0.24em] text-[#C5A059] font-medium block">
            LATEST PROJECTS
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1A1A1A] font-light tracking-[0.05em]">
            CURATED SPACES <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">of</span> QUIET INTENT
          </h2>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto pt-1" />
        </div>

        {/* 3 Featured Projects Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-8 xl:gap-10">
          {displayProjects.map((project, idx) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={`/portfolio/${project.slug}`}
                className="group block focus-visible:outline-2 focus-visible:outline-[#C5A059]"
                aria-label={`View project: ${project.title}`}
              >
                {/* Image Container with Inner Hairline Hover Frame */}
                <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-[#EAE6DE] rounded-xs shadow-[0_12px_30px_-15px_rgba(27,26,23,0.08)]">
                  {/* Primary Architectural Photograph */}
                  <img
                    src={project.cover.src}
                    alt={project.cover.alt || project.title}
                    loading="eager"
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />

                  {/* Dark Vignette Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />

                  {/* Inner White Hairline Frame with "VIEW PROJECT" */}
                  <div className="absolute inset-4 sm:inset-5 border border-white/85 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none flex items-center justify-center">
                    <span className="text-[12px] sm:text-[12.5px] font-sans uppercase tracking-[0.25em] text-white font-medium select-none drop-shadow-sm">
                      VIEW PROJECT
                    </span>
                  </div>
                </div>

                {/* Project Details Below Image */}
                <div className="mt-4 sm:mt-5 text-center space-y-1">
                  <h3 className="font-serif text-[17px] sm:text-[19px] md:text-[20px] uppercase tracking-[0.14em] text-[#1A1A1A] font-normal group-hover:text-[#C5A059] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-[11.5px] sm:text-[12px] font-sans uppercase tracking-[0.2em] text-[#6B665F] block font-medium">
                    {project.location} &bull; {project.type}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Clear Directional CTA Button to Portfolio Page */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="/portfolio"
            className="group relative inline-flex items-center gap-3.5 px-9 py-4 border border-[#C5A059] bg-transparent text-[#1A1A1A] hover:bg-[#C5A059] hover:text-white transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-none text-[11px] sm:text-[11.5px] uppercase tracking-[0.26em] font-semibold cursor-pointer shadow-[0_4px_16px_rgba(197,160,89,0.12)] hover:shadow-[0_8px_24px_rgba(197,160,89,0.3)] hover:-translate-y-0.5 active:scale-98"
          >
            <span>VIEW ALL PROJECTS</span>
            <ArrowUpRight className="w-4 h-4 text-[#C5A059] group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

      </div>
    </section>
  )
}
