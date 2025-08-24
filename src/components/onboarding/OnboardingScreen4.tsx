'use client'

import React from 'react'
import { ChevronRight, Settings } from 'lucide-react'

interface OnboardingScreen4Props {
  onBack?: () => void
  onFinish?: () => void
}

/**
 * ONBOARDING SCREEN 4 - COMPLETION & GUIDANCE
 * 
 * This final onboarding screen celebrates the user's completion of setup
 * and provides clear next steps for exploring the app. Rather than just
 * ending the onboarding, it guides users to key resources that will help
 * them succeed with Joidu, particularly the help resources that explain
 * how to work effectively with Kai and the app's ADHD-friendly features.
 * 
 * KEY DESIGN PRINCIPLES:
 * - Celebratory tone acknowledges the user's effort in completing setup
 * - Light Yellow background conveys warmth, achievement, and optimism
 * - Practical guidance prevents the "what do I do now?" moment
 * - Visual recreation of actual app elements creates familiarity
 * - Clear path to support resources builds confidence
 * 
 * USER EXPERIENCE GOALS:
 * - Celebrate completion of onboarding journey
 * - Provide immediate next steps for app exploration
 * - Direct users to help resources before they need them
 * - Create familiarity with settings location and help options
 * - End onboarding on a positive, empowering note
 */
export default function OnboardingScreen4({
  onBack,
  onFinish
}: OnboardingScreen4Props) {

  return (
    <div 
      style={{ backgroundColor: '#fef7d6' }}
      className="min-h-screen flex flex-col"
    >
      {/* Main Content Container */}
      <div className="flex-1 flex flex-col items-center justify-start px-6 pt-12 pb-24 max-w-sm mx-auto w-full md:max-w-md lg:max-w-lg">
        
        {/* Celebration Icon */}
        <div className="mb-8">
          <img 
            src="/icons/celebrate.svg" 
            alt="Celebration"
            style={{ 
              width: '80px', 
              height: '80px' 
            }}
          />
        </div>

        {/* Main Heading */}
        <h1 
          className="text-3xl font-bold text-center mb-4"
          style={{ color: '#4c4c4c' }}
        >
          You're all set!
        </h1>

        {/* Subheading */}
        <p 
          className="text-lg text-center mb-10 leading-relaxed"
          style={{ color: '#a5a5a5' }}
        >
          Here's how to explore Joidu and get the most from Kai
        </p>

        {/* Navigation Instructions Section */}
        <div className="w-full mb-8">
          {/* Step 1 - Settings Access */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Settings size={24} style={{ color: '#4c4c4c' }} />
              <p 
                className="text-base leading-relaxed"
                style={{ color: '#4c4c4c' }}
              >
                Find the settings icon in the top right corner of your Home screen
              </p>
            </div>
          </div>

          {/* Step 2 - Help & Support Access */}
          <div className="mb-6">
            <p 
              className="text-base mb-4 leading-relaxed"
              style={{ color: '#4c4c4c' }}
            >
              Scroll down and tap on:
            </p>
            
            {/* Help & Support Card Recreation */}
            <div 
              className="rounded-xl p-4 shadow-sm mb-6"
              style={{ 
                backgroundColor: 'white',
                border: '2px solid #e2e2e2'
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  {/* Help Icon */}
                  <img 
                    src="/icons/help.svg" 
                    alt="Help"
                    className="w-10 h-10 flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 
                      className="font-semibold text-base leading-tight mb-1"
                      style={{ color: '#4c4c4c' }}
                    >
                      Help & Support
                    </h3>
                    <p 
                      className="text-sm"
                      style={{ color: '#a5a5a5' }}
                    >
                      FAQs and contact
                    </p>
                  </div>
                </div>
                
                <ChevronRight 
                  size={20} 
                  style={{ color: '#e2e2e2' }}
                  className="flex-shrink-0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Guide Cards Section */}
        <div className="w-full space-y-6">
          {/* Getting Started Guide Card */}
          <div>
            <div 
              className="rounded-xl p-4 shadow-sm mb-3"
              style={{ 
                backgroundColor: 'white',
                border: '2px solid #e2e2e2'
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  {/* Start Icon */}
                  <img 
                    src="/icons/start.svg" 
                    alt="Getting Started"
                    className="w-10 h-10 flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 
                      className="font-semibold text-base leading-tight mb-1"
                      style={{ color: '#4c4c4c' }}
                    >
                      Getting Started Guide
                    </h3>
                    <p 
                      className="text-sm"
                      style={{ color: '#a5a5a5' }}
                    >
                      Basic setup and usage guide
                    </p>
                  </div>
                </div>
                
                <ChevronRight 
                  size={20} 
                  style={{ color: '#e2e2e2' }}
                  className="flex-shrink-0"
                />
              </div>
            </div>
            
            {/* Description below card */}
            <p 
              className="text-sm leading-relaxed px-2"
              style={{ color: '#a5a5a5' }}
            >
              Learn the basics of organizing tasks and using focus timers
            </p>
          </div>

          {/* Understanding Kai AI Card */}
          <div>
            <div 
              className="rounded-xl p-4 shadow-sm mb-3"
              style={{ 
                backgroundColor: 'white',
                border: '2px solid #e2e2e2'
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  {/* Kai Icon */}
                  <img 
                    src="/icons/kai.svg" 
                    alt="Kai AI"
                    className="w-10 h-10 flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 
                      className="font-semibold text-base leading-tight mb-1"
                      style={{ color: '#4c4c4c' }}
                    >
                      Understanding Kai AI
                    </h3>
                    <p 
                      className="text-sm"
                      style={{ color: '#a5a5a5' }}
                    >
                      How your AI assistant learns and helps
                    </p>
                  </div>
                </div>
                
                <ChevronRight 
                  size={20} 
                  style={{ color: '#e2e2e2' }}
                  className="flex-shrink-0"
                />
              </div>
            </div>
            
            {/* Description below card */}
            <p 
              className="text-sm leading-relaxed px-2"
              style={{ color: '#a5a5a5' }}
            >
              Discover how Kai adapts to your ADHD patterns and work style
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Footer Navigation */}
      <div 
        className="fixed bottom-0 left-0 right-0 p-6"
        style={{ backgroundColor: '#fef7d6' }}
      >
        <div className="max-w-sm mx-auto w-full md:max-w-md lg:max-w-lg">
          <div className="flex justify-between items-center">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ 
                backgroundColor: '#2847ef',
                color: 'white'
              }}
            >
              ← Back
            </button>

            {/* Finish Button */}
            <button
              onClick={onFinish}
              className="px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ 
                backgroundColor: '#fa772c',
                color: 'white'
              }}
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * COMPONENT USAGE EXAMPLES:
 * 
 * // Basic usage as final onboarding screen
 * <OnboardingScreen4 
 *   onBack={() => setCurrentStep(3)}
 *   onFinish={() => completeOnboarding()}
 * />
 * 
 * // With onboarding completion logic
 * <OnboardingScreen4
 *   onFinish={() => {
 *     markOnboardingComplete()
 *     saveUserPreferences()
 *     navigateToHome()
 *     showWelcomeTooltips()
 *   }}
 * />
 * 
 * // In complete onboarding flow
 * const OnboardingFlow = () => {
 *   const [currentStep, setCurrentStep] = useState(1)
 *   
 *   const handleFinishOnboarding = async () => {
 *     try {
 *       await saveOnboardingData(userData)
 *       setOnboardingComplete(true)
 *       setCurrentStep(null)
 *       router.push('/')
 *     } catch (error) {
 *       console.error('Failed to complete onboarding:', error)
 *     }
 *   }
 *   
 *   if (currentStep === 4) {
 *     return (
 *       <OnboardingScreen4
 *         onBack={() => setCurrentStep(3)}
 *         onFinish={handleFinishOnboarding}
 *       />
 *     )
 *   }
 *   // ... other screens
 * }
 * 
 * COMPLETION SCREEN DESIGN RATIONALE:
 * 
 * 1. **Celebratory Elements**:
 *    - Celebration icon creates immediate positive reinforcement
 *    - "You're all set!" acknowledges user effort and builds confidence
 *    - Light Yellow background conveys warmth and achievement
 * 
 * 2. **Practical Guidance**:
 *    - Shows exactly where to find settings (common point of confusion)
 *    - Recreates actual app cards to build familiarity
 *    - Provides clear path to help resources
 * 
 * 3. **Resource Discovery**:
 *    - Getting Started Guide for immediate next steps
 *    - Understanding Kai AI to maximize AI assistant benefits
 *    - Help & Support for when users need assistance
 * 
 * 4. **Visual Consistency**:
 *    - Cards match actual app styling for seamless transition
 *    - Maintains design patterns from previous onboarding screens
 *    - Uses established color palette and typography
 * 
 * USER PSYCHOLOGY CONSIDERATIONS:
 * 
 * 1. **Completion Satisfaction**: Celebrating completion creates positive
 *    association with the app and builds motivation to continue
 * 
 * 2. **Confidence Building**: Clear next steps prevent the overwhelm that
 *    can happen after onboarding when users don't know what to do
 * 
 * 3. **Self-Efficacy**: Showing users exactly where to find help builds
 *    confidence in their ability to use the app successfully
 * 
 * 4. **ADHD Considerations**: Clear, visual instructions reduce cognitive
 *    load and prevent the frustration of searching for basic functions
 * 
 * ONBOARDING COMPLETION BEST PRACTICES:
 * 
 * 1. **Celebrate Achievement**: Acknowledge the effort users put into setup
 * 2. **Provide Clear Next Steps**: Prevent the "what now?" moment
 * 3. **Show Key Resources**: Direct users to help before they need it
 * 4. **Build Familiarity**: Use actual app elements to reduce learning curve
 * 5. **Maintain Momentum**: Guide users toward immediate productive actions
 * 
 * ACCESSIBILITY FEATURES:
 * 
 * - High contrast text and interactive elements
 * - Large, clear touch targets for all interactive elements
 * - Consistent navigation patterns from previous screens
 * - Clear visual hierarchy with proper heading structure
 * - Screen reader friendly card layouts and descriptions
 * 
 * INTEGRATION WITH MAIN APP:
 * 
 * This screen should connect to:
 * - User preference storage system
 * - Onboarding completion tracking
 * - Help system integration
 * - Settings screen navigation
 * - Main app navigation flow
 * 
 * POST-ONBOARDING EXPERIENCE:
 * 
 * After users tap "Finish":
 * - Mark onboarding as complete in user preferences
 * - Navigate to main home screen
 * - Optionally show brief tooltips for key features
 * - Enable full app functionality
 * - Begin collecting usage data for Kai personalization
 */