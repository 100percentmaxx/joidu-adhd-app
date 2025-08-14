'use client'

import React from 'react'

interface KaiRecommendationProps {
  title?: string
  text: string
  variant?: 'default' | 'compact'
}

export default function KaiRecommendation({ 
  title = "Kai's Recommendation", 
  text,
  variant = 'default'
}: KaiRecommendationProps) {
  const isCompact = variant === 'compact'
  
  return (
    <div 
      className="flex items-start"
      style={{
        backgroundColor: isCompact ? '#f5f5f5' : '#f0f8ff',
        borderRadius: '12px',
        border: '2px solid #2847ef', // Dark Blue 2px stroke
        padding: '16px',
        marginBottom: '16px',
        gap: '12px'
      }}
    >
      {/* Kai avatar using kai.svg (fallback to existing icon) */}
      <div 
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: '24px',
          height: '24px'
        }}
      >
        <img 
          src="/icons/kai.svg" 
          alt="Kai"
          style={{ width: '24px', height: '24px' }}
          onError={(e) => {
            // Fallback to sparkle if kai.svg doesn't exist
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.innerHTML = '<span style="color: white; fontSize: 12px; fontWeight: bold; backgroundColor: #2847ef; width: 24px; height: 24px; borderRadius: 50%; display: flex; alignItems: center; justifyContent: center;">✨</span>';
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* Title */}
        <h4 style={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#2847ef',
          marginBottom: '8px',
          margin: 0
        }}>
          {title}
        </h4>
        
        {/* Text content */}
        <p style={{
          fontSize: '14px',
          color: '#4c4c4c',
          lineHeight: '1.4',
          margin: 0
        }}>
          {text}
        </p>
      </div>
    </div>
  )
}