'use client'

import React from 'react'
import { BreakActivity } from '@/types/focus'

interface BreakSuggestionsProps {
  activities: BreakActivity[]
  onActivitySelect: (activity: BreakActivity) => void
  onCustomBreak: () => void
  urgencyLevel?: 'gentle' | 'strong' | 'urgent' | 'emergency'
}

export default function BreakSuggestions({ 
  activities, 
  onActivitySelect, 
  onCustomBreak,
  urgencyLevel = 'gentle'
}: BreakSuggestionsProps) {
  const getUrgencyStyles = () => {
    switch (urgencyLevel) {
      case 'gentle':
        return {
          borderColor: '#a8e2bb',
          backgroundColor: '#f0f8f0',
          textColor: '#2d5016'
        }
      case 'strong':
        return {
          borderColor: '#f7e98e',
          backgroundColor: '#fefcf0', 
          textColor: '#5d4e00'
        }
      case 'urgent':
        return {
          borderColor: '#f4b7ae',
          backgroundColor: '#fdf2f0',
          textColor: '#7c2d12'
        }
      case 'emergency':
        return {
          borderColor: '#ff6b6b',
          backgroundColor: '#fff0f0',
          textColor: '#dc2626'
        }
      default:
        return {
          borderColor: '#2847ef',
          backgroundColor: '#e6f3ff',
          textColor: '#1e40af'
        }
    }
  }

  const urgencyStyles = getUrgencyStyles()

  const getUrgencyMessage = () => {
    switch (urgencyLevel) {
      case 'gentle':
        return "Your brain would love a quick recharge! 💙"
      case 'strong':
        return "Time for some brain maintenance! 🔧"
      case 'urgent':
        return "Your ADHD brain really needs this break! ⚡"
      case 'emergency':
        return "Emergency break time - your wellbeing comes first! 🚨"
      default:
        return "Take care of your amazing brain! ✨"
    }
  }

  return (
    <div className="space-y-6">
      {/* Urgency message */}
      <div 
        className="p-4 rounded-lg border-2"
        style={{ 
          borderColor: urgencyStyles.borderColor,
          backgroundColor: urgencyStyles.backgroundColor 
        }}
      >
        <h3 style={{ 
          color: urgencyStyles.textColor,
          fontSize: '16px',
          fontWeight: 600,
          marginBottom: '8px'
        }}>
          Break Time! 
        </h3>
        <p style={{ 
          color: urgencyStyles.textColor,
          fontSize: '14px',
          lineHeight: '1.4'
        }}>
          {getUrgencyMessage()}
        </p>
      </div>

      {/* Quick Recharge Ideas */}
      <div>
        <h3 style={{ 
          color: '#4c4c4c', 
          fontSize: '18px', 
          fontWeight: 600,
          marginBottom: '16px'
        }}>
          Quick Recharge Ideas
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          {activities.map((activity) => (
            <button
              key={activity.id}
              onClick={() => onActivitySelect(activity)}
              className="p-4 rounded-lg bg-white border-2 border-gray-200 hover:border-orange-300 transition-all duration-200 hover:scale-105"
              style={{ minHeight: '80px' }}
            >
              <div className="flex flex-col items-center text-center">
                <span style={{ fontSize: '24px', marginBottom: '8px' }}>
                  {activity.icon}
                </span>
                <span style={{ 
                  color: '#4c4c4c', 
                  fontSize: '14px', 
                  fontWeight: 500,
                  marginBottom: '4px'
                }}>
                  {activity.label}
                </span>
                <span style={{ 
                  color: '#a5a5a5', 
                  fontSize: '12px' 
                }}>
                  {activity.duration} min
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom break option */}
      <div className="text-center">
        <button
          onClick={onCustomBreak}
          className="px-6 py-3 rounded-lg border-2 border-gray-300 hover:border-orange-300 transition-all duration-200"
          style={{ backgroundColor: 'white' }}
        >
          <span style={{ 
            color: '#4c4c4c', 
            fontSize: '16px', 
            fontWeight: 500 
          }}>
            Custom Break Duration
          </span>
        </button>
      </div>

      {/* ADHD encouragement */}
      <div 
        className="p-4 rounded-lg text-center"
        style={{ backgroundColor: '#f0f8ff', border: '1px solid #2847ef' }}
      >
        <p style={{ 
          color: '#2847ef', 
          fontSize: '14px',
          fontWeight: 500,
          marginBottom: '8px'
        }}>
          Remember: Breaks aren't laziness! 💪
        </p>
        <p style={{ 
          color: '#4c4c4c', 
          fontSize: '13px',
          lineHeight: '1.4'
        }}>
          Your ADHD brain works differently. Regular breaks help maintain focus, 
          prevent burnout, and actually increase your overall productivity.
        </p>
      </div>
    </div>
  )
}