'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

interface CompletionStats {
  tasksCompleted: number
  totalTasks: number
  streak: number
  points: number
}

interface HabitProgress {
  name: string
  completed: number
  total: number
  percentage: number
  color: string
}

function TaskCompleteContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const taskName = searchParams.get('task') || 'Reply to emails'
  
  const [showCelebration, setShowCelebration] = useState(true)
  const [animateStats, setAnimateStats] = useState(false)
  const [showConfetti, setShowConfetti] = useState(true)

  // Mock data - in real app this would come from your data store
  const [stats] = useState<CompletionStats>({
    tasksCompleted: 5,
    totalTasks: 23,
    streak: 8,
    points: 127
  })

  const [habits] = useState<HabitProgress[]>([
    { name: 'Morning routine', completed: 4, total: 4, percentage: 100, color: '#ddede3' },
    { name: 'Work startup', completed: 1, total: 4, percentage: 25, color: '#f9dac5' }
  ])

  useEffect(() => {
    // Trigger stats animation after celebration loads
    const timer = setTimeout(() => {
      setAnimateStats(true)
    }, 500)

    // Hide confetti after 3 seconds
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearTimeout(confettiTimer)
    }
  }, [])

  const handleContinue = () => {
    router.push('/tasks')
  }

  return (
    <>
      {/* CSS Animation Styles */}
      <style jsx>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
      
      <div className="min-h-screen" style={{ backgroundColor: 'var(--category-personal-light)' }}>
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {/* Generate confetti pieces */}
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                animation: `confettiFall 3s linear forwards`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {i % 4 === 0 ? (
                // Star
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: ['var(--success-light)', 'var(--primary-blue)', 'var(--primary-orange)', 'var(--category-social-light)'][Math.floor(Math.random() * 4)],
                    clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                    transform: `rotate(${Math.random() * 360}deg)`
                  }}
                />
              ) : (
                // Confetti rectangle
                <div
                  style={{
                    width: `${4 + Math.random() * 8}px`,
                    height: `${4 + Math.random() * 8}px`,
                    backgroundColor: ['var(--success-light)', 'var(--primary-blue)', 'var(--primary-orange)', 'var(--category-social-light)', 'var(--category-work-light)', 'var(--category-personal-light)'][Math.floor(Math.random() * 6)],
                    borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                    transform: `rotate(${Math.random() * 360}deg)`
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center px-5 py-4">
        <button 
          onClick={() => router.back()}
          className="flex items-center justify-center w-10 h-10"
        >
          <ArrowLeft className="w-6 h-6" style={{ color: 'var(--primary-blue)' }} />
        </button>
      </div>

      {/* Main Content */}
      <div className="px-5 space-y-8">
        {/* Celebration Section */}
        <div className="text-center">
          {/* Success Checkmark */}
          <div 
            className="mx-auto mb-6 flex items-center justify-center rounded-full transition-all duration-1000"
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: 'var(--success-light)',
              transform: showCelebration ? 'scale(1)' : 'scale(0)',
              opacity: showCelebration ? 1 : 0
            }}
          >
            <svg 
              width="50" 
              height="50" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="4"
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transition-all duration-500 delay-300"
              style={{
                transform: showCelebration ? 'scale(1)' : 'scale(0)'
              }}
            >
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
          </div>

          {/* Celebration Text */}
          <div 
            className="transition-all duration-700 delay-200"
            style={{
              transform: showCelebration ? 'translateY(0)' : 'translateY(20px)',
              opacity: showCelebration ? 1 : 0
            }}
          >
            <h1 style={{ 
              color: 'var(--text-primary)', 
              fontSize: '28px', 
              fontWeight: 700,
              marginBottom: '8px'
            }}>
              Amazing Work!
            </h1>
            <p style={{ 
              color: 'var(--text-primary)', 
              fontSize: '17px', 
              fontWeight: 500,
              marginBottom: '16px'
            }}>
              "{taskName}"
            </p>
          </div>
        </div>

        {/* Progress Stats */}
        <div 
          className="transition-all duration-800 delay-500"
          style={{
            transform: animateStats ? 'translateY(0)' : 'translateY(30px)',
            opacity: animateStats ? 1 : 0
          }}
        >
          {/* Your Progress Section */}
          <div className="mb-8 p-4 rounded-lg" style={{
            backgroundColor: 'var(--card-background)',
            borderRadius: '12px',
            border: '2px solid var(--border-light)'
          }}>
            {/* Header */}
            <div className="flex items-center space-x-2 mb-4">
              <img src="/icons/analytics_color.svg" alt="analytics" style={{ width: '28px', height: '28px' }} />
              <h2 style={{ 
                color: 'var(--text-primary)', 
                fontSize: '20px', 
                fontWeight: 600 
              }}>
                Your Progress
              </h2>
            </div>

            {/* 2x2 Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Today */}
              <div className="text-center">
                <div style={{ 
                  color: 'var(--success-light)', 
                  fontSize: '32px', 
                  fontWeight: 700,
                  marginBottom: '4px'
                }}>
                  {stats.tasksCompleted}
                </div>
                <div style={{ 
                  color: 'var(--text-primary)', 
                  fontSize: '14px',
                  fontWeight: 500
                }}>
                  Today
                </div>
              </div>

              {/* This Week */}
              <div className="text-center">
                <div style={{ 
                  color: 'var(--success-light)', 
                  fontSize: '32px', 
                  fontWeight: 700,
                  marginBottom: '4px'
                }}>
                  {stats.totalTasks}
                </div>
                <div style={{ 
                  color: 'var(--text-primary)', 
                  fontSize: '14px',
                  fontWeight: 500
                }}>
                  This Week
                </div>
              </div>

              {/* Total */}
              <div className="text-center">
                <div style={{ 
                  color: 'var(--success-light)', 
                  fontSize: '32px', 
                  fontWeight: 700,
                  marginBottom: '4px'
                }}>
                  {stats.points}
                </div>
                <div style={{ 
                  color: 'var(--text-primary)', 
                  fontSize: '14px',
                  fontWeight: 500
                }}>
                  Total
                </div>
              </div>

              {/* Streak */}
              <div className="text-center">
                <div style={{ 
                  color: 'var(--success-light)', 
                  fontSize: '32px', 
                  fontWeight: 700,
                  marginBottom: '4px'
                }}>
                  {stats.streak}
                </div>
                <div style={{ 
                  color: 'var(--text-primary)', 
                  fontSize: '14px',
                  fontWeight: 500
                }}>
                  Streak
                </div>
              </div>
            </div>

            {/* Streak Message */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <img src="/icons/fire.svg" alt="fire" style={{ width: '20px', height: '20px' }} />
                <span style={{ 
                  color: 'var(--primary-orange)', 
                  fontSize: '16px', 
                  fontWeight: 600 
                }}>
                  {stats.streak}-day streak!
                </span>
              </div>
              <p style={{ 
                color: 'var(--text-secondary)', 
                fontSize: '12px',
                fontWeight: 500
              }}>
                You're building incredible momentum!
              </p>
            </div>
          </div>

          {/* Today's Habits Section */}
          <div className="mb-8 p-4 rounded-lg" style={{
            backgroundColor: 'var(--card-background)',
            borderRadius: '12px',
            border: '2px solid var(--border-light)'
          }}>
            {/* Header */}
            <div className="flex items-center space-x-2 mb-4">
              <img src="/icons/habits_2.svg" alt="habits" style={{ width: '28px', height: '28px' }} />
              <h2 style={{ 
                color: 'var(--text-primary)', 
                fontSize: '20px', 
                fontWeight: 600 
              }}>
                Today's Habits
              </h2>
            </div>

            {/* Progress Bar */}
            <div 
              className="h-3 rounded-full mb-3"
              style={{ backgroundColor: 'var(--border-light)' }}
            >
              <div 
                className="h-3 rounded-full transition-all duration-1000 delay-700"
                style={{ 
                  backgroundColor: 'var(--primary-orange)',
                  width: animateStats ? '75%' : '0%'
                }}
              ></div>
            </div>

            {/* Summary Text */}
            <p style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '14px',
              fontWeight: 500,
              textAlign: 'center'
            }}>
              3 of 4 completed (75%)
            </p>
          </div>

          {/* ADHD Win Message */}
          <div 
            className="p-4 rounded-lg mb-8"
            style={{
              backgroundColor: 'var(--card-background)',
              borderRadius: '12px',
              border: '2px solid var(--border-light)'
            }}
          >
            {/* Header */}
            <div className="flex items-center space-x-2 mb-4">
              <img src="/icons/brain.svg" alt="brain" style={{ width: '28px', height: '28px' }} />
              <h3 style={{ 
                color: 'var(--text-primary)', 
                fontSize: '20px', 
                fontWeight: 600
              }}>
                ADHD Win!
              </h3>
            </div>
            <p style={{ 
              color: 'var(--text-primary)', 
              fontSize: '14px', 
              lineHeight: '1.4'
            }}>
              Every completed task is a proof that your ADHD brain can accomplish amazing things. Your dopamine is well-deserved!
            </p>
          </div>

          {/* Continue Button */}
          <div className="flex justify-end">
            <button
              onClick={handleContinue}
              className="px-8 py-3 rounded-lg text-white font-semibold transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: 'var(--primary-blue)',
                fontSize: '16px',
                borderRadius: '12px',
                border: 'none',
                minWidth: '160px'
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-20"></div>
    </div>
    </>
  )
}

export default function TaskComplete() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TaskCompleteContent />
    </Suspense>
  )
}