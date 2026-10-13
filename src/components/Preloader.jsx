'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

let preloaderShownInSession = false

export default function Preloader() {
  const [shouldRender, setShouldRender] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        if (preloaderShownInSession || sessionStorage.getItem('insync_preloader_seen')) {
          return false
        }
      } catch {}
    }
    return !preloaderShownInSession
  })
  const [isExiting, setIsExiting] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef(null)
  const hasSeekedRef = useRef(false)

  const handleExit = () => {
    try {
      sessionStorage.setItem('insync_preloader_seen', 'true')
      preloaderShownInSession = true
    } catch {}
    setIsExiting(true)
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
    setTimeout(() => {
      setShouldRender(false)
    }, 850) // Duration of luxury curtain lift animation
  }

  useEffect(() => {
    if (!shouldRender) {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = ''
      }
      return
    }

    try {
      sessionStorage.setItem('insync_preloader_seen', 'true')
      preloaderShownInSession = true
    } catch {}

    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden'
    }

    const video = videoRef.current
    if (video) {
      video.muted = true
      video.defaultMuted = true
      video.playsInline = true

      const initPlaybackAfterOneSecond = () => {
        if (!hasSeekedRef.current) {
          hasSeekedRef.current = true
          try {
            // Start video playback after 1st second (skip 0:00 - 1:00)
            video.currentTime = 1.0
          } catch {
            // Graceful fallback if seeking before buffer
          }
        }
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              if (video.currentTime >= 0.9) {
                setVideoReady(true)
              }
            })
            .catch(() => {
              setVideoReady(true)
            })
        }
      }

      if (video.readyState >= 1) {
        initPlaybackAfterOneSecond()
      } else {
        video.addEventListener('loadedmetadata', initPlaybackAfterOneSecond, { once: true })
      }
    }

    // Fallback: reveal video once buffered if seeked
    const fallbackTimer = setTimeout(() => {
      setVideoReady(true)
    }, 450)

    // Safety timeout: ensure website opens if video finishes or encounters issues
    const safetyTimer = setTimeout(() => {
      handleExit()
    }, 14000)

    return () => {
      clearTimeout(fallbackTimer)
      clearTimeout(safetyTimer)
      if (typeof document !== 'undefined') {
        document.body.style.overflow = ''
      }
    }
  }, [shouldRender])

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (video && video.duration) {
      const startTime = 1.0
      const totalPlayable = Math.max(0.1, video.duration - startTime)
      const currentElapsed = Math.max(0, video.currentTime - startTime)
      const pct = (currentElapsed / totalPlayable) * 100
      setProgress(Math.min(100, Math.max(0, pct)))

      if (video.currentTime >= 0.95 && !videoReady) {
        setVideoReady(true)
      }
    }
  }

  const handleVideoEnded = () => {
    setProgress(100)
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
          duration: 0.85,
          ease: [0.76, 0, 0.24, 1], // Smooth luxury curtain lift
        }}
        className="fixed inset-0 z-[99999] w-screen h-screen overflow-hidden bg-[#FBF9F6] text-[#1A1A1A] flex items-center justify-center pointer-events-auto select-none"
      >
        {/* Cinematic Canvas Container */}
        <motion.div
          animate={{
            filter: isExiting ? 'blur(8px)' : 'blur(0px)',
            opacity: isExiting ? 0.35 : 1,
            scale: isExiting ? 1.02 : 1,
          }}
          transition={{
            duration: 0.55,
            ease: 'easeOut',
          }}
          className="relative w-full h-full overflow-hidden flex items-center justify-center bg-[#FBF9F6]"
        >
          {/* Pristine Luxury White Loading Backdrop with Gold Brand Monogram */}
          <div
            className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#FBF9F6] transition-opacity duration-700 pointer-events-none ${
              videoReady ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="flex flex-col items-center space-y-3.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#C5A059] animate-pulse" />
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.28em] text-[#1A1A1A] font-light">
                INSYNC
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-[0.38em] uppercase text-[#C5A059] font-semibold">
                ATELIER
              </span>
            </div>
          </div>

          {/* Full-Bleed Architectural Video Element */}
          <video
            ref={videoRef}
            src="/video/preloader.mp4"
            autoPlay
            muted
            defaultMuted
            playsInline
            preload="auto"
            onSeeked={() => setVideoReady(true)}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
            className={`w-full h-full object-cover pointer-events-none transition-opacity duration-700 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Gentle Luxury Contrast Vignette (only over playing video) */}
          <div
            className={`absolute inset-0 bg-black/20 pointer-events-none transition-opacity duration-700 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Top Atelier Monogram Bar */}
          <div className="absolute top-6 sm:top-8 inset-x-6 sm:inset-x-12 flex items-center justify-between z-20 pointer-events-none">
            <div className="flex items-center space-x-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
              <span
                className={`text-[11.5px] sm:text-[12px] font-sans uppercase tracking-[0.28em] font-medium transition-colors duration-500 ${
                  videoReady ? 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]' : 'text-[#1A1A1A]'
                }`}
              >
                INSYNC ATELIER
              </span>
            </div>
            <span
              className={`text-[11px] font-sans uppercase tracking-[0.22em] hidden sm:block transition-colors duration-500 ${
                videoReady ? 'text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]' : 'text-[#7A746B]'
              }`}
            >
              ARCHITECTURAL SANCTUARY
            </span>
          </div>

          {/* Bottom Right: Quick "Enter Studio" Button */}
          <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-12 z-30">
            <button
              onClick={handleExit}
              className="group flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xs transition-all duration-300 text-[11px] sm:text-[12px] uppercase tracking-[0.22em] font-medium shadow-md cursor-pointer active:scale-95 bg-black/70 hover:bg-black backdrop-blur-md border border-[#C5A059]/40 hover:border-[#C5A059] text-white"
            >
              <span>ENTER STUDIO</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A059] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Bottom Gold Hairline Progress Bar */}
          <div className="absolute bottom-0 inset-x-0 h-[3px] bg-black/10 z-30">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-[#C5A059] via-[#E5BA69] to-[#C5A059] shadow-[0_0_12px_rgba(197,160,89,0.8)] transition-all duration-100 ease-out"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
