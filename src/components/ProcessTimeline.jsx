'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Diamond } from 'lucide-react'

const PROCESS_STEPS = [
  {
    step: '01.',
    title: 'Initial Atelier Consultation',
    description:
      'Every architectural journey begins with an intimate dialogue to understand your lifestyle, spatial aspirations, and aesthetic vision for the property.',
    side: 'left',
  },
  {
    step: '02.',
    title: 'Concept & Spatial Proposal',
    description:
      'We develop bespoke spatial layouts, 3D architectural renders, moodboards, and material palettes curated specifically for your residence.',
    side: 'right',
  },
  {
    step: '03.',
    title: 'Material Sourcing & Craft',
    description:
      'Direct global procurement of rare marbles, custom Italian joinery, hand-worked metals, and bespoke textiles selected by Ancchal.',
    side: 'left',
  },
  {
    step: '04.',
    title: 'Project Implementation',
    description:
      'Master craftsmen and structural engineers execute every detail on site with uncompromising precision and white-glove supervision.',
    side: 'right',
  },
  {
    step: '05.',
    title: 'White-Glove Handover',
    description:
      'Final curation of bespoke décor, art placement, and lighting scene calibration, unveiling your completed sanctuary.',
    side: 'left',
  },
]

export default function ProcessTimeline() {
  const containerRef = useRef(null)

  // Scroll Progress for the center gold line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 85%'],
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  })

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative w-full py-28 md:py-40 bg-[#FBF9F6] text-[#1A1A1A] overflow-hidden select-none"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C5A059]/08 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-2.5">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold block">
            PROCESS
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[34px] lg:text-[40px] font-light text-[#1A1A1A] tracking-tight leading-[1.22]">
            Our <span className="montecarlo-regular italic font-normal text-[#C5A059]">Atelier Journey</span>
          </h2>
          <div className="w-16 h-[1px] bg-[#C5A059] mx-auto mt-3 mb-1" />
        </div>

        {/* Timeline Container */}
        <div className="relative w-full py-6">
          {/* Central Static Line */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#1A1A1A]/15 hidden md:block" />

          {/* Central Animated Gold Scroll Line */}
          <motion.div
            style={{ scaleY }}
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#C5A059] via-[#E6D2B0] to-[#C5A059] origin-top hidden md:block shadow-[0_0_12px_rgba(197,160,89,0.5)]"
          />

          {/* Top Diamond Node */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center justify-center">
            <Diamond className="w-4 h-4 text-[#C5A059] fill-[#C5A059] drop-shadow-[0_0_8px_rgba(197,160,89,0.5)]" />
          </div>

          {/* Bottom Diamond Node */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center justify-center">
            <Diamond className="w-4 h-4 text-[#C5A059] fill-[#C5A059] drop-shadow-[0_0_8px_rgba(197,160,89,0.5)]" />
          </div>

          {/* Steps Loop */}
          <div className="space-y-16 md:space-y-24">
            {PROCESS_STEPS.map((item, idx) => {
              const isLeft = item.side === 'left'

              return (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row items-center w-full ${
                    isLeft ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Empty Spacer Column for Desktop Grid */}
                  <div className="hidden md:block w-1/2" />

                  {/* Center Node Diamond for Desktop */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 z-20 hidden md:flex w-7 h-7 rounded-full bg-white border border-[#C5A059] items-center justify-center shadow-[0_0_15px_rgba(197,160,89,0.35)]"
                  >
                    <div className="w-2 h-2 rotate-45 bg-[#C5A059]" />
                  </motion.div>

                  {/* Content Column */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: isLeft ? -40 : 40,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`w-full md:w-1/2 px-4 md:px-12 ${
                      isLeft ? 'md:text-right' : 'md:text-left'
                    } text-center`}
                  >
                    <div className="space-y-1.5 max-w-md mx-auto md:mx-0 inline-block">
                      {/* Step Number in Gold Script */}
                      <span className="font-serif italic text-lg sm:text-xl text-[#C5A059] block font-light">
                        {item.step}
                      </span>

                      {/* Step Title */}
                      <h3 className="font-serif text-lg sm:text-xl md:text-[22px] text-[#1A1A1A] font-normal leading-snug tracking-tight">
                        {item.title}
                      </h3>

                      {/* Step Description */}
                      <p className="text-[14.5px] sm:text-[15.5px] text-[#4A463F] font-normal leading-[1.75] pt-1">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
