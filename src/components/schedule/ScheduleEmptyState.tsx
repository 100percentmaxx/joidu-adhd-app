'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

interface ScheduleEmptyStateProps {
  userName?: string
  userProfilePic?: string | null
}

export default function ScheduleEmptyState({ userName = 'Sam Johnson', userProfilePic }: ScheduleEmptyStateProps) {
  const router = useRouter()

  // Generate user initials for profile circle if no profile pic provided
  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  // Get first name from full name
  const getFirstName = (name: string) => {
    return name.split(' ')[0]
  }

  // Navigation handlers for each suggestion
  const handleMorningMeeting = () => {
    const params = new URLSearchParams({
      title: 'Morning meeting',
      time: '09:00'
    })
    router.push(`/add-schedule?${params.toString()}`)
  }

  const handleLunchBreak = () => {
    const params = new URLSearchParams({
      title: 'Lunch break',
      time: '12:00'
    })
    router.push(`/add-schedule?${params.toString()}`)
  }

  const handlePersonalEvent = () => {
    const firstName = getFirstName(userName)
    const params = new URLSearchParams({
      title: `${firstName}'s first schedule event`
    })
    router.push(`/add-schedule?${params.toString()}`)
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
        width: '20px', 
        height: '20px',
        marginRight: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </div>

      {/* Task Text */}
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
          src="/icons/schedule.svg" 
          alt="Schedule"
          style={{ width: '42px', height: '42px' }}
        />
      </div>

      {/* Header Text */}
      <h3 style={{
        fontSize: '17px',
        fontWeight: 500,
        color: '#4c4c4c',
        margin: '0 0 4px 0'
      }}>
        Your Day, Your Way
      </h3>

      {/* Description Text */}
      <p style={{
        fontSize: '13px',
        fontWeight: 400,
        color: '#a5a5a5',
        margin: '0 0 18px 0',
        lineHeight: '1.4'
      }}>
        Time to create a schedule that works with your ADHD brain, not against it.
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
          Start with these essentials:
        </span>
      </div>

      {/* Starter Suggestions */}
      <div style={{ textAlign: 'left' }}>
        {/* Morning Meeting Suggestion */}
        {renderSuggestionRow(
          <img 
            src="/icons/morning.svg" 
            alt="Morning"
            style={{ width: '20px', height: '20px' }}
          />,
          'Morning meeting',
          handleMorningMeeting
        )}

        {/* Lunch Break Suggestion */}
        {renderSuggestionRow(
          <img 
            src="/icons/food.svg" 
            alt="Food"
            style={{ width: '20px', height: '20px' }}
          />,
          'Lunch break',
          handleLunchBreak
        )}

        {/* Personal Event Suggestion */}
        {renderSuggestionRow(
          userProfilePic ? (
            <img 
              src={userProfilePic}
              alt="Profile"
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#2847ef',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: 600,
              color: 'white'
            }}>
              {getUserInitials(userName)}
            </div>
          ),
          `${getFirstName(userName)}'s first schedule event`,
          handlePersonalEvent
        )}
      </div>
    </div>
  )
}