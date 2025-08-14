'use client'

import React from 'react'

interface LoadingIconProps {
  size?: number
  enableAnimation?: boolean
}

export default function LoadingIcon({ size = 80, enableAnimation = true }: LoadingIconProps) {
  const pulseKeyframes = `
    @keyframes gentlePulse {
      0%, 100% { 
        transform: scale(1);
        opacity: 0.8;
      }
      50% { 
        transform: scale(1.05);
        opacity: 1;
      }
    }
  `

  return (
    <>
      <style jsx>{pulseKeyframes}</style>
      <div 
        style={{ 
          position: 'relative', 
          width: `${size}px`, 
          height: `${size}px`,
          animation: enableAnimation ? 'gentlePulse 2s ease-in-out infinite' : 'none'
        }}
      >
        {/* SVG Target Icon */}
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Outer ring - Light Purple */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 4}
            fill="none"
            stroke="#c8bfef"
            strokeWidth="4"
            style={{
              animation: enableAnimation ? 'gentlePulse 3s ease-in-out infinite' : 'none'
            }}
          />
          {/* Middle ring - Light Coral */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={(size * 0.75) / 2}
            fill="none"
            stroke="#f4b7ae"
            strokeWidth="4"
            style={{
              animation: enableAnimation ? 'gentlePulse 2.5s ease-in-out infinite 0.2s' : 'none'
            }}
          />
          {/* Center circle - Light Green */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={(size * 0.5) / 2}
            fill="#a8e2bb"
            style={{
              animation: enableAnimation ? 'gentlePulse 2s ease-in-out infinite 0.4s' : 'none'
            }}
          />
        </svg>
      </div>
    </>
  )
}