'use client'

import React from 'react'

interface ProgressBarProps {
  completed: number
  total: number
  color?: string
}

export default function ProgressBar({ completed, total, color = '#fa772c' }: ProgressBarProps) {
  const percentage = total > 0 ? (completed / total) * 100 : 0

  return (
    <div style={{
      width: '100%',
      height: '8px',
      backgroundColor: '#e2e2e2',
      borderRadius: '4px',
      overflow: 'hidden',
      marginBottom: '8px'
    }}>
      <div style={{
        width: `${percentage}%`,
        height: '100%',
        backgroundColor: color,
        borderRadius: '4px',
        transition: 'width 0.3s ease'
      }} />
    </div>
  )
}