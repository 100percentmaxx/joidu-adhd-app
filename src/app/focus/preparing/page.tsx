'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FocusSession } from '@/types/focus'

export default function FocusPreparingPage() {
  const router = useRouter()
  const [session, setSession] = useState<FocusSession | null>(null)
  const [countdown, setCountdown] = useState(5)
  const [isCountdownActive, setIsCountdownActive] = useState(false)
  const [preparationTips] = useState([
    "Close unnecessary browser tabs and apps",
    "Put your phone on silent or in another room", 
    "Get comfortable - adjust your chair and lighting",
    "Have water and any materials you need nearby",
    "Take 3 deep breaths to center yourself"
  ])
  const [completedTips, setCompletedTips] = useState<boolean[]>([])

  useEffect(() => {
    // Load the current focus session
    const sessionData = typeof window !== 'undefined' ? localStorage.getItem('currentFocusSession') : null
    if (sessionData) {
      setSession(JSON.parse(sessionData))
      setCompletedTips(new Array(preparationTips.length).fill(false))
    } else {
      // No session found, redirect to setup
      router.push('/focus/setup')
    }
  }, [router, preparationTips.length])

  useEffect(() => {
    if (!isCountdownActive || countdown <= 0) return

    const timer = setTimeout(() => {
      if (countdown === 1) {
        // Countdown finished, start the session
        router.push('/focus/active')
      } else {
        setCountdown(prev => prev - 1)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown, isCountdownActive, router])

  const toggleTip = (index: number) => {
    const updated = [...completedTips]
    updated[index] = !updated[index]
    setCompletedTips(updated)
  }

  const startCountdown = () => {
    setIsCountdownActive(true)
    setCountdown(5)
  }

  const skipToFocus = () => {
    router.push('/focus/active')
  }

  const goBack = () => {
    router.push('/focus/setup')
  }

  const completedCount = completedTips.filter(Boolean).length
  const allTipsCompleted = completedCount === preparationTips.length

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-orange-300 border-t-orange-600 rounded-full mx-auto mb-4"></div>
          <p style={{ color: 'var(--text-secondary)' }}>Loading your focus session...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-5" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-2xl mx-auto">
        {!isCountdownActive ? (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mb-4">
                <span style={{ fontSize: '64px' }}>🧘‍♂️</span>
              </div>
              <h1 style={{ 
                color: 'var(--primary-blue)', 
                fontSize: '28px', 
                fontWeight: 600,
                marginBottom: '8px'
              }}>
                Let's Get Ready
              </h1>
              <p style={{ 
                color: 'var(--text-primary)', 
                fontSize: '16px',
                marginBottom: '4px'
              }}>
                <strong>"{session.taskTitle}"</strong>
              </p>
              <p style={{ 
                color: 'var(--text-secondary)', 
                fontSize: '14px'
              }}>
                {session.duration} minute focus session
              </p>
            </div>

            {/* Preparation Checklist */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 style={{ 
                  color: 'var(--text-primary)', 
                  fontSize: '20px', 
                  fontWeight: 600
                }}>
                  ADHD-Friendly Setup
                </h2>
                <div 
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: allTipsCompleted ? 'var(--success-light)' : 'var(--warning-light)',
                    color: allTipsCompleted ? 'var(--success-dark)' : 'var(--warning-dark)'
                  }}
                >
                  {completedCount}/{preparationTips.length}
                </div>
              </div>

              <div className="space-y-3">
                {preparationTips.map((tip, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-3 p-4 rounded-lg border-2 transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--card-background)',
                      borderColor: completedTips[index] ? 'var(--success-light)' : 'var(--border-light)'
                    }}
                  >
                    <button
                      onClick={() => toggleTip(index)}
                      className="mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                      style={{
                        borderColor: completedTips[index] ? 'var(--success-light)' : 'var(--text-secondary)',
                        backgroundColor: completedTips[index] ? 'var(--success-light)' : 'transparent'
                      }}
                    >
                      {completedTips[index] && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20,6 9,17 4,12"></polyline>
                        </svg>
                      )}
                    </button>
                    <p style={{ 
                      color: completedTips[index] ? 'var(--text-secondary)' : 'var(--text-primary)',
                      fontSize: '16px',
                      textDecoration: completedTips[index] ? 'line-through' : 'none',
                      lineHeight: '1.4'
                    }}>
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Session Details Summary */}
            <div 
              className="mb-8 p-4 rounded-lg"
              style={{ backgroundColor: 'var(--info-light)', border: '1px solid var(--primary-blue)' }}
            >
              <h3 style={{ 
                color: 'var(--primary-blue)', 
                fontSize: '16px', 
                fontWeight: 600,
                marginBottom: '12px'
              }}>
                Your Focus Session Settings
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Duration:</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500, marginLeft: '8px' }}>
                    {session.duration} minutes
                  </span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Auto Break:</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500, marginLeft: '8px' }}>
                    {session.options.autoBreak ? 'On' : 'Off'}
                  </span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Break Duration:</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500, marginLeft: '8px' }}>
                    {session.options.breakDuration} minutes
                  </span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Block Distractions:</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500, marginLeft: '8px' }}>
                    {session.options.blockDistractions ? 'On' : 'Off'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {allTipsCompleted ? (
                <button
                  onClick={startCountdown}
                  className="w-full py-4 px-6 rounded-lg text-white font-bold text-lg transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: 'var(--success-light)' }}
                >
                  🚀 Ready! Start 5-Second Countdown
                </button>
              ) : (
                <button
                  onClick={startCountdown}
                  className="w-full py-4 px-6 rounded-lg text-white font-bold text-lg transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: 'var(--primary-orange)' }}
                >
                  ⚡ Start Countdown ({completedCount}/{preparationTips.length} ready)
                </button>
              )}

              <button
                onClick={skipToFocus}
                className="w-full py-3 px-6 rounded-lg font-medium transition-all duration-200"
                style={{ 
                  backgroundColor: 'var(--card-background)',
                  color: 'var(--primary-blue)',
                  border: '2px solid var(--primary-blue)'
                }}
              >
                Skip Prep - Start Now
              </button>

              <button
                onClick={goBack}
                className="w-full py-3 px-6 rounded-lg font-medium text-gray-600 border-2 border-gray-300 hover:border-gray-400 transition-all duration-200"
                style={{ 
                  backgroundColor: 'var(--card-background)',
                  color: 'var(--text-secondary)',
                  border: '2px solid var(--border-light)'
                }}
              >
                ← Back to Setup
              </button>
            </div>

            {/* ADHD encouragement */}
            <div 
              className="mt-6 p-4 rounded-lg"
              style={{ backgroundColor: 'var(--success-bg)', border: '1px solid var(--success-light)' }}
            >
              <div className="flex items-start space-x-3">
                <span style={{ fontSize: '20px' }}>💚</span>
                <div>
                  <h4 style={{ 
                    color: 'var(--success-dark)', 
                    fontSize: '14px', 
                    fontWeight: 600,
                    marginBottom: '4px'
                  }}>
                    You're Doing Great!
                  </h4>
                  <p style={{ 
                    color: 'var(--text-primary)', 
                    fontSize: '14px',
                    lineHeight: '1.4'
                  }}>
                    Taking time to prepare isn't procrastination - it's setting yourself up for 
                    ADHD success. Your brain will thank you for this mindful start! 🧠✨
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Countdown Screen */
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="mb-8">
                <div 
                  className="w-32 h-32 rounded-full flex items-center justify-center mx-auto animate-pulse"
                  style={{ backgroundColor: 'var(--primary-orange)', boxShadow: '0 0 50px rgba(247, 119, 44, 0.5)' }}
                >
                  <span style={{ 
                    fontSize: '48px', 
                    fontWeight: 'bold', 
                    color: 'white' 
                  }}>
                    {countdown}
                  </span>
                </div>
              </div>
              
              <h2 style={{ 
                color: 'var(--primary-blue)', 
                fontSize: '24px', 
                fontWeight: 600,
                marginBottom: '8px'
              }}>
                Focus Starting in {countdown}...
              </h2>
              
              <p style={{ 
                color: 'var(--text-primary)', 
                fontSize: '16px',
                marginBottom: '24px'
              }}>
                "{session.taskTitle}"
              </p>
              
              <div className="space-y-2">
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                  Take a deep breath... 🫁
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                  You've got this! 💪
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}