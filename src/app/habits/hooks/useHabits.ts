'use client'

import { useState, useEffect } from 'react'
import { Habit, HabitProgress, HABIT_SUGGESTIONS } from '@/types/habits'

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([])
  const [loading, setLoading] = useState(true)

  // Load habits from localStorage
  useEffect(() => {
    // Only access localStorage on client side
    if (typeof window === 'undefined') return
    
    const savedHabits = localStorage.getItem('joidu-habits')
    if (savedHabits) {
      try {
        const parsedHabits = JSON.parse(savedHabits).map((habit: any) => ({
          ...habit,
          createdAt: new Date(habit.createdAt)
        }))
        setHabits(parsedHabits)
      } catch (error) {
        console.error('Error loading habits:', error)
      }
    } else {
      // Create sample habits for demo
      const sampleHabits: Habit[] = [
        {
          id: '1',
          name: 'Morning Routine',
          category: 'health',
          frequency: 'daily',
          targetTime: '07:00',
          steps: [
            { id: 'step1', order: 0, description: 'Make Bed', estimatedMinutes: 2, isCompleted: true },
            { id: 'step2', order: 1, description: 'Drink water', estimatedMinutes: 1, isCompleted: true },
            { id: 'step3', order: 2, description: 'Take magnesium', estimatedMinutes: 1, isCompleted: true, difficulty: 'important' },
            { id: 'step4', order: 3, description: 'Brush teeth', estimatedMinutes: 3, isCompleted: false },
            { id: 'step5', order: 4, description: 'Quick stretch', estimatedMinutes: 5, isCompleted: false, difficulty: 'challenging' }
          ],
          createdAt: new Date(Date.now() - 54 * 24 * 60 * 60 * 1000), // 54 days ago
          isActive: true,
          settings: {
            reminder: true,
            trackStreaks: true,
            flexibleScheduling: true
          },
          currentStreak: 54,
          totalCompleted: 54
        },
        {
          id: '2',
          name: 'Work Startup',
          category: 'work',
          frequency: 'weekdays',
          targetTime: '09:00',
          steps: [
            { id: 'step1', order: 0, description: 'Check calendar', estimatedMinutes: 2, isCompleted: true },
            { id: 'step2', order: 1, description: 'Review priorities', estimatedMinutes: 5, isCompleted: false },
            { id: 'step3', order: 2, description: 'Clear workspace', estimatedMinutes: 3, isCompleted: false },
            { id: 'step4', order: 3, description: 'Start first task', estimatedMinutes: 5, isCompleted: false }
          ],
          createdAt: new Date(Date.now() - 33 * 24 * 60 * 60 * 1000), // 33 days ago
          isActive: true,
          settings: {
            reminder: true,
            trackStreaks: true,
            flexibleScheduling: false
          },
          currentStreak: 33,
          totalCompleted: 33
        },
        {
          id: '3',
          name: 'Evening Winddown',
          category: 'health',
          frequency: 'daily',
          targetTime: '21:00',
          steps: [
            { id: 'step1', order: 0, description: 'Put devices away', estimatedMinutes: 2, isCompleted: false },
            { id: 'step2', order: 1, description: 'Read for 15 minutes', estimatedMinutes: 15, isCompleted: false },
            { id: 'step3', order: 2, description: 'Journal thoughts', estimatedMinutes: 5, isCompleted: false },
            { id: 'step4', order: 3, description: 'Prepare for tomorrow', estimatedMinutes: 3, isCompleted: false },
            { id: 'step5', order: 4, description: 'Deep breathing', estimatedMinutes: 5, isCompleted: false }
          ],
          createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
          isActive: true,
          settings: {
            reminder: true,
            trackStreaks: true,
            flexibleScheduling: true
          },
          currentStreak: 6,
          totalCompleted: 6
        }
      ]
      setHabits(sampleHabits)
      localStorage.setItem('joidu-habits', JSON.stringify(sampleHabits))
    }
    setLoading(false)
  }, [])

  // Save habits to localStorage
  const saveHabits = (newHabits: Habit[]) => {
    setHabits(newHabits)
    if (typeof window !== 'undefined') {
      localStorage.setItem('joidu-habits', JSON.stringify(newHabits))
    }
  }

  const createHabit = (habitData: Omit<Habit, 'id' | 'createdAt' | 'currentStreak' | 'totalCompleted'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: Date.now().toString(),
      createdAt: new Date(),
      currentStreak: 0,
      totalCompleted: 0
    }
    saveHabits([...habits, newHabit])
    return newHabit
  }

  const updateHabit = (habitId: string, updates: Partial<Habit>) => {
    const updatedHabits = habits.map(habit =>
      habit.id === habitId ? { ...habit, ...updates } : habit
    )
    saveHabits(updatedHabits)
  }

  const deleteHabit = (habitId: string) => {
    const filteredHabits = habits.filter(habit => habit.id !== habitId)
    saveHabits(filteredHabits)
  }

  const getSuggestions = () => HABIT_SUGGESTIONS

  return {
    habits,
    loading,
    createHabit,
    updateHabit,
    deleteHabit,
    getSuggestions
  }
}