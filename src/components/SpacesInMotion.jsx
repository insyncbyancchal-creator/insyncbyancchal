"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "./SpacesInMotion.module.css";

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const INSTAGRAM_PROFILE = "https://www.instagram.com/insync_byancchal/";

const REELS = [
  {
    id: 1,
    title: "Curved Salon Styling",
    duration: "0:15",
    poster: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop",
    instagramUrl: "https://www.instagram.com/insync_byancchal/",
  },
  {
    id: 2,
    title: "Tactile Materials & Veneers",
    duration: "0:12",
    poster: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop",
    instagramUrl: "https://www.instagram.com/insync_byancchal/",
  },
  {
    id: 3,
    title: "Architectural Drafting Session",
    duration: "0:18",
    poster: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
    instagramUrl: "https://www.instagram.com/insync_byancchal/",
  },
  {
    id: 4,
    title: "Lime Plaster & Daylight Arches",
    duration: "0:14",
    poster: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    instagramUrl: "https://www.instagram.com/insync_byancchal/",
  },
  {
    id: 5,
    title: "Atelier Objects & Sculptural Décor",
    duration: "0:16",
    poster: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
    instagramUrl: "https://www.instagram.com/insync_byancchal/",
  },
  {
    id: 6,
    title: "Penthouse Horizon Reveal",
    duration: "0:22",
    poster: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
    instagramUrl: "https://www.instagram.com/insync_byancchal/",
  },
  {
    id: 7,
    title: "Private Atelier Joinery",
    duration: "0:19",
    poster: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    instagramUrl: "https://www.instagram.com/insync_byancchal/",
  },
  {
    id: 8,
    title: "Stone Ensuite Sanctuaries",
    duration: "0:13",
    poster: "https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=800&auto=format&fit=crop",
    instagramUrl: "https://www.instagram.com/insync_byancchal/",
  },
];

// Memoized Left Column to completely isolate heading & text from re-renders and shaking
const LeftColumn = React.memo(function LeftColumn() {
  return (
    <div className={styles.leftCol}>
      <div className={styles.eyebrowWrap}>
        <span className={styles.eyebrow}>BEHIND THE SCENES</span>
        <span className={styles.eyebrowLine} />
      </div>

      <h2 id="spaces-in-motion-heading" className={styles.heading}>
        <span className={styles.headingSpaces}>SPACES</span>
        <span className={`montecarlo-regular italic lowercase font-normal text-[#C5A059] ${styles.headingInMotion}`}>
          in motion
        </span>
      </h2>

      <p className={styles.description}>
        A glimpse into our design process, project updates and the little details that bring our spaces to life.
      </p>

      <a
        href={INSTAGRAM_PROFILE}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.ctaLink}
        aria-label="Follow @insync_byancchal on Instagram (opens in new tab)"
      >
        <InstagramIcon className={styles.ctaIcon} />
        <span>FOLLOW @INSYNC_BYANCCHAL</span>
        <span className={styles.ctaArrow}>&rarr;</span>
      </a>
    </div>
  );
});

function ReelCard({ reel, pageActive, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5.5;
    const rotateY = ((x - centerX) / centerX) * 5.5;

    setTilt({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.45,
    });
  };

  const handleMouseEnter = () => {
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.a
      href={reel.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      title={`Watch ${reel.title} on Instagram`}
      aria-label={`Watch ${reel.title} reel on Instagram (opens in new tab)`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateY: isHovered ? tilt.y : 0,
        rotateX: isHovered ? tilt.x : 0,
        scale: isHovered ? 1.025 : (pageActive ? 1 : 0.96),
        y: isHovered ? -8 : 0,
        opacity: pageActive ? 1 : 0.7,
      }}
      transition={{
        duration: isHovered ? 0.15 : 0.8,
        delay: isHovered ? 0 : (pageActive ? index * 0.04 : 0),
        ease: isHovered ? "easeOut" : [0.19, 1, 0.22, 1],
      }}
    >
      {/* 3D Dynamic Cursor Glare */}
      <div
        className={styles.mouseGlare}
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.24) 0%, rgba(197, 160, 89, 0.12) 38%, transparent 70%)`,
          opacity: glare.opacity,
        }}
      />

      {/* Cinematic Golden Light Sweep when page becomes active */}
      {pageActive && (
        <motion.div
          key={`shimmer-${reel.id}-${pageActive}`}
          className={styles.shimmerSheen}
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{
            duration: 1.1,
            delay: 0.2 + index * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      )}

      {/* Poster Image */}
      <motion.img
        src={reel.poster}
        alt={reel.title}
        loading="lazy"
        className={styles.cardImage}
        animate={{
          scale: isHovered ? 1.06 : 1,
        }}
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      />
      <div className={styles.cardOverlay} />

      {/* Bottom Play Button & Duration */}
      <div className={styles.cardMeta}>
        <div className={styles.playButton}>
          <svg viewBox="0 0 24 24" fill="currentColor" className={styles.playIcon}>
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <span className={styles.duration}>{reel.duration}</span>
      </div>
    </motion.a>
  );
}

export default function SpacesInMotion() {
  const [page, setPage] = useState(0);
  const touchStartX = React.useRef(0);

  const togglePage = () => {
    setPage((prev) => (prev === 0 ? 1 : 0));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50 && page === 0) setPage(1);
    else if (diff < -50 && page === 1) setPage(0);
  };

  const page1Reels = REELS.slice(0, 4);
  const page2Reels = REELS.slice(4, 8);

  return (
    <section className={styles.section} aria-labelledby="spaces-in-motion-heading">
      <div className={styles.container}>
        
        {/* LEFT COLUMN: Editorial Text & Italian Calligraphic Script */}
        <LeftColumn />

        {/* CENTER COLUMN: Continuous 3D Sliding Runway Track */}
        <div
          className={styles.carouselViewport}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className={styles.sliderTrack}
            animate={{
              x: page === 0 ? "0%" : "-50%",
            }}
            transition={{
              duration: 0.9,
              ease: [0.19, 1, 0.22, 1], // silky luxury cubic-bezier
            }}
          >
            {/* Page 1 (Reels 1–4) */}
            <div className={`${styles.pageWrapper} ${styles.pageWrapperLeft}`}>
              <div className={styles.pageGrid}>
                {page1Reels.map((reel, index) => (
                  <ReelCard
                    key={reel.id}
                    reel={reel}
                    pageActive={page === 0}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Page 2 (Reels 5–8) */}
            <div className={`${styles.pageWrapper} ${styles.pageWrapperRight}`}>
              <div className={styles.pageGrid}>
                {page2Reels.map((reel, index) => (
                  <ReelCard
                    key={reel.id}
                    reel={reel}
                    pageActive={page === 1}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Interactive Navigation Controls */}
        <div className={styles.rightCol}>
          <button
            onClick={togglePage}
            className={`${styles.navButton} ${page === 1 ? styles.navButtonActive : ""}`}
            aria-label={page === 0 ? "View next 4 reels" : "View first 4 reels"}
            title={page === 0 ? "Next reels" : "Back to first reels"}
          >
            <ArrowRight
              size={18}
              className={`${styles.arrowIcon} ${page === 1 ? styles.arrowIconPrev : ""}`}
            />
          </button>

          {/* Clickable Quick-Jump Page Pills */}
          <div className={styles.pagePills}>
            <button
              onClick={() => setPage(0)}
              className={`${styles.pagePill} ${page === 0 ? styles.pagePillActive : ""}`}
              aria-label="View first 4 reels"
            >
              01
            </button>
            <span className={styles.pagePillDivider}>/</span>
            <button
              onClick={() => setPage(1)}
              className={`${styles.pagePill} ${page === 1 ? styles.pagePillActive : ""}`}
              aria-label="View next 4 reels"
            >
              02
            </button>
          </div>

          <div className={styles.scrollPrompt}>
            <span className={styles.counter}>{page === 0 ? "01 / 02" : "02 / 02"}</span>
            <span>{page === 0 ? "DISCOVER MORE" : "RETURN TO"}</span>
            <span>{page === 0 ? "REELS" : "START"}</span>
          </div>

          <div className={styles.verticalDivider} />
        </div>

      </div>
    </section>
  );
}
