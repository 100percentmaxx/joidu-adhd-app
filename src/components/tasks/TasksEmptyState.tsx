'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

interface TasksEmptyStateProps {
  userName?: string
}

export default function TasksEmptyState({ userName = 'Your' }: TasksEmptyStateProps) {
  const router = useRouter()

  // Generate user initials for profile circle if no name provided
  const getUserInitials = (name: string) => {
    if (name === 'Your') return 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  // Navigation handlers for each suggestion
  const handleEmailTask = () => {
    const params = new URLSearchParams({
      title: 'Reply to important emails',
      category: 'work'
    })
    router.push(`/add-task?${params.toString()}`)
  }

  const handleGroceryTask = () => {
    const params = new URLSearchParams({
      title: 'Make grocery list',
      category: 'personal'
    })
    router.push(`/add-task?${params.toString()}`)
  }

  const handlePersonalTask = () => {
    const params = new URLSearchParams({
      title: `${userName === 'Your' ? 'Your' : userName + "'s"} first task`
    })
    router.push(`/add-task?${params.toString()}`)
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
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      textAlign: 'center'
    }}>
      {/* Main Icon */}
      <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
        <img 
          src="/icons/tasks_3.svg" 
          alt="Tasks"
          style={{ width: '32px', height: '32px' }}
        />
      </div>

      {/* Header Text */}
      <h3 style={{
        fontSize: '17px',
        fontWeight: 500,
        color: '#4c4c4c',
        margin: '0 0 4px 0'
      }}>
        Ready to Get Started?
      </h3>

      {/* Description Text */}
      <p style={{
        fontSize: '13px',
        fontWeight: 400,
        color: '#a5a5a5',
        margin: '0 0 18px 0'
      }}>
        Perfect clean slate for your ADHD brain!
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
          Try Adding Your First Task:
        </span>
      </div>

      {/* Starter Suggestions */}
      <div style={{ textAlign: 'left' }}>
        {/* Email Task Suggestion */}
        {renderSuggestionRow(
          <img 
            src="/icons/email.svg" 
            alt="Email"
            style={{ width: '20px', height: '20px' }}
          />,
          'Reply to important emails',
          handleEmailTask
        )}

        {/* Grocery Task Suggestion */}
        {renderSuggestionRow(
          <img 
            src="/icons/personal_gray.svg" 
            alt="Personal"
            style={{ width: '20px', height: '20px' }}
          />,
          'Make grocery list',
          handleGroceryTask
        )}

        {/* Personal Task Suggestion */}
        {renderSuggestionRow(
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
          </div>,
          `${userName === 'Your' ? 'Your' : userName + "'s"} first task`,
          handlePersonalTask
        )}
      </div>
    </div>
  )
}