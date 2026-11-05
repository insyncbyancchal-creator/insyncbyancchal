"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import styles from "./PortfolioExperience.module.css";

export default function PortfolioExperience({ projects, siteSettings }) {
  // Ensure projects are strictly sorted by order number (1st, 2nd, 10th...)
  const sortedProjects = useMemo(() => {
    if (!Array.isArray(projects)) return [];
    return [...projects].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  }, [projects]);

  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const hash = window.location.hash || "";
        const targetSlug = hash.startsWith("#project-")
          ? hash.replace("#project-", "")
          : sessionStorage.getItem("return_to_project");
        if (targetSlug && Array.isArray(sortedProjects)) {
          const idx = sortedProjects.findIndex((p) => p.slug === targetSlug);
          if (idx >= 6) return true;
        }
        return sessionStorage.getItem("portfolio_expanded") === "1";
      } catch {}
    }
    return false;
  });

  // Scroll directly in front of the same project when returning from a project detail page
  useEffect(() => {
    if (typeof window === "undefined") return;

    let targetSlug = null;
    const hash = window.location.hash || "";
    if (hash.startsWith("#project-")) {
      targetSlug = hash.replace("#project-", "");
    } else {
      try {
        targetSlug = sessionStorage.getItem("return_to_project");
      } catch {}
    }

    if (!targetSlug) return;

    if (Array.isArray(sortedProjects)) {
      const idx = sortedProjects.findIndex((p) => p.slug === targetSlug);
      if (idx >= 6) {
        setTimeout(() => setIsExpanded(true), 0);
      }
    }

    let attempts = 0;
    const scrollToTarget = () => {
      const el = document.getElementById(`project-${targetSlug}`);
      if (el) {
        const offset = 90;
        if (window.lenis) {
          window.lenis.scrollTo(el, { offset: -offset, immediate: true });
        } else {
          const y = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: y, behavior: "instant" });
        }
        try {
          sessionStorage.removeItem("return_to_project");
        } catch {}
      } else if (attempts < 12) {
        attempts++;
        setTimeout(scrollToTarget, 60);
      }
    };

    const timer = setTimeout(scrollToTarget, 80);
    return () => clearTimeout(timer);
  }, [sortedProjects]);

  // One click on Discover More unfolds ALL remaining projects immediately
  const displayProjects = useMemo(
    () => (isExpanded ? sortedProjects : sortedProjects.slice(0, 6)),
    [isExpanded, sortedProjects]
  );
  const hasMore = !isExpanded && sortedProjects.length > 6;

  const handleDiscoverMore = () => {
    setIsExpanded(true);
    try {
      sessionStorage.setItem("portfolio_expanded", "1");
    } catch {}
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
          {siteSettings?.portfolioEyebrow || "SELECTED COMMISSIONS \u2022 2021 \u2013 2026"}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.95, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={styles.headerTitle}
        >
          BESPOKE SPACES <span className={`montecarlo-regular ${styles.headerScript}`}>and elevated</span> LIVING
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
          {siteSettings?.portfolioLede || "Every commission reflects a thoughtful dialogue between architecture, artistry and the essence of its surroundings."}
        </motion.p>
      </header>

      {/* ---------------- 3-Column Square Project Gallery Matching Reference ---------------- */}
      <section className={styles.container} aria-label="Selected Projects">
        <div className={styles.galleryGrid}>
          {displayProjects.map((p, index) => {
            const hasDistinctHover = Boolean(p.cover?.hoverSrc && p.cover.hoverSrc !== p.cover.src);

            return (
              <motion.article
                key={p.slug}
                id={`project-${p.slug}`}
                initial={index < 3 ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "100px 0px" }}
                transition={{
                  duration: 0.4,
                  delay: (index % 3) * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={styles.card}
              >
                <Link
                  href={`/portfolio/${p.slug}`}
                  onClick={() => {
                    try {
                      sessionStorage.setItem("return_to_project", p.slug);
                      sessionStorage.setItem("return_source_path", "/portfolio");
                    } catch {}
                  }}
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
                          style={{ objectPosition: p.cover.focus || "50% 50%" }}
                          loading={index < 6 ? "eager" : "lazy"}
                          fetchPriority={index < 3 ? "high" : "auto"}
                          decoding="async"
                          width={800}
                          height={800}
                        />
                        {hasDistinctHover && (
                          <img
                            src={p.cover.hoverSrc}
                            alt={`${p.title} interior detail`}
                            className={styles.hoverImg}
                            style={{ objectPosition: p.cover.hoverFocus || p.cover.focus || "50% 50%" }}
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
                      {p.location} &bull; {p.category || p.type}
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