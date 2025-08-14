'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { HabitSuggestion } from '@/types/habits'

interface HabitSuggestionCardProps {
  suggestion?: HabitSuggestion
  isCustom?: boolean
  userName?: string
}

export default function HabitSuggestionCard({ 
  suggestion, 
  isCustom = false, 
  userName = "Sam" 
}: HabitSuggestionCardProps) {
  const router = useRouter()

  const handleClick = () => {
    if (suggestion) {
      // Pre-fill habit creation with this suggestion
      const params = new URLSearchParams({
        prefill: JSON.stringify({
          name: suggestion.title,
          category: suggestion.category,
          steps: suggestion.steps
        })
      })
      router.push(`/habits/add?${params}`)
    } else {
      // Navigate to Add Habit screen for custom habit
      router.push('/habits/add')
    }
  }

  return (
    <div 
      onClick={handleClick}
      className="cursor-pointer transition-all duration-150 active:scale-98"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}
    >
      {/* Icon */}
      <div style={{ 
        width: '32px', 
        height: '32px',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {isCustom ? (
          // Custom habit - user's initial in orange circle
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
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: 600
            }}>
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
        ) : (
          <img 
            src={`/icons/${suggestion?.icon}`}
            alt=""
            style={{ width: '32px', height: '32px' }}
          />
        )}
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <span style={{
          fontSize: '16px',
          fontWeight: 500,
          color: '#4c4c4c'
        }}>
          {isCustom ? `${userName}'s first habit` : suggestion?.title}
        </span>
      </div>

      {/* Chevron Right */}
      <div style={{ 
        width: '16px', 
        height: '16px',
        flexShrink: 0
      }}>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#a5a5a5" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="9,18 15,12 9,6"></polyline>
        </svg>
      </div>
    </div>
  )
}