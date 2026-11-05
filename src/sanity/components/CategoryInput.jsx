'use client'

import React, { useCallback } from 'react'
import { set } from 'sanity'

const PRESETS = [
  'Residential Villa',
  'Luxury Penthouse',
  'Commercial Atelier',
  'Hospitality & Resort',
  'Architectural Renovation',
  'Modern Farmhouse',
  'Heritage Residence',
]

export function CategoryInput(props) {
  const { value, onChange } = props

  const handleSelectPreset = useCallback(
    (preset) => {
      onChange(set(preset))
    },
    [onChange]
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {/* Native Sanity text input allowing freeform writing */}
      {props.renderDefault(props)}

      {/* Quick 1-click luxury presets for instant convenience */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          alignItems: 'center',
          paddingTop: '3px',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            color: '#8c887b',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginRight: '2px',
            fontWeight: 500,
          }}
        >
          Quick Presets:
        </span>
        {PRESETS.map((preset) => {
          const isSelected = value === preset
          return (
            <button
              key={preset}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              style={{
                background: isSelected ? '#C5A059' : 'rgba(197, 160, 89, 0.1)',
                color: isSelected ? '#1A1A1A' : '#C5A059',
                border: isSelected
                  ? '1px solid #C5A059'
                  : '1px solid rgba(197, 160, 89, 0.35)',
                borderRadius: '999px',
                padding: '3px 10px',
                fontSize: '11.5px',
                fontFamily: 'inherit',
                cursor: 'pointer',
                fontWeight: isSelected ? 600 : 500,
                transition: 'all 0.18s ease',
              }}
            >
              {preset}
            </button>
          )
        })}
      </div>
    </div>
  )
}
