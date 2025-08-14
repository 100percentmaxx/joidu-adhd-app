'use client'

import React from 'react'
import { FocusOptions } from '@/types/focus'

interface FocusOptionsProps {
  options: FocusOptions
  onChange: (options: FocusOptions) => void
  disabled?: boolean
}

export default function FocusOptionsComponent({ 
  options, 
  onChange, 
  disabled = false 
}: FocusOptionsProps) {
  const handleToggle = (key: keyof FocusOptions) => {
    onChange({
      ...options,
      [key]: !options[key]
    })
  }

  const handleBreakDurationChange = (duration: number) => {
    onChange({
      ...options,
      breakDuration: duration
    })
  }

  const ToggleSwitch = ({ 
    isOn, 
    onToggle, 
    label,
    description 
  }: { 
    isOn: boolean
    onToggle: () => void
    label: string
    description: string
  }) => (
    <div className="flex items-center justify-between p-4 rounded-lg bg-white border border-gray-200">
      <div className="flex-1">
        <h4 style={{ 
          color: '#4c4c4c', 
          fontSize: '16px', 
          fontWeight: 500,
          marginBottom: '4px'
        }}>
          {label}
        </h4>
        <p style={{ 
          color: '#a5a5a5', 
          fontSize: '14px' 
        }}>
          {description}
        </p>
      </div>
      <button
        onClick={onToggle}
        disabled={disabled}
        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
        style={{
          backgroundColor: isOn ? '#fa772c' : '#e2e2e2'
        }}
        role="switch"
        aria-checked={isOn}
        aria-label={`Toggle ${label}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isOn ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )

  return (
    <div className="space-y-4">
      <h3 style={{ 
        color: '#4c4c4c', 
        fontSize: '18px', 
        fontWeight: 600,
        marginBottom: '16px'
      }}>
        Focus Options
      </h3>

      <ToggleSwitch
        isOn={options.autoBreak}
        onToggle={() => handleToggle('autoBreak')}
        label="Auto Break"
        description="Automatically suggest breaks to protect against hyperfocus"
      />

      {options.autoBreak && (
        <div className="ml-4 p-4 rounded-lg bg-gray-50">
          <h4 style={{ 
            color: '#4c4c4c', 
            fontSize: '16px', 
            fontWeight: 500,
            marginBottom: '12px'
          }}>
            Break Duration
          </h4>
          <div className="flex space-x-2">
            {[5, 10, 15, 20].map((duration) => (
              <button
                key={duration}
                onClick={() => handleBreakDurationChange(duration)}
                disabled={disabled}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: options.breakDuration === duration ? '#fa772c' : 'white',
                  color: options.breakDuration === duration ? 'white' : '#4c4c4c',
                  border: `2px solid ${options.breakDuration === duration ? '#fa772c' : '#e2e2e2'}`
                }}
              >
                {duration}m
              </button>
            ))}
          </div>
        </div>
      )}

      <ToggleSwitch
        isOn={options.blockDistractions}
        onToggle={() => handleToggle('blockDistractions')}
        label="Block Distractions"
        description="Hide notifications and other distracting elements during focus"
      />

      <ToggleSwitch
        isOn={options.endSound}
        onToggle={() => handleToggle('endSound')}
        label="End Sound"
        description="Play a gentle sound when your focus session completes"
      />

      {/* ADHD-friendly explanation */}
      <div 
        className="mt-6 p-4 rounded-lg"
        style={{ backgroundColor: '#e6f3ff', border: '1px solid #2847ef' }}
      >
        <div className="flex items-start space-x-3">
          <span style={{ fontSize: '20px' }}>💙</span>
          <div>
            <h4 style={{ 
              color: '#2847ef', 
              fontSize: '14px', 
              fontWeight: 600,
              marginBottom: '4px'
            }}>
              ADHD-Friendly Design
            </h4>
            <p style={{ 
              color: '#4c4c4c', 
              fontSize: '14px',
              lineHeight: '1.4'
            }}>
              These settings help your ADHD brain stay focused while protecting against 
              hyperfocus burnout. Auto breaks are especially important for maintaining 
              sustainable productivity.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}