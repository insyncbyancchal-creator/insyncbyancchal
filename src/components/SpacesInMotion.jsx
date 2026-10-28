"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
    duration: "0:05",
    poster: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop",
    video: "/reels/reel-1.mp4",
    instagramUrl: "https://www.instagram.com/reel/Dc8Qo9qJyoS/",
  },
  {
    id: 2,
    title: "Tactile Materials & Veneers",
    duration: "0:05",
    poster: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop",
    video: "/reels/reel-2.mp4",
    instagramUrl: "https://www.instagram.com/reel/DdocUyopyOO/",
  },
  {
    id: 3,
    title: "Architectural Drafting Session",
    duration: "0:05",
    poster: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
    video: "/reels/reel-3.mp4",
    instagramUrl: "https://www.instagram.com/reel/DbvdoeVJrBg/",
  },
  {
    id: 4,
    title: "Lime Plaster & Daylight Arches",
    duration: "0:05",
    poster: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    video: "/reels/reel-4.mp4",
    instagramUrl: "https://www.instagram.com/reel/Db_IR76pRt1/",
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

function ReelCard({
  reel,
  index,
  isPlaying,
  isHovered,
  onEnded,
  onMouseEnter,
  onMouseLeave,
}) {
  const [hasVideoError, setHasVideoError] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !reel.video || hasVideoError) return;

    video.defaultMuted = true;
    video.muted = true;

    if (isPlaying) {
      const p = video.play();
      if (p !== undefined) {
        p.catch(() => {});
      }
    } else {
      video.pause();
      try {
        video.currentTime = 0;
      } catch (e) {}
    }
  }, [isPlaying, reel.video, hasVideoError]);

  return (
    <motion.a
      href={reel.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      title={`Watch ${reel.title} on Instagram`}
      aria-label={`Watch ${reel.title} reel on Instagram (opens in new tab)`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Video or Poster Image */}
      {reel.video && !hasVideoError ? (
        <video
          ref={videoRef}
          src={reel.video}
          poster={reel.poster}
          muted
          playsInline
          loop={isHovered}
          preload="auto"
          onEnded={onEnded}
          onError={() => setHasVideoError(true)}
          className={styles.cardVideo}
        />
      ) : (
        <img
          src={reel.poster}
          alt={reel.title}
          loading="lazy"
          className={styles.cardImage}
        />
      )}
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
  const [activeSeqIndex, setActiveSeqIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // When user hovers any video, that video plays and sequence stops.
  // When no video is hovered, the current sequential video plays.
  const activePlayingIndex = hoveredIndex !== null ? hoveredIndex : activeSeqIndex;

  // Advance sequence when video ends naturally
  const handleVideoEnded = (endedIndex) => {
    if (hoveredIndex === null && endedIndex === activeSeqIndex) {
      setActiveSeqIndex((prev) => (prev + 1) % REELS.length);
    }
  };

  // Safety fallback: if video ended event is delayed or missed, advance automatically after 6s
  useEffect(() => {
    if (hoveredIndex !== null) return;

    const timer = setTimeout(() => {
      setActiveSeqIndex((prev) => (prev + 1) % REELS.length);
    }, 6000);

    return () => clearTimeout(timer);
  }, [activeSeqIndex, hoveredIndex]);

  return (
    <section className={styles.section} aria-labelledby="spaces-in-motion-heading">
      <div className={styles.container}>
        {/* LEFT COLUMN: Editorial Text & Italian Calligraphic Script */}
        <LeftColumn />

        {/* 4 REELS GRID: 3D Luxury Motion Runway */}
        <div className={styles.reelsViewport}>
          <div className={styles.reelsGrid}>
            {REELS.map((reel, index) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                index={index}
                isPlaying={activePlayingIndex === index}
                isHovered={hoveredIndex === index}
                onEnded={() => handleVideoEnded(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setActiveSeqIndex((index + 1) % REELS.length);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
