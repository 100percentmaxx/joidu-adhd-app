'use client'

import React from 'react'

interface TimerDisplayProps {
  timeDisplay: string
  progress: number
  isActive: boolean
  size?: 'small' | 'medium' | 'large'
  showProgress?: boolean
}

export default function TimerDisplay({ 
  timeDisplay, 
  progress, 
  isActive, 
  size = 'large',
  showProgress = true 
}: TimerDisplayProps) {
  const sizeStyles = {
    small: {
      container: 'w-24 h-24',
      text: 'text-lg',
      stroke: 2
    },
    medium: {
      container: 'w-32 h-32', 
      text: 'text-xl',
      stroke: 3
    },
    large: {
      container: 'w-48 h-48',
      text: 'text-4xl',
      stroke: 4
    }
  }

  const styles = sizeStyles[size]
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="flex items-center justify-center">
      <div className={`relative ${styles.container}`}>
        {/* Background Circle */}
        <svg 
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#e2e2e2"
            strokeWidth={styles.stroke}
            fill="transparent"
          />
          {showProgress && (
            <circle
              cx="50"
              cy="50" 
              r={radius}
              stroke="#fa772c"
              strokeWidth={styles.stroke}
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{
                filter: isActive ? 'drop-shadow(0 0 8px rgba(247, 119, 44, 0.3))' : 'none'
              }}
            />
          )}
        </svg>
        
        {/* Timer Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span 
            className={`font-bold ${styles.text}`}
            style={{ 
              color: '#2847ef',
              textShadow: isActive ? '0 0 20px rgba(40, 71, 239, 0.3)' : 'none'
            }}
            role="timer"
            aria-live="polite"
            aria-label={`${timeDisplay} remaining`}
          >
            {timeDisplay}
          </span>
        </div>

        {/* Pulse animation when active */}
        {isActive && (
          <div 
            className={`absolute inset-0 rounded-full animate-pulse ${styles.container}`}
            style={{
              background: 'radial-gradient(circle, rgba(247, 119, 44, 0.1) 0%, transparent 70%)'
            }}
          />
        )}
      </div>
    </div>
  )
}