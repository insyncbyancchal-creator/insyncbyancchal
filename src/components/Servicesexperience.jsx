"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import styles from "./Servicesexperience.module.css";

/* ------------------------------------------------------------------
   EDIT HERE: the five services.
   - img: replace null with a path from /public, e.g. "/services/interior.jpg"
          (portrait, about 4:5, at least 1400px tall, under 400 KB).
          Until then, a soft gradient placeholder is shown.
   - tone: the placeholder gradient colours.
   - Keep the titles in sync with PROJECT_TYPES in the contact form.
------------------------------------------------------------------- */
const SERVICES = [
  {
    no: "01",
    title: "Architectural Design",
    line: "Spaces conceived from the ground up, where structure, light and proportion are resolved before a single finish is chosen.",
    tags: ["Concept", "Planning", "Elevations"],
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=75&w=1000&auto=format&fit=crop",
    tone: ["#e9e3d5", "#cdc2a9"],
  },
  {
    no: "02",
    title: "Interior Design",
    line: "Rooms composed with restraint: layered materials, considered light, and furniture that truly belongs.",
    tags: ["Space planning", "Materials", "Lighting"],
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=75&w=1000&auto=format&fit=crop",
    tone: ["#dccdb4", "#a98f68"],
  },
  {
    no: "03",
    title: "Procurement",
    line: "Furniture, fittings and finishes sourced and negotiated on your behalf, to the standard we would specify for ourselves.",
    tags: ["Sourcing", "Vendors", "Quality checks"],
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=75&w=1000&auto=format&fit=crop",
    tone: ["#e4dac2", "#b99a5b"],
  },
  {
    no: "04",
    title: "Delivery & Installation",
    line: "Every piece delivered, placed and finished by our own team, so the room you approved is the room you receive.",
    tags: ["Logistics", "Installation", "Styling"],
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=75&w=1000&auto=format&fit=crop",
    tone: ["#cfc8ba", "#8f8878"],
  },
  {
    no: "05",
    title: "Insync Home",
    line: "A collection of home décor made to be customised, to your dimensions, finishes and taste.",
    tags: ["Décor", "Made to order", "Customisable"],
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=75&w=1000&auto=format&fit=crop",
    tone: ["#efe4cb", "#c4a56a"],
    shop: true,
  },
];

/* ------------------------------------------------------------------
   Insync Home: Bespoke Objects Catalog & Customizer
------------------------------------------------------------------- */
const BESPOKE_PRODUCTS = [
  {
    id: "plinth",
    no: "01",
    name: "Monolithic Travertine Plinth",
    category: "Stone Furniture",
    desc: "Hand-carved Italian travertine with distinctive geological veining and honed bevels.",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=75&w=650&auto=format&fit=crop",
    badge: "Bespoke Stone",
    options: "Travertine · Marble · Onyx",
  },
  {
    id: "lighting",
    no: "02",
    name: "Alabaster & Brass Pendant",
    category: "Architectural Lighting",
    desc: "Solid Spanish alabaster sphere with hand-brushed brass emitting ambient luminescence.",
    img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=75&w=650&auto=format&fit=crop",
    badge: "Made to Order",
    options: "Alabaster · Fluted Glass",
  },
  {
    id: "chair",
    no: "03",
    name: "Solstice Bouclé Lounge Chair",
    category: "Bespoke Seating",
    desc: "Sculptural low-slung curves in tactile French bouclé over a kiln-dried hardwood frame.",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=75&w=650&auto=format&fit=crop",
    badge: "Atelier Crafted",
    options: "Bouclé · Linen · Leather",
  },
  {
    id: "mirror",
    no: "04",
    name: "Monumental Arched Atelier Mirror",
    category: "Architectural Accents",
    desc: "Hand-rolled iron frame with deep architectural reveal and beveled crystal glass.",
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=75&w=650&auto=format&fit=crop",
    badge: "Custom Dimensions",
    options: "Aged Bronze · Brass · Steel",
  },
];

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
        if (r.bottom < -100 || r.top > vh + 100) return; // Skip off-screen images to avoid layout thrashing
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

const bg = (s) =>
  s.img ? `url("${s.img}"), linear-gradient(150deg, ${s.tone[0]}, ${s.tone[1]})` : `linear-gradient(150deg, ${s.tone[0]}, ${s.tone[1]})`;

/* ------------------------------------------------------------------ */
/*  Insync Home: Curated Pieces Showcase                               */
/* ------------------------------------------------------------------ */
function HomeShowcase() {
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
        <p className={styles.eyebrow}>INSYNC HOME</p>
        <h2 className={styles.homeTitle}>
          CURATED OBJECTS, <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">made for your</span> SPACE.
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-16 h-[1.5px] bg-[#C5A059] mx-auto my-5 origin-center"
        />
        <p className={`${styles.homeLede} ${styles.sans}`}>
          Our home collection is crafted to order in our partner ateliers. Each piece is customizable in dimensions, materials and artisan finishes.
        </p>
      </motion.div>

      {/* Grid of Décor Product Cards */}
      <div className={styles.homeGrid}>
        {BESPOKE_PRODUCTS.map((prod, idx) => (
          <motion.article
            key={prod.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.85,
              delay: (idx % 2) * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={styles.homeCard}
          >
            <div className={styles.cardThumb}>
              <motion.img
                initial={{ scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                src={prod.img}
                alt={prod.name}
                loading="lazy"
                decoding="async"
              />
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
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function ServicesExperience() {
  useReveal();
  const [active, setActive] = useState(0);
  const panelRef = useRef(null);
  const mRefs = useRef([]);
  useParallax(mRefs);

  // Preload all 5 service images so image transitions are instantaneous with zero delay
  useEffect(() => {
    SERVICES.forEach((s) => {
      if (s.img && typeof window !== "undefined") {
        const img = new window.Image();
        img.src = s.img;
      }
    });
  }, []);

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
          <p className={styles.eyebrow}>OUR PRACTICE</p>
          <h1 className={styles.title}>
            <span className={styles.line}>
              <span>
                FIVE DISCIPLINES, <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">one quiet</span> STUDIO.
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
          <p className={`${styles.lede} ${styles.sans}`}>
            From the first sketch to the final cushion, everything under one roof, and one standard.
          </p>
        </motion.section>

        {/* ---------- THE INDEX ---------- */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className={styles.stage}
          aria-label="Our services"
        >
          <ol className={styles.list}>
            {SERVICES.map((s, i) => (
              <motion.li
                key={s.title}
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
                  <span className={styles.mImgInner} style={{ backgroundImage: bg(s) }} />
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
                    <ul className={`${styles.tags} ${styles.sans}`}>
                      {s.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
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
                    {SERVICES[active].img ? (
                      <img
                        src={SERVICES[active].img}
                        alt={SERVICES[active].title}
                        className={styles.slideImg}
                      />
                    ) : (
                      <div
                        className={styles.slideImg}
                        style={{
                          background: `linear-gradient(150deg, ${SERVICES[active].tone[0]}, ${SERVICES[active].tone[1]})`,
                        }}
                      />
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
                  <b>{SERVICES[active].no}</b>
                  <span>{SERVICES[active].title}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.section>

        {/* ---------- INSYNC HOME ---------- */}
        <HomeShowcase />

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