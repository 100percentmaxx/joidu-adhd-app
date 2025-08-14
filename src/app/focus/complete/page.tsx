'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

// Confetti component
const ConfettiPiece = ({ delay }: { delay: number }) => {
  const colors = ['#2847ef', '#fa772c', '#a8e2bb', '#f4b7ae', '#f9c075', '#c8bfef']
  const shapes = ['●', '★', '▲', '■']
  const color = colors[Math.floor(Math.random() * colors.length)]
  const shape = shapes[Math.floor(Math.random() * shapes.length)]
  const left = Math.random() * 100
  const animationDuration = 3 + Math.random() * 2 // 3-5 seconds
  const size = 12 + Math.random() * 8 // 12-20px
  
  return (
    <div
      style={{
        position: 'absolute',
        left: `${left}%`,
        top: '-20px',
        color,
        fontSize: `${size}px`,
        animation: `fall ${animationDuration}s linear ${delay}s infinite`,
        pointerEvents: 'none',
        zIndex: 1000
      }}
    >
      {shape}
    </div>
  )
}

// Main confetti container
const ConfettiAnimation = () => {
  const pieces = Array.from({ length: 50 }, (_, i) => (
    <ConfettiPiece key={i} delay={Math.random() * 2} />
  ))
  
  return (
    <>
      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
        {pieces}
      </div>
    </>
  )
}

interface CompletionData {
  taskTitle: string
  sessionMinutes: number
  breaksTotal: number
  totalMinutes: number
  streakDays: number
  wasCompleted: boolean
}

export default function FocusCompletePage() {
  const router = useRouter()
  const [sessionData, setSessionData] = useState<CompletionData | null>(null)
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Load completion data from localStorage
    const completedData = typeof window !== 'undefined' ? localStorage.getItem('completedFocusSession') : null
    if (completedData) {
      try {
        const session = JSON.parse(completedData)
        const completionData: CompletionData = {
          taskTitle: session.taskTitle || 'Focus Session',
          sessionMinutes: session.duration || 25,
          breaksTotal: session.stats?.breaksTaken || 3,
          totalMinutes: session.duration || 12,
          streakDays: 5, // Default for now - would come from user stats
          wasCompleted: session.isCompleted || true
        }
        setSessionData(completionData)
      } catch (error) {
        // Fallback data if parsing fails
        setSessionData({
          taskTitle: 'Focus Session',
          sessionMinutes: 25,
          breaksTotal: 3,
          totalMinutes: 12,
          streakDays: 5,
          wasCompleted: true
        })
      }
    } else {
      // No session data, redirect to setup
      router.push('/focus/setup')
    }
  }, [router])

  // Stop confetti after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 6000)
    
    return () => clearTimeout(timer)
  }, [])

  const getADHDWinMessage = (minutes: number): string => {
    if (minutes >= 45) {
      return `Incredible focus session! You're mastering deep work.`
    } else if (minutes >= 25) {
      return `You stayed focused for ${minutes} minutes! That's building your attention muscle and creating positive momentum.`
    } else {
      return `Great start! You're building focus stamina.`
    }
  }

  const handleFiveMinBreak = () => {
    // Start 5-minute break timer
    const breakSession = {
      id: Date.now().toString(),
      taskTitle: 'Break Time',
      duration: 5,
      startTime: new Date().toISOString(),
      isBreak: true
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentFocusSession', JSON.stringify(breakSession))
    }
    router.push('/focus/active')
  }

  const handleKeepWorking = () => {
    // Return to focus timer setup with same task
    router.push(`/focus/setup?task=${encodeURIComponent(sessionData?.taskTitle || '')}`)
  }

  const handleMarkDone = () => {
    // Mark task as complete, return to home
    if (typeof window !== 'undefined') {
      localStorage.removeItem('completedFocusSession')
    }
    router.push('/')
  }

  if (!sessionData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#cae9ef' }}>
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-300 border-t-blue-600 rounded-full mx-auto mb-4"></div>
          <p style={{ color: '#4c4c4c' }}>Loading your results...</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: '#cae9ef', padding: '20px', position: 'relative' }}
    >
      {/* Confetti Animation */}
      {showConfetti && <ConfettiAnimation />}
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: '40px' }}>
          <button 
            onClick={() => router.push('/focus')}
            className="flex items-center justify-center w-10 h-10"
            style={{ 
              background: 'none', 
              border: 'none',
              cursor: 'pointer'
            }}
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" style={{ color: '#2847ef' }} />
          </button>
          <div style={{ width: '20px' }} />
        </div>

        {/* Focus Icon */}
        <div className="flex justify-center" style={{ marginBottom: '32px' }}>
          <div style={{ width: '80px', height: '80px' }}>
            <img 
              src="/icons/focus_2.svg" 
              alt="Focus Complete"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center" style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#4c4c4c',
            marginBottom: '16px',
            lineHeight: '1.2'
          }}>
            Focus Complete!
          </h1>
          
          <p style={{
            fontSize: '16px',
            color: '#4c4c4c',
            marginBottom: '4px'
          }}>
            You just finished
          </p>
          
          <p style={{
            fontSize: '18px',
            fontWeight: '500',
            color: '#2847ef',
            margin: 0
          }}>
            "{sessionData.taskTitle}"
          </p>
        </div>

        {/* Session Stats and ADHD Win Combined Section */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '32px'
        }}>
          {/* Stats Header */}
          <div className="flex items-center" style={{ marginBottom: '16px' }}>
            <img 
              src="/icons/analytics_color.svg" 
              alt="Analytics"
              style={{ width: '24px', height: '24px', marginRight: '8px' }}
            />
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#4c4c4c',
              margin: 0
            }}>
              Session Stats
            </h3>
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            {/* Minutes */}
            <div className="text-center">
              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#2847ef',
                lineHeight: '1'
              }}>
                {sessionData.sessionMinutes}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#a5a5a5',
                fontWeight: 'normal',
                letterSpacing: '0.05em'
              }}>
                MINUTES
              </div>
            </div>

            {/* Breaks */}
            <div className="text-center">
              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#2847ef',
                lineHeight: '1'
              }}>
                {sessionData.breaksTotal}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#a5a5a5',
                fontWeight: 'normal',
                letterSpacing: '0.05em'
              }}>
                BREAKS
              </div>
            </div>

            {/* Total */}
            <div className="text-center">
              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#2847ef',
                lineHeight: '1'
              }}>
                {sessionData.totalMinutes}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#a5a5a5',
                fontWeight: 'normal',
                letterSpacing: '0.05em'
              }}>
                TOTAL
              </div>
            </div>

            {/* Streak */}
            <div className="text-center">
              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#2847ef',
                lineHeight: '1'
              }}>
                {sessionData.streakDays}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#a5a5a5',
                fontWeight: 'normal',
                letterSpacing: '0.05em'
              }}>
                STREAK
              </div>
            </div>
          </div>

          {/* ADHD Win Section */}
          <div style={{
            paddingTop: '16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}>
            <img 
              src="/icons/brain.svg" 
              alt="Brain"
              style={{ width: '32px', height: '32px', flexShrink: 0 }}
            />
            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#fa772c',
                margin: '0 0 4px 0'
              }}>
                ADHD Win!
              </h4>
              <p style={{
                fontSize: '14px',
                color: '#4c4c4c',
                margin: 0,
                lineHeight: '1.4'
              }}>
                {getADHDWinMessage(sessionData.sessionMinutes)}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ marginBottom: '40px' }}>
          {/* Button Row 1 */}
          <div className="flex" style={{ gap: '12px', marginBottom: '16px' }}>
            <button
              onClick={handleFiveMinBreak}
              className="flex-1 transition-all duration-150 active:scale-95"
              style={{
                backgroundColor: '#f4b7ae',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: '500',
                height: '48px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              5 Min Break
            </button>
            
            <button
              onClick={handleKeepWorking}
              className="flex-1 transition-all duration-150 active:scale-95"
              style={{
                backgroundColor: '#a8e2bb',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: '500',
                height: '48px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Keep Working
            </button>
          </div>

          {/* Button Row 2 */}
          <button
            onClick={handleMarkDone}
            className="w-full transition-all duration-150 active:scale-95"
            style={{
              backgroundColor: '#2847ef',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: '500',
              height: '48px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Mark Done
          </button>
        </div>
      </div>
    </div>
  )
}