'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

interface TaskBreakdownProps {
  onBreakdownComplete?: (steps: string[]) => void
  onCancel?: () => void
  taskTitle?: string
  processingDuration?: number // Duration in milliseconds for AI processing
}

/**
 * TASK BREAKDOWN LOADING SCREEN COMPONENT
 * 
 * This loading screen appears when AI is processing and breaking down a complex 
 * task into manageable, ADHD-friendly steps. It provides reassuring feedback that
 * the AI is working specifically with ADHD considerations in mind.
 * 
 * KEY FEATURES:
 * - Gentle pulse animation for the task icon to show ongoing processing
 * - Sequential dot loading animation to indicate AI thinking progress
 * - ADHD-specific messaging emphasizing manageable steps
 * - Accessibility features with ARIA labels for AI processing
 * - Option to cancel AI breakdown and return to previous screen
 * - Auto-dismiss when AI processing is complete
 * 
 * TYPICAL USAGE SCENARIOS:
 * - Add Task screen: When user requests AI breakdown of complex task
 * - Task Detail screen: When breaking down existing tasks into sub-tasks  
 * - Just-One-Thing feature: When AI suggests step-by-step approach
 * - Any complex task input that needs AI processing for ADHD users
 * 
 * AI PROCESSING CONTEXT:
 * The AI is analyzing the task complexity, considering ADHD challenges like:
 * - Breaking overwhelming tasks into smaller, manageable chunks
 * - Identifying clear start/stop points for each step
 * - Prioritizing steps to prevent paralysis
 * - Adding time estimates and difficulty levels
 * - Suggesting focus/break patterns between steps
 */
export default function TaskBreakdown({
  onBreakdownComplete,
  onCancel,
  taskTitle = "your task",
  processingDuration = 3000 // 3 seconds default for AI processing
}: TaskBreakdownProps) {
  const router = useRouter()
  
  // State for managing the AI processing lifecycle
  const [isProcessing, setIsProcessing] = useState(true)
  const [processingProgress, setProcessingProgress] = useState(0)
  
  /**
   * AI PROCESSING SIMULATION
   * 
   * Simulates the AI task breakdown process with realistic timing.
   * In a real implementation, this would connect to an AI service
   * that analyzes the task and returns ADHD-friendly step breakdowns.
   * 
   * The processing includes multiple AI analysis phases:
   * 1. Task complexity analysis (analyzing difficulty and scope)
   * 2. ADHD consideration mapping (identifying potential obstacles)  
   * 3. Step generation (creating manageable, sequential steps)
   * 4. Step optimization (refining for ADHD users)
   */
  useEffect(() => {
    const startTime = Date.now()
    
    const processingInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(100, (elapsed / processingDuration) * 100)
      setProcessingProgress(progress)
      
      if (progress >= 100) {
        setIsProcessing(false)
        clearInterval(processingInterval)
        
        // Simulate AI-generated task breakdown result
        const generatedSteps = [
          `Start with the first part of ${taskTitle}`,
          `Take a 5-minute break to process`,
          `Continue with the main section`,
          `Review and finalize your work`
        ]
        
        // Auto-dismiss after showing completion briefly
        setTimeout(() => {
          if (onBreakdownComplete) {
            onBreakdownComplete(generatedSteps)
          }
        }, 500)
      }
    }, 50) // Update every 50ms for smooth progress tracking
    
    return () => clearInterval(processingInterval)
  }, [processingDuration, onBreakdownComplete, taskTitle])

  /**
   * CANCEL AI PROCESSING HANDLER
   * 
   * Allows users to cancel the AI breakdown process and return to 
   * the previous screen. This is important for ADHD users who might
   * become impatient during processing or decide they want to handle
   * the task differently.
   */
  const handleCancel = () => {
    setIsProcessing(false)
    if (onCancel) {
      onCancel()
    } else {
      router.back()
    }
  }

  return (
    <div 
      style={{ 
        backgroundColor: '#f2d3d1', // Light peach/creative background from mockup
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px'
      }}
      role="status"
      aria-live="polite"
      aria-label={`AI is breaking down your task into manageable steps. Processing ${Math.round(processingProgress)}% complete.`}
    >
      {/* CSS Animations for Icon Pulse and Dot Loading */}
      <style jsx>{`
        @keyframes gentlePulse {
          0% {
            transform: scale(1.0);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1.0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes dotPulse1 {
          0%, 60%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          30% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
        
        @keyframes dotPulse2 {
          0%, 30%, 90%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          60% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
        
        @keyframes dotPulse3 {
          0%, 60%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          90% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
        
        .pulsing-icon {
          animation: gentlePulse 1.5s ease-in-out infinite;
        }
        
        .fade-in-content {
          animation: fadeIn 0.6s ease-out;
        }
        
        .loading-dot-1 {
          animation: dotPulse1 1.8s ease-in-out infinite;
        }
        
        .loading-dot-2 {
          animation: dotPulse2 1.8s ease-in-out infinite;
        }
        
        .loading-dot-3 {
          animation: dotPulse3 1.8s ease-in-out infinite;
        }
      `}</style>

      {/* Back Arrow - Top Left */}
      <div style={{ marginBottom: '40px' }}>
        <button
          onClick={handleCancel}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(40, 71, 239, 0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
          aria-label="Cancel task breakdown and go back"
        >
          <ArrowLeft 
            size={24} 
            style={{ color: '#2847ef' }} 
          />
        </button>
      </div>

      {/* Main Content - Vertically Centered */}
      <div 
        className="fade-in-content"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          maxWidth: '400px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        {/* 1. TASK BREAKDOWN ICON - Gentle Pulse Animation */}
        <div 
          className="pulsing-icon"
          style={{ 
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-hidden="true" // Decorative, screen reader will use text instead
        >
          <img 
            src="/icons/tasks_3.svg" 
            alt=""
            style={{ 
              width: '80px', 
              height: '80px' 
            }}
          />
        </div>

        {/* 2. TITLE TEXT - Can Split Across Two Lines */}
        <h1 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#4c4c4c',
          margin: '0 0 16px 0',
          lineHeight: '1.3'
        }}>
          Breaking Down Your Task
        </h1>

        {/* 3. DESCRIPTION TEXT - ADHD-Specific Messaging */}
        <p style={{
          fontSize: '17px',
          fontWeight: 400,
          color: '#a5a5a5',
          margin: '0 0 48px 0',
          lineHeight: '1.4',
          maxWidth: '280px'
        }}>
          Creating manageable steps that work with your ADHD brain
        </p>

        {/* 4. PROGRESS INDICATORS - Sequential Dot Animation */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px' // 16px spacing between dots
          }}
          role="progressbar"
          aria-valuenow={Math.round(processingProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`AI task breakdown progress: ${Math.round(processingProgress)} percent complete`}
        >
          {/* Loading Dot 1 - Full opacity in sequence */}
          <div
            className="loading-dot-1"
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#fa772c' // Orange color from specifications
            }}
            aria-hidden="true"
          />
          
          {/* Loading Dot 2 - 70% opacity in sequence */}
          <div
            className="loading-dot-2"
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#fa772c'
            }}
            aria-hidden="true"
          />
          
          {/* Loading Dot 3 - 40% opacity in sequence */}
          <div
            className="loading-dot-3"
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#fa772c'
            }}
            aria-hidden="true"
          />
        </div>

        {/* Progress Status (for screen readers) */}
        <div 
          style={{ 
            position: 'absolute', 
            left: '-9999px' 
          }}
          aria-live="polite"
        >
          AI is analyzing your task and creating ADHD-friendly steps. {Math.round(processingProgress)}% complete.
        </div>
      </div>

      {/* Bottom spacing to maintain center alignment */}
      <div style={{ height: '60px' }} />
    </div>
  )
}

/**
 * INTEGRATION EXAMPLES:
 * 
 * // Basic usage from Add Task screen
 * <TaskBreakdown 
 *   taskTitle="Organize my home office"
 *   onBreakdownComplete={(steps) => setTaskSteps(steps)} 
 * />
 * 
 * // From Task Detail screen with custom duration
 * <TaskBreakdown
 *   taskTitle={task.title}
 *   processingDuration={4000} // 4 seconds for complex tasks
 *   onBreakdownComplete={(steps) => updateTaskWithSteps(task.id, steps)}
 *   onCancel={() => setShowBreakdown(false)}
 * />
 * 
 * // From Just-One-Thing feature
 * <TaskBreakdown
 *   taskTitle="Complete my presentation"
 *   onBreakdownComplete={(steps) => {
 *     setJustOneThingSteps(steps)
 *     navigateToSteps()
 *   }}
 * />
 * 
 * REAL AI INTEGRATION NOTES:
 * - Replace processingDuration with actual AI API call timing
 * - Connect onBreakdownComplete to real AI-generated step results
 * - Add error handling for AI service failures
 * - Consider caching results for similar task patterns
 * - Add user feedback mechanism to improve AI suggestions
 */