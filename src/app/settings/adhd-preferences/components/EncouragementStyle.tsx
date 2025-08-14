import React from 'react'

interface EncouragementStyleProps {
  value: 'gentle' | 'direct' | 'funny'
  onChange: (value: 'gentle' | 'direct' | 'funny') => void
  mixUpValue: boolean
  onMixUpChange: (value: boolean) => void
}

export default function EncouragementStyle({ value, onChange, mixUpValue, onMixUpChange }: EncouragementStyleProps) {
  const options = [
    { 
      key: 'gentle' as const, 
      label: 'Gentle', 
      icon: '/icons/heart.svg'
    },
    { 
      key: 'direct' as const, 
      label: 'Direct', 
      icon: '/icons/arrow.svg'
    },
    { 
      key: 'funny' as const, 
      label: 'Funny', 
      icon: '/icons/laugh.svg'
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
        Encouragement Style
      </h3>
      
      <p style={{
        color: '#a5a5a5',
        fontSize: '14px',
        fontWeight: 400,
        margin: 0,
        marginBottom: '16px'
      }}>
        How would you like Kai to give you primary motivation?
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

      {/* Mix It Up Toggle - 24px below cards */}
      <div style={{ marginTop: '24px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div>
            <h3 style={{
              color: '#4c4c4c',
              fontSize: '16px',
              fontWeight: 500,
              margin: 0,
              marginBottom: '4px'
            }}>
              Mix It Up!
            </h3>
            <p style={{
              color: '#a5a5a5',
              fontSize: '14px',
              fontWeight: 400,
              margin: 0
            }}>
              Provide encouragement style based on task and mood.
            </p>
          </div>
          
          <button
            onClick={() => onMixUpChange(!mixUpValue)}
            style={{
              width: '44px',
              height: '24px',
              backgroundColor: mixUpValue ? '#2847ef' : '#e2e2e2',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background-color 0.2s ease'
            }}
          >
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: '#FFFFFF',
              borderRadius: '50%',
              position: 'absolute',
              top: '2px',
              left: mixUpValue ? '22px' : '2px',
              transition: 'left 0.2s ease'
            }} />
          </button>
        </div>
      </div>
    </div>
  )
}