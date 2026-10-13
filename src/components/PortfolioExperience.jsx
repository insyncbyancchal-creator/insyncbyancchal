"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./PortfolioExperience.module.css";

function useReveal() {
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
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function PortfolioExperience({ projects }) {
  useReveal();

  return (
    <main className={styles.root}>
      {/* ---------------- Section Editorial Header below Hero Banner ---------------- */}
      <header className={styles.sectionHeader} data-reveal>
        <p className={styles.headerEyebrow}>
          SELECTED COMMISSIONS &bull; 2022 &ndash; 2026
        </p>
        <h2 className={styles.headerTitle}>
          CURATED SPACES <span className={`montecarlo-regular ${styles.headerScript}`}>and bespoke</span> LIVING
        </h2>
        <div className={styles.headerLine} />
        <p className={styles.headerLede}>
          Each commission is an intimate architectural dialogue between monolithic stone volumes, calibrated natural daylight, and hand-finished artisan materials.
        </p>
      </header>

      {/* ---------------- Projects List (Consistent Left Text, Right Image Sequence) ---------------- */}
      <section className={styles.container} aria-label="Selected Projects">
        {projects.map((p, index) => {
          const isLast = index === projects.length - 1;
          const isFlipped = index % 2 === 1; // Even index: Text Left / Image Right; Odd index: Image Left / Text Right

          return (
            <div key={p.slug} className={styles.projectItem}>
              <article
                className={`${styles.projectRow} ${isFlipped ? styles.projectRowFlipped : ""}`}
                data-reveal
              >
                {!isFlipped ? (
                  <>
                    {/* Left Column: Title in Gold, Location, Description, Button */}
                    <div className={styles.textCol}>
                      <h2 className={styles.title}>
                        <Link href={`/portfolio/${p.slug}`}>{p.title}</Link>
                      </h2>

                      <span className={styles.location}>{p.location}</span>

                      <p className={styles.description}>{p.description}</p>

                      <div>
                        <Link href={`/portfolio/${p.slug}`} className={styles.exploreBtn}>
                          EXPLORE PROJECT
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Wide Landscape Architectural Photography */}
                    <div className={styles.mediaCol}>
                      <Link
                        href={`/portfolio/${p.slug}`}
                        className={styles.imageFrame}
                        aria-label={`${p.title}, ${p.location}`}
                      >
                        <img
                          src={p.cover?.src}
                          alt={p.title}
                          className={styles.primaryImg}
                          loading="lazy"
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
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Left Column: Wide Landscape Architectural Photography */}
                    <div className={styles.mediaCol}>
                      <Link
                        href={`/portfolio/${p.slug}`}
                        className={styles.imageFrame}
                        aria-label={`${p.title}, ${p.location}`}
                      >
                        <img
                          src={p.cover?.src}
                          alt={p.title}
                          className={styles.primaryImg}
                          loading="lazy"
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
                      </Link>
                    </div>

                    {/* Right Column: Title in Gold, Location, Description, Button */}
                    <div className={styles.textCol}>
                      <h2 className={styles.title}>
                        <Link href={`/portfolio/${p.slug}`}>{p.title}</Link>
                      </h2>

                      <span className={styles.location}>{p.location}</span>

                      <p className={styles.description}>{p.description}</p>

                      <div>
                        <Link href={`/portfolio/${p.slug}`} className={styles.exploreBtn}>
                          EXPLORE PROJECT
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </article>

              {/* Generous Gold Hairline Separator Between Projects */}
              {!isLast && <div className={styles.divider} aria-hidden="true" />}
            </div>
          );
        })}
      </section>
    </main>
  );
}