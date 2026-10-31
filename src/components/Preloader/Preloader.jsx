"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import {
  PATHS,
  LETTERS,
  DOT,
  STEM,
  FRAME,
  GUIDES,
  BY_TRANSFORM,
  GRID_STROKE,
} from "./preloader-data";
import styles from "./Preloader.module.css";

/**
 * INSYNC preloader.
 * Construction lines draw on, the "i" fills, N S Y N C rise from the baseline,
 * "by Ancchal" fades up, then the curtain lifts.
 *
 * Usage (app/layout.tsx):  <Preloader />  just inside <body>, above {children}.
 * Needs:  npm i gsap@3.12.5
 */

const INK = "#222220";
const EMERALD = "#0E5F3D";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function buildMarkup() {
  let defs = Object.entries(PATHS)
    .map(([k, d]) => `<path id="p-${k}" d="${d}"/>`)
    .join("");
  LETTERS.forEach(([id, , , cx, cw]) => {
    defs += `<clipPath id="clip-${id}"><rect x="${cx}" y="512" width="${cw}" height="192"/></clipPath>`;
  });

  const line = (cls, k, [x1, y1, x2, y2], stroke, w, extra = "") =>
    `<line class="${cls}" data-k="${k}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" ${extra}/>`;

  const guides = Object.entries(GUIDES)
    .map(([k, g]) => line("gd", k, g, INK, 1, 'stroke-opacity=".28" vector-effect="non-scaling-stroke"'))
    .join("");
  const letters = LETTERS.map(
    ([id, key, dx]) =>
      `<g clip-path="url(#clip-${id})"><g class="rise" data-k="${id}" style="transform: translateY(190px);"><use href="#p-${key}" xlinkHref="#p-${key}" transform="translate(${dx} 0)" fill="${INK}"/></g></g>`
  ).join("");
  const grids = LETTERS.map(([id, , , , , x, y, w, h]) => {
    const cw3 = w / 3,
      ch3 = h / 3;
    const inner = [1, 2]
      .map(
        (i) =>
          `<line x1="${x + i * cw3}" y1="${y}" x2="${x + i * cw3}" y2="${y + h}"/><line x1="${x}" y1="${y + i * ch3}" x2="${x + w}" y2="${y + i * ch3}"/>`
      )
      .join("");
    return `<g class="grid" data-k="${id}" fill="none" stroke="${GRID_STROKE}" stroke-width="1" vector-effect="non-scaling-stroke" style="opacity: 0;"><rect x="${x}" y="${y}" width="${w}" height="${h}"/>${inner}</g>`;
  }).join("");
  const frame = Object.entries(FRAME)
    .map(([k, f]) => line("fl", k, f, EMERALD, 4.5))
    .join("");

  return `<defs>${defs}</defs>
      <g id="guides">${guides}</g>
      <g id="grids">${grids}</g>
      <g id="letters">${letters}</g>
      <g id="by" style="opacity: 0; transform: translateY(8px);"><use href="#p-by" xlinkHref="#p-by" transform="${BY_TRANSFORM}" fill="${INK}"/></g>
      <g id="ifill"><rect id="stem" x="${STEM.x}" y="${STEM.y + STEM.h}" width="${STEM.w}" height="0" fill="${EMERALD}"/>
                    <rect id="dot" x="${DOT.x}" y="${DOT.y + DOT.h}" width="${DOT.w}" height="0" fill="${EMERALD}"/></g>
      <g id="frame">${frame}</g>`;
}

export default function Preloader({
  onDone,
  holdAfterIntroMs = 300,
  letterStart = 0.9,
  letterStagger = 0.08,
} = {}) {
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const svgRef = useRef(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const [done, setDone] = useState(false);
  const hasMountedRef = useRef(false);

  // Exact Preloader Logic:
  // 1. First time visitor opening the website: ALWAYS SHOW
  // 2. Full document reload on Home page ('/' or '/insync-home'): ALWAYS SHOW
  // 3. Client navigation from another page to Home: NEVER SHOW
  // 4. Reload on any other page (/about, /portfolio, etc.): NEVER SHOW
  useIsoLayoutEffect(() => {
    if (typeof window === "undefined") return;

    if (hasMountedRef.current) {
      return;
    }
    hasMountedRef.current = true;

    let visited = false;
    try {
      visited = sessionStorage.getItem("insync_visited") === "1";
    } catch {}

    const cur = pathname || window.location.pathname || "";
    const isHome = cur === "/" || cur === "/insync-home";

    const isFirstVisit = !visited;
    const isHomeReload = isHome;

    const shouldShow = isFirstVisit || isHomeReload;

    if (!shouldShow) {
      document.documentElement.classList.remove("js-preload");
      document.documentElement.classList.remove("no-preloader");
      document.body.classList.add("is-loaded");
      setDone(true);
      return;
    }

    try {
      sessionStorage.setItem("insync_visited", "1");
      sessionStorage.setItem("insync-seen", "1");
    } catch {}
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const svg = svgRef.current;
    if (!overlay || !svg || done) return;

    const root = document.documentElement;
    let alive = true;
    let intro;
    let exitTl;
    let holdTimer;

    const el = (sel) => svg.querySelector(sel);
    const all = (sel) => Array.from(svg.querySelectorAll(sel));

    function buildIntro(onComplete) {
      const tl = gsap.timeline({ onComplete });
      const draw = (node, dir, at, dur = 0.65) => {
        if (!node) return;
        return tl.fromTo(
          node,
          { strokeDashoffset: dir, attr: { "stroke-dashoffset": dir } },
          { strokeDashoffset: 0, attr: { "stroke-dashoffset": 0 }, duration: dur, ease: "power3.inOut" },
          at
        );
      };

      // Construction guides and frame draw on briskly
      draw(el('.gd[data-k="cap"]'), GUIDES.cap[4], 0.05, 0.7);
      draw(el('.gd[data-k="base"]'), GUIDES.base[4], 0.05, 0.7);
      draw(el('.fl[data-k="v1"]'), FRAME.v1[4], 0.1);
      draw(el('.fl[data-k="h1"]'), FRAME.h1[4], 0.2);
      draw(el('.fl[data-k="v2"]'), FRAME.v2[4], 0.3);
      draw(el('.fl[data-k="h2"]'), FRAME.h2[4], 0.4);

      // The 'i' fills from baseline up
      tl.fromTo(
        el("#stem"),
        { attr: { y: STEM.y + STEM.h, height: 0 } },
        { attr: { y: STEM.y, height: STEM.h }, duration: 0.5, ease: "power3.inOut" },
        0.55
      ).fromTo(
        el("#dot"),
        { attr: { y: DOT.y + DOT.h, height: 0 } },
        { attr: { y: DOT.y, height: DOT.h }, duration: 0.35, ease: "power3.inOut" },
        0.75
      );

      // 3x3 grids and rising letters
      LETTERS.forEach(([id], i) => {
        const t0 = letterStart + i * letterStagger;
        tl.fromTo(
          el(`.grid[data-k="${id}"]`),
          { opacity: 0 },
          { opacity: 1, duration: 0.2, ease: "power1.out" },
          t0 - 0.1
        )
          .to(
            el(`.grid[data-k="${id}"]`),
            { opacity: 0, duration: 0.3, ease: "power1.in" },
            t0 + 0.5
          )
          .fromTo(
            el(`.rise[data-k="${id}"]`),
            { y: 190 },
            { y: 0, duration: 0.65, ease: "power4.out" },
            t0
          );
      });

      // Guides fade, "by Ancchal" reveals
      tl.to(all(".gd"), { opacity: 0, duration: 0.35, ease: "power1.in" }, 1.6)
        .fromTo(el("#by"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 1.65)
        .to({}, { duration: 0 }, 2.0);
      return tl;
    }

    function finish() {
      if (!alive) return;
      document.body.classList.add("is-loaded");
      root.classList.remove("js-preload");
      root.classList.remove("no-preloader");
      try {
        sessionStorage.setItem("insync_visited", "1");
        sessionStorage.setItem("insync-seen", "1");
      } catch {}
      window.dispatchEvent(new CustomEvent("insync:preloader-done"));
      onDoneRef.current?.();
      setDone(true); // unmounts the curtain
    }

    function exit() {
      if (!alive) return;
      root.style.overflow = "";

      // Remove dash array so rays are solid architectural lines
      all(".fl").forEach((l) => {
        l.style.strokeDasharray = "none";
        l.removeAttribute("stroke-dasharray");
      });

      exitTl = gsap.timeline({ onComplete: finish });
      exitTl
        .to([el("#letters"), el("#by"), el("#ifill")], { opacity: 0, y: -8, duration: 0.35, ease: "power2.in" }, 0)
        .to(all('.fl[data-k^="v"]'), { attr: { y1: -3000, y2: 3000 }, duration: 0.7, ease: "power3.in" }, 0.06)
        .to(all('.fl[data-k^="h"]'), { attr: { x1: -3000, x2: 3000 }, duration: 0.7, ease: "power3.in" }, 0.06)
        .to(overlay, { yPercent: -100, duration: 0.75, ease: "expo.inOut" }, 0.35);
    }

    const pageReady = () =>
      new Promise((res) => {
        if (typeof document === "undefined" || document.readyState === "complete") {
          res();
        } else {
          window.addEventListener("load", () => res(), { once: true });
        }
      });

    // ---- mount ----
    document.body.classList.remove("is-loaded");
    root.classList.add("js-preload");
    root.style.overflow = "hidden";
    svg.innerHTML = buildMarkup();

    let introDone;
    const introPromise = new Promise((r) => (introDone = r));
    intro = buildIntro(introDone);

    Promise.all([introPromise, pageReady()])
      .then(() => new Promise((r) => (holdTimer = setTimeout(r, holdAfterIntroMs))))
      .then(exit);

    return () => {
      alive = false;
      if (holdTimer) clearTimeout(holdTimer);
      intro?.kill();
      exitTl?.kill();
      root.style.overflow = "";
    };
  }, [done, holdAfterIntroMs, letterStart, letterStagger]);

  if (done) return null;

  return (
    <div id="insync-preloader-overlay" ref={overlayRef} className={styles.overlay} role="status" aria-live="polite">
      <span className={styles.srOnly}>Loading Insync</span>
      <svg
        ref={svgRef}
        className={styles.logo}
        viewBox="139 427 960 340"
        shapeRendering="geometricPrecision"
        aria-hidden="true"
        focusable="false"
      />
    </div>
  );
}
