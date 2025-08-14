import React from 'react'
import TimePicker from './TimePicker'

interface DeepWorkHoursProps {
  startTime: string
  endTime: string
  onStartTimeChange: (time: string) => void
  onEndTimeChange: (time: string) => void
}

export default function DeepWorkHours({ 
  startTime, 
  endTime, 
  onStartTimeChange, 
  onEndTimeChange 
}: DeepWorkHoursProps) {
  return (
    <div 
      style={{
        backgroundColor: '#FFFFFF',
        border: '2px solid #e2e2e2',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '32px',
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
      <h3 style={{
        color: '#4c4c4c',
        fontSize: '16px',
        fontWeight: 500,
        margin: 0,
        marginBottom: '4px'
      }}>
        Deep Work Hours
      </h3>
      
      <p style={{
        color: '#a5a5a5',
        fontSize: '14px',
        fontWeight: 400,
        margin: 0,
        marginBottom: '20px'
      }}>
        Minimal interruptions during focused work.
      </p>

      {/* Time Selection Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        justifyContent: 'center'
      }}>
        <TimePicker
          value={startTime}
          onChange={onStartTimeChange}
        />
        
        <span style={{
          color: '#4c4c4c',
          fontSize: '16px',
          fontWeight: 400
        }}>
          to
        </span>
        
        <TimePicker
          value={endTime}
          onChange={onEndTimeChange}
        />
      </div>
    </div>
  )
}