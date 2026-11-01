"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { ArrowDown, ArrowUp, ArrowUpRight, X } from "lucide-react";
import { DEFAULT_SERVICES, DEFAULT_PRODUCTS } from "@/lib/services";
import styles from "./Servicesexperience.module.css";

const enquire = (title, note) =>
  `/contact?service=${encodeURIComponent(title)}${note ? `&note=${encodeURIComponent(note)}` : ""}`;

/* ------------------------------------------------------------------ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal], [data-wipe]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "1");
            e.target.classList.add(styles.in);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.setAttribute("data-in", "1");
        el.classList.add(styles.in);
      } else {
        io.observe(el);
      }
    });
    return () => io.disconnect();
  }, []);
}

// Gentle, throttled scroll parallax for the stacked (tablet/mobile) images
function useParallax(refs) {
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 999px)");
    if (!mq.matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const lastP = new Map();
    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
        const prev = lastP.get(i);
        if (prev === undefined || Math.abs(p - prev) > 0.015) {
          lastP.set(i, p);
          el.style.setProperty("--p", p.toFixed(2));
        }
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [refs]);
}

/* ------------------------------------------------------------------ */
/*  Insync Home: Curated Pieces Showcase (Dynamic from Sanity)        */
/* ------------------------------------------------------------------ */
function HomeShowcase({ products, homeData }) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Filter out any deleted or nameless items so NO EMPTY CARD can ever render
  const allProducts = (products && products.length > 0 ? products : DEFAULT_PRODUCTS).filter(
    (p) => p && p.name
  );

  // Close modal on Escape key and prevent background scroll
  useEffect(() => {
    if (!isGalleryOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setIsGalleryOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isGalleryOpen]);

  // Main showcase photo: Sanity uploaded homeImage or first product or fallback
  const featurePhoto =
    homeData?.homeImage ||
    allProducts[0]?.img ||
    "/hero/photo_3.jpg";
  const featureFocus =
    homeData?.homeImageFocus ||
    allProducts[0]?.imageFocus ||
    "50% 50%";

  return (
    <section className={styles.homeSection} id="insync-home">
      <div className={styles.homeContainer}>
        {/* Left Column: Curated Objects Story & Atelier Hallmarks */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className={styles.homeTextCol}
        >
          <p className={styles.eyebrow}>{homeData?.eyebrow || "INSYNC HOME"}</p>
          <h2 className={styles.homeTitle}>
            {homeData?.title ? (
              homeData.title
            ) : (
              <>
                CURATED OBJECTS,{" "}
                <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">
                  made for your
                </span>{" "}
                SPACE.
              </>
            )}
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={styles.goldDivider}
          />
          <p className={`${styles.homeLede} ${styles.sans}`}>
            {homeData?.lede ||
              "Our home collection is crafted to order in our partner ateliers. Each piece is customizable in dimensions, materials and artisan finishes."}
          </p>

          <div className={styles.homePillars}>
            <div className={styles.pillarItem}>
              <span className={styles.pillarNo}>01</span>
              <span className={styles.pillarTitle}>Bespoke Sizing</span>
              <span className={styles.pillarDesc}>
                Proportions calibrated to your architectural layout.
              </span>
            </div>
            <div className={styles.pillarItem}>
              <span className={styles.pillarNo}>02</span>
              <span className={styles.pillarTitle}>Artisan Finishes</span>
              <span className={styles.pillarDesc}>
                Honed stone, lost-wax bronze, and tactile bouclé.
              </span>
            </div>
            <div className={styles.pillarItem}>
              <span className={styles.pillarNo}>03</span>
              <span className={styles.pillarTitle}>Made to Order</span>
              <span className={styles.pillarDesc}>
                Individually handcrafted in limited atelier capsules.
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Showcase Photograph & Action Button */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className={styles.homeFeatureCol}
        >
          <div className={styles.featureCard}>
            <div className={styles.featureImgFrame}>
              <img
                src={featurePhoto}
                alt="Insync Home Atelier Collection"
                loading="lazy"
                decoding="async"
                style={{ objectPosition: featureFocus }}
                className={styles.featureImg}
              />
              <span className={styles.featureBadge}>INSYNC HOME ATELIER</span>
            </div>
          </div>

          <div className={styles.exploreActionBox}>
            <button
              type="button"
              onClick={() => setIsGalleryOpen(true)}
              className={styles.exploreBtn}
              aria-haspopup="dialog"
              aria-label="Explore more products from Insync Home collection"
            >
              <span>EXPLORE MORE PRODUCTS</span>
              <ArrowUpRight className="w-4 h-4 text-[#C5A059]" />
            </button>
            <span className={styles.exploreHint}>
              Click to view all {allProducts.length} curated objects &amp; custom commissions
            </span>
          </div>
        </motion.div>
      </div>

      {/* Full-Screen Gallery Modal with Native Mouse Wheel Scrolling */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={styles.modalBackdrop}
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsGalleryOpen(false);
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Insync Home Curated Objects Gallery"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className={styles.modalSheet}
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={styles.modalHeader}>
                <div className={styles.modalTitleBlock}>
                  <div>
                    <span className={styles.modalEyebrow}>INSYNC HOME ARCHIVE</span>
                    <h3 className={styles.modalHeading}>
                      Curated Objects &amp; Custom Accents
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsGalleryOpen(false)}
                  className={styles.modalCloseBtn}
                  aria-label="Close gallery modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body: Direct Product Grid & Footer Enquiry at Last */}
              <div
                className={styles.modalBody}
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
              >
                {/* Cards have ONLY image and product name (No description, No card enquire link) */}
                <div className={styles.galleryGrid}>
                  {allProducts.map((prod, idx) => (
                    <article
                      key={prod.id || prod._id || idx}
                      className={styles.galleryCard}
                    >
                      <div className={styles.galleryThumb}>
                        {prod.img ? (
                          <img
                            src={prod.img}
                            alt={prod.name}
                            loading="lazy"
                            decoding="async"
                            style={{ objectPosition: prod.imageFocus || "50% 50%" }}
                          />
                        ) : (
                          <div className={styles.thumbPlaceholder}>
                            <span className={styles.placeholderBrand}>INSYNC</span>
                            <div className={styles.placeholderDivider} />
                            <span className={styles.placeholderText}>OBJECT ARCHIVE</span>
                          </div>
                        )}
                      </div>

                      {/* Product Name ONLY */}
                      <h3 className={styles.galleryCardName}>{prod.name}</h3>
                    </article>
                  ))}
                </div>

                {/* Atelier Enquiry Section Placed at Last */}
                <div className={styles.galleryFooterCta}>
                  <div className={styles.galleryFooterInner}>
                    <p className={styles.galleryFooterEyebrow}>BESPOKE ATELIER COMMISSIONS</p>
                    <h4 className={styles.galleryFooterHeading}>
                      COMMISSION A <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">custom piece</span>
                    </h4>
                    <div className={styles.galleryFooterDivider} />
                    <p className={`${styles.galleryFooterText} ${styles.sans}`}>
                      Every object in the Insync Home collection is crafted to order. Calibrate dimensions, natural stone selection, metals, and artisan finishes to your space.
                    </p>
                    <Link
                      href="/contact?service=Insync%20Home&note=Custom%20Object%20Commission"
                      className={styles.galleryFooterBtn}
                      onClick={() => setIsGalleryOpen(false)}
                    >
                      <span>ENQUIRE NOW</span>
                      <ArrowUpRight className="w-4 h-4 text-[#C5A059]" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Services Experience Component                                 */
/* ------------------------------------------------------------------ */
export default function ServicesExperience({ data, initialProducts }) {
  useReveal();
  const [active, setActive] = useState(0);
  const panelRef = useRef(null);
  const mRefs = useRef([]);
  useParallax(mRefs);

  // Dynamic disciplines from Sanity or default (zero stock dummy photos)
  const services =
    data?.disciplines && data.disciplines.length > 0 ? data.disciplines : DEFAULT_SERVICES;

  const heroEyebrow = data?.heroEyebrow || "OUR PRACTICE";
  const heroTitle = data?.heroTitle || "FIVE DISCIPLINES, one quiet STUDIO.";
  const heroLede =
    data?.heroLede ||
    "From the first sketch to the final cushion, everything under one roof, and one standard.";

  const homeData = {
    eyebrow: data?.homeEyebrow,
    title: data?.homeTitle,
    lede: data?.homeLede,
    homeImage: data?.homeImage,
    homeImageFocus: data?.homeImageFocus,
  };

  // Preload real discipline photos when provided
  useEffect(() => {
    services.forEach((s) => {
      if (s.img && typeof window !== "undefined") {
        const img = new window.Image();
        img.src = s.img;
      }
    });
  }, [services]);

  const go = (i) => {
    if (i === active) return;
    setActive(i);
  };

  const onMove = (e) => {
    const el = panelRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    el.style.setProperty("--tx", `${(-x * 14).toFixed(1)}px`);
    el.style.setProperty("--ty", `${(-y * 14).toFixed(1)}px`);
  };
  const onLeave = () => {
    const el = panelRef.current;
    if (!el) return;
    el.style.setProperty("--tx", "0px");
    el.style.setProperty("--ty", "0px");
  };

  const currentService = services[active] || services[0] || {};

  return (
    <MotionConfig reducedMotion="never">
      <main
        className={styles.root}
        style={{
          fontFamily: "'Bodoni Moda', serif",
          "--sans": "'Montserrat', sans-serif",
        }}
      >
        {/* ---------- HERO ---------- */}
        <motion.section
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className={styles.hero}
        >
          <p className={styles.eyebrow}>{heroEyebrow}</p>
          <h1 className={styles.title}>
            <span className={styles.line}>
              <span>
                {heroTitle.includes("one quiet") ? (
                  <>
                    FIVE DISCIPLINES, <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">one quiet</span> STUDIO.
                  </>
                ) : (
                  heroTitle
                )}
              </span>
            </span>
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-20 h-[1.5px] bg-[#C5A059] mt-5 origin-left"
          />
          <p className={`${styles.lede} ${styles.sans}`}>{heroLede}</p>
        </motion.section>

        {/* ---------- THE 5 DISCIPLINES INDEX ---------- */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className={styles.stage}
          aria-label="Our services"
        >
          <ol className={styles.list}>
            {services.map((s, i) => (
              <motion.li
                key={s.title || i}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`${styles.row} ${active === i ? styles.on : ""}`}
                onMouseEnter={() => go(i)}
                onClick={() => go(i)}
              >
                {/* stacked image: tablet & mobile only */}
                <div className={styles.mImg} ref={(el) => (mRefs.current[i] = el)}>
                  {s.img ? (
                    <span
                      className={styles.mImgInner}
                      style={{
                        backgroundImage: `url("${s.img}")`,
                        backgroundPosition: s.imageFocus || "center",
                      }}
                    />
                  ) : (
                    <div
                      className="w-full h-full flex flex-col items-center justify-center p-6 text-center"
                      style={{
                        background: `linear-gradient(150deg, ${s.tone?.[0] || "#e9e3d5"}, ${s.tone?.[1] || "#cdc2a9"})`,
                      }}
                    >
                      <span className="font-serif text-[32px] text-[#C5A059]/40 mb-1 font-light">
                        {s.no}
                      </span>
                      <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#7A746B] font-semibold">
                        {s.title}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className={styles.rowHead}
                  onClick={(e) => {
                    e.stopPropagation();
                    go(i);
                  }}
                  aria-expanded={active === i}
                >
                  <span className={`${styles.no} ${styles.sans}`}>{s.no}</span>
                  <span className={styles.rowTitle}>{s.title}</span>
                  {s.shop && <span className={`${styles.shopTag} ${styles.sans}`}>Shop &amp; customise</span>}
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                </button>

                <div className={styles.rowBody}>
                  <div>
                    <p className={`${styles.desc} ${styles.sans}`}>{s.line}</p>
                    {Array.isArray(s.tags) && s.tags.length > 0 && (
                      <ul className={`${styles.tags} ${styles.sans}`}>
                        {s.tags.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    )}
                    <div className={`${styles.links} ${styles.sans}`}>
                      <Link href={enquire(s.title)}>Enquire →</Link>
                      {s.shop && <a href="#insync-home">Customise a piece ↓</a>}
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>

          {/* sticky image panel: desktop only */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className={styles.panelWrap}
            aria-hidden="true"
          >
            <div className={styles.panel} ref={panelRef} onMouseMove={onMove} onMouseLeave={onLeave}>
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  className={styles.slideMotion}
                  initial={{ y: "100%", zIndex: 2 }}
                  animate={{ y: "0%", zIndex: 2 }}
                  exit={{ y: "-20%", opacity: 0.35, zIndex: 1 }}
                  transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className={styles.slideInner}
                    initial={{ y: "-12%", scale: 1.06 }}
                    animate={{ y: "0%", scale: 1 }}
                    transition={{ duration: 1.02, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {currentService.img ? (
                      <img
                        src={currentService.img}
                        alt={currentService.title}
                        className={styles.slideImg}
                        style={{ objectPosition: currentService.imageFocus || "50% 50%" }}
                      />
                    ) : (
                      <div
                        className={styles.slideImg}
                        style={{
                          background: `linear-gradient(150deg, ${currentService.tone?.[0] || "#e9e3d5"}, ${currentService.tone?.[1] || "#cdc2a9"})`,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "2rem",
                          textAlign: "center",
                        }}
                      >
                        <span className="font-serif text-[46px] text-[#C5A059]/40 mb-2 font-light">
                          {currentService.no}
                        </span>
                        <span className="font-sans text-[11px] uppercase tracking-[0.24em] text-[#7A746B] font-semibold">
                          {currentService.title}
                        </span>
                        <span className="mt-4 text-[9.5px] font-sans tracking-[0.2em] uppercase text-[#C5A059] border border-[#C5A059]/40 px-3 py-1">
                          Insync Discipline
                        </span>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`chip-${active}`}
                  className={`${styles.chip} ${styles.sans}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <b>{currentService.no}</b>
                  <span>{currentService.title}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.section>

        {/* ---------- INSYNC HOME (Dynamic products from Sanity) ---------- */}
        <HomeShowcase products={initialProducts} homeData={homeData} />

        {/* ---------- CLOSING ---------- */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className={styles.cta}
        >
          <p className={styles.eyebrow}>BEGIN</p>
          <h2 className={styles.ctaTitle}>
            NOT SURE WHERE <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">to begin?</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-14 h-[1.5px] bg-[#C5A059] mx-auto my-5 origin-center"
          />
          <p className={`${styles.homeLede} ${styles.sans}`} style={{ margin: "0 auto 2.4rem" }}>
            Tell us about your space. We will suggest the right path.
          </p>
          <Link href="/contact" className={`${styles.btn} ${styles.sans}`}>
            <span>Start a conversation</span>
            <i aria-hidden="true">→</i>
          </Link>
        </motion.section>
      </main>
    </MotionConfig>
  );
}