import React from 'react'

interface ToggleOptionProps {
  title: string
  subtitle: string
  value: boolean
  onChange: (value: boolean) => void
  spacing?: number
}

export default function ToggleOption({ title, subtitle, value, onChange, spacing = 8 }: ToggleOptionProps) {
  return (
    <div 
      style={{
        backgroundColor: '#FFFFFF',
        border: '2px solid #e2e2e2',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: `${spacing}px`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#2847ef'
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#e2e2e2'
        e.currentTarget.style.transform = 'translateY(0px)'
      }}
    >
      <div style={{ flex: 1, marginRight: '16px' }}>
        <h3 style={{
          color: '#4c4c4c',
          fontSize: '16px',
          fontWeight: 500,
          margin: 0,
          marginBottom: '4px'
        }}>
          {title}
        </h3>
        <p style={{
          color: '#a5a5a5',
          fontSize: '14px',
          fontWeight: 400,
          margin: 0
        }}>
          {subtitle}
        </p>
      </div>
      
      <button
        onClick={() => onChange(!value)}
        style={{
          width: '44px',
          height: '24px',
          backgroundColor: value ? '#2847ef' : '#e2e2e2',
          borderRadius: '12px',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          transition: 'background-color 0.2s ease',
          flexShrink: 0
        }}
      >
        <div style={{
          width: '20px',
          height: '20px',
          backgroundColor: '#FFFFFF',
          borderRadius: '50%',
          position: 'absolute',
          top: '2px',
          left: value ? '22px' : '2px',
          transition: 'left 0.2s ease'
        }} />
      </button>
    </div>
  )
}