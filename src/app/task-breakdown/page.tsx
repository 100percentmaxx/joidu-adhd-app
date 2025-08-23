'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import TaskBreakdown from '@/components/loading/TaskBreakdown'

/**
 * TASK BREAKDOWN TEST PAGE
 * 
 * This page demonstrates the TaskBreakdown loading screen component.
 * It can be accessed at /task-breakdown to test the AI processing functionality.
 * 
 * In a real application, this component would be triggered when:
 * - User requests AI breakdown from Add Task screen
 * - Complex task needs to be broken into manageable steps
 * - Just-One-Thing feature suggests step-by-step approach
 * - Task Detail screen offers AI assistance for overwhelming tasks
 */
export default function TaskBreakdownPage() {
  const router = useRouter()

  const handleBreakdownComplete = (steps: string[]) => {
    // In real app, this would save the steps and navigate to task view
    console.log('AI generated steps:', steps)
    alert(`Task breakdown complete! Generated ${steps.length} manageable steps.`)
    router.push('/')
  }

  const handleBreakdownCancel = () => {
    // In real app, this would return user to previous screen
    console.log('AI breakdown cancelled!')
    router.back()
  }

  return (
    <TaskBreakdown
      taskTitle="Organize my home office"
      onBreakdownComplete={handleBreakdownComplete}
      onCancel={handleBreakdownCancel}
      processingDuration={3500} // 3.5 second demo
    />
  )
}