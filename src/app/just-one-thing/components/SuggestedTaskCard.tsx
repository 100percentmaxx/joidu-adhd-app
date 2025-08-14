'use client'

import React from 'react'

interface SuggestedTask {
  id: string
  title: string
  category: string
  categoryColor: string
  categoryIcon: string
  estimatedMinutes: number
  priority: 'low' | 'medium' | 'high'
}

interface SuggestedTaskCardProps {
  task: SuggestedTask
  onDoIt: () => void
}

export default function SuggestedTaskCard({ task, onDoIt }: SuggestedTaskCardProps) {
  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: '32px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
      {/* Category Icon Circle */}
      <div style={{
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: task.categoryColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <img 
          src={`/icons/${task.categoryIcon}`}
          alt={task.category}
          style={{ width: '12px', height: '12px' }}
        />
      </div>

      {/* Task Content */}
      <div style={{ flex: 1 }}>
        <p style={{
          fontSize: '16px',
          fontWeight: 500,
          color: '#4c4c4c',
          margin: '0 0 4px 0',
          lineHeight: '1.3'
        }}>
          {task.title}
        </p>
        <p style={{
          fontSize: '14px',
          fontWeight: 400,
          color: '#a5a5a5',
          margin: 0,
          lineHeight: '1.2'
        }}>
          Estimate {task.estimatedMinutes} min ⏱
        </p>
      </div>

      {/* Action Button */}
      <button
        onClick={onDoIt}
        className="transition-all duration-150 active:scale-95"
        style={{
          backgroundColor: '#2847ef',
          color: '#FFFFFF',
          fontSize: '14px',
          fontWeight: 500,
          height: '36px',
          paddingLeft: '16px',
          paddingRight: '16px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          flexShrink: 0
        }}
      >
        Do it!
      </button>
    </div>
  )
}