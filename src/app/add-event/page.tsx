'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import TimePicker from '@/components/ui/TimePicker'

// TypeScript interfaces for type safety
interface EventFormData {
  title: string
  category: Category
  date: string
  startTime: string
  endTime: string
  location: string
  notes: string
  setReminder: boolean
  addTravelBuffer: boolean
  createPrepTasks: boolean
}

type Category = 'work' | 'health' | 'personal' | 'social' | 'creative' | 'finance'

interface CategoryInfo {
  name: string
  color: string
  icon: string
}

export default function AddEvent() {
  const router = useRouter()
  
  // Form state management
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    category: 'work',
    date: '',
    startTime: '10:00 AM',
    endTime: '10:30 AM',
    location: '',
    notes: '',
    setReminder: true,
    addTravelBuffer: false,
    createPrepTasks: true
  })

  // AI suggestion state
  const [showAISuggestion, setShowAISuggestion] = useState(false)
  const [suggestedCategory, setSuggestedCategory] = useState<Category>('work')

  // Category configuration matching the app's design system
  const categoryData: Record<Category, CategoryInfo> = {
    work: { name: 'Work', color: 'var(--category-work-light)', icon: '/icons/work.svg' },
    health: { name: 'Health', color: 'var(--category-health-light)', icon: '/icons/health.svg' },
    personal: { name: 'Personal', color: 'var(--category-personal-light)', icon: '/icons/personal.svg' },
    social: { name: 'Social', color: 'var(--category-social-light)', icon: '/icons/social.svg' },
    creative: { name: 'Creative', color: 'var(--category-creative-light)', icon: '/icons/creative.svg' },
    finance: { name: 'Finance', color: 'var(--category-finance-light)', icon: '/icons/finance.svg' }
  }

  // Initialize date to today if not set
  useEffect(() => {
    if (!formData.date) {
      const today = new Date()
      const formattedDate = today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long' 
      })
      setFormData(prev => ({ ...prev, date: formattedDate }))
    }
  }, [formData.date])

  // Smart AI category detection based on title
  const detectCategoryFromTitle = (title: string) => {
    const lowerTitle = title.toLowerCase()
    
    // Simple keyword-based detection
    if (lowerTitle.includes('meeting') || lowerTitle.includes('work') || lowerTitle.includes('team')) {
      return 'work'
    }
    if (lowerTitle.includes('gym') || lowerTitle.includes('doctor') || lowerTitle.includes('health')) {
      return 'health'
    }
    if (lowerTitle.includes('coffee') || lowerTitle.includes('dinner') || lowerTitle.includes('social')) {
      return 'social'
    }
    if (lowerTitle.includes('bank') || lowerTitle.includes('finance') || lowerTitle.includes('budget')) {
      return 'finance'
    }
    if (lowerTitle.includes('art') || lowerTitle.includes('creative') || lowerTitle.includes('design')) {
      return 'creative'
    }
    
    return null
  }

  // Handle title change and trigger AI suggestion
  const handleTitleChange = (title: string) => {
    setFormData(prev => ({ ...prev, title }))
    
    // Show AI suggestion if category is detected and different from current
    const detected = detectCategoryFromTitle(title)
    if (detected && detected !== formData.category && title.length > 3) {
      setSuggestedCategory(detected)
      setShowAISuggestion(true)
    } else {
      setShowAISuggestion(false)
    }
  }

  // Accept AI suggestion
  const acceptAISuggestion = () => {
    setFormData(prev => ({ ...prev, category: suggestedCategory }))
    setShowAISuggestion(false)
  }

  // Calculate duration between start and end time
  const calculateDuration = () => {
    try {
      // Parse time strings (assumes format like "10:00 AM")
      const parseTime = (timeStr: string) => {
        const [time, period] = timeStr.split(' ')
        const [hours, minutes] = time.split(':').map(Number)
        let hour24 = hours
        
        if (period === 'PM' && hours !== 12) hour24 += 12
        if (period === 'AM' && hours === 12) hour24 = 0
        
        return hour24 * 60 + minutes // Return total minutes
      }
      
      const startMinutes = parseTime(formData.startTime)
      const endMinutes = parseTime(formData.endTime)
      
      let duration = endMinutes - startMinutes
      if (duration < 0) duration += 24 * 60 // Handle next day
      
      const hours = Math.floor(duration / 60)
      const mins = duration % 60
      
      if (hours === 0) return `${mins} minutes`
      if (mins === 0) return `${hours} hour${hours > 1 ? 's' : ''}`
      return `${hours} hour${hours > 1 ? 's' : ''} ${mins} minutes`
    } catch {
      return '30 minutes'
    }
  }

  // Handle form submission
  const handleSubmit = () => {
    // Basic validation
    if (!formData.title.trim()) {
      alert('Please enter an event title')
      return
    }
    
    if (!formData.date) {
      alert('Please select a date')
      return
    }

    // Create event object for storage
    const newEvent = {
      id: `event_${Date.now()}`, // Simple ID generation
      title: formData.title,
      startTime: formData.startTime,
      endTime: formData.endTime,
      date: formatDateForStorage(formData.date), // Convert to YYYY-MM-DD format
      category: formData.category,
      location: formData.location,
      notes: formData.notes,
      setReminder: formData.setReminder,
      addTravelBuffer: formData.addTravelBuffer,
      createPrepTasks: formData.createPrepTasks,
      createdAt: new Date().toISOString()
    }

    // Save to localStorage
    try {
      const existingEvents = JSON.parse(localStorage.getItem('joidu-events') || '[]')
      existingEvents.push(newEvent)
      localStorage.setItem('joidu-events', JSON.stringify(existingEvents))
      console.log('Event saved successfully:', newEvent)
    } catch (error) {
      console.error('Error saving event:', error)
      alert('Error saving event. Please try again.')
      return
    }
    
    // Navigate back to Schedule view
    router.push('/tasks?view=schedule')
  }

  // Helper function to convert date string to YYYY-MM-DD format
  const formatDateForStorage = (dateStr: string) => {
    try {
      // Handle format like "Wednesday, 2 July" or similar
      const today = new Date()
      const currentYear = today.getFullYear()
      
      // For now, let's assume it's the current year and parse the date
      // This is a simple implementation - in production you'd want more robust date parsing
      if (dateStr.includes('Today')) {
        return today.toISOString().split('T')[0]
      }
      if (dateStr.includes('Tomorrow')) {
        const tomorrow = new Date(today)
        tomorrow.setDate(today.getDate() + 1)
        return tomorrow.toISOString().split('T')[0]
      }
      
      // For dates like "Wednesday, 2 July", we'll need to parse and convert
      // For now, let's try to create a date and format it
      const parsedDate = new Date(`${dateStr} ${currentYear}`)
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toISOString().split('T')[0]
      }
      
      // Fallback to today if parsing fails
      return today.toISOString().split('T')[0]
    } catch {
      return new Date().toISOString().split('T')[0]
    }
  }

  // Render category pills
  const renderCategoryPills = () => {
    return (
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(categoryData).map(([key, info]) => {
          const isSelected = formData.category === key
          return (
            <button
              key={key}
              onClick={() => setFormData(prev => ({ ...prev, category: key as Category }))}
              className="flex items-center px-3 py-2 rounded-lg transition-all duration-200 relative"
              style={{
                backgroundColor: info.color,
                border: isSelected ? '2px solid var(--primary-blue)' : '2px solid transparent',
                minHeight: '44px'
              }}
            >
              <img 
                src={info.icon} 
                alt={info.name} 
                style={{ 
                  width: '28px', 
                  height: '28px', 
                  position: 'absolute',
                  left: '12px'
                }} 
              />
              <span 
                style={{ 
                  fontSize: '14px', 
                  fontWeight: '500',
                  color: 'white',
                  width: '100%',
                  textAlign: 'center',
                  marginLeft: '20px'
                }}
              >
                {info.name}
              </span>
            </button>
          )
        })}
      </div>
    )
  }

  // Render toggle switches
  const renderToggle = (enabled: boolean, onChange: (value: boolean) => void) => {
    return (
      <button
        onClick={() => onChange(!enabled)}
        className="relative"
        style={{
          width: '50px',
          height: '28px',
          backgroundColor: enabled ? 'var(--primary-blue)' : 'var(--border-color)',
          borderRadius: '14px',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '2px',
            left: enabled ? '24px' : '2px',
            width: '24px',
            height: '24px',
            backgroundColor: 'white',
            borderRadius: '50%',
            transition: 'all 0.3s ease'
          }}
        />
      </button>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <button 
          onClick={() => router.push('/tasks')} // Navigate back to Schedule
          className="flex items-center justify-center w-10 h-10"
        >
          <ArrowLeft className="w-6 h-6" style={{ color: 'var(--primary-blue)' }} />
        </button>
        <h1 style={{ 
          color: 'var(--primary-blue)', 
          fontSize: '17px', 
          fontWeight: 600 
        }}>
          Add Event
        </h1>
        <div style={{ width: '40px' }}></div> {/* Spacer for center alignment */}
      </div>

      {/* Form Content */}
      <div className="px-5 pb-6">
        {/* Event Title */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '15px', 
            fontWeight: '500', 
            color: 'var(--text-primary)', 
            marginBottom: '8px' 
          }}>
            Event Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Team meeting"
            style={{
              width: '100%',
              backgroundColor: 'var(--input-background)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '14px 16px',
              fontSize: '16px',
              color: 'var(--text-primary)',
              outline: 'none'
            }}
          />
        </div>

        {/* Kai Suggestion Box - Always visible as shown in mockup */}
        <div style={{
          backgroundColor: 'var(--info-light)',
          borderRadius: '12px',
          padding: '12px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/icons/kai.svg" 
              alt="Kai" 
              style={{ 
                width: '24px', 
                height: '24px', 
                marginRight: '12px' 
              }} 
            />
            <span style={{ 
              fontSize: '14px', 
              color: 'var(--text-primary)',
              flex: 1
            }}>
              {showAISuggestion 
                ? `This looks like a ${categoryData[suggestedCategory].name.toLowerCase()} item. Should I add this category?`
                : 'I can suggest a category when you enter your event title'
              }
            </span>
          </div>
          {showAISuggestion && (
            <button
              onClick={acceptAISuggestion}
              style={{
                backgroundColor: 'var(--primary-blue)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Accept
            </button>
          )}
        </div>

        {/* Category Selection */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '15px', 
            fontWeight: '500', 
            color: 'var(--text-primary)', 
            marginBottom: '8px' 
          }}>
            Category
          </label>
          {renderCategoryPills()}
        </div>

        {/* Date Picker */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '15px', 
            fontWeight: '500', 
            color: 'var(--text-primary)', 
            marginBottom: '8px' 
          }}>
            Date
          </label>
          <input
            type="text"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            placeholder="Wednesday, 2 July"
            style={{
              width: '100%',
              backgroundColor: 'var(--input-background)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '14px 16px',
              fontSize: '16px',
              color: 'var(--text-primary)',
              outline: 'none'
            }}
          />
        </div>

        {/* Time Selection */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '15px', 
            fontWeight: '500', 
            color: 'var(--text-primary)', 
            marginBottom: '8px' 
          }}>
            Time
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ flex: 1 }}>
              <TimePicker
                value={formData.startTime}
                onChange={(time) => setFormData(prev => ({ ...prev, startTime: time }))}
                placeholder="Start time"
              />
            </div>
            
            <span style={{ 
              fontSize: '16px', 
              color: 'var(--text-secondary)', 
              fontWeight: '500' 
            }}>
              to
            </span>
            
            <div style={{ flex: 1 }}>
              <TimePicker
                value={formData.endTime}
                onChange={(time) => setFormData(prev => ({ ...prev, endTime: time }))}
                placeholder="End time"
              />
            </div>
          </div>
          
          {/* Duration Display */}
          <div style={{
            backgroundColor: 'var(--info-light)',
            borderRadius: '12px',
            padding: '12px',
            textAlign: 'center'
          }}>
            <span style={{ 
              fontSize: '14px', 
              color: 'var(--text-primary)',
              fontWeight: '500'
            }}>
              Duration: {calculateDuration()}
            </span>
          </div>
        </div>

        {/* Location (Optional) */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '15px', 
            fontWeight: '500', 
            color: 'var(--text-primary)', 
            marginBottom: '8px' 
          }}>
            Location (Optional)
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            placeholder="Conference room, address, online..."
            style={{
              width: '100%',
              backgroundColor: 'var(--input-background)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '14px 16px',
              fontSize: '16px',
              color: 'var(--text-primary)',
              outline: 'none'
            }}
          />
        </div>

        {/* Notes (Optional) */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '15px', 
            fontWeight: '500', 
            color: 'var(--text-primary)', 
            marginBottom: '8px' 
          }}>
            Notes (Optional)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Agenda, people attending, etc..."
            rows={3}
            style={{
              width: '100%',
              backgroundColor: 'var(--input-background)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '14px 16px',
              fontSize: '16px',
              color: 'var(--text-primary)',
              outline: 'none',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Settings Toggles */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '15px', fontWeight: '500', color: 'var(--text-primary)' }}>
              Set reminder
            </span>
            {renderToggle(formData.setReminder, (value) => setFormData(prev => ({ ...prev, setReminder: value })))}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '15px', fontWeight: '500', color: 'var(--text-primary)' }}>
              Add travel time buffer
            </span>
            {renderToggle(formData.addTravelBuffer, (value) => setFormData(prev => ({ ...prev, addTravelBuffer: value })))}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '15px', fontWeight: '500', color: 'var(--text-primary)' }}>
              Create prep tasks
            </span>
            {renderToggle(formData.createPrepTasks, (value) => setFormData(prev => ({ ...prev, createPrepTasks: value })))}
          </div>
        </div>

        {/* Add Event Button */}
        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            backgroundColor: 'var(--primary-blue)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '16px',
            fontSize: '15px',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          Add Event
        </button>
      </div>

      {/* Bottom spacing for navigation */}
      <div style={{ height: '80px' }}></div>
    </div>
  )
}