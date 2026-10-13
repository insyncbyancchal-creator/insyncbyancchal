"use client";
import { useEffect } from "react";

// Marks every [data-reveal] element with data-in="1" when it scrolls into view.
export function useReveal(deps = []) {
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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// One shared scroll listener for every parallax element
const par = new Set();
let bound = false;
let raf = 0;
function tick() {
  raf = 0;
  const vh = window.innerHeight;
  par.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.bottom < -100 || r.top > vh + 100) return;
    const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
    el.style.setProperty("--p", p.toFixed(3));
  });
}
const onScroll = () => !raf && (raf = requestAnimationFrame(tick));
export function registerParallax(el) {
  if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  par.add(el);
  if (!bound) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    bound = true;
  }
  onScroll();
  return () => {
    par.delete(el);
    if (!par.size && bound) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      bound = false;
    }
  };
}