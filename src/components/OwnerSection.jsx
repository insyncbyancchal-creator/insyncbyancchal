'use client'

import { motion } from 'framer-motion'
import { Diamond, Mail } from 'lucide-react'

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function OwnerSection() {
  return (
    <section id="about" className="py-28 md:py-36 px-6 md:px-12 bg-[#F3F0EA] text-[#1A1A1A] relative border-t border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex items-center space-x-3 border-b border-[#1A1A1A]/10 pb-4">
          <Diamond className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
            Principal & Founder
          </span>
        </div>

        {/* Editorial 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Portrait Image */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="relative h-[480px] md:h-[600px] rounded-2xl overflow-hidden bg-[#1A1A1A] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop"
                alt="Anchal - Founder & Lead Interior Designer of Insync Interiors"
                className="w-full h-full object-cover filter contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-[#FBF9F6]/90 backdrop-blur-md border border-[#1A1A1A]/10 shadow-lg">
                <span className="font-serif text-xl text-[#1A1A1A] block font-light">Anchal</span>
                <span className="text-[12px] uppercase tracking-[0.2em] text-[#C5A059] block font-semibold mt-1">
                  Founder & Principal Designer
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Story */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-3">
              <span className="text-[12.5px] uppercase tracking-[0.22em] text-[#C5A059] font-semibold block">
                MEET ANCHAL
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-[34px] lg:text-[40px] font-light text-[#1A1A1A] leading-[1.22] tracking-tight">
                Designing Spaces with <span className="montecarlo-regular italic font-normal text-[#C5A059]">Quiet Elegance</span>
              </h2>
              <div className="w-16 h-[1px] bg-[#C5A059] mt-3 mb-1" />
            </div>

            <div className="space-y-4 text-[13px] text-[#6B665F] font-light leading-[1.7]">
              <p>
                As the founder of INSYNC INTERIORS, Anchal brings an intuitive eye for proportion, light, and architectural materiality. Her work is guided by the belief that a well-conceived interior should feel like a natural extension of its surroundings—refined, serene, and enduring.
              </p>
              <p>
                From curating high-end private residences across India to crafting custom interior accents under <strong className="text-[#1A1A1A] font-medium">INSYNC HOME</strong>, Anchal directs every single commission with personal dedication and attention to detail.
              </p>
            </div>

            <div className="pt-6 flex flex-wrap items-center gap-6 border-t border-[#1A1A1A]/10">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#1A1A1A] hover:text-[#C5A059] transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-[#C5A059]" />
                <span>Instagram Profile</span>
              </a>

              <a
                href="mailto:contact@insyncinteriors.com"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#1A1A1A] hover:text-[#C5A059] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#C5A059]" />
                <span>Studio Email</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
