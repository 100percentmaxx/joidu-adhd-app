import React from 'react'

interface NavigationButtonsProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  onNext: () => void
  onComplete: () => void
}

export default function NavigationButtons({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext, 
  onComplete 
}: NavigationButtonsProps) {
  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === totalSteps

  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      marginTop: '32px'
    }}>
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        disabled={isFirstStep}
        style={{
          flex: 1,
          backgroundColor: isFirstStep ? '#f5f5f5' : '#e2e2e2',
          color: isFirstStep ? '#a5a5a5' : '#4c4c4c',
          border: 'none',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '16px',
          fontWeight: 500,
          cursor: isFirstStep ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => {
          if (!isFirstStep) {
            e.currentTarget.style.backgroundColor = '#d5d5d5'
          }
        }}
        onMouseOut={(e) => {
          if (!isFirstStep) {
            e.currentTarget.style.backgroundColor = '#e2e2e2'
          }
        }}
      >
        Previous
      </button>

      {/* Next/Complete Button */}
      <button
        onClick={isLastStep ? onComplete : onNext}
        style={{
          flex: 1,
          backgroundColor: '#2847ef',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '16px',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#1e3acf'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#2847ef'
        }}
      >
        {isLastStep ? 'Complete Guide' : 'Next'}
      </button>
    </div>
  )
}