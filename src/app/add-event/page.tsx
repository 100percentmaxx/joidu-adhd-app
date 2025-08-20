'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Clock } from 'lucide-react'

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
    // Simple duration calculation (this would be more robust in production)
    const start = formData.startTime
    const end = formData.endTime
    
    // For demo purposes, return 30 minutes
    // In production, you'd parse the times and calculate the difference
    return '30 minutes'
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

    // Save event logic would go here
    console.log('Saving event:', formData)
    
    // Navigate back to Schedule view
    router.push('/tasks') // Will need to set activeView to 'schedule'
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
              className="flex items-center justify-center px-3 py-2 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: isSelected ? info.color : 'var(--card-background)',
                border: isSelected ? '2px solid var(--primary-blue)' : '1px solid var(--border-color)',
                color: isSelected ? 'var(--text-primary)' : 'var(--text-primary)'
              }}
            >
              <img src={info.icon} alt={info.name} style={{ width: '16px', height: '16px', marginRight: '6px' }} />
              <span style={{ fontSize: '14px', fontWeight: '500' }}>{info.name}</span>
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

        {/* AI Suggestion Card */}
        {showAISuggestion && (
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
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'var(--primary-blue)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px'
              }}>
                <span style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>✨</span>
              </div>
              <span style={{ 
                fontSize: '14px', 
                color: 'var(--text-primary)',
                flex: 1
              }}>
                This looks like a {categoryData[suggestedCategory].name.toLowerCase()} item. Should I add this category?
              </span>
            </div>
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
          </div>
        )}

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
            <div style={{ flex: 1, position: 'relative' }}>
              <input
                type="text"
                value={formData.startTime}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                style={{
                  width: '100%',
                  backgroundColor: 'var(--input-background)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  paddingRight: '40px',
                  fontSize: '16px',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
              <Clock 
                className="absolute right-3 top-1/2 transform -translate-y-1/2" 
                style={{ width: '20px', height: '20px', color: 'var(--text-secondary)' }} 
              />
            </div>
            
            <span style={{ 
              fontSize: '16px', 
              color: 'var(--text-secondary)', 
              fontWeight: '500' 
            }}>
              to
            </span>
            
            <div style={{ flex: 1, position: 'relative' }}>
              <input
                type="text"
                value={formData.endTime}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                style={{
                  width: '100%',
                  backgroundColor: 'var(--input-background)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  paddingRight: '40px',
                  fontSize: '16px',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
              <Clock 
                className="absolute right-3 top-1/2 transform -translate-y-1/2" 
                style={{ width: '20px', height: '20px', color: 'var(--text-secondary)' }} 
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