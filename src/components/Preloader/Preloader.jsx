"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PATHS, BOX, ORDER, LINES } from "./preloader-data";
import styles from "./Preloader.module.css";

/**
 * INSYNC preloader.
 * Sequence: gold hash lines slide in, i wipe reveal, 3x3 tile grid assemble for N, S, Y, N, C,
 * "by Ancchal" fade-in, gold light sweep, elegant curtain rollup.
 */

const INK = "#0A0A0A";
const GOLD = "#B4840C";
const CHAMP = "#E3CF9A";
const GRID = "#C9C5BB";
const GHOST = "#B9B6AD";
const SHEEN_VEC = [113, 180];

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function buildMarkup() {
  let defs = `<linearGradient id="sheen" gradientUnits="userSpaceOnUse" x1="186" y1="513" x2="299" y2="693" gradientTransform="translate(-70 -110)">
      <stop offset="0" stop-color="${GOLD}"/><stop offset=".36" stop-color="${GOLD}"/>
      <stop offset=".5" stop-color="${CHAMP}"/>
      <stop offset=".64" stop-color="${GOLD}"/><stop offset="1" stop-color="${GOLD}"/></linearGradient>`;
  defs += Object.entries(PATHS).map(([k, d]) => `<path id="p-${k}" d="${d}"/>`).join("");
  defs += `<clipPath id="iWipe"><rect id="iWipeRect" x="212" y="693" width="62" height="0"/></clipPath>`;

  let letters = `<g id="g-i">
        <use id="i-ghost" href="#p-i" fill="none" stroke="${GHOST}" stroke-width="1.3" style="opacity: 0;"/>
        <g clip-path="url(#iWipe)"><use href="#p-i" fill="${INK}"/></g>
      </g>`;

  ORDER.forEach((k) => {
    const [x, y, w, h] = BOX[k];
    const cw = w / 3, ch = h / 3, pad = 0.35;
    let tiles = "";
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        defs += `<clipPath id="c-${k}-${r}${c}"><rect x="${x + c * cw - pad}" y="${y + r * ch - pad}" width="${cw + 2 * pad}" height="${ch + 2 * pad}"/></clipPath>`;
        tiles += `<g class="tile" data-cx="${x + (c + 0.5) * cw}" data-cy="${y + (r + 0.5) * ch}" data-r="${r}" data-c="${c}" style="opacity: 0;"><g clip-path="url(#c-${k}-${r}${c})"><use href="#p-${k}" fill="${INK}"/></g></g>`;
      }
    }
    const grid =
      `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>` +
      [1, 2]
        .map(
          (i) =>
            `<line x1="${x + i * cw}" y1="${y}" x2="${x + i * cw}" y2="${y + h}"/><line x1="${x}" y1="${y + i * ch}" x2="${x + w}" y2="${y + i * ch}"/>`
        )
        .join("");
    letters += `<g class="ltr" data-k="${k}">
          <g class="grid" fill="none" stroke="${GRID}" stroke-width="1" vector-effect="non-scaling-stroke" style="opacity: 0;">${grid}</g>
          <g class="tiles">${tiles}</g>
          <use class="solid" href="#p-${k}" fill="${INK}" style="display:none"/>
        </g>`;
  });

  const hash = Object.entries(LINES)
    .map(
      ([k, [a, b, c, d]]) =>
        `<line class="gl" data-k="${k}" x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="url(#sheen)" stroke-width="4"/>`
    )
    .join("");

  return `<defs>${defs}</defs><g id="letters">${letters}</g><g id="by" style="opacity: 0;"><use href="#p-by" fill="${INK}"/></g><g id="hash">${hash}</g>`;
}

export default function Preloader({
  onDone,
  holdAfterIntroMs = 500,
  skipIfSeenThisSession = false,
  letterStart = 1.25,
  letterStagger = 0.22,
} = {}) {
  const overlayRef = useRef(null);
  const svgRef = useRef(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const [done, setDone] = useState(false);

  // Optional: skip on repeat visits if caller explicitly asked for it
  useIsoLayoutEffect(() => {
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
    let intro;
    let idle;
    let exitTl;

    const el = (sel) => svg.querySelector(sel);
    const all = (sel) => Array.from(svg.querySelectorAll(sel));

    const sheen = { s: -0.6 };
    const setSheen = (s) => {
      sheen.s = s;
      const g = svg.querySelector("#sheen");
      if (g) g.setAttribute("gradientTransform", `translate(${s * SHEEN_VEC[0]} ${s * SHEEN_VEC[1]})`);
    };

    function initElements() {
      const line = (k) => el(`.gl[data-k="${k}"]`);
      // Initial hidden / offset positions
      gsap.set(line("v1"), { y: -1400 });
      gsap.set(line("h1"), { x: -1800 });
      gsap.set(line("v2"), { y: 1400 });
      gsap.set(line("h2"), { x: 1800 });

      gsap.set(el("#i-ghost"), { opacity: 0 });
      gsap.set(el("#iWipeRect"), { attr: { y: 693, height: 0 } });
      gsap.set(el("#by"), { opacity: 0, y: 8 });

      ORDER.forEach((k) => {
        const g = el(`.ltr[data-k="${k}"]`);
        if (!g) return;
        gsap.set(g.querySelector(".grid"), { opacity: 0 });
        g.querySelectorAll(".tile").forEach((tile) => {
          const r = +(tile.getAttribute("data-r") || tile.dataset.r);
          const c = +(tile.getAttribute("data-c") || tile.dataset.c);
          const dir = [90, -90, 180][(r * 2 + c * 3) % 3];
          const cx = tile.getAttribute("data-cx") || tile.dataset.cx;
          const cy = tile.getAttribute("data-cy") || tile.dataset.cy;
          const origin = `${cx} ${cy}`;
          gsap.set(tile, { rotation: dir, opacity: 0, scale: 0.88, svgOrigin: origin });
        });
      });

      setSheen(-0.6);
    }

    function buildIntro(onComplete) {
      const tl = gsap.timeline({ onComplete });
      const line = (k) => el(`.gl[data-k="${k}"]`);

      // 0.05 - 0.85  gold hash lines slide in from frame edges
      tl.to(line("v1"), { y: 0, duration: 0.8, ease: "power4.out" }, 0.08)
        .to(line("h1"), { x: 0, duration: 0.8, ease: "power4.out" }, 0.16)
        .to(line("v2"), { y: 0, duration: 0.8, ease: "power4.out" }, 0.24)
        .to(line("h2"), { x: 0, duration: 0.8, ease: "power4.out" }, 0.32);

      // 0.8 - 1.45  the "i": grey ghost outline, then solid ink wipes up
      tl.to(el("#i-ghost"), { opacity: 1, duration: 0.35, ease: "power2.out" }, 0.8)
        .to(el("#iWipeRect"), { attr: { y: 540, height: 153 }, duration: 0.58, ease: "power3.inOut" }, 0.95)
        .to(el("#i-ghost"), { opacity: 0, duration: 0.28 }, 1.38);

      // inverted N, S, Y, N, C: each assembles from its 3x3 tile grid
      ORDER.forEach((k, idx) => {
        const g = el(`.ltr[data-k="${k}"]`);
        if (!g) return;
        const t0 = letterStart + idx * letterStagger;
        tl.to(g.querySelector(".grid"), { opacity: 1, duration: 0.2, ease: "power1.out" }, t0);
        g.querySelectorAll(".tile").forEach((tile) => {
          const r = +(tile.getAttribute("data-r") || tile.dataset.r);
          const c = +(tile.getAttribute("data-c") || tile.dataset.c);
          const delay = (r + c) * 0.055 + ((r * 5 + c * 3) % 3) * 0.025;
          const cx = tile.getAttribute("data-cx") || tile.dataset.cx;
          const cy = tile.getAttribute("data-cy") || tile.dataset.cy;
          const origin = `${cx} ${cy}`;
          tl.to(
            tile,
            { rotation: 0, opacity: 1, scale: 1, duration: 0.55, ease: "power3.inOut", svgOrigin: origin },
            t0 + delay
          );
        });
        const tEnd = t0 + 0.27 + 0.55;
        tl.to(g.querySelector(".grid"), { opacity: 0, duration: 0.28, ease: "power1.in" }, tEnd).add(() => {
          // swap to one clean single glyph so there are zero tile seams
          const tilesEl = g.querySelector(".tiles");
          const solidEl = g.querySelector(".solid");
          if (tilesEl) tilesEl.style.display = "none";
          if (solidEl) solidEl.style.display = "";
        }, tEnd + 0.02);
      });

      // 2.9 - 3.5  "by Ancchal"
      tl.to(el("#by"), { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 2.9);

      // 3.3 - 4.4  one slow luxurious light sweep along the gold lines
      tl.to(sheen, { s: 0.6, duration: 1.1, ease: "sine.inOut", onUpdate: () => setSheen(sheen.s) }, 3.3);

      return tl;
    }

    function startIdle() {
      idle = gsap.fromTo(
        sheen,
        { s: -0.6 },
        { s: 0.6, duration: 1.2, ease: "sine.inOut", repeat: -1, repeatDelay: 2.6, onUpdate: () => setSheen(sheen.s) }
      );
    }

    function finish() {
      if (!alive) return;
      document.body.classList.add("is-loaded");
      try { sessionStorage.setItem("insync-seen", "1"); } catch {}
      window.dispatchEvent(new CustomEvent("insync:preloader-done"));
      onDoneRef.current?.();
      setDone(true);
    }

    function exit() {
      if (!alive) return;
      idle?.kill();
      root.style.overflow = "";

      exitTl = gsap.timeline({ onComplete: finish });
      exitTl
        .to([el("#letters"), el("#by")], { opacity: 0, y: -8, duration: 0.45, ease: "power2.in" }, 0)
        .to(all('.gl[data-k^="v"]'), { attr: { y1: -3000, y2: 3000 }, duration: 0.85, ease: "power3.in" }, 0.08)
        .to(all('.gl[data-k^="h"]'), { attr: { x1: -3000, x2: 3000 }, duration: 0.85, ease: "power3.in" }, 0.08)
        .to(overlay, { yPercent: -100, duration: 0.95, ease: "expo.inOut" }, 0.45);
    }

    const pageReady = () =>
      new Promise((res) => {
        if (typeof document !== "undefined" && (document.readyState === "complete" || document.readyState === "interactive")) {
          res();
        } else if (typeof window !== "undefined") {
          window.addEventListener("load", () => res(), { once: true });
          setTimeout(res, 800);
        } else {
          res();
        }
      });

    // ---- mount ----
    document.body.classList.remove("is-loaded");
    root.classList.add("js-preload");
    root.style.overflow = "hidden";
    svg.innerHTML = buildMarkup();
    initElements();

    let holdTimer;
    let introDone;
    const introPromise = new Promise((r) => (introDone = r));

    intro = buildIntro(() => {
      startIdle();
      introDone();
    });

    Promise.all([introPromise, pageReady()])
      .then(() => new Promise((r) => (holdTimer = setTimeout(r, holdAfterIntroMs))))
      .then(exit);

    return () => {
      alive = false;
      if (holdTimer) clearTimeout(holdTimer);
      intro?.kill();
      idle?.kill();
      exitTl?.kill();
      root.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  if (done) return null;

  return (
    <div ref={overlayRef} className={styles.overlay} role="status" aria-live="polite">
      <span className={styles.srOnly}>Loading Insync</span>
      <svg ref={svgRef} className={styles.logo} viewBox="154 462 960 340" aria-hidden="true" focusable="false" />
    </div>
  );
}
