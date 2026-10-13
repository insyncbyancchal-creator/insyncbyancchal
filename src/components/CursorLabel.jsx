"use client";

import { useEffect, useRef } from "react";
import styles from "./CursorLabel.module.css";

/*
  A soft circular label that follows the cursor over anything marked data-cursor="View".
  Mount once per page (or once in layout.js for the whole site). Desktop/mouse only.
*/
export default function CursorLabel() {
  const ring = useRef(null);
  const text = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let tx = -100, ty = -100, x = -100, y = -100, raf = 0, label = "";
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(loop);
    };
    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      const t = e.target.closest?.("[data-cursor]");
      const l = t ? t.getAttribute("data-cursor") : "";
      if (l !== label) {
        label = l;
        if (text.current && l) text.current.textContent = l;
        ring.current?.classList.toggle(styles.on, !!l);
      }
    };
    const leave = () => ring.current?.classList.remove(styles.on);
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div ref={ring} className={styles.ring} aria-hidden="true">
      <span ref={text} className={styles.txt} />
    </div>
  );
}