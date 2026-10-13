'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin, Maximize2 } from 'lucide-react'
import { urlForImage } from '@/sanity/lib/image'

export default function ProjectCard({ project, onOpenLightbox }) {
  const imageUrl = urlForImage(project.mainImage) || project.mainImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative rounded-2xl overflow-hidden glass-panel border-gold-glow flex flex-col justify-between"
    >
      {/* Thumbnail Container */}
      <div className="relative h-[340px] md:h-[400px] w-full overflow-hidden bg-black">
        <img
          src={imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Category Pill */}
        <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full glass-panel border border-[#D4AF37]/40 text-[11.5px] uppercase tracking-[0.18em] text-[#D4AF37] font-semibold">
          {project.category}
        </div>

        {/* Lightbox Quick View Button */}
        {onOpenLightbox && (
          <button
            onClick={() => onOpenLightbox(project)}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/80 hover:text-[#D4AF37] hover:border-[#D4AF37] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            title="Expand Gallery Lightbox"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}

        {/* Bottom Details Overlay */}
        <div className="absolute bottom-6 left-6 right-6 z-10">
          <div className="flex items-center space-x-2 text-xs text-[#D4AF37] font-medium mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{project.location || 'Bespoke Location'}</span>
            <span className="text-white/30">•</span>
            <span>{project.year || '2024'}</span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl text-white font-light group-hover:text-gold-gradient transition-colors">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Card Footer Info */}
      <div className="p-6 flex items-center justify-between border-t border-white/10 bg-[#0C0C0E]">
        <p className="text-xs text-[#9A9A9E] line-clamp-2 max-w-[80%] leading-relaxed">
          {project.summary}
        </p>

        <Link
          href={`/projects/${project.slug}`}
          className="w-10 h-10 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black flex items-center justify-center transition-all shrink-0 ml-3"
          title="View Full Project Case Study"
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  )
}
