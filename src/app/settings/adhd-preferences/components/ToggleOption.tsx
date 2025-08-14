import React from 'react'

interface ToggleOptionProps {
  title: string
  subtitle: string
  value: boolean
  onChange: (value: boolean) => void
  spacing?: number
}

export default function ToggleOption({ 
  title, 
  subtitle, 
  value, 
  onChange, 
  spacing = 24 
}: ToggleOptionProps) {
  const handleToggle = () => {
    onChange(!value)
  }

  return (
    <div 
      style={{
        backgroundColor: '#FFFFFF',
        border: '2px solid #e2e2e2',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: `${spacing}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
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
      {/* Text Content */}
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
          margin: 0,
          lineHeight: '1.4'
        }}>
          {subtitle}
        </p>
      </div>

      {/* Toggle Switch */}
      <div 
        onClick={handleToggle}
        style={{
          width: '48px',
          height: '28px',
          backgroundColor: value ? '#2847ef' : '#e2e2e2',
          borderRadius: '14px',
          position: 'relative',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease',
          flexShrink: 0
        }}
        role="switch"
        aria-checked={value}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault()
            handleToggle()
          }
        }}
      >
        <div
          style={{
            width: '24px',
            height: '24px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            position: 'absolute',
            top: '2px',
            left: value ? '22px' : '2px',
            transition: 'left 0.2s ease',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        />
      </div>
    </div>
  )
}