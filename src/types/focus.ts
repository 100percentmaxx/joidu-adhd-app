export interface Break {
  id: string
  startTime: Date
  endTime: Date
  duration: number // minutes
  type: 'auto' | 'manual'
}

export interface SessionStats {
  focusTime: number // minutes
  breakCount: number
  tasksCompleted: number
  startTime: Date
  endTime?: Date
}

export interface FocusSession {
  id: string
  taskTitle: string
  duration: number // minutes
  startTime: Date
  endTime?: Date
  breaks: Break[]
  isCompleted: boolean
  stats: SessionStats
  options: FocusOptions
}

export interface FocusOptions {
  autoBreak: boolean
  breakDuration: number // minutes
  blockDistractions: boolean
  endSound: boolean
}

export interface TimerState {
  timeRemaining: number // seconds
  isActive: boolean
  isPaused: boolean
  sessionId: string | null
  currentSession: FocusSession | null
}

export interface BreakActivity {
  id: string
  label: string
  icon: string
  duration: number // minutes
  description: string
}

export interface TaskStep {
  id: string
  title: string
  description: string
  isCompleted: boolean
  estimatedMinutes: number
}

export type TimerAction = 
  | { type: 'START_TIMER'; payload: FocusSession }
  | { type: 'PAUSE_TIMER' }
  | { type: 'RESUME_TIMER' }
  | { type: 'TICK' }
  | { type: 'COMPLETE_SESSION' }
  | { type: 'CANCEL_SESSION' }
  | { type: 'START_BREAK'; payload: { duration: number } }
  | { type: 'END_BREAK' }

export type EnergyLevel = 'high' | 'medium' | 'low'
export type TimeOfDay = 'morning' | 'afternoon' | 'evening'

export interface EnergyRecommendation {
  duration: number
  reasoning: string
  confidence: number
}