'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

interface HabitsEmptyStateProps {
  userName?: string
  userProfilePic?: string | null
}

export default function HabitsEmptyState({ userName = 'Sam', userProfilePic }: HabitsEmptyStateProps) {
  const router = useRouter()

  // Generate user initial (first letter only) for profile circle if no profile pic provided
  const getUserInitial = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  // Get first name from full name
  const getFirstName = (name: string) => {
    return name.split(' ')[0]
  }

  // Navigation handlers for each suggestion
  const handleDrinkWaterHabit = () => {
    const params = new URLSearchParams({
      title: 'Drink water when you wake up',
      category: 'health',
      frequency: 'daily'
    })
    router.push(`/habits/add?${params.toString()}`)
  }

  const handleMeditationHabit = () => {
    const params = new URLSearchParams({
      title: '5-Minute morning meditation',
      category: 'health',
      frequency: 'daily'
    })
    router.push(`/habits/add?${params.toString()}`)
  }

  const handlePersonalHabit = () => {
    const firstName = getFirstName(userName)
    const params = new URLSearchParams({
      title: `${firstName}'s first habit`,
      category: 'personal',
      frequency: 'daily'
    })
    router.push(`/habits/add?${params.toString()}`)
  }

  // Render suggestion row component
  const renderSuggestionRow = (
    icon: React.ReactNode,
    text: string,
    onClick: () => void
  ) => (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '12px 0',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '8px',
        transition: 'background-color 0.2s ease',
        minHeight: '44px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f8f9fa'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.backgroundColor = '#f0f1f2'
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.backgroundColor = '#f8f9fa'
      }}
    >
      {/* Left Icon */}
      <div style={{ 
        width: '32px', 
        height: '32px',
        marginRight: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </div>

      {/* Habit Text */}
      <span style={{
        flex: 1,
        textAlign: 'left',
        fontSize: '15px',
        fontWeight: 400,
        color: '#4c4c4c'
      }}>
        {text}
      </span>

      {/* Right Chevron */}
      <ChevronRight 
        size={12} 
        style={{ color: '#a5a5a5', marginLeft: '8px' }}
      />
    </button>
  )

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      padding: '16px',
      textAlign: 'center'
    }}>
      {/* Main Icon */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
        <img 
          src="/icons/habits_2.svg" 
          alt="Habits"
          style={{ width: '60px', height: '60px' }}
        />
      </div>

      {/* Header Text */}
      <h3 style={{
        fontSize: '17px',
        fontWeight: 500,
        color: '#4c4c4c',
        margin: '0 0 4px 0'
      }}>
        Let's Build Something Great!
      </h3>

      {/* Description Text */}
      <p style={{
        fontSize: '13px',
        fontWeight: 400,
        color: '#a5a5a5',
        margin: '0 0 18px 0',
        lineHeight: '1.4'
      }}>
        Small, consistent actions create big changes. Perfect for ADHD brains who thrive on routine.
      </p>

      {/* Try Adding Line */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '18px'
      }}>
        <img 
          src="/icons/twinkle.svg" 
          alt="Twinkle"
          style={{ width: '24px', height: '24px', marginRight: '8px' }}
        />
        <span style={{
          fontSize: '15px',
          fontWeight: 400,
          color: '#4c4c4c'
        }}>
          Maybe start with something healthy:
        </span>
      </div>

      {/* Starter Suggestions */}
      <div style={{ textAlign: 'left' }}>
        {/* Drink Water Habit Suggestion */}
        {renderSuggestionRow(
          <img 
            src="/icons/drink_water.svg" 
            alt="Drink Water"
            style={{ width: '32px', height: '32px' }}
          />,
          'Drink water when you wake up',
          handleDrinkWaterHabit
        )}

        {/* Meditation Habit Suggestion */}
        {renderSuggestionRow(
          <img 
            src="/icons/calm.svg" 
            alt="Meditation"
            style={{ width: '32px', height: '32px' }}
          />,
          '5-Minute morning meditation',
          handleMeditationHabit
        )}

        {/* Personal Habit Suggestion */}
        {renderSuggestionRow(
          userProfilePic ? (
            <img 
              src={userProfilePic}
              alt="Profile"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#f9c075',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 600,
              color: 'white'
            }}>
              {getUserInitial(userName)}
            </div>
          ),
          `${getFirstName(userName)}'s first habit`,
          handlePersonalHabit
        )}
      </div>
    </div>
  )
}