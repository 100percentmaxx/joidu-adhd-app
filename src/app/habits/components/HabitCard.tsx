'use client'

import React, { useState } from 'react'
import { Habit, CATEGORY_CONFIGS } from '@/types/habits'
import { useHabitTracking } from '../hooks/useHabitTracking'
import ProgressBar from './ProgressBar'
import ActionButtons from './ActionButtons'

interface HabitCardProps {
  habit: Habit
  onSkip: (habitId: string) => void
  onReset: (habitId: string) => void
  onEdit: (habitId: string) => void
  initialExpanded?: boolean
}

export default function HabitCard({ habit, onSkip, onReset, onEdit, initialExpanded = false }: HabitCardProps) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded)
  const { getTodaysProgress, updateStepCompletion, calculateStreak, getCompletionPercentage } = useHabitTracking()
  
  const categoryConfig = CATEGORY_CONFIGS[habit.category]
  const todaysProgress = getTodaysProgress(habit.id)
  const completionPercentage = getCompletionPercentage(habit.id, habit.steps.length)
  const streak = calculateStreak(habit.id)
  
  const completedSteps = todaysProgress?.completedSteps || []
  const totalMinutes = habit.steps.reduce((sum, step) => sum + (step.estimatedMinutes || 0), 0)

  const handleStepToggle = (stepId: string, completed: boolean) => {
    updateStepCompletion(habit.id, stepId, completed)
  }

  const getDifficultyPill = (difficulty?: string) => {
    if (!difficulty || difficulty === 'normal') return null
    
    const pillStyles = {
      important: { bg: 'var(--category-finance-light)', text: 'var(--text-secondary)' },
      challenging: { bg: 'var(--category-creative-light)', text: '#FFFFFF' }
    }
    
    const style = pillStyles[difficulty as keyof typeof pillStyles]
    if (!style) return null

    return (
      <span style={{
        backgroundColor: style.bg,
        color: style.text,
        fontSize: '12px',
        fontWeight: 500,
        padding: '2px 6px',
        borderRadius: '8px',
        marginLeft: '8px',
        textTransform: 'capitalize'
      }}>
        {difficulty}
      </span>
    )
  }

  return (
    <div 
      className="transition-all duration-200 hover:scale-105"
      style={{
        backgroundColor: categoryConfig.lightColor,
        borderRadius: '16px',
        padding: '16px',
        marginBottom: '12px'
      }}>
      {/* Header Section */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '12px'
      }}>
        <img 
          src={`/icons/${categoryConfig.icon}`}
          alt={categoryConfig.name}
          style={{ width: '32px', height: '32px', marginRight: '12px', marginTop: '2px' }}
        />
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            margin: '0 0 4px 0'
          }}>
            {habit.name}
          </h3>
          <div style={{
            fontSize: '14px',
            fontWeight: 400,
            color: 'var(--text-secondary)',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12,6 12,12 16,14"/>
            </svg>
            <span>{totalMinutes} min</span>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginLeft: '8px', marginRight: '0px'}}>
              <circle cx="12" cy="16" r="4"/>
              <path d="M8 12V4l4 2 4-2v8"/>
            </svg>
            <span>{streak} day streak</span>
          </div>
        </div>
      </div>

      {/* Progress Bar with Completion Text and Chevron */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px'
      }}>
        {/* Progress Bar Container */}
        <div style={{ flex: 1 }}>
          <div style={{
            width: '100%',
            height: '14px',
            backgroundColor: 'var(--border-color)',
            border: '1px solid var(--border-color)',
            borderRadius: '7px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              width: `${completionPercentage}%`,
              height: '16px',
              backgroundColor: 'var(--primary-orange)',
              borderRadius: '6px',
              transition: 'width 0.3s ease',
              position: 'absolute',
              top: '-1px',
              left: '0'
            }} />
          </div>
        </div>

        {/* Completion Text */}
        <span style={{
          fontSize: '16px',
          fontWeight: 400,
          color: 'var(--text-secondary)',
          whiteSpace: 'nowrap'
        }}>
          {completedSteps.length}/{habit.steps.length}
        </span>

        {/* Chevron Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="var(--text-primary)" 
            strokeWidth="2"
            style={{
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }}
          >
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </button>
      </div>

      {/* Expanded Section */}
      {isExpanded && (
        <div style={{
          backgroundColor: 'var(--card-background)',
          borderRadius: '0px 0px 12px 12px',
          padding: '16px',
          marginTop: '12px',
          marginLeft: '-14px',
          marginRight: '-14px',
          marginBottom: '-14px'
        }}>
          {/* Step List */}
          <div style={{
            marginBottom: '18px'
          }}>
            {habit.steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id)
              
              return (
                <div
                  key={step.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: index < habit.steps.length - 1 ? '18px' : '0',
                    gap: '12px'
                  }}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => handleStepToggle(step.id, !isCompleted)}
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: isCompleted ? 'var(--checkbox-checked)' : 'var(--card-background)',
                      border: `1px solid ${isCompleted ? 'var(--checkbox-checked)' : 'var(--border-color)'}`,

                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  >
                    {isCompleted && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3">
                        <polyline points="20,6 9,17 4,12"></polyline>
                      </svg>
                    )}
                  </button>

                  {/* Step Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: isCompleted ? 'var(--text-disabled)' : 'var(--text-primary)',
                      textDecoration: isCompleted ? 'line-through' : 'none',
                      marginBottom: '4px',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      {step.description}
                      {getDifficultyPill(step.difficulty)}
                    </div>
                    
                    {step.estimatedMinutes && (
                      <div style={{
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12,6 12,12 16,14"/>
                        </svg>
                        {step.estimatedMinutes} min.
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Action Buttons */}
          <ActionButtons
            onSkip={() => onSkip(habit.id)}
            onReset={() => onReset(habit.id)}
            onEdit={() => onEdit(habit.id)}
          />
        </div>
      )}
    </div>
  )
}