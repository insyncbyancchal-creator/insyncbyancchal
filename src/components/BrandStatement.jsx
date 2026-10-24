'use client'

import React from 'react'
import { motion } from 'framer-motion'

const KEYWORDS = ['LUXURY', 'CRAFTSMANSHIP', 'ELEGANCE', 'OPULENCE', 'MAJESTIC', 'STILLNESS', 'ARCHITECTURAL INTEGRITY']

export default function BrandStatement() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full bg-[#FBF9F6] text-[#1A1A1A] py-3 overflow-hidden select-none border-y border-[#C5A059]/30 bg-[#F3F0EA]"
    >
      {/* Continuous Luxury Keywords Ribbon Ticker */}
      <div className="w-full flex whitespace-nowrap overflow-hidden">
        <motion.div
          className="flex items-center space-x-12 shrink-0 text-[10.5px] sm:text-[11px] font-serif tracking-[0.28em] text-[#C5A059] font-medium uppercase"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 25,
          }}
        >
          {[...KEYWORDS, ...KEYWORDS, ...KEYWORDS, ...KEYWORDS].map((kw, i) => (
            <React.Fragment key={i}>
              <span className="shrink-0 hover:text-[#1A1A1A] transition-colors cursor-default">
                {kw}
              </span>
              <span className="shrink-0 text-[#C5A059]/60 font-sans">•</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
