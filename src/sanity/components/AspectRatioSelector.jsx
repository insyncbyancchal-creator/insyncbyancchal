'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { useFormValue, set, unset } from 'sanity'
import { urlForImage } from '../lib/image'

const RATIO_OPTIONS = [
  {
    value: '16 / 10',
    label: 'Landscape',
    ratio: '16:10',
    cssRatio: '16 / 10',
    desc: 'Standard architectural wide view · Ideal for living rooms & wide spaces',
    tag: 'Standard Grid',
    boxW: 32,
    boxH: 20,
  },
  {
    value: '3 / 4',
    label: 'Portrait',
    ratio: '3:4',
    cssRatio: '3 / 4',
    desc: 'Tall vertical spatial view · Highlights double-height ceilings & columns',
    tag: 'Tall Feature',
    boxW: 18,
    boxH: 24,
  },
  {
    value: '16 / 9',
    label: 'Wide Screen',
    ratio: '16:9',
    cssRatio: '16 / 9',
    desc: 'Cinematic panoramic spread · Highlights full-width terraces & skylines',
    tag: 'Cinematic Wide',
    boxW: 34,
    boxH: 19,
  },
  {
    value: '1 / 1',
    label: 'Square',
    ratio: '1:1',
    cssRatio: '1 / 1',
    desc: '1:1 focused frame · Highlights millwork, marble veins & material details',
    tag: 'Square Focus',
    boxW: 22,
    boxH: 22,
  },
]

// Architectural sample photo for instant preview before image upload
const SAMPLE_PREVIEW_PHOTO = '/hero/photo_1.jpg'

// Fallback Sanity CDN URL builder in case imageBuilder is unavailable
function parseSanityAssetRef(ref, projectId = '5g37myau', dataset = 'production') {
  if (!ref || typeof ref !== 'string') return null
  if (ref.startsWith('image-')) {
    const parts = ref.split('-')
    const id = parts[1]
    const dims = parts[2]
    const ext = parts[3]
    if (id && dims && ext) {
      return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dims}.${ext}`
    }
  }
  return null
}

export function AspectRatioSelector(props) {
  const { value, onChange, path } = props
  const [useSampleIfEmpty, setUseSampleIfEmpty] = useState(true)

  // 1. Get the current parent image object from Sanity form state
  const parentPath = useMemo(() => {
    return Array.isArray(path) && path.length > 0 ? path.slice(0, -1) : []
  }, [path])

  const parentImage = useFormValue(parentPath)
  const rootDoc = useFormValue([])

  // Resolve image object with double fallback (parentPath + rootDoc gallery lookup)
  const resolvedImage = useMemo(() => {
    if (parentImage && (parentImage.asset || parentImage.caption || parentImage._type === 'image')) {
      return parentImage
    }
    if (Array.isArray(path) && path.length > 1 && Array.isArray(rootDoc?.gallery)) {
      const key = path[1]?._key
      if (key) {
        const found = rootDoc.gallery.find((item) => item._key === key)
        if (found) return found
      }
      if (typeof path[1] === 'number' && rootDoc.gallery[path[1]]) {
        return rootDoc.gallery[path[1]]
      }
    }
    return parentImage || null
  }, [parentImage, rootDoc, path])

  // 2. Generate live image URL if asset is uploaded
  const uploadedImageUrl = useMemo(() => {
    if (!resolvedImage) return null
    try {
      if (resolvedImage.asset?._ref) {
        const fromBuilder = urlForImage(resolvedImage)?.width(1400)?.quality(92)?.url()
        if (fromBuilder) return fromBuilder
        return parseSanityAssetRef(resolvedImage.asset._ref)
      }
      if (resolvedImage.asset?.url) {
        return resolvedImage.asset.url
      }
      if (typeof resolvedImage.asset === 'string') {
        return parseSanityAssetRef(resolvedImage.asset)
      }
      if (typeof resolvedImage === 'string') {
        return resolvedImage
      }
    } catch {
      return null
    }
    return null
  }, [resolvedImage])

  const effectiveImageUrl = uploadedImageUrl || (useSampleIfEmpty ? SAMPLE_PREVIEW_PHOTO : null)

  // 3. Hotspot positioning if defined on the image
  const objectPosition = useMemo(() => {
    const imgObj = resolvedImage || parentImage
    if (imgObj?.hotspot) {
      const hX = Math.round((imgObj.hotspot.x ?? 0.5) * 100)
      const hY = Math.round((imgObj.hotspot.y ?? 0.5) * 100)
      return `${hX}% ${hY}%`
    }
    return 'center center'
  }, [resolvedImage, parentImage])

  // Current active ratio selection (default to 16 / 10)
  const currentRatio = value || '16 / 10'
  const activeOption = RATIO_OPTIONS.find((opt) => opt.value === currentRatio) || RATIO_OPTIONS[0]

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#C5A059',
              }}
            >
              Choose Aspect Ratio
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
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#8E8B85', lineHeight: 1.4 }}>
            Click an aspect ratio card below. The live website preview below will instantly adjust so you can see the exact framing.
          </p>
        </div>
      </div>

      {/* 4 Clickable Visual Aspect Ratio Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '10px',
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
                padding: '12px 10px',
                background: isSelected ? 'rgba(197, 160, 89, 0.16)' : '#19191E',
                border: isSelected ? '2px solid #C5A059' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                outline: 'none',
                position: 'relative',
                boxShadow: isSelected ? '0 0 16px rgba(197, 160, 89, 0.25)' : 'none',
              }}
            >
              {/* Mini Aspect Ratio Box Preview */}
              <div
                style={{
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px',
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
                  fontSize: '12.5px',
                  fontWeight: isSelected ? 700 : 600,
                  color: isSelected ? '#FFFFFF' : '#C5C1BA',
                  letterSpacing: '0.02em',
                }}
              >
                {opt.label}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: isSelected ? '#E5BA69' : '#88857F',
                  marginTop: '2px',
                }}
              >
                ({opt.ratio})
              </span>

              {/* Tag */}
              <span
                style={{
                  marginTop: '6px',
                  fontSize: '9.5px',
                  padding: '2px 6px',
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

      {/* Real-Time Live Website Preview Frame */}
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
        {/* Preview Frame Top Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '10px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '12px',
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
              Live Website Gallery Preview
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#88847E', fontSize: '10.5px' }}>
              {uploadedImageUrl ? '✓ Showing Your Uploaded Photo' : 'Showing Architectural Sample'}
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
              RATIO: {activeOption.ratio}
            </span>
          </div>
        </div>

        {/* Dynamic Aspect Ratio Preview Container (Morphs Smoothly) */}
        <div
          style={{
            maxWidth: activeOption.cssRatio === '3 / 4' ? '280px' : '480px',
            margin: '0 auto',
            transition: 'max-width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: activeOption.cssRatio,
              background: '#1A1A1E',
              borderRadius: '4px',
              overflow: 'hidden',
              border: '1.5px solid rgba(197, 160, 89, 0.5)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(197, 160, 89, 0.1)',
              transition: 'aspect-ratio 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* The Actual Image / Sample Image */}
            {effectiveImageUrl ? (
              <img
                src={effectiveImageUrl}
                alt="Aspect Ratio Live Preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: objectPosition,
                  display: 'block',
                  transition: 'all 0.45s ease',
                  filter: 'brightness(1.02) contrast(1.02)',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px',
                  textAlign: 'center',
                  background: 'repeating-linear-gradient(45deg, #151518, #151518 10px, #18181D 10px, #18181D 20px)',
                  color: '#8A867F',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1.5px dashed #C5A059',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '8px',
                    color: '#C5A059',
                    fontSize: '16px',
                  }}
                >
                  📐
                </div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#C5A059', letterSpacing: '0.08em' }}>
                  {activeOption.label.toUpperCase()} FRAME ({activeOption.ratio})
                </span>
                <span style={{ fontSize: '10.5px', color: '#77736D', marginTop: '4px', maxWidth: '200px' }}>
                  Upload a photo above to see it dynamically framed in this ratio.
                </span>
              </div>
            )}

            {/* Architectural Viewfinder Crosshairs on 4 Corners */}
            <div
              style={{
                position: 'absolute',
                top: '8px',
                left: '8px',
                width: '10px',
                height: '10px',
                borderTop: '2px solid #C5A059',
                borderLeft: '2px solid #C5A059',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '10px',
                height: '10px',
                borderTop: '2px solid #C5A059',
                borderRight: '2px solid #C5A059',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                width: '10px',
                height: '10px',
                borderBottom: '2px solid #C5A059',
                borderLeft: '2px solid #C5A059',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                width: '10px',
                height: '10px',
                borderBottom: '2px solid #C5A059',
                borderRight: '2px solid #C5A059',
                pointerEvents: 'none',
              }}
            />

            {/* Subtle Viewfinder Badge Overlays (matching website) */}
            <div
              style={{
                position: 'absolute',
                top: '10px',
                left: '12px',
                background: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(8px)',
                padding: '3px 7px',
                borderRadius: '2px',
                fontSize: '9.5px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                color: '#C5A059',
                textTransform: 'uppercase',
                border: '1px solid rgba(197, 160, 89, 0.4)',
                pointerEvents: 'none',
              }}
            >
              PLATE · {activeOption.ratio}
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '12px',
                right: '12px',
                background: 'rgba(0, 0, 0, 0.72)',
                backdropFilter: 'blur(8px)',
                padding: '4px 8px',
                borderRadius: '2px',
                fontSize: '10px',
                color: '#FFFFFF',
                letterSpacing: '0.04em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                pointerEvents: 'none',
              }}
            >
              <span style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {parentImage?.caption || parentImage?.alt || 'Room / Photo View'}
              </span>
              <span style={{ fontSize: '9px', color: '#E5BA69', fontWeight: 700, letterSpacing: '0.12em', flexShrink: 0 }}>
                {activeOption.tag}
              </span>
            </div>
          </div>
        </div>

        {/* Live Description / Website Advice */}
        <div
          style={{
            marginTop: '12px',
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

      {/* Native Fallback Select Dropdown for complete accessibility */}
      <div style={{ marginTop: '2px' }}>
        <label
          htmlFor="aspectRatioSelect"
          style={{
            display: 'block',
            fontSize: '10.5px',
            color: '#77746E',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '4px',
            fontWeight: 600,
          }}
        >
          Dropdown selector:
        </label>
        <select
          id="aspectRatioSelect"
          value={currentRatio}
          onChange={(e) => handleSelect(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 10px',
            background: '#1A1A20',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '4px',
            color: '#E5E2DC',
            fontSize: '12.5px',
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          {RATIO_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label} ({opt.ratio}) — {opt.tag}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
export default AspectRatioSelector
