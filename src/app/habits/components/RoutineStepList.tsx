'use client'

import React, { useState } from 'react'
import { RoutineStep } from '@/types/habits'

interface RoutineStepListProps {
  steps: RoutineStep[]
  onEdit: () => void
  onAddStep: () => void
  onUpdateSteps?: (steps: RoutineStep[]) => void
}

export default function RoutineStepList({ steps, onEdit, onAddStep, onUpdateSteps }: RoutineStepListProps) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [editableSteps, setEditableSteps] = useState<RoutineStep[]>(steps)

  React.useEffect(() => {
    setEditableSteps(steps)
  }, [steps])

  const handleEditClick = () => {
    setIsEditMode(true)
    onEdit()
  }

  const handleDoneClick = () => {
    setIsEditMode(false)
    if (onUpdateSteps) {
      onUpdateSteps(editableSteps)
    }
  }

  const handleStepTextChange = (stepId: string, newText: string) => {
    const updatedSteps = editableSteps.map(step => 
      step.id === stepId ? { ...step, description: newText } : step
    )
    setEditableSteps(updatedSteps)
  }

  const handleRemoveStep = (stepId: string) => {
    const filteredSteps = editableSteps.filter(step => step.id !== stepId)
    // Renumber the remaining steps
    const renumberedSteps = filteredSteps.map((step, index) => ({
      ...step,
      order: index
    }))
    setEditableSteps(renumberedSteps)
  }

  const handleAddStepClick = () => {
    onAddStep()
    // The new step will be added to editableSteps through the useEffect when steps prop updates
  }
  return (
    <div>
      {/* Header */}
      <h3 style={{
        fontSize: '16px',
        fontWeight: 500,
        color: '#4c4c4c',
        margin: '0 0 12px 0'
      }}>
        Routine Steps
      </h3>

      {/* Steps List */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '2px solid #e2e2e2',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '12px'
      }}>
        {editableSteps.map((step, index) => (
          <div key={step.id}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '18px',
              padding: '12px 0',
              position: 'relative'
            }}>
              {/* Number Circle */}
              <div style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#a8e2bb',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <span style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#FFFFFF'
                }}>
                  {index + 1}
                </span>
              </div>

              {/* Step Text */}
              <div style={{ flex: 1, paddingRight: isEditMode ? '80px' : '0' }}>
                {isEditMode ? (
                  <input
                    type="text"
                    value={step.description}
                    onChange={(e) => handleStepTextChange(step.id, e.target.value)}
                    style={{
                      width: '100%',
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#4c4c4c',
                      lineHeight: '1.3',
                      border: '1px solid #e2e2e2',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      outline: 'none'
                    }}
                  />
                ) : (
                  <span style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#4c4c4c',
                    lineHeight: '1.3'
                  }}>
                    {step.description}
                  </span>
                )}
              </div>

              {/* Remove Button (Edit Mode Only) */}
              {isEditMode && (
                <button
                  onClick={() => handleRemoveStep(step.id)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: '#f4b7ae',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 500,
                    height: '24px',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              )}
            </div>

            {/* Divider (except for last item) */}
            {index < editableSteps.length - 1 && (
              <div style={{
                height: '1px',
                backgroundColor: '#e2e2e2',
                marginLeft: '18px',
                marginRight: '18px'
              }} />
            )}
          </div>
        ))}

        {/* Done Button (Edit Mode Only) */}
        {isEditMode && (
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingTop: '8px',
            paddingRight: '12px'
          }}>
            <button
              onClick={handleDoneClick}
              style={{
                backgroundColor: '#2847ef',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 500,
                height: '24px',
                paddingLeft: '8px',
                paddingRight: '8px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Done
            </button>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        marginBottom: '18px'
      }}>
        {/* Add Step Button (Only shown in edit mode) */}
        {isEditMode && (
          <button
            onClick={handleAddStepClick}
            style={{
              backgroundColor: '#2847ef',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 500,
              height: '40px',
              paddingLeft: '16px',
              paddingRight: '16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Add Step
          </button>
        )}
        
        {/* Edit Button (Only shown when not in edit mode) */}
        {!isEditMode && (
          <button
            onClick={handleEditClick}
            style={{
              backgroundColor: '#2847ef',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 500,
              height: '40px',
              paddingLeft: '16px',
              paddingRight: '16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  )
}