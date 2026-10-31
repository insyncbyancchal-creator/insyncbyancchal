"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Plus,
  Play,
  Pause,
  Maximize2,
} from "lucide-react";
import styles from "./ProjectGallery.module.css";

export default function ProjectGallery({ project }) {
  const [activeLightboxIdx, setActiveLightboxIdx] = useState(null);
  const [isLbPlaying, setIsLbPlaying] = useState(true);
  const lbTimerRef = useRef(null);

  // Extract gallery items from project (real Sanity images take priority)
  const baseGallery = Array.isArray(project?.gallery)
    ? project.gallery.filter((g) => Boolean(g?.src))
    : [];

  // If main cover exists and is not already in baseGallery, include it at the start
  const hasCoverInGallery = baseGallery.some((g) => g.src === project?.cover?.src);
  const coverItem =
    project?.cover?.src && !hasCoverInGallery
      ? [
          {
            src: project.cover.src,
            alt: project.cover.alt || project.title,
            caption: "Primary Elevation",
            aspectRatio: "16 / 10",
          },
        ]
      : [];

  const gallery = [...coverItem, ...baseGallery];

  const total = gallery.length;
  const hasItems = total > 0;

  // -------------------------------------------------------------
  // Fullscreen Lightbox Handlers & Autoplay
  // -------------------------------------------------------------
  const openLightbox = (idx) => {
    setActiveLightboxIdx(idx);
    setIsLbPlaying(true);
  };

  const closeLightbox = () => {
    setActiveLightboxIdx(null);
  };

  const handleLbNext = useCallback(() => {
    setActiveLightboxIdx((prev) => {
      if (prev === null) return null;
      return prev < total - 1 ? prev + 1 : 0;
    });
  }, [total]);

  const handleLbPrev = useCallback(() => {
    setActiveLightboxIdx((prev) => {
      if (prev === null) return null;
      return prev > 0 ? prev - 1 : total - 1;
    });
  }, [total]);

  // Touch Swipe Navigation for Lightbox (Mobile & Tablet)
  const lbTouchStartX = useRef(0);
  const handleLbTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      lbTouchStartX.current = e.touches[0].clientX;
    }
  };
  const handleLbTouchEnd = (e) => {
    if (e.changedTouches && e.changedTouches[0]) {
      const diff = lbTouchStartX.current - e.changedTouches[0].clientX;
      if (diff > 45) {
        handleLbNext(); // swipe left -> next image
      } else if (diff < -45) {
        handleLbPrev(); // swipe right -> previous image
      }
    }
  };

  // Automatic Autoplay for Fullscreen Lightbox (Brisk, increased speed)
  useEffect(() => {
    if (activeLightboxIdx === null || !isLbPlaying) {
      if (lbTimerRef.current) clearInterval(lbTimerRef.current);
      return;
    }

    const durationMs = 2200; // Increased speed for brisk auto slideshow

    lbTimerRef.current = setInterval(() => {
      handleLbNext();
    }, durationMs);

    return () => {
      if (lbTimerRef.current) clearInterval(lbTimerRef.current);
    };
  }, [activeLightboxIdx, isLbPlaying, handleLbNext]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (activeLightboxIdx === null) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") handleLbPrev();
      if (e.key === "ArrowRight") handleLbNext();
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        setIsLbPlaying((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeLightboxIdx, handleLbPrev, handleLbNext]);

  // Lock body scroll when Lightbox is active
  useEffect(() => {
    if (activeLightboxIdx !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeLightboxIdx]);

  if (!hasItems) {
    return (
      <div className="py-16 px-6 max-w-2xl mx-auto my-12 text-center border border-dashed border-[#C5A059]/40 bg-[#FAF7F2] rounded-none">
        <span className="font-serif text-2xl text-[#C5A059] block mb-2 font-light tracking-wide">
          INSYNC
        </span>
        <div className="w-8 h-[1px] bg-[#C5A059] mx-auto mb-3" />
        <p className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#1A1A1A] font-semibold mb-1.5">
          PHOTOGRAPHY IN CURATION
        </p>
        <p className="text-[12.5px] text-[#6E6860] font-light leading-relaxed">
          The high-resolution architectural captures for this commission are currently being prepared for the portfolio exhibition.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.galleryRoot}>
      {/* -------------------------------------------------------------
          Top Architectural Control Bar
          ------------------------------------------------------------- */}
      <div className={styles.controlBar} role="toolbar" aria-label="Gallery exhibition controls">
        {/* Left: Plates info badge */}
        <div className={styles.barLeft}>
          <span className={styles.plateEyebrow}>GALLERY EXHIBITION</span>
          <span className={styles.plateCounter}>
            {String(total).padStart(2, "0")} PLATES
          </span>
        </div>

        {/* Right: Fullscreen action */}
        <div className={styles.barRight}>
          <button
            type="button"
            onClick={() => openLightbox(0)}
            className={styles.actionBtn}
            aria-label="View in fullscreen lightbox"
          >
            <Maximize2 size={12} />
            <span>FULLSCREEN</span>
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------
          Editorial Architectural Mosaic (Hardware-Accelerated 60fps)
          ------------------------------------------------------------- */}
      <div className={styles.masonry} role="region" aria-label="Editorial photo mosaic">
        {gallery.map((item, index) => (
          <motion.div
            key={item.src + index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "60px 0px" }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            className={styles.mosaicCard}
            onClick={() => openLightbox(index)}
            tabIndex={0}
            role="button"
            aria-label={`View photo ${index + 1}: ${item.caption || item.alt || project.title}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openLightbox(index);
              }
            }}
          >
            <div
              className={styles.mosaicFrame}
              style={{ aspectRatio: item.aspectRatio || "4 / 3" }}
            >
              <img
                src={item.src}
                alt={item.alt || `${project.title} photo ${index + 1}`}
                className={styles.mosaicImg}
                loading={index < 4 ? "eager" : "lazy"}
                decoding="async"
              />

              {/* Silky Architectural Shutter Curtain Wipe */}
              <motion.div
                className={styles.shutterCurtain}
                initial={{ y: "0%" }}
                whileInView={{ y: "-102%" }}
                viewport={{ once: true, margin: "0px 0px -20px 0px" }}
                transition={{
                  duration: 0.72,
                  delay: (index % 3) * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />

              {/* Frosted Viewfinder Overlay on Hover */}
              <div className={styles.mosaicOverlay} aria-hidden="true">
                <div className={styles.viewfinderTop}>
                  <span>PLATE {String(index + 1).padStart(2, "0")}</span>
                  <span>{project.location}</span>
                </div>

                <div className={styles.viewfinderCenter}>
                  <Plus size={16} />
                </div>

                <div className={styles.viewfinderBottom}>
                  {item.caption || project.title}
                </div>
              </div>
            </div>

            {/* Static Card Meta underneath */}
            <div className={styles.mosaicDetails}>
              <span className={styles.mosaicPlate}>PLATE NO. {String(index + 1).padStart(2, "0")}</span>
              <span className={styles.mosaicCap}>{item.caption || project.type}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* -------------------------------------------------------------
          Fullscreen Luxury Lightbox (Autoplay + Dedicated Pause Button)
          ------------------------------------------------------------- */}
      <AnimatePresence>
        {activeLightboxIdx !== null && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            {/* Top Bar with Autoplay Progress Line & Controls */}
            <div className={styles.lbHeader} onClick={(e) => e.stopPropagation()}>
              <div className={styles.lbHeaderTop}>
                <span className={styles.lbTitle}>{project.title} &bull; {project.location}</span>
                <span className={styles.lbCount}>
                  PLATE {String(activeLightboxIdx + 1).padStart(2, "0")} OF {String(total).padStart(2, "0")}
                </span>
                
                <div className={styles.lbActions}>
                  {/* Fullscreen Pause / Resume Button */}
                  <button
                    type="button"
                    onClick={() => setIsLbPlaying((prev) => !prev)}
                    className={`${styles.lbPlaybackBtn} ${!isLbPlaying ? styles.lbPlaybackBtnPaused : ""}`}
                    aria-label={isLbPlaying ? "Pause fullscreen exhibition" : "Resume fullscreen exhibition"}
                    title={isLbPlaying ? "Pause autoplay to stop and inspect" : "Resume autoplay"}
                  >
                    {isLbPlaying ? <Pause size={12} /> : <Play size={12} />}
                    <span>{isLbPlaying ? "PAUSE" : "RESUME"}</span>
                  </button>

                  {/* Close Fullscreen Button */}
                  <button
                    type="button"
                    onClick={closeLightbox}
                    className={styles.lbClose}
                    aria-label="Close image viewer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Center Image Stage with Next/Prev Buttons & Native Touch Swipe */}
            <div
              className={styles.lbStage}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleLbTouchStart}
              onTouchEnd={handleLbTouchEnd}
            >
              <button
                type="button"
                onClick={handleLbPrev}
                className={`${styles.lbNavBtn} ${styles.lbPrev}`}
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={gallery[activeLightboxIdx].src}
                  src={gallery[activeLightboxIdx].src}
                  alt={gallery[activeLightboxIdx].alt || project.title}
                  className={styles.lbImg}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                />
              </AnimatePresence>

              <button
                type="button"
                onClick={handleLbNext}
                className={`${styles.lbNavBtn} ${styles.lbNext}`}
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className={styles.lbFooter} onClick={(e) => e.stopPropagation()}>
              {gallery[activeLightboxIdx].caption ||
                gallery[activeLightboxIdx].alt ||
                project.tagline ||
                project.title}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
