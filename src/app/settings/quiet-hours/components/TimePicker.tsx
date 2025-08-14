import React from 'react'
import { Clock } from 'lucide-react'

interface TimePickerProps {
  value: string // Format: "HH:MM" (24-hour)
  onChange: (time: string) => void
}

export default function TimePicker({ value, onChange }: TimePickerProps) {
  // Convert 24-hour format to 12-hour format for display
  const formatTimeForDisplay = (time24: string) => {
    const [hours, minutes] = time24.split(':').map(Number)
    const period = hours >= 12 ? 'PM' : 'AM'
    const hours12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`
  }

  // Convert 12-hour format back to 24-hour format
  const parseTimeInput = (timeString: string) => {
    const match = timeString.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
    if (!match) return value // Return original if parsing fails
    
    let [, hours, minutes, period] = match
    let hours24 = parseInt(hours)
    
    if (period.toUpperCase() === 'PM' && hours24 !== 12) {
      hours24 += 12
    } else if (period.toUpperCase() === 'AM' && hours24 === 12) {
      hours24 = 0
    }
    
    return `${hours24.toString().padStart(2, '0')}:${minutes}`
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseTimeInput(e.target.value)
    onChange(newTime)
  }

  return (
    <div style={{
      position: 'relative',
      display: 'inline-block'
    }}>
      <input
        type="text"
        value={formatTimeForDisplay(value)}
        onChange={handleTimeChange}
        placeholder="12:00 PM"
        style={{
          width: '112px',
          height: '44px',
          backgroundColor: '#FFFFFF',
          border: '2px solid #e2e2e2',
          borderRadius: '8px',
          padding: '0 8px 0 32px',
          fontSize: '14px',
          fontWeight: 500,
          color: '#4c4c4c',
          textAlign: 'center'
        }}
      />
      <Clock 
        className="w-4 h-4" 
        style={{ 
          position: 'absolute',
          left: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#a5a5a5',
          pointerEvents: 'none'
        }} 
      />
    </div>
  )
}