'use client'

import React, { useState, useCallback } from 'react'
import { TaskStep } from '@/types/focus'

interface TaskBreakdownProps {
  taskTitle: string
  onStepsGenerated: (steps: TaskStep[]) => void
  onComplete: () => void
  isGenerating?: boolean
}

export default function TaskBreakdown({ 
  taskTitle, 
  onStepsGenerated, 
  onComplete,
  isGenerating = false 
}: TaskBreakdownProps) {
  const [steps, setSteps] = useState<TaskStep[]>([])
  const [showSteps, setShowSteps] = useState(false)

  // Simulate AI task breakdown (replace with actual AI call)
  const generateTaskSteps = useCallback(async () => {
    // This would be replaced with actual AI integration
    const simulatedSteps: TaskStep[] = [
      {
        id: '1',
        title: 'Gather all materials',
        description: 'Collect everything you need before starting',
        isCompleted: false,
        estimatedMinutes: 5
      },
      {
        id: '2', 
        title: 'Create outline or plan',
        description: 'Break down the main task into smaller parts',
        isCompleted: false,
        estimatedMinutes: 10
      },
      {
        id: '3',
        title: 'Complete first part',
        description: 'Focus on just the first piece - don\'t worry about the rest yet',
        isCompleted: false,
        estimatedMinutes: 15
      },
      {
        id: '4',
        title: 'Take a micro-break',
        description: 'Stretch, breathe, or grab water before continuing',
        isCompleted: false,
        estimatedMinutes: 3
      },
      {
        id: '5',
        title: 'Continue with next part',
        description: 'Move to the next logical piece of the task',
        isCompleted: false,
        estimatedMinutes: 15
      }
    ]

    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSteps(simulatedSteps)
    setShowSteps(true)
    onStepsGenerated(simulatedSteps)
  }, [onStepsGenerated])

  const toggleStepCompletion = (stepId: string) => {
    const updatedSteps = steps.map(step => 
      step.id === stepId 
        ? { ...step, isCompleted: !step.isCompleted }
        : step
    )
    setSteps(updatedSteps)
  }

  const completedSteps = steps.filter(step => step.isCompleted).length
  const progressPercentage = steps.length > 0 ? (completedSteps / steps.length) * 100 : 0

  if (isGenerating) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#fefbf7' }}>
        <div className="text-center max-w-sm">
          {/* Animated loading dots */}
          <div className="flex justify-center space-x-2 mb-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ 
                  backgroundColor: '#fa772c',
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
          
          <h2 style={{ 
            color: '#2847ef', 
            fontSize: '24px', 
            fontWeight: 600,
            marginBottom: '12px'
          }}>
            Breaking Down Your Task
          </h2>
          
          <p style={{ 
            color: '#a5a5a5', 
            fontSize: '16px',
            lineHeight: '1.4'
          }}>
            Creating manageable steps that work with your ADHD brain...
          </p>
        </div>
      </div>
    )
  }

  if (!showSteps) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#fefbf7' }}>
        <div className="max-w-md p-6 text-center">
          <div className="mb-6">
            <span style={{ fontSize: '48px' }}>🧠</span>
          </div>
          
          <h2 style={{ 
            color: '#2847ef', 
            fontSize: '24px', 
            fontWeight: 600,
            marginBottom: '12px'
          }}>
            Need Help Breaking This Down?
          </h2>
          
          <p style={{ 
            color: '#4c4c4c', 
            fontSize: '16px',
            lineHeight: '1.4',
            marginBottom: '24px'
          }}>
            "<strong>{taskTitle}</strong>" can feel overwhelming. Let Kai help you break it into 
            ADHD-friendly steps that feel manageable.
          </p>

          <button
            onClick={generateTaskSteps}
            className="w-full py-4 px-6 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: '#fa772c' }}
          >
            Break It Down for Me
          </button>

          <button
            onClick={onComplete}
            className="w-full mt-3 py-3 px-6 rounded-lg font-medium text-gray-600 border-2 border-gray-300 hover:border-gray-400 transition-all duration-200"
            style={{ backgroundColor: 'white' }}
          >
            I'll Figure It Out Myself
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-5" style={{ backgroundColor: '#fefbf7' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 style={{ 
            color: '#2847ef', 
            fontSize: '24px', 
            fontWeight: 600,
            marginBottom: '8px'
          }}>
            Task Breakdown
          </h1>
          <p style={{ 
            color: '#a5a5a5', 
            fontSize: '16px' 
          }}>
            {taskTitle}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span style={{ color: '#4c4c4c', fontSize: '16px', fontWeight: 500 }}>
              Progress
            </span>
            <span style={{ color: '#2847ef', fontSize: '16px', fontWeight: 600 }}>
              {completedSteps}/{steps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="h-3 rounded-full transition-all duration-500"
              style={{ 
                width: `${progressPercentage}%`,
                backgroundColor: '#a8e2bb'
              }}
            />
          </div>
        </div>

        {/* Task steps */}
        <div className="space-y-4 mb-6">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className="p-4 bg-white rounded-lg border-2 transition-all duration-200"
              style={{ 
                borderColor: step.isCompleted ? '#a8e2bb' : '#e2e2e2',
                opacity: step.isCompleted ? 0.8 : 1
              }}
            >
              <div className="flex items-start space-x-4">
                {/* Checkbox */}
                <button
                  onClick={() => toggleStepCompletion(step.id)}
                  className="mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                  style={{
                    borderColor: step.isCompleted ? '#a8e2bb' : '#a5a5a5',
                    backgroundColor: step.isCompleted ? '#a8e2bb' : 'transparent'
                  }}
                >
                  {step.isCompleted && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 style={{ 
                      color: step.isCompleted ? '#a5a5a5' : '#4c4c4c',
                      fontSize: '16px',
                      fontWeight: 500,
                      textDecoration: step.isCompleted ? 'line-through' : 'none'
                    }}>
                      Step {index + 1}: {step.title}
                    </h3>
                    <span style={{ 
                      color: '#a5a5a5', 
                      fontSize: '14px' 
                    }}>
                      {step.estimatedMinutes}m
                    </span>
                  </div>
                  <p style={{ 
                    color: step.isCompleted ? '#a5a5a5' : '#4c4c4c',
                    fontSize: '14px',
                    lineHeight: '1.4'
                  }}>
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          {progressPercentage === 100 ? (
            <button
              onClick={onComplete}
              className="w-full py-4 px-6 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: '#a8e2bb' }}
            >
              🎉 All Done! Start Focus Session
            </button>
          ) : (
            <button
              onClick={onComplete}
              className="w-full py-4 px-6 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: '#2847ef' }}
            >
              Start Focus Session ({completedSteps}/{steps.length} steps ready)
            </button>
          )}

          <button
            onClick={() => generateTaskSteps()}
            className="w-full py-3 px-6 rounded-lg font-medium text-gray-600 border-2 border-gray-300 hover:border-gray-400 transition-all duration-200"
            style={{ backgroundColor: 'white' }}
          >
            Regenerate Steps
          </button>
        </div>

        {/* ADHD encouragement */}
        <div 
          className="mt-6 p-4 rounded-lg"
          style={{ backgroundColor: '#e6f3ff', border: '1px solid #2847ef' }}
        >
          <div className="flex items-start space-x-3">
            <span style={{ fontSize: '20px' }}>💪</span>
            <div>
              <h4 style={{ 
                color: '#2847ef', 
                fontSize: '14px', 
                fontWeight: 600,
                marginBottom: '4px'
              }}>
                You've Got This!
              </h4>
              <p style={{ 
                color: '#4c4c4c', 
                fontSize: '14px',
                lineHeight: '1.4'
              }}>
                Breaking tasks into smaller steps works perfectly with ADHD brains. 
                Each completed step is a win worth celebrating! 🌟
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}