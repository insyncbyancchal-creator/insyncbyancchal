"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Bodoni_Moda, Montserrat } from "next/font/google";
import styles from "./AboutExperience.module.css";

const serif = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"] });
const sans = Montserrat({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

/* =====================================================================
   EDIT THE CONTENT HERE. Nothing below this block needs touching.
   (All wording is sample copy: replace it with the studio's own words.)
   ===================================================================== */

const INTRO = {
  eyebrow: "About",
  title: ["Designed with", "intention."], // second line is shown in gold italic
  lede: "Insync is an architecture and interior studio in Ludhiana. This is who we are, and how we think.",
};

const OWNER = {
  // Put the photo in public/about/ and set photo: "/about/owner.jpg"  (portrait, about 4:5, 1600px tall)
  photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop",
  alt: "Portrait of Anchal, founder of Insync",
  focus: "50% 30%", // where to keep centred if the photo gets cropped
  name: "Anchal", // add surname if wanted
  role: "Founder & Principal Designer",
  lead: "Spaces should feel calm the moment you walk in, and better every day you stay.",
  paragraphs: [
    "Anchal founded Insync to design interiors that are considered rather than decorated: rooms shaped by light, proportion and the way people actually live.",
    "Every project begins with listening. The result is quiet, tactile and personal, never a repeat of the last one.",
  ],
  details: [
    ["Studio", "Insync Interiors"],
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
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=85&w=1600&auto=format&fit=crop",
  imageAlt:
    "Luxury architectural interior with serene natural light, fluted oak and organic travertine",
};

/* ===================================================================== */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "1");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function AboutExperience({ children }) {
  useReveal();

  return (
    <main className={`${styles.root} ${serif.className}`} style={{ "--sans": sans.style.fontFamily }}>
      {/* ---------- INTRO ---------- */}
      <header className={styles.intro}>
        <p className={`${styles.eyebrow} ${styles.sans}`}>{INTRO.eyebrow}</p>
        <h1 className={styles.h1}>
          <span className={styles.line}>
            <span>
              DESIGNED <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">with quiet</span> INTENTION.
            </span>
          </span>
        </h1>
        <p className={`${styles.lede} ${styles.sans}`}>{INTRO.lede}</p>
      </header>

      {/* ---------- 6.1 OWNER ---------- */}
      <section className={styles.owner} aria-label="Founder">
        <figure className={styles.portrait} data-reveal>
          <span className={styles.frame}>
            {OWNER.photo ? (
              <img src={OWNER.photo} alt={OWNER.alt} style={{ objectPosition: OWNER.focus }} loading="eager" />
            ) : (
              <span className={`${styles.ph} ${styles.sans}`} role="img" aria-label={OWNER.alt}>Portrait</span>
            )}
          </span>
          <div className={`${styles.portraitCaption} ${styles.sans}`}>
            <span>Anchal</span>
            <span>FOUNDER & PRINCIPAL DESIGNER</span>
          </div>
        </figure>

        <div className={styles.bio} data-reveal>
          <p className={`${styles.role} ${styles.sans}`}>{OWNER.role}</p>
          <h2 className={styles.name}>{OWNER.name}</h2>
          <p className={styles.lead}>{OWNER.lead}</p>
          <div className={`${styles.paras} ${styles.sans}`}>
            {OWNER.paragraphs.map((t, i) => <p key={i}>{t}</p>)}
          </div>
          <dl className={`${styles.details} ${styles.sans}`}>
            {OWNER.details.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- 6.2 MANIFESTO / OUR APPROACH ---------- */}
      <section className={styles.manifesto} aria-label="Our approach">
        <div className={styles.mContainer}>
          <div className={styles.mGrid}>
            
            {/* Left Column: Editorial Text */}
            <div className={styles.mTextCol} data-reveal>
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
            </div>

            {/* Right Column: Premium Architectural Image */}
            <div className={styles.mImageCol} data-reveal>
              <div className={styles.mImageFrame}>
                <div className={styles.mImageInner}>
                  <img
                    src={MANIFESTO.image}
                    alt={MANIFESTO.imageAlt}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className={`${styles.mImageCaption} ${styles.sans}`}>
                <span>STUDIO PHILOSOPHY IN PRACTICE</span>
                <span>LIGHT · TEXTURE · RESTRAINT</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Embedded Testimonial Section (rendered above CTA) */}
      {children}

      {/* ---------- CLOSING CTA (RENDERED UNDER TESTIMONIAL) ---------- */}
      <section className={styles.cta} data-reveal>
        <h2>Let&rsquo;s design something <em>together.</em></h2>
        <div className={styles.ctaLinks}>
          <Link href="/contact" className={`${styles.btn} ${styles.sans}`}>
            <span>Start a conversation</span>
            <i aria-hidden="true">→</i>
          </Link>
          <Link href="/portfolio" className={`${styles.textLink} ${styles.sans}`}>View our work</Link>
        </div>
      </section>
    </main>
  );
}