"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./AboutExperience.module.css";
import { urlForImage } from "@/sanity/lib/image";

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
  photo: "/about/ancchal-about.jpeg",
  alt: "Portrait of Ancchal Sharma, Founder and Principal Designer of Insync",
  focus: "50% 20%",
  name: "Ancchal",
  role: "Founder & Principal Designer",
  lead: null,
  paragraphs: [
    "Ancchal Sharma, Founder and Principal Designer of Insync, believes that true luxury lies in the harmony of aesthetics, functionality, and timeless elegance. Driven by a deep-rooted passion for art, architecture, and design, she creates thoughtfully curated spaces that reflect individuality, refined detailing, and a profound understanding of how people live. Her approach combines artistic expression with a considered sense of proportion, materiality, and balance, ensuring every space feels distinctive yet effortlessly sophisticated.",
    "At Insync, every project begins with listening — understanding each client's lifestyle, aspirations, and vision to create spaces that feel deeply personal rather than simply designed. Recognised by Urban Melange in its December 2025 edition for her perspective on luxury interiors, Ancchal continues to shape environments where understated elegance meets modern living, and where every detail serves a purpose.",
  ],
  details: [
    ["Studio", "Insync by Ancchal"],
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

export default function AboutExperience({ data, children }) {
  // 1. Dynamic Founder Photo from Sanity
  const sanityFounderImage = data?.founderSection?.founderPhoto;
  const sanityFounderUrl = sanityFounderImage ? urlForImage(sanityFounderImage)?.url() : null;
  const founderDimensions = sanityFounderImage?.asset?.metadata?.dimensions;
  let dynamicFounderAspectRatio = "4 / 4.7";
  if (founderDimensions?.width && founderDimensions?.height) {
    dynamicFounderAspectRatio = `${founderDimensions.width} / ${founderDimensions.height}`;
  }
  let dynamicFounderObjectPosition = OWNER.focus || "50% 20%";
  if (sanityFounderImage?.hotspot) {
    const x = Math.round(sanityFounderImage.hotspot.x * 100);
    const y = Math.round(sanityFounderImage.hotspot.y * 100);
    dynamicFounderObjectPosition = `${x}% ${y}%`;
  }
  const founderPhotoSrc = sanityFounderUrl || OWNER.photo;
  const founderPhotoAlt = data?.founderSection?.founderPhotoAlt || OWNER.alt;

  // 2. Dynamic Approach Photo from Sanity
  const sanityApproachImage = data?.approachSection?.approachPhoto;
  const sanityApproachUrl = sanityApproachImage ? urlForImage(sanityApproachImage)?.url() : null;
  let dynamicApproachObjectPosition = "center";
  if (sanityApproachImage?.hotspot) {
    const x = Math.round(sanityApproachImage.hotspot.x * 100);
    const y = Math.round(sanityApproachImage.hotspot.y * 100);
    dynamicApproachObjectPosition = `${x}% ${y}%`;
  }
  const approachPhotoSrc = sanityApproachUrl || MANIFESTO.image;
  const approachPhotoAlt = data?.approachSection?.approachPhotoAlt || MANIFESTO.imageAlt;
  const approachCaption = data?.approachSection?.caption || "STUDIO PHILOSOPHY IN PRACTICE";

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
          <span 
            className={styles.frame}
            style={{ 
              aspectRatio: dynamicFounderAspectRatio,
              maxHeight: "520px"
            }}
          >
            {founderPhotoSrc ? (
              <motion.img
                src={founderPhotoSrc}
                alt={founderPhotoAlt}
                onError={(e) => {
                  e.currentTarget.src = "/about/ancchal-about.jpeg";
                }}
                style={{ objectPosition: dynamicFounderObjectPosition }}
                initial={{ scale: 1.06 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              />
            ) : (
              <span className={`${styles.ph} ${styles.sans}`} role="img" aria-label={founderPhotoAlt}>Portrait</span>
            )}
          </span>
          <div className={`${styles.portraitCaption} ${styles.sans}`}>
            <span className={styles.captionName}>Ancchal</span>
            <span className={styles.captionRole}>FOUNDER & PRINCIPAL DESIGNER</span>
          </div>

          {/* Editorial Feature Spotlight Card */}
          <div className={styles.pressCard}>
            {/* Ambient Watermark Monogram */}
            <span className={styles.pressWatermark} aria-hidden="true">UM</span>

            {/* Header: Editorial Eyebrow + Edition Badge */}
            <div className={styles.pressCardHeader}>
              <div className={styles.pressHeaderLeft}>
                <span className={styles.pressDot} />
                <span className={styles.pressEyebrow}>EDITORIAL FEATURE</span>
              </div>
              <span className={styles.pressBadge}>DECEMBER 2025 · ISSUE 01</span>
            </div>

            {/* Publication Title */}
            <h3 className={styles.pressMag}>Urban M&eacute;lange</h3>

            {/* Subtitle / Excerpt */}
            <p className={styles.pressSubtitle}>
              A curated journal of interiors, material and the people shaping considered spaces.
            </p>

            {/* Fine Gold Architectural Hairline */}
            <div className={styles.pressDivider} />

            {/* Action Row: Read Magazine Button */}
            <div className={styles.pressCardFooter}>
              <a
                href="/about/urban-melange-dec-2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                type="application/pdf"
                className={styles.pressCardBtn}
                title="Read Urban Melange Feature"
                aria-label="Read Urban Melange Feature"
              >
                <span>READ MAGAZINE</span>
                <span className={styles.pressCardBtnArrow} aria-hidden="true">&rarr;</span>
              </a>
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
              Ancchal Sharma, Founder and Principal Designer of Insync, believes that true luxury lies in the harmony of aesthetics, functionality, and timeless elegance. Driven by a deep-rooted passion for art, architecture, and design, she creates thoughtfully curated spaces that reflect individuality, refined detailing, and a profound understanding of how people live. Her approach combines artistic expression with a considered sense of proportion, materiality, and balance, ensuring every space feels distinctive yet effortlessly sophisticated.
            </p>
            <p>
              At Insync, every project begins with listening — understanding each client&apos;s lifestyle, aspirations, and vision to create spaces that feel deeply personal rather than simply designed. Recognised by <strong className={styles.magHighlight}>Urban Melange</strong> in its December 2025 edition for her perspective on luxury interiors, Ancchal continues to shape environments where understated elegance meets modern living, and where every detail serves a purpose.
            </p>
          </div>

          <dl className={styles.details}>
            {OWNER.details.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
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
                    src={approachPhotoSrc}
                    alt={approachPhotoAlt}
                    style={{ objectPosition: dynamicApproachObjectPosition }}
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
                <span>{approachCaption}</span>
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