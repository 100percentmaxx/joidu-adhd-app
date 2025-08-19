'use client'

import React from 'react'

interface TimerCircleProps {
  minutes: number
  onIncrement: () => void
  onDecrement: () => void
}

export default function TimerCircle({ minutes, onIncrement, onDecrement }: TimerCircleProps) {
  const formatTime = (mins: number) => {
    const hours = Math.floor(mins / 60)
    const remainingMins = mins % 60
    
    if (hours > 0) {
      return `${hours}:${remainingMins.toString().padStart(2, '0')}`
    }
    return `${mins}:00`
  }

  return (
    <div className="flex flex-col items-center" style={{ marginBottom: '32px' }}>
      {/* Large circular timer display - increased by 50% */}
      <div 
        className="flex items-center justify-center relative"
        style={{
          width: '480px', // 320 * 1.5
          height: '480px', // 320 * 1.5
          borderRadius: '50%',
          backgroundColor: 'var(--background)' // Background color
        }}
      >
        {/* Light orange ring */}
        <svg 
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 480 480"
        >
          <circle
            cx="240" // 160 * 1.5
            cy="240" // 160 * 1.5
            r="225" // 150 * 1.5
            fill="none"
            stroke="var(--timer-ring-background)" // Timer ring background
            strokeWidth="18" // 12 * 1.5
            opacity="0.6"
          />
        </svg>
        
        {/* Timer text positioned at absolute center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div style={{
            fontSize: '108px', // 72 * 1.5
            fontWeight: 'bold',
            color: 'var(--text-primary)',
            lineHeight: '1'
          }}>
            {formatTime(minutes)}
          </div>
        </div>
        
        {/* MINUTES label and +/- buttons positioned below center */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: '198px' }}> {/* 132 * 1.5 */}
          <div className="flex items-center justify-center" style={{ gap: '24px' }}> {/* 16 * 1.5 */}
            {/* MINUTES label */}
            <div style={{
              fontSize: '21px', // 14 * 1.5
              color: 'var(--text-secondary)',
              fontWeight: 'normal',
              letterSpacing: '0.05em'
            }}>
              MINUTES
            </div>

            {/* Plus/minus buttons stacked vertically */}
            <div className="flex flex-col" style={{ gap: '9px' }}> {/* 6 * 1.5 */}
              {/* Plus button */}
              <button
                onClick={onIncrement}
                className="flex items-center justify-center transition-all duration-200 hover:opacity-80"
                style={{
                  width: '42px', // 28 * 1.5
                  height: '42px', // 28 * 1.5
                  borderRadius: '50%',
                  backgroundColor: 'var(--input-background)', // Button fill
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)', // Same color as MINUTES
                  fontSize: '24px', // 16 * 1.5
                  fontWeight: 'bold'
                }}
                aria-label="Increase timer by 1 minute"
              >
                +
              </button>

              {/* Minus button */}
              <button
                onClick={onDecrement}
                className="flex items-center justify-center transition-all duration-200 hover:opacity-80"
                style={{
                  width: '42px', // 28 * 1.5
                  height: '42px', // 28 * 1.5
                  borderRadius: '50%',
                  backgroundColor: 'var(--input-background)', // Button fill
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)', // Same color as MINUTES
                  fontSize: '24px', // 16 * 1.5
                  fontWeight: 'bold'
                }}
                aria-label="Decrease timer by 1 minute"
                disabled={minutes <= 0}
              >
                −
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}