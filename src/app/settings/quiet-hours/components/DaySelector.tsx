import React from 'react'

interface DaySelectorProps {
  activeDays: boolean[] // Array of 7 booleans, Sunday = index 0
  onChange: (activeDays: boolean[]) => void
}

export default function DaySelector({ activeDays, onChange }: DaySelectorProps) {
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const toggleDay = (index: number) => {
    const newActiveDays = [...activeDays]
    newActiveDays[index] = !newActiveDays[index]
    onChange(newActiveDays)
  }

  return (
    <div>
      <h3 style={{
        color: '#4c4c4c',
        fontSize: '16px',
        fontWeight: 500,
        margin: 0,
        marginBottom: '4px'
      }}>
        Active Days
      </h3>
      
      <p style={{
        color: '#a5a5a5',
        fontSize: '14px',
        fontWeight: 400,
        margin: 0,
        marginBottom: '16px'
      }}>
        Which days to apply bedtime quiet hours?
      </p>

      <div style={{
        display: 'flex',
        gap: '4px',
        justifyContent: 'center'
      }}>
        {dayLabels.map((day, index) => {
          const isActive = activeDays[index]
          
          return (
            <button
              key={day}
              onClick={() => toggleDay(index)}
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: isActive ? '#cae9ef' : '#FFFFFF',
                border: isActive ? '2px solid #2847ef' : '2px solid #e2e2e2',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = '#2847ef'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = '#e2e2e2'
                  e.currentTarget.style.transform = 'translateY(0px)'
                }
              }}
            >
              <span style={{
                color: '#4c4c4c',
                fontSize: '14px',
                fontWeight: 500
              }}>
                {day}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}