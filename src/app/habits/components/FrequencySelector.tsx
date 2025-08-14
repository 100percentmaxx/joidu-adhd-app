'use client'

import React from 'react'
import { FrequencyType } from '@/types/habits'

interface FrequencySelectorProps {
  selectedFrequency?: FrequencyType
  onSelect: (frequency: FrequencyType) => void
}

export default function FrequencySelector({ selectedFrequency, onSelect }: FrequencySelectorProps) {
  const frequencies: { value: FrequencyType; label: string }[] = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekdays', label: 'Weekdays' },
    { value: 'threePerWeek', label: '3 times per week' },
    { value: 'custom', label: 'Custom' }
  ]

  return (
    <div>
      {/* Label */}
      <label style={{
        fontSize: '16px',
        fontWeight: 500,
        color: '#4c4c4c',
        display: 'block',
        marginBottom: '12px'
      }}>
        How often?
      </label>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginBottom: '24px'
      }}>
        {frequencies.map((freq) => {
          const isSelected = selectedFrequency === freq.value
          
          return (
            <button
              key={freq.value}
              onClick={() => onSelect(freq.value)}
              style={{
                height: '44px',
                backgroundColor: isSelected ? '#cae9ef' : '#FFFFFF',
                border: isSelected ? '2px solid #2847ef' : '2px solid #e2e2e2',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{
                fontSize: '14px',
                fontWeight: 500,
                color: '#4c4c4c'
              }}>
                {freq.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}