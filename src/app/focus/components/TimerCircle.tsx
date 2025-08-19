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
    <div className="flex flex-col items-center" style={{ marginBottom: '32px', padding: '0 10px' }}>
      {/* Large circular timer display - responsive sizing */}
      <div 
        className="flex items-center justify-center relative"
        style={{
          width: 'min(354px, calc(100vw - 60px))',
          height: 'min(354px, calc(100vw - 60px))',
          borderRadius: '50%',
          backgroundColor: 'var(--background)', // Background color
          aspectRatio: '1/1'
        }}
      >
        {/* Light orange ring */}
        <svg 
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 354 354"
        >
          <circle
            cx="177"
            cy="177"
            r="167"
            fill="none"
            stroke="var(--timer-ring-background)" // Timer ring background
            strokeWidth="10"
            opacity="0.6"
          />
        </svg>
        
        {/* Timer text positioned at absolute center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div style={{
            fontSize: 'clamp(48px, 12vw, 80px)', // Responsive font size
            fontWeight: 'bold',
            color: 'var(--text-primary)',
            lineHeight: '1',
            textAlign: 'center'
          }}>
            {formatTime(minutes)}
          </div>
        </div>
        
        {/* MINUTES label and +/- buttons positioned below center */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: 'clamp(120px, 30vw, 150px)' }}>
          <div className="flex items-center justify-center" style={{ gap: 'clamp(16px, 4vw, 24px)' }}>
            {/* MINUTES label */}
            <div style={{
              fontSize: 'clamp(12px, 3.5vw, 16px)', // Responsive font size
              color: 'var(--text-secondary)',
              fontWeight: 'normal',
              letterSpacing: '0.05em'
            }}>
              MINUTES
            </div>

            {/* Plus/minus buttons stacked vertically */}
            <div className="flex flex-col" style={{ gap: 'clamp(6px, 1.5vw, 9px)' }}>
              {/* Plus button */}
              <button
                onClick={onIncrement}
                className="flex items-center justify-center transition-all duration-200 hover:opacity-80"
                style={{
                  width: 'clamp(32px, 8vw, 42px)', // Responsive button size
                  height: 'clamp(32px, 8vw, 42px)',
                  borderRadius: '50%',
                  backgroundColor: 'var(--input-background)', // Button fill
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)', // Same color as MINUTES
                  fontSize: 'clamp(16px, 4vw, 24px)', // Responsive font size
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
                  width: 'clamp(32px, 8vw, 42px)', // Responsive button size
                  height: 'clamp(32px, 8vw, 42px)',
                  borderRadius: '50%',
                  backgroundColor: 'var(--input-background)', // Button fill
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)', // Same color as MINUTES
                  fontSize: 'clamp(16px, 4vw, 24px)', // Responsive font size
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