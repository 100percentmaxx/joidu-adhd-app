'use client'

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import TimerCircleActive from '../components/TimerCircleActive'

interface FocusSession {
  id: string
  taskTitle: string
  duration: number
  startTime: string
  pausedAt?: string
  timeRemainingWhenPaused?: number
  isPaused?: boolean
}

export default function FocusActivePage() {
  const router = useRouter()
  const [session, setSession] = useState<FocusSession | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const isInitializedRef = useRef(false)
  const timeRemainingRef = useRef<number>(0)

  const handleSessionComplete = () => {
    if (!session) return
    
    const completedSession = {
      ...session,
      endTime: new Date().toISOString(),
      isCompleted: true
    }
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('completedFocusSession', JSON.stringify(completedSession))
      localStorage.removeItem('currentFocusSession')
    }
    
    router.push('/focus/complete')
  }

  useLayoutEffect(() => {
    // Prevent multiple initializations
    if (isInitializedRef.current) {
      console.log('[INIT] Already initialized, skipping')
      return
    }
    
    console.log('[INIT] Starting initialization')
    isInitializedRef.current = true
    
    // CRITICAL: Clear any existing timer immediately on mount
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    
    // Load the current focus session
    const sessionData = typeof window !== 'undefined' ? localStorage.getItem('currentFocusSession') : null
    if (sessionData) {
      try {
        const loadedSession = JSON.parse(sessionData)
        
        // Check if session was paused and restore from paused time
        if (loadedSession.isPaused && loadedSession.timeRemainingWhenPaused) {
          // Resume from paused time - this is the key fix
          console.log('[RESUME] Resuming from paused state:', loadedSession.timeRemainingWhenPaused)
          
          // Clear the paused state from localStorage FIRST
          const resumedSession = {
            ...loadedSession,
            isPaused: false,
            pausedAt: undefined
          }
          console.log('[RESUME] Saving resumed session')
          if (typeof window !== 'undefined') {
            localStorage.setItem('currentFocusSession', JSON.stringify(resumedSession))
          }
          
          // Set state and ref synchronously
          setSession(resumedSession)
          timeRemainingRef.current = loadedSession.timeRemainingWhenPaused
          setTimeRemaining(loadedSession.timeRemainingWhenPaused)
          setIsActive(true)
          setIsPaused(false)
          
          console.log('[RESUME] State set - timeRemaining should be:', loadedSession.timeRemainingWhenPaused)
        } else {
          // Calculate remaining time based on when the session started
          const startTime = new Date(loadedSession.startTime).getTime()
          const currentTime = Date.now()
          const elapsedSeconds = Math.floor((currentTime - startTime) / 1000)
          const totalSeconds = loadedSession.duration * 60
          const remainingSeconds = Math.max(0, totalSeconds - elapsedSeconds)
          
          if (remainingSeconds > 0) {
            console.log('[INIT] Setting initial timer:', remainingSeconds, 'seconds')
            
            // Set state and ref synchronously
            setSession(loadedSession)
            timeRemainingRef.current = remainingSeconds
            setTimeRemaining(remainingSeconds)
            setIsActive(true)
            setIsPaused(false)
            
            console.log('[INIT] State set - timeRemaining should be:', remainingSeconds)
          } else {
            console.log('[INIT] Timer already finished')
            setSession(loadedSession)
            handleSessionComplete()
          }
        }
      } catch (error) {
        console.error('[INIT] Error:', error)
        router.push('/focus/setup')
      }
    } else {
      console.log('[INIT] No session found')
      router.push('/focus/setup')
    }
  }, [router])

  // Timer countdown effect
  useEffect(() => {
    const currentTime = timeRemaining || timeRemainingRef.current
    console.log('[TIMER] useEffect triggered:', { isActive, isPaused, timeRemaining, refValue: timeRemainingRef.current, using: currentTime })
    
    // Clear any existing timer
    if (timerRef.current) {
      console.log('[TIMER] Clearing existing timer')
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    // Use ref value as fallback if state is 0
    if (!isActive || isPaused || currentTime <= 0) {
      console.log('[TIMER] Not starting timer - conditions not met')
      return
    }

    // Sync the ref to current time value
    timeRemainingRef.current = currentTime

    console.log('[TIMER] Starting new timer with time:', currentTime)
    timerRef.current = setInterval(() => {
      timeRemainingRef.current = Math.max(0, timeRemainingRef.current - 1)
      setTimeRemaining(timeRemainingRef.current)
      
      if (timeRemainingRef.current <= 0) {
        // Timer finished
        setIsActive(false)
        handleSessionComplete()
      }
    }, 1000)

    return () => {
      console.log('[TIMER] useEffect cleanup')
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isActive, isPaused, timeRemaining]) // Keep dependencies simple

  // Clean up timer when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [])

  const handlePause = () => {
    const currentTime = timeRemaining || timeRemainingRef.current
    console.log('[PAUSE] Pause pressed - current state:', { isActive, isPaused, timeRemaining, refValue: timeRemainingRef.current, using: currentTime })
    
    // Clear the timer immediately
    if (timerRef.current) {
      console.log('[PAUSE] Clearing timer')
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    
    // Store the current timer state FIRST
    if (session) {
      const pausedSession = {
        ...session,
        pausedAt: new Date().toISOString(),
        timeRemainingWhenPaused: currentTime,
        isPaused: true
      }
      console.log('[PAUSE] Saving paused session with time:', currentTime)
      if (typeof window !== 'undefined') {
        localStorage.setItem('currentFocusSession', JSON.stringify(pausedSession))
      }
      setSession(pausedSession)
    }
    
    // Stop the timer immediately - this will trigger useEffect to clear timer
    console.log('[PAUSE] Setting isActive=false, isPaused=true')
    setIsActive(false)
    setIsPaused(true)
    
    // Reset initialization flag so it can run again when returning from break
    isInitializedRef.current = false
    
    // Navigate to break screen
    console.log('[PAUSE] Navigating to break screen')
    router.push('/focus/break')
  }

  const handleCancel = () => {
    if (session) {
      const cancelledSession = {
        ...session,
        endTime: new Date().toISOString(),
        isCompleted: false
      }
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('completedFocusSession', JSON.stringify(cancelledSession))
        localStorage.removeItem('currentFocusSession')
      }
    }
    
    router.push('/focus/setup')
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-orange-300 border-t-orange-600 rounded-full mx-auto mb-4"></div>
          <p style={{ color: 'var(--text-secondary)' }}>Loading your focus session...</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen flex flex-col justify-center items-center"
      style={{ backgroundColor: 'var(--background)', padding: '20px' }}
    >
      <div className="text-center w-full max-w-md">
        {/* Header Section */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            backgroundColor: 'var(--card-background)',
            border: '2px solid #e2e2e2',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '16px'
          }}>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              margin: 0,
              lineHeight: '1.2',
              textAlign: 'center'
            }}>
              {session.taskTitle}
            </h1>
          </div>
        </div>

        {/* Timer Circle */}
        <div style={{ marginBottom: '40px' }}>
          <TimerCircleActive
            timeRemaining={timeRemaining}
            totalTime={session.duration * 60}
            isRunning={isActive && !isPaused}
            sessionDuration={session.duration}
          />
        </div>

        {/* Control Buttons */}
        <div 
          className="flex justify-center"
          style={{ gap: 'clamp(40px, 10vw, 64px)', padding: '0 10px' }}
        >
          {/* Cancel Button */}
          <button
            onClick={handleCancel}
            className="transition-all duration-150 active:scale-95"
            style={{
              width: 'clamp(60px, 15vw, 80px)',
              height: 'clamp(60px, 15vw, 80px)',
              borderRadius: '50%',
              backgroundColor: 'var(--error-light)',
              color: 'white',
              fontSize: 'clamp(14px, 4vw, 18px)',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>

          {/* Pause Button */}
          <button
            onClick={handlePause}
            className="transition-all duration-150 active:scale-95"
            style={{
              width: 'clamp(60px, 15vw, 80px)',
              height: 'clamp(60px, 15vw, 80px)',
              borderRadius: '50%',
              backgroundColor: 'var(--success-light)',
              color: 'white',
              fontSize: 'clamp(14px, 4vw, 18px)',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Pause
          </button>
        </div>
      </div>
    </div>
  )
}