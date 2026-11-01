"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect if visitor prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis with tailored luxury easing curve
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      syncTouch: false,
      touchMultiplier: 1.0,
      infinite: false,
      // CRITICAL: Prevent Lenis from intercepting mouse wheel on modals and scrollable elements
      prevent: (node) => {
        if (!node || typeof node.closest !== "function") return false;
        return (
          node.hasAttribute?.("data-lenis-prevent") ||
          Boolean(node.closest("[data-lenis-prevent]")) ||
          Boolean(node.closest('[role="dialog"]')) ||
          Boolean(node.closest(".overflow-y-auto")) ||
          Boolean(node.closest('[class*="modal"]'))
        );
      },
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    window.lenis = lenis;

    // Observer to pause Lenis when modals (e.g. Lightbox, Enquiry dialog) lock body scrolling
    const observer = new MutationObserver(() => {
      const isLocked =
        document.body.style.overflow === "hidden" ||
        document.documentElement.style.overflow === "hidden";
      if (isLocked) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  // On route change, reset overflow, resume Lenis, and recalculate dimensions
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (window.lenis) {
        window.lenis.start();
        window.lenis.resize();
      }
    }
  }, [pathname]);

  return null;
}
