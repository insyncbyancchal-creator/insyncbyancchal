"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  PATHS,
  LETTERS,
  DOT,
  STEM,
  FRAME,
  GUIDES,
  SHEEN_VEC,
  BY_TRANSFORM,
  INK,
  GOLD,
  CHAMPAGNE,
  GRID_STROKE,
} from "./preloader-gold-data";
import styles from "./PreloaderGold.module.css";

/**
 * INSYNC by Ancchal Preloader (Gold Master Edition).
 * Architectural drafting lines draw on, the gold "i" fills with champagne radiance from the baseline,
 * N, S, Y, N, C rise from the baseline over a delicate 3x3 blueprint grid, "by Ancchal" emerges softly,
 * followed by a continuous champagne light sweep across the gold architecture.
 * Once ready, the gold framing lines shoot outward and the luxury cream curtain lifts.
 */

const SWEEP_FROM = -0.7;
const SWEEP_TO = 0.7;

// Exact geometric lengths for flawless strokeDashoffset animation across all desktop and mobile browsers
const GUIDES_DATA = {
  cap: { x1: 150, y1: 534, x2: 1090, y2: 534, length: 940, initialOffset: 940 },
  base: { x1: 150, y1: 692, x2: 1090, y2: 692, length: 940, initialOffset: -940 },
};

const FRAME_DATA = {
  v1: { x1: 179.25, y1: 447.5, x2: 179.25, y2: 692.5, length: 245, initialOffset: 245 },
  v2: { x1: 251.25, y1: 447.5, x2: 251.25, y2: 692.5, length: 245, initialOffset: -245 },
  h1: { x1: 163, y1: 464.25, x2: 267, y2: 464.25, length: 104, initialOffset: 104 },
  h2: { x1: 163.5, y1: 525.5, x2: 266.5, y2: 525.5, length: 103, initialOffset: -103 },
};

export default function PreloaderGold({
  onDone,
  holdAfterIntroMs = 700,
  minDisplayMs = 0,
  skipIfSeenThisSession = false,
  letterStart = 1.7,
  letterStagger = 0.11,
  sweepStart = 3.0,
  sweepDuration = 1.6,
  sweepRepeatDelay = 2.4,
} = {}) {
  const overlayRef = useRef(null);
  const svgRef = useRef(null);
  const onDoneRef = useRef(onDone);
  const [done, setDone] = useState(false);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  // Optional skip on repeat visits if explicitly enabled
  useEffect(() => {
    if (!skipIfSeenThisSession) return;
    try {
      if (sessionStorage.getItem("insync-seen") === "1") {
        document.body.classList.add("is-loaded");
        setDone(true);
      }
    } catch {}
  }, [skipIfSeenThisSession]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const svg = svgRef.current;
    if (!overlay || !svg || done) return;

    const root = document.documentElement;
    let alive = true;
    let introTl;
    let idle;
    let exitTl;
    const timers = [];

    const el = (sel) => svg.querySelector(sel);
    const all = (sel) => Array.from(svg.querySelectorAll(sel));

    const sheen = { s: SWEEP_FROM };
    const setSheen = (s) => {
      sheen.s = s;
      const g = svg.querySelector("#sheen");
      if (g) {
        g.setAttribute("gradientTransform", `translate(${s * SHEEN_VEC[0]} ${s * SHEEN_VEC[1]})`);
      }
    };

    function startIdle() {
      idle?.kill();
      idle = gsap.fromTo(
        sheen,
        { s: SWEEP_FROM },
        {
          s: SWEEP_TO,
          duration: sweepDuration,
          ease: "sine.inOut",
          repeat: -1,
          repeatDelay: sweepRepeatDelay,
          onUpdate: () => setSheen(sheen.s),
        }
      );
    }

    function buildIntro(onComplete) {
      const tl = gsap.timeline({ onComplete });

      const draw = (node, initialOffset, at, dur = 0.95) => {
        if (!node) return;
        return tl.fromTo(
          node,
          { strokeDashoffset: initialOffset },
          { strokeDashoffset: 0, duration: dur, ease: "power3.inOut" },
          at
        );
      };

      // 0.05 - 1.5  Construction drafting guides and gold frame draw on
      draw(el('.gd[data-k="cap"]'), GUIDES_DATA.cap.initialOffset, 0.05, 1.1);
      draw(el('.gd[data-k="base"]'), GUIDES_DATA.base.initialOffset, 0.05, 1.1);
      draw(el('.fl[data-k="v1"]'), FRAME_DATA.v1.initialOffset, 0.15);
      draw(el('.fl[data-k="h1"]'), FRAME_DATA.h1.initialOffset, 0.3);
      draw(el('.fl[data-k="v2"]'), FRAME_DATA.v2.initialOffset, 0.45);
      draw(el('.fl[data-k="h2"]'), FRAME_DATA.h2.initialOffset, 0.6);

      // 1.15 - 2.0  The gold "i" fills from the baseline up
      tl.fromTo(
        el("#stem"),
        { attr: { y: STEM.y + STEM.h, height: 0 } },
        { attr: { y: STEM.y, height: STEM.h }, duration: 0.75, ease: "power3.inOut" },
        1.15
      ).fromTo(
        el("#dot"),
        { attr: { y: DOT.y + DOT.h, height: 0 } },
        { attr: { y: DOT.y, height: DOT.h }, duration: 0.5, ease: "power3.inOut" },
        1.5
      );

      // 1.55 - 3.3  Delicate 3x3 blueprint drafting grid lights up behind each letter while rising
      LETTERS.forEach(([id], i) => {
        const t0 = letterStart + i * letterStagger;
        tl.fromTo(el(`.grid[data-k="${id}"]`), { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power1.out" }, t0 - 0.15)
          .to(el(`.grid[data-k="${id}"]`), { opacity: 0, duration: 0.45, ease: "power1.in" }, t0 + 0.75)
          .fromTo(el(`.rise[data-k="${id}"]`), { y: 190 }, { y: 0, duration: 0.9, ease: "power4.out" }, t0);
      });

      // 2.7 - 3.4  Drafting guides fade, "by Ancchal" emerges softly
      tl.to(all(".gd"), { opacity: 0, duration: 0.5, ease: "power1.in" }, 2.7)
        .fromTo(el("#by"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 2.75);

      // 3.0 onward  The champagne light sweep begins across the gold architecture
      tl.add(startIdle, sweepStart).to({}, { duration: 0 }, 3.4);

      return tl;
    }

    function finish() {
      if (!alive) return;
      document.body.classList.add("is-loaded");
      try {
        sessionStorage.setItem("insync-seen", "1");
      } catch {}
      window.dispatchEvent(new CustomEvent("insync:preloader-done"));
      onDoneRef.current?.();
      setDone(true);
    }

    function exit() {
      if (!alive) return;
      idle?.kill();
      root.style.overflow = "";

      // Clear dash array on frame lines so expanding rays display as solid architectural beams
      all(".fl").forEach((line) => {
        line.style.strokeDasharray = "none";
        line.removeAttribute("stroke-dasharray");
      });

      exitTl = gsap.timeline({ onComplete: finish });
      exitTl
        .to([el("#letters"), el("#by"), el("#ifill")], { opacity: 0, y: -8, duration: 0.5, ease: "power2.in" }, 0)
        .to(all('.fl[data-k^="v"]'), { attr: { y1: -3000, y2: 3000 }, duration: 0.9, ease: "power3.in" }, 0.1)
        .to(all('.fl[data-k^="h"]'), { attr: { x1: -3000, x2: 3000 }, duration: 0.9, ease: "power3.in" }, 0.1)
        .to(overlay, { yPercent: -100, duration: 1.0, ease: "expo.inOut" }, 0.55);
    }

    const wait = (ms) =>
      new Promise((r) => {
        const timer = setTimeout(r, ms);
        timers.push(timer);
      });

    // Page ready helper with safe fallback timeout so it never hangs
    const pageReady = () =>
      new Promise((res) => {
        if (typeof document === "undefined" || document.readyState === "complete") {
          res();
          return;
        }
        const timer = setTimeout(res, 1200);
        window.addEventListener(
          "load",
          () => {
            clearTimeout(timer);
            res();
          },
          { once: true }
        );
      });

    // Mount setup
    document.body.classList.remove("is-loaded");
    root.classList.add("js-preload");
    root.style.overflow = "hidden";

    let introDone;
    const introPromise = new Promise((r) => (introDone = r));
    introTl = buildIntro(introDone);

    Promise.all([introPromise, pageReady(), wait(minDisplayMs)])
      .then(() => wait(holdAfterIntroMs))
      .then(exit);

    return () => {
      alive = false;
      timers.forEach(clearTimeout);
      introTl?.kill();
      idle?.kill();
      exitTl?.kill();
      root.style.overflow = "";
    };
  }, [done, holdAfterIntroMs, minDisplayMs, letterStart, letterStagger, sweepStart, sweepDuration, sweepRepeatDelay, skipIfSeenThisSession]);

  if (done) return null;

  return (
    <div ref={overlayRef} className={styles.overlay} role="status" aria-live="polite">
      <span className={styles.srOnly}>Loading Insync by Ancchal</span>
      <svg
        ref={svgRef}
        className={styles.logo}
        viewBox="139 427 960 340"
        shapeRendering="geometricPrecision"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          {/* Champagne light sweep linear gradient */}
          <linearGradient
            id="sheen"
            gradientUnits="userSpaceOnUse"
            x1="163"
            y1="447.5"
            x2="267"
            y2="692.5"
            gradientTransform={`translate(${SWEEP_FROM * SHEEN_VEC[0]} ${SWEEP_FROM * SHEEN_VEC[1]})`}
          >
            <stop offset="0" stopColor={GOLD} />
            <stop offset="0.3" stopColor={GOLD} />
            <stop offset="0.5" stopColor={CHAMPAGNE} />
            <stop offset="0.7" stopColor={GOLD} />
            <stop offset="1" stopColor={GOLD} />
          </linearGradient>

          {Object.entries(PATHS).map(([k, d]) => (
            <path key={k} id={`p-${k}`} d={d} />
          ))}
          {LETTERS.map(([id, , , cx, cw]) => (
            <clipPath key={id} id={`clip-${id}`}>
              <rect x={cx} y="512" width={cw} height="192" />
            </clipPath>
          ))}
        </defs>

        {/* Blueprint construction guides */}
        <g id="guides">
          {Object.entries(GUIDES_DATA).map(([k, g]) => (
            <line
              key={k}
              className="gd"
              data-k={k}
              x1={g.x1}
              y1={g.y1}
              x2={g.x2}
              y2={g.y2}
              stroke={INK}
              strokeWidth={1}
              strokeOpacity={0.28}
              strokeDasharray={g.length}
              strokeDashoffset={g.initialOffset}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        {/* 3x3 blueprint drafting grid behind each letter */}
        <g id="grids">
          {LETTERS.map(([id, , , , , x, y, w, h]) => {
            const cw3 = w / 3;
            const ch3 = h / 3;
            return (
              <g
                key={id}
                className="grid"
                data-k={id}
                fill="none"
                stroke={GRID_STROKE}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
                style={{ opacity: 0 }}
              >
                <rect x={x} y={y} width={w} height={h} />
                <line x1={x + cw3} y1={y} x2={x + cw3} y2={y + h} />
                <line x1={x + 2 * cw3} y1={y} x2={x + 2 * cw3} y2={y + h} />
                <line x1={x} y1={y + ch3} x2={x + w} y2={y + ch3} />
                <line x1={x} y1={y + 2 * ch3} x2={x + w} y2={y + 2 * ch3} />
              </g>
            );
          })}
        </g>

        {/* Letters rising out of baseline clip mask */}
        <g id="letters">
          {LETTERS.map(([id, key, dx]) => (
            <g key={id} clipPath={`url(#clip-${id})`}>
              <g className="rise" data-k={id} style={{ transform: "translateY(190px)" }}>
                <use href={`#p-${key}`} xlinkHref={`#p-${key}`} transform={`translate(${dx} 0)`} fill={INK} />
              </g>
            </g>
          ))}
        </g>

        {/* "by Ancchal" sub-brand signature */}
        <g id="by" style={{ opacity: 0, transform: "translateY(8px)" }}>
          <use href="#p-by" xlinkHref="#p-by" transform={BY_TRANSFORM} fill={INK} />
        </g>

        {/* Gold & Champagne "i" fill */}
        <g id="ifill">
          <rect id="stem" x={STEM.x} y={STEM.y + STEM.h} width={STEM.w} height={0} fill="url(#sheen)" />
          <rect id="dot" x={DOT.x} y={DOT.y + DOT.h} width={DOT.w} height={0} fill="url(#sheen)" />
        </g>

        {/* Gold & Champagne architectural frame around the "i" */}
        <g id="frame">
          {Object.entries(FRAME_DATA).map(([k, f]) => (
            <line
              key={k}
              className="fl"
              data-k={k}
              x1={f.x1}
              y1={f.y1}
              x2={f.x2}
              y2={f.y2}
              stroke="url(#sheen)"
              strokeWidth={4.5}
              strokeDasharray={f.length}
              strokeDashoffset={f.initialOffset}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
