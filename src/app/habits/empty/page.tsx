'use client'

import React from 'react'
import LightningFAB from '@/components/ui/LightningFAB'
import HabitSuggestionCard from '../components/HabitSuggestionCard'
import { HABIT_SUGGESTIONS } from '@/types/habits'

export default function HabitsEmptyPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9dac5',
      padding: '20px 16px 100px 16px'
    }}>
      {/* Header Section */}
      <div style={{
        backgroundColor: '#f9dac5',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '32px',
        textAlign: 'center'
      }}>
        {/* Animated Icon */}
        <div style={{
          marginBottom: '16px',
          display: 'flex',
          justifyContent: 'center'
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
          fontWeight: 700,
          color: '#4c4c4c',
          margin: '0 0 12px 0',
          lineHeight: '1.2'
        }}>
          Let's Build Something Great!
        </h1>
        
        {/* Subtitle */}
        <p style={{
          fontSize: '16px',
          fontWeight: 400,
          color: '#4c4c4c',
          margin: 0,
          lineHeight: '1.4'
        }}>
          Small, consistent actions create big changes. Perfect for ADHD brains who thrive on routine.
        </p>
      </div>

      {/* Quick Start Section */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '2px solid #e2e2e2',
        borderRadius: '12px',
        padding: '20px'
      }}>
        {/* Section Title */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          gap: '8px'
        }}>
          <img 
            src="/icons/twinkle.svg"
            alt=""
            style={{ width: '24px', height: '24px' }}
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
          gap: '12px'
        }}>
          <HabitSuggestionCard suggestion={HABIT_SUGGESTIONS[0]} />
          <HabitSuggestionCard suggestion={HABIT_SUGGESTIONS[1]} />
          <HabitSuggestionCard isCustom={true} userName="Sam" />
        </div>
      </div>

      {/* CSS for rocking animation */}
      <style jsx>{`
        @keyframes rock {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
      `}</style>

      {/* Lightning FAB */}
      <LightningFAB />
    </div>
  )
}