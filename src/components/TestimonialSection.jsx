'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDE_VARIANTS = {
  enter: (dir) => ({
    opacity: 0,
    y: dir > 0 ? 10 : -10,
  }),
  center: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (dir) => ({
    opacity: 0,
    y: dir > 0 ? -10 : 10,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Mansi Poddar',
    role: 'CONSULTANT & RESIDENCE OWNER',
    location: 'CIVIL LINES, LUDHIANA',
    quote:
      'Ancchal and her team are people I trust 100% with any space. She sets the bar so high that when I envision an interior, I cannot think beyond her. Intuitive and deeply attentive, she brings forth the client’s true personality through spatial stillness and soulful materials.',
  },
  {
    id: 2,
    name: 'Vikramjit Singh Grewal',
    role: 'ESTATE OWNER & INDUSTRIALIST',
    location: 'SARABHA NAGAR, LUDHIANA',
    quote:
      'Insync by Ancchal brought a quiet, museum-level discipline to our family residence. Ancchal understood from day one that we didn’t seek loud opulence—we wanted timeless stillness, natural travertine, and daylight that changes gracefully through the day.',
  },
  {
    id: 3,
    name: 'Dr. Meera & Rajesh Malhotra',
    role: 'SURGICAL SPECIALISTS & WELLNESS PATRONS',
    location: 'SECTOR 9, CHANDIGARH',
    quote:
      'Walking into our residence after demanding days feels like entering a retreat. The acoustic quiet, the hand-waxed joinery, and the seamless connection to the courtyard reflect an understanding of human well-being that goes far beyond conventional decoration.',
  },
  {
    id: 4,
    name: 'Harpreet & Amanat Dhillon',
    role: 'VILLA OWNER & ENTREPRENEUR',
    location: 'MODEL TOWN, JALANDHAR',
    quote:
      'Every guest who enters our villa is immediately struck by the restraint. Insync showed us that true luxury is about what you choose not to put into a room. The craftsmanship is flawless, down to the millimeter of every bronze reveal and customized marble island.',
  },
  {
    id: 5,
    name: 'Sunaina Ahluwalia',
    role: 'HERITAGE & ART COLLECTOR',
    location: 'RANJIT AVENUE, AMRITSAR',
    quote:
      'As someone who lives surrounded by art, I needed an architect who respected light above all else. Insync conceived our space as a living gallery—calm, tactile, and deeply personal. It is the rare studio that listens with extraordinary patience.',
  },
]

export default function TestimonialSection({ items }) {
  const testimonials = (Array.isArray(items) && items.length > 0)
    ? items.map((item, idx) => ({
        id: item._id || idx + 1,
        name: item.clientName || item.name || 'Private Patron',
        role: item.roleTitle || item.role || 'RESIDENCE OWNER',
        location: item.location || '',
        quote: item.quote || '',
      }))
    : TESTIMONIALS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Continuous rotation with hover pause
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [testimonials.length, isPaused]);

  const current = testimonials[currentIndex] || testimonials[0];

  return (
    <section
      id="testimonials"
      aria-label="Patron Testimonials"
      className="relative w-full bg-[#F7F4EE] text-[#1A1A1A] py-14 sm:py-18 lg:py-20 overflow-hidden select-none"
    >
      {/* Top Hairline Architectural Rule */}
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-10">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-10 pt-10 sm:pt-12 pb-2 relative z-10">
        {/* Refined Section Header with Smooth Scroll Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 sm:mb-10 space-y-1.5"
        >
          <span className="text-[12px] sm:text-[12.5px] font-sans uppercase tracking-[0.22em] text-[#C5A059] font-semibold block">
            PATRON VOICES
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-light tracking-[0.05em]">
            REFLECTIONS <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">of</span> CONSIDERED LIVING
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-12 h-[1px] bg-[#C5A059] mx-auto pt-1 origin-center"
          />
        </motion.div>

        {/* Testimonial Stage with Subtle Rectangular Controls and Entrance Animation */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.95, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative max-w-4xl mx-auto flex items-center justify-between gap-4 sm:gap-6 min-h-[220px] sm:min-h-[200px]"
        >
          {/* Previous Arrow Button */}
          <button
            type="button"
            onClick={prevTestimonial}
            aria-label="Previous Testimonial"
            className="shrink-0 w-10 h-10 rounded-none border border-[#C5A059]/40 bg-[#F7F4EE] text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer shadow-xs active:scale-95 z-20 group touch-manipulation min-w-[40px] min-h-[40px]"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Testimonial Text & Attribution */}
          <div className="flex-1 max-w-2xl mx-auto px-2 sm:px-6 text-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={SLIDE_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-4 sm:space-y-5 will-change-[opacity,transform]"
              >
                {/* Quote Text */}
                <p className="font-serif italic text-[16px] sm:text-[17.5px] md:text-[18.5px] text-[#2C2A26] leading-[1.68] font-light max-w-xl mx-auto min-h-[90px] sm:min-h-[80px] flex items-center justify-center">
                  &ldquo;{current.quote}&rdquo;
                </p>

                {/* Client Name & Designation */}
                <div className="space-y-1 pt-1">
                  <h4 className="font-serif text-[17px] sm:text-[18px] text-[#1A1A1A] font-medium tracking-wide">
                    {current.name}
                  </h4>
                  <span className="text-[11.5px] sm:text-[12px] font-sans uppercase tracking-[0.2em] text-[#555048] font-medium block">
                    {current.role} &bull; {current.location}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Arrow Button */}
          <button
            type="button"
            onClick={nextTestimonial}
            aria-label="Next Testimonial"
            className="shrink-0 w-10 h-10 rounded-none border border-[#C5A059]/40 bg-[#F7F4EE] text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer shadow-xs active:scale-95 z-20 group touch-manipulation min-w-[40px] min-h-[40px]"
          >
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* Minimal Rectangular Pagination Indicators */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-8 sm:mt-9">
          {testimonials.map((t, index) => {
            const isActive = index === currentIndex
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                aria-label={`Jump to testimonial ${index + 1}`}
                className="p-3 -m-1.5 flex items-center justify-center cursor-pointer touch-manipulation group"
              >
                <span
                  className={`block transition-all duration-300 rounded-none ${
                    isActive
                      ? 'w-6 h-1.5 bg-[#C5A059]'
                      : 'w-2.5 h-1.5 bg-[#DDD6C6] group-hover:bg-[#C5A059]/60'
                  }`}
                />
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom Hairline Architectural Rule */}
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-10 mt-10 sm:mt-12">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent" />
      </div>
    </section>
  )
}
