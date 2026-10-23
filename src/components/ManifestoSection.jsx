'use client'

import { motion } from 'framer-motion'

export default function ManifestoSection() {
  return (
    <section id="manifesto" className="py-28 md:py-36 px-6 md:px-12 bg-[#FBF9F6] text-[#1A1A1A] relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Subtle Luxury Divider */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-3 border-b border-[#1A1A1A]/10 pb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
            Studio Philosophy
          </span>
        </motion.div>

        {/* Large Editorial Statement */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[34px] lg:text-[40px] font-light leading-[1.25] text-[#1A1A1A]">
            &ldquo;We do not decorate rooms; we orchestrate <span className="montecarlo-regular italic font-normal text-[#C5A059]">spatial harmony</span> where light, material, and human quietude coexist seamlessly.&rdquo;
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 items-start">
            <div className="md:col-span-4">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#1A1A1A]/70 font-semibold block">
                The Insync Ethos
              </span>
            </div>

            <div className="md:col-span-8 space-y-4 text-[13px] text-[#6B665F] font-light leading-[1.7]">
              <p>
                At INSYNC BY ANCCHAL, led by Ancchal, every architectural project is approached as a living canvas. True luxury lies in restraint—allowing pure natural marble, tactile lime plaster, hand-worked metals, and bespoke millwork to speak with quiet elegance.
              </p>
              <p>
                From private luxury residences to bespoke commercial spaces, our atelier combines architectural precision with timeless craftsmanship, creating environments that feel effortless and refined.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
