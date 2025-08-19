'use client'

import React from 'react'

interface DurationOption {
  value: number
  label: string
  sublabel: string
}

interface DurationGridProps {
  selectedDuration: number
  onDurationSelect: (duration: number) => void
}

const durationOptions: DurationOption[] = [
  { value: 15, label: '15', sublabel: 'QUICK' },
  { value: 25, label: '25', sublabel: 'POMODORO' },
  { value: 45, label: '45', sublabel: 'DEEP WORK' },
  { value: 60, label: '60', sublabel: 'LONG FOCUS' },
  { value: 90, label: '90', sublabel: 'EXTENDED' },
  { value: -1, label: 'Custom', sublabel: 'YOUR TIME' } // -1 for custom
]

export default function DurationGrid({ selectedDuration, onDurationSelect }: DurationGridProps) {
  return (
    <div style={{ marginBottom: '24px' }}>
      {/* Duration Selection Grid (2 rows x 3 columns) */}
      <div 
        className="grid grid-cols-3 gap-2"
        style={{ 
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: '8px'
        }}
      >
        {durationOptions.map((option) => {
          // Check if this specific preset is selected, or if Custom should be selected
          const presetValues = [15, 25, 45, 60, 90]
          const isCustomTime = !presetValues.includes(selectedDuration)
          
          const isSelected = option.value === -1 
            ? isCustomTime // Custom is selected when duration doesn't match any preset
            : selectedDuration === option.value
          
          return (
            <button
              key={option.value}
              onClick={() => onDurationSelect(option.value)}
              className="transition-all duration-200 hover:opacity-90"
              style={{
                height: '48px',
                borderRadius: '12px',
                backgroundColor: isSelected ? 'var(--category-personal-light)' : 'var(--card-background)', // Light Blue for selected, white for unselected
                color: 'var(--text-primary)',
                border: isSelected ? '2px solid var(--primary-blue)' : '2px solid var(--border-color)', // Primary Blue stroke for selected, Light Gray for unselected
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 'medium'
              }}
              aria-pressed={isSelected}
              aria-label={`${option.label} minute ${option.sublabel.toLowerCase()} session`}
            >
              <div style={{ 
                fontSize: '16px', 
                fontWeight: 'bold',
                lineHeight: '1'
              }}>
                {option.label}
              </div>
              <div style={{ 
                fontSize: '10px', 
                opacity: 0.8,
                letterSpacing: '0.02em',
                marginTop: '2px'
              }}>
                {option.sublabel}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}