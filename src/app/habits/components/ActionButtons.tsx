'use client'

import React from 'react'

interface ActionButtonsProps {
  onSkip: () => void
  onReset: () => void
  onEdit: () => void
}

export default function ActionButtons({ onSkip, onReset, onEdit }: ActionButtonsProps) {
  const buttonStyle = (backgroundColor: string) => ({
    backgroundColor,
    color: '#FFFFFF',
    fontSize: '12px',
    fontWeight: 500,
    height: '24px',
    width: '48px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer'
  })

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      justifyContent: 'flex-end'
    }}>
      <button
        onClick={onSkip}
        style={buttonStyle('#98e1ea')}
      >
        Skip
      </button>
      <button
        onClick={onReset}
        style={buttonStyle('#f9c075')}
      >
        Reset
      </button>
      <button
        onClick={onEdit}
        style={buttonStyle('#a5a5a5')}
      >
        Edit
      </button>
    </div>
  )
}