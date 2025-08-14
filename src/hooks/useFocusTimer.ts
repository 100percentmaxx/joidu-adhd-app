import { useReducer, useEffect, useCallback } from 'react'
import { TimerState, TimerAction, FocusSession } from '@/types/focus'

const initialState: TimerState = {
  timeRemaining: 0,
  isActive: false,
  isPaused: false,
  sessionId: null,
  currentSession: null
}

function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case 'START_TIMER':
      return {
        ...state,
        timeRemaining: action.payload.duration * 60, // convert minutes to seconds
        isActive: true,
        isPaused: false,
        sessionId: action.payload.id,
        currentSession: action.payload
      }
    
    case 'PAUSE_TIMER':
      return {
        ...state,
        isPaused: true,
        isActive: false
      }
    
    case 'RESUME_TIMER':
      return {
        ...state,
        isPaused: false,
        isActive: true
      }
    
    case 'TICK':
      if (!state.isActive || state.isPaused) return state
      
      const newTimeRemaining = Math.max(0, state.timeRemaining - 1)
      
      return {
        ...state,
        timeRemaining: newTimeRemaining
      }
    
    case 'COMPLETE_SESSION':
      return {
        ...state,
        isActive: false,
        isPaused: false,
        timeRemaining: 0,
        currentSession: state.currentSession ? {
          ...state.currentSession,
          isCompleted: true,
          endTime: new Date()
        } : null
      }
    
    case 'CANCEL_SESSION':
      return initialState
    
    case 'START_BREAK':
      return {
        ...state,
        timeRemaining: action.payload.duration * 60,
        isActive: true,
        isPaused: false
      }
    
    case 'END_BREAK':
      return {
        ...state,
        isActive: false,
        isPaused: false
      }
    
    default:
      return state
  }
}

export function useFocusTimer() {
  const [state, dispatch] = useReducer(timerReducer, initialState)

  // Timer tick effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (state.isActive && !state.isPaused) {
      interval = setInterval(() => {
        dispatch({ type: 'TICK' })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [state.isActive, state.isPaused])

  // Auto-complete when timer reaches zero
  useEffect(() => {
    if (state.timeRemaining === 0 && state.isActive) {
      dispatch({ type: 'COMPLETE_SESSION' })
    }
  }, [state.timeRemaining, state.isActive])

  // Auto-save session progress
  useEffect(() => {
    if (state.currentSession && state.isActive) {
      const interval = setInterval(() => {
        // Save to localStorage or sync to backend
        localStorage.setItem('focus-session', JSON.stringify({
          ...state.currentSession,
          timeRemaining: state.timeRemaining
        }))
      }, 30000) // Auto-save every 30 seconds

      return () => clearInterval(interval)
    }
  }, [state.currentSession, state.isActive, state.timeRemaining])

  const startTimer = useCallback((session: FocusSession) => {
    dispatch({ type: 'START_TIMER', payload: session })
  }, [])

  const pauseTimer = useCallback(() => {
    dispatch({ type: 'PAUSE_TIMER' })
  }, [])

  const resumeTimer = useCallback(() => {
    dispatch({ type: 'RESUME_TIMER' })
  }, [])

  const cancelTimer = useCallback(() => {
    dispatch({ type: 'CANCEL_SESSION' })
    localStorage.removeItem('focus-session')
  }, [])

  const startBreak = useCallback((duration: number) => {
    dispatch({ type: 'START_BREAK', payload: { duration } })
  }, [])

  const endBreak = useCallback(() => {
    dispatch({ type: 'END_BREAK' })
  }, [])

  // Format time for display (MM:SS)
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, [])

  // Calculate progress percentage
  const progress = useCallback(() => {
    if (!state.currentSession) return 0
    const totalSeconds = state.currentSession.duration * 60
    const elapsed = totalSeconds - state.timeRemaining
    return Math.min(100, (elapsed / totalSeconds) * 100)
  }, [state.currentSession, state.timeRemaining])

  return {
    state,
    startTimer,
    pauseTimer,
    resumeTimer,
    cancelTimer,
    startBreak,
    endBreak,
    formatTime,
    progress,
    timeDisplay: formatTime(state.timeRemaining)
  }
}