'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HeroSection() {
  const heroSlides = [
    {
      id: 1,
      type: 'image',
      category: 'Bespoke Architectural Villa · Ludhiana',
      rawTitle: 'Monolithic Architecture and Quiet Spatial Stillness',
      title: (
        <>
          MONOLITHIC ARCHITECTURE{' '}
          <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">and quiet</span>{' '}
          SPATIAL STILLNESS
        </>
      ),
      description:
        'Double-height travertine stone volumes, fluted oak millwork, and private landscaped courtyard views resolved into one continuous sanctuary.',
      image: '/hero/photo_1.avif',
      fallbackCandidates: ['/hero/photo_1.jpg', '/hero/photo_3.jpg'],
    },
    {
      id: 2,
      type: 'video',
      category: 'The Solstice Sky Penthouse · Gurugram',
      rawTitle: 'Sky Sanctuary Living at Panoramic Urban Scale',
      title: (
        <>
          SKY SANCTUARY{' '}
          <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">living at</span>{' '}
          PANORAMIC URBAN SCALE
        </>
      ),
      description:
        'Suspended bronze fireplace reveals, full-height bookmatched Calacatta marble, and private sunset terraces overlooking the skyline.',
      video: '/hero/video_2.mp4',
      fallbackCandidates: ['/hero/photo_1.avif', '/hero/photo_3.jpg'],
    },
    {
      id: 3,
      type: 'image',
      category: 'Oasis Wellness Residence · Chandigarh',
      rawTitle: 'Harmonizing Light, Water and Venetian Plaster',
      title: (
        <>
          <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">harmonizing</span>{' '}
          LIGHT, WATER{' '}
          <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">and</span>{' '}
          VENETIAN PLASTER
        </>
      ),
      description:
        'Indoor reflecting pools, acoustic ceiling slat baffles, and circadian rhythm architectural lighting composed with natural restraint.',
      image: '/hero/photo_3.jpg?v=2',
      fallbackCandidates: ['/hero/photo_3.jpg', '/hero/photo_1.avif', '/hero/photo_5.jpg'],
    },
    {
      id: 4,
      type: 'video',
      category: 'Celica Duplex Estate · Kolkata',
      rawTitle: 'Warm Curved Plaster and Organic Living',
      title: (
        <>
          WARM CURVED PLASTER{' '}
          <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">and organic</span>{' '}
          LIVING
        </>
      ),
      description:
        'Serene five thousand square foot duplex conceived with warm hand-troweled clay reliefs, tactile boucle seating, and natural linen textures.',
      video: '/hero/video_4.mp4',
      fallbackCandidates: ['/hero/photo_3.jpg', '/hero/photo_5.jpg'],
    },
    {
      id: 5,
      type: 'image',
      category: 'Villa Riviera Estates · Goa',
      rawTitle: 'Seamless Indoor-Outdoor Coastal Architecture',
      title: (
        <>
          SEAMLESS{' '}
          <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">indoor-outdoor</span>{' '}
          COASTAL ARCHITECTURE
        </>
      ),
      description:
        'Hand-carved laterite stone pillars, motorized bronze window louvers, and shaded poolside terraces designed for tropical tranquility.',
      image: '/hero/photo_5.jpg',
      fallbackCandidates: ['/hero/photo_5.avif', '/hero/photo_3.jpg'],
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const [mediaLoaded, setMediaLoaded] = useState({})
  const [imgSrcs, setImgSrcs] = useState(() => {
    const map = {}
    heroSlides.forEach((s) => {
      if (s.image) map[s.id] = s.image
    })
    return map
  })
  const [videoFailed, setVideoFailed] = useState({})

  const markLoaded = useCallback((id) => {
    setMediaLoaded((prev) => (prev[id] ? prev : { ...prev, [id]: true }))
  }, [])

  // Preload detection for cached or fast-loading images
  useEffect(() => {
    heroSlides.forEach((slide) => {
      if (slide.image) {
        const testImg = new Image()
        testImg.src = slide.image
        if (testImg.complete && testImg.naturalWidth > 0) {
          markLoaded(slide.id)
        } else {
          testImg.onload = () => markLoaded(slide.id)
        }
      }
    })
  }, [markLoaded])

  // Slide rotation timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  const handleImageFallback = (slideId, candidates = []) => {
    setImgSrcs((prev) => {
      const current = prev[slideId]
      const idx = candidates.indexOf(current)
      if (idx !== -1 && idx + 1 < candidates.length) {
        return { ...prev, [slideId]: candidates[idx + 1] }
      } else if (idx === -1 && candidates.length > 0) {
        return { ...prev, [slideId]: candidates[0] }
      }
      return prev
    })
  }

  // Touch Swipe Navigation for Mobile & Tablet
  const touchStartX = useRef(0)
  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      touchStartX.current = e.touches[0].clientX
    }
  }
  const handleTouchEnd = (e) => {
    if (e.changedTouches && e.changedTouches[0]) {
      const diff = touchStartX.current - e.changedTouches[0].clientX
      if (diff > 45) {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
      } else if (diff < -45) {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
      }
    }
  }

  const currentSlideObj = heroSlides[currentSlide]
  const isCurrentLoaded = Boolean(mediaLoaded[currentSlideObj.id])

  return (
    <section
      className="relative h-screen w-full bg-white text-[#1A1A1A] overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Stacked Full-Bleed Background Media for Seamless Cross-Fade */}
      <div className="absolute inset-0 z-0 bg-white">
        {heroSlides.map((slide, idx) => {
          const isActive = idx === currentSlide
          const isLoaded = Boolean(mediaLoaded[slide.id])
          const isVideo = slide.type === 'video' && !videoFailed[slide.id]

          return (
            <motion.div
              key={slide.id}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 1.05,
              }}
              transition={{
                opacity: { duration: 1.4, ease: [0.25, 1, 0.5, 1] },
                scale: { duration: 7, ease: 'linear' },
              }}
              className="absolute inset-0 pointer-events-none bg-white will-change-transform transform-gpu"
            >
              {/* Pristine White Loading Placeholder - Zero Black Screen */}
              {!isLoaded && isActive && (
                <div className="absolute inset-0 z-[2] bg-white flex flex-col items-center justify-center pointer-events-none">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse [animation-delay:300ms]" />
                  </div>
                </div>
              )}

              {isVideo ? (
                <video
                  src={slide.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onLoadedData={() => markLoaded(slide.id)}
                  onCanPlay={() => markLoaded(slide.id)}
                  onError={() => {
                    setVideoFailed((prev) => ({ ...prev, [slide.id]: true }))
                  }}
                  className={`w-full h-full object-cover bg-white filter brightness-[1.02] contrast-[1.03] saturate-[1.05] transition-opacity duration-700 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ) : null}

              {/* Image element (used directly for image slides or as fallback if video is unplayable) */}
              {(!isVideo || videoFailed[slide.id] || slide.image) ? (
                <img
                  ref={(el) => {
                    if (el && el.complete && el.naturalWidth > 0) {
                      markLoaded(slide.id)
                    }
                  }}
                  src={
                    videoFailed[slide.id]
                      ? (slide.fallbackCandidates && slide.fallbackCandidates[0]) || '/hero/photo_1.avif'
                      : imgSrcs[slide.id] || slide.image
                  }
                  alt={slide.rawTitle || slide.category}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={idx === 0 ? 'high' : 'auto'}
                  onLoad={() => markLoaded(slide.id)}
                  onError={() => handleImageFallback(slide.id, slide.fallbackCandidates)}
                  className={`w-full h-full object-cover bg-white filter brightness-[1.02] contrast-[1.03] saturate-[1.05] transition-opacity duration-700 ${
                    isVideo && !videoFailed[slide.id] ? 'absolute inset-0 -z-10' : ''
                  } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
              ) : null}
            </motion.div>
          )
        })}
      </div>

      {/* Gentle radiant ambient lighting - only visible when media is loaded so background stays pure white when not loaded */}
      <div
        className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/40 to-transparent pointer-events-none z-1 transition-opacity duration-700 ${
          isCurrentLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none z-1 transition-opacity duration-700 ${
          isCurrentLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className={`absolute inset-y-0 left-0 w-full sm:w-2/3 bg-gradient-to-r from-black/45 via-black/15 to-transparent pointer-events-none z-1 transition-opacity duration-700 ${
          isCurrentLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Bottom-Left Anchored Architectural Content Block */}
      <div className="absolute bottom-10 sm:bottom-14 md:bottom-16 left-6 sm:left-12 lg:left-16 z-10 max-w-3xl text-left">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow: Category · Location */}
            <div className="flex items-center gap-3 mb-2.5">
              <p
                className={`text-[12.5px] sm:text-[13px] font-sans uppercase tracking-[0.2em] font-semibold transition-colors duration-500 ${
                  isCurrentLoaded
                    ? 'text-[#E5BA69] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]'
                    : 'text-[#C5A059]'
                }`}
              >
                {currentSlideObj.category}
              </p>
            </div>

            {/* Main Headline - Styled with Bodoni Moda & MonteCarlo Italian Cursive */}
            <h1
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-serif font-light tracking-[0.05em] sm:tracking-[0.06em] leading-[1.22] mb-3 sm:mb-4 transition-colors duration-500 ${
                isCurrentLoaded
                  ? 'text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]'
                  : 'text-[#1A1A1A]'
              }`}
            >
              {currentSlideObj.title}
            </h1>

            {/* Description Paragraph */}
            <p
              className={`text-[15px] sm:text-[16px] font-normal leading-[1.75] max-w-xl mb-5 sm:mb-7 transition-colors duration-500 ${
                isCurrentLoaded
                  ? 'text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]'
                  : 'text-[#555048]'
              }`}
            >
              {currentSlideObj.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Pagination Indicators */}
        <div className="flex items-center gap-2 pt-1" aria-label="Slide indicators">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`p-2 -m-2 transition-all duration-300 rounded-none cursor-pointer active:scale-90 touch-manipulation`}
              aria-label={`Go to slide ${idx + 1}`}
            >
              <span
                className={`block transition-all duration-300 rounded-none ${
                  idx === currentSlide
                    ? isCurrentLoaded
                      ? 'w-7 sm:w-8 h-1.5 sm:h-2 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                      : 'w-7 sm:w-8 h-1.5 sm:h-2 bg-[#1A1A1A] shadow-[0_0_8px_rgba(0,0,0,0.2)]'
                    : isCurrentLoaded
                    ? 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 hover:bg-white/75'
                    : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#1A1A1A]/25 hover:bg-[#1A1A1A]/50'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
