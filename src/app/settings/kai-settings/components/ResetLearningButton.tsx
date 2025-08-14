import React from 'react'

interface ResetLearningButtonProps {
  onReset: () => void
}

export default function ResetLearningButton({ onReset }: ResetLearningButtonProps) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '40px'
    }}>
      <button
        onClick={onReset}
        style={{
          width: '180px',
          height: '48px',
          backgroundColor: '#2847ef',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#1e3acf'
          e.currentTarget.style.transform = 'scale(1.05)'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#2847ef'
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        <span style={{
          color: '#FFFFFF',
          fontSize: '16px',
          fontWeight: 500
        }}>
          Reset Kai's Learning
        </span>
      </button>
    </div>
  )
}