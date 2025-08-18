'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import TimerCircle from '../components/TimerCircle'
import DurationGrid from '../components/DurationGrid'
import FocusOptions from '../components/FocusOptions'
import KaiRecommendation from '../components/KaiRecommendation'

interface FocusOptionsData {
  autoBreak: boolean
  breakDuration: number
  blockDistractions: boolean
  endSound: boolean
}

function FocusSetupContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Initialize with URL params if available, otherwise empty
  const [taskTitle, setTaskTitle] = useState(searchParams?.get('task') || '')
  const [selectedDuration, setSelectedDuration] = useState(0) // Start at 00:00
  const [customMinutes, setCustomMinutes] = useState(0)
  const [focusOptions, setFocusOptions] = useState<FocusOptionsData>({
    autoBreak: true,
    breakDuration: 5,
    blockDistractions: true,
    endSound: true
  })
  // Remove showingOptions state - single screen now

  // Get recommendation text based on task and time
  const getKaiRecommendation = () => {
    const hour = new Date().getHours()
    const taskLower = taskTitle.toLowerCase()
    
    if (taskLower.includes('presentation')) {
      return "Based on your energy level, a 25-minute focused session works well for presentation tasks. You can always extend if you're in flow!"
    } else if (hour < 10) {
      return "Morning focus is strong! A 25-minute session is perfect to start your day with momentum."
    } else if (hour > 15) {
      return "Afternoon energy can vary. Start with 25 minutes and see how you feel - you can always do another round!"
    } else {
      return "You're in a great focus window! 25 minutes will help you build momentum without overwhelming your ADHD brain."
    }
  }

  const handleDurationSelect = (duration: number) => {
    if (duration === -1) {
      // Custom selected - start at 0 minutes
      setSelectedDuration(0)
      setCustomMinutes(0)
    } else {
      setSelectedDuration(duration)
    }
  }

  const handleTimerIncrement = () => {
    const newMinutes = selectedDuration + 1
    setSelectedDuration(newMinutes)
    setCustomMinutes(newMinutes)
    // Auto-select Custom when manually adjusting time
  }

  const handleTimerDecrement = () => {
    if (selectedDuration > 0) {
      const newMinutes = selectedDuration - 1
      setSelectedDuration(newMinutes)
      setCustomMinutes(newMinutes)
      // Auto-select Custom when manually adjusting time
    }
  }

  const handleCancel = () => {
    router.push('/focus')
  }

  const handleStartFocus = () => {
    // Create focus session
    const session = {
      id: Date.now().toString(),
      taskTitle: taskTitle.trim(),
      duration: selectedDuration,
      startTime: new Date().toISOString(), // Use ISO string for consistency
      breaks: [],
      isCompleted: false,
      stats: {
        totalFocusTime: 0,
        breaksTaken: 0,
        distractionsHandled: 0,
        productivityScore: 0
      },
      options: focusOptions
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('currentFocusSession', JSON.stringify(session))
    }
    router.push('/focus/loading')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', padding: '20px' }}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
          <button 
            onClick={() => router.push('/')}
            className="flex items-center justify-center w-10 h-10"
            style={{ 
              background: 'none', 
              border: 'none',
              cursor: 'pointer'
            }}
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" style={{ color: 'var(--primary-blue)' }} />
          </button>
          <h1 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--primary-blue)',
            margin: 0
          }}>
            Timer Setup
          </h1>
          <div style={{ width: '20px' }} /> {/* Spacer for center alignment */}
        </div>

        {/* Task Title */}
        <div style={{ marginBottom: '24px' }}>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="w-full outline-none"
            style={{
              fontSize: '20px',
              fontWeight: 'medium',
              color: taskTitle ? 'var(--text-primary)' : 'var(--text-secondary)', // Main Gray when filled, Light Gray when placeholder
              backgroundColor: 'var(--input-background)',
              border: '2px solid var(--input-border)', // Light Gray stroke
              borderRadius: '8px',
              padding: '12px 16px',
              textAlign: 'center' // Centered text
            }}
            placeholder="What would you like to focus on?"
          />
        </div>

        {/* Timer Display */}
        <TimerCircle
          minutes={selectedDuration}
          onIncrement={handleTimerIncrement}
          onDecrement={handleTimerDecrement}
        />

        {/* Duration Grid */}
        <DurationGrid
          selectedDuration={selectedDuration}
          onDurationSelect={handleDurationSelect}
        />

        {/* Kai's Recommendation */}
        <KaiRecommendation
          text={getKaiRecommendation()}
        />

        {/* Action Buttons - moved between Kai's recommendation and Focus Options */}
        <div className="grid grid-cols-2 gap-3" style={{ marginBottom: '24px' }}>
          <button
            onClick={handleCancel}
            className="font-medium transition-all duration-200 hover:opacity-80"
            style={{
              backgroundColor: 'var(--error-light)', // Light Red
              color: 'white',
              height: '44px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '16px'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleStartFocus}
            disabled={!taskTitle.trim() || selectedDuration <= 0}
            className="text-white font-medium transition-all duration-200 hover:opacity-90 disabled:opacity-50"
            style={{
              backgroundColor: 'var(--primary-blue)',
              height: '44px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '16px'
            }}
          >
            Start Focus
          </button>
        </div>

        {/* Focus Options */}
        <FocusOptions
          options={focusOptions}
          onChange={setFocusOptions}
        />
      </div>
    </div>
  )
}

export default function FocusSetupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-orange-300 border-t-orange-600 rounded-full mx-auto mb-4"></div>
          <p style={{ color: 'var(--text-secondary)' }}>Loading timer setup...</p>
        </div>
      </div>
    }>
      <FocusSetupContent />
    </Suspense>
  )
}