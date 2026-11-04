"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
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
      if (e.key === "Escape") {
        setIsGalleryOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isGalleryOpen]);

  // Dynamic responsive columns for editorial masonry
  const [numCols, setNumCols] = useState(4);

  useEffect(() => {
    function computeCols() {
      const w = window.innerWidth;
      if (w < 640) setNumCols(1);
      else if (w < 960) setNumCols(2);
      else if (w < 1380) setNumCols(3);
      else setNumCols(4);
    }
    computeCols();
    window.addEventListener("resize", computeCols);
    return () => window.removeEventListener("resize", computeCols);
  }, []);

  const columns = useMemo(() => {
    const cols = Array.from({ length: numCols }, () => []);
    allProducts.forEach((item, index) => {
      cols[index % numCols].push({ item, index });
    });
    return cols;
  }, [allProducts, numCols]);

  // Main showcase photo: Sanity uploaded homeImage or first product or fallback
  const featurePhoto =
    homeData?.homeImage ||
    allProducts[0]?.img ||
    "/hero/photo%20(3).avif";
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
              "A curated collection of home décor and collectible objects selected by the studio. Finished pieces, ready to acquire and bring timeless character to your home."}
          </p>

          <div className={styles.homePillars}>
            <div className={styles.pillarItem}>
              <span className={styles.pillarNo}>01</span>
              <span className={styles.pillarTitle}>Curated Form</span>
              <span className={styles.pillarDesc}>
                Handpicked objects crafted with architectural proportion.
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
              <span className={styles.pillarTitle}>Ready to Acquire</span>
              <span className={styles.pillarDesc}>
                Available finished pieces crafted in limited atelier capsules.
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
              Click to view all {allProducts.length} curated objects &amp; atelier pieces
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
                {/* Multi-Column Masonry like Project Gallery */}
                <div
                  className={styles.galleryMasonry}
                  style={{
                    gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`,
                  }}
                >
                  {columns.map((col, colIdx) => (
                    <div key={colIdx} className={styles.masonryCol}>
                      {col.map(({ item: prod, index: idx }) => (
                        <article
                          key={prod.id || prod._id || idx}
                          className={styles.galleryCard}
                        >
                          <div
                            className={styles.galleryThumb}
                            style={{ aspectRatio: prod.aspectRatio || "3 / 4" }}
                          >
                            {prod.img ? (
                              <img
                                src={prod.img}
                                alt={prod.name}
                                loading={idx < 8 ? "eager" : "lazy"}
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

                            {/* Viewfinder Architectural Corner Crosshairs */}
                            <div className={styles.cornerTL} />
                            <div className={styles.cornerTR} />
                            <div className={styles.cornerBL} />
                            <div className={styles.cornerBR} />

                            {/* Plate Badge */}
                            <div className={styles.viewfinderBadge}>
                              PLATE {String(idx + 1).padStart(2, "0")}
                            </div>
                          </div>

                          {/* Product Name ONLY */}
                          <h3 className={styles.galleryCardName}>{prod.name}</h3>
                        </article>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Atelier Enquiry Section Placed at Last */}
                <div className={styles.galleryFooterCta}>
                  <div className={styles.galleryFooterInner}>
                    <p className={styles.galleryFooterEyebrow}>ATELIER ACQUISITIONS</p>
                    <h4 className={styles.galleryFooterHeading}>
                      ACQUIRE AN <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">atelier piece</span>
                    </h4>
                    <div className={styles.galleryFooterDivider} />
                    <p className={`${styles.galleryFooterText} ${styles.sans}`}>
                      Every piece in the Insync Home collection is an original studio creation. Inquire to acquire an available object or arrange a private gallery viewing.
                    </p>
                    <Link
                      href="/contact?service=Insync%20Home&note=Acquire%20Atelier%20Object"
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

const slideVariants = {
  enter: (direction) => ({
    y: direction >= 0 ? "100%" : "-100%",
    opacity: 1,
    zIndex: 2,
  }),
  center: {
    y: "0%",
    opacity: 1,
    zIndex: 2,
    transition: {
      y: { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.3, ease: "easeOut" },
    },
  },
  exit: (direction) => ({
    y: direction >= 0 ? "-26%" : "26%",
    opacity: 0,
    zIndex: 1,
    transition: {
      y: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.28, ease: "easeIn" },
    },
  }),
};

const innerVariants = {
  enter: (direction) => ({
    y: direction >= 0 ? "-8%" : "8%",
    scale: 1.05,
  }),
  center: {
    y: "0%",
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction) => ({
    y: direction >= 0 ? "3%" : "-3%",
    scale: 1.02,
    transition: {
      duration: 0.38,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

/* ------------------------------------------------------------------ */
/*  Main Services Experience Component                                 */
/* ------------------------------------------------------------------ */
export default function ServicesExperience({ data, initialProducts }) {
  useReveal();
  const [[active, direction], setActiveState] = useState([0, 1]);
  const hoverTimeoutRef = useRef(null);
  const panelRef = useRef(null);
  const rectRef = useRef(null);
  const rafRef = useRef(null);
  const mRefs = useRef([]);
  useParallax(mRefs);

  // Dynamic disciplines from Sanity or default (zero stock dummy photos)
  const services =
    data?.disciplines && data.disciplines.length > 0 ? data.disciplines : DEFAULT_SERVICES;

  const heroEyebrow = data?.heroEyebrow || "OUR PRACTICE";
  const heroTitle = (data?.heroTitle || "FIVE DISCIPLINES, one unified STUDIO.").replace(/one quiet/gi, "one unified");
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

  const go = useCallback((i) => {
    setActiveState(([prevActive]) => {
      if (i === prevActive) return [prevActive, 0];
      const dir = i > prevActive ? 1 : -1;
      return [i, dir];
    });
  }, []);

  const handleRowHover = useCallback((i) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      go(i);
    }, 35);
  }, [go]);

  const handleRowClick = useCallback((i) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    go(i);
  }, [go]);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const onEnterPanel = useCallback(() => {
    if (panelRef.current) {
      rectRef.current = panelRef.current.getBoundingClientRect();
    }
  }, []);

  const onMove = useCallback((e) => {
    const el = panelRef.current;
    if (!el) return;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const r = rectRef.current || el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      el.style.setProperty("--tx", `${(-x * 12).toFixed(1)}px`);
      el.style.setProperty("--ty", `${(-y * 12).toFixed(1)}px`);
    });
  }, []);

  const onLeave = useCallback(() => {
    rectRef.current = null;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const el = panelRef.current;
    if (!el) return;
    el.style.setProperty("--tx", "0px");
    el.style.setProperty("--ty", "0px");
  }, []);

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
                {heroTitle.includes("one unified") ? (
                  <>
                    FIVE DISCIPLINES, <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">one unified</span> STUDIO.
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
                onMouseEnter={() => handleRowHover(i)}
                onClick={() => handleRowClick(i)}
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
                    handleRowClick(i);
                  }}
                  aria-expanded={active === i}
                >
                  <span className={`${styles.no} ${styles.sans}`}>{s.no}</span>
                  <span className={styles.rowTitle}>{s.title}</span>
                  {s.shop && <span className={`${styles.shopTag} ${styles.sans}`}>Curated collection</span>}
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
                      {s.shop && <a href="#insync-home">Explore the collection ↓</a>}
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>

          {/* sticky image panel: desktop only */}
          <div className={styles.panelWrap} aria-hidden="true">
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className={styles.panel}
              ref={panelRef}
              onMouseEnter={onEnterPanel}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={active}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className={styles.slideMotion}
                >
                  <motion.div
                    custom={direction}
                    variants={innerVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className={styles.slideInner}
                  >
                    {currentService.img ? (
                      <img
                        src={currentService.img}
                        alt={currentService.title}
                        className={styles.slideImg}
                        decoding="async"
                        loading="eager"
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
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  <b>{currentService.no}</b>
                  <span>{currentService.title}</span>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
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