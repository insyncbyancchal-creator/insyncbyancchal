'use client'

import React from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import SimpleFooter from '@/components/SimpleFooter'
import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'

export default function InsyncHomePage() {
  const decorProducts = [
    {
      id: 'd1',
      no: '01',
      name: 'Monolithic Travertine Vessel',
      category: 'Sculptural Vessels',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
      description: 'Hand-carved Italian travertine vessel with natural honed bevels and organic geological veining.',
      options: 'Tivoli Travertine · Honed Finish',
    },
    {
      id: 'd2',
      no: '02',
      name: 'Fluted Brass Wall Sconce',
      category: 'Architectural Lighting',
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop',
      description: 'Patinated champagne brass wall fixture casting an ambient halo light through solid fluted crystal.',
      options: 'Brushed Brass · Fluted Glass',
    },
    {
      id: 'd3',
      no: '03',
      name: 'Bespoke Silk & Wool Floor Coverings',
      category: 'Textiles & Rugs',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      description: 'Hand-knotted organic wool and raw mulberry silk rug tailored to bespoke residence proportions.',
      options: 'Organic Wool · Mulberry Silk',
    },
    {
      id: 'd4',
      no: '04',
      name: 'Solstice Bouclé Lounge Armature',
      category: 'Bespoke Seating',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop',
      description: 'Sculptural low-slung curves upholstered in tactile French bouclé over a kiln-dried hardwood armature.',
      options: 'Bouclé · Belgian Linen',
    },
    {
      id: 'd5',
      no: '05',
      name: 'Monumental Atelier Mirror',
      category: 'Architectural Accents',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop',
      description: 'Hand-rolled iron frame with deep architectural reveal and beveled crystal glass proportioned to high ceilings.',
      options: 'Aged Bronze · Antique Brass',
    },
    {
      id: 'd6',
      no: '06',
      name: 'Tivoli Low Plinth Table',
      category: 'Stone Furniture',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
      description: 'Solid stone plinth featuring architectural shadow gaps and precision honed matte sealer.',
      options: 'Roman Travertine · Nero Marquina',
    },
  ]

  return (
    <div className="bg-[#FBF9F6] text-[#1A1A1A] min-h-screen selection:bg-[#C5A059] selection:text-white">
      <Navbar />

      <main className="pt-32 sm:pt-40 pb-24">
        {/* Header with Directional Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 text-center max-w-4xl mx-auto px-6 mb-16 sm:mb-20"
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#C5A059] font-semibold block">
            ATELIER OBJECTS &amp; BESPOKE DÉCOR
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1A1A1A] font-light tracking-[0.04em]">
            INSYNC <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">home collection</span>
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-[1.5px] bg-[#C5A059] mx-auto my-5 origin-center"
          />
          <p className="text-[14.5px] sm:text-[15.5px] text-[#555048] font-sans font-light leading-relaxed max-w-2xl mx-auto">
            A curated capsule of custom furniture and artisan décor crafted to order in our partner workshops. Every object can be calibrated in materiality, dimensions, and finishes.
          </p>
        </motion.div>

        {/* Product Grid with Staggered Scroll Entrance */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {decorProducts.map((product, idx) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.85,
                delay: (idx % 3) * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-[#F4F1EA] rounded-2xl overflow-hidden p-6 sm:p-7 border border-[#C5A059]/20 flex flex-col justify-between group hover:border-[#C5A059]/50 hover:shadow-[0_16px_36px_rgba(27,26,23,0.06)] transition-all duration-500"
            >
              <div className="space-y-4">
                <div className="aspect-[16/11] rounded-xl overflow-hidden bg-[#1A1A1A] relative">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    initial={{ scale: 1.08 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  <div className="absolute top-3.5 left-3.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-medium font-sans">
                      {product.no} · BESPOKE
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[10.5px] uppercase tracking-[0.24em] text-[#C5A059] font-semibold block mb-1 font-sans">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-2xl text-[#1A1A1A] font-normal leading-snug group-hover:text-[#C5A059] transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-[13.5px] text-[#66625C] leading-relaxed font-sans mt-2">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#C5A059]/20 flex items-center justify-between">
                <span className="text-[11px] font-sans tracking-wide text-[#8C857B]">
                  {product.options}
                </span>
                <Link
                  href={`/contact?service=Insync%20Home&note=${encodeURIComponent(`Enquiry for ${product.name}`)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-[0.22em] text-[#C5A059] font-semibold hover:text-[#1A1A1A] transition-colors"
                >
                  <span>Enquire</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Closing Atelier Consultation Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 sm:mt-28 max-w-4xl mx-auto px-6 text-center"
        >
          <div className="p-8 sm:p-12 rounded-3xl bg-[#ECE7DC] border border-[#C5A059]/30 relative overflow-hidden">
            <span className="text-[10.5px] font-sans uppercase tracking-[0.28em] text-[#C5A059] font-semibold block mb-2">
              BESPOKE COMMISSIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-light">
              CUSTOMIZE WITH <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">our atelier</span>
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-14 h-[1.5px] bg-[#C5A059] mx-auto my-4 origin-center"
            />
            <p className="text-[14px] text-[#555048] font-sans max-w-xl mx-auto mb-8">
              Have specific stone, textile, or metalwork dimensions in mind? Our team crafts pieces precisely tailored to your interior architecture.
            </p>
            <Link
              href="/contact?service=Insync%20Home"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#1A1A1A] text-[#FBF9F6] border border-[#C5A059] hover:bg-[#C5A059] hover:text-[#1A1A1A] transition-all duration-300 text-[11px] font-sans uppercase tracking-[0.26em] font-semibold shadow-sm active:scale-98"
            >
              <span>DISCUSS A CUSTOM PIECE</span>
              <ArrowUpRight size={14} className="text-[#C5A059]" />
            </Link>
          </div>
        </motion.div>
      </main>

      <SimpleFooter />
    </div>
  )
}
