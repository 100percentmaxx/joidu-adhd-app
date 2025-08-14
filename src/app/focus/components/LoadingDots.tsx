'use client'

import React from 'react'

interface LoadingDotsProps {
  enableAnimation?: boolean
}

export default function LoadingDots({ enableAnimation = true }: LoadingDotsProps) {
  const dotAnimation = `
    @keyframes gentleFade {
      0%, 80%, 100% { 
        opacity: 0.3;
        transform: scale(1);
      }
      40% { 
        opacity: 1;
        transform: scale(1.1);
      }
    }
  `

  const dotStyle = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#fa772c', // Orange
    margin: '0 6px', // 12px spacing (6px each side)
  }

  const staticDotStyle = {
    ...dotStyle,
    backgroundColor: '#fa772c',
    opacity: 0.6
  }

  const animatedDotStyles = [
    {
      ...dotStyle,
      animation: enableAnimation ? 'gentleFade 1.5s ease-in-out infinite' : 'none',
    },
    {
      ...dotStyle,
      animation: enableAnimation ? 'gentleFade 1.5s ease-in-out infinite 0.2s' : 'none',
    },
    {
      ...dotStyle,
      animation: enableAnimation ? 'gentleFade 1.5s ease-in-out infinite 0.4s' : 'none',
    }
  ]

  return (
    <>
      <style jsx>{dotAnimation}</style>
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '20px' // Ensure consistent height
        }}
        role="progressbar"
        aria-label="Loading focus session"
      >
        {enableAnimation ? (
          animatedDotStyles.map((style, index) => (
            <div key={index} style={style} />
          ))
        ) : (
          // Static dots for reduced motion
          Array.from({ length: 3 }, (_, index) => (
            <div key={index} style={staticDotStyle} />
          ))
        )}
      </div>
    </>
  )
}