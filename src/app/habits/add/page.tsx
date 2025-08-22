'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { CategoryType, FrequencyType, RoutineStep, HabitSettings } from '@/types/habits'
import { useHabits } from '../hooks/useHabits'
import CategoryPills from '../components/CategoryPills'
import FrequencySelector from '../components/FrequencySelector'
import RoutineStepList from '../components/RoutineStepList'
import ToggleSettings from '../components/ToggleSettings'

function AddHabitContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { createHabit } = useHabits()

  // Form state
  const [habitName, setHabitName] = useState('')
  const [category, setCategory] = useState<CategoryType>()
  const [frequency, setFrequency] = useState<FrequencyType>('daily')
  const [targetTime, setTargetTime] = useState('08:00 PM')
  const [steps, setSteps] = useState<RoutineStep[]>([])
  const [settings, setSettings] = useState<HabitSettings>({
    reminder: true,
    trackStreaks: true,
    flexibleScheduling: true
  })

  // Load prefilled data from URL params
  useEffect(() => {
    // Handle new simple URL parameters from Empty State
    const title = searchParams.get('title')
    const category = searchParams.get('category') as CategoryType | null
    const frequency = searchParams.get('frequency') as FrequencyType | null
    
    if (title || category || frequency) {
      if (title) setHabitName(title)
      if (category) setCategory(category)
      if (frequency) setFrequency(frequency)
    }
    
    // Legacy support for complex JSON prefill data
    const prefillData = searchParams.get('prefill')
    if (prefillData) {
      try {
        const data = JSON.parse(prefillData)
        if (data.name) setHabitName(data.name)
        if (data.category) setCategory(data.category)
        if (data.steps && Array.isArray(data.steps)) {
          const routineSteps: RoutineStep[] = data.steps.map((step: string, index: number) => ({
            id: `step-${index}`,
            order: index,
            description: step,
            isCompleted: false
          }))
          setSteps(routineSteps)
        }
      } catch (error) {
        console.error('Error parsing prefill data:', error)
      }
    }
  }, [searchParams])

  const handleCreateHabit = () => {
    if (!habitName.trim() || !category) {
      alert('Please fill in all required fields')
      return
    }

    createHabit({
      name: habitName,
      category,
      frequency,
      targetTime,
      steps,
      isActive: true,
      settings
    })

    router.push('/habits')
  }

  const handleAddStep = () => {
    const newStep: RoutineStep = {
      id: `step-${Date.now()}`,
      order: steps.length,
      description: `Step ${steps.length + 1}`,
      isCompleted: false
    }
    setSteps([...steps, newStep])
  }

  const handleEditSteps = () => {
    // For now, just add a default step if none exist
    if (steps.length === 0) {
      handleAddStep()
    }
  }

  // Set default steps when the page loads or habit name changes
  useEffect(() => {
    if (steps.length === 0) {
      const defaultSteps: RoutineStep[] = [
        { id: 'step-1', order: 0, description: 'Find a quiet, comfortable spot', isCompleted: false },
        { id: 'step-2', order: 1, description: 'Choose a book or article', isCompleted: false },
        { id: 'step-3', order: 2, description: 'Read for 20 minutes', isCompleted: false },
        { id: 'step-4', order: 3, description: 'Reflect on what you learned', isCompleted: false }
      ]
      setSteps(defaultSteps)
    }
  }, [])

  const SectionDivider = () => (
    <div style={{
      height: '2px',
      backgroundColor: '#e2e2e2',
      width: '100%',
      margin: '18px 0'
    }} />
  )

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fefbf7',
      padding: '20px 16px 100px 16px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '32px',
        paddingTop: '20px'
      }}>
        <button
          onClick={() => router.back()}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ArrowLeft className="w-6 h-6" style={{ color: '#2847ef' }} />
        </button>
        
        <h1 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#2847ef',
          margin: 0
        }}>
          Add Habit
        </h1>
        
        <div style={{ width: '40px' }}></div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        {/* Habit Name Input */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            fontSize: '16px',
            fontWeight: 500,
            color: '#4c4c4c',
            display: 'block',
            marginBottom: '8px'
          }}>
            What habit do you want to build?
          </label>
          <input
            type="text"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            placeholder="Evening reading"
            style={{
              width: '100%',
              backgroundColor: '#FFFFFF',
              border: '2px solid #e2e2e2',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '16px',
              color: '#4c4c4c',
              outline: 'none'
            }}
          />
        </div>

        {/* AI Suggestion */}
        {habitName.length > 0 && (
          <>
            <div style={{
              backgroundColor: '#cae9ef',
              borderRadius: '12px',
              padding: '12px',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <img 
                src="/icons/kai.svg"
                alt="Kai"
                style={{ width: '24px', height: '24px', flexShrink: 0 }}
              />
              <span style={{
                fontSize: '14px',
                color: '#4c4c4c',
                flex: 1
              }}>
                {habitName.toLowerCase().includes('reading') 
                  ? "Reading is great for daily winddown. Want me to suggest a routine?"
                  : `${habitName} is a great habit choice! Want me to suggest a routine?`
                }
              </span>
              <button style={{
                backgroundColor: '#2847ef',
                color: '#FFFFFF',
                fontSize: '12px',
                padding: '4px 8px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer'
              }}>
                Accept
              </button>
            </div>
            <SectionDivider />
          </>
        )}

        {/* Category Selection */}
        <CategoryPills 
          selectedCategory={category}
          onSelect={setCategory}
        />
        <SectionDivider />

        {/* Frequency Selection */}
        <FrequencySelector 
          selectedFrequency={frequency}
          onSelect={setFrequency}
        />

        {/* Time Selection */}
        <div style={{ marginBottom: '18px' }}>
          <label style={{
            fontSize: '16px',
            fontWeight: 500,
            color: '#4c4c4c',
            display: 'block',
            marginBottom: '8px'
          }}>
            Best time of day?
          </label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            border: '2px solid #e2e2e2',
            borderRadius: '12px',
            padding: '12px 16px',
            gap: '8px'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a5a5a5" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12,6 12,12 16,14"/>
            </svg>
            <input
              type="time"
              value={targetTime}
              onChange={(e) => setTargetTime(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                color: '#4c4c4c',
                flex: 1,
                backgroundColor: 'transparent'
              }}
            />
          </div>
        </div>
        <SectionDivider />

        {/* Routine Steps */}
        <RoutineStepList
          steps={steps}
          onEdit={handleEditSteps}
          onAddStep={handleAddStep}
          onUpdateSteps={setSteps}
        />
        <SectionDivider />

        {/* Settings Toggles */}
        <ToggleSettings settings={settings} onChange={setSettings} />

        {/* Section Divider after toggles */}
        <div style={{
          height: '2px',
          backgroundColor: '#e2e2e2',
          width: '100%',
          marginTop: '18px'
        }} />

        {/* Create Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '18px',
          marginBottom: '100px'
        }}>
          <button
            onClick={handleCreateHabit}
            style={{
              backgroundColor: '#2847ef',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: 600,
              height: '48px',
              paddingLeft: '24px',
              paddingRight: '24px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(40, 71, 239, 0.3)'
            }}
          >
            Create Habit
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AddHabitPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddHabitContent />
    </Suspense>
  )
}