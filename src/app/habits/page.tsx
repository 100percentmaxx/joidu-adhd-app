'use client'

import React, { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Plus } from 'lucide-react'
import LightningFAB from '@/components/ui/LightningFAB'
import HabitCardComponent from './components/HabitCard'
import { useHabits } from './hooks/useHabits'
import { useHabitTracking } from './hooks/useHabitTracking'

function HabitsContent() {
  const router = useRouter()
  const { habits, loading } = useHabits()
  const { skipHabit } = useHabitTracking()
  const searchParams = useSearchParams()
  const expandHabit = searchParams.get('expand')

  const handleSkipHabit = (habitId: string) => {
    if (confirm('Skip this habit for today? This won\'t break your streak.')) {
      skipHabit(habitId)
    }
  }

  const handleResetHabit = (habitId: string) => {
    if (confirm('Reset this habit\'s streak? This cannot be undone.')) {
      // Reset functionality would be implemented here
      console.log('Reset habit:', habitId)
    }
  }

  const handleEditHabit = (habitId: string) => {
    // Navigate to edit screen
    console.log('Edit habit:', habitId)
  }

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: 'var(--background)',
        padding: '20px 16px 100px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ color: 'var(--text-primary)' }}>Loading...</div>
      </div>
    )
  }

  // Show habits overview when habits exist
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <button 
          onClick={() => router.push('/')}
          className="flex items-center justify-center w-10 h-10"
        >
          <ArrowLeft className="w-6 h-6" style={{ color: 'var(--primary-blue)' }} />
        </button>
        <h1 style={{ 
          color: 'var(--primary-blue)', 
          fontSize: '17px', 
          fontWeight: 600 
        }}>
          Habits
        </h1>
        <button 
          onClick={() => router.push('/habits/add')}
          className="flex items-center justify-center w-10 h-10"
        >
          <Plus className="w-6 h-6" style={{ color: 'var(--primary-blue)' }} />
        </button>
      </div>

      {/* Active Habits Display */}
      <div style={{ padding: '20px 16px 0px 16px' }}>
        {habits.map((habit) => {
          // Check if this habit should be expanded based on URL parameter
          const shouldExpand = expandHabit === 'morning-routine' && habit.name === 'Morning Routine' ||
                              expandHabit === 'work-startup' && habit.name === 'Work Startup'
          
          return (
            <HabitCardComponent
              key={habit.id}
              habit={habit}
              onSkip={handleSkipHabit}
              onReset={handleResetHabit}
              onEdit={handleEditHabit}
              initialExpanded={shouldExpand}
            />
          )
        })}

        {/* Add button positioned 12px below last habit card */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
          <button 
            onClick={() => router.push('/habits/add')}
            className="text-sm font-medium text-white transition-all duration-200 hover:scale-105" 
            style={{ 
              backgroundColor: 'var(--checkbox-checked)',
              borderRadius: '12px',
              width: '60px',
              height: '32px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              border: 'none'
            }}
          >
            Add
          </button>
        </div>
      </div>

      {/* Spacer for FAB */}
      <div style={{ height: '100px' }} />

      <LightningFAB />
    </div>
  )
}

export default function HabitsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HabitsContent />
    </Suspense>
  )
} 