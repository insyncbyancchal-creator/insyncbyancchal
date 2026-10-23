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
  const [lbProgress, setLbProgress] = useState(0);
  const lbTimerRef = useRef(null);
  const lbProgressRef = useRef(0);

  // Extract gallery items from project or build fallback list
  const gallery = project?.gallery?.length
    ? project.gallery
    : [
        ...(project?.hero
          ? [
              {
                src: project.hero.src,
                alt: project.hero.alt || project.title,
                caption: "Hero Architectural Study",
                aspectRatio: "16 / 10",
              },
            ]
          : []),
        ...(project?.cover
          ? [
              {
                src: project.cover.src,
                alt: project.cover.alt || project.title,
                caption: "Primary Exterior Elevation",
                aspectRatio: "3 / 4",
              },
            ]
          : []),
        ...(project?.cover?.hoverSrc
          ? [
              {
                src: project.cover.hoverSrc,
                alt: `${project.title} detail`,
                caption: "Interior Material Detail",
                aspectRatio: "16 / 10",
              },
            ]
          : []),
        ...(project?.chapters?.flatMap((c) =>
          c.images?.map((img) => ({
            src: img.src,
            alt: img.alt || c.title || project.title,
            caption: img.caption || c.title,
            aspectRatio: img.ar || "16 / 10",
          })) || []
        ) || []),
      ];

  const total = gallery.length;
  const hasItems = total > 0;

  // -------------------------------------------------------------
  // Fullscreen Lightbox Handlers & Autoplay
  // -------------------------------------------------------------
  const openLightbox = (idx) => {
    setActiveLightboxIdx(idx);
    setIsLbPlaying(true);
    lbProgressRef.current = 0;
    setLbProgress(0);
  };

  const closeLightbox = () => {
    setActiveLightboxIdx(null);
    lbProgressRef.current = 0;
    setLbProgress(0);
  };

  const handleLbNext = useCallback(() => {
    setActiveLightboxIdx((prev) => {
      if (prev === null) return null;
      return prev < total - 1 ? prev + 1 : 0;
    });
    lbProgressRef.current = 0;
    setLbProgress(0);
  }, [total]);

  const handleLbPrev = useCallback(() => {
    setActiveLightboxIdx((prev) => {
      if (prev === null) return null;
      return prev > 0 ? prev - 1 : total - 1;
    });
    lbProgressRef.current = 0;
    setLbProgress(0);
  }, [total]);

  // Automatic Autoplay for Fullscreen Lightbox
  useEffect(() => {
    if (activeLightboxIdx === null || !isLbPlaying) {
      if (lbTimerRef.current) clearInterval(lbTimerRef.current);
      return;
    }

    const intervalMs = 50;
    const durationMs = 4500;
    const increment = (intervalMs / durationMs) * 100;

    lbTimerRef.current = setInterval(() => {
      lbProgressRef.current += increment;
      if (lbProgressRef.current >= 100) {
        lbProgressRef.current = 0;
        setLbProgress(0);
        handleLbNext();
      } else {
        setLbProgress(lbProgressRef.current);
      }
    }, intervalMs);

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

  if (!hasItems) return null;

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
          Editorial Architectural Mosaic (Curtain Wipe Animation)
          ------------------------------------------------------------- */}
      <div className={styles.masonry} role="region" aria-label="Editorial photo mosaic">
        {gallery.map((item, index) => (
          <motion.div
            key={item.src + index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{
              duration: 0.65,
              delay: (index % 4) * 0.07,
              ease: [0.16, 1, 0.3, 1],
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
              {/* Architectural Shutter Veil Uncurtains on Scroll */}
              <motion.div
                className={styles.shutterCurtain}
                initial={{ y: "0%" }}
                whileInView={{ y: "-102%" }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.85,
                  delay: 0.12 + (index % 4) * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />

              <img
                src={item.src}
                alt={item.alt || `${project.title} photo ${index + 1}`}
                className={styles.mosaicImg}
                loading={index < 6 ? "eager" : "lazy"}
                decoding="async"
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

              {/* Lightbox Autoplay Progress Bar */}
              <div className={styles.lbProgressBarTrack} aria-hidden="true">
                <div
                  className={styles.lbProgressBarFill}
                  style={{ width: `${lbProgress}%` }}
                />
              </div>
            </div>

            {/* Center Image Stage with Next/Prev Buttons */}
            <div className={styles.lbStage} onClick={(e) => e.stopPropagation()}>
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
