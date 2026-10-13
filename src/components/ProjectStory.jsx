"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import styles from "./ProjectStory.module.css";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500"], style: ["normal", "italic"] });
const sans = Manrope({ subsets: ["latin"], weight: ["300", "400", "500"] });

/* fade-up when scrolled into view (marks [data-reveal] elements with data-in) */
function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]:not([data-in])");
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
  }, [dep]);
}

/*
  PROJECT DISPLAY PAGE (everything except the gallery)
  Order: ‹ Projects → title → tagline → facts + concept → "+" → [GALLERY SLOT] → more projects

  Props (all come from data/projects.js through the route):
    project  { slug, title, tagline, location, type, year, area, status, materials[], concept[], hero, cover, chapters[] }
    next, others   other projects, used for "More projects"
*/
export default function ProjectStory({ project, next, others }) {
  const p = project;
  useReveal(p.slug);

  const facts = [
    ["Location", p.location],
    ["Typology", p.type],
    ["Year", p.year],
    ["Area", p.area],
    ["Status", p.status],
    ["Materials", p.materials?.join(", ")],
  ].filter(([, v]) => v);

  const more = [next, ...(others || [])].filter(Boolean).slice(0, 3);

  return (
    <main className={`${styles.root} ${serif.className}`} style={{ "--sans": sans.style.fontFamily }}>
      {/* ---------- title ---------- */}
      <header className={styles.head}>
        <Link href="/portfolio" className={`${styles.back} ${styles.sans}`}>
          <span aria-hidden="true">‹</span> Projects
        </Link>
        <h1 className={styles.h1}>
          <span className={styles.line}><span>{p.title}</span></span>
        </h1>
        {p.tagline && <p className={styles.tagline}>{p.tagline}</p>}
      </header>

      {/* ---------- facts + concept ---------- */}
      <section className={styles.info}>
        <dl className={`${styles.facts} ${styles.sans}`} data-reveal>
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.concept} data-reveal>
          {p.concept.map((t, i) => <p key={i}>{t}</p>)}
        </div>
      </section>

      <div className={styles.plus} aria-hidden="true"><i /></div>

      {/* ---------- GALLERY SLOT ----------
          Build your gallery component here. Everything you need is on `p`:
            p.hero                 the lead image   { src, alt, ar? }
            p.chapters[]           [{ title?, text?, quote?, images: [{ src, alt, caption?, ar? }] }]
          Example:   <ProjectGallery project={p} />
          It sits inside the same centred width as the rest of the page.                    */}
      <section className={styles.gallery} id="gallery">
        {/* <ProjectGallery project={p} /> */}
      </section>

      {/* ---------- more projects ---------- */}
      {more.length > 0 && (
        <section className={styles.more} aria-label="More projects">
          <div className={styles.moreInner}>
            <h2 className={`${styles.moreHead} ${styles.sans}`}>More projects</h2>
            <ul className={styles.moreGrid}>
              {more.map((o, i) => (
                <li key={o.slug} data-reveal style={{ "--k": i }}>
                  <Link href={`/portfolio/${o.slug}`}>
                    <span
                      className={styles.thumb}
                      style={{
                        backgroundImage: o.cover?.src
                          ? `url(${o.cover.src})`
                          : `linear-gradient(165deg, ${o.tone?.[0] || "#e6dcc6"}, ${o.tone?.[0] || "#e6dcc6"})`,
                        backgroundPosition: o.cover?.focus || "50% 50%",
                      }}
                    />
                    <h3>{o.title}</h3>
                    <p className={styles.sans}>{o.location}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles.allWrap}>
              <Link href="/portfolio" className={`${styles.all} ${styles.sans}`}>
                View all projects <i aria-hidden="true">→</i>
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}