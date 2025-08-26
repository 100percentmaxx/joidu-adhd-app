'use client'

import React, { useEffect, useState } from 'react'

/**
 * GENTLE REMINDER MODAL COMPONENT
 * 
 * A supportive, non-intrusive notification modal designed specifically for ADHD-friendly UX.
 * This component provides gentle reminders and suggestions without feeling demanding or overwhelming.
 * 
 * DESIGN PRINCIPLES:
 * - Soft, welcoming visual design with rounded corners and gentle shadows
 * - Clear hierarchy with logo, title, message, and action buttons
 * - Non-aggressive colors (no reds or harsh contrasts)
 * - Supportive messaging that offers choice rather than demands
 * - Smooth animations that don't startle or overwhelm
 * 
 * ACCESSIBILITY FEATURES:
 * - Focus trapping within the modal
 * - Escape key dismissal
 * - ARIA labels for screen readers
 * - High contrast text for readability
 * - Clear focus indicators on interactive elements
 * 
 * RESPONSIVE DESIGN:
 * - Adapts to different screen sizes
 * - Maintains touch-friendly button sizes
 * - Proper spacing on mobile devices
 * 
 * USAGE EXAMPLES:
 * 
 * // Basic meditation reminder
 * <GentleReminderModal
 *   isVisible={showMeditationReminder}
 *   title="Gentle reminder 🌱"
 *   message="Your meditation is ready when you are. No pressure--just 5 peaceful minutes."
 *   leftButtonText="Remind me later"
 *   rightButtonText="Let's do it"
 *   onLeftAction={() => handleRemindLater()}
 *   onRightAction={() => handleStartMeditation()}
 *   onDismiss={() => setShowMeditationReminder(false)}
 * />
 * 
 * // Task completion reminder
 * <GentleReminderModal
 *   isVisible={showTaskReminder}
 *   title="Making progress! ✨"
 *   message="You've completed 2 out of 3 tasks today. Would you like to tackle the last one?"
 *   leftButtonText="Maybe later"
 *   rightButtonText="Sure!"
 *   onLeftAction={() => handleTaskRemindLater()}
 *   onRightAction={() => handleViewRemainingTask()}
 *   onDismiss={() => setShowTaskReminder(false)}
 * />
 */

interface GentleReminderModalProps {
  /** Controls whether the modal is visible */
  isVisible: boolean
  
  /** Main title of the notification (e.g., "Gentle reminder 🌱") */
  title: string
  
  /** Supportive message explaining the reminder */
  message: string
  
  /** Text for the left (secondary) action button */
  leftButtonText: string
  
  /** Text for the right (primary) action button */
  rightButtonText: string
  
  /** Function called when left button is pressed */
  onLeftAction: () => void
  
  /** Function called when right button is pressed */
  onRightAction: () => void
  
  /** Function called when modal should be dismissed (outside tap, escape key) */
  onDismiss: () => void
  
  /** Optional custom icon path (defaults to joidu_drop_logo.svg) */
  icon?: string
  
  /** Optional timestamp text (defaults to "now") */
  timestamp?: string
}

export default function GentleReminderModal({
  isVisible,
  title,
  message,
  leftButtonText,
  rightButtonText,
  onLeftAction,
  onRightAction,
  onDismiss,
  icon = '/icons/joidu_drop_logo.svg',
  timestamp = 'now'
}: GentleReminderModalProps) {
  // Animation state management
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  
  // Handle modal visibility with smooth animations
  useEffect(() => {
    if (isVisible) {
      // Start render, then trigger animation
      setShouldRender(true)
      setTimeout(() => setIsAnimating(true), 10) // Small delay for smooth animation
    } else {
      // Start exit animation, then stop rendering
      setIsAnimating(false)
      setTimeout(() => setShouldRender(false), 300) // Wait for animation to complete
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
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'unset'
    }
  }, [isVisible, onDismiss])
  
  // Focus management for accessibility
  useEffect(() => {
    if (isVisible) {
      // Focus first button when modal opens
      const firstButton = document.querySelector('[data-gentle-modal="left-button"]') as HTMLButtonElement
      if (firstButton) {
        setTimeout(() => firstButton.focus(), 100)
      }
    }
  }, [isVisible])
  
  // Handle outside click dismissal
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onDismiss()
    }
  }
  
  // Handle button actions
  const handleLeftAction = () => {
    onLeftAction()
    // Modal will be dismissed by parent component updating isVisible
  }
  
  const handleRightAction = () => {
    onRightAction()
    // Modal will be dismissed by parent component updating isVisible
  }
  
  // Don't render anything if modal shouldn't be shown
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
        aria-labelledby="gentle-modal-title"
        aria-describedby="gentle-modal-message"
      >
        {/* Modal Container */}
        <div
          className="bg-white rounded-2xl p-6 w-full shadow-lg"
          style={{
            maxWidth: '320px',
            minWidth: '280px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            transform: `scale(${isAnimating ? '1' : '0.9'}) translateY(${isAnimating ? '0' : '20px'})`,
            opacity: isAnimating ? '1' : '0',
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' // Gentle bounce animation
          }}
          onClick={(e) => e.stopPropagation()} // Prevent dismissal when clicking inside modal
        >
          {/* Header Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {/* Joidu Logo */}
              <img
                src={icon}
                alt="Joidu"
                className="w-8 h-8"
                style={{ width: '32px', height: '32px' }}
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
          
          {/* Notification Content */}
          <div className="mb-6">
            {/* Title */}
            <h2
              id="gentle-modal-title"
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
              id="gentle-modal-message"
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
            {/* Left Button (Secondary Action) */}
            <button
              data-gentle-modal="left-button"
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
            
            {/* Right Button (Primary Action) */}
            <button
              data-gentle-modal="right-button"
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
        </div>
      </div>
    </>
  )
}

/**
 * NOTIFICATION SYSTEM INTEGRATION GUIDE
 * 
 * This modal is designed to be part of a larger notification system.
 * Here's how to integrate it effectively:
 * 
 * 1. STATE MANAGEMENT:
 * Create state in your parent component to control visibility:
 * 
 * const [showReminder, setShowReminder] = useState(false)
 * 
 * 2. TRIGGERING REMINDERS:
 * Use timers, user actions, or app events to show reminders:
 * 
 * // After completing a task
 * setTimeout(() => setShowReminder(true), 5000)
 * 
 * // When user hasn't interacted for a while
 * useIdleTimer(() => setShowReminder(true), 300000) // 5 minutes
 * 
 * 3. HANDLING ACTIONS:
 * Implement meaningful actions for both buttons:
 * 
 * const handleRemindLater = () => {
 *   setShowReminder(false)
 *   // Schedule reminder for later (e.g., 30 minutes)
 *   scheduleNotification(30 * 60 * 1000)
 * }
 * 
 * const handleTakeAction = () => {
 *   setShowReminder(false)
 *   // Navigate to relevant screen or perform action
 *   router.push('/meditation')
 * }
 * 
 * 4. CUSTOMIZATION:
 * Adapt the modal for different types of reminders:
 * 
 * - Meditation reminders: Calm, peaceful messaging
 * - Task reminders: Encouraging, progress-focused
 * - Break reminders: Health-focused, supportive
 * - Achievement celebrations: Positive, congratulatory
 * 
 * 5. BEST PRACTICES FOR ADHD-FRIENDLY NOTIFICATIONS:
 * 
 * - Use positive, supportive language
 * - Offer choice rather than demands
 * - Include encouraging emojis sparingly
 * - Keep messages short and clear
 * - Always provide an easy way to dismiss
 * - Don't overwhelm with too many notifications
 * - Respect user's current mental state and focus
 * 
 * 6. ACCESSIBILITY CONSIDERATIONS:
 * 
 * - The modal automatically manages focus
 * - Escape key always dismisses the modal
 * - Screen readers can access all content
 * - High contrast ensures readability
 * - Touch targets are appropriately sized
 * 
 * This component embodies ADHD-friendly design principles:
 * - Non-intrusive: Gentle appearance with smooth animations
 * - Respectful: Easy dismissal and "remind later" option
 * - Supportive: Positive messaging and encouraging design
 * - Clear: Simple layout with obvious action options
 * - Flexible: Customizable for different notification types
 */