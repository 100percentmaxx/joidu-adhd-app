import React from 'react'

interface TaskBreakdownPreferenceProps {
  value: 'simple' | 'detailed' | 'very-detailed'
  onChange: (value: 'simple' | 'detailed' | 'very-detailed') => void
}

export default function TaskBreakdownPreference({ value, onChange }: TaskBreakdownPreferenceProps) {
  const options = [
    { 
      key: 'simple' as const, 
      label: 'Simple', 
      icon: '/icons/concise.svg'
    },
    { 
      key: 'detailed' as const, 
      label: 'Detailed', 
      icon: '/icons/detailed.svg'
    },
    { 
      key: 'very-detailed' as const, 
      label: 'Very Detailed', 
      icon: '/icons/very-detailed.svg'
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
        Task Breakdown Preference
      </h3>
      
      <p style={{
        color: '#a5a5a5',
        fontSize: '14px',
        fontWeight: 400,
        margin: 0,
        marginBottom: '16px'
      }}>
        How detailed should Kai make task breakdowns?
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
              {/* Icon */}
              <img 
                src={option.icon} 
                alt={option.label} 
                style={{ width: '24px', height: '24px' }} 
              />
              
              {/* Label */}
              <span style={{
                color: '#4c4c4c',
                fontSize: '14px',
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