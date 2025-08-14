import React from 'react'

interface InterruptionSensitivityProps {
  value: 'low' | 'medium' | 'high'
  onChange: (value: 'low' | 'medium' | 'high') => void
}

export default function InterruptionSensitivity({ value, onChange }: InterruptionSensitivityProps) {
  const options = [
    { 
      key: 'low' as const, 
      label: 'Low', 
      color: '#a8e2bb' 
    },
    { 
      key: 'medium' as const, 
      label: 'Medium', 
      color: '#f7e98e' 
    },
    { 
      key: 'high' as const, 
      label: 'High', 
      color: '#f4b7ae' 
    }
  ]

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      border: '2px solid #e2e2e2',
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '8px'
    }}>
      <h3 style={{
        color: '#4c4c4c',
        fontSize: '16px',
        fontWeight: 500,
        margin: 0,
        marginBottom: '4px'
      }}>
        Interruption Sensitivity
      </h3>
      
      <p style={{
        color: '#a5a5a5',
        fontSize: '14px',
        fontWeight: 400,
        margin: 0,
        marginBottom: '16px'
      }}>
        How sensitive are you to distractions and interruptions?
      </p>

      {/* Options Row */}
      <div style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'center'
      }}>
        {options.map((option) => {
          const isSelected = value === option.key
          
          return (
            <button
              key={option.key}
              onClick={() => onChange(option.key)}
              style={{
                width: '100px',
                backgroundColor: isSelected ? '#cae9ef' : '#FFFFFF',
                border: isSelected ? '2px solid #2847ef' : '2px solid #e2e2e2',
                borderRadius: '8px',
                padding: '16px 8px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = '#2847ef'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = '#e2e2e2'
                  e.currentTarget.style.transform = 'translateY(0px)'
                }
              }}
            >
              {/* Color Circle */}
              <div style={{
                width: '20px',
                height: '20px',
                backgroundColor: option.color,
                borderRadius: '50%',
                border: '1px solid #a5a5a5'
              }} />
              
              {/* Label */}
              <span style={{
                color: '#4c4c4c',
                fontSize: '14px',
                fontWeight: 500
              }}>
                {option.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}