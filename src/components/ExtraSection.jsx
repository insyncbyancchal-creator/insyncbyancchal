'use client'

import { motion } from 'framer-motion'
import { Sparkles, Plus, Layers } from 'lucide-react'

export default function ExtraSection() {
  return (
    <section id="extra-section" className="relative w-full py-32 bg-[#121212] text-[#FBF9F6] overflow-hidden border-t border-white/05">
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C5A059]/05 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Badge */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-none border border-[#C5A059]/40 bg-white/05 backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
              ATELIER FEATURE SPACE
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl tracking-tight text-[#FBF9F6] leading-tight">
            Curated <span className="italic font-normal text-[#C5A059]">Space</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm uppercase tracking-widest text-[#8C857B] max-w-md">
            This dedicated section is prepared on the homepage for your next custom feature or highlight.
          </p>
        </div>

        {/* Placeholder Canvas Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mt-16 relative w-full h-[400px] sm:h-[500px] rounded-none border border-dashed border-[#C5A059]/30 bg-white/[0.02] backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center group hover:border-[#C5A059]/60 transition-all duration-500 shadow-2xl overflow-hidden"
        >
          {/* Subtle Corner Markers */}
          <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-[#C5A059]/40 group-hover:border-[#C5A059] transition-colors" />
          <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-[#C5A059]/40 group-hover:border-[#C5A059] transition-colors" />
          <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-[#C5A059]/40 group-hover:border-[#C5A059] transition-colors" />
          <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-[#C5A059]/40 group-hover:border-[#C5A059] transition-colors" />

          {/* Center Graphic */}
          <div className="w-16 h-16 rounded-none bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center mb-6 text-[#C5A059] group-hover:scale-110 group-hover:bg-[#C5A059] group-hover:text-[#1A1A1A] transition-all duration-500 shadow-lg">
            <Layers className="w-8 h-8" />
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-[#FBF9F6] font-light">
            Ready for <span className="italic text-[#C5A059]">Content</span>
          </h3>

          <p className="text-xs sm:text-sm text-[#8C857B] max-w-sm mt-3 font-light leading-relaxed">
            Whenever you are ready, let me know what content, images, sliders, or interactive modules you want placed here!
          </p>

          <div className="mt-8 inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-[#C5A059] font-semibold px-4 py-2 rounded-none bg-[#C5A059]/10 border border-[#C5A059]/20">
            <Plus className="w-3.5 h-3.5" />
            <span>Reserved Homepage Canvas</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
