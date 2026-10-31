'use client'

import React from 'react'

const KEYWORDS = ['LUXURY', 'CRAFTSMANSHIP', 'ELEGANCE', 'OPULENCE', 'MAJESTIC', 'STILLNESS', 'ARCHITECTURAL INTEGRITY']

export default function BrandStatement() {
  return (
    <section
      aria-label="Atelier Philosophy"
      className="relative w-full text-[#1A1A1A] py-3 overflow-hidden select-none border-y border-[#C5A059]/30 bg-[#F3F0EA]"
    >
      {/* Continuous Hardware-Accelerated Ribbon Ticker */}
      <div className="w-full flex whitespace-nowrap overflow-hidden">
        <div
          className="flex items-center space-x-12 shrink-0 text-[10.5px] sm:text-[11px] font-serif tracking-[0.28em] text-[#C5A059] font-medium uppercase animate-marquee will-change-transform"
          style={{
            animation: 'marquee 30s linear infinite',
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
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>
    </section>
  )
}
