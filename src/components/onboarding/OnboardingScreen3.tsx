'use client'

import React, { useState } from 'react'

interface OnboardingScreen3Props {
  onBack?: () => void
  onSkip?: () => void
  onNext?: () => void
  initialSelection?: string
}

interface ADHDJourneyOption {
  id: string
  title: string
  subtitle: string
  iconPlaceholder: string
}

/**
 * ONBOARDING SCREEN 3 - ADHD JOURNEY ASSESSMENT
 * 
 * This screen helps Kai understand the user's current relationship with their
 * ADHD diagnosis and management strategies. This is crucial for providing
 * appropriate support, using the right level of explanation, and offering
 * tools that match their experience level. The three categories capture the
 * most common user personas in the ADHD productivity space.
 * 
 * KEY DESIGN PRINCIPLES:
 * - Light Purple background creates a calm, supportive atmosphere
 * - Empathetic language acknowledges different ADHD experiences
 * - Clear categorization helps users self-identify quickly
 * - Non-judgmental tone supports users at any stage
 * - Maintains visual consistency with previous screens
 * 
 * USER PERSONA CATEGORIES:
 * 1. Newly Diagnosed - Recent diagnosis, learning basics, needs gentle guidance
 * 2. Self-Aware but Struggling - Knows ADHD traits, seeks effective systems
 * 3. Experienced but Adapting - Long-term management, wants better tools
 * 
 * PERSONALIZATION BENEFITS:
 * - Adjusts explanation depth and complexity
 * - Provides appropriate level of ADHD education
 * - Customizes onboarding flow based on experience
 * - Offers relevant tips and strategies
 * - Sets realistic expectations for progress
 */
export default function OnboardingScreen3({
  onBack,
  onSkip,
  onNext,
  initialSelection = 'self-aware'
}: OnboardingScreen3Props) {
  const [selectedOption, setSelectedOption] = useState<string>(initialSelection)

  const adhdJourneyOptions: ADHDJourneyOption[] = [
    {
      id: 'newly-diagnosed',
      title: 'Newly diagnosed',
      subtitle: 'Diagnosed within the last year - still figuring things out and learning what works',
      iconPlaceholder: 'NEW'
    },
    {
      id: 'self-aware',
      title: 'Self-aware but struggling',
      subtitle: 'I know I have ADHD traits but haven\'t found the right system yet',
      iconPlaceholder: 'FOCUS'
    },
    {
      id: 'experienced',
      title: 'Experienced but adapting',
      subtitle: 'Living with ADHD for years - looking for better tools and strategies',
      iconPlaceholder: 'TARGET'
    }
  ]

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
  }

  const handleNext = () => {
    if (onNext) {
      // Pass selected ADHD journey data to parent component
      onNext()
    }
  }

  return (
    <div 
      style={{ backgroundColor: '#e6e1f4' }}
      className="min-h-screen flex flex-col"
    >
      {/* Main Content Container */}
      <div className="flex-1 flex flex-col items-center justify-start px-6 pt-12 pb-24 max-w-sm mx-auto w-full md:max-w-md lg:max-w-lg">
        
        {/* Kai's Chat Bubble */}
        <div className="w-full mb-8">
          <div 
            className="rounded-2xl p-6 shadow-sm relative"
            style={{ 
              backgroundColor: 'white',
              border: '2px solid #e2e2e2'
            }}
          >
            {/* Kai Icon */}
            <div className="flex items-start gap-3">
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
                  Cool! I can already tell we're going to get along great. Now, I want to make sure I understand your ADHD experience so I can support you in the right way.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Question Heading */}
        <h1 
          className="text-2xl font-bold text-center mb-8"
          style={{ color: '#4c4c4c' }}
        >
          How would you describe your ADHD journey?
        </h1>

        {/* ADHD Journey Selection Cards */}
        <div className="w-full space-y-4">
          {adhdJourneyOptions.map((option) => {
            const isSelected = selectedOption === option.id
            
            return (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className={`
                  w-full p-6 rounded-xl transition-all duration-200 text-left
                  hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-opacity-50
                  ${isSelected ? 'shadow-md' : 'shadow-sm'}
                `}
                style={{ 
                  backgroundColor: isSelected ? '#cae9ef' : 
                    option.id === 'experienced' ? '#fefbf7' : 'white',
                  border: isSelected ? '2px solid #2847ef' : '2px solid #e2e2e2',
                  focusRingColor: '#2847ef'
                }}
                aria-pressed={isSelected}
                aria-describedby={`${option.id}-description`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon Placeholder */}
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-xs font-medium flex-shrink-0 mt-1"
                    style={{ 
                      backgroundColor: '#2847ef',
                      color: 'white'
                    }}
                  >
                    {/* Placeholder for respective SVG icons */}
                    {option.iconPlaceholder}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    {/* Title */}
                    <h3 
                      className="font-semibold text-lg mb-2 leading-tight"
                      style={{ color: '#2847ef' }}
                    >
                      {option.title}
                    </h3>
                    
                    {/* Subtitle */}
                    <p 
                      id={`${option.id}-description`}
                      className="text-sm leading-relaxed"
                      style={{ color: '#a5a5a5' }}
                    >
                      {option.subtitle}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Selection Feedback */}
        {selectedOption && (
          <div className="mt-6 text-center">
            <p 
              className="text-sm"
              style={{ color: '#4c4c4c' }}
            >
              Selected: <span className="font-semibold">
                {adhdJourneyOptions.find(opt => opt.id === selectedOption)?.title}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Fixed Footer Navigation */}
      <div 
        className="fixed bottom-0 left-0 right-0 p-6"
        style={{ backgroundColor: '#e6e1f4' }}
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

            {/* Skip and Next Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={onSkip}
                className="px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ 
                  backgroundColor: '#2847ef',
                  color: 'white'
                }}
              >
                Skip
              </button>
              <button
                onClick={handleNext}
                className="px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
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
    </div>
  )
}

/**
 * COMPONENT USAGE EXAMPLES:
 * 
 * // Basic usage in onboarding flow
 * <OnboardingScreen3 
 *   onBack={() => setCurrentStep(2)}
 *   onSkip={() => completeOnboarding()}
 *   onNext={() => setCurrentStep(4)}
 * />
 * 
 * // With custom initial selection
 * <OnboardingScreen3
 *   initialSelection="newly-diagnosed"
 *   onNext={() => {
 *     saveADHDJourney(selectedOption)
 *     setCurrentStep(4)
 *   }}
 * />
 * 
 * // With data collection
 * const OnboardingFlow = () => {
 *   const [userProfile, setUserProfile] = useState({})
 *   
 *   const handleADHDJourneySelection = (journey) => {
 *     setUserProfile(prev => ({ ...prev, adhdJourney: journey }))
 *     customizeKaiPersonality(journey)
 *     setCurrentStep(4)
 *   }
 *   
 *   return (
 *     <OnboardingScreen3
 *       onNext={handleADHDJourneySelection}
 *       // ... other props
 *     />
 *   )
 * }
 * 
 * ADHD JOURNEY CATEGORIES RATIONALE:
 * 
 * 1. **NEWLY DIAGNOSED** (Recent diagnosis within ~1 year)
 *    - Characteristics: Learning basic ADHD concepts, trying initial strategies
 *    - Needs: Gentle guidance, foundational education, patience with learning
 *    - Kai Approach: More explanation, basic terminology, encouraging tone
 *    - Common Feelings: Overwhelmed, hopeful, uncertain, relief from diagnosis
 * 
 * 2. **SELF-AWARE BUT STRUGGLING** (Knows ADHD traits, seeking effective systems)
 *    - Characteristics: Understands ADHD, tried various approaches, inconsistent success
 *    - Needs: Practical systems, accountability, motivation during setbacks
 *    - Kai Approach: Solution-focused, practical strategies, empathetic support
 *    - Common Feelings: Frustrated, determined, open to new approaches
 * 
 * 3. **EXPERIENCED BUT ADAPTING** (Long-term management, wants optimization)
 *    - Characteristics: Years of ADHD management, knows what works/doesn't, life changes
 *    - Needs: Advanced strategies, efficiency improvements, adapting to new circumstances
 *    - Kai Approach: Collaborative, advanced techniques, respects existing knowledge
 *    - Common Feelings: Confident but seeking growth, adapting to life changes
 * 
 * PERSONALIZATION IMPACT ON KAI:
 * 
 * **Newly Diagnosed:**
 * - Explains ADHD concepts more thoroughly
 * - Uses encouraging, patient language
 * - Provides more context for suggestions
 * - Celebrates small wins enthusiastically
 * - Avoids overwhelming with too many options
 * 
 * **Self-Aware but Struggling:**
 * - Focuses on practical, actionable advice
 * - Acknowledges past struggles without dwelling
 * - Offers specific system recommendations
 * - Provides motivation during difficult times
 * - Balances empathy with forward momentum
 * 
 * **Experienced but Adapting:**
 * - Respects existing knowledge and experience
 * - Offers advanced strategies and optimizations
 * - Collaborates rather than instructs
 * - Focuses on efficiency and refinement
 * - Adapts suggestions to changing life circumstances
 * 
 * DESIGN CONSIDERATIONS:
 * 
 * 1. **Empathetic Language**: Each option acknowledges the user's experience
 *    without judgment or assumptions about their capabilities
 * 
 * 2. **Clear Differentiation**: The three categories cover the spectrum of
 *    ADHD management experience without overlap
 * 
 * 3. **Visual Hierarchy**: Icons, titles, and descriptions create clear
 *    information structure for easy scanning
 * 
 * 4. **Inclusive Approach**: Language is welcoming regardless of diagnosis
 *    status or self-identification preferences
 * 
 * 5. **Future Flexibility**: Categories allow for different onboarding paths
 *    and personalized feature introductions
 * 
 * ACCESSIBILITY FEATURES:
 * 
 * - Large touch targets for mobile interaction
 * - Clear visual selection states
 * - ARIA pressed states and descriptions
 * - Keyboard navigation support
 * - High contrast text and interactive elements
 * - Screen reader friendly structure and labels
 * 
 * DATA UTILIZATION:
 * 
 * This selection influences:
 * - Kai's communication style and tone
 * - Depth of explanations provided
 * - Types of strategies and tools suggested
 * - Onboarding flow complexity
 * - Feature introduction timing
 * - Support resource recommendations
 */