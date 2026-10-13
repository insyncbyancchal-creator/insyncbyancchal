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
    }, 1000) // Duration of luxury curtain lift animation
  }

  useEffect(() => {
    if (!shouldRender) return
    hasShownInSession = true
    document.body.style.overflow = 'hidden'

    if (videoRef.current) {
      videoRef.current.defaultMuted = true
      videoRef.current.muted = true
      // Set to 2 seconds immediately
      try {
        videoRef.current.currentTime = 2
      } catch {}
      videoRef.current.play().catch(() => {})
    }

    // Fallback to show video smoothly if seeked event takes too long
    const readyTimer = setTimeout(() => {
      setVideoReady(true)
    }, 350)

    // Safety fallback timer: Ensure user enters smoothly even if video hangs
    const safetyTimer = setTimeout(() => {
      handleExit()
    }, 7500)

    return () => {
      clearTimeout(readyTimer)
      clearTimeout(safetyTimer)
      document.body.style.overflow = ''
    }
  }, [shouldRender])

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 2
    }
  }

  const handleSeeked = () => {
    setVideoReady(true)
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const cur = Math.max(0, videoRef.current.currentTime - 2)
      const total = Math.max(1, videoRef.current.duration - 2)
      const pct = (cur / total) * 100
      setProgress(Math.min(100, Math.max(0, pct)))
    }
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
          duration: 1.0,
          ease: [0.76, 0, 0.24, 1], // Smooth luxury curtain lift
        }}
        className="fixed inset-0 z-[99999] w-screen h-screen overflow-hidden bg-[#0A0A0C] text-white flex items-center justify-center pointer-events-auto select-none"
      >
        {/* Cinematic Video Canvas */}
        <motion.div
          animate={{
            filter: isExiting ? 'blur(10px)' : 'blur(0px)',
            opacity: isExiting ? 0.3 : 1,
            scale: isExiting ? 1.03 : 1,
          }}
          transition={{
            duration: 0.65,
            ease: 'easeOut',
          }}
          className="relative w-full h-full overflow-hidden flex items-center justify-center"
        >
          {/* Full-Bleed Architectural Video Element - Starts smoothly at 2s */}
          <video
            ref={videoRef}
            autoPlay
            muted
            defaultMuted
            playsInline
            preload="auto"
            onLoadedMetadata={handleLoadedMetadata}
            onSeeked={handleSeeked}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
            className={`w-full h-full object-cover pointer-events-none transition-opacity duration-400 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src="/video/preloader.mp4#t=2" type="video/mp4" />
            <source src="/video/preloder.mp4#t=2" type="video/mp4" />
          </video>

          {/* Gentle Luxury Vignette Lighting */}
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/20 to-black/60 pointer-events-none" />

          {/* Top Atelier Monogram Bar */}
          <div className="absolute top-6 sm:top-8 inset-x-6 sm:inset-x-12 flex items-center justify-between z-20 pointer-events-none">
            <div className="flex items-center space-x-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
              <span className="text-[11.5px] sm:text-[12px] font-sans uppercase tracking-[0.28em] text-[#E5BA69] font-medium drop-shadow-md">
                INSYNC ATELIER
              </span>
            </div>
            <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-white/75 hidden sm:block">
              ARCHITECTURAL SANCTUARY
            </span>
          </div>

          {/* Bottom Right: Quick "Skip Intro" Button */}
          <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-12 z-30">
            <button
              onClick={handleExit}
              className="group flex items-center gap-2.5 px-4 sm:px-5 py-2 bg-black/45 hover:bg-black/80 backdrop-blur-md border border-white/20 hover:border-[#C5A059]/60 text-white rounded-xs transition-all duration-300 text-[11px] sm:text-[12px] uppercase tracking-[0.22em] font-medium shadow-md cursor-pointer active:scale-95"
            >
              <span>ENTER STUDIO</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A059] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Bottom Gold Hairline Progress Bar */}
          <div className="absolute bottom-0 inset-x-0 h-[2.5px] bg-white/10 z-30">
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
