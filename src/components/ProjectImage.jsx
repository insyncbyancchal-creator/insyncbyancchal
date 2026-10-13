"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ProjectImage.module.css";

/*
  One image component for the whole portfolio.
  mode="natural" → the frame takes the photo's own shape. Never cropped. (project galleries)
  mode="cover"   → the frame uses a fixed `ratio` (e.g. 1.5 = 3:2); the photo is cropped to
                   fit using `focus` (e.g. "50% 30%"). Used for thumbnails so rows stay tidy.
  mode="fill"    → fills its parent.
  The real shape is measured on load, so nobody has to type dimensions.
*/
export default function ProjectImage({
  img,
  tone = ["#e6dcc6", "#b99a5b"],
  mode = "natural",
  ratio = 1.5,
  eager = false,
  className = "",
  children,
  ...rest
}) {
  const [ar, setAr] = useState(img.ar || 1.5);
  const frame = useRef(null);
  const el = useRef(null);

  useEffect(() => {
    const i = el.current;
    if (i && i.complete && i.naturalWidth) setAr(i.naturalWidth / i.naturalHeight);
  }, [img.src]);

  useEffect(() => {
    const f = frame.current;
    if (!f) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          f.setAttribute("data-in", "1");
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
    );
    io.observe(f);
    return () => io.disconnect();
  }, []);

  const style = mode === "fill" ? {} : { aspectRatio: mode === "cover" ? ratio : ar, "--ar": ar };

  return (
    <figure ref={frame} className={`${styles.frame} ${mode === "fill" ? styles.fill : ""} ${className}`} style={style} {...rest}>
      <div className={styles.inner} data-inner>
        {img.src ? (
          <img
            ref={el}
            src={img.src}
            alt={img.alt || ""}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
            className={styles.img}
            style={{ objectPosition: img.focus || "50% 50%" }}
            onLoad={(e) => setAr(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)}
          />
        ) : (
          <span className={`${styles.img} ${styles.ph}`} role="img" aria-label={img.alt || "Image placeholder"} data-label={img.alt || "Photograph"} style={{ background: `linear-gradient(165deg, ${tone[0]}, ${tone[0]})` }} />
        )}
      </div>
      {children}
    </figure>
  );
}