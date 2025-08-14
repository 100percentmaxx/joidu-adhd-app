export interface Habit {
  id: string
  name: string
  category: CategoryType
  frequency: FrequencyType
  targetTime?: string
  steps: RoutineStep[]
  createdAt: Date
  isActive: boolean
  settings: HabitSettings
  currentStreak: number
  totalCompleted: number
}

export interface RoutineStep {
  id: string
  order: number
  description: string
  estimatedMinutes?: number
  isCompleted: boolean
  completedAt?: Date
  difficulty?: 'normal' | 'important' | 'challenging'
}

export interface HabitProgress {
  habitId: string
  date: Date
  stepsCompleted: number
  totalSteps: number
  isCompleted: boolean
  skipped: boolean
  completedSteps: string[] // IDs of completed steps
}

export interface HabitSettings {
  reminder: boolean
  reminderTime?: string
  trackStreaks: boolean
  flexibleScheduling: boolean
}

export type CategoryType = 'work' | 'health' | 'personal' | 'social' | 'creative' | 'finance'
export type FrequencyType = 'daily' | 'weekdays' | 'threePerWeek' | 'custom'

export interface CategoryConfig {
  name: string
  icon: string
  lightColor: string
  darkColor: string
}

export const CATEGORY_CONFIGS: Record<CategoryType, CategoryConfig> = {
  work: {
    name: 'Work',
    icon: 'work.svg',
    lightColor: '#f9dac5',
    darkColor: '#f9c075'
  },
  health: {
    name: 'Health',
    icon: 'health.svg',
    lightColor: '#ddede3',
    darkColor: '#a8e2bb'
  },
  personal: {
    name: 'Personal',
    icon: 'personal.svg',
    lightColor: '#cae9ef',
    darkColor: '#98e1ea'
  },
  social: {
    name: 'Social',
    icon: 'social.svg',
    lightColor: '#e6e1f4',
    darkColor: '#c8bfef'
  },
  creative: {
    name: 'Creative',
    icon: 'creative.svg',
    lightColor: '#f2d3d1',
    darkColor: '#f4b7ae'
  },
  finance: {
    name: 'Finance',
    icon: 'finance.svg',
    lightColor: '#f7e98e',
    darkColor: '#f4d03f'
  }
}

export interface HabitSuggestion {
  id: string
  title: string
  description: string
  category: CategoryType
  estimatedMinutes: number
  steps: string[]
  icon: string
}

export const HABIT_SUGGESTIONS: HabitSuggestion[] = [
  {
    id: 'drink-water',
    title: 'Drink water when you wake up',
    description: 'Start your day hydrated',
    category: 'health',
    estimatedMinutes: 1,
    steps: ['Get a glass of water', 'Drink slowly'],
    icon: 'drink_water.svg'
  },
  {
    id: 'morning-meditation',
    title: '5-Minute morning meditation',
    description: 'Center yourself before the day begins',
    category: 'health',
    estimatedMinutes: 5,
    steps: ['Find a quiet spot', 'Set timer for 5 minutes', 'Focus on breathing'],
    icon: 'calm.svg'
  }
]