"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./AboutExperience.module.css";

/* =====================================================================
   EDIT THE CONTENT HERE. Nothing below this block needs touching.
   (All wording is sample copy: replace it with the studio's own words.)
   ===================================================================== */

const INTRO = {
  eyebrow: "About",
  title: ["Designed with", "intention."],
  lede: "Insync is an architecture and interior studio in Ludhiana. This is who we are, and how we think.",
};

const OWNER = {
  photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=75&w=800&auto=format&fit=crop",
  alt: "Portrait of Ancchal Sharma, Founder and Principal Designer of Insync Interiors",
  focus: "50% 30%",
  name: "Ancchal",
  role: "Founder & Principal Designer",
  lead: null,
  paragraphs: [
    "Ancchal Sharma, Founder and Principal Designer of Insync Interiors, believes that true luxury lies in the harmony of aesthetics, functionality, and timeless elegance. Driven by a deep-rooted passion for art, architecture, and design, she creates thoughtfully curated spaces that reflect individuality, refined detailing, and a profound understanding of how people live. Her approach combines artistic expression with a considered sense of proportion, materiality, and balance, ensuring every space feels distinctive yet effortlessly sophisticated.",
    "At Insync Interiors, every project begins with listening — understanding each client's lifestyle, aspirations, and vision to create spaces that feel deeply personal rather than simply designed. Recognised by Urban Melange in its December 2025 edition for her perspective on luxury interiors, Ancchal continues to shape environments where understated elegance meets modern living, and where every detail serves a purpose.",
  ],
  details: [
    ["Studio", "Insync Interiors"],
    ["Editorial", "Urban Melange (Dec 2025)"],
    ["Based in", "Ludhiana, Punjab"],
    ["Practice", "Architecture · Interiors · Insync Home"],
  ],
};

const MANIFESTO = {
  eyebrow: "Our approach",
  title: "Luxury, in its quietest form.",
  paragraphs: [
    "We believe that true sophistication lies not in excess, but in intention. In the interplay of light and shadow, the honesty of materials, and the quiet balance between form and function, we find the essence of thoughtful design.",
    "At Insync, every space begins with an understanding of its character, its purpose, and the people who inhabit it. We approach each detail with restraint and precision, allowing proportion, texture, and materiality to shape an experience that feels effortless yet deeply considered.",
    "We look beyond fleeting trends, creating interiors that hold their relevance through time — spaces that reflect individuality without demanding attention, and express luxury through a sense of calm, clarity, and completeness.",
  ],
  quote:
    "Because the most exceptional spaces are not defined by what they display, but by what they make you feel.",
  image:
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=75&w=1000&auto=format&fit=crop",
  imageAlt:
    "Luxury architectural interior with serene natural light, fluted oak and organic travertine",
};

/* ===================================================================== */

export default function AboutExperience({ children }) {
  return (
    <main className={styles.root}>
      {/* ---------- INTRO ---------- */}
      <motion.header
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px 0px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className={`${styles.intro} will-change-transform`}
      >
        <p className={`${styles.eyebrow} ${styles.sans}`}>{INTRO.eyebrow}</p>
        <h1 className={styles.h1}>
          <span className={styles.line}>
            <span>
              DESIGNED <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">with quiet</span> INTENTION.
            </span>
          </span>
        </h1>
        <p className={`${styles.lede} ${styles.sans}`}>{INTRO.lede}</p>
      </motion.header>

      {/* ---------- 6.1 OWNER (Directional Entrance) ---------- */}
      <section className={styles.owner} aria-label="Founder">
        {/* Left Column: Portrait Frame with subtle scale reveal */}
        <motion.figure
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-20px 0px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className={`${styles.portrait} will-change-transform`}
        >
          <span className={styles.frame}>
            {OWNER.photo ? (
              <motion.img
                src={OWNER.photo}
                alt={OWNER.alt}
                style={{ objectPosition: OWNER.focus }}
                initial={{ scale: 1.06 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              />
            ) : (
              <span className={`${styles.ph} ${styles.sans}`} role="img" aria-label={OWNER.alt}>Portrait</span>
            )}
          </span>
          <div className={`${styles.portraitCaption} ${styles.sans}`}>
            <span className={styles.captionName}>Ancchal</span>
            <span className={styles.captionRole}>FOUNDER & PRINCIPAL DESIGNER</span>
          </div>

          {/* Editorial Press Recognition Plaque */}
          <div className={styles.pressBadge}>
            <div className={styles.pressBadgeHeader}>
              <span className={styles.pressDot} />
              <span className={styles.pressEyebrow}>EDITORIAL FEATURE</span>
            </div>
            <div className={styles.pressBody}>
              <span className={styles.pressMag}>Urban Melange</span>
              <span className={styles.pressEdition}>December 2025 Edition &bull; Luxury Interiors Focus</span>
            </div>
          </div>
        </motion.figure>

        {/* Right Column: Founder Biography */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-20px 0px' }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`${styles.bio} will-change-transform`}
        >
          <p className={styles.role}>{OWNER.role}</p>
          <h2 className={styles.name}>{OWNER.name}</h2>
          {OWNER.lead && <p className={styles.lead}>{OWNER.lead}</p>}
          <div className={styles.paras}>
            <p className={styles.firstPara}>
              Ancchal Sharma, Founder and Principal Designer of Insync Interiors, believes that true luxury lies in the harmony of aesthetics, functionality, and timeless elegance. Driven by a deep-rooted passion for art, architecture, and design, she creates thoughtfully curated spaces that reflect individuality, refined detailing, and a profound understanding of how people live. Her approach combines artistic expression with a considered sense of proportion, materiality, and balance, ensuring every space feels distinctive yet effortlessly sophisticated.
            </p>
            <p>
              At Insync Interiors, every project begins with listening — understanding each client&apos;s lifestyle, aspirations, and vision to create spaces that feel deeply personal rather than simply designed. Recognised by <strong className={styles.magHighlight}>Urban Melange</strong> in its December 2025 edition for her perspective on luxury interiors, Ancchal continues to shape environments where understated elegance meets modern living, and where every detail serves a purpose.
            </p>
          </div>

          <dl className={styles.details}>
            {OWNER.details.map(([k, v]) => (
              <div key={k} className={k === "Editorial" ? styles.editorialRow : ""}>
                <dt>{k}</dt>
                <dd>
                  {k === "Editorial" ? (
                    <span className={styles.editorialHighlight}>
                      <strong>Urban Melange</strong> (Dec 2025 Edition)
                    </span>
                  ) : (
                    v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </section>

      {/* ---------- 6.2 MANIFESTO / OUR APPROACH (Directional Entrance) ---------- */}
      <section className={styles.manifesto} aria-label="Our approach">
        <div className={styles.mContainer}>
          <div className={styles.mGrid}>
            
            {/* Left Column: Editorial Text */}
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20px 0px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className={`${styles.mTextCol} will-change-transform`}
            >
              <p className={`${styles.eyebrow} ${styles.sans}`}>{MANIFESTO.eyebrow}</p>

              <h2 className={styles.mHeading}>
                LUXURY, <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">in its quietest</span> FORM.
              </h2>

              <div className={styles.mDivider} />

              <div className={`${styles.mBody} ${styles.sans}`}>
                {MANIFESTO.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <blockquote className={styles.mQuote}>
                <p>&ldquo;{MANIFESTO.quote}&rdquo;</p>
              </blockquote>
            </motion.div>

            {/* Right Column: Premium Architectural Image */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20px 0px' }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`${styles.mImageCol} will-change-transform`}
            >
              <div className={styles.mImageFrame}>
                <div className={styles.mImageInner}>
                  <motion.img
                    src={MANIFESTO.image}
                    alt={MANIFESTO.imageAlt}
                    loading="lazy"
                    decoding="async"
                    initial={{ scale: 1.08 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
              <div className={`${styles.mImageCaption} ${styles.sans}`}>
                <span>STUDIO PHILOSOPHY IN PRACTICE</span>
                <span>LIGHT · TEXTURE · RESTRAINT</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Embedded SpacesInMotion and Testimonials */}
      {children}

      {/* ---------- CLOSING CTA ---------- */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        className={styles.cta}
      >
        <h2>
          Let&rsquo;s design something{' '}
          <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">together.</span>
        </h2>
        <div className={styles.ctaLinks}>
          <Link href="/contact" className={`${styles.btn} ${styles.sans}`}>
            <span>Start a conversation</span>
            <i aria-hidden="true">&rarr;</i>
          </Link>
          <Link href="/portfolio" className={`${styles.textLink} ${styles.sans}`}>
            View our work
          </Link>
        </div>
      </motion.section>
    </main>
  );
}