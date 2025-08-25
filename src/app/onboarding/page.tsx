'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import OnboardingScreen1 from '@/components/onboarding/OnboardingScreen1'
import OnboardingScreen2 from '@/components/onboarding/OnboardingScreen2'
import OnboardingScreen3 from '@/components/onboarding/OnboardingScreen3'
import OnboardingScreen4 from '@/components/onboarding/OnboardingScreen4'

/**
 * COMPLETE ONBOARDING FLOW WITH CLERK INTEGRATION
 * 
 * This page orchestrates the entire onboarding sequence for new Joidu users.
 * It manages the step progression, data collection, and completion handling
 * for the four-screen onboarding journey that introduces users to Joidu
 * and collects essential personalization data for Kai.
 * 
 * INTEGRATION WITH CLERK:
 * - Uses useUser hook to access authenticated user data
 * - Stores onboarding completion in user metadata
 * - Personalizes experience with user's first name if available
 * - Ensures only authenticated users can access onboarding
 * 
 * ONBOARDING JOURNEY:
 * 1. Welcome & Introduction - Meet Kai, preview key features
 * 2. Decade Selection - Generational context for communication style
 * 3. ADHD Journey Assessment - Experience level and support needs
 * 4. Completion & Guidance - Celebrate success, show next steps
 * 
 * DATA COLLECTION:
 * - User's birth decade for cultural references
 * - ADHD experience level for appropriate support
 * - Onboarding completion status stored in Clerk user metadata
 * 
 * NAVIGATION PATTERNS:
 * - Linear progression with back button support
 * - Skip option available on screens 1-3
 * - Finish button only on final screen
 */
export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useUser()
  const [currentStep, setCurrentStep] = useState(1)
  const [onboardingData, setOnboardingData] = useState({
    birthDecade: '1980s',
    adhdJourney: 'self-aware',
    completedAt: null as Date | null
  })

  /**
   * NAVIGATION HANDLERS
   */
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      // Go back to welcome screen or home
      router.push('/')
    }
  }

  const handleSkip = () => {
    // Skip to main app without completing onboarding
    completeOnboarding(true)
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleFinish = () => {
    completeOnboarding(false)
  }

  /**
   * ONBOARDING COMPLETION WITH CLERK INTEGRATION
   */
  const completeOnboarding = async (skipped: boolean = false) => {
    const completionData = {
      ...onboardingData,
      completedAt: new Date(),
      skipped
    }

    try {
      // Save onboarding data to localStorage for immediate access
      localStorage.setItem('joidu_onboarding', JSON.stringify(completionData))
      localStorage.setItem('joidu_onboarding_complete', 'true')
      
      // Store onboarding data in Clerk user metadata
      if (user) {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            onboarding: completionData
          }
        })
      }
      
      console.log('Onboarding completed:', completionData)
      
      // Navigate to main app
      router.push('/')
      
    } catch (error) {
      console.error('Failed to save onboarding data:', error)
      // Still navigate to main app even if saving fails
      router.push('/')
    }
  }

  /**
   * DATA COLLECTION HANDLERS
   */
  const handleDecadeSelection = (decade: string) => {
    setOnboardingData(prev => ({ ...prev, birthDecade: decade }))
  }

  const handleADHDJourneySelection = (journey: string) => {
    setOnboardingData(prev => ({ ...prev, adhdJourney: journey }))
  }

  /**
   * RENDER CURRENT SCREEN
   */
  const renderCurrentScreen = () => {
    switch (currentStep) {
      case 1:
        return (
          <OnboardingScreen1
            onBack={handleBack}
            onSkip={handleSkip}
            onNext={handleNext}
          />
        )
      
      case 2:
        return (
          <OnboardingScreen2
            onBack={handleBack}
            onSkip={handleSkip}
            onNext={() => {
              handleDecadeSelection(onboardingData.birthDecade)
              handleNext()
            }}
            initialDecade={onboardingData.birthDecade}
          />
        )
      
      case 3:
        return (
          <OnboardingScreen3
            onBack={handleBack}
            onSkip={handleSkip}
            onNext={() => {
              handleADHDJourneySelection(onboardingData.adhdJourney)
              handleNext()
            }}
            initialSelection={onboardingData.adhdJourney}
          />
        )
      
      case 4:
        return (
          <OnboardingScreen4
            onBack={handleBack}
            onFinish={handleFinish}
          />
        )
      
      default:
        return (
          <OnboardingScreen1
            onBack={handleBack}
            onSkip={handleSkip}
            onNext={handleNext}
          />
        )
    }
  }

  return (
    <div className="min-h-screen">
      {/* Debug Info - Only show in development */}
      {process.env.NODE_ENV === 'development' && (
        <div 
          style={{
            position: 'fixed',
            top: '10px',
            left: '10px',
            zIndex: 1000,
            backgroundColor: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #ddd',
            fontSize: '12px',
            opacity: 0.8
          }}
        >
          <div>Step: {currentStep}/4</div>
          <div>Decade: {onboardingData.birthDecade}</div>
          <div>Journey: {onboardingData.adhdJourney}</div>
        </div>
      )}

      {/* Progress Indicator */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          backgroundColor: '#f0f0f0',
          zIndex: 100
        }}
      >
        <div 
          style={{
            height: '100%',
            backgroundColor: '#2847ef',
            width: `${(currentStep / 4) * 100}%`,
            transition: 'width 0.3s ease'
          }}
        />
      </div>

      {/* Current Screen */}
      {renderCurrentScreen()}
    </div>
  )
}

/**
 * ONBOARDING DATA STRUCTURE:
 * 
 * The onboarding process collects the following user data:
 * 
 * {
 *   birthDecade: '1980s' | '1970s' | '1990s' | '2000s' | '2010s' | '1960s',
 *   adhdJourney: 'newly-diagnosed' | 'self-aware' | 'experienced',
 *   completedAt: Date,
 *   skipped: boolean
 * }
 * 
 * This data is used to:
 * - Personalize Kai's communication style and cultural references
 * - Adjust the depth and type of ADHD support provided
 * - Customize the initial app experience and feature introductions
 * - Track onboarding completion for analytics and user experience
 * 
 * INTEGRATION WITH MAIN APP:
 * 
 * // Check onboarding status in main app
 * const isOnboardingComplete = localStorage.getItem('joidu_onboarding_complete') === 'true'
 * const onboardingData = JSON.parse(localStorage.getItem('joidu_onboarding') || '{}')
 * 
 * // Use onboarding data to customize experience
 * const customizeKaiPersonality = (data) => {
 *   return {
 *     communicationStyle: getStyleForDecade(data.birthDecade),
 *     supportLevel: getSupportForJourney(data.adhdJourney),
 *     culturalReferences: getReferencesForDecade(data.birthDecade)
 *   }
 * }
 * 
 * ANALYTICS AND TRACKING:
 * 
 * Track onboarding funnel:
 * - Screen 1 completion rate
 * - Screen 2 decade selection distribution
 * - Screen 3 ADHD journey distribution  
 * - Overall completion vs skip rate
 * - Time spent on each screen
 * - Drop-off points for optimization
 * 
 * POST-ONBOARDING EXPERIENCE:
 * 
 * After onboarding completion:
 * 1. Navigate to home screen with welcome tooltips
 * 2. Initialize Kai with personalization data
 * 3. Show getting started checklist if needed
 * 4. Enable all app features
 * 5. Begin collecting usage patterns for further personalization
 */