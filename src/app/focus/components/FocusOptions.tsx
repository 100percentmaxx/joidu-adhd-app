'use client'

import React from 'react'

interface FocusOptionsData {
  autoBreak: boolean
  breakDuration: number
  blockDistractions: boolean
  endSound: boolean
}

interface FocusOptionsProps {
  options: FocusOptionsData
  onChange: (options: FocusOptionsData) => void
}

export default function FocusOptions({ options, onChange }: FocusOptionsProps) {
  const handleToggle = (key: keyof FocusOptionsData) => {
    onChange({
      ...options,
      [key]: !options[key]
    })
  }

  const handleBreakDurationChange = (value: string) => {
    const duration = parseInt(value) || 5
    onChange({
      ...options,
      breakDuration: Math.max(1, Math.min(30, duration)) // Clamp between 1-30
    })
  }

  // iOS-style toggle switch component
  const ToggleSwitch = ({ 
    isOn, 
    onToggle, 
    ariaLabel 
  }: { 
    isOn: boolean
    onToggle: () => void
    ariaLabel: string
  }) => (
    <button
      onClick={onToggle}
      className="relative transition-all duration-200"
      style={{
        width: '44px',
        height: '24px',
        borderRadius: '12px',
        backgroundColor: isOn ? '#2847ef' : '#e2e2e2',
        border: 'none',
        cursor: 'pointer'
      }}
      role="switch"
      aria-checked={isOn}
      aria-label={ariaLabel}
    >
      <div
        className="absolute top-0.5 left-0.5 transition-all duration-200"
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: 'white',
          transform: isOn ? 'translateX(20px)' : 'translateX(0px)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
        }}
      />
    </button>
  )

  return (
    <div style={{ marginBottom: '32px' }}>
      {/* Title */}
      <h3 style={{
        fontSize: '18px',
        fontWeight: 600,
        color: '#4c4c4c',
        marginBottom: '16px'
      }}>
        Focus Options
      </h3>

      {/* Option 1: Auto Break */}
      <div 
        className="flex items-center justify-between"
        style={{
          marginBottom: '20px'
        }}
      >
        <div>
          <div style={{
            fontSize: '16px',
            fontWeight: 'medium',
            color: '#4c4c4c',
            marginBottom: '4px'
          }}>
            Auto Break
          </div>
          <div style={{
            fontSize: '14px',
            color: '#a5a5a5'
          }}>
            Automatic break after timer ends
          </div>
        </div>
        <ToggleSwitch
          isOn={options.autoBreak}
          onToggle={() => handleToggle('autoBreak')}
          ariaLabel="Toggle auto break"
        />
      </div>

      {/* Option 2: Break Duration */}
      <div 
        className="flex items-center justify-between"
        style={{
          marginBottom: '20px'
        }}
      >
        <div>
          <div style={{
            fontSize: '16px',
            fontWeight: 'medium',
            color: '#4c4c4c',
            marginBottom: '4px'
          }}>
            Break Duration
          </div>
          <div style={{
            fontSize: '14px',
            color: '#a5a5a5'
          }}>
            How long break lasts
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="number"
            value={options.breakDuration}
            onChange={(e) => handleBreakDurationChange(e.target.value)}
            min="1"
            max="30"
            className="text-center"
            style={{
              width: '60px',
              height: '32px',
              backgroundColor: 'white',
              border: '1px solid #e2e2e2',
              borderRadius: '6px',
              fontSize: '14px',
              color: '#4c4c4c'
            }}
            aria-label="Break duration in minutes"
          />
          <span style={{
            marginLeft: '8px',
            fontSize: '14px',
            color: '#a5a5a5'
          }}>
            min
          </span>
        </div>
      </div>

      {/* Option 3: Block Distractions */}
      <div 
        className="flex items-center justify-between"
        style={{
          marginBottom: '20px'
        }}
      >
        <div>
          <div style={{
            fontSize: '16px',
            fontWeight: 'medium',
            color: '#4c4c4c',
            marginBottom: '4px'
          }}>
            Block Distractions
          </div>
          <div style={{
            fontSize: '14px',
            color: '#a5a5a5'
          }}>
            Minimize notifications during focus time
          </div>
        </div>
        <ToggleSwitch
          isOn={options.blockDistractions}
          onToggle={() => handleToggle('blockDistractions')}
          ariaLabel="Toggle block distractions"
        />
      </div>

      {/* Option 4: End Sound */}
      <div 
        className="flex items-center justify-between"
        style={{
          marginBottom: '20px'
        }}
      >
        <div>
          <div style={{
            fontSize: '16px',
            fontWeight: 'medium',
            color: '#4c4c4c',
            marginBottom: '4px'
          }}>
            End Sound
          </div>
          <div style={{
            fontSize: '14px',
            color: '#a5a5a5'
          }}>
            Play sound when timer completes
          </div>
        </div>
        <ToggleSwitch
          isOn={options.endSound}
          onToggle={() => handleToggle('endSound')}
          ariaLabel="Toggle end sound"
        />
      </div>
    </div>
  )
}