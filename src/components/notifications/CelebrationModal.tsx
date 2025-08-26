'use client'

import React, { useEffect, useState, useRef } from 'react'

/**
 * CELEBRATION MODAL COMPONENT
 * 
 * A specialized modal for acknowledging ADHD user achievements with positive reinforcement.
 * This component recognizes that ADHD users need extra recognition for accomplishments
 * and provides celebration moments while offering gentle momentum-building options.
 * 
 * DESIGN PHILOSOPHY:
 * - Immediate positive reinforcement for dopamine boost
 * - Celebrates the achievement before suggesting next steps
 * - Offers choice between savoring the moment vs. building momentum
 * - Uses energetic but not overwhelming language and animations
 * - Auto-dismisses to respect user's attention and focus
 * 
 * ACHIEVEMENT TYPES:
 * - Task completions (single task, multiple tasks, daily goals)
 * - Habit streaks (3-day, 7-day, 30-day milestones)
 * - Focus session completions (time-based achievements)
 * - Weekly/monthly progress milestones
 * - Personal bests and breakthrough moments
 * 
 * ADHD-SPECIFIC CONSIDERATIONS:
 * - Immediate gratification through celebration
 * - Recognition of effort, not just results
 * - Gentle momentum building without pressure
 * - Respect for the user's current energy and focus state
 * - Optional confetti for major achievements (dopamine boost)
 * 
 * USAGE EXAMPLES:
 * 
 * // Task completion celebration
 * <CelebrationModal
 *   isVisible={showCelebration}
 *   title="You're unstoppable! 🔥"
 *   message="3 tasks crushed today! Your momentum is incredible. Ready to tackle one more?"
 *   leftButtonText="Celebrate first"
 *   rightButtonText="Let's go!"
 *   onLeftAction={() => handleCelebrateFirst()}
 *   onRightAction={() => handleContinueMomentum()}
 *   onDismiss={() => setShowCelebration(false)}
 *   achievementType="tasks"
 *   showConfetti={true}
 * />
 * 
 * // Streak milestone celebration
 * <CelebrationModal
 *   isVisible={showStreakCelebration}
 *   title="7-day streak! 🌟"
 *   message="Your consistency is amazing! This habit is becoming second nature."
 *   leftButtonText="Savor this"
 *   rightButtonText="Keep going"
 *   onLeftAction={() => handleSavorMoment()}
 *   onRightAction={() => handleExtendStreak()}
 *   onDismiss={() => setShowStreakCelebration(false)}
 *   achievementType="streak"
 *   showConfetti={true}
 *   autoDismissDelay={10000}
 * />
 */

interface CelebrationModalProps {
  /** Controls whether the modal is visible */
  isVisible: boolean
  
  /** Celebratory title (e.g., "You're unstoppable! 🔥") */
  title: string
  
  /** Achievement message with specific accomplishment details */
  message: string
  
  /** Text for the left (celebrate/savor) button */
  leftButtonText: string
  
  /** Text for the right (momentum) button */
  rightButtonText: string
  
  /** Function called when left button is pressed (celebrate moment) */
  onLeftAction: () => void
  
  /** Function called when right button is pressed (build momentum) */
  onRightAction: () => void
  
  /** Function called when modal should be dismissed */
  onDismiss: () => void
  
  /** Type of achievement for context-aware animations */
  achievementType?: 'task' | 'streak' | 'focus' | 'milestone' | 'breakthrough'
  
  /** Whether to show confetti animation for major achievements */
  showConfetti?: boolean
  
  /** Auto-dismiss delay in milliseconds (default: 8000ms) */
  autoDismissDelay?: number
  
  /** Optional custom icon path (defaults to joidu_drop_logo.svg) */
  icon?: string
  
  /** Optional timestamp text (defaults to "now") */
  timestamp?: string
}

export default function CelebrationModal({
  isVisible,
  title,
  message,
  leftButtonText,
  rightButtonText,
  onLeftAction,
  onRightAction,
  onDismiss,
  achievementType = 'task',
  showConfetti = false,
  autoDismissDelay = 8000,
  icon = '/icons/joidu_drop_logo.svg',
  timestamp = 'now'
}: CelebrationModalProps) {
  // Animation state management
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [showConfettiAnimation, setShowConfettiAnimation] = useState(false)
  
  // Auto-dismiss timer ref
  const autoDismissTimer = useRef<NodeJS.Timeout>()
  
  // Handle modal visibility with celebration animations
  useEffect(() => {
    if (isVisible) {
      // Start render, then trigger animation
      setShouldRender(true)
      setTimeout(() => {
        setIsAnimating(true)
        // Trigger confetti after modal appears
        if (showConfetti) {
          setTimeout(() => setShowConfettiAnimation(true), 200)
        }
      }, 10)
      
      // Set up auto-dismiss timer
      if (autoDismissDelay > 0) {
        autoDismissTimer.current = setTimeout(() => {
          handleDismiss()
        }, autoDismissDelay)
      }
    } else {
      // Start exit animation, then stop rendering
      setIsAnimating(false)
      setShowConfettiAnimation(false)
      setTimeout(() => setShouldRender(false), 300)
      
      // Clear auto-dismiss timer
      if (autoDismissTimer.current) {
        clearTimeout(autoDismissTimer.current)
      }
    }
    
    return () => {
      if (autoDismissTimer.current) {
        clearTimeout(autoDismissTimer.current)
      }
    }
  }, [isVisible, showConfetti, autoDismissDelay])
  
  // Handle escape key dismissal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        handleDismiss()
      }
    }
    
    if (isVisible) {
      document.addEventListener('keydown', handleEscapeKey)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'unset'
    }
  }, [isVisible])
  
  // Focus management for accessibility
  useEffect(() => {
    if (isVisible) {
      // Focus celebrate button first (left button) to encourage savoring
      const celebrateButton = document.querySelector('[data-celebration-modal="left-button"]') as HTMLButtonElement
      if (celebrateButton) {
        setTimeout(() => celebrateButton.focus(), 100)
      }
    }
  }, [isVisible])
  
  // Handle dismissal (clears timer and calls onDismiss)
  const handleDismiss = () => {
    if (autoDismissTimer.current) {
      clearTimeout(autoDismissTimer.current)
    }
    onDismiss()
  }
  
  // Handle outside click dismissal
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleDismiss()
    }
  }
  
  // Handle button actions (clear timer before action)
  const handleLeftAction = () => {
    if (autoDismissTimer.current) {
      clearTimeout(autoDismissTimer.current)
    }
    onLeftAction()
  }
  
  const handleRightAction = () => {
    if (autoDismissTimer.current) {
      clearTimeout(autoDismissTimer.current)
    }
    onRightAction()
  }
  
  // Don't render if modal shouldn't be shown
  if (!shouldRender) {
    return null
  }
  
  // Get achievement-specific animation intensity
  const getAnimationScale = () => {
    const scaleMap = {
      task: { initial: 0.9, final: 1.0 },
      streak: { initial: 0.85, final: 1.05 }, // Bigger bounce for streaks
      focus: { initial: 0.9, final: 1.0 },
      milestone: { initial: 0.8, final: 1.1 }, // Biggest bounce for milestones
      breakthrough: { initial: 0.8, final: 1.1 }
    }
    return scaleMap[achievementType] || scaleMap.task
  }
  
  const animationScale = getAnimationScale()
  
  return (
    <>
      {/* Confetti Animation Overlay */}
      {showConfettiAnimation && (
        <ConfettiAnimation achievementType={achievementType} />
      )}
      
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
        aria-labelledby="celebration-modal-title"
        aria-describedby="celebration-modal-message"
      >
        {/* Modal Container */}
        <div
          className="bg-white rounded-2xl p-6 w-full shadow-lg"
          style={{
            maxWidth: '320px',
            minWidth: '280px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            transform: `scale(${isAnimating ? animationScale.final : animationScale.initial}) translateY(${isAnimating ? '0' : '20px'})`,
            opacity: isAnimating ? '1' : '0',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' // Celebratory bounce
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
                  // Subtle pulse animation for celebration
                  animation: isAnimating ? 'celebration-pulse 2s ease-in-out infinite' : 'none'
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
          
          {/* Celebration Content */}
          <div className="mb-6">
            {/* Title */}
            <h2
              id="celebration-modal-title"
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
              id="celebration-modal-message"
              style={{
                fontSize: '15px',
                color: '#a5a5a5',
                lineHeight: '1.5'
              }}
            >
              {message}
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2">
            {/* Left Button (Celebrate/Savor) */}
            <button
              data-celebration-modal="left-button"
              onClick={handleLeftAction}
              className="font-medium rounded-lg transition-all duration-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
              style={{
                backgroundColor: '#e2e2e2',
                color: '#4c4c4c',
                fontSize: '15px',
                height: '44px',
                width: '48%',
                borderRadius: '8px'
              }}
            >
              {leftButtonText}
            </button>
            
            {/* Right Button (Momentum) */}
            <button
              data-celebration-modal="right-button"
              onClick={handleRightAction}
              className="font-medium rounded-lg transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300"
              style={{
                backgroundColor: '#fa772c',
                color: 'white',
                fontSize: '15px',
                height: '44px',
                width: '48%',
                borderRadius: '8px'
              }}
            >
              {rightButtonText}
            </button>
          </div>
          
          {/* Auto-dismiss indicator */}
          {autoDismissDelay > 0 && (
            <div className="mt-3 text-center">
              <div
                className="h-1 bg-gray-200 rounded-full overflow-hidden"
                style={{ width: '60px', margin: '0 auto' }}
              >
                <div
                  className="h-full bg-orange-300 rounded-full"
                  style={{
                    width: '100%',
                    animation: isAnimating ? `countdown ${autoDismissDelay}ms linear` : 'none',
                    transformOrigin: 'left'
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes celebration-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes countdown {
          0% { transform: scaleX(1); }
          100% { transform: scaleX(0); }
        }
      `}</style>
    </>
  )
}

/**
 * CONFETTI ANIMATION COMPONENT
 * 
 * Optional confetti effect for major achievements.
 * Uses CSS animations to create falling confetti particles in Joidu colors.
 */
function ConfettiAnimation({ achievementType }: { achievementType: string }) {
  const [particles, setParticles] = useState<Array<{ id: number; delay: number; duration: number; left: number; color: string }>>([])
  
  // Joidu brand colors for confetti
  const joiduColors = [
    '#fa772c', // Primary Orange
    '#2847ef', // Primary Blue
    '#98e1ea', // Light Blue
    '#f7e98e', // Light Yellow
    '#f4b7ae', // Light Pink
    '#c8bfef', // Light Purple
    '#f9c075', // Light Orange
    '#a8e2bb'  // Light Green
  ]
  
  useEffect(() => {
    // Generate confetti particles
    const particleCount = achievementType === 'milestone' || achievementType === 'breakthrough' ? 50 : 30
    const newParticles = []
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        delay: Math.random() * 500, // Stagger particle release
        duration: 2000 + Math.random() * 1000, // 2-3 second fall time
        left: Math.random() * 100, // Random horizontal position
        color: joiduColors[Math.floor(Math.random() * joiduColors.length)]
      })
    }
    
    setParticles(newParticles)
    
    // Clean up particles after animation
    const cleanup = setTimeout(() => {
      setParticles([])
    }, 4000)
    
    return () => clearTimeout(cleanup)
  }, [achievementType])
  
  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 opacity-80"
          style={{
            left: `${particle.left}%`,
            top: '-10px',
            backgroundColor: particle.color,
            borderRadius: '2px',
            animationDelay: `${particle.delay}ms`,
            animationDuration: `${particle.duration}ms`,
            animationName: 'confetti-fall',
            animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            animationFillMode: 'forwards'
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

/**
 * CELEBRATION SYSTEM INTEGRATION GUIDE
 * 
 * This modal should be integrated into achievement detection systems throughout the app.
 * Here are the key integration points and best practices:
 * 
 * 1. TASK COMPLETION CELEBRATIONS:
 * 
 * const handleTaskComplete = (task) => {
 *   // Mark task as complete
 *   completeTask(task.id)
 *   
 *   // Check for celebration triggers
 *   const completedToday = getTodayCompletedTasks()
 *   
 *   if (completedToday.length === 3) {
 *     setCelebrationData({
 *       title: "Triple threat! 🎯",
 *       message: "3 tasks conquered today! You're building incredible momentum.",
 *       leftButtonText: "Celebrate first",
 *       rightButtonText: "Keep going!"
 *     })
 *     setShowCelebration(true)
 *   }
 * }
 * 
 * 2. STREAK CELEBRATIONS:
 * 
 * const checkStreakMilestones = (streak) => {
 *   const milestones = [3, 7, 14, 30, 60, 100]
 *   
 *   if (milestones.includes(streak)) {
 *     const messages = {
 *       3: "3-day streak! 🔥 You're building a habit!",
 *       7: "One week strong! 🌟 This is becoming second nature!",
 *       30: "30-day streak! 🏆 You're absolutely unstoppable!"
 *     }
 *     
 *     setCelebrationData({
 *       title: `${streak}-day streak! 🎉`,
 *       message: messages[streak] || `${streak} days of consistency! Amazing!`,
 *       achievementType: 'streak',
 *       showConfetti: streak >= 7
 *     })
 *     setShowCelebration(true)
 *   }
 * }
 * 
 * 3. FOCUS SESSION CELEBRATIONS:
 * 
 * const handleFocusComplete = (duration) => {
 *   if (duration >= 25 * 60) { // 25 minutes (Pomodoro)
 *     setCelebrationData({
 *       title: "Focus master! 🧘‍♀️",
 *       message: "25 minutes of deep focus completed. Your brain deserves recognition!",
 *       leftButtonText: "Take a break",
 *       rightButtonText: "Another round?",
 *       achievementType: 'focus'
 *     })
 *     setShowCelebration(true)
 *   }
 * }
 * 
 * 4. INTEGRATION IN COMPONENTS:
 * 
 * const TasksScreen = () => {
 *   const [showCelebration, setShowCelebration] = useState(false)
 *   const [celebrationData, setCelebrationData] = useState({})
 *   
 *   return (
 *     <div>
 *       {/* Task list component */}
 *       <TaskList onTaskComplete={handleTaskComplete} />
 *       
 *       {/* Celebration modal */}
 *       <CelebrationModal
 *         isVisible={showCelebration}
 *         {...celebrationData}
 *         onLeftAction={() => handleCelebrateFirst()}
 *         onRightAction={() => handleContinueMomentum()}
 *         onDismiss={() => setShowCelebration(false)}
 *       />
 *     </div>
 *   )
 * }
 * 
 * 5. ADHD-FRIENDLY CELEBRATION PRINCIPLES:
 * 
 * - IMMEDIATE: Celebrate right when the achievement happens
 * - SPECIFIC: Mention exactly what they accomplished
 * - EFFORT-FOCUSED: Recognize the work, not just the result
 * - CHOICE-OFFERING: Let them savor or build momentum
 * - DOPAMINE-BOOSTING: Use energetic language and visuals
 * - RESPECTFUL: Auto-dismiss to not demand attention indefinitely
 * 
 * 6. CELEBRATION TIMING BEST PRACTICES:
 * 
 * - Task completion: Immediately after marking complete
 * - Streak milestones: At the moment the streak is achieved
 * - Daily goals: When the final task for the day is completed
 * - Weekly reviews: During weekly check-ins or Sunday planning
 * - Personal bests: When a new record is set (focus time, tasks, etc.)
 * 
 * This celebration system provides the positive reinforcement ADHD brains crave
 * while respecting the user's autonomy and current mental state.
 */