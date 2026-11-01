"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import styles from "./PortfolioExperience.module.css";

export default function PortfolioExperience({ projects }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // One click on Discover More unfolds ALL remaining projects immediately
  const displayProjects = isExpanded ? projects : projects.slice(0, 6);
  const hasMore = !isExpanded && projects.length > 6;

  const handleDiscoverMore = () => {
    setIsExpanded(true);
  };

  return (
    <main className={styles.root}>
      {/* ---------------- Section Editorial Header below Hero Banner ---------------- */}
      <header className={styles.sectionHeader}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className={styles.headerEyebrow}
        >
          SELECTED COMMISSIONS &bull; 2022 &ndash; 2026
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.95, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={styles.headerTitle}
        >
          CURATED SPACES <span className={`montecarlo-regular ${styles.headerScript}`}>and bespoke</span> LIVING
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={styles.headerLine}
          style={{ transformOrigin: "center" }}
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={styles.headerLede}
        >
          Each commission is an intimate architectural dialogue between monolithic stone volumes, calibrated natural daylight, and hand-finished artisan materials.
        </motion.p>
      </header>

      {/* ---------------- 3-Column Square Project Gallery Matching Reference ---------------- */}
      {/* ---------------- 3-Column Square Project Gallery Matching Reference ---------------- */}
      <section className={styles.container} aria-label="Selected Projects">
        <div className={styles.galleryGrid}>
          {displayProjects.map((p, index) => {
            const hasDistinctHover = Boolean(p.cover?.hoverSrc && p.cover.hoverSrc !== p.cover.src);

            return (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{
                  duration: 0.5,
                  delay: (index % 3) * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={styles.card}
              >
                <Link
                  href={`/portfolio/${p.slug}`}
                  className={styles.cardLink}
                  aria-label={`View project: ${p.title}`}
                >
                  {/* 1:1 Square Image Container with Ultra-Smooth Luxury Dissolve Hover & Whitish-Gold Blur */}
                  <div className={styles.imageBox}>
                    {p.cover?.src ? (
                      <>
                        <img
                          src={p.cover.src}
                          alt={p.title}
                          className={styles.primaryImg}
                          loading={index < 6 ? "eager" : "lazy"}
                          decoding="async"
                          width={800}
                          height={800}
                        />
                        {hasDistinctHover && (
                          <img
                            src={p.cover.hoverSrc}
                            alt={`${p.title} interior detail`}
                            className={styles.hoverImg}
                            loading="lazy"
                            decoding="async"
                            width={800}
                            height={800}
                          />
                        )}
                      </>
                    ) : (
                      <div className={styles.placeholderBox}>
                        <span className={styles.placeholderMonogram}>INSYNC</span>
                        <div className={styles.placeholderLine} />
                        <span className={styles.placeholderStatus}>PHOTOGRAPHY IN CURATION</span>
                        <span className={styles.placeholderNote}>Archival Visuals Pending Upload</span>
                      </div>
                    )}

                    {/* Whitish-Golden Frosted Glass Blur Overlay with View Project */}
                    <div className={styles.hoverOverlay} aria-hidden="true">
                      <div className={styles.viewProjectBadge}>
                        <span className={styles.viewProjectText}>VIEW PROJECT</span>
                        <ArrowUpRight className={styles.viewProjectArrow} size={14} />
                      </div>
                    </div>

                    <div className={styles.rimLight} />
                  </div>

                  {/* Project Details Below Image - Left Aligned Minimal Editorial Style */}
                  <div className={styles.cardMeta}>
                    <h3 className={styles.cardTitle}>{p.title}</h3>
                    <span className={styles.cardSub}>
                      {p.location} &bull; {p.type}
                    </span>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* Discover More Action Button */}
        {hasMore ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-14 sm:mt-18 text-center"
          >
            <button
              type="button"
              onClick={handleDiscoverMore}
              className="group relative inline-flex items-center justify-center gap-3.5 px-8 sm:px-10 py-3.5 sm:py-4 border border-[#C5A059] bg-transparent text-[#1A1A1A] hover:bg-[#C5A059] hover:text-white transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-none text-[11px] sm:text-[11.5px] uppercase tracking-[0.26em] font-semibold cursor-pointer shadow-[0_4px_16px_rgba(197,160,89,0.15)] hover:shadow-[0_10px_28px_rgba(197,160,89,0.35)] hover:-translate-y-0.5 active:scale-98 touch-manipulation min-h-[48px]"
              aria-label="Discover all remaining architectural projects"
            >
              <span>DISCOVER MORE</span>
              <ArrowDown className="w-4 h-4 text-[#C5A059] group-hover:text-white transition-transform duration-300 group-hover:translate-y-1" />
            </button>
          </motion.div>
        ) : (
          projects.length > 6 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-14 sm:mt-18 text-center space-y-4"
            >
              <p className="text-[11.5px] font-sans uppercase tracking-[0.24em] text-[#8C857B] font-medium">
                SHOWING ALL {projects.length} CURATED COMMISSIONS
              </p>
              <div className="flex justify-center">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 border border-[#C5A059] bg-[#1A1A1A] text-[#FBF9F6] hover:bg-[#C5A059] hover:text-[#1A1A1A] transition-all duration-300 rounded-none text-[10.5px] sm:text-[11px] uppercase tracking-[0.24em] font-semibold cursor-pointer shadow-xs active:scale-98 touch-manipulation min-h-[46px]"
                >
                  <span>COMMISSION AN ATELIER PROJECT</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A059] group-hover:text-[#1A1A1A] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          )
        )}
      </section>
    </main>
  );
}