'use client'

import React from 'react'

interface OptionButtonsProps {
  onTryNext: () => void
  onChatWithKai: () => void
  onSkipIt: () => void
}

export default function OptionButtons({ onTryNext, onChatWithKai, onSkipIt }: OptionButtonsProps) {
  const actionButtonStyle = {
    backgroundColor: '#2847ef',
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: 600,
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    width: '120px',
    position: 'relative' as const
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Try Something Else Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ color: '#4c4c4c', fontSize: '16px', fontWeight: 400 }}>
          Try something else
        </div>
        <button
          onClick={onTryNext}
          className="transition-all duration-200 hover:scale-105"
          style={actionButtonStyle}
        >
          <img 
            src="/icons/next_blue-white.svg" 
            alt=""
            style={{ 
              width: '20px', 
              height: '20px', 
              position: 'absolute', 
              left: '12px' 
            }}
          />
          <span style={{ 
            flex: 1, 
            textAlign: 'center',
            marginLeft: '20px'
          }}>
            Next
          </span>
        </button>
      </div>

      {/* Chat with Kai Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ color: '#4c4c4c', fontSize: '16px', fontWeight: 400 }}>
          Chat with Kai
        </div>
        <button
          onClick={onChatWithKai}
          className="transition-all duration-200 hover:scale-105"
          style={actionButtonStyle}
        >
          <img 
            src="/icons/twinkle_white.svg" 
            alt=""
            style={{ 
              width: '20px', 
              height: '20px', 
              position: 'absolute', 
              left: '12px' 
            }}
          />
          <span style={{ 
            flex: 1, 
            textAlign: 'center',
            marginLeft: '20px'
          }}>
            KaiHelp
          </span>
        </button>
      </div>

      {/* Skip It Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ color: '#4c4c4c', fontSize: '16px', fontWeight: 400 }}>
          Skip it
        </div>
        <button
          onClick={onSkipIt}
          className="transition-all duration-200 hover:scale-105"
          style={actionButtonStyle}
        >
          <img 
            src="/icons/home_blue-white.svg" 
            alt=""
            style={{ 
              width: '20px', 
              height: '20px', 
              position: 'absolute', 
              left: '12px' 
            }}
          />
          <span style={{ 
            flex: 1, 
            textAlign: 'center',
            marginLeft: '20px'
          }}>
            Home
          </span>
        </button>
      </div>
    </div>
  )
}