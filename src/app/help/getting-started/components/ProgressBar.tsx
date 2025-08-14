import React from 'react'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div style={{ marginBottom: '24px' }}>
      {/* Progress Text */}
      <p style={{
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: 500,
        color: '#a5a5a5',
        margin: 0,
        marginBottom: '8px'
      }}>
        Step {currentStep} of {totalSteps}
      </p>
      
      {/* Progress Bar */}
      <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: '#e2e2e2',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div 
          style={{
            height: '100%',
            backgroundColor: '#2847ef',
            borderRadius: '4px',
            width: `${progress}%`,
            transition: 'width 0.3s ease-out'
          }}
        />
      </div>
    </div>
  )
}