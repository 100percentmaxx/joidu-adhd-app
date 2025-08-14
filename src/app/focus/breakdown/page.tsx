'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FocusSession, TaskStep } from '@/types/focus'
import TaskBreakdown from '@/components/focus/TaskBreakdown'

export default function TaskBreakdownPage() {
  const router = useRouter()
  const [session, setSession] = useState<FocusSession | null>(null)
  const [taskSteps, setTaskSteps] = useState<TaskStep[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)

  useEffect(() => {
    // Load the current focus session or check URL params for task title
    const sessionData = typeof window !== 'undefined' ? localStorage.getItem('currentFocusSession') : null
    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
    const taskFromUrl = urlParams?.get('task') || null
    
    if (sessionData) {
      const loadedSession = JSON.parse(sessionData)
      setSession(loadedSession)
    } else if (taskFromUrl) {
      // Create a temporary session object for breakdown
      const tempSession: FocusSession = {
        id: 'temp',
        taskTitle: taskFromUrl,
        duration: 25,
        startTime: new Date(),
        breaks: [],
        isCompleted: false,
        stats: {
          focusTime: 0,
          breakCount: 0,
          tasksCompleted: 0,
          startTime: new Date()
        },
        options: {
          autoBreak: true,
          breakDuration: 5,
          blockDistractions: true,
          endSound: true
        }
      }
      setSession(tempSession)
    }
    
    setHasInitialized(true)
  }, [])

  // Auto-start task breakdown generation
  useEffect(() => {
    if (session && hasInitialized && taskSteps.length === 0 && !isGenerating) {
      // Small delay to show the component first, then start generating
      setTimeout(() => {
        setIsGenerating(true)
      }, 500)
    }
  }, [session, hasInitialized, taskSteps.length, isGenerating])

  const handleStepsGenerated = (steps: TaskStep[]) => {
    setTaskSteps(steps)
    setIsGenerating(false)
  }

  const handleComplete = () => {
    if (session && session.id !== 'temp') {
      // Update session with task breakdown steps
      const updatedSession = {
        ...session,
        taskSteps
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('currentFocusSession', JSON.stringify(updatedSession))
      }
      
      // Navigate to focus setup with pre-filled task
      router.push('/focus/setup')
    } else {
      // Navigate to setup with task title as URL param
      router.push(`/focus/setup?task=${encodeURIComponent(session?.taskTitle || '')}`)
    }
  }

  const handleStartWithoutBreakdown = () => {
    if (session && session.id !== 'temp') {
      router.push('/focus/active')
    } else {
      router.push(`/focus/setup?task=${encodeURIComponent(session?.taskTitle || '')}`)
    }
  }

  const handleGoBack = () => {
    if (session && session.id !== 'temp') {
      router.push('/focus/setup')
    } else {
      router.push('/focus/setup')
    }
  }

  if (!hasInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#fefbf7' }}>
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-orange-300 border-t-orange-600 rounded-full mx-auto mb-4"></div>
          <p style={{ color: '#a5a5a5' }}>Loading task breakdown...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#fefbf7' }}>
        <div className="max-w-md text-center">
          <div className="mb-6">
            <span style={{ fontSize: '64px' }}>🤔</span>
          </div>
          <h2 style={{ 
            color: '#2847ef', 
            fontSize: '24px', 
            fontWeight: 600,
            marginBottom: '12px'
          }}>
            No Task to Break Down
          </h2>
          <p style={{ 
            color: '#4c4c4c', 
            fontSize: '16px',
            lineHeight: '1.4',
            marginBottom: '24px'
          }}>
            It looks like you don't have a task set up yet. Let's start by setting up your focus session first.
          </p>
          <button
            onClick={() => router.push('/focus/setup')}
            className="px-6 py-3 rounded-lg text-white font-semibold"
            style={{ backgroundColor: '#fa772c' }}
          >
            Set Up Focus Session
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Back Navigation Header */}
      <div 
        className="sticky top-0 z-10 p-4 border-b"
        style={{ backgroundColor: '#fefbf7', borderColor: '#e2e2e2' }}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={handleGoBack}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors hover:bg-gray-100"
          >
            <span style={{ color: '#4c4c4c', fontSize: '18px' }}>←</span>
            <span style={{ color: '#4c4c4c', fontSize: '14px', fontWeight: 500 }}>
              Back
            </span>
          </button>
          
          {!isGenerating && taskSteps.length === 0 && (
            <button
              onClick={handleStartWithoutBreakdown}
              className="px-4 py-2 rounded-lg text-sm font-medium border-2 border-gray-300 hover:border-orange-300 transition-colors"
              style={{ backgroundColor: 'white', color: '#4c4c4c' }}
            >
              Skip Breakdown
            </button>
          )}
        </div>
      </div>

      {/* Task Breakdown Component */}
      <TaskBreakdown
        taskTitle={session.taskTitle}
        onStepsGenerated={handleStepsGenerated}
        onComplete={handleComplete}
        isGenerating={isGenerating}
      />

      {/* Additional Context for ADHD Users */}
      {taskSteps.length > 0 && (
        <div className="fixed bottom-5 left-5 right-5 z-20">
          <div className="max-w-2xl mx-auto">
            <div 
              className="p-4 rounded-lg shadow-lg"
              style={{ backgroundColor: '#e6f3ff', border: '1px solid #2847ef' }}
            >
              <div className="flex items-start space-x-3">
                <span style={{ fontSize: '20px' }}>💡</span>
                <div className="flex-1">
                  <h4 style={{ 
                    color: '#2847ef', 
                    fontSize: '14px', 
                    fontWeight: 600,
                    marginBottom: '4px'
                  }}>
                    ADHD Pro Tip
                  </h4>
                  <p style={{ 
                    color: '#4c4c4c', 
                    fontSize: '13px',
                    lineHeight: '1.4'
                  }}>
                    You don't have to complete all steps in one session! Focus on just 1-2 steps 
                    that feel manageable right now. Progress &gt; Perfection! 🌟
                  </p>
                </div>
                <button
                  onClick={() => {
                    const element = document.querySelector('.fixed.bottom-5')
                    if (element) element.remove()
                  }}
                  className="text-gray-400 hover:text-gray-600 text-lg leading-none"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}