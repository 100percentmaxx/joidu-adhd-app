import React from 'react'
import QuietHoursTimePicker from './TimePicker'
import DaySelector from './DaySelector'

interface BedtimeScheduleProps {
  startTime: string
  endTime: string
  activeDays: boolean[]
  onStartTimeChange: (time: string) => void
  onEndTimeChange: (time: string) => void
  onActiveDaysChange: (days: boolean[]) => void
}

export default function BedtimeSchedule({ 
  startTime, 
  endTime, 
  activeDays,
  onStartTimeChange, 
  onEndTimeChange,
  onActiveDaysChange 
}: BedtimeScheduleProps) {
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
        Bedtime Quiet Hours
      </h3>
      
      <p style={{
        color: '#a5a5a5',
        fontSize: '14px',
        fontWeight: 400,
        margin: 0,
        marginBottom: '20px'
      }}>
        No notifications during sleep time.
      </p>

      {/* Time Selection Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '20px',
        justifyContent: 'center'
      }}>
        <QuietHoursTimePicker
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
        
        <QuietHoursTimePicker
          value={endTime}
          onChange={onEndTimeChange}
        />
      </div>

      {/* Active Days Selection */}
      <DaySelector
        activeDays={activeDays}
        onChange={onActiveDaysChange}
      />
    </div>
  )
}