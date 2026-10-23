"use client";

import { useEffect } from "react";
import Link from "next/link";
import ProjectGallery from "./ProjectGallery";
import styles from "./ProjectStory.module.css";

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
    <main className={styles.root}>
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
        <div className={`${styles.concept} ${styles.sans}`} data-reveal>
          {p.concept.map((t, i) => <p key={i}>{t}</p>)}
        </div>
      </section>

      {/* ---------- 5-Column Editorial Gallery Matching Reference ---------- */}
      <section className={styles.gallery} id="gallery">
        <ProjectGallery project={p} />
      </section>

      {/* ---------- more projects ---------- */}
      {more.length > 0 && (
        <section className={styles.more} aria-label="More projects">
          <div className={styles.moreInner}>
            <h2 className={`${styles.moreHead} ${styles.sans}`}>More projects</h2>
            <ul className={styles.moreGrid}>
              {more.map((o, i) => (
                <li key={o.slug} data-reveal style={{ "--k": i }}>
                  <Link
                    href={`/portfolio/${o.slug}`}
                    className="group block focus-visible:outline-2 focus-visible:outline-[#C5A059]"
                    aria-label={`View project: ${o.title}`}
                  >
                    {/* Image Container with Inner Hairline Hover Frame matching Home Page */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE6DE] rounded-xs shadow-[0_12px_30px_-15px_rgba(27,26,23,0.08)]">
                      {/* Primary Architectural Photograph */}
                      <img
                        src={o.cover?.src}
                        alt={o.cover?.alt || o.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        style={{ objectPosition: o.cover?.focus || "50% 50%" }}
                      />

                      {/* Dark Vignette Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />

                      {/* Inner White Hairline Frame with "VIEW PROJECT" */}
                      <div className="absolute inset-4 sm:inset-5 border border-white/85 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none flex items-center justify-center">
                        <span className="text-[12px] sm:text-[12.5px] font-sans uppercase tracking-[0.25em] text-white font-medium select-none drop-shadow-sm">
                          VIEW PROJECT
                        </span>
                      </div>
                    </div>

                    {/* Project Details Below Image */}
                    <div className="mt-4 sm:mt-5 text-left space-y-1">
                      <h3 className="font-serif text-[18px] sm:text-[20px] md:text-[22px] tracking-[0.06em] text-[#1A1A1A] font-normal group-hover:text-[#C5A059] transition-colors duration-300">
                        {o.title}
                      </h3>
                      <p className={`${styles.sans} text-[11px] sm:text-[11.5px] uppercase tracking-[0.22em] text-[#6B665F] font-medium`}>
                        {o.location}
                      </p>
                    </div>
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