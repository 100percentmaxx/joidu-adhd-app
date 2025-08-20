'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Clock } from 'lucide-react'

interface TimePickerProps {
  value: string // Format: "10:00 AM"
  onChange: (time: string) => void
  placeholder?: string
  disabled?: boolean
}

interface TimeComponents {
  hour: number
  minute: number
  period: 'AM' | 'PM'
}

export default function TimePicker({ value, onChange, placeholder = "Select time", disabled = false }: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [timeComponents, setTimeComponents] = useState<TimeComponents>({ hour: 10, minute: 0, period: 'AM' })
  const modalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLButtonElement>(null)

  // Parse the current value into components
  useEffect(() => {
    if (value) {
      const parsed = parseTime(value)
      if (parsed) {
        setTimeComponents(parsed)
      }
    }
  }, [value])

  // Parse time string like "10:00 AM" into components
  const parseTime = (timeStr: string): TimeComponents | null => {
    try {
      const [time, period] = timeStr.split(' ')
      const [hours, minutes] = time.split(':').map(Number)
      
      if (hours >= 1 && hours <= 12 && minutes >= 0 && minutes <= 59 && (period === 'AM' || period === 'PM')) {
        return { hour: hours, minute: minutes, period: period as 'AM' | 'PM' }
      }
    } catch {
      // Invalid format
    }
    return null
  }

  // Format components back to string
  const formatTime = (components: TimeComponents): string => {
    const hourStr = components.hour.toString()
    const minuteStr = components.minute.toString().padStart(2, '0')
    return `${hourStr}:${minuteStr} ${components.period}`
  }

  // Handle component changes
  const updateTime = (newComponents: Partial<TimeComponents>) => {
    const updated = { ...timeComponents, ...newComponents }
    setTimeComponents(updated)
    onChange(formatTime(updated))
  }

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node) && 
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  // Generate hour options (1-12)
  const hourOptions = Array.from({ length: 12 }, (_, i) => i + 1)
  
  // Generate minute options (00, 05, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55)
  const minuteOptions = Array.from({ length: 12 }, (_, i) => i * 5)

  const renderScrollableColumn = (
    options: number[],
    selectedValue: number,
    onSelect: (value: number) => void,
    formatFn: (value: number) => string = (v) => v.toString()
  ) => {
    return (
      <div style={{
        height: '200px',
        overflowY: 'auto',
        borderRight: '1px solid #e2e2e2',
        padding: '8px 0'
      }}>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            style={{
              width: '100%',
              padding: '12px 16px',
              backgroundColor: selectedValue === option ? 'var(--primary-blue)' : 'transparent',
              color: selectedValue === option ? 'white' : '#4c4c4c',
              border: 'none',
              fontSize: '15px',
              fontWeight: '400',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              if (selectedValue !== option) {
                e.currentTarget.style.backgroundColor = '#f5f5f5'
              }
            }}
            onMouseLeave={(e) => {
              if (selectedValue !== option) {
                e.currentTarget.style.backgroundColor = 'transparent'
              }
            }}
          >
            {formatFn(option)}
          </button>
        ))}
      </div>
    )
  }

  const renderPeriodColumn = () => {
    const periods: ('AM' | 'PM')[] = ['AM', 'PM']
    
    return (
      <div style={{
        height: '200px',
        padding: '8px 0'
      }}>
        {periods.map((period) => (
          <button
            key={period}
            onClick={() => updateTime({ period })}
            style={{
              width: '100%',
              padding: '12px 16px',
              backgroundColor: timeComponents.period === period ? 'var(--primary-blue)' : 'transparent',
              color: timeComponents.period === period ? 'white' : '#4c4c4c',
              border: 'none',
              fontSize: '15px',
              fontWeight: '400',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              if (timeComponents.period !== period) {
                e.currentTarget.style.backgroundColor = '#f5f5f5'
              }
            }}
            onMouseLeave={(e) => {
              if (timeComponents.period !== period) {
                e.currentTarget.style.backgroundColor = 'transparent'
              }
            }}
          >
            {period}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Time Input Button */}
      <button
        ref={inputRef}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        style={{
          width: '100%',
          backgroundColor: '#FFFFFF',
          border: '1px solid #e2e2e2',
          borderRadius: '12px',
          padding: '12px 16px',
          fontSize: '15px',
          fontWeight: '400',
          color: value ? '#4c4c4c' : '#a5a5a5',
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          outline: 'none',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.borderColor = 'var(--primary-blue)'
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.currentTarget.style.borderColor = '#e2e2e2'
          }
        }}
      >
        <span>{value || placeholder}</span>
        <Clock style={{ width: '16px', height: '16px', color: '#a5a5a5' }} />
      </button>

      {/* Time Picker Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: 999
            }}
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div
            ref={modalRef}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #e2e2e2',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
              zIndex: 1000,
              width: '320px',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px',
              borderBottom: '1px solid #e2e2e2',
              textAlign: 'center'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '17px',
                fontWeight: '600',
                color: '#4c4c4c'
              }}>
                Select Time
              </h3>
            </div>

            {/* Time Picker Content */}
            <div style={{
              display: 'flex',
              height: '200px'
            }}>
              {/* Hours Column */}
              <div style={{ flex: 1 }}>
                <div style={{
                  padding: '8px',
                  backgroundColor: '#f8f9fa',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#6c757d',
                  borderBottom: '1px solid #e2e2e2'
                }}>
                  Hour
                </div>
                {renderScrollableColumn(
                  hourOptions,
                  timeComponents.hour,
                  (hour) => updateTime({ hour })
                )}
              </div>

              {/* Minutes Column */}
              <div style={{ flex: 1 }}>
                <div style={{
                  padding: '8px',
                  backgroundColor: '#f8f9fa',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#6c757d',
                  borderBottom: '1px solid #e2e2e2'
                }}>
                  Min
                </div>
                {renderScrollableColumn(
                  minuteOptions,
                  timeComponents.minute,
                  (minute) => updateTime({ minute }),
                  (m) => m.toString().padStart(2, '0')
                )}
              </div>

              {/* AM/PM Column */}
              <div style={{ flex: 0.7 }}>
                <div style={{
                  padding: '8px',
                  backgroundColor: '#f8f9fa',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#6c757d',
                  borderBottom: '1px solid #e2e2e2'
                }}>
                  AM/PM
                </div>
                {renderPeriodColumn()}
              </div>
            </div>

            {/* Footer */}
            <div style={{
              padding: '16px',
              borderTop: '1px solid #e2e2e2',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px'
            }}>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  border: '1px solid #e2e2e2',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#6c757d',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'var(--primary-blue)',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Done
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}