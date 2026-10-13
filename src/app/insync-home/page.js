'use client'

import Navbar from '@/components/Navbar'
import SimpleFooter from '@/components/SimpleFooter'
import { motion } from 'framer-motion'

export default function InsyncHomePage() {
  const decorProducts = [
    {
      id: 'd1',
      name: 'Monolithic Travertine Vessel',
      category: 'Sculptural Vessels',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
      description: 'Hand-carved Italian travertine vessel with natural honed finish.',
    },
    {
      id: 'd2',
      name: 'Fluted Brass Wall Sconce',
      category: 'Architectural Lighting',
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop',
      description: 'Patinated champagne brass wall fixture emitting ambient halo light.',
    },
    {
      id: 'd3',
      name: 'Bespoke Silk & Wool Floor Coverings',
      category: 'Textiles & Rugs',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      description: 'Hand-knotted organic wool rug tailored to custom residence dimensions.',
    },
  ]

  return (
    <div className="bg-[#FBF9F6] text-[#1A1A1A] min-h-screen pt-36">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 pb-24">
        {/* Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-semibold block">
            CURATED HOME DÉCOR COLLECTION
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-[#1A1A1A] font-light">
            INSYNC <span className="montecarlo-regular italic font-normal text-[#C5A059]">HOME</span>
          </h1>
          <p className="text-sm text-[#66625C] font-light leading-relaxed">
            Insync Home offers exclusive bespoke home décor products available for purchase, with full customization to align with your personal residence specifications.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {decorProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#F3F0EA] rounded-2xl overflow-hidden p-6 border border-[#1A1A1A]/08 space-y-4 editorial-card"
            >
              <div className="h-64 rounded-xl overflow-hidden bg-[#1A1A1A]">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-semibold block">
                {product.category}
              </span>
              <h3 className="font-serif text-2xl text-[#1A1A1A] font-light">{product.name}</h3>
              <p className="text-xs text-[#66625C] leading-relaxed font-light">{product.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <SimpleFooter />
    </div>
  )
}
