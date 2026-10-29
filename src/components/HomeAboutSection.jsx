'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { urlForImage } from '@/sanity/lib/image'

const PRINCIPLES = [
  {
    number: '01',
    label: 'RESTRAINT',
    description: 'Editing until only what truly matters remains.',
  },
  {
    number: '02',
    label: 'DAYLIGHT',
    description: 'Natural light treated as our first architectural material.',
  },
  {
    number: '03',
    label: 'CRAFT',
    description: 'Every reveal and joint resolved on-site by hand.',
  },
]

export default function HomeAboutSection({ data }) {
  // If an image is uploaded in Sanity, compute URL, dynamic aspect ratio, and hotspot focal point
  const sanityImage = data?.founderPhoto;
  const sanityImageUrl = sanityImage ? urlForImage(sanityImage)?.url() : null;

  // Frame automatically adapts to the aspect ratio of the uploaded image
  const dimensions = sanityImage?.asset?.metadata?.dimensions;
  let dynamicAspectRatio = '2 / 3';
  if (dimensions?.width && dimensions?.height) {
    dynamicAspectRatio = `${dimensions.width} / ${dimensions.height}`;
  }

  // Hotspot focal point from Sanity backend
  let dynamicObjectPosition = '50% 80%';
  if (sanityImage?.hotspot) {
    const x = Math.round(sanityImage.hotspot.x * 100);
    const y = Math.round(sanityImage.hotspot.y * 100);
    dynamicObjectPosition = `${x}% ${y}%`;
  }

  const photoSrc = sanityImageUrl || '/about/ancchal-home.jpeg';
  const photoAlt = data?.founderPhotoAlt || 'Ancchal, Founder & Principal Designer of Insync by Ancchal';
  const founderName = data?.founderName || 'Ancchal';
  const founderRole = data?.founderRole || 'FOUNDER & PRINCIPAL DESIGNER';

  return (
    <section
      id="about-atelier"
      aria-labelledby="about-atelier-heading"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#FBF9F6] text-[#1A1A1A] overflow-hidden select-none"
    >
      {/* Subtle Architectural Atmosphere Ambient Glow */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-[#C5A059]/04 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-12 -right-32 w-96 h-96 bg-[#C5A059]/05 blur-[140px] rounded-full pointer-events-none" />

      {/* Main Editorial Container */}
      <div className="w-full max-w-7xl xl:max-w-[84rem] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
          
          {/* =========================================================
              LEFT COLUMN: PURE DESIGNER PORTRAIT
              Animates smoothly from the LEFT on scroll
              ========================================================= */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-20px 0px' }}
            className="order-1 lg:order-1 lg:col-span-5 w-full flex flex-col items-center lg:items-start will-change-transform"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[390px] xl:max-w-[410px] mx-auto lg:mx-0">
              {/* Champagne-Gold Hairline Architectural Frame */}
              <div className="relative rounded-sm overflow-hidden p-[1px] bg-gradient-to-b from-[#C5A059]/50 via-[#C5A059]/20 to-[#C5A059]/40 shadow-[0_18px_45px_-15px_rgba(27,26,23,0.12)]">
                <div 
                  className="relative w-full rounded-sm overflow-hidden bg-[#F3F0EA]"
                  style={{ 
                    aspectRatio: dynamicAspectRatio,
                    maxHeight: '640px' 
                  }}
                >
                  {/* Clean, Pure Photograph */}
                  <img
                    src={photoSrc}
                    alt={photoAlt}
                    onError={(e) => {
                      e.currentTarget.src = "/about/ancchal-home.jpg";
                    }}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]"
                    style={{ objectPosition: dynamicObjectPosition }}
                  />
                </div>
              </div>

              {/* Minimalist Studio Attribution Below Frame */}
              <div className="mt-3.5 flex items-center justify-between px-1">
                <span className="font-serif text-[15px] sm:text-base text-[#1A1A1A] tracking-wide">
                  {founderName}
                </span>
                <span className="text-[11.5px] sm:text-[12px] font-sans uppercase tracking-[0.2em] text-[#C5A059] font-semibold">
                  {founderRole}
                </span>
              </div>
            </div>
          </motion.div>

          {/* =========================================================
              RIGHT COLUMN: STUDIO ATELIER STORY & PRINCIPLES
              Animates smoothly from the RIGHT on scroll
              ========================================================= */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-20px 0px' }}
            className="order-2 lg:order-2 lg:col-span-7 w-full space-y-4 sm:space-y-5 text-left lg:pl-4 xl:pl-6 will-change-transform"
          >
            {/* 1. Uppercase Section Label & Editorial Headline */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                <span className="text-[12px] sm:text-[12.5px] font-sans uppercase tracking-[0.22em] text-[#C5A059] font-semibold block">
                  ABOUT THE ATELIER
                </span>
              </div>

              <h2
                id="about-atelier-heading"
                className="font-serif text-[26px] sm:text-[32px] md:text-[36px] lg:text-[38px] xl:text-[42px] text-[#1A1A1A] font-light tracking-[0.04em]"
              >
                <span className="block leading-[1.16]">
                  WHERE ARCHITECTURE{' '}
                  <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">meets</span>
                </span>
                <span className="block leading-[1.16] mt-1.5 sm:mt-2">
                  QUIET RESTRAINT{' '}
                  <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">and soulful</span>
                </span>
                <span className="block leading-[1.16] mt-1.5 sm:mt-2">
                  PRECISION
                </span>
              </h2>
            </div>

            {/* 2. Gold Architectural Hairline Divider */}
            <div className="w-14 h-[1.5px] bg-[#C5A059]" />

            {/* 3. Two Descriptive Paragraphs */}
            <div className="space-y-3 text-[#4A4742] text-[14px] sm:text-[15px] leading-[1.72] font-normal">
              <p>
                We believe true luxury is never loud or decorative; it is the quiet art of spatial stillness, calibrated daylight, and honest materials. Conceived from the ground up, our work strips away the superfluous until only pure proportion, tactile beauty, and emotional serenity remain.
              </p>
              <p className="text-[#55524C]">
                Every residence we author is treated as an intimate living portrait of its patron—seamlessly harmonizing raw travertine stone, fluted oak millwork, hand-troweled lime plasters, and bespoke Italian furnishings into spaces that feel grounding the moment you enter, and better every day you stay.
              </p>
            </div>

            {/* 4. Three Design Principles (Compact 3-Column Editorial Row) */}
            <div className="pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 py-3.5 border-y border-[#C5A059]/25">
                {PRINCIPLES.map((principle) => (
                  <div
                    key={principle.number}
                    className="group relative space-y-1 sm:pr-2.5 sm:border-r last:sm:border-r-0 border-[#1A1A1A]/08"
                  >
                    {/* Header Label with Micro Gold Animated Underline */}
                    <div className="relative inline-block pb-0.5">
                      <span className="text-[11.5px] sm:text-[12px] font-sans uppercase tracking-[0.2em] text-[#C5A059] font-semibold block transition-colors duration-300">
                        {principle.number} — {principle.label}
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A059] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
                    </div>

                    {/* Descriptive Text */}
                    <p className="text-[13px] sm:text-[13.5px] text-[#555048] leading-[1.58] font-light">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. "KNOW MORE" Button */}
            <div className="pt-2">
              <Link
                href="/about"
                className="group relative inline-flex items-center gap-3 px-7 py-3 bg-[#1A1A1A] text-[#F7F5F0] rounded-none border border-[#C5A059]/40 hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#1A1A1A] hover:-translate-y-0.5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_4px_14px_rgba(27,26,23,0.1)] hover:shadow-[0_10px_28px_rgba(197,160,89,0.35)] active:scale-98 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C5A059]"
                aria-label="Know more about Insync by Ancchal atelier"
              >
                <span className="text-[10.5px] sm:text-[11px] uppercase tracking-[0.26em] font-semibold transition-colors duration-300 group-hover:text-[#1A1A1A]">
                  KNOW MORE
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A059] group-hover:text-[#1A1A1A] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
