'use client'

import React, { useMemo, useCallback } from 'react'
import { useFormValue, set, unset } from 'sanity'
import { urlForImage } from '../lib/image'

const RATIO_OPTIONS = [
  {
    value: 'auto',
    label: 'Auto Natural',
    ratio: 'Original',
    cssRatio: 'auto',
    desc: 'Uses original photo dimensions with zero cropping. Fits every piece perfectly.',
    tag: 'Zero Cropping',
    boxW: 24,
    boxH: 24,
  },
  {
    value: '3 / 4',
    label: 'Portrait',
    ratio: '3:4',
    cssRatio: '3 / 4',
    desc: 'Tall vertical frame · Perfect for vases, urns, amphoras, and candelabras.',
    tag: 'Tall Accent',
    boxW: 20,
    boxH: 26,
  },
  {
    value: '1 / 1',
    label: 'Square',
    ratio: '1:1',
    cssRatio: '1 / 1',
    desc: 'Balanced square frame · Great for round vessels, bowls, and sculptural accents.',
    tag: 'Balanced',
    boxW: 23,
    boxH: 23,
  },
  {
    value: '4 / 3',
    label: 'Landscape',
    ratio: '4:3',
    cssRatio: '4 / 3',
    desc: 'Wide architectural frame · Ideal for salon trays, consoles, and multi-arm candelabras.',
    tag: 'Wide Spread',
    boxW: 28,
    boxH: 21,
  },
  {
    value: '16 / 10',
    label: 'Wide Screen',
    ratio: '16:10',
    cssRatio: '16 / 10',
    desc: 'Cinematic wide frame · Highlights consoles, tables, and panoramic arrangements.',
    tag: 'Cinematic',
    boxW: 32,
    boxH: 20,
  },
]

// Fallback sample image for instant visual feedback
const SAMPLE_DECOR_PHOTO = 'https://cdn.sanity.io/images/5g37myau/production/b9c39636875a8c5818237c38c08ac29ac3a18295-960x1280.jpg'

export function DecorCardPreviewSelector(props) {
  const { value, onChange } = props

  // Read current document values in real time from Sanity form state
  const name = useFormValue(['name']) || 'Product Name'
  const image = useFormValue(['image'])
  const order = useFormValue(['order'])
  const no = useFormValue(['no']) || '01'
  const category = useFormValue(['category']) || 'Curated Object'

  // Generate real image URL if asset is uploaded
  const imageUrl = useMemo(() => {
    if (!image) return null
    try {
      if (image.asset?._ref) {
        return urlForImage(image)?.width(1200)?.quality(92)?.url() || null
      }
      if (image.asset?.url) {
        return image.asset.url
      }
    } catch {
      return null
    }
    return null
  }, [image])

  const effectiveImageUrl = imageUrl || SAMPLE_DECOR_PHOTO

  // Hotspot positioning if set on the image
  const objectPosition = useMemo(() => {
    if (image?.hotspot) {
      const hX = Math.round((image.hotspot.x ?? 0.5) * 100)
      const hY = Math.round((image.hotspot.y ?? 0.5) * 100)
      return `${hX}% ${hY}%`
    }
    return '50% 50%'
  }, [image])

  // Current active ratio selection (defaults to 'auto')
  const currentRatio = value || 'auto'
  const activeOption = RATIO_OPTIONS.find((opt) => opt.value === currentRatio) || RATIO_OPTIONS[0]

  // Compute CSS aspect-ratio for the preview box
  const previewCssRatio = useMemo(() => {
    if (currentRatio === 'auto') {
      return '3 / 4' // Elegant portrait default for auto preview
    }
    return activeOption.cssRatio
  }, [currentRatio, activeOption])

  const handleSelect = useCallback(
    (nextVal) => {
      onChange(nextVal ? set(nextVal) : unset())
    },
    [onChange]
  )

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        padding: '16px',
        background: '#121215',
        borderRadius: '8px',
        border: '1px solid rgba(197, 160, 89, 0.3)',
        color: '#E5E2DC',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Header Info */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#C5A059',
            }}
          >
            Website Card Size &amp; Framing
          </span>
          <span
            style={{
              fontSize: '10px',
              padding: '2px 8px',
              background: 'rgba(197, 160, 89, 0.15)',
              border: '1px solid rgba(197, 160, 89, 0.4)',
              borderRadius: '4px',
              color: '#E5BA69',
              fontWeight: 600,
              letterSpacing: '0.08em',
            }}
          >
            Active: {activeOption.ratio} ({activeOption.label})
          </span>
        </div>
        <p style={{ margin: '5px 0 0', fontSize: '12px', color: '#8E8B85', lineHeight: 1.45 }}>
          Select how this piece displays in the website archive. See the <strong>Live Website Card Preview</strong> below update in real time.
        </p>
      </div>

      {/* 5 Clickable Aspect Ratio Options */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
          gap: '8px',
        }}
      >
        {RATIO_OPTIONS.map((opt) => {
          const isSelected = opt.value === currentRatio

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleSelect(opt.value)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '10px 8px',
                background: isSelected ? 'rgba(197, 160, 89, 0.16)' : '#19191E',
                border: isSelected ? '2px solid #C5A059' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                outline: 'none',
                boxShadow: isSelected ? '0 0 16px rgba(197, 160, 89, 0.25)' : 'none',
              }}
            >
              {/* Mini Aspect Ratio Wireframe Box */}
              <div
                style={{
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '6px',
                }}
              >
                <div
                  style={{
                    width: `${opt.boxW}px`,
                    height: `${opt.boxH}px`,
                    border: isSelected ? '2px solid #E5BA69' : '1.5px solid #6A6762',
                    background: isSelected ? 'rgba(197, 160, 89, 0.3)' : 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '2px',
                    transition: 'all 0.25s ease',
                  }}
                />
              </div>

              {/* Title & Ratio */}
              <span
                style={{
                  fontSize: '11.5px',
                  fontWeight: isSelected ? 700 : 600,
                  color: isSelected ? '#FFFFFF' : '#C5C1BA',
                  letterSpacing: '0.02em',
                }}
              >
                {opt.label}
              </span>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  color: isSelected ? '#E5BA69' : '#88857F',
                  marginTop: '1px',
                }}
              >
                {opt.ratio}
              </span>

              {/* Tag */}
              <span
                style={{
                  marginTop: '5px',
                  fontSize: '9px',
                  padding: '2px 5px',
                  borderRadius: '3px',
                  background: isSelected ? '#C5A059' : 'rgba(255, 255, 255, 0.06)',
                  color: isSelected ? '#000000' : '#99958F',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                {opt.tag}
              </span>
            </button>
          )
        })}
      </div>

      {/* Real-Time Live Website Card Preview Frame */}
      <div
        style={{
          marginTop: '6px',
          background: '#0B0B0D',
          borderRadius: '8px',
          border: '1px solid rgba(197, 160, 89, 0.35)',
          padding: '14px',
          boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Preview Top Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '10px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '14px',
            fontSize: '11px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                display: 'inline-block',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#4ade80',
                boxShadow: '0 0 6px #4ade80',
              }}
            />
            <span style={{ fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#E5BA69' }}>
              Live Website Card Preview
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#88847E', fontSize: '10.5px' }}>
              {imageUrl ? '✓ Uploaded Photo' : 'Sample Preview'}
            </span>
            <span
              style={{
                background: 'rgba(197, 160, 89, 0.2)',
                color: '#E5BA69',
                padding: '2px 8px',
                borderRadius: '4px',
                fontWeight: 700,
                fontSize: '10px',
                letterSpacing: '0.08em',
              }}
            >
              FRAME: {activeOption.ratio}
            </span>
          </div>
        </div>

        {/* The Exact Website Card Representation */}
        <div
          style={{
            maxWidth: previewCssRatio === '3 / 4' ? '280px' : '360px',
            margin: '0 auto',
            transition: 'max-width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '4px',
              border: '1px solid rgba(197, 160, 89, 0.35)',
              padding: '12px 12px 16px',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.45)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Image Frame with Viewfinder Accents */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: previewCssRatio,
                background: '#EAE6DE',
                borderRadius: '2px',
                overflow: 'hidden',
                border: '1px solid rgba(197, 160, 89, 0.2)',
                transition: 'aspect-ratio 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <img
                src={effectiveImageUrl}
                alt={name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: objectPosition,
                  display: 'block',
                  transition: 'object-position 0.3s ease',
                }}
              />

              {/* Viewfinder Crosshairs in 4 Corners */}
              <div style={{ position: 'absolute', top: '6px', left: '6px', width: '8px', height: '8px', borderTop: '1.5px solid #C5A059', borderLeft: '1.5px solid #C5A059', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px', borderTop: '1.5px solid #C5A059', borderRight: '1.5px solid #C5A059', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '6px', left: '6px', width: '8px', height: '8px', borderBottom: '1.5px solid #C5A059', borderLeft: '1.5px solid #C5A059', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '6px', right: '6px', width: '8px', height: '8px', borderBottom: '1.5px solid #C5A059', borderRight: '1.5px solid #C5A059', pointerEvents: 'none' }} />

              {/* Plate Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  background: 'rgba(18, 17, 16, 0.72)',
                  backdropFilter: 'blur(8px)',
                  padding: '2px 6px',
                  borderRadius: '2px',
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  color: '#E5BA69',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(197, 160, 89, 0.4)',
                  pointerEvents: 'none',
                }}
              >
                PLATE {order !== undefined ? String(order).padStart(2, '0') : no}
              </div>
            </div>

            {/* Product Name (Libre Bodoni styling) */}
            <h4
              style={{
                fontFamily: "'Libre Bodoni', Georgia, serif",
                fontSize: '14.5px',
                fontWeight: 400,
                color: '#1A1A1A',
                letterSpacing: '0.015em',
                textAlign: 'center',
                margin: '12px 0 0',
                lineHeight: 1.35,
              }}
            >
              {name}
            </h4>
          </div>
        </div>

        {/* Live Description / Advice */}
        <div
          style={{
            marginTop: '14px',
            padding: '8px 10px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '4px',
            borderLeft: '3px solid #C5A059',
            fontSize: '11px',
            color: '#BDB9B2',
            lineHeight: 1.5,
          }}
        >
          <strong style={{ color: '#E5BA69' }}>{activeOption.label} ({activeOption.ratio}): </strong>
          {activeOption.desc}
        </div>
      </div>
    </div>
  )
}

export default DecorCardPreviewSelector
