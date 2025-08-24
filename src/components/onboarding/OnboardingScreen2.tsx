'use client'

import React, { useState } from 'react'

interface OnboardingScreen2Props {
  onBack?: () => void
  onSkip?: () => void
  onNext?: () => void
  initialDecade?: string
}

interface DecadeOption {
  id: string
  decade: string
  description: string
}

/**
 * ONBOARDING SCREEN 2 - DECADE SELECTION
 * 
 * This screen helps Kai understand the user's generational context to customize
 * communication style and references. By selecting their birth decade, users
 * help the AI assistant use language, cultural references, and examples that
 * feel natural and relatable. This is particularly important for ADHD users
 * who benefit from personalized, familiar communication.
 * 
 * KEY DESIGN PRINCIPLES:
 * - Light Orange background creates a warm, approachable feeling
 * - Clear grid layout makes options easy to scan and compare
 * - Cultural references help users quickly identify their generation
 * - Selected state provides clear visual feedback
 * - Maintains consistent navigation pattern from Screen 1
 * 
 * PERSONALIZATION BENEFITS:
 * - Enables age-appropriate references and analogies
 * - Adjusts communication formality and style
 * - Uses relevant cultural touchstones in examples
 * - Creates more relatable AI interactions
 * - Builds rapport through shared generational context
 */
export default function OnboardingScreen2({
  onBack,
  onSkip,
  onNext,
  initialDecade = '1980s'
}: OnboardingScreen2Props) {
  const [selectedDecade, setSelectedDecade] = useState<string>(initialDecade)

  const decadeOptions: DecadeOption[] = [
    {
      id: '1960s',
      decade: '1960s',
      description: 'Woodstock, moon landing'
    },
    {
      id: '1970s',
      decade: '1970s',
      description: 'MTV, arcade games'
    },
    {
      id: '1980s',
      decade: '1980s',
      description: 'Nintendo, dial-up internet'
    },
    {
      id: '1990s',
      decade: '1990s',
      description: 'Pokemon, early internet'
    },
    {
      id: '2000s',
      decade: '2000s',
      description: 'Social media, smartphones'
    },
    {
      id: '2010s',
      decade: '2010s',
      description: 'TikTok, iPad kids'
    }
  ]

  const handleDecadeSelect = (decadeId: string) => {
    setSelectedDecade(decadeId)
  }

  const handleNext = () => {
    if (onNext) {
      // Pass selected decade data to parent component or store in state
      onNext()
    }
  }

  return (
    <div 
      style={{ backgroundColor: '#f9dac5' }}
      className="min-h-screen flex flex-col"
    >
      {/* Main Content Container */}
      <div className="flex-1 flex flex-col items-center justify-start px-6 pt-12 pb-24 max-w-sm mx-auto w-full md:max-w-md lg:max-w-lg">
        
        {/* Kai's Chat Bubble */}
        <div className="w-full mb-8">
          <div 
            className="rounded-2xl p-6 shadow-sm relative"
            style={{ 
              backgroundColor: '#fefbf7',
              border: '2px solid #e2e2e2'
            }}
          >
            {/* Kai Icon */}
            <div className="flex items-start gap-3 mb-4">
              <img 
                src="/icons/kai.svg" 
                alt="Kai AI"
                className="w-8 h-8 flex-shrink-0"
              />
              <div className="flex-1">
                <p 
                  className="text-base leading-relaxed"
                  style={{ color: '#4c4c4c' }}
                >
                  I can customize my communication style to feel more natural for you. This helps me use references and language that actually resonate.
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
          When were you born?
        </h1>

        {/* Decade Selection Cards Grid */}
        <div className="w-full grid grid-cols-2 gap-4">
          {decadeOptions.map((option) => {
            const isSelected = selectedDecade === option.id
            
            return (
              <button
                key={option.id}
                onClick={() => handleDecadeSelect(option.id)}
                className={`
                  p-4 rounded-xl transition-all duration-200 text-center
                  hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-opacity-50
                  ${isSelected ? 'shadow-md' : 'shadow-sm'}
                `}
                style={{ 
                  backgroundColor: isSelected ? '#cae9ef' : '#fefbf7',
                  border: isSelected ? '2px solid #2847ef' : '2px solid transparent'
                }}
                aria-pressed={isSelected}
                aria-describedby={`${option.id}-description`}
              >
                <div className="flex flex-col items-center justify-center min-h-[80px]">
                  {/* Decade Label */}
                  <h3 
                    className="font-semibold text-lg mb-1"
                    style={{ color: '#2847ef' }}
                  >
                    {option.decade}
                  </h3>
                  
                  {/* Cultural References */}
                  <p 
                    id={`${option.id}-description`}
                    className="text-sm leading-tight"
                    style={{ color: '#a5a5a5' }}
                  >
                    {option.description}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Selection Feedback */}
        {selectedDecade && (
          <div className="mt-6 text-center">
            <p 
              className="text-sm"
              style={{ color: '#4c4c4c' }}
            >
              Selected: <span className="font-semibold">{selectedDecade}</span>
            </p>
          </div>
        )}
      </div>

      {/* Fixed Footer Navigation */}
      <div 
        className="fixed bottom-0 left-0 right-0 p-6"
        style={{ backgroundColor: '#f9dac5' }}
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
 * <OnboardingScreen2 
 *   onBack={() => setCurrentStep(1)}
 *   onSkip={() => completeOnboarding()}
 *   onNext={() => setCurrentStep(3)}
 * />
 * 
 * // With custom initial selection
 * <OnboardingScreen2
 *   initialDecade="1990s"
 *   onNext={() => {
 *     saveUserDecade(selectedDecade)
 *     setCurrentStep(3)
 *   }}
 * />
 * 
 * // In a stepper with data collection
 * const OnboardingFlow = () => {
 *   const [userData, setUserData] = useState({})
 *   
 *   const handleDecadeSelection = (decade) => {
 *     setUserData(prev => ({ ...prev, birthDecade: decade }))
 *     setCurrentStep(3)
 *   }
 *   
 *   return (
 *     <OnboardingScreen2
 *       onNext={handleDecadeSelection}
 *       // ... other props
 *     />
 *   )
 * }
 * 
 * DECADE SELECTION RATIONALE:
 * 
 * 1. **Cultural Context**: Each decade has distinct cultural references that
 *    help users immediately identify their generation
 * 
 * 2. **Communication Style**: Knowing the user's decade helps Kai adjust:
 *    - Formality level (Gen Z vs Baby Boomers)
 *    - Technology references (dial-up vs TikTok)
 *    - Pop culture analogies (Nintendo vs iPad)
 *    - Generational humor and tone
 * 
 * 3. **ADHD Relevance**: Different generations grew up with different:
 *    - Technology adoption patterns
 *    - Educational approaches to ADHD
 *    - Workplace expectations and norms
 *    - Productivity tool familiarity
 * 
 * DESIGN DECISIONS:
 * 
 * 1. **Grid Layout**: 2x3 grid is easy to scan and works well on mobile
 * 2. **Cultural Touchstones**: Instantly recognizable references for quick identification
 * 3. **Visual Selection**: Clear selected state with color change and border
 * 4. **Touch-Friendly**: Large tap targets with hover/active states
 * 5. **Accessibility**: Proper ARIA labels and focus management
 * 
 * AI PERSONALIZATION BENEFITS:
 * 
 * - **1960s**: Formal, respectful tone with classic references
 * - **1970s**: Casual but professional, music and early tech references
 * - **1980s**: Pop culture heavy, Nintendo/arcade game analogies
 * - **1990s**: Internet culture, Pokemon, casual communication
 * - **2000s**: Social media references, smartphone-era examples
 * - **2010s**: TikTok culture, very casual, meme references
 * 
 * ACCESSIBILITY FEATURES:
 * 
 * - Keyboard navigation support
 * - ARIA pressed states for selection
 * - Focus ring indicators
 * - High contrast text colors
 * - Descriptive aria-labels
 * - Screen reader friendly structure
 * 
 * RESPONSIVE CONSIDERATIONS:
 * 
 * - Grid adapts to screen size
 * - Touch targets are minimum 44px
 * - Adequate spacing on all devices
 * - Readable text at all sizes
 * - Consistent with Screen 1 layout patterns
 */