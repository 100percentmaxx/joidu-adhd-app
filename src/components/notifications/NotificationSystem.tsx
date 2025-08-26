'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import GentleReminderModal from './GentleReminderModal'

/**
 * NOTIFICATION SYSTEM COMPONENT
 * 
 * This component demonstrates how to use the GentleReminderModal effectively
 * throughout the Joidu app. It shows different types of notifications and
 * how to manage their timing and user interactions.
 * 
 * NOTIFICATION TYPES:
 * - Meditation reminders: Encouraging users to take peaceful breaks
 * - Task completion: Celebrating progress and motivating next steps
 * - Break reminders: Health-focused suggestions for rest
 * - Achievement celebrations: Positive reinforcement for accomplishments
 * 
 * INTEGRATION PATTERNS:
 * - Timer-based notifications (after periods of activity/inactivity)
 * - Progress-based notifications (after completing tasks)
 * - Time-based notifications (scheduled reminders)
 * - Context-sensitive notifications (based on user's current screen)
 * 
 * This component can be included at the app level to provide system-wide
 * notification capabilities, or used in specific screens for contextual reminders.
 */

interface NotificationSystemProps {
  /** Whether to enable automatic reminder scheduling */
  enableAutoReminders?: boolean
  
  /** Current user's name for personalization */
  userName?: string
  
  /** Current screen/route for context-aware notifications */
  currentRoute?: string
}

export default function NotificationSystem({
  enableAutoReminders = true,
  userName = 'friend',
  currentRoute = '/'
}: NotificationSystemProps) {
  const router = useRouter()
  
  // Notification visibility states
  const [showMeditationReminder, setShowMeditationReminder] = useState(false)
  const [showTaskReminder, setShowTaskReminder] = useState(false)
  const [showBreakReminder, setShowBreakReminder] = useState(false)
  const [showAchievementCelebration, setShowAchievementCelebration] = useState(false)
  
  // Demo state for testing (remove in production)
  const [demoMode, setDemoMode] = useState(false)
  
  /**
   * MEDITATION REMINDER LOGIC
   * Shows gentle meditation prompts when user might benefit from a break
   */
  useEffect(() => {
    if (!enableAutoReminders) return
    
    // Schedule meditation reminder after 30 minutes of app usage
    const meditationTimer = setTimeout(() => {
      if (!showMeditationReminder && currentRoute === '/') {
        setShowMeditationReminder(true)
      }
    }, 30 * 60 * 1000) // 30 minutes
    
    return () => clearTimeout(meditationTimer)
  }, [enableAutoReminders, currentRoute, showMeditationReminder])
  
  /**
   * BREAK REMINDER LOGIC
   * Suggests breaks during extended focus sessions
   */
  useEffect(() => {
    if (!enableAutoReminders) return
    
    // Schedule break reminder after 45 minutes on focus screen
    if (currentRoute === '/focus') {
      const breakTimer = setTimeout(() => {
        setShowBreakReminder(true)
      }, 45 * 60 * 1000) // 45 minutes
      
      return () => clearTimeout(breakTimer)
    }
  }, [enableAutoReminders, currentRoute])
  
  /**
   * MEDITATION REMINDER HANDLERS
   */
  const handleMeditationRemindLater = () => {
    setShowMeditationReminder(false)
    
    // Schedule another reminder in 15 minutes
    setTimeout(() => {
      setShowMeditationReminder(true)
    }, 15 * 60 * 1000)
    
    console.log('Meditation reminder scheduled for 15 minutes from now')
  }
  
  const handleStartMeditation = () => {
    setShowMeditationReminder(false)
    
    // Navigate to meditation/focus screen
    router.push('/focus')
    console.log('Navigating to meditation session')
  }
  
  /**
   * TASK REMINDER HANDLERS
   */
  const handleTaskRemindLater = () => {
    setShowTaskReminder(false)
    
    // Schedule task reminder for later
    setTimeout(() => {
      setShowTaskReminder(true)
    }, 20 * 60 * 1000) // 20 minutes
    
    console.log('Task reminder scheduled for later')
  }
  
  const handleViewRemainingTasks = () => {
    setShowTaskReminder(false)
    
    // Navigate to tasks screen
    router.push('/tasks')
    console.log('Navigating to remaining tasks')
  }
  
  /**
   * BREAK REMINDER HANDLERS
   */
  const handleBreakRemindLater = () => {
    setShowBreakReminder(false)
    
    // Schedule another break reminder in 20 minutes
    setTimeout(() => {
      setShowBreakReminder(true)
    }, 20 * 60 * 1000)
    
    console.log('Break reminder scheduled for later')
  }
  
  const handleTakeBreak = () => {
    setShowBreakReminder(false)
    
    // Navigate to habits or a relaxation activity
    router.push('/habits')
    console.log('Taking a well-deserved break')
  }
  
  /**
   * ACHIEVEMENT HANDLERS
   */
  const handleAchievementDismiss = () => {
    setShowAchievementCelebration(false)
    console.log('Achievement celebration dismissed')
  }
  
  const handleViewAchievements = () => {
    setShowAchievementCelebration(false)
    
    // Navigate to achievements/progress screen
    router.push('/progress')
    console.log('Viewing achievements and progress')
  }
  
  /**
   * DEMO FUNCTIONS (remove in production)
   */
  const triggerMeditationDemo = () => setShowMeditationReminder(true)
  const triggerTaskDemo = () => setShowTaskReminder(true)
  const triggerBreakDemo = () => setShowBreakReminder(true)
  const triggerAchievementDemo = () => setShowAchievementCelebration(true)
  
  return (
    <>
      {/* Demo Controls (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 left-4 z-40 bg-white p-2 rounded-lg shadow-md">
          <button
            onClick={() => setDemoMode(!demoMode)}
            className="text-xs bg-blue-500 text-white px-2 py-1 rounded mb-2 block"
          >
            {demoMode ? 'Hide' : 'Show'} Notification Demos
          </button>
          
          {demoMode && (
            <div className="space-y-1">
              <button
                onClick={triggerMeditationDemo}
                className="text-xs bg-green-500 text-white px-2 py-1 rounded block w-full"
              >
                Meditation Reminder
              </button>
              <button
                onClick={triggerTaskDemo}
                className="text-xs bg-orange-500 text-white px-2 py-1 rounded block w-full"
              >
                Task Progress
              </button>
              <button
                onClick={triggerBreakDemo}
                className="text-xs bg-purple-500 text-white px-2 py-1 rounded block w-full"
              >
                Break Reminder
              </button>
              <button
                onClick={triggerAchievementDemo}
                className="text-xs bg-yellow-500 text-white px-2 py-1 rounded block w-full"
              >
                Achievement
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Meditation Reminder Modal */}
      <GentleReminderModal
        isVisible={showMeditationReminder}
        title="Gentle reminder 🌱"
        message="Your meditation is ready when you are. No pressure--just 5 peaceful minutes."
        leftButtonText="Remind me later"
        rightButtonText="Let's do it"
        onLeftAction={handleMeditationRemindLater}
        onRightAction={handleStartMeditation}
        onDismiss={() => setShowMeditationReminder(false)}
      />
      
      {/* Task Progress Reminder Modal */}
      <GentleReminderModal
        isVisible={showTaskReminder}
        title="Making progress! ✨"
        message={`Great job, ${userName}! You've completed 2 out of 3 tasks today. Would you like to tackle the last one?`}
        leftButtonText="Maybe later"
        rightButtonText="Sure!"
        onLeftAction={handleTaskRemindLater}
        onRightAction={handleViewRemainingTasks}
        onDismiss={() => setShowTaskReminder(false)}
      />
      
      {/* Break Reminder Modal */}
      <GentleReminderModal
        isVisible={showBreakReminder}
        title="Time for a break? 🛋️"
        message="You've been focused for a while. A short break can help refresh your mind and boost productivity."
        leftButtonText="5 more minutes"
        rightButtonText="Good idea"
        onLeftAction={handleBreakRemindLater}
        onRightAction={handleTakeBreak}
        onDismiss={() => setShowBreakReminder(false)}
      />
      
      {/* Achievement Celebration Modal */}
      <GentleReminderModal
        isVisible={showAchievementCelebration}
        title="Awesome work! 🎉"
        message={`${userName}, you just completed your 7-day task streak! You're building amazing habits.`}
        leftButtonText="Thanks!"
        rightButtonText="See progress"
        onLeftAction={handleAchievementDismiss}
        onRightAction={handleViewAchievements}
        onDismiss={handleAchievementDismiss}
        icon="/icons/joidu_drop_logo.svg"
        timestamp="just now"
      />
    </>
  )
}

/**
 * INTEGRATION GUIDE FOR DIFFERENT SCREENS
 * 
 * HOME SCREEN (/):
 * - Welcome back messages
 * - Daily goal reminders
 * - Progress celebrations
 * 
 * TASKS SCREEN (/tasks):
 * - Task completion celebrations
 * - Break suggestions after completing multiple tasks
 * - Gentle nudges for overdue items
 * 
 * FOCUS SCREEN (/focus):
 * - Break reminders during long sessions
 * - Session completion celebrations
 * - Breathing exercise suggestions
 * 
 * HABITS SCREEN (/habits):
 * - Streak celebrations
 * - Gentle reminders for missed habits
 * - Encouragement for building new habits
 * 
 * KAIHELP SCREEN (/kaihelp):
 * - Feature discovery tips
 * - Helpful usage suggestions
 * - Support resource reminders
 * 
 * USAGE IN PARENT COMPONENTS:
 * 
 * 1. Add to main layout for app-wide notifications:
 * ```tsx
 * import NotificationSystem from '@/components/notifications/NotificationSystem'
 * 
 * export default function Layout() {
 *   return (
 *     <div>
 *       {children}
 *       <NotificationSystem enableAutoReminders={true} />
 *     </div>
 *   )
 * }
 * ```
 * 
 * 2. Add to specific screens for contextual reminders:
 * ```tsx
 * import { NotificationSystem } from '@/components/notifications/NotificationSystem'
 * 
 * export default function TasksScreen() {
 *   return (
 *     <div>
 *       {/* Screen content */}
 *       <NotificationSystem 
 *         currentRoute="/tasks"
 *         userName="Sarah" 
 *       />
 *     </div>
 *   )
 * }
 * ```
 * 
 * CUSTOMIZATION TIPS:
 * 
 * 1. Personalize messages with user's name and progress
 * 2. Adjust timing based on user preferences
 * 3. Use context-aware messaging for different screens
 * 4. Respect user's current mental state (don't overwhelm)
 * 5. Provide meaningful actions that actually help the user
 * 6. Use supportive, encouraging language consistently
 * 7. Include relevant emojis sparingly for warmth
 * 
 * This notification system embodies ADHD-friendly principles by:
 * - Being helpful rather than demanding
 * - Offering choices and flexibility
 * - Celebrating progress and achievements
 * - Providing gentle guidance without pressure
 * - Respecting the user's autonomy and current focus
 */