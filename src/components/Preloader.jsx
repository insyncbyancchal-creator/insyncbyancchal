'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

// Preserved across client-side Next.js route transitions so navigating back to home doesn't re-trigger preloader
let hasShownInSession = false

export default function Preloader() {
  const [shouldRender, setShouldRender] = useState(() => !hasShownInSession)
  const [isExiting, setIsExiting] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef(null)

  const handleExit = () => {
    setIsExiting(true)
    document.body.style.overflow = ''
    setTimeout(() => {
      setShouldRender(false)
    }, 800) // Duration of luxury curtain lift animation
  }

  useEffect(() => {
    if (!shouldRender) return
    hasShownInSession = true
    document.body.style.overflow = 'hidden'

    if (videoRef.current) {
      videoRef.current.defaultMuted = true
      videoRef.current.muted = true
      try {
        videoRef.current.currentTime = 2
      } catch {}
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {})
      }
    }

    // Fast progress bar animation (reaches 100% in ~2.2s)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + (prev < 60 ? 5 : 3)
      })
    }, 60)

    // Fast website opening timer: ensures the preloader opens swiftly without delay
    const fastOpenTimer = setTimeout(() => {
      handleExit()
    }, 2800)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(fastOpenTimer)
      document.body.style.overflow = ''
    }
  }, [shouldRender])

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      try {
        videoRef.current.currentTime = 2
      } catch {}
    }
  }

  const handleSeeked = () => {
    setVideoReady(true)
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }

  const handleCanPlay = () => {
    setVideoReady(true)
  }

  const handleVideoEnded = () => {
    handleExit()
  }

  if (!shouldRender) return null

  return (
    <AnimatePresence>
      <motion.div
        key="insync-video-preloader"
        initial={{ y: 0 }}
        animate={{ y: isExiting ? '-100%' : 0 }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1], // Smooth luxury curtain lift
        }}
        className="fixed inset-0 z-[99999] w-screen h-screen overflow-hidden bg-white text-[#1A1A1A] flex items-center justify-center pointer-events-auto select-none"
      >
        {/* Cinematic Canvas Container */}
        <motion.div
          animate={{
            filter: isExiting ? 'blur(8px)' : 'blur(0px)',
            opacity: isExiting ? 0.4 : 1,
            scale: isExiting ? 1.02 : 1,
          }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
          }}
          className="relative w-full h-full overflow-hidden flex items-center justify-center bg-white"
        >
          {/* Pristine White Luxury Atelier Presentation (Zero Black Screen While Loading) */}
          <div
            className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-white px-6 text-center transition-opacity duration-600 ${
              videoReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            {/* Architectural Monogram Badge */}
            <div className="w-14 h-14 rounded-full border border-[#C5A059]/40 flex items-center justify-center mb-5 bg-[#FAF9F6] shadow-sm">
              <span className="font-serif text-[#C5A059] text-xl font-light tracking-widest">
                IA
              </span>
            </div>

            {/* Brand Title */}
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl tracking-[0.26em] text-[#1A1A1A] uppercase font-light mb-2">
              INSYNC ATELIER
            </h1>

            {/* Subtitle */}
            <p className="text-[11px] sm:text-[12px] font-sans uppercase tracking-[0.3em] text-[#C5A059] font-medium mb-5">
              ARCHITECTURAL SANCTUARY
            </p>

            {/* Loading Indicator */}
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.28em] text-[#888]">
                ENTERING STUDIO...
              </span>
            </div>
          </div>

          {/* Full-Bleed Architectural Video Element - Starts smoothly at 2s */}
          <video
            ref={videoRef}
            autoPlay
            muted
            defaultMuted
            playsInline
            preload="auto"
            onLoadedMetadata={handleLoadedMetadata}
            onCanPlay={handleCanPlay}
            onSeeked={handleSeeked}
            onEnded={handleVideoEnded}
            className={`w-full h-full object-cover pointer-events-none bg-white transition-opacity duration-500 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src="/video/preloader.mp4#t=2" type="video/mp4" />
            <source src="/video/preloder.mp4#t=2" type="video/mp4" />
          </video>

          {/* Gentle Luxury Contrast Tint When Video Is Playing */}
          {videoReady && (
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          )}

          {/* Top Atelier Monogram Bar */}
          <div className="absolute top-6 sm:top-8 inset-x-6 sm:inset-x-12 flex items-center justify-between z-20 pointer-events-none">
            <div className="flex items-center space-x-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
              <span
                className={`text-[11.5px] sm:text-[12px] font-sans uppercase tracking-[0.28em] font-medium transition-colors duration-300 ${
                  videoReady ? 'text-white drop-shadow-md' : 'text-[#1A1A1A]'
                }`}
              >
                INSYNC ATELIER
              </span>
            </div>
            <span
              className={`text-[11px] font-sans uppercase tracking-[0.22em] hidden sm:block transition-colors duration-300 ${
                videoReady ? 'text-white/80 drop-shadow-sm' : 'text-[#777]'
              }`}
            >
              ARCHITECTURAL SANCTUARY
            </span>
          </div>

          {/* Bottom Right: Quick "Enter Studio" Button */}
          <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-12 z-30">
            <button
              onClick={handleExit}
              className={`group flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xs transition-all duration-300 text-[11px] sm:text-[12px] uppercase tracking-[0.22em] font-medium shadow-md cursor-pointer active:scale-95 ${
                videoReady
                  ? 'bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 hover:border-[#C5A059]/60 text-white'
                  : 'bg-white hover:bg-[#F9F7F2] border border-[#C5A059]/40 text-[#1A1A1A]'
              }`}
            >
              <span>ENTER STUDIO</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A059] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Bottom Gold Hairline Progress Bar */}
          <div className="absolute bottom-0 inset-x-0 h-[3px] bg-neutral-200/70 z-30">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-[#C5A059] via-[#E5BA69] to-[#C5A059] shadow-[0_0_12px_rgba(197,160,89,0.8)] transition-all duration-150 ease-out"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
