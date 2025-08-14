import { useState, useEffect, useCallback } from 'react'

interface HyperfocusState {
  sessionStartTime: Date | null
  totalFocusTime: number // minutes
  breaksSuggested: number
  breaksAccepted: number
  lastBreakTime: Date | null
  warningShown: boolean
}

const HYPERFOCUS_THRESHOLDS = {
  GENTLE_REMINDER: 25, // minutes
  STRONG_SUGGESTION: 45, // minutes
  URGENT_BREAK: 90, // minutes
  EMERGENCY_STOP: 120 // minutes - for extreme cases
}

export function useHyperfocusProtection() {
  const [state, setState] = useState<HyperfocusState>({
    sessionStartTime: null,
    totalFocusTime: 0,
    breaksSuggested: 0,
    breaksAccepted: 0,
    lastBreakTime: null,
    warningShown: false
  })

  const [currentSuggestion, setCurrentSuggestion] = useState<string | null>(null)
  const [urgencyLevel, setUrgencyLevel] = useState<'none' | 'gentle' | 'strong' | 'urgent' | 'emergency'>('none')

  // Start tracking a focus session
  const startSession = useCallback(() => {
    setState({
      sessionStartTime: new Date(),
      totalFocusTime: 0,
      breaksSuggested: 0,
      breaksAccepted: 0,
      lastBreakTime: null,
      warningShown: false
    })
    setCurrentSuggestion(null)
    setUrgencyLevel('none')
  }, [])

  // Update session time and check thresholds
  useEffect(() => {
    if (!state.sessionStartTime) return

    const interval = setInterval(() => {
      const now = new Date()
      const focusTime = Math.floor((now.getTime() - state.sessionStartTime!.getTime()) / (1000 * 60))
      
      setState(prev => ({ ...prev, totalFocusTime: focusTime }))

      // Check thresholds and update suggestions
      checkHyperfocusThresholds(focusTime)
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [state.sessionStartTime])

  const checkHyperfocusThresholds = useCallback((focusTime: number) => {
    let newUrgency: typeof urgencyLevel = 'none'
    let suggestion: string | null = null

    if (focusTime >= HYPERFOCUS_THRESHOLDS.EMERGENCY_STOP) {
      newUrgency = 'emergency'
      suggestion = "⚠️ EMERGENCY BREAK NEEDED\n\nYou've been focusing for over 2 hours. Your ADHD brain needs rest NOW to prevent burnout. This isn't optional - your wellbeing matters more than any task."
    } else if (focusTime >= HYPERFOCUS_THRESHOLDS.URGENT_BREAK) {
      newUrgency = 'urgent'
      suggestion = "🚨 URGENT: Take a Break!\n\nYou've been hyperfocusing for 90+ minutes. Your brain is running on empty. A 15-minute break will actually make you more productive."
    } else if (focusTime >= HYPERFOCUS_THRESHOLDS.STRONG_SUGGESTION) {
      newUrgency = 'strong'
      suggestion = "💡 Strong Suggestion: Break Time\n\nYou've been focusing for 45+ minutes - that's amazing! Your ADHD brain would benefit from a 10-minute recharge break."
    } else if (focusTime >= HYPERFOCUS_THRESHOLDS.GENTLE_REMINDER) {
      newUrgency = 'gentle'
      suggestion = "💙 Gentle Reminder\n\nYou've been focused for 25 minutes - great job! Consider a short 5-minute break to help your brain reset."
    }

    setUrgencyLevel(newUrgency)
    setCurrentSuggestion(suggestion)

    if (suggestion && newUrgency !== 'none') {
      setState(prev => ({ 
        ...prev, 
        breaksSuggested: prev.breaksSuggested + 1 
      }))
    }
  }, [urgencyLevel])

  // Record when user accepts a break
  const acceptBreak = useCallback((breakDuration: number = 10) => {
    setState(prev => ({
      ...prev,
      breaksAccepted: prev.breaksAccepted + 1,
      lastBreakTime: new Date(),
      warningShown: false
    }))
    setCurrentSuggestion(null)
    setUrgencyLevel('none')

    // Log the successful break intervention
    const breakData = {
      timestamp: new Date().toISOString(),
      focusTimeBeforeBreak: state.totalFocusTime,
      breakDuration,
      urgencyLevel
    }
    
    if (typeof window !== 'undefined') {
      const breakHistory = JSON.parse(localStorage.getItem('break-history') || '[]')
      breakHistory.push(breakData)
      localStorage.setItem('break-history', JSON.stringify(breakHistory.slice(-50))) // Keep last 50
    }
  }, [state.totalFocusTime, urgencyLevel])

  // Dismiss suggestion (track for learning)
  const dismissSuggestion = useCallback(() => {
    const dismissalData = {
      timestamp: new Date().toISOString(),
      focusTime: state.totalFocusTime,
      urgencyLevel,
      dismissed: true
    }
    
    if (typeof window !== 'undefined') {
      const dismissHistory = JSON.parse(localStorage.getItem('dismissal-history') || '[]')
      dismissHistory.push(dismissalData)
      localStorage.setItem('dismissal-history', JSON.stringify(dismissHistory.slice(-50)))
    }

    setCurrentSuggestion(null)
    setState(prev => ({ ...prev, warningShown: true }))
  }, [state.totalFocusTime, urgencyLevel])

  // End the current session
  const endSession = useCallback(() => {
    // Record session data for analysis
    if (state.sessionStartTime) {
      const sessionData = {
        timestamp: new Date().toISOString(),
        duration: state.totalFocusTime,
        breaksSuggested: state.breaksSuggested,
        breaksAccepted: state.breaksAccepted,
        completedNaturally: true,
        finalUrgencyLevel: urgencyLevel
      }
      
      if (typeof window !== 'undefined') {
        const sessionHistory = JSON.parse(localStorage.getItem('session-history') || '[]')
        sessionHistory.push(sessionData)
        localStorage.setItem('session-history', JSON.stringify(sessionHistory.slice(-100))) // Keep last 100
      }
    }

    setState({
      sessionStartTime: null,
      totalFocusTime: 0,
      breaksSuggested: 0,
      breaksAccepted: 0,
      lastBreakTime: null,
      warningShown: false
    })
    setCurrentSuggestion(null)
    setUrgencyLevel('none')
  }, [state, urgencyLevel])

  // Get personalized break suggestions based on focus time
  const getBreakSuggestions = useCallback(() => {
    const suggestions = []
    
    if (state.totalFocusTime < 30) {
      suggestions.push(
        { id: 'water', label: 'Drink Water', duration: 2, icon: '💧' },
        { id: 'stretch', label: 'Quick Stretch', duration: 3, icon: '🤸' },
        { id: 'breathe', label: 'Deep Breaths', duration: 5, icon: '🫁' }
      )
    } else if (state.totalFocusTime < 60) {
      suggestions.push(
        { id: 'walk', label: 'Short Walk', duration: 10, icon: '🚶' },
        { id: 'snack', label: 'Healthy Snack', duration: 5, icon: '🍎' },
        { id: 'nature', label: 'Look Outside', duration: 5, icon: '🌱' }
      )
    } else {
      suggestions.push(
        { id: 'meal', label: 'Eat Something', duration: 15, icon: '🥗' },
        { id: 'nap', label: 'Power Nap', duration: 20, icon: '😴' },
        { id: 'fresh-air', label: 'Go Outside', duration: 15, icon: '🌤️' }
      )
    }

    return suggestions
  }, [state.totalFocusTime])

  // Get encouraging message based on break acceptance rate
  const getEncouragementMessage = useCallback(() => {
    const acceptanceRate = state.breaksSuggested > 0 
      ? state.breaksAccepted / state.breaksSuggested 
      : 1

    if (acceptanceRate > 0.7) {
      return "You're doing great at taking care of your ADHD brain! 🌟"
    } else if (acceptanceRate > 0.4) {
      return "Remember: breaks aren't weakness, they're brain maintenance! 💙"
    } else {
      return "Your brain is precious. Please consider taking that break. 💭"
    }
  }, [state.breaksSuggested, state.breaksAccepted])

  return {
    isActive: state.sessionStartTime !== null,
    totalFocusTime: state.totalFocusTime,
    currentSuggestion,
    urgencyLevel,
    breaksSuggested: state.breaksSuggested,
    breaksAccepted: state.breaksAccepted,
    acceptanceRate: state.breaksSuggested > 0 ? state.breaksAccepted / state.breaksSuggested : 0,
    startSession,
    endSession,
    acceptBreak,
    dismissSuggestion,
    getBreakSuggestions,
    encouragementMessage: getEncouragementMessage(),
    // Helper functions
    getUrgencyColor: () => {
      switch (urgencyLevel) {
        case 'gentle': return '#a8e2bb'
        case 'strong': return '#f7e98e'  
        case 'urgent': return '#f4b7ae'
        case 'emergency': return '#ff6b6b'
        default: return '#2847ef'
      }
    }
  }
}