'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

interface SyncingDataProps {
  onSyncComplete?: () => void
  onCancel?: () => void
  showRealProgress?: boolean
  syncProgress?: number // 0-100 for real progress
  syncDuration?: number // Duration in milliseconds for simulated progress
}

/**
 * SYNCING DATA LOADING SCREEN COMPONENT
 * 
 * This is a reusable loading component that provides reassuring feedback during 
 * data sync operations. It features smooth animations and ADHD-friendly design 
 * to reduce anxiety during waiting periods.
 * 
 * KEY FEATURES:
 * - Continuously rotating sync icon for visual activity feedback
 * - Animated progress bar (real or simulated)
 * - Reassuring messaging optimized for ADHD users
 * - Accessibility features with ARIA labels and announcements
 * - Option to cancel sync and return to previous screen
 * - Responsive design that works on all screen sizes
 * 
 * USAGE SCENARIOS:
 * - Initial app data loading
 * - Manual sync operations
 * - Background sync feedback
 * - Login/account sync
 * - Settings sync
 */
export default function SyncingData({
  onSyncComplete,
  onCancel,
  showRealProgress = false,
  syncProgress = 0,
  syncDuration = 3500 // 3.5 seconds default
}: SyncingDataProps) {
  const router = useRouter()
  
  // State for simulated progress animation
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  /**
   * PROGRESS ANIMATION SYSTEM
   * 
   * Handles both real and simulated progress:
   * - Real progress: Uses syncProgress prop directly
   * - Simulated progress: Smooth animation from 0% to 100%
   * 
   * The animation uses a realistic curve that starts fast and slows down
   * near completion to feel more natural and less mechanical.
   */
  useEffect(() => {
    if (showRealProgress) {
      // Use real progress from props
      setProgress(Math.min(100, Math.max(0, syncProgress)))
      if (syncProgress >= 100) {
        setIsComplete(true)
      }
    } else {
      // Simulated progress animation
      const startTime = Date.now()
      const animationInterval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const progressPercent = Math.min(100, (elapsed / syncDuration) * 100)
        
        // Use easing function for more natural progress
        // Starts fast, slows down near the end
        const easedProgress = progressPercent < 90 
          ? progressPercent 
          : 90 + (progressPercent - 90) * 0.3
        
        setProgress(easedProgress)
        
        if (progressPercent >= 100) {
          setIsComplete(true)
          clearInterval(animationInterval)
        }
      }, 16) // ~60fps for smooth animation
      
      return () => clearInterval(animationInterval)
    }
  }, [showRealProgress, syncProgress, syncDuration])

  /**
   * AUTO-DISMISS FUNCTIONALITY
   * 
   * When sync reaches 100%, wait a brief moment to let users see
   * the completion, then automatically dismiss the loading screen.
   * This provides closure and prevents the screen from feeling "stuck".
   */
  useEffect(() => {
    if (isComplete && progress >= 99) {
      const dismissTimer = setTimeout(() => {
        if (onSyncComplete) {
          onSyncComplete()
        }
      }, 500) // Brief delay to show completion
      
      return () => clearTimeout(dismissTimer)
    }
  }, [isComplete, progress, onSyncComplete])

  /**
   * CANCEL SYNC HANDLER
   * 
   * Allows users to cancel the sync operation and return to the
   * previous screen. Important for ADHD users who might become
   * impatient or need to access something urgently.
   */
  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      router.back()
    }
  }

  return (
    <div 
      style={{ 
        backgroundColor: '#e6e1f4', // Light purple background from mockup
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px'
      }}
      role="status"
      aria-live="polite"
      aria-label={`Syncing data, ${Math.round(progress)}% complete`}
    >
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes progressFill {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        
        .rotating-icon {
          animation: rotate 2s linear infinite;
        }
        
        .fade-in-content {
          animation: fadeIn 0.6s ease-out;
        }
        
        .progress-fill {
          transform-origin: left center;
          transition: transform 0.1s ease-out;
        }
      `}</style>

      {/* Back Arrow - Top Left */}
      <div style={{ marginBottom: '40px' }}>
        <button
          onClick={handleCancel}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(40, 71, 239, 0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
          aria-label="Cancel sync and go back"
        >
          <ArrowLeft 
            size={24} 
            style={{ color: '#2847ef' }} 
          />
        </button>
      </div>

      {/* Main Content - Vertically Centered */}
      <div 
        className="fade-in-content"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          maxWidth: '400px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        {/* 1. SYNC ICON - Continuously Rotating */}
        <div 
          className="rotating-icon"
          style={{ 
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-hidden="true" // Decorative, screen reader will use text instead
        >
          <img 
            src="/icons/sync_cloud.svg" 
            alt=""
            style={{ 
              width: '80px', 
              height: '80px' 
            }}
          />
        </div>

        {/* 2. TITLE TEXT */}
        <h1 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#4c4c4c',
          margin: '0 0 16px 0',
          lineHeight: '1.2'
        }}>
          Syncing Your Data
        </h1>

        {/* 3. DESCRIPTION TEXT */}
        <p style={{
          fontSize: '17px',
          fontWeight: 400,
          color: '#a5a5a5',
          margin: '0 0 48px 0',
          lineHeight: '1.4',
          maxWidth: '280px'
        }}>
          Your tasks and routines are syncing safely. This usually takes just a moment.
        </p>

        {/* 4. PROGRESS BAR */}
        <div 
          style={{
            width: '300px',
            height: '8px',
            backgroundColor: '#d1d5db',
            borderRadius: '4px',
            overflow: 'hidden',
            position: 'relative'
          }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Sync progress: ${Math.round(progress)} percent complete`}
        >
          {/* Progress Fill */}
          <div
            className="progress-fill"
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#fa772c', // Orange fill from mockup
              borderRadius: '4px',
              transform: `scaleX(${progress / 100})`,
              transition: 'transform 0.2s ease-out'
            }}
          />
        </div>

        {/* Progress Percentage (for screen readers) */}
        <div 
          style={{ 
            position: 'absolute', 
            left: '-9999px' 
          }}
          aria-live="polite"
        >
          {Math.round(progress)}% complete
        </div>
      </div>

      {/* Bottom spacing to maintain center alignment */}
      <div style={{ height: '60px' }} />
    </div>
  )
}

/**
 * USAGE EXAMPLES:
 * 
 * // Basic usage with simulated progress
 * <SyncingData onSyncComplete={() => router.push('/dashboard')} />
 * 
 * // With real progress data
 * <SyncingData 
 *   showRealProgress={true}
 *   syncProgress={syncPercentage}
 *   onSyncComplete={() => handleSyncComplete()}
 *   onCancel={() => handleCancel()}
 * />
 * 
 * // Custom sync duration
 * <SyncingData 
 *   syncDuration={5000} // 5 seconds
 *   onSyncComplete={() => console.log('Sync complete!')}
 * />
 */