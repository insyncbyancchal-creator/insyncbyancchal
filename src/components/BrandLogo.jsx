"use client";

import React from "react";
import { PATHS, BY_TRANSFORM } from "@/components/Preloader/preloader-data";

/**
 * BrandLogo: Official luxury vector logo for Insync by Ancchal.
 * Displays the iconic emerald green architectural "i" and frame with luxury depth,
 * paired with deep ink architectural letterforms (N S Y N C by Ancchal).
 */
export default function BrandLogo({ className = "h-8 w-auto", mode = "dark" }) {
  const ink = mode === "dark" ? "#222220" : "#FAF7F2";
  const gradId = `brand-emerald-sheen-${mode}`;

  // Rich emerald green gradient tailored for light and dark backgrounds
  const stops =
    mode === "dark"
      ? [
          { offset: "0%", color: "#0E5F3D" },
          { offset: "35%", color: "#1A6044" },
          { offset: "50%", color: "#2E8B65" },
          { offset: "65%", color: "#1A6044" },
          { offset: "100%", color: "#0E5F3D" },
        ]
      : [
          { offset: "0%", color: "#10B981" },
          { offset: "35%", color: "#34D399" },
          { offset: "50%", color: "#6EE7B7" },
          { offset: "65%", color: "#34D399" },
          { offset: "100%", color: "#10B981" },
        ];

  return (
    <svg
      viewBox="155 440 920 315"
      className={className}
      fill="none"
      shapeRendering="geometricPrecision"
      aria-label="Insync by Ancchal"
      role="img"
    >
      <defs>
        <linearGradient id={gradId} x1="163" y1="447.5" x2="267" y2="692.5" gradientUnits="userSpaceOnUse">
          {stops.map((s, i) => (
            <stop key={i} offset={s.offset} stopColor={s.color} />
          ))}
        </linearGradient>
        <path id={`${gradId}-s`} d={PATHS.s} fill={ink} />
        <path id={`${gradId}-y`} d={PATHS.y} fill={ink} />
        <path id={`${gradId}-n`} d={PATHS.n} fill={ink} />
        <path id={`${gradId}-c`} d={PATHS.c} fill={ink} />
        <path id={`${gradId}-by`} d={PATHS.by} fill={ink} />
      </defs>

      {/* Emerald Architectural Frame around the 'i' */}
      <line x1="179.25" y1="447.5" x2="179.25" y2="692.5" stroke={`url(#${gradId})`} strokeWidth="4.5" strokeLinecap="square" />
      <line x1="251.25" y1="447.5" x2="251.25" y2="692.5" stroke={`url(#${gradId})`} strokeWidth="4.5" strokeLinecap="square" />
      <line x1="163" y1="464.25" x2="267" y2="464.25" stroke={`url(#${gradId})`} strokeWidth="4.5" strokeLinecap="square" />
      <line x1="163.5" y1="525.5" x2="266.5" y2="525.5" stroke={`url(#${gradId})`} strokeWidth="4.5" strokeLinecap="square" />

      {/* Emerald 'i' Stem and Square Dot */}
      <rect x="191" y="534" width="53" height="158" fill={`url(#${gradId})`} />
      <rect x="191.5" y="473.5" width="49" height="42.5" fill={`url(#${gradId})`} />

      {/* Letters: N S Y N C */}
      <use href={`#${gradId}-n`} xlinkHref={`#${gradId}-n`} transform="translate(-468.5 0)" />
      <use href={`#${gradId}-s`} xlinkHref={`#${gradId}-s`} />
      <use href={`#${gradId}-y`} xlinkHref={`#${gradId}-y`} />
      <use href={`#${gradId}-n`} xlinkHref={`#${gradId}-n`} />
      <use href={`#${gradId}-c`} xlinkHref={`#${gradId}-c`} />

      {/* Sub-brand signature: by Ancchal */}
      <use href={`#${gradId}-by`} xlinkHref={`#${gradId}-by`} transform={BY_TRANSFORM} />
    </svg>
  );
}
