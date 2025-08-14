import React from 'react'

interface EncouragementLevelSelectorProps {
  value: 'light' | 'moderate' | 'strong'
  onChange: (value: 'light' | 'moderate' | 'strong') => void
}

export default function EncouragementLevelSelector({ value, onChange }: EncouragementLevelSelectorProps) {
  const options = [
    { 
      key: 'light' as const, 
      label: 'Light', 
      icon: '/icons/light.svg'
    },
    { 
      key: 'moderate' as const, 
      label: 'Moderate', 
      icon: '/icons/moderate.svg'
    },
    { 
      key: 'strong' as const, 
      label: 'Strong', 
      icon: '/icons/strong.svg'
    }
  ]

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      border: '2px solid #e2e2e2',
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '24px'
    }}>
      <h3 style={{
        color: '#4c4c4c',
        fontSize: '16px',
        fontWeight: 500,
        margin: 0,
        marginBottom: '4px'
      }}>
        Encouragement Level
      </h3>
      
      <p style={{
        color: '#a5a5a5',
        fontSize: '14px',
        fontWeight: 400,
        margin: 0,
        marginBottom: '18px'
      }}>
        Amount of motivational support.
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
                height: '80px',
                backgroundColor: isSelected ? '#cae9ef' : '#FFFFFF',
                border: isSelected ? '2px solid #2847ef' : '2px solid #e2e2e2',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
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
              {/* Icon */}
              <img 
                src={option.icon} 
                alt={option.label} 
                style={{ width: '48px', height: '48px' }} 
              />
              
              {/* Label */}
              <span style={{
                color: '#4c4c4c',
                fontSize: '12px',
                fontWeight: 500,
                textAlign: 'center'
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