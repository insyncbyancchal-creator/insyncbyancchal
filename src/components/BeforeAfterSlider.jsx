'use client'

import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Diamond, SlidersHorizontal } from 'lucide-react'

export default function BeforeAfterSlider({
  beforeImage = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop',
  afterImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
  labelBefore = 'Raw Shell Structure',
  labelAfter = 'Completed Insync by Ancchal Interior',
  title = 'Spatial Transformation',
  subtitle = 'Experience the architectural transition from structural shell to bespoke luxury residence.'
}) {
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  const handleMove = useCallback(
    (clientX) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      let percentage = (x / rect.width) * 100
      if (percentage < 0) percentage = 0
      if (percentage > 100) percentage = 100
      setSliderPos(percentage)
    },
    []
  )

  const handleTouchMove = (e) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX)
    }
  }

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX)
    }
  }

  return (
    <section id="before-after" className="py-24 bg-[#FBF9F6] text-[#1A1A1A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-none border border-[#C5A059]/40 bg-[#F3F0EA] shadow-sm">
            <Diamond className="w-3 h-3 text-[#C5A059]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
              Spatial Evolution
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-[34px] lg:text-[40px] font-light tracking-tight leading-[1.22] text-[#1A1A1A]">
            Architectural <span className="montecarlo-regular italic font-normal text-[#C5A059]">Transformation</span>
          </h2>
          <div className="w-16 h-[1px] bg-[#C5A059] mx-auto mt-3 mb-1.5" />

          <p className="text-[13px] text-[#6B665F] leading-[1.7] font-light max-w-xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Interactive Comparison Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          className="relative w-full h-[380px] sm:h-[480px] md:h-[600px] rounded-none overflow-hidden cursor-ew-resize select-none border border-[#C5A059]/50 shadow-2xl"
        >
          {/* AFTER IMAGE (Background Layer) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={afterImage}
              alt={labelAfter}
              className="w-full h-full object-cover"
            />
            {/* After Tag */}
            <div className="absolute top-6 right-6 px-4 py-2 rounded-none bg-white/90 backdrop-blur-md border border-[#C5A059]/50 text-[11px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold shadow-md pointer-events-none flex items-center space-x-2">
              <span className="w-2 h-2 rounded-none bg-[#C5A059] animate-pulse" />
              <span>{labelAfter}</span>
            </div>
          </div>

          {/* BEFORE IMAGE (Clipped Foreground Layer) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <img
              src={beforeImage}
              alt={labelBefore}
              className="w-full h-full object-cover"
            />
            {/* Before Tag */}
            <div className="absolute top-6 left-6 px-4 py-2 rounded-none bg-[#1A1A1A]/90 backdrop-blur-md border border-white/20 text-[11px] uppercase tracking-[0.2em] text-white/90 font-medium shadow-md pointer-events-none">
              {labelBefore}
            </div>
          </div>

          {/* DRAGGER BAR */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-[#C5A059] shadow-[0_0_15px_#C5A059] pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-none bg-white border-2 border-[#C5A059] text-[#C5A059] flex items-center justify-center shadow-[0_0_20px_rgba(197,160,89,0.5)]">
              <SlidersHorizontal className="w-4 h-4 rotate-90" />
            </div>
          </div>
        </div>

        {/* Drag Hint */}
        <div className="text-center mt-6 text-[11px] tracking-[0.25em] text-[#8C857B] uppercase flex items-center justify-center space-x-2 font-light">
          <span>Drag left or right to compare</span>
        </div>
      </div>
    </section>
  )
}
