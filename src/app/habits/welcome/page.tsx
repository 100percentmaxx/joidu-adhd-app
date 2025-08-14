'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

export default function HabitsWelcomePage() {
  const router = useRouter()

  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.id === 'custom') {
      // Navigate to Add Habit screen with no pre-fill
      router.push('/habits/add')
    } else {
      // Pre-fill habit creation with this suggestion
      const prefillData = {
        name: suggestion.title,
        category: suggestion.category,
        steps: suggestion.steps
      }
      router.push(`/habits/add?prefill=${encodeURIComponent(JSON.stringify(prefillData))}`)
    }
  }

  const suggestions = [
    {
      id: 'drink-water',
      title: 'Drink water when you wake up',
      icon: 'drink_water.svg',
      category: 'health',
      steps: ['Get a glass of water', 'Drink slowly']
    },
    {
      id: 'morning-meditation',
      title: '5-Minute morning meditation',
      icon: 'calm.svg',
      category: 'health',
      steps: ['Find a quiet spot', 'Set timer for 5 minutes', 'Focus on breathing']
    },
    {
      id: 'custom',
      title: "Sam's first habit",
      icon: null,
      category: null,
      steps: null
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9dac5',
      padding: '20px 16px'
    }}>
      {/* Header Section */}
      <div style={{
        backgroundColor: '#f9dac5',
        borderRadius: '16px',
        padding: '20px',
        textAlign: 'center',
        marginBottom: '32px'
      }}>
        {/* Animated Icon */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '16px'
        }}>
          <img 
            src="/icons/habits_2.svg"
            alt="Habits"
            style={{ 
              width: '60px', 
              height: '60px',
              animation: 'rock 2s ease-in-out infinite'
            }}
          />
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#4c4c4c',
          margin: '0 0 12px 0',
          textAlign: 'center'
        }}>
          Let's Build Something Great!
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '16px',
          fontWeight: 400,
          color: '#4c4c4c',
          margin: 0,
          textAlign: 'center',
          lineHeight: '1.4'
        }}>
          Small, consistent actions create big changes. Perfect for ADHD brains who thrive on routine.
        </p>
      </div>

      {/* Quick Start Section Container */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '2px solid #e2e2e2',
        borderRadius: '16px',
        padding: '20px'
      }}>
        {/* Quick Start Title */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <img 
            src="/icons/twinkle.svg"
            alt="Twinkle"
            style={{ width: '24px', height: '24px', marginRight: '8px' }}
          />
          <h2 style={{
            fontSize: '18px',
            fontWeight: 500,
            color: '#4c4c4c',
            margin: 0
          }}>
            Try Adding Your First Habit:
          </h2>
        </div>

        {/* Suggested Habits List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginBottom: '32px'
        }}>
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '16px',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9fa'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF'
              }}
            >
              {/* Icon */}
              <div style={{
                width: '32px',
                height: '32px',
                marginRight: '12px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {suggestion.icon ? (
                  <img 
                    src={`/icons/${suggestion.icon}`}
                    alt={suggestion.title}
                    style={{ width: '32px', height: '32px' }}
                  />
                ) : (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#f9c075',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#FFFFFF'
                    }}>
                      S
                    </span>
                  </div>
                )}
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <span style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#4c4c4c'
                }}>
                  {suggestion.title}
                </span>
              </div>

              {/* Arrow */}
              <ChevronRight 
                size={16}
                style={{ 
                  color: '#a5a5a5',
                  flexShrink: 0
                }}
              />
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes rock {
          0%, 100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }
      `}</style>
    </div>
  )
}