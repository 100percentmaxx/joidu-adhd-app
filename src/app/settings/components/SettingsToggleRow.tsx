import React from 'react'

interface SettingsToggleRowProps {
  icon: React.ReactNode
  title: string
  subtext: string
  toggleValue: boolean
  onToggleChange: (value: boolean) => void
}

export default function SettingsToggleRow({
  icon,
  title,
  subtext,
  toggleValue,
  onToggleChange
}: SettingsToggleRowProps) {
  const handleToggle = () => {
    onToggleChange(!toggleValue)
  }

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        border: '2px solid #e2e2e2',
        borderRadius: '16px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        minHeight: '56px'
      }}
    >
      {/* Icon */}
      <div className="flex items-center justify-center mr-3">
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 text-left">
        <h3 style={{
          color: '#4c4c4c',
          fontSize: '16px',
          fontWeight: 600,
          marginBottom: '2px',
          margin: 0
        }}>
          {title}
        </h3>
        <p style={{
          color: '#e2e2e2',
          fontSize: '14px',
          fontWeight: 400,
          margin: 0
        }}>
          {subtext}
        </p>
      </div>

      {/* Toggle Switch */}
      <div 
        onClick={handleToggle}
        style={{
          width: '48px',
          height: '28px',
          backgroundColor: toggleValue ? '#2847ef' : '#e2e2e2',
          borderRadius: '14px',
          position: 'relative',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease'
        }}
        role="switch"
        aria-checked={toggleValue}
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
            left: toggleValue ? '22px' : '2px',
            transition: 'left 0.2s ease',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        />
      </div>
    </div>
  )
}