'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import EmpathyMessage from './components/EmpathyMessage'
import SuggestedTaskCard from './components/SuggestedTaskCard'
import OptionButtons from './components/OptionButtons'
import { useJustOneThing } from './hooks/useJustOneThing'

export default function JustOneThingPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { currentSuggestion, isLoading, getNextSuggestion } = useJustOneThing()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDoIt = () => {
    // Navigate to focus timer with the selected task
    if (currentSuggestion && typeof window !== 'undefined') {
      localStorage.setItem('currentTask', JSON.stringify({
        title: currentSuggestion.title,
        category: currentSuggestion.category,
        estimatedMinutes: currentSuggestion.estimatedMinutes
      }))
      router.push('/focus/setup')
    }
  }

  const handleTryNext = () => {
    getNextSuggestion()
  }

  const handleChatWithKai = () => {
    router.push('/kaihelp')
  }

  const handleSkipIt = () => {
    router.push('/')
  }

  // Show loading state during hydration
  if (!mounted) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#fefbf7',
        padding: '20px 16px 100px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ color: '#4c4c4c' }}>Loading...</div>
      </div>
    )
  }

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
          Just One Thing
        </h1>
        
        <div style={{ width: '40px' }}></div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        {/* Combined Empathy Message and Suggestion Box */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '32px',
          overflow: 'hidden',
          border: '2px solid #cae9ef'
        }}>
          {/* Blue Empathy Message Section */}
          <div style={{
            backgroundColor: '#cae9ef',
            padding: '16px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: '12px'
          }}>
            {/* Kai Icon */}
            <div style={{ flexShrink: 0, marginTop: '2px' }}>
              <img 
                src="/icons/kai.svg" 
                alt="Kai"
                style={{ width: '32px', height: '32px' }}
              />
            </div>
            
            {/* Message Content */}
            <div style={{ flex: 1 }}>
              <p style={{
                fontSize: '16px',
                fontWeight: 500,
                color: '#4c4c4c',
                margin: '0 0 8px 0',
                lineHeight: '1.4'
              }}>
                Hey, we all hit a little bump in the road from time to time. Get stuck.
              </p>
              <p style={{
                fontSize: '16px',
                fontWeight: 400,
                color: '#4c4c4c',
                margin: 0,
                lineHeight: '1.4'
              }}>
                No worries! Here's a suggestion to get you moving again:
              </p>
            </div>
          </div>

          {/* White Suggestion Section */}
          <div style={{ padding: '16px' }}>
            {isLoading ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#a5a5a5',
                padding: '16px'
              }}>
                Getting a suggestion for you...
              </div>
            ) : currentSuggestion ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                {/* Category Icon Circle */}
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: currentSuggestion.categoryColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <img 
                    src={`/icons/${currentSuggestion.categoryIcon}`}
                    alt={currentSuggestion.category}
                    style={{ width: '24px', height: '24px' }}
                  />
                </div>

                {/* Task Content */}
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#4c4c4c',
                    margin: '0 0 4px 0',
                    lineHeight: '1.3'
                  }}>
                    {currentSuggestion.title}
                  </p>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#a5a5a5',
                    margin: 0,
                    lineHeight: '1.2'
                  }}>
                    Estimate {currentSuggestion.estimatedMinutes} min ⏱
                  </p>
                </div>

                {/* Action Button */}
                <button
                  onClick={handleDoIt}
                  className="transition-all duration-150 active:scale-95"
                  style={{
                    backgroundColor: '#2847ef',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: 500,
                    height: '36px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  Do it!
                </button>
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                color: '#a5a5a5',
                padding: '16px'
              }}>
                No suggestions available right now
              </div>
            )}
          </div>
        </div>

        {/* Options Section */}
        <div style={{ marginTop: '32px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#4c4c4c',
            margin: '0 0 16px 0'
          }}>
            Options
          </h3>
          
          <OptionButtons
            onTryNext={handleTryNext}
            onChatWithKai={handleChatWithKai}
            onSkipIt={handleSkipIt}
          />
        </div>
      </div>
    </div>
  )
} 