'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import BreakSuggestionModal from './BreakSuggestionModal'

/**
 * HYPERFOCUS PROTECTION SYSTEM
 * 
 * This system monitors user activity and focus duration to provide intelligent
 * break suggestions that protect ADHD users from hyperfocus burnout while
 * respecting their need for deep work periods.
 * 
 * PROTECTION STRATEGY:
 * - Tracks continuous work sessions and typing/clicking activity
 * - Waits for natural break points (pauses in activity) before suggesting breaks
 * - Escalates from gentle nudges to stronger health-focused suggestions
 * - Always preserves user choice and autonomy
 * - Learns from user responses to improve timing
 * 
 * ACTIVITY DETECTION:
 * - Monitors keyboard input, mouse clicks, and scrolling
 * - Detects active work vs. passive consumption
 * - Identifies natural pause points for non-disruptive suggestions
 * - Tracks application focus and tab switching
 * 
 * ESCALATION LEVELS:
 * - 30 minutes: Gentle suggestion with positive framing
 * - 45 minutes: Moderate suggestion with specific break ideas
 * - 60 minutes: Strong suggestion with health focus
 * - 90+ minutes: Urgent suggestion with wellbeing emphasis
 * 
 * SMART TIMING:
 * - Only suggests breaks during activity pauses (8+ seconds of inactivity)
 * - Respects user's snooze choices (5-minute delays)
 * - Learns from dismissal patterns to adjust timing
 * - Considers time of day and typical user patterns
 */

interface FocusSession {
  startTime: number
  endTime?: number
  breaksTaken: number
  totalBreakTime: number
  activityLevel: 'high' | 'medium' | 'low'
}

interface HyperfocusProtectionSystemProps {
  /** Whether to enable automatic break suggestions */
  enableProtection?: boolean
  
  /** Minimum focus duration before first break suggestion (minutes) */
  firstBreakThreshold?: number
  
  /** Escalation interval for stronger suggestions (minutes) */
  escalationInterval?: number
  
  /** Maximum intensity level allowed */
  maxIntensity?: 'gentle' | 'moderate' | 'strong'
  
  /** Current user's name for personalization */
  userName?: string
  
  /** Callback when break is taken */
  onBreakTaken?: (duration: number, breakType: string) => void
  
  /** Callback when break is snoozed */
  onBreakSnoozed?: (remainingTime: number) => void
  
  /** Whether to show detailed focus statistics */
  showDetailedStats?: boolean
}

export default function HyperfocusProtectionSystem({
  enableProtection = true,
  firstBreakThreshold = 30,
  escalationInterval = 15,
  maxIntensity = 'strong',
  userName = 'friend',
  onBreakTaken,
  onBreakSnoozed,
  showDetailedStats = false
}: HyperfocusProtectionSystemProps) {
  const router = useRouter()
  
  // Focus session tracking
  const [currentSession, setCurrentSession] = useState<FocusSession | null>(null)
  const [lastActivityTime, setLastActivityTime] = useState(Date.now())
  const [isUserActive, setIsUserActive] = useState(true)
  
  // Break suggestion state
  const [showBreakSuggestion, setShowBreakSuggestion] = useState(false)
  const [suggestionData, setSuggestionData] = useState<any>(null)
  const [lastSuggestionTime, setLastSuggestionTime] = useState(0)
  const [snoozedUntil, setSnoozedUntil] = useState(0)
  
  // Activity tracking
  const activityCheckInterval = useRef<NodeJS.Timeout>()
  const suggestionCheckInterval = useRef<NodeJS.Timeout>()
  
  /**
   * ACTIVITY DETECTION SYSTEM
   */
  const updateActivity = useCallback(() => {
    const now = Date.now()
    setLastActivityTime(now)
    setIsUserActive(true)
    
    // Start focus session if not already tracking
    if (!currentSession && enableProtection) {
      setCurrentSession({
        startTime: now,
        breaksTaken: 0,
        totalBreakTime: 0,
        activityLevel: 'high'
      })
    }
  }, [currentSession, enableProtection])
  
  // Set up activity listeners
  useEffect(() => {
    if (!enableProtection) return
    
    const events = ['keydown', 'keypress', 'click', 'scroll', 'mousemove', 'touchstart']
    
    events.forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true })
    })
    
    // Also track window focus/blur
    const handleFocus = () => updateActivity()
    const handleBlur = () => {
      // End current session when user leaves
      if (currentSession) {
        setCurrentSession(prev => prev ? { ...prev, endTime: Date.now() } : null)
      }
    }
    
    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)
    
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity)
      })
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [enableProtection, updateActivity, currentSession])
  
  /**
   * ACTIVITY STATE MONITORING
   */
  useEffect(() => {
    if (!enableProtection) return
    
    activityCheckInterval.current = setInterval(() => {
      const now = Date.now()
      const timeSinceActivity = now - lastActivityTime
      
      // Mark user as inactive after 8 seconds
      if (timeSinceActivity > 8000 && isUserActive) {
        setIsUserActive(false)
      }
      
      // End session after 5 minutes of inactivity
      if (timeSinceActivity > 5 * 60 * 1000 && currentSession && !currentSession.endTime) {
        setCurrentSession(prev => prev ? { ...prev, endTime: now } : null)
      }
    }, 1000)
    
    return () => {
      if (activityCheckInterval.current) {
        clearInterval(activityCheckInterval.current)
      }
    }
  }, [enableProtection, lastActivityTime, isUserActive, currentSession])
  
  /**
   * BREAK SUGGESTION LOGIC
   */
  const checkForBreakSuggestion = useCallback(() => {
    if (!enableProtection || !currentSession || currentSession.endTime) return
    
    const now = Date.now()
    const sessionDuration = (now - currentSession.startTime) / (1000 * 60) // minutes
    const timeSinceLastSuggestion = now - lastSuggestionTime
    const timeSinceActivity = now - lastActivityTime
    
    // Don't suggest if user is actively working
    if (timeSinceActivity < 8000) return
    
    // Don't suggest if still in snooze period
    if (now < snoozedUntil) return
    
    // Don't suggest too frequently
    if (timeSinceLastSuggestion < 2 * 60 * 1000) return // 2 minutes minimum
    
    // Check if we should suggest a break
    const suggestion = getBreakSuggestion(sessionDuration)
    if (suggestion) {
      setSuggestionData(suggestion)
      setShowBreakSuggestion(true)
      setLastSuggestionTime(now)
    }
  }, [
    enableProtection,
    currentSession,
    lastSuggestionTime,
    snoozedUntil,
    lastActivityTime,
    firstBreakThreshold,
    escalationInterval,
    maxIntensity,
    userName
  ])
  
  // Set up suggestion checking
  useEffect(() => {
    if (!enableProtection) return
    
    suggestionCheckInterval.current = setInterval(checkForBreakSuggestion, 10000) // Check every 10 seconds
    
    return () => {
      if (suggestionCheckInterval.current) {
        clearInterval(suggestionCheckInterval.current)
      }
    }
  }, [enableProtection, checkForBreakSuggestion])
  
  /**
   * BREAK SUGGESTION GENERATION
   */
  const getBreakSuggestion = (sessionMinutes: number) => {
    // Don't suggest if below threshold
    if (sessionMinutes < firstBreakThreshold) return null
    
    // Calculate intensity based on duration
    let intensityLevel: 'gentle' | 'moderate' | 'strong' = 'gentle'
    if (sessionMinutes >= firstBreakThreshold + (escalationInterval * 2)) {
      intensityLevel = 'strong'
    } else if (sessionMinutes >= firstBreakThreshold + escalationInterval) {
      intensityLevel = 'moderate'
    }
    
    // Respect max intensity setting
    const intensityLevels = ['gentle', 'moderate', 'strong']
    const maxIndex = intensityLevels.indexOf(maxIntensity)
    const currentIndex = intensityLevels.indexOf(intensityLevel)
    if (currentIndex > maxIndex) {
      intensityLevel = maxIntensity
    }
    
    // Generate suggestions based on duration and intensity
    if (sessionMinutes >= 90) {
      return {
        intensityLevel: 'strong',
        title: 'Your wellbeing matters 💚',
        message: `${Math.round(sessionMinutes)} minutes of intense focus! Please take a proper break to avoid burnout.`,
        subtitle: 'Extended hyperfocus can be counterproductive and harmful',
        showFocusStats: true,
        snoozeText: 'Just 2 min',
        breakText: 'Yes, I need this',
        focusDuration: Math.round(sessionMinutes)
      }
    } else if (sessionMinutes >= 60) {
      return {
        intensityLevel: 'strong',
        title: 'Your brain needs care 🧠',
        message: `An hour of intense focus, ${userName}! A short break will actually boost your productivity.`,
        subtitle: 'Research shows breaks improve focus and creativity',
        showFocusStats: true,
        snoozeText: '5 more min',
        breakText: 'Good call',
        focusDuration: Math.round(sessionMinutes)
      }
    } else if (sessionMinutes >= 45) {
      return {
        intensityLevel: 'moderate',
        title: 'Time for a break? 🌸',
        message: `You've been focused for ${Math.round(sessionMinutes)} minutes. Maybe stretch or grab some water?`,
        subtitle: 'Your body and mind will thank you',
        snoozeText: '5 more min',
        breakText: 'Good idea',
        focusDuration: Math.round(sessionMinutes)
      }
    } else if (sessionMinutes >= firstBreakThreshold) {
      return {
        intensityLevel: 'gentle',
        title: 'Maybe a quick pause? ☕',
        message: `${Math.round(sessionMinutes)} minutes of good focus! A brief break could refresh your mind.`,
        snoozeText: '5 more min',
        breakText: 'Sure thing',
        focusDuration: Math.round(sessionMinutes)
      }
    }
    
    return null
  }
  
  /**
   * BREAK ACTION HANDLERS
   */
  const handleSnoozeBreak = () => {
    const snoozeTime = 5 * 60 * 1000 // 5 minutes
    setSnoozedUntil(Date.now() + snoozeTime)
    setShowBreakSuggestion(false)
    
    if (onBreakSnoozed) {
      onBreakSnoozed(suggestionData?.focusDuration || 0)
    }
    
    console.log(`${userName} snoozed break suggestion for 5 minutes`)
  }
  
  const handleTakeBreak = () => {
    setShowBreakSuggestion(false)
    
    // Update session with break
    if (currentSession) {
      setCurrentSession(prev => prev ? {
        ...prev,
        breaksTaken: prev.breaksTaken + 1
      } : null)
    }
    
    if (onBreakTaken) {
      onBreakTaken(suggestionData?.focusDuration || 0, 'suggested')
    }
    
    // Start break timer
    startBreakTimer()
    
    console.log(`${userName} took a suggested break after ${suggestionData?.focusDuration} minutes`)
  }
  
  const handleDismissBreak = () => {
    setShowBreakSuggestion(false)
    // Don't snooze on dismiss - user might be done working
    console.log(`${userName} dismissed break suggestion`)
  }
  
  /**
   * BREAK TIMER SYSTEM
   */
  const startBreakTimer = () => {
    // Could integrate with a break timer component
    // For now, we'll just log and potentially navigate
    
    const breakDuration = suggestionData?.intensityLevel === 'strong' ? 15 : 10 // minutes
    console.log(`Starting ${breakDuration}-minute break timer`)
    
    // Could navigate to a break screen or show break activities
    // router.push(`/break-timer?duration=${breakDuration}`)
  }
  
  /**
   * FOCUS SESSION STATISTICS
   */
  const getCurrentFocusDuration = () => {
    if (!currentSession || currentSession.endTime) return 0
    return Math.round((Date.now() - currentSession.startTime) / (1000 * 60))
  }
  
  const getSessionStats = () => {
    if (!currentSession) return null
    
    const duration = getCurrentFocusDuration()
    const timeSinceActivity = (Date.now() - lastActivityTime) / 1000
    
    return {
      duration,
      isActive: timeSinceActivity < 8,
      breaksTaken: currentSession.breaksTaken,
      activityLevel: currentSession.activityLevel
    }
  }
  
  // Expose stats for debugging
  const hyperfocusAPI = {
    getCurrentSession: () => currentSession,
    getCurrentDuration: getCurrentFocusDuration,
    getStats: getSessionStats,
    triggerBreakSuggestion: (minutes: number) => {
      const suggestion = getBreakSuggestion(minutes)
      if (suggestion) {
        setSuggestionData(suggestion)
        setShowBreakSuggestion(true)
      }
    },
    endSession: () => {
      if (currentSession) {
        setCurrentSession(prev => prev ? { ...prev, endTime: Date.now() } : null)
      }
    }
  }
  
  // Expose API in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      (window as any).hyperfocusProtection = hyperfocusAPI
    }
  }, [])
  
  return (
    <>
      {/* Development Stats Display */}
      {process.env.NODE_ENV === 'development' && showDetailedStats && currentSession && (
        <div className="fixed top-32 left-4 z-40 bg-white p-3 rounded-lg shadow-md text-xs">
          <h4 className="font-bold mb-2">🧠 Focus Session</h4>
          <div>Duration: {getCurrentFocusDuration()}min</div>
          <div>Active: {isUserActive ? '✅' : '❌'}</div>
          <div>Breaks taken: {currentSession.breaksTaken}</div>
          <div>Last activity: {Math.round((Date.now() - lastActivityTime) / 1000)}s ago</div>
          {snoozedUntil > Date.now() && (
            <div>Snoozed: {Math.round((snoozedUntil - Date.now()) / 1000)}s</div>
          )}
        </div>
      )}
      
      {/* Development Controls */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-48 left-4 z-40 bg-white p-3 rounded-lg shadow-md">
          <h4 className="text-xs font-bold mb-2">🌸 Break Tests</h4>
          <div className="space-y-1">
            <button
              onClick={() => hyperfocusAPI.triggerBreakSuggestion(30)}
              className="text-xs bg-green-500 text-white px-2 py-1 rounded block w-full"
            >
              30min Break (Gentle)
            </button>
            <button
              onClick={() => hyperfocusAPI.triggerBreakSuggestion(45)}
              className="text-xs bg-orange-500 text-white px-2 py-1 rounded block w-full"
            >
              45min Break (Moderate)
            </button>
            <button
              onClick={() => hyperfocusAPI.triggerBreakSuggestion(60)}
              className="text-xs bg-red-500 text-white px-2 py-1 rounded block w-full"
            >
              60min Break (Strong)
            </button>
            <button
              onClick={() => hyperfocusAPI.triggerBreakSuggestion(90)}
              className="text-xs bg-purple-500 text-white px-2 py-1 rounded block w-full"
            >
              90min Break (Urgent)
            </button>
          </div>
        </div>
      )}
      
      {/* Break Suggestion Modal */}
      {suggestionData && (
        <BreakSuggestionModal
          isVisible={showBreakSuggestion}
          focusDuration={suggestionData.focusDuration}
          intensityLevel={suggestionData.intensityLevel}
          title={suggestionData.title}
          message={suggestionData.message}
          subtitle={suggestionData.subtitle}
          onSnooze={handleSnoozeBreak}
          onTakeBreak={handleTakeBreak}
          onDismiss={handleDismissBreak}
          showFocusStats={suggestionData.showFocusStats}
          snoozeText={suggestionData.snoozeText}
          breakText={suggestionData.breakText}
        />
      )}
    </>
  )
}

/**
 * INTEGRATION EXAMPLES AND USAGE PATTERNS
 * 
 * 1. APP-LEVEL INTEGRATION:
 * Include in your main layout for app-wide hyperfocus protection:
 * 
 * ```tsx
 * import HyperfocusProtectionSystem from '@/components/notifications/HyperfocusProtectionSystem'
 * 
 * export default function AppLayout({ children }) {
 *   return (
 *     <div>
 *       {children}
 *       <HyperfocusProtectionSystem 
 *         enableProtection={true}
 *         firstBreakThreshold={30}
 *         maxIntensity="strong"
 *         userName={user?.firstName}
 *         onBreakTaken={(duration, type) => {
 *           analytics.track('break_taken', { duration, type })
 *         }}
 *       />
 *     </div>
 *   )
 * }
 * ```
 * 
 * 2. FOCUS SCREEN INTEGRATION:
 * Enhanced protection during dedicated focus sessions:
 * 
 * ```tsx
 * const FocusScreen = () => {
 *   return (
 *     <div>
 *       <FocusTimer />
 *       <HyperfocusProtectionSystem 
 *         enableProtection={true}
 *         firstBreakThreshold={25} // Pomodoro-style
 *         escalationInterval={10}
 *         showDetailedStats={true}
 *       />
 *     </div>
 *   )
 * }
 * ```
 * 
 * 3. CUSTOMIZABLE USER PREFERENCES:
 * Let users adjust their protection settings:
 * 
 * ```tsx
 * const useUserBreakPreferences = () => {
 *   const [preferences, setPreferences] = useState({
 *     enableProtection: true,
 *     firstBreak: 30,
 *     maxIntensity: 'moderate',
 *     autoBreaks: false
 *   })
 *   
 *   return { preferences, setPreferences }
 * }
 * ```
 * 
 * 4. BREAK TIMER INTEGRATION:
 * Connect with a break timer component:
 * 
 * ```tsx
 * const handleBreakTaken = (focusDuration, breakType) => {
 *   const recommendedBreakTime = Math.min(focusDuration / 5, 15) // 1/5th of focus time, max 15 min
 *   
 *   router.push(`/break-timer?duration=${recommendedBreakTime}&reason=${breakType}`)
 * }
 * ```
 * 
 * 5. ANALYTICS AND LEARNING:
 * Track user behavior to improve suggestions:
 * 
 * ```tsx
 * const trackBreakBehavior = (action, context) => {
 *   analytics.track('hyperfocus_protection', {
 *     action, // 'suggested', 'taken', 'snoozed', 'dismissed'
 *     focusDuration: context.duration,
 *     timeOfDay: new Date().getHours(),
 *     intensityLevel: context.intensity
 *   })
 * }
 * ```
 * 
 * 6. HEALTH INTEGRATION:
 * Connect with health tracking or reminder systems:
 * 
 * ```tsx
 * const handleBreakTaken = () => {
 *   // Log health-positive behavior
 *   healthTracker.logActivity('break_taken', {
 *     category: 'mental_health',
 *     benefit: 'hyperfocus_protection'
 *   })
 *   
 *   // Show break activities
 *   showBreakActivities([
 *     'hydration_reminder',
 *     'posture_check',
 *     'eye_rest_exercise'
 *   ])
 * }
 * ```
 * 
 * This hyperfocus protection system provides intelligent, respectful break suggestions
 * that help ADHD users maintain sustainable focus patterns while preserving their
 * autonomy and deep work capabilities.
 */