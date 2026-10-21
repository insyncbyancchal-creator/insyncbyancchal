"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import styles from "./PortfolioExperience.module.css";

export default function PortfolioExperience({ projects }) {
  return (
    <main className={styles.root}>
      {/* ---------------- Section Editorial Header below Hero Banner ---------------- */}
      <header className={styles.sectionHeader}>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.headerEyebrow}
        >
          SELECTED COMMISSIONS &bull; 2022 &ndash; 2026
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={styles.headerTitle}
        >
          CURATED SPACES <span className={`montecarlo-regular ${styles.headerScript}`}>and bespoke</span> LIVING
        </motion.h2>
        <div className={styles.headerLine} />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={styles.headerLede}
        >
          Each commission is an intimate architectural dialogue between monolithic stone volumes, calibrated natural daylight, and hand-finished artisan materials.
        </motion.p>
      </header>

      {/* ---------------- 3-Column Square Project Gallery Matching Reference ---------------- */}
      <section className={styles.container} aria-label="Selected Projects">
        <div className={styles.galleryGrid}>
          {projects.map((p, index) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{
                duration: 0.65,
                delay: (index % 3) * 0.07,
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
                  <img
                    src={p.cover?.src}
                    alt={p.title}
                    className={styles.primaryImg}
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  {p.cover?.hoverSrc && (
                    <img
                      src={p.cover?.hoverSrc}
                      alt={`${p.title} interior detail`}
                      className={styles.hoverImg}
                      loading="lazy"
                      decoding="async"
                    />
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

                {/* Project Details Below Image - Left Aligned Minimal Editorial Style (Matching Reference) */}
                <div className={styles.cardMeta}>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <span className={styles.cardSub}>
                    {p.location} &bull; {p.type}
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}