'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Compass, Home, Layers, PackageCheck, Truck, Diamond } from 'lucide-react'

export default function ServicesShowcase() {
  const services = [
    {
      id: 's1',
      title: 'Architectural Planning',
      description: 'Spatial space planning, structural reconfiguration, 3D architectural modeling, and material specification.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      icon: Compass,
    },
    {
      id: 's2',
      title: 'Interior Design',
      description: 'Bespoke interior curation, ceiling reveals, fluted stone details, lighting calculations, and ambient wall textures.',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop',
      icon: Layers,
    },
    {
      id: 's3',
      title: 'Global Sourcing',
      description: 'Direct global procurement of rare marbles, custom Italian furniture, hand-loomed silk rugs, and architectural fixtures.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
      icon: PackageCheck,
    },
    {
      id: 's4',
      title: 'White-Glove Installation',
      description: 'Logistical management, precise structural installation, and final site styling by our master craftsmen.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
      icon: Truck,
    },
    {
      id: 's5',
      title: 'INSYNC HOME',
      badge: 'Bespoke Collection',
      description: 'Exclusive home décor products available for purchase, customized to align with your personal residence.',
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop',
      icon: Home,
    },
  ]

  return (
    <section id="services" className="py-28 md:py-36 px-6 md:px-12 bg-[#FBF9F6] text-[#1A1A1A] relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1A1A1A]/10 pb-8">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-[#C5A059]/40 bg-[#F3F0EA] shadow-sm mb-3">
              <Diamond className="w-3 h-3 text-[#C5A059]" />
              <span className="text-[12px] uppercase tracking-[0.22em] text-[#C5A059] font-medium font-serif">
                Our Capabilities
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#1A1A1A]">
              Bespoke <span className="montecarlo-regular italic font-normal text-[#C5A059]">Design Services</span>
            </h2>
          </div>

          <p className="text-[13px] text-[#555048] uppercase tracking-[0.16em] max-w-xs leading-relaxed font-normal">
            END-TO-END ARCHITECTURAL & INTERIOR EXECUTION
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="group relative bg-[#F3F0EA] rounded-2xl overflow-hidden p-8 border border-[#1A1A1A]/08 flex flex-col justify-between space-y-8 hover:border-[#C5A059]/40 transition-all duration-500 shadow-sm hover:shadow-xl"
              >
                {/* Background Image Container */}
                <div className="relative h-48 rounded-xl overflow-hidden bg-[#1A1A1A]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                  {service.badge && (
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#C5A059] text-[#1A1A1A] text-[9px] uppercase tracking-widest font-semibold">
                      {service.badge}
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[#C5A059]">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-serif text-2xl text-[#1A1A1A] font-light group-hover:text-[#C5A059] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-[#66625C] leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1A1A1A]/10 flex items-center justify-between text-xs text-[#1A1A1A]">
                  <span className="uppercase tracking-widest text-[10px] font-semibold">Inquire Service</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
