"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { ArrowDown, ArrowUp, ArrowUpRight } from "lucide-react";
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
  const [isExpanded, setIsExpanded] = useState(false);

  // Filter out any deleted or nameless items so NO EMPTY CARD can ever render
  const allProducts = (products && products.length > 0 ? products : DEFAULT_PRODUCTS).filter(
    (p) => p && p.name
  );

  // 4 + 4 = 8 products displayed initially, expand to reveal all
  const displayProducts = isExpanded ? allProducts : allProducts.slice(0, 8);
  const hasMore = !isExpanded && allProducts.length > 8;

  const handleDiscoverMore = () => {
    setIsExpanded(true);
  };

  const handleShowLess = () => {
    setIsExpanded(false);
    const el = document.getElementById("insync-home");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className={styles.homeSection} id="insync-home">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        className={styles.homeHeader}
      >
        <p className={styles.eyebrow}>{homeData?.eyebrow || "INSYNC HOME"}</p>
        <h2 className={styles.homeTitle}>
          {homeData?.title ? (
            homeData.title
          ) : (
            <>
              CURATED OBJECTS, <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">made for your</span> SPACE.
            </>
          )}
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-16 h-[1.5px] bg-[#C5A059] mx-auto my-5 origin-center"
        />
        <p className={`${styles.homeLede} ${styles.sans}`}>
          {homeData?.lede ||
            "Our home collection is crafted to order in our partner ateliers. Each piece is customizable in dimensions, materials and artisan finishes."}
        </p>
      </motion.div>

      {/* Grid of Décor Product Cards */}
      <div className={styles.homeGrid}>
        <AnimatePresence mode="popLayout">
          {displayProducts.map((prod, idx) => (
            <motion.article
              key={prod.id || prod._id || idx}
              layout
              initial={{ opacity: 0, y: 35, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.55,
                delay: (idx % 4) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={styles.homeCard}
            >
              <div className={styles.cardThumb}>
                {prod.img ? (
                  <img
                    src={prod.img}
                    alt={prod.name}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: prod.imageFocus || "50% 50%" }}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 will-change-transform"
                  />
                ) : (
                  <div className={styles.thumbPlaceholder}>
                    <span className={styles.placeholderBrand}>INSYNC</span>
                    <div className={styles.placeholderDivider} />
                    <span className={styles.placeholderText}>OBJECT ARCHIVE</span>
                  </div>
                )}
                {prod.badge && <span className={`${styles.cardBadge} ${styles.sans}`}>{prod.badge}</span>}
              </div>

              <div className={`${styles.cardMeta} ${styles.sans}`}>
                <span className={styles.cardNo}>{prod.no}</span>
                <span className={styles.cardCategory}>{prod.category}</span>
              </div>

              <h3 className={styles.cardTitle}>{prod.name}</h3>

              <p className={`${styles.cardDesc} ${styles.sans}`}>{prod.desc}</p>

              <div className={`${styles.cardFooter} ${styles.sans}`}>
                <span className={styles.cardCustomTag}>{prod.options}</span>
                <Link
                  href={enquire("Insync Home", `Enquiry for ${prod.name}`)}
                  className={styles.cardLink}
                  aria-label={`Enquire about ${prod.name}`}
                >
                  <span>Enquire</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Discover More Action Button */}
      {hasMore ? (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <button
            onClick={handleDiscoverMore}
            className="group relative inline-flex items-center gap-3.5 px-10 py-4 border border-[#C5A059] bg-transparent text-[#1A1A1A] hover:bg-[#C5A059] hover:text-white transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-none text-[11px] sm:text-[11.5px] uppercase tracking-[0.26em] font-semibold cursor-pointer shadow-[0_4px_16px_rgba(197,160,89,0.15)] hover:shadow-[0_10px_28px_rgba(197,160,89,0.35)] hover:-translate-y-0.5 active:scale-98"
            aria-label="Discover all remaining curated pieces"
          >
            <span>DISCOVER MORE PIECES</span>
            <ArrowDown className="w-4 h-4 text-[#C5A059] group-hover:text-white transition-transform duration-300 group-hover:translate-y-1" />
          </button>
          <p className="mt-3.5 text-[11px] font-sans uppercase tracking-[0.2em] text-[#8C857B]">
            Showing 8 of {allProducts.length} curated objects &bull; Click to reveal all
          </p>
        </motion.div>
      ) : (
        allProducts.length > 8 && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 sm:mt-16 text-center space-y-4"
          >
            <p className="text-[11.5px] font-sans uppercase tracking-[0.24em] text-[#8C857B] font-medium">
              SHOWING ALL {allProducts.length} BESPOKE COMMISSIONS
            </p>
            <div className="flex justify-center items-center gap-4 flex-wrap">
              <button
                onClick={handleShowLess}
                className="group inline-flex items-center gap-2.5 px-7 py-3 border border-[#C5A059]/40 bg-white/70 text-[#1A1A1A] hover:border-[#C5A059] hover:bg-[#C5A059]/10 transition-all duration-300 text-[10.5px] uppercase tracking-[0.22em] font-medium cursor-pointer shadow-xs"
              >
                <span>SHOW LESS</span>
                <ArrowUp className="w-3.5 h-3.5 text-[#C5A059] transition-transform duration-300 group-hover:-translate-y-0.5" />
              </button>
              <Link
                href="/contact?service=Insync%20Home&note=Custom%20Object%20Commission"
                className="group inline-flex items-center gap-3 px-8 py-3.5 border border-[#C5A059] bg-[#1A1A1A] text-[#FBF9F6] hover:bg-[#C5A059] hover:text-[#1A1A1A] transition-all duration-300 text-[10.5px] sm:text-[11px] uppercase tracking-[0.24em] font-semibold cursor-pointer shadow-xs active:scale-98"
              >
                <span>COMMISSION A BESPOKE PIECE</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A059] group-hover:text-[#1A1A1A] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        )
      )}
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