'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import TaskBreakdown from '@/components/loading/TaskBreakdown'

/**
 * TASK BREAKDOWN DEMO PAGE
 * 
 * This page demonstrates different task breakdown scenarios using the TaskBreakdown component.
 * It shows how the component can be used for various types of tasks that benefit from AI analysis
 * and ADHD-friendly step-by-step breakdowns.
 * 
 * Access this page at /task-breakdown-demo to test different scenarios.
 */

interface TaskScenario {
  title: string
  duration: number
  description: string
  complexity: 'Simple' | 'Medium' | 'Complex'
}

const taskScenarios: TaskScenario[] = [
  {
    title: "Clean my entire house",
    duration: 4000,
    description: "Large, overwhelming task that needs room-by-room breakdown",
    complexity: 'Complex'
  },
  {
    title: "Write a presentation for work",
    duration: 3500,
    description: "Multi-step creative task with research and design phases",
    complexity: 'Complex'
  },
  {
    title: "Organize my digital photos",
    duration: 3000,
    description: "Tedious task that benefits from systematic approach",
    complexity: 'Medium'
  },
  {
    title: "Plan a birthday party",
    duration: 3500,
    description: "Event planning with multiple moving parts and deadlines",
    complexity: 'Complex'
  },
  {
    title: "Learn a new software tool",
    duration: 2500,
    description: "Learning task that needs structured progression",
    complexity: 'Medium'
  },
  {
    title: "Declutter my wardrobe",
    duration: 2000,
    description: "Decision-heavy task with emotional challenges",
    complexity: 'Medium'
  }
]

export default function TaskBreakdownDemoPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentTask, setCurrentTask] = useState<TaskScenario | null>(null)

  const handleStartBreakdown = (task: TaskScenario) => {
    setCurrentTask(task)
    setIsProcessing(true)
  }

  const handleBreakdownComplete = (steps: string[]) => {
    setIsProcessing(false)
    setCurrentTask(null)
    
    // Show the AI-generated steps
    const stepsList = steps.map((step, index) => `${index + 1}. ${step}`).join('\n')
    alert(`✨ AI Breakdown Complete!\n\nTask: "${currentTask?.title}"\n\nGenerated Steps:\n${stepsList}`)
  }

  const handleBreakdownCancel = () => {
    setIsProcessing(false)
    setCurrentTask(null)
    console.log(`Cancelled breakdown for: ${currentTask?.title}`)
  }

  if (isProcessing && currentTask) {
    return (
      <TaskBreakdown
        taskTitle={currentTask.title}
        processingDuration={currentTask.duration}
        onBreakdownComplete={handleBreakdownComplete}
        onCancel={handleBreakdownCancel}
      />
    )
  }

  return (
    <div style={{ 
      backgroundColor: 'var(--background)', 
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h1 style={{ 
          color: 'var(--primary-blue)', 
          fontSize: '28px', 
          fontWeight: 700,
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          Task Breakdown Demo
        </h1>
        
        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '16px',
          marginBottom: '32px',
          textAlign: 'center',
          lineHeight: '1.5'
        }}>
          Test how AI breaks down different types of complex tasks into ADHD-friendly manageable steps:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {taskScenarios.map((task, index) => {
            const complexityColors = {
              'Simple': '#10b981',
              'Medium': '#f59e0b', 
              'Complex': '#ef4444'
            }
            
            return (
              <div
                key={index}
                style={{
                  padding: '20px',
                  backgroundColor: '#ffffff',
                  border: '2px solid var(--border-color)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                onClick={() => handleStartBreakdown(task)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary-blue)'
                  e.currentTarget.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                {/* Complexity Badge */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  padding: '4px 8px',
                  backgroundColor: complexityColors[task.complexity],
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 600,
                  borderRadius: '12px'
                }}>
                  {task.complexity}
                </div>
                
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: 600, 
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                  paddingRight: '80px' // Space for complexity badge
                }}>
                  "{task.title}"
                </div>
                
                <div style={{ 
                  fontSize: '14px', 
                  color: 'var(--text-secondary)',
                  marginBottom: '12px',
                  lineHeight: '1.4'
                }}>
                  {task.description}
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  fontSize: '13px',
                  color: 'var(--text-tertiary)'
                }}>
                  <span>⏱️ AI Processing: {task.duration/1000}s</span>
                  <span>🧠 ADHD-Optimized Steps</span>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ 
          marginTop: '48px', 
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px'
        }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: 600, 
            color: 'var(--text-primary)',
            marginBottom: '12px'
          }}>
            AI Task Breakdown Features:
          </h3>
          <ul style={{ 
            fontSize: '14px', 
            color: 'var(--text-secondary)',
            paddingLeft: '20px',
            lineHeight: '1.8',
            margin: 0
          }}>
            <li>🎯 <strong>ADHD-Specific Analysis:</strong> Considers attention span and overwhelm patterns</li>
            <li>📋 <strong>Manageable Steps:</strong> Breaks complex tasks into digestible chunks</li>
            <li>⏰ <strong>Realistic Timing:</strong> Estimates time needed for each step</li>
            <li>🔄 <strong>Progress Tracking:</strong> Clear start/stop points for momentum</li>
            <li>🧘 <strong>Break Integration:</strong> Suggests rest periods between intensive steps</li>
            <li>✨ <strong>Motivation Boost:</strong> Reduces task paralysis through clear structure</li>
          </ul>
        </div>

        <button
          onClick={() => router.push('/')}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: 'var(--primary-blue)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            marginTop: '32px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}