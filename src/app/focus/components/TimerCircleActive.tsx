'use client'

import React from 'react'

interface TimerCircleActiveProps {
  timeRemaining: number // in seconds
  totalTime: number // in seconds
  isRunning: boolean
  sessionDuration: number // in minutes for display
}

export default function TimerCircleActive({ timeRemaining, totalTime, isRunning, sessionDuration }: TimerCircleActiveProps) {
  const formatTime = (seconds: number): string => {
    if (!seconds || seconds < 0 || !isFinite(seconds)) {
      return '0:00'
    }
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Calculate progress (0 to 1)
  const progress = (totalTime > 0 && timeRemaining >= 0) ? (totalTime - timeRemaining) / totalTime : 0
  
  // Circle specifications - increased by 50%
  const radius = 195 // For 420px total diameter with stroke (280 * 1.5)
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference * progress // Counter-clockwise from top
  
  // Calculate ball position (counter-clockwise from top)
  const angle = -90 - (progress * 360) // Start at top (-90°), go counter-clockwise
  const ballX = 210 + radius * Math.cos((angle * Math.PI) / 180)
  const ballY = 210 + radius * Math.sin((angle * Math.PI) / 180)

  return (
    <div className="flex flex-col items-center">
      <div style={{ position: 'relative', width: '420px', height: '420px', marginBottom: '20px' }}>
        {/* SVG Circle */}
        <svg
          width="420"
          height="420"
          viewBox="0 0 420 420"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          {/* Background circle */}
          <circle
            cx="210"
            cy="210"
            r={radius}
            fill="none"
            stroke="#f9dac5" // Light Orange
            strokeWidth="12"
          />
          
          {/* Progress circle - counter-clockwise from top */}
          <circle
            cx="210"
            cy="210"
            r={radius}
            fill="none"
            stroke="#f9c075" // Dark Orange
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 210 210)" // Start from top
            style={{
              transition: isRunning ? 'stroke-dashoffset 1s linear' : 'none'
            }}
          />
          
          {/* Progress ball */}
          {progress > 0 && (
            <circle
              cx={ballX}
              cy={ballY}
              r="12" // 24px diameter
              fill="#f9c075" // Dark Orange ball
              style={{
                transition: isRunning ? 'cx 1s linear, cy 1s linear' : 'none'
              }}
            />
          )}
        </svg>

        {/* Timer text centered inside circle */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '96px', // Doubled from 48px
            fontWeight: 600,
            color: '#4c4c4c', // Main Gray
            lineHeight: '1',
            textAlign: 'center'
          }}
        >
          {formatTime(timeRemaining)}
        </div>
      </div>
      
      {/* Session duration below timer */}
      <p style={{
        fontSize: '16px',
        color: '#a5a5a5', // Light Gray
        fontWeight: 'normal',
        margin: 0
      }}>
        {sessionDuration}m session
      </p>
    </div>
  )
}