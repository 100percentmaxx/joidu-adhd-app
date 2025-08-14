'use client'

import { useState, useEffect } from 'react'
import { HabitProgress, Habit } from '@/types/habits'

export const useHabitTracking = () => {
  const [progress, setProgress] = useState<HabitProgress[]>([])

  // Load progress from localStorage
  useEffect(() => {
    // Only access localStorage on client side
    if (typeof window === 'undefined') return
    
    const savedProgress = localStorage.getItem('joidu-habit-progress')
    if (savedProgress) {
      try {
        const parsedProgress = JSON.parse(savedProgress).map((p: any) => ({
          ...p,
          date: new Date(p.date)
        }))
        setProgress(parsedProgress)
      } catch (error) {
        console.error('Error loading habit progress:', error)
      }
    }
  }, [])

  // Save progress to localStorage
  const saveProgress = (newProgress: HabitProgress[]) => {
    setProgress(newProgress)
    if (typeof window !== 'undefined') {
      localStorage.setItem('joidu-habit-progress', JSON.stringify(newProgress))
    }
  }

  const getTodaysProgress = (habitId: string): HabitProgress | null => {
    const today = new Date().toDateString()
    return progress.find(p => 
      p.habitId === habitId && 
      new Date(p.date).toDateString() === today
    ) || null
  }

  const updateStepCompletion = (habitId: string, stepId: string, completed: boolean) => {
    const today = new Date()
    const todayStr = today.toDateString()
    
    let todaysProgress = progress.find(p => 
      p.habitId === habitId && 
      new Date(p.date).toDateString() === todayStr
    )

    if (!todaysProgress) {
      // Create new progress entry for today
      todaysProgress = {
        habitId,
        date: today,
        stepsCompleted: 0,
        totalSteps: 0, // Will be updated below
        isCompleted: false,
        skipped: false,
        completedSteps: []
      }
    }

    // Update completed steps
    let completedSteps = [...todaysProgress.completedSteps]
    if (completed && !completedSteps.includes(stepId)) {
      completedSteps.push(stepId)
    } else if (!completed) {
      completedSteps = completedSteps.filter(id => id !== stepId)
    }

    const updatedProgress = {
      ...todaysProgress,
      completedSteps,
      stepsCompleted: completedSteps.length,
      date: today
    }

    // Update or add progress
    const newProgress = progress.filter(p => 
      !(p.habitId === habitId && new Date(p.date).toDateString() === todayStr)
    )
    newProgress.push(updatedProgress)
    
    saveProgress(newProgress)
    return updatedProgress
  }

  const skipHabit = (habitId: string) => {
    const today = new Date()
    const todayStr = today.toDateString()
    
    const newProgress = progress.filter(p => 
      !(p.habitId === habitId && new Date(p.date).toDateString() === todayStr)
    )
    
    newProgress.push({
      habitId,
      date: today,
      stepsCompleted: 0,
      totalSteps: 0,
      isCompleted: false,
      skipped: true,
      completedSteps: []
    })
    
    saveProgress(newProgress)
  }

  const calculateStreak = (habitId: string): number => {
    const habitProgress = progress
      .filter(p => p.habitId === habitId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    let streak = 0
    let currentDate = new Date()
    
    for (let i = 0; i < habitProgress.length; i++) {
      const progressDate = new Date(habitProgress[i].date)
      const daysDiff = Math.floor((currentDate.getTime() - progressDate.getTime()) / (1000 * 60 * 60 * 24))
      
      if (daysDiff === streak && (habitProgress[i].isCompleted || habitProgress[i].skipped)) {
        streak++
        currentDate = new Date(progressDate)
      } else {
        break
      }
    }
    
    return streak
  }

  const getCompletionPercentage = (habitId: string, totalSteps: number): number => {
    const todaysProgress = getTodaysProgress(habitId)
    if (!todaysProgress) return 0
    if (totalSteps === 0) return 0
    return Math.round((todaysProgress.stepsCompleted / totalSteps) * 100)
  }

  return {
    progress,
    getTodaysProgress,
    updateStepCompletion,
    skipHabit,
    calculateStreak,
    getCompletionPercentage
  }
}