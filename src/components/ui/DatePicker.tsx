'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Calendar } from 'lucide-react'

interface DatePickerProps {
  value: string // Format: "Wednesday, 2 July" or "Today" or "Tomorrow"
  onChange: (date: string) => void
  placeholder?: string
  disabled?: boolean
}

interface DateComponents {
  day: number
  month: number
  year: number
}

export default function DatePicker({ value, onChange, placeholder = "Select date", disabled = false }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [dateComponents, setDateComponents] = useState<DateComponents>({ 
    day: new Date().getDate(), 
    month: new Date().getMonth(), 
    year: new Date().getFullYear() 
  })
  const modalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLButtonElement>(null)

  // Month names for display
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  // Day names for display
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  // Parse the current value into components
  useEffect(() => {
    if (value) {
      const parsed = parseDate(value)
      if (parsed) {
        setDateComponents(parsed)
      }
    }
  }, [value])

  // Parse date string into components
  const parseDate = (dateStr: string): DateComponents | null => {
    const today = new Date()
    const currentYear = today.getFullYear()
    
    try {
      if (dateStr.includes('Today')) {
        return {
          day: today.getDate(),
          month: today.getMonth(),
          year: today.getFullYear()
        }
      }
      
      if (dateStr.includes('Tomorrow')) {
        const tomorrow = new Date(today)
        tomorrow.setDate(today.getDate() + 1)
        return {
          day: tomorrow.getDate(),
          month: tomorrow.getMonth(),
          year: tomorrow.getFullYear()
        }
      }

      // Try to parse formats like "Wednesday, 2 July"
      const monthMatch = dateStr.match(new RegExp(`(${monthNames.join('|')})`, 'i'))
      const dayMatch = dateStr.match(/(\d{1,2})/)
      
      if (monthMatch && dayMatch) {
        const monthIndex = monthNames.findIndex(m => m.toLowerCase() === monthMatch[1].toLowerCase())
        const day = parseInt(dayMatch[1])
        
        if (monthIndex !== -1 && day >= 1 && day <= 31) {
          return {
            day,
            month: monthIndex,
            year: currentYear
          }
        }
      }
    } catch {
      // Parsing failed
    }
    
    return null
  }

  // Format components back to display string
  const formatDate = (components: DateComponents): string => {
    const date = new Date(components.year, components.month, components.day)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    
    // Reset time parts for comparison
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const tomorrowOnly = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate())
    
    if (dateOnly.getTime() === todayOnly.getTime()) {
      return 'Today'
    } else if (dateOnly.getTime() === tomorrowOnly.getTime()) {
      return 'Tomorrow'
    } else {
      const dayName = dayNames[date.getDay()]
      const monthName = monthNames[date.getMonth()]
      return `${dayName}, ${date.getDate()} ${monthName}`
    }
  }

  // Handle component changes
  const updateDate = (newComponents: Partial<DateComponents>) => {
    const updated = { ...dateComponents, ...newComponents }
    
    // Validate the date exists
    const testDate = new Date(updated.year, updated.month, updated.day)
    if (testDate.getMonth() === updated.month && testDate.getDate() === updated.day) {
      setDateComponents(updated)
      onChange(formatDate(updated))
    }
  }

  // Get days in month
  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate()
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

  // Generate year options (current year ± 2)
  const currentYear = new Date().getFullYear()
  const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i)

  // Generate day options based on selected month/year
  const dayOptions = Array.from({ length: getDaysInMonth(dateComponents.month, dateComponents.year) }, (_, i) => i + 1)

  const renderScrollableColumn = (
    options: (number | string)[],
    selectedValue: number | string,
    onSelect: (value: any) => void,
    formatFn: (value: any) => string = (v) => v.toString()
  ) => {
    return (
      <div style={{
        height: '200px',
        overflowY: 'auto',
        borderRight: '1px solid #e2e2e2',
        padding: '8px 0'
      }}>
        {options.map((option, index) => (
          <button
            key={index}
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

  return (
    <div style={{ position: 'relative' }}>
      {/* Date Input Button */}
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
        <Calendar style={{ width: '16px', height: '16px', color: '#a5a5a5' }} />
      </button>

      {/* Date Picker Modal */}
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
                Select Date
              </h3>
            </div>

            {/* Date Picker Content */}
            <div style={{
              display: 'flex',
              height: '200px'
            }}>
              {/* Day Column */}
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
                  Day
                </div>
                {renderScrollableColumn(
                  dayOptions,
                  dateComponents.day,
                  (day) => updateDate({ day })
                )}
              </div>

              {/* Month Column */}
              <div style={{ flex: 1.5 }}>
                <div style={{
                  padding: '8px',
                  backgroundColor: '#f8f9fa',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#6c757d',
                  borderBottom: '1px solid #e2e2e2'
                }}>
                  Month
                </div>
                {renderScrollableColumn(
                  monthNames.map((_, i) => i),
                  dateComponents.month,
                  (month) => updateDate({ month }),
                  (m) => monthNames[m]
                )}
              </div>

              {/* Year Column */}
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
                  Year
                </div>
                {renderScrollableColumn(
                  yearOptions,
                  dateComponents.year,
                  (year) => updateDate({ year })
                )}
              </div>
            </div>

            {/* Quick Selection Row */}
            <div style={{
              padding: '12px 16px',
              borderTop: '1px solid #e2e2e2',
              borderBottom: '1px solid #e2e2e2',
              display: 'flex',
              gap: '8px',
              justifyContent: 'center'
            }}>
              <button
                onClick={() => {
                  const today = new Date()
                  const components = {
                    day: today.getDate(),
                    month: today.getMonth(),
                    year: today.getFullYear()
                  }
                  setDateComponents(components)
                  onChange(formatDate(components))
                }}
                style={{
                  padding: '6px 12px',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--primary-blue)',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: 'var(--primary-blue)',
                  cursor: 'pointer'
                }}
              >
                Today
              </button>
              <button
                onClick={() => {
                  const tomorrow = new Date()
                  tomorrow.setDate(tomorrow.getDate() + 1)
                  const components = {
                    day: tomorrow.getDate(),
                    month: tomorrow.getMonth(),
                    year: tomorrow.getFullYear()
                  }
                  setDateComponents(components)
                  onChange(formatDate(components))
                }}
                style={{
                  padding: '6px 12px',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--primary-blue)',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: 'var(--primary-blue)',
                  cursor: 'pointer'
                }}
              >
                Tomorrow
              </button>
            </div>

            {/* Footer */}
            <div style={{
              padding: '16px',
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