'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoadingIcon from '../components/LoadingIcon'
import LoadingDots from '../components/LoadingDots'

const LOADING_DURATION = {
  minimum: 2000, // 2 seconds - gives users transition time
  maximum: 4000, // 4 seconds - prevents anxiety
  typical: 2500   // 2.5 seconds - optimal for ADHD preparation
}

export default function FocusLoadingPage() {
  const router = useRouter()
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [enableAnimations, setEnableAnimations] = useState(true)
  const [showDelayMessage, setShowDelayMessage] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      setEnableAnimations(!prefersReducedMotion)

      // Listen for changes in motion preferences
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      const handleChange = (e: MediaQueryListEvent) => {
        setEnableAnimations(!e.matches)
      }
      
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  useEffect(() => {
    // Simulate preparation tasks and ensure minimum loading time
    const startTime = Date.now()
    let progressInterval: NodeJS.Timeout
    let completionTimeout: NodeJS.Timeout

    const completeLoading = () => {
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, LOADING_DURATION.minimum - elapsedTime)
      
      setTimeout(() => {
        // Navigate to active timer screen
        router.push('/focus/active')
      }, remainingTime)
    }

    // Update progress indicator
    progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    // Prepare focus session (simulate async operations)
    const prepareFocusSession = async () => {
      try {
        // Simulate loading tasks:
        // 1. Initialize timer state
        // 2. Preload timer components
        // 3. Prepare background mechanisms
        // 4. Cache needed resources
        
        await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call
        
        // Ensure we show for at least minimum duration
        completeLoading()
        
      } catch (error) {
        console.error('Focus session preparation error:', error)
        
        // Even on error, proceed after maximum duration to prevent getting stuck
        setTimeout(() => {
          router.push('/focus/active')
        }, LOADING_DURATION.maximum)
      }
    }

    // Show delay message if loading takes too long
    const delayTimeout = setTimeout(() => {
      setShowDelayMessage(true)
    }, 6000) // Show after 6 seconds

    // Failsafe: never let user get stuck beyond 8 seconds
    const failsafeTimeout = setTimeout(() => {
      router.push('/focus/active')
    }, 8000)

    prepareFocusSession()

    // Cleanup function
    return () => {
      if (progressInterval) clearInterval(progressInterval)
      // completionTimeout is handled in prepareFocusSession
      clearTimeout(delayTimeout)
      clearTimeout(failsafeTimeout)
    }
  }, [router])

  // Announce to screen readers
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const announcement = document.createElement('div')
      announcement.setAttribute('aria-live', 'polite')
      announcement.setAttribute('aria-atomic', 'true')
      announcement.className = 'sr-only'
      announcement.textContent = 'Preparing your focus session'
      document.body.appendChild(announcement)

      return () => {
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement)
        }
      }
    }
  }, [])

  return (
    <div 
      className="min-h-screen flex flex-col items-center"
      style={{ backgroundColor: 'var(--category-personal-light)', paddingTop: '35vh' }}
      role="main"
      aria-label="Focus session loading screen"
    >
      <div className="text-center">
        {/* Icon Section - 35% from top, centered */}
        <div className="flex justify-center" style={{ marginBottom: '32px' }}>
          <div 
            style={{
              width: '80px',
              height: '80px',
              animation: enableAnimations ? 'gentlePulse 2s ease-in-out infinite' : 'none'
            }}
          >
            <img 
              src="/icons/focus_2.svg" 
              alt="Focus"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>

        {/* Title Section */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '500',
            color: 'var(--text-primary)',
            marginBottom: '16px',
            lineHeight: '1.2'
          }}>
            Just a moment...
          </h1>
          
          <p style={{
            fontSize: '16px',
            color: 'var(--text-primary)',
            margin: 0,
            lineHeight: '1.4',
            maxWidth: '280px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            {showDelayMessage 
              ? "Taking a bit longer than expected..."
              : "We're preparing everything for your focus session"
            }
          </p>
        </div>

        {/* Progress Indicator */}
        <div>
          <LoadingDots enableAnimation={enableAnimations} />
        </div>

        {/* Hidden progress for screen readers */}
        <div className="sr-only" aria-live="polite">
          Loading progress: {Math.round(loadingProgress)}%
        </div>
      </div>

      {/* CSS for animations and screen reader content */}
      <style jsx global>{`
        @keyframes gentlePulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.8;
          }
          50% { 
            transform: scale(1.05);
            opacity: 1;
          }
        }
        
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </div>
  )
}