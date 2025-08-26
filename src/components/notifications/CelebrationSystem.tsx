'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import CelebrationModal from './CelebrationModal'

/**
 * CELEBRATION SYSTEM COMPONENT
 * 
 * This system automatically detects and celebrates user achievements throughout the Joidu app.
 * It's designed specifically for ADHD users who need extra recognition and positive reinforcement
 * for their accomplishments, no matter how small.
 * 
 * ACHIEVEMENT DETECTION:
 * - Task completions (single, multiple, daily goals)
 * - Habit streaks (3, 7, 14, 30+ day milestones)
 * - Focus session completions (time-based achievements)
 * - Weekly/monthly progress reviews
 * - Personal bests and breakthrough moments
 * 
 * CELEBRATION PHILOSOPHY:
 * - Every achievement deserves recognition
 * - Immediate positive feedback for dopamine boost
 * - Effort recognition, not just results
 * - Choice between savoring the moment vs building momentum
 * - Respectful auto-dismiss to not overwhelm
 * 
 * INTEGRATION:
 * Include this component at the app level or in specific screens where
 * achievements are likely to occur (tasks, habits, focus sessions).
 */

interface Achievement {
  id: string
  type: 'task' | 'streak' | 'focus' | 'milestone' | 'breakthrough'
  title: string
  message: string
  leftButtonText: string
  rightButtonText: string
  showConfetti: boolean
  autoDismissDelay?: number
  data?: any // Additional context data
}

interface CelebrationSystemProps {
  /** Whether to enable automatic achievement detection */
  enableAutoDetection?: boolean
  
  /** Current user's name for personalization */
  userName?: string
  
  /** Current route/screen for context-aware celebrations */
  currentRoute?: string
  
  /** Manual trigger for external achievement events */
  externalAchievement?: Achievement | null
  
  /** Callback when celebration actions are taken */
  onCelebrationAction?: (action: 'celebrate' | 'momentum', achievement: Achievement) => void
}

export default function CelebrationSystem({
  enableAutoDetection = true,
  userName = 'friend',
  currentRoute = '/',
  externalAchievement = null,
  onCelebrationAction
}: CelebrationSystemProps) {
  const router = useRouter()
  
  // Celebration state
  const [showCelebration, setShowCelebration] = useState(false)
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null)
  
  // Achievement tracking
  const [taskStreak, setTaskStreak] = useState(0)
  const [dailyTaskCount, setDailyTaskCount] = useState(0)
  const [focusSessionCount, setFocusSessionCount] = useState(0)
  
  /**
   * EXTERNAL ACHIEVEMENT HANDLER
   * Handles achievements triggered from other components
   */
  useEffect(() => {
    if (externalAchievement) {
      triggerCelebration(externalAchievement)
    }
  }, [externalAchievement])
  
  /**
   * ACHIEVEMENT DETECTION FUNCTIONS
   */
  
  // Task completion achievements
  const checkTaskAchievements = useCallback((completedTasks: number, isStreakDay: boolean) => {
    const achievements: Achievement[] = []
    
    // Daily task milestones
    if (completedTasks === 1) {
      achievements.push({
        id: 'first-task',
        type: 'task',
        title: "Great start! 🌅",
        message: `First task of the day complete! You're setting the tone for success.`,
        leftButtonText: "Feels good",
        rightButtonText: "Next one!",
        showConfetti: false
      })
    } else if (completedTasks === 3) {
      achievements.push({
        id: 'three-tasks',
        type: 'task',
        title: "You're unstoppable! 🔥",
        message: `3 tasks crushed today! Your momentum is incredible. Ready to tackle one more?`,
        leftButtonText: "Celebrate first",
        rightButtonText: "Let's go!",
        showConfetti: true
      })
    } else if (completedTasks === 5) {
      achievements.push({
        id: 'five-tasks',
        type: 'milestone',
        title: "Productivity champion! 🏆",
        message: `5 tasks completed! ${userName}, you're absolutely crushing it today!`,
        leftButtonText: "Savor this",
        rightButtonText: "I'm on fire!",
        showConfetti: true,
        autoDismissDelay: 10000
      })
    }
    
    // Streak achievements
    if (isStreakDay && taskStreak > 0) {
      if (taskStreak === 3) {
        achievements.push({
          id: 'streak-3',
          type: 'streak',
          title: "3-day streak! 🔥",
          message: "Three days of consistency! You're building an incredible habit.",
          leftButtonText: "So proud",
          rightButtonText: "Keep building",
          showConfetti: true
        })
      } else if (taskStreak === 7) {
        achievements.push({
          id: 'streak-7',
          type: 'streak',
          title: "One week strong! 🌟",
          message: "7 days of task completion! This habit is becoming second nature.",
          leftButtonText: "Amazing feeling",
          rightButtonText: "Two weeks next?",
          showConfetti: true,
          autoDismissDelay: 12000
        })
      } else if (taskStreak >= 30) {
        achievements.push({
          id: 'streak-30',
          type: 'breakthrough',
          title: "30-day legend! 🚀",
          message: `${taskStreak} days of unstoppable momentum! You've transformed your life!`,
          leftButtonText: "I'm incredible",
          rightButtonText: "What's next?",
          showConfetti: true,
          autoDismissDelay: 15000
        })
      }
    }
    
    // Trigger the first achievement (prioritize streaks over daily tasks)
    const prioritizedAchievement = achievements.find(a => a.type === 'streak' || a.type === 'breakthrough') || achievements[0]
    if (prioritizedAchievement) {
      triggerCelebration(prioritizedAchievement)
    }
  }, [userName, taskStreak])
  
  // Focus session achievements
  const checkFocusAchievements = useCallback((sessionMinutes: number, totalSessions: number) => {
    if (sessionMinutes >= 25) {
      triggerCelebration({
        id: 'focus-pomodoro',
        type: 'focus',
        title: "Focus master! 🧘‍♀️",
        message: `${sessionMinutes} minutes of deep focus! Your brain deserves major recognition.`,
        leftButtonText: "Take a break",
        rightButtonText: "Another round?",
        showConfetti: sessionMinutes >= 45,
        data: { sessionMinutes, totalSessions }
      })
    }
    
    if (totalSessions === 3) {
      triggerCelebration({
        id: 'focus-three-sessions',
        type: 'milestone',
        title: "Triple focus! 🎯",
        message: "Three focus sessions today! Your concentration skills are incredible.",
        leftButtonText: "Well deserved",
        rightButtonText: "More focus?",
        showConfetti: true,
        autoDismissDelay: 10000
      })
    }
  }, [])
  
  // Habit streak achievements
  const checkHabitAchievements = useCallback((habitName: string, streakDays: number) => {
    const milestones = [3, 7, 14, 21, 30, 60, 100]
    
    if (milestones.includes(streakDays)) {
      const messages = {
        3: `3 days of ${habitName}! 🌱 You're planting the seeds of change!`,
        7: `One week of ${habitName}! 🌟 This is becoming part of who you are!`,
        14: `Two weeks of ${habitName}! 💪 Your consistency is inspiring!`,
        21: `21 days of ${habitName}! 🎯 Scientists say habits form in 21 days - you did it!`,
        30: `One month of ${habitName}! 🏆 This habit is officially part of your life!`,
        60: `Two months of ${habitName}! 🚀 You're living proof that change is possible!`,
        100: `100 days of ${habitName}! 🌟 You're absolutely legendary!`
      }
      
      triggerCelebration({
        id: `habit-streak-${streakDays}`,
        type: streakDays >= 21 ? 'breakthrough' : 'streak',
        title: `${streakDays}-day ${habitName} streak! 🎉`,
        message: messages[streakDays as keyof typeof messages] || `${streakDays} days of ${habitName}! Incredible!`,
        leftButtonText: "So grateful",
        rightButtonText: "Keep growing",
        showConfetti: streakDays >= 7,
        autoDismissDelay: streakDays >= 21 ? 15000 : 10000
      })
    }
  }, [])
  
  /**
   * CELEBRATION TRIGGER FUNCTION
   */
  const triggerCelebration = (achievement: Achievement) => {
    setCurrentAchievement(achievement)
    setShowCelebration(true)
  }
  
  /**
   * CELEBRATION ACTION HANDLERS
   */
  const handleCelebrateFirst = () => {
    if (currentAchievement && onCelebrationAction) {
      onCelebrationAction('celebrate', currentAchievement)
    }
    
    // Just dismiss and let user savor the moment
    setShowCelebration(false)
    
    console.log(`${userName} chose to celebrate their achievement first! 🎉`)
  }
  
  const handleBuildMomentum = () => {
    if (currentAchievement && onCelebrationAction) {
      onCelebrationAction('momentum', currentAchievement)
    }
    
    setShowCelebration(false)
    
    // Route to relevant screen based on achievement type
    switch (currentAchievement?.type) {
      case 'task':
        router.push('/tasks')
        break
      case 'focus':
        router.push('/focus')
        break
      case 'streak':
      case 'milestone':
        router.push('/habits')
        break
      default:
        router.push('/')
    }
    
    console.log(`${userName} chose to build momentum! Redirecting to continue success.`)
  }
  
  /**
   * PUBLIC API FOR EXTERNAL ACHIEVEMENT TRIGGERS
   * These functions can be called from other components to trigger celebrations
   */
  
  // Export these functions for external use
  const celebrationAPI = {
    taskCompleted: (completedToday: number, isStreakDay: boolean = false) => {
      setDailyTaskCount(completedToday)
      checkTaskAchievements(completedToday, isStreakDay)
    },
    
    focusSessionCompleted: (minutes: number, totalToday: number = 1) => {
      setFocusSessionCount(totalToday)
      checkFocusAchievements(minutes, totalToday)
    },
    
    habitStreakReached: (habitName: string, days: number) => {
      checkHabitAchievements(habitName, days)
    },
    
    customAchievement: (achievement: Partial<Achievement>) => {
      const fullAchievement: Achievement = {
        id: `custom-${Date.now()}`,
        type: 'milestone',
        title: "Great job! 🎉",
        message: "You did something amazing!",
        leftButtonText: "Thanks!",
        rightButtonText: "What's next?",
        showConfetti: false,
        ...achievement
      } as Achievement
      
      triggerCelebration(fullAchievement)
    }
  }
  
  // Expose API through window for global access (development only)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      (window as any).joiduCelebrations = celebrationAPI
    }
  }, [])
  
  return (
    <>
      {/* Development Controls */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-20 left-4 z-40 bg-white p-3 rounded-lg shadow-md">
          <h4 className="text-xs font-bold mb-2">🎉 Celebration Tests</h4>
          <div className="space-y-1">
            <button
              onClick={() => celebrationAPI.taskCompleted(1)}
              className="text-xs bg-green-500 text-white px-2 py-1 rounded block w-full"
            >
              First Task Complete
            </button>
            <button
              onClick={() => celebrationAPI.taskCompleted(3)}
              className="text-xs bg-orange-500 text-white px-2 py-1 rounded block w-full"
            >
              3 Tasks Complete
            </button>
            <button
              onClick={() => celebrationAPI.focusSessionCompleted(25)}
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded block w-full"
            >
              25min Focus Session
            </button>
            <button
              onClick={() => celebrationAPI.habitStreakReached("meditation", 7)}
              className="text-xs bg-purple-500 text-white px-2 py-1 rounded block w-full"
            >
              7-day Habit Streak
            </button>
          </div>
        </div>
      )}
      
      {/* Celebration Modal */}
      {currentAchievement && (
        <CelebrationModal
          isVisible={showCelebration}
          title={currentAchievement.title}
          message={currentAchievement.message}
          leftButtonText={currentAchievement.leftButtonText}
          rightButtonText={currentAchievement.rightButtonText}
          onLeftAction={handleCelebrateFirst}
          onRightAction={handleBuildMomentum}
          onDismiss={() => setShowCelebration(false)}
          achievementType={currentAchievement.type}
          showConfetti={currentAchievement.showConfetti}
          autoDismissDelay={currentAchievement.autoDismissDelay}
        />
      )}
    </>
  )
}

/**
 * USAGE EXAMPLES AND INTEGRATION PATTERNS
 * 
 * 1. APP-LEVEL INTEGRATION:
 * Include in your main layout for app-wide celebration detection:
 * 
 * ```tsx
 * import CelebrationSystem from '@/components/notifications/CelebrationSystem'
 * 
 * export default function AppLayout({ children }) {
 *   return (
 *     <div>
 *       {children}
 *       <CelebrationSystem 
 *         enableAutoDetection={true}
 *         userName={user?.firstName || 'friend'}
 *         currentRoute={pathname}
 *       />
 *     </div>
 *   )
 * }
 * ```
 * 
 * 2. TASK COMPLETION INTEGRATION:
 * In your task management component:
 * 
 * ```tsx
 * const handleTaskComplete = (taskId) => {
 *   // Complete the task
 *   completeTask(taskId)
 *   
 *   // Get updated counts
 *   const completedToday = getCompletedTasksToday()
 *   const hasStreak = checkIfStreakDay()
 *   
 *   // Trigger celebration
 *   if (window.joiduCelebrations) {
 *     window.joiduCelebrations.taskCompleted(completedToday.length, hasStreak)
 *   }
 * }
 * ```
 * 
 * 3. FOCUS SESSION INTEGRATION:
 * In your focus/timer component:
 * 
 * ```tsx
 * const handleSessionComplete = (duration) => {
 *   const minutes = Math.floor(duration / 60)
 *   const sessionsToday = getTodayFocusSessions() + 1
 *   
 *   // Save session data
 *   saveFocusSession(duration)
 *   
 *   // Trigger celebration
 *   if (window.joiduCelebrations) {
 *     window.joiduCelebrations.focusSessionCompleted(minutes, sessionsToday)
 *   }
 * }
 * ```
 * 
 * 4. HABIT STREAK INTEGRATION:
 * In your habit tracking component:
 * 
 * ```tsx
 * const handleHabitComplete = (habitId) => {
 *   const habit = markHabitComplete(habitId)
 *   const currentStreak = calculateStreak(habit)
 *   
 *   // Trigger celebration for streak milestones
 *   if (window.joiduCelebrations && isMilestone(currentStreak)) {
 *     window.joiduCelebrations.habitStreakReached(habit.name, currentStreak)
 *   }
 * }
 * ```
 * 
 * 5. CUSTOM ACHIEVEMENT INTEGRATION:
 * For unique app-specific achievements:
 * 
 * ```tsx
 * const handleSpecialAchievement = () => {
 *   if (window.joiduCelebrations) {
 *     window.joiduCelebrations.customAchievement({
 *       id: 'profile-complete',
 *       type: 'milestone',
 *       title: "Profile perfected! ✨",
 *       message: "Your profile is now 100% complete! This helps Kai give you better support.",
 *       leftButtonText: "Awesome!",
 *       rightButtonText: "Show me Kai",
 *       showConfetti: true
 *     })
 *   }
 * }
 * ```
 * 
 * 6. REACT CONTEXT INTEGRATION:
 * For more sophisticated integration, create a context:
 * 
 * ```tsx
 * const CelebrationContext = createContext(null)
 * 
 * export const CelebrationProvider = ({ children }) => {
 *   const [celebrationSystem, setCelebrationSystem] = useState(null)
 *   
 *   const triggerCelebration = (achievement) => {
 *     if (celebrationSystem) {
 *       celebrationSystem.customAchievement(achievement)
 *     }
 *   }
 *   
 *   return (
 *     <CelebrationContext.Provider value={{ triggerCelebration }}>
 *       {children}
 *       <CelebrationSystem ref={setCelebrationSystem} />
 *     </CelebrationContext.Provider>
 *   )
 * }
 * ```
 * 
 * This celebration system provides the immediate positive reinforcement that ADHD brains
 * need while offering meaningful choices about how to respond to success. It's designed
 * to build momentum and confidence while respecting the user's current energy and focus.
 */