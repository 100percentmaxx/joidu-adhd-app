'use client'

import React, { useState, useEffect } from 'react'

interface OnboardingScreen1Props {
  onBack?: () => void
  onSkip?: () => void
  onNext?: () => void
}

/**
 * ONBOARDING SCREEN 1 - WELCOME TO JOIDU
 * 
 * This is the first screen users see when starting their Joidu journey.
 * It introduces the app concept, presents Kai (the AI assistant), and 
 * sets expectations for what they'll build together. The design is
 * specifically crafted for ADHD users with calming colors, clear structure,
 * and friendly, non-overwhelming messaging.
 * 
 * KEY DESIGN PRINCIPLES:
 * - Calm, welcoming first impression with soothing Light Blue background
 * - Clear information hierarchy to avoid cognitive overload
 * - Friendly AI introduction to build trust and excitement
 * - Preview of key benefits without overwhelming detail
 * - Consistent navigation pattern for the onboarding flow
 * 
 * ADHD-FRIENDLY FEATURES:
 * - Soft color palette reduces visual stress
 * - Chunked information prevents overwhelm
 * - Clear next steps and navigation options
 * - Friendly, supportive tone throughout
 * - Visual cards make abstract concepts concrete
 */
export default function OnboardingScreen1({
  onBack,
  onSkip,
  onNext
}: OnboardingScreen1Props) {
  const [showTyping, setShowTyping] = useState(true)

  // Simulate Kai typing animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTyping(false)
    }, 2000) // Show typing for 2 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <div 
      style={{ backgroundColor: '#cae9ef' }}
      className="min-h-screen flex flex-col"
    >
      {/* Main Content Container */}
      <div className="flex-1 flex flex-col items-center justify-start px-6 pt-12 pb-24 max-w-sm mx-auto w-full md:max-w-md lg:max-w-lg">
        
        {/* App Icon */}
        <div className="mb-8">
          <div 
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: 'transparent' }}
          >
            {/* Placeholder for joidu_drop_logo.svg */}
            <div 
              className="w-20 h-20 rounded-xl flex items-center justify-center text-xs font-medium"
              style={{ 
                backgroundColor: '#2847ef',
                color: 'white'
              }}
            >
              JOIDU
              <br />
              LOGO
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 
          className="text-3xl font-bold text-center mb-4"
          style={{ color: '#4c4c4c' }}
        >
          Welcome to Joidu!
        </h1>

        {/* Subheading */}
        <p 
          className="text-lg text-center mb-8 leading-relaxed"
          style={{ color: '#a5a5a5' }}
        >
          The productivity app designed specifically for ADHD brains
        </p>

        {/* Kai's Chat Bubble */}
        <div className="w-full mb-8">
          <div 
            className="rounded-2xl p-6 shadow-sm relative"
            style={{ backgroundColor: '#fefbf7' }}
          >
            {/* Kai Icon */}
            <div className="flex items-start gap-3 mb-4">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0"
                style={{ 
                  backgroundColor: '#2847ef',
                  color: 'white'
                }}
              >
                {/* Placeholder for kai.svg */}
                KAI
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span 
                    className="font-semibold text-sm"
                    style={{ color: '#4c4c4c' }}
                  >
                    Kai
                  </span>
                  <div 
                    className="w-4 h-4 rounded-full flex items-center justify-center text-xs"
                    style={{ backgroundColor: '#2847ef' }}
                  >
                    {/* Placeholder for sparkle icon */}
                    <span style={{ color: 'white' }}>✨</span>
                  </div>
                </div>
                <p 
                  className="text-base leading-relaxed"
                  style={{ color: '#4c4c4c' }}
                >
                  Hi there! I'm Kai, your AI productivity companion. I'm here to help you work WITH your ADHD brain, not against it. Ready to set up your personalized system?
                </p>
              </div>
            </div>
            
            {/* Typing Indicator */}
            {showTyping && (
              <div className="flex items-center gap-2 mt-4 pl-11">
                <div className="flex gap-1">
                  <div 
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ backgroundColor: '#a5a5a5', animationDelay: '0ms' }}
                  />
                  <div 
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ backgroundColor: '#a5a5a5', animationDelay: '150ms' }}
                  />
                  <div 
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ backgroundColor: '#a5a5a5', animationDelay: '300ms' }}
                  />
                </div>
                <span 
                  className="text-sm italic"
                  style={{ color: '#a5a5a5' }}
                >
                  Kai is typing...
                </span>
              </div>
            )}
          </div>
        </div>

        {/* What We'll Build Together Section */}
        <div className="w-full">
          <h2 
            className="text-xl font-semibold text-center mb-6"
            style={{ color: '#4c4c4c' }}
          >
            What we'll build together:
          </h2>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* Smart Focus Card */}
            <div 
              className="rounded-xl p-4 shadow-sm"
              style={{ backgroundColor: '#fefbf7' }}
            >
              <div className="flex flex-col items-center text-center">
                {/* Placeholder for focus_2.svg */}
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-xs font-medium mb-3"
                  style={{ 
                    backgroundColor: '#2847ef',
                    color: 'white'
                  }}
                >
                  FOCUS
                </div>
                <h3 
                  className="font-semibold text-sm mb-2"
                  style={{ color: '#4c4c4c' }}
                >
                  Smart Focus
                </h3>
                <p 
                  className="text-xs leading-relaxed"
                  style={{ color: '#a5a5a5' }}
                >
                  Timers that adapt to your energy
                </p>
              </div>
            </div>

            {/* Brain-Friendly Tasks Card */}
            <div 
              className="rounded-xl p-4 shadow-sm"
              style={{ backgroundColor: '#fefbf7' }}
            >
              <div className="flex flex-col items-center text-center">
                {/* Placeholder for tasks_3.svg */}
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-xs font-medium mb-3"
                  style={{ 
                    backgroundColor: '#2847ef',
                    color: 'white'
                  }}
                >
                  TASKS
                </div>
                <h3 
                  className="font-semibold text-sm mb-2"
                  style={{ color: '#4c4c4c' }}
                >
                  Brain-Friendly Tasks
                </h3>
                <p 
                  className="text-xs leading-relaxed"
                  style={{ color: '#a5a5a5' }}
                >
                  Organized the way you think
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Footer Navigation */}
      <div 
        className="fixed bottom-0 left-0 right-0 p-6"
        style={{ backgroundColor: '#cae9ef' }}
      >
        <div className="max-w-sm mx-auto w-full md:max-w-md lg:max-w-lg">
          <div className="flex justify-between items-center">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90"
              style={{ 
                backgroundColor: '#2847ef',
                color: 'white'
              }}
            >
              ← Back
            </button>

            {/* Skip and Next Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={onSkip}
                className="px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={{ 
                  backgroundColor: '#2847ef',
                  color: 'white'
                }}
              >
                Skip
              </button>
              <button
                onClick={onNext}
                className="px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={{ 
                  backgroundColor: '#2847ef',
                  color: 'white'
                }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for typing animation */}
      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
        }
        
        .animate-bounce {
          animation: bounce 1.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

/**
 * COMPONENT USAGE EXAMPLES:
 * 
 * // Basic usage in onboarding flow
 * <OnboardingScreen1 
 *   onBack={() => navigateTo('welcome')}
 *   onSkip={() => navigateTo('main-app')}
 *   onNext={() => navigateTo('onboarding-2')}
 * />
 * 
 * // In a stepper/wizard component
 * const OnboardingFlow = () => {
 *   const [currentStep, setCurrentStep] = useState(1)
 *   
 *   if (currentStep === 1) {
 *     return (
 *       <OnboardingScreen1
 *         onBack={() => setCurrentStep(0)}
 *         onSkip={() => completeOnboarding()}
 *         onNext={() => setCurrentStep(2)}
 *       />
 *     )
 *   }
 *   // ... other steps
 * }
 * 
 * DESIGN RATIONALE:
 * 
 * 1. **Color Psychology**: Light Blue background (#cae9ef) creates a calm,
 *    welcoming first impression that reduces anxiety for ADHD users
 * 
 * 2. **Information Architecture**: Content is chunked into digestible pieces:
 *    - Clear app introduction
 *    - Personal AI assistant introduction
 *    - Concrete preview of benefits
 * 
 * 3. **Visual Hierarchy**: Typography and spacing guide users through the
 *    content naturally without overwhelming them
 * 
 * 4. **Interactive Elements**: Kai's typing animation adds personality and
 *    shows the AI is "thinking" and responsive
 * 
 * 5. **Navigation Clarity**: Three clear options (Back, Skip, Next) give
 *    users control over their onboarding pace
 * 
 * ACCESSIBILITY FEATURES:
 * 
 * - High contrast text colors for readability
 * - Large touch targets for mobile users
 * - Clear visual hierarchy with semantic HTML
 * - Descriptive component names and structure
 * - Smooth transitions and hover states
 * 
 * RESPONSIVE DESIGN:
 * 
 * - Mobile-first approach with max-width constraints
 * - Flexible grid for feature cards
 * - Fixed footer navigation for easy access
 * - Scales well on tablet and desktop sizes
 * 
 * ONBOARDING BEST PRACTICES:
 * 
 * 1. **Value First**: Shows concrete benefits before asking for commitment
 * 2. **Personality**: Kai introduction builds emotional connection
 * 3. **Choice**: Skip option respects user autonomy
 * 4. **Progress**: Clear navigation shows this is part of a flow
 * 5. **Trust**: Professional design builds confidence in the product
 */