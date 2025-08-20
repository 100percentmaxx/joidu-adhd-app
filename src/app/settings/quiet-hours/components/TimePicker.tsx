import React from 'react'
import TimePicker from '@/components/ui/TimePicker'

interface TimePickerProps {
  value: string // Format: "HH:MM" (24-hour)
  onChange: (time: string) => void
}

export default function QuietHoursTimePicker({ value, onChange }: TimePickerProps) {
  // Convert 24-hour format to 12-hour format for the new TimePicker
  const formatTimeFor12Hour = (time24: string) => {
    const [hours, minutes] = time24.split(':').map(Number)
    const period = hours >= 12 ? 'PM' : 'AM'
    const hours12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`
  }

  // Convert 12-hour format back to 24-hour format
  const parseTimeFrom12Hour = (time12: string) => {
    const match = time12.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
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

  const handleTimeChange = (time12: string) => {
    const time24 = parseTimeFrom12Hour(time12)
    onChange(time24)
  }

  return (
    <div style={{ width: '120px' }}>
      <TimePicker
        value={formatTimeFor12Hour(value)}
        onChange={handleTimeChange}
        placeholder="12:00 PM"
      />
    </div>
  )
}