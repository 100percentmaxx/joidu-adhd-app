'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function KaiGuide3Page() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/help/kai-guide-2')
  }

  const handleNext = () => {
    router.push('/help/kai-guide-4')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#cae9ef', padding: '20px' }}>
      {/* White Container */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '2px solid #e2e2e2',
        padding: '20px',
        marginBottom: '24px'
      }}>
        {/* Section Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <Image
            src="/icons/maintenance.svg"
            alt="Maintenance"
            width={32}
            height={32}
            style={{ marginRight: '8px' }}
          />
          <h1 style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#4c4c4c',
            margin: 0
          }}>
            Your ADHD Support Toolkit 🛠️
          </h1>
        </div>

        {/* Task Management Section */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '12px'
          }}>
            Task Management:
          </h2>
          <ul style={{
            fontSize: '14px',
            color: '#4c4c4c',
            paddingLeft: '16px',
            lineHeight: '1.6',
            margin: 0,
            listStyle: 'none'
          }}>
            <li style={{ marginBottom: '4px' }}>
              • Breaking down big projects into brain-friendly steps
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Finding the right starting point when everything feels overwhelming
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Suggesting realistic time estimates based on ADHD time perception
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Creating gentle accountability without shame
            </li>
          </ul>
        </div>

        {/* Daily Support Section */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '12px'
          }}>
            Daily Support:
          </h2>
          <ul style={{
            fontSize: '14px',
            color: '#4c4c4c',
            paddingLeft: '16px',
            lineHeight: '1.6',
            margin: 0,
            listStyle: 'none'
          }}>
            <li style={{ marginBottom: '4px' }}>
              • Morning routine planning that actually sticks
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Energy-aware scheduling (admin tasks when alert, creative work when inspired)
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Transition help between tasks and activities
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Evening wind-down and reflection
            </li>
          </ul>
        </div>

        {/* Crisis Support Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '12px'
          }}>
            Crisis Support:
          </h2>
          <ul style={{
            fontSize: '14px',
            color: '#4c4c4c',
            paddingLeft: '16px',
            lineHeight: '1.6',
            margin: 0,
            listStyle: 'none'
          }}>
            <li style={{ marginBottom: '4px' }}>
              • Overwhelm intervention through the Orange Lightning Button
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Task paralysis solutions with simple first steps
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Motivation when stuck with encouraging, personalized messages
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Gentle reality checks when hyperfocus goes too long
            </li>
          </ul>
        </div>

        {/* Example Conversations Box */}
        <div style={{
          backgroundColor: '#e6e1f4',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '12px'
          }}>
            Real conversations with Kai:
          </h3>
          <ul style={{
            fontSize: '14px',
            color: '#4c4c4c',
            paddingLeft: '16px',
            lineHeight: '1.6',
            margin: 0,
            listStyle: 'none'
          }}>
            <li style={{ marginBottom: '4px' }}>
              • "I have 20 things to do and can't pick where to start"
            </li>
            <li style={{ marginBottom: '4px' }}>
              • "I've been working for 4 hours straight, should I take a break?"
            </li>
            <li style={{ marginBottom: '4px' }}>
              • "Help me plan my week around my energy levels"
            </li>
            <li style={{ marginBottom: '4px' }}>
              • "I keep getting distracted, what should I do?"
            </li>
          </ul>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="transition-transform hover:scale-105"
          style={{
            backgroundColor: '#f9c075',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: 700,
            padding: '12px 16px',
            borderRadius: '12px',
            border: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          ← Back
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="transition-transform hover:scale-105"
          style={{
            backgroundColor: '#f9c075',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: 700,
            padding: '12px 16px',
            borderRadius: '12px',
            border: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          Next →
        </button>
      </div>
    </div>
  )
}