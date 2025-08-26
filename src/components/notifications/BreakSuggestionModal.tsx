'use client'

import React, { useEffect, useState } from 'react'

/**
 * BREAK SUGGESTION MODAL COMPONENT
 * 
 * A specialized modal for hyperfocus protection designed specifically for ADHD users.
 * This component helps prevent burnout and maintains healthy work patterns by gently
 * suggesting breaks during extended focus sessions.
 * 
 * HYPERFOCUS PROTECTION PHILOSOPHY:
 * - Gentle suggestions that respect the user's flow state
 * - Never forces breaks, always provides choice to continue
 * - Escalates gradually from gentle nudges to stronger suggestions
 * - Waits for natural break points to minimize disruption
 * - Provides clear rationale for why breaks are beneficial
 * 
 * ADHD-SPECIFIC CONSIDERATIONS:
 * - ADHD users can hyperfocus to the point of neglecting basic needs
 * - Forced interruptions can be jarring and counterproductive
 * - Choice and autonomy are crucial for buy-in
 * - Clear explanations help users understand the benefit
 * - Snooze options prevent repeated dismissal frustration
 * 
 * TIMING LOGIC:
 * - 30 minutes: Gentle suggestion with soft language
 * - 45 minutes: Moderate suggestion with specific break ideas
 * - 60+ minutes: Stronger suggestion with health focus
 * - Natural break detection: Waits for typing/clicking pauses
 * 
 * USAGE EXAMPLES:
 * 
 * // Gentle 30-minute suggestion
 * <BreakSuggestionModal
 *   isVisible={showBreakSuggestion}
 *   focusDuration={30}
 *   intensityLevel="gentle"
 *   title="Time for a break? 🌸"
 *   message="You've been focused for 30 minutes. Maybe stretch or grab some water?"
 *   onSnooze={() => handleSnoozeBreak(5)}
 *   onTakeBreak={() => handleStartBreak()}
 *   onDismiss={() => setShowBreakSuggestion(false)}
 * />
 * 
 * // Stronger 60-minute suggestion
 * <BreakSuggestionModal
 *   isVisible={showBreakSuggestion}
 *   focusDuration={60}
 *   intensityLevel="strong"
 *   title="Your brain needs care 🧠"
 *   message="An hour of intense focus! A short break will actually boost your productivity."
 *   onSnooze={() => handleSnoozeBreak(5)}
 *   onTakeBreak={() => handleStartBreak()}
 *   onDismiss={() => setShowBreakSuggestion(false)}
 *   showFocusStats={true}
 * />
 */

interface BreakSuggestionModalProps {
  /** Controls whether the modal is visible */
  isVisible: boolean
  
  /** Duration of current focus session in minutes */
  focusDuration: number
  
  /** Intensity level of the break suggestion */
  intensityLevel?: 'gentle' | 'moderate' | 'strong'
  
  /** Break suggestion title */
  title: string
  
  /** Break suggestion message with rationale */
  message: string
  
  /** Optional subtitle with focus session stats */
  subtitle?: string
  
  /** Function called when user chooses to snooze (continue working) */
  onSnooze: () => void
  
  /** Function called when user chooses to take a break */
  onTakeBreak: () => void
  
  /** Function called when modal should be dismissed */
  onDismiss: () => void
  
  /** Whether to show focus session statistics */
  showFocusStats?: boolean
  
  /** Custom snooze duration text (default: "5 more min") */
  snoozeText?: string
  
  /** Custom break acceptance text (default: "Good idea") */
  breakText?: string
  
  /** Optional custom icon path (defaults to joidu_drop_logo.svg) */
  icon?: string
  
  /** Optional timestamp text (defaults to "now") */
  timestamp?: string
}

export default function BreakSuggestionModal({
  isVisible,
  focusDuration,
  intensityLevel = 'gentle',
  title,
  message,
  subtitle,
  onSnooze,
  onTakeBreak,
  onDismiss,
  showFocusStats = false,
  snoozeText = '5 more min',
  breakText = 'Good idea',
  icon = '/icons/joidu_drop_logo.svg',
  timestamp = 'now'
}: BreakSuggestionModalProps) {
  // Animation state management
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  
  // Handle modal visibility with gentle animations
  useEffect(() => {
    if (isVisible) {
      // Start render, then trigger animation
      setShouldRender(true)
      setTimeout(() => setIsAnimating(true), 10)
    } else {
      // Start exit animation, then stop rendering
      setIsAnimating(false)
      setTimeout(() => setShouldRender(false), 300)
    }
  }, [isVisible])
  
  // Handle escape key dismissal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        onDismiss()
      }
    }
    
    if (isVisible) {
      document.addEventListener('keydown', handleEscapeKey)
      // Don't prevent body scroll - user might want to continue working
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isVisible, onDismiss])
  
  // Focus management - focus the break button (right) to encourage healthy choice
  useEffect(() => {
    if (isVisible) {
      const breakButton = document.querySelector('[data-break-modal="break-button"]') as HTMLButtonElement
      if (breakButton) {
        setTimeout(() => breakButton.focus(), 100)
      }
    }
  }, [isVisible])
  
  // Handle outside click dismissal (less aggressive than other modals)
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onDismiss()
    }
  }
  
  // Handle button actions
  const handleSnoozeAction = () => {
    onSnooze()
    // Modal will be dismissed by parent component
  }
  
  const handleTakeBreakAction = () => {
    onTakeBreak()
    // Modal will be dismissed by parent component
  }
  
  // Get intensity-specific styling
  const getIntensityStyles = () => {
    const styles = {
      gentle: {
        borderColor: '#e2e8f0', // Light gray
        iconFilter: 'none'
      },
      moderate: {
        borderColor: '#fed7aa', // Light orange
        iconFilter: 'brightness(1.1)'
      },
      strong: {
        borderColor: '#fecaca', // Light red
        iconFilter: 'brightness(1.2) saturate(1.1)'
      }
    }
    return styles[intensityLevel]
  }
  
  const intensityStyles = getIntensityStyles()
  
  // Format focus duration for display
  const formatFocusDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      if (remainingMinutes === 0) {
        return `${hours} hour${hours > 1 ? 's' : ''}`
      }
      return `${hours}h ${remainingMinutes}m`
    }
    return `${minutes} minute${minutes > 1 ? 's' : ''}`
  }
  
  // Don't render if modal shouldn't be shown
  if (!shouldRender) {
    return null
  }
  
  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${isAnimating ? '0.4' : '0'})`,
          transition: 'background-color 0.3s ease'
        }}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="break-modal-title"
        aria-describedby="break-modal-message"
        aria-live="polite" // Announces break suggestion to screen readers
      >
        {/* Modal Container */}
        <div
          className="bg-white rounded-2xl p-6 w-full shadow-lg"
          style={{
            maxWidth: '320px',
            minWidth: '280px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            borderTop: `3px solid ${intensityStyles.borderColor}`, // Visual intensity indicator
            transform: `scale(${isAnimating ? '1' : '0.95'}) translateY(${isAnimating ? '0' : '10px'})`,
            opacity: isAnimating ? '1' : '0',
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' // Gentle appearance
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {/* Joidu Logo */}
              <img
                src={icon}
                alt="Joidu"
                className="w-8 h-8"
                style={{ 
                  width: '32px', 
                  height: '32px',
                  filter: intensityStyles.iconFilter
                }}
              />
              {/* App Name */}
              <span
                className="font-medium"
                style={{
                  fontSize: '15px',
                  color: '#4c4c4c'
                }}
              >
                Joidu
              </span>
            </div>
            
            {/* Timestamp */}
            <span
              className="text-sm"
              style={{
                fontSize: '13px',
                color: '#a5a5a5'
              }}
            >
              {timestamp}
            </span>
          </div>
          
          {/* Focus Stats (if enabled) */}
          {showFocusStats && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Focus session:</span>
                <span className="font-semibold text-blue-700">
                  {formatFocusDuration(focusDuration)}
                </span>
              </div>
              {focusDuration >= 60 && (
                <div className="mt-1 text-xs text-gray-500">
                  Extended focus detected - your brain deserves care! 🧠
                </div>
              )}
            </div>
          )}
          
          {/* Break Suggestion Content */}
          <div className="mb-6">
            {/* Title */}
            <h2
              id="break-modal-title"
              className="font-medium mb-3"
              style={{
                fontSize: '17px',
                color: '#4c4c4c',
                lineHeight: '1.4'
              }}
            >
              {title}
            </h2>
            
            {/* Message */}
            <p
              id="break-modal-message"
              style={{
                fontSize: '15px',
                color: '#a5a5a5',
                lineHeight: '1.5'
              }}
            >
              {message}
            </p>
            
            {/* Optional Subtitle */}
            {subtitle && (
              <p
                className="mt-2"
                style={{
                  fontSize: '14px',
                  color: '#9ca3af',
                  fontStyle: 'italic'
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2">
            {/* Left Button (Snooze/Continue) */}
            <button
              data-break-modal="snooze-button"
              onClick={handleSnoozeAction}
              className="font-medium rounded-lg transition-all duration-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
              style={{
                backgroundColor: '#e2e2e2',
                color: '#4c4c4c',
                fontSize: '15px',
                height: '44px',
                width: '48%',
                borderRadius: '8px'
              }}
              aria-label={`Continue working for ${snoozeText.includes('min') ? snoozeText : '5 more minutes'}`}
            >
              {snoozeText}
            </button>
            
            {/* Right Button (Take Break) */}
            <button
              data-break-modal="break-button"
              onClick={handleTakeBreakAction}
              className="font-medium rounded-lg transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300"
              style={{
                backgroundColor: '#fa772c',
                color: 'white',
                fontSize: '15px',
                height: '44px',
                width: '48%',
                borderRadius: '8px'
              }}
              aria-label="Take a break to rest and recharge"
            >
              {breakText}
            </button>
          </div>
          
          {/* Break Benefits Hint */}
          <div className="mt-3 text-center">
            <p
              className="text-xs"
              style={{ color: '#9ca3af' }}
            >
              {intensityLevel === 'gentle' && '💡 Short breaks boost creativity'}
              {intensityLevel === 'moderate' && '⚡ Breaks prevent mental fatigue'}
              {intensityLevel === 'strong' && '🌟 Your wellbeing matters most'}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * BREAK SUGGESTION SYSTEM INTEGRATION GUIDE
 * 
 * This modal should be integrated with focus tracking and activity detection
 * systems to provide intelligent break suggestions that respect user flow.
 * 
 * 1. FOCUS SESSION TRACKING:
 * 
 * Track active work sessions and suggest breaks at appropriate intervals:
 * 
 * const FocusTracker = () => {
 *   const [focusStartTime, setFocusStartTime] = useState(null)
 *   const [lastActivityTime, setLastActivityTime] = useState(Date.now())
 *   
 *   useEffect(() => {
 *     const checkForBreakSuggestion = () => {
 *       const focusDuration = getFocusDurationMinutes()
 *       const timeSinceLastActivity = Date.now() - lastActivityTime
 *       
 *       // Wait for natural break point (no activity for 10+ seconds)
 *       if (timeSinceLastActivity > 10000) {
 *         if (focusDuration >= 30 && !hasShownBreakSuggestion) {
 *           showBreakSuggestion(focusDuration)
 *         }
 *       }
 *     }
 *     
 *     const interval = setInterval(checkForBreakSuggestion, 5000)
 *     return () => clearInterval(interval)
 *   }, [lastActivityTime])
 * }
 * 
 * 2. ACTIVITY DETECTION:
 * 
 * Monitor user activity to find natural break points:
 * 
 * const useActivityDetection = () => {
 *   const [lastActivity, setLastActivity] = useState(Date.now())
 *   
 *   useEffect(() => {
 *     const updateActivity = () => setLastActivity(Date.now())
 *     
 *     // Track various activity types
 *     document.addEventListener('keydown', updateActivity)
 *     document.addEventListener('click', updateActivity)
 *     document.addEventListener('scroll', updateActivity)
 *     
 *     return () => {
 *       document.removeEventListener('keydown', updateActivity)
 *       document.removeEventListener('click', updateActivity)
 *       document.removeEventListener('scroll', updateActivity)
 *     }
 *   }, [])
 *   
 *   return lastActivity
 * }
 * 
 * 3. ESCALATING SUGGESTIONS:
 * 
 * Provide progressively stronger break suggestions:
 * 
 * const getBreakSuggestion = (minutes) => {
 *   if (minutes >= 90) {
 *     return {
 *       intensityLevel: 'strong',
 *       title: 'Your wellbeing matters 💚',
 *       message: '90 minutes of intense focus! Please take a proper break to avoid burnout.',
 *       subtitle: 'Extended hyperfocus can be counterproductive',
 *       showFocusStats: true,
 *       snoozeText: 'Just 2 min',
 *       breakText: 'Yes, I need this'
 *     }
 *   } else if (minutes >= 60) {
 *     return {
 *       intensityLevel: 'strong',
 *       title: 'Your brain needs care 🧠',
 *       message: 'An hour of intense focus! A short break will actually boost your productivity.',
 *       showFocusStats: true
 *     }
 *   } else if (minutes >= 45) {
 *     return {
 *       intensityLevel: 'moderate',
 *       title: 'Time for a break? 🌸',
 *       message: 'You\'ve been focused for 45 minutes. Maybe stretch or grab some water?'
 *     }
 *   } else if (minutes >= 30) {
 *     return {
 *       intensityLevel: 'gentle',
 *       title: 'Maybe a quick pause? ☕',
 *       message: '30 minutes of good focus! A brief break could refresh your mind.'
 *     }
 *   }
 * }
 * 
 * 4. BREAK TIMER INTEGRATION:
 * 
 * When user accepts break suggestion, start a break timer:
 * 
 * const handleTakeBreak = () => {
 *   // Pause focus session
 *   pauseFocusSession()
 *   
 *   // Start break timer (5-15 minutes)
 *   startBreakTimer(10 * 60 * 1000) // 10 minutes
 *   
 *   // Show break activities
 *   showBreakSuggestions([
 *     'Take a walk',
 *     'Stretch your body',
 *     'Hydrate yourself',
 *     'Look out a window',
 *     'Do breathing exercises'
 *   ])
 * }
 * 
 * 5. SMART TIMING LOGIC:
 * 
 * Respect the user's flow state and only suggest breaks at appropriate times:
 * 
 * const shouldSuggestBreak = (focusMinutes, lastActivityTime) => {
 *   // Don't interrupt if user is actively working
 *   const timeSinceActivity = Date.now() - lastActivityTime
 *   if (timeSinceActivity < 8000) return false // Still active
 *   
 *   // Check if it's been long enough since last suggestion
 *   const timeSinceLastSuggestion = Date.now() - lastBreakSuggestionTime
 *   if (timeSinceLastSuggestion < 5 * 60 * 1000) return false // Too soon
 *   
 *   // Check focus duration thresholds
 *   return focusMinutes >= 30
 * }
 * 
 * 6. USER PREFERENCE INTEGRATION:
 * 
 * Allow users to customize break suggestion timing:
 * 
 * const getUserBreakPreferences = () => {
 *   return {
 *     firstSuggestion: 30, // minutes
 *     escalationInterval: 15, // minutes
 *     maxIntensity: 'moderate', // gentle, moderate, strong
 *     enableHyperfocusProtection: true,
 *     snoozeOptions: [2, 5, 10] // minutes
 *   }
 * }
 * 
 * BEST PRACTICES FOR ADHD HYPERFOCUS PROTECTION:
 * 
 * 1. RESPECT FLOW STATE: Never interrupt during active typing or clicking
 * 2. GRADUAL ESCALATION: Start gentle, become more insistent over time
 * 3. CLEAR RATIONALE: Explain why breaks help (creativity, health, productivity)
 * 4. CHOICE PRESERVATION: Always allow user to continue if they want
 * 5. SMART TIMING: Use natural pauses in activity for suggestions
 * 6. BENEFIT FOCUS: Emphasize positive aspects of breaks, not negative consequences
 * 7. CUSTOMIZATION: Let users adjust timing based on their work patterns
 * 8. TRACK EFFECTIVENESS: Learn from user responses to improve suggestions
 * 
 * This break suggestion system helps ADHD users maintain healthy work patterns
 * while respecting their need for deep focus and autonomy in their workflow.
 */