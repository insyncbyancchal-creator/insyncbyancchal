'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, SlidersHorizontal, MapPin } from 'lucide-react'
import { urlForImage } from '@/sanity/lib/image'
import Link from 'next/link'

export default function ProjectLightboxModal({ project, onClose }) {
  const [activeIdx, setActiveIdx] = useState(0)

  if (!project) return null

  // Extract gallery images or main image
  const images = (project.gallery && project.gallery.length > 0)
    ? project.gallery.map(img => ({
        url: urlForImage(img) || img.url || urlForImage(project.mainImage) || project.mainImage,
        caption: img.caption || img.alt || project.title
      }))
    : [{
        url: urlForImage(project.mainImage) || project.mainImage,
        caption: project.title
      }]

  const nextImg = () => setActiveIdx((prev) => (prev + 1) % images.length)
  const prevImg = () => setActiveIdx((prev) => (prev - 1 + images.length) % images.length)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-12 overflow-hidden"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between z-20 pb-4 border-b border-white/10">
          <div>
            <span className="text-[12px] uppercase tracking-[0.22em] text-[#D4AF37] block font-semibold">
              {project.category} Showcase
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-white">
              {project.title}
            </h3>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href={`/projects/${project.slug}`}
              className="hidden sm:inline-flex items-center space-x-2 text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
            >
              <span>Full Case Study</span>
            </Link>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-black text-white flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Image Display */}
        <div className="relative flex-1 flex items-center justify-center my-6">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              src={images[activeIdx].url}
              alt={images[activeIdx].caption}
              className="max-h-[72vh] max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
            />
          </AnimatePresence>

          {/* Nav Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImg}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:text-[#D4AF37] flex items-center justify-center transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImg}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:text-[#D4AF37] flex items-center justify-center transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Bottom Caption Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#9A9A9E] border-t border-white/10 pt-4 z-20">
          <p className="italic text-white/80 font-serif text-base mb-2 sm:mb-0">
            &ldquo;{images[activeIdx].caption}&rdquo;
          </p>

          <div className="flex items-center space-x-6">
            <span>
              Image {activeIdx + 1} of {images.length}
            </span>
            <Link
              href="/admin"
              target="_blank"
              className="text-[#D4AF37] hover:underline flex items-center space-x-1"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Edit in Sanity</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
