"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
    video: "/reels/reel-1.mp4",
    instagramUrl: "https://www.instagram.com/reel/Dc8Qo9qJyoS/",
  },
  {
    id: 2,
    title: "Tactile Materials & Veneers",
    duration: "0:05",
    video: "/reels/reel-2.mp4",
    instagramUrl: "https://www.instagram.com/reel/DdocUyopyOO/",
  },
  {
    id: 3,
    title: "Architectural Drafting Session",
    duration: "0:05",
    video: "/reels/reel-3.mp4",
    instagramUrl: "https://www.instagram.com/reel/DbvdoeVJrBg/",
  },
  {
    id: 4,
    title: "Lime Plaster & Daylight Arches",
    duration: "0:05",
    video: "/reels/reel-4.mp4",
    instagramUrl: "https://www.instagram.com/reel/Db_IR76pRt1/",
  },
];

// Memoized Left Column to completely isolate heading & text from re-renders and shaking
const LeftColumn = React.memo(function LeftColumn({ profileUrl }) {
  const targetUrl = profileUrl || INSTAGRAM_PROFILE;

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
        href={targetUrl}
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

const ReelCard = React.memo(function ReelCard({
  reel,
  index,
  isPlaying,
  isHovered,
  sectionInView,
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

    if (isPlaying && sectionInView) {
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
  }, [isPlaying, sectionInView, reel.video, hasVideoError]);

  return (
    <motion.a
      href={reel.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.card} will-change-transform`}
      title={`Watch ${reel.title} on Instagram`}
      aria-label={`Watch ${reel.title} reel on Instagram (opens in new tab)`}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave(index)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Real video first frame displays naturally without any placeholder image */}
      {reel.video && !hasVideoError ? (
        <video
          ref={videoRef}
          src={reel.video}
          muted
          playsInline
          loop={isHovered}
          preload="metadata"
          onEnded={() => onEnded(index)}
          onError={() => setHasVideoError(true)}
          className={styles.cardVideo}
        />
      ) : reel.poster ? (
        <img
          src={reel.poster}
          alt={reel.title}
          loading="lazy"
          decoding="async"
          className={styles.cardImage}
        />
      ) : (
        <div className="w-full h-full bg-[#1A1A1A]" />
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
});

export default function SpacesInMotion({ data }) {
  const [activeSeqIndex, setActiveSeqIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [sectionInView, setSectionInView] = useState(false);
  const sectionRef = useRef(null);

  const instagramProfileUrl = data?.instagramProfileUrl || INSTAGRAM_PROFILE;

  // Observe when section is in viewport to avoid idle background video decoding
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setSectionInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSectionInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Guarantee all 4 reels are ALWAYS displayed:
  // If Sanity provides dynamic reel items with videos, use them; otherwise seamlessly fill with authentic local studio reels
  const displayReels = REELS.map((fallbackReel, idx) => {
    const item = data?.reelsList?.[idx];
    if (item && (item.videoFile?.asset?.url || item.videoUrl || item.poster?.asset?.url)) {
      return {
        id: item._key || fallbackReel.id,
        title: item.title || fallbackReel.title,
        duration: item.duration || fallbackReel.duration,
        poster: item.poster?.asset?.url || null,
        video: item.videoFile?.asset?.url || item.videoUrl || fallbackReel.video,
        instagramUrl: item.instagramUrl || fallbackReel.instagramUrl,
      };
    }
    return fallbackReel;
  });

  const reelsCount = 4;

  // When user hovers any video, that video plays and sequence stops.
  const activePlayingIndex = hoveredIndex !== null ? hoveredIndex : activeSeqIndex;

  // Advance sequence when video ends naturally
  const handleVideoEnded = useCallback((endedIndex) => {
    setActiveSeqIndex((prev) => {
      if (endedIndex === prev) {
        return (prev + 1) % reelsCount;
      }
      return prev;
    });
  }, [reelsCount]);

  const handleMouseEnter = useCallback((index) => {
    setHoveredIndex(index);
  }, []);

  const handleMouseLeave = useCallback((index) => {
    setHoveredIndex(null);
    setActiveSeqIndex((index + 1) % reelsCount);
  }, [reelsCount]);

  // Safety fallback: if video ended event is delayed or missed, advance automatically after 6s
  useEffect(() => {
    if (hoveredIndex !== null || !sectionInView) return;

    const timer = setTimeout(() => {
      setActiveSeqIndex((prev) => (prev + 1) % reelsCount);
    }, 6000);

    return () => clearTimeout(timer);
  }, [activeSeqIndex, hoveredIndex, reelsCount, sectionInView]);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="spaces-in-motion-heading">
      <div className={styles.container}>
        {/* LEFT COLUMN: Editorial Text & Italian Calligraphic Script */}
        <LeftColumn profileUrl={instagramProfileUrl} />

        {/* 4 REELS GRID: 3D Luxury Motion Runway */}
        <div className={styles.reelsViewport}>
          <div className={styles.reelsGrid}>
            {displayReels.map((reel, index) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                index={index}
                isPlaying={activePlayingIndex === index}
                isHovered={hoveredIndex === index}
                sectionInView={sectionInView}
                onEnded={handleVideoEnded}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
