'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const PROJECTS = [
  {
    id: 1,
    slug: 'the-solstice-penthouse',
    title: 'The Solstice Penthouse',
    location: 'GURUGRAM',
    type: 'Penthouse Residence',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=85&w=1200&auto=format&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=85&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    slug: 'skylight-residence',
    title: 'Skylight Residence',
    location: 'LUDHIANA',
    type: 'Bespoke Villa',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=1200&auto=format&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=85&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    slug: 'oasis-wellness-sanctuary',
    title: 'Oasis Wellness Sanctuary',
    location: 'CHANDIGARH',
    type: 'Wellness Estate',
    image:
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=85&w=1200&auto=format&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=85&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    slug: 'celica-home',
    title: 'Celica Home',
    location: 'KOLKATA',
    type: 'Duplex Residence',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=85&w=1200&auto=format&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=85&w=1200&auto=format&fit=crop',
  },
  {
    id: 5,
    slug: 'villa-riviera-estates',
    title: 'Villa Riviera Estates',
    location: 'GOA',
    type: 'Coastal Architecture',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=85&w=1200&auto=format&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=85&w=1200&auto=format&fit=crop',
  },
  {
    id: 6,
    slug: 'courtyard-residence',
    title: 'The Courtyard Residence',
    location: 'LUDHIANA',
    type: 'Residential Villa',
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=85&w=1200&auto=format&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=85&w=1200&auto=format&fit=crop',
  },
]

export default function PortfolioShowcase() {
  return (
    <section id="portfolio-showcase" className="relative w-full bg-[#FBF9F6] text-[#1A1A1A] py-16 sm:py-24 select-none">
      <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* 3-Column Equal Grid Matching Reference Photo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{
                duration: 0.65,
                delay: (index % 3) * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col"
            >
              <Link
                href={`/portfolio/${project.slug}`}
                className="group block text-inherit no-underline"
                aria-label={`View project: ${project.title}`}
              >
                {/* 1:1 Square Image Container with Ultra-Smooth Dissolve Hover */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#ECE6D8] rounded-[2px] shadow-[0_8px_25px_-10px_rgba(27,26,23,0.06)] group-hover:shadow-[0_16px_36px_-10px_rgba(27,26,23,0.13)] transition-shadow duration-700">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading={index < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
                  />
                  {project.hoverImage && (
                    <img
                      src={project.hoverImage}
                      alt={`${project.title} interior detail`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
                    />
                  )}
                  {/* Whitish-Golden Frosted Glass Blur Overlay on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#FFFEFA]/75 via-[#F8F2E5]/68 to-[#EEE1C8]/62 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFFDF8]/95 border border-[#C5A059]/75 shadow-[0_10px_28px_-6px_rgba(27,26,23,0.14),0_0_20px_rgba(197,160,89,0.22)] transform translate-y-2 scale-95 group-hover:translate-y-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      <span className="font-sans text-[11px] tracking-[0.26em] uppercase font-semibold text-[#1A1A1A]">
                        VIEW PROJECT
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A059] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </div>
                  </div>

                  <div className="absolute inset-0 border border-black/5 pointer-events-none group-hover:border-[#C5A059]/40 transition-colors duration-500 z-20" />
                </div>

                {/* Minimal Left-Aligned Serif Title & Meta (Matching Reference Photo) */}
                <div className="mt-4 text-left">
                  <h3 className="font-serif text-[22px] sm:text-[25px] font-normal tracking-[0.01em] text-[#1A1A1A] group-hover:text-[#C5A059] transition-colors duration-300 leading-snug">
                    {project.title}
                  </h3>
                  <span className="block font-sans text-[11px] sm:text-[11.5px] tracking-[0.22em] uppercase text-[#7A746B] font-medium mt-1.5">
                    {project.location} &bull; {project.type}
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
