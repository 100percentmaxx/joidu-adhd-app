'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function FocusBreakPage() {
  const router = useRouter()
  const [focusTimeRemaining, setFocusTimeRemaining] = useState(0)
  const [session, setSession] = useState<any>(null)

  // Load focus session data
  useEffect(() => {
    const sessionData = typeof window !== 'undefined' ? localStorage.getItem('currentFocusSession') : null
    if (sessionData) {
      try {
        const loadedSession = JSON.parse(sessionData)
        setSession(loadedSession)
        // Get the paused focus timer time
        if (loadedSession.timeRemainingWhenPaused) {
          setFocusTimeRemaining(loadedSession.timeRemainingWhenPaused)
        }
      } catch (error) {
        router.push('/focus/setup')
      }
    } else {
      router.push('/focus/setup')
    }
  }, [router])

  // Recharge ideas data
  const rechargeIdeas = [
    { iconSrc: '/icons/walk.svg', label: 'Short Walk' },
    { iconSrc: '/icons/drink_water.svg', label: 'Drink Water' },
    { iconSrc: '/icons/breathe.svg', label: 'Deep Breaths' },
    { iconSrc: '/icons/morning.svg', label: 'Look Outside' },
    { iconSrc: '/icons/stretch.svg', label: 'Quick Stretch' },
    { iconSrc: '/icons/food.svg', label: 'Healthy Snack' }
  ]

  // Format time display
  const formatTime = (seconds: number): string => {
    if (!seconds || seconds < 0 || !isFinite(seconds)) {
      return '0:00'
    }
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // No break timer countdown - user controls when to resume

  const handleCancel = () => {
    // Stop focus session completely and navigate to Home
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentFocusSession')
    }
    router.push('/')
  }

  const handleResume = () => {
    // Just navigate back to active timer - the active timer will handle resuming from paused state
    router.push('/focus/active')
  }

  // Show loading if no session yet
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--category-personal-light)' }}>
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-300 border-t-blue-600 rounded-full mx-auto mb-4"></div>
          <p style={{ color: 'var(--text-primary)' }}>Loading break screen...</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: 'var(--category-personal-light)', padding: '20px' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => router.push('/focus/active')}
          className="flex items-center justify-center w-10 h-10"
          style={{ 
            background: 'none', 
            border: 'none',
            cursor: 'pointer'
          }}
          aria-label="Go back to timer"
        >
          <ArrowLeft className="w-6 h-6" style={{ color: 'var(--primary-blue)' }} />
        </button>
        <div style={{ width: '20px' }} />
      </div>

      {/* Main White Container - SINGLE BOX */}
      <div style={{
        backgroundColor: 'var(--card-background)',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        margin: '0 0 24px 0'
      }}>
        
        {/* Meditation Icon */}
        <div className="flex justify-center" style={{ marginBottom: '24px' }}>
          <img 
            src="/icons/calm.svg" 
            alt="Meditation"
            style={{ width: '80px', height: '80px' }}
          />
        </div>

        {/* Title Section */}
        <div className="text-center" style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '16px',
            lineHeight: '1.2'
          }}>
            Take a Breath
          </h1>
          
          <p style={{
            fontSize: '16px',
            color: 'var(--text-primary)',
            margin: 0,
            lineHeight: '1.4',
            textAlign: 'center'
          }}>
            Your ADHD brain just worked hard. Time to recharge and reset.
          </p>
        </div>

        {/* Focus Timer Display (Paused) */}
        <div className="text-center" style={{ marginBottom: '32px' }}>
          <div style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'var(--timer-ring-progress)',
            lineHeight: '1',
            marginBottom: '8px'
          }}>
            {formatTime(focusTimeRemaining)}
          </div>
          <div style={{
            fontSize: '12px',
            color: 'var(--text-secondary)',
            fontWeight: 'normal',
            letterSpacing: '0.05em'
          }}>
            FOCUS TIME LEFT
          </div>
        </div>

        {/* Quick Recharge Ideas Section */}
        <div>
          {/* Icon + Title Row */}
          <div className="flex items-center" style={{ marginBottom: '20px' }}>
            <img 
              src="/icons/ideas_color.svg" 
              alt="Ideas"
              style={{ width: '24px', height: '24px', marginRight: '8px' }}
            />
            <h3 style={{
              fontSize: '18px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Quick Recharge Ideas
            </h3>
          </div>

          {/* Ideas Grid (3 rows x 2 columns) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px'
          }}>
            {rechargeIdeas.map((idea, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center" style={{ marginBottom: '8px' }}>
                  <img 
                    src={idea.iconSrc} 
                    alt={idea.label}
                    style={{ width: '40px', height: '40px' }}
                  />
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'var(--text-primary)'
                }}>
                  {idea.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons (Outside White Box) */}
      <div className="flex" style={{ gap: '16px' }}>
        {/* Cancel Button */}
        <button
          onClick={handleCancel}
          className="flex-1 transition-all duration-150 active:scale-95"
          style={{
            backgroundColor: 'var(--error-light)',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: '500',
            height: '48px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
        
        {/* Resume Button */}
        <button
          onClick={handleResume}
          className="flex-1 transition-all duration-150 active:scale-95"
          style={{
            backgroundColor: 'var(--success-light)',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: '500',
            height: '48px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer'
          }}
          autoFocus // Focus on Resume button when page loads
        >
          Resume
        </button>
      </div>
    </div>
  )
}