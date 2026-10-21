"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import styles from "./SpacesInMotion.module.css";

/* ------------------------------------------------------------------ */
/* EDIT HERE ONLY                                                     */
/* href    : the reel's Instagram link (opens in a new tab)           */
/* poster  : thumbnail image, e.g. "/reels/courtyard.jpg" (optional)  */
/* preview : 3–4s silent mp4, e.g. "/reels/courtyard.mp4" (optional)  */
/* ------------------------------------------------------------------ */

const INSTAGRAM_PROFILE = "https://www.instagram.com/insync_interiors/?hl=en";

const REELS = [
  { title: "Courtyard Residence", tag: "Walkthrough", href: INSTAGRAM_PROFILE, poster: null, preview: null },
  { title: "Aurum Penthouse", tag: "Transformation", href: INSTAGRAM_PROFILE, poster: null, preview: null },
  { title: "The Quiet Suite", tag: "Walkthrough", href: INSTAGRAM_PROFILE, poster: null, preview: null },
  { title: "Linea Workspace", tag: "Behind the scenes", href: INSTAGRAM_PROFILE, poster: null, preview: null },
  { title: "Sandstone Villa", tag: "Transformation", href: INSTAGRAM_PROFILE, poster: null, preview: null },
  { title: "Ivory Boutique", tag: "Walkthrough", href: INSTAGRAM_PROFILE, poster: null, preview: null },
];

const EASE = [0.16, 1, 0.3, 1];

function ReelTile({ reel }) {
  const vid = useRef(null);
  const tile = useRef(null);

  const saveData = () =>
    typeof navigator !== "undefined" && navigator.connection && navigator.connection.saveData;

  const play = () => {
    if (saveData()) return;
    vid.current?.play().catch(() => {});
  };

  const stop = () => {
    const v = vid.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  // Touch screens have no hover: play the preview while the tile is centred
  useEffect(() => {
    if (!reel.preview || !tile.current) return;
    if (window.matchMedia("(hover: hover)").matches) return;

    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting && e.intersectionRatio > 0.75 ? play() : stop()),
      { threshold: [0, 0.75, 1] }
    );
    io.observe(tile.current);
    return () => io.disconnect();
  }, [reel.preview]);

  return (
    <a
      ref={tile}
      href={reel.href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.reel}
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
      aria-label={`${reel.title}, ${reel.tag}. Watch on Instagram (opens in a new tab)`}
    >
      <div className={styles.frame}>
        {reel.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={reel.poster} alt="" loading="lazy" className={styles.poster} />
        ) : (
          <span className={styles.ph}>Reel thumbnail · 9:16</span>
        )}
        {reel.preview && (
          <video
            ref={vid}
            src={reel.preview}
            muted
            loop
            playsInline
            preload="none"
            className={styles.video}
          />
        )}
        <span className={styles.play} aria-hidden="true">
          <i />
        </span>
        <span className={styles.go} aria-hidden="true">
          Watch on Instagram <ArrowUpRight size={14} />
        </span>
      </div>
      <p className={styles.tag}>{reel.tag}</p>
      <h3 className={styles.name}>{reel.title}</h3>
      {/* always visible on touch screens, where there is no hover */}
      <span className={styles.watch}>Watch on Instagram ↗</span>
    </a>
  );
}

export default function SpacesInMotion() {
  const rail = useRef(null);
  const [pos, setPos] = useState({ p: 0, start: true, end: false });

  const onScroll = () => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setPos({
      p: max > 0 ? el.scrollLeft / max : 0,
      start: el.scrollLeft < 8,
      end: el.scrollLeft > max - 8,
    });
  };

  useEffect(() => {
    onScroll();
  }, []);

  const thumb = 22; // % width of the progress thumb

  return (
    <section className={styles.section} aria-labelledby="motion-title">
      <div className={styles.rule}>
        <span className={styles.eyebrow}>WALKTHROUGHS &amp; TRANSFORMATIONS</span>
        <span className={styles.note}>Seen on Instagram</span>
      </div>

      <motion.h2
        id="motion-title"
        className={styles.title}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        SPACES <span className={`${styles.script} montecarlo-regular`}>in motion</span>
      </motion.h2>

      <motion.div
        className={styles.railWrap}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
      >
        <div className={styles.rail} ref={rail} onScroll={onScroll}>
          {REELS.map((r) => (
            <ReelTile key={r.title} reel={r} />
          ))}
        </div>
      </motion.div>

      <div className={styles.bar}>
        <div className={styles.track} aria-hidden="true">
          <span style={{ width: `${thumb}%`, left: `${pos.p * (100 - thumb)}%` }} />
        </div>

        <a
          href={INSTAGRAM_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ul}
        >
          Follow on Instagram ↗
        </a>
      </div>
    </section>
  );
}
