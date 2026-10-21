"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Plus } from "lucide-react";
import styles from "./ProjectGallery.module.css";

export default function ProjectGallery({ project }) {
  const [activeIdx, setActiveIdx] = useState(null);

  // Extract gallery items from project or build fallback list
  const gallery = project?.gallery?.length
    ? project.gallery
    : [
        ...(project?.hero ? [{ src: project.hero.src, alt: project.hero.alt || project.title, aspectRatio: "16 / 10" }] : []),
        ...(project?.cover ? [{ src: project.cover.src, alt: project.cover.alt || project.title, aspectRatio: "3 / 4" }] : []),
        ...(project?.cover?.hoverSrc ? [{ src: project.cover.hoverSrc, alt: `${project.title} detail`, aspectRatio: "16 / 10" }] : []),
        ...(project?.chapters?.flatMap((c) =>
          c.images?.map((img) => ({
            src: img.src,
            alt: img.alt || c.title || project.title,
            caption: img.caption || c.title,
            aspectRatio: img.ar || "16 / 10",
          })) || []
        ) || []),
      ];

  const hasItems = gallery && gallery.length > 0;

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
  }, [gallery.length]);

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
  }, [gallery.length]);

  const handleClose = useCallback(() => {
    setActiveIdx(null);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (activeIdx === null) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIdx, handleClose, handlePrev, handleNext]);

  // Lock body scroll when Lightbox is active
  useEffect(() => {
    if (activeIdx !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIdx]);

  if (!hasItems) return null;

  return (
    <div className={styles.galleryRoot}>
      {/* 5-Column Editorial Masonry Matching Reference Photo */}
      <div className={styles.masonry} role="region" aria-label="Project photo gallery">
        {gallery.map((item, index) => (
          <motion.div
            key={item.src + index}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{
              duration: 0.6,
              delay: (index % 5) * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={styles.item}
            style={{ aspectRatio: item.aspectRatio || "4 / 3" }}
            onClick={() => setActiveIdx(index)}
            tabIndex={0}
            role="button"
            aria-label={`View photo ${index + 1} of ${gallery.length}: ${item.caption || item.alt || project.title}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActiveIdx(index);
              }
            }}
          >
            <img
              src={item.src}
              alt={item.alt || `${project.title} gallery photo ${index + 1}`}
              className={styles.img}
              loading={index < 8 ? "eager" : "lazy"}
              decoding="async"
            />

            {/* Whitish-Golden Sheen and Zoom Indicator on Hover */}
            <div className={styles.overlay} aria-hidden="true">
              <span className={styles.zoomBadge}>
                <Plus size={15} />
              </span>
            </div>

            <div className={styles.rim} />
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Luxury Lightbox */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
          >
            {/* Top Bar */}
            <div className={styles.lbHeader} onClick={(e) => e.stopPropagation()}>
              <span className={styles.lbTitle}>{project.title}</span>
              <span className={styles.lbCount}>
                {String(activeIdx + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={handleClose}
                className={styles.lbClose}
                aria-label="Close image viewer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Center Image Stage with Next/Prev Buttons */}
            <div className={styles.lbStage} onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={handlePrev}
                className={`${styles.lbNavBtn} ${styles.lbPrev}`}
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>

              <motion.img
                key={gallery[activeIdx].src}
                src={gallery[activeIdx].src}
                alt={gallery[activeIdx].alt || project.title}
                className={styles.lbImg}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              />

              <button
                type="button"
                onClick={handleNext}
                className={`${styles.lbNavBtn} ${styles.lbNext}`}
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className={styles.lbFooter} onClick={(e) => e.stopPropagation()}>
              {gallery[activeIdx].caption || gallery[activeIdx].alt || project.location}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
