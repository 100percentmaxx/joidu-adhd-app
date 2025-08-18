'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function KaiGuide4Page() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/help/kai-guide-3')
  }

  const handleNext = () => {
    router.push('/help/kai-guide-5')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--guide-kai-ai)', padding: '20px' }}>
      {/* White Container */}
      <div style={{
        backgroundColor: 'var(--card-background)',
        borderRadius: '16px',
        border: '2px solid var(--border-color)',
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
            src="/icons/preferences.svg"
            alt="Preferences"
            width={32}
            height={32}
            style={{ marginRight: '8px' }}
          />
          <h1 style={{
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: 0
          }}>
            Make Kai Work for YOU
          </h1>
        </div>

        {/* Communication Styles Section */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '12px'
          }}>
            Communication Styles:
          </h2>
          <ul style={{
            fontSize: '14px',
            color: 'var(--text-primary)',
            paddingLeft: '16px',
            lineHeight: '1.6',
            margin: 0,
            listStyle: 'none'
          }}>
            <li style={{ marginBottom: '4px' }}>
              • Gentle: Soft, nurturing support with lots of encouragement
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Direct: Clear, straightforward guidance without extra fluff
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Funny: Playful, humorous approach to keep things light
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Balanced: Mix of all styles based on your mood and situation
            </li>
          </ul>
        </div>

        {/* Response Preferences Section */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '12px'
          }}>
            Response Preferences:
          </h2>
          <ul style={{
            fontSize: '14px',
            color: 'var(--text-primary)',
            paddingLeft: '16px',
            lineHeight: '1.6',
            margin: 0,
            listStyle: 'none'
          }}>
            <li style={{ marginBottom: '4px' }}>
              • Concise: Quick, actionable advice when you're overwhelmed
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Detailed: Thorough explanations when you want to understand
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Step-by-step: Broken down instructions for complex tasks
            </li>
          </ul>
        </div>

        {/* Learning Controls Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '12px'
          }}>
            Learning Controls:
          </h2>
          <ul style={{
            fontSize: '14px',
            color: 'var(--text-primary)',
            paddingLeft: '16px',
            lineHeight: '1.6',
            margin: 0,
            listStyle: 'none'
          }}>
            <li style={{ marginBottom: '4px' }}>
              • Turn on/off pattern recognition
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Reset Kai's learning if you want a fresh start
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Adjust suggestion frequency from minimal to frequent
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Set conversation boundaries for what Kai should remember
            </li>
          </ul>
        </div>

        {/* Settings Navigation Box */}
        <div style={{
          backgroundColor: 'var(--guide-kai-ai)',
          borderRadius: '16px',
          padding: '16px',
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '12px'
          }}>
            Customize Kai Settings:
          </h3>
          <button
            disabled
            style={{
              backgroundColor: 'var(--primary-blue)',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 700,
              padding: '12px 16px',
              borderRadius: '12px',
              border: 'none',
              whiteSpace: 'nowrap',
              marginBottom: '12px',
              opacity: 0.7,
              cursor: 'not-allowed'
            }}
          >
            Customize Kai
          </button>
          <p style={{
            fontSize: '14px',
            fontWeight: 400,
            color: 'var(--text-primary)',
            margin: 0,
            lineHeight: '1.4'
          }}>
            Preview: Different communication styles will be available in your settings
          </p>
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
            backgroundColor: 'var(--primary-orange)',
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
            backgroundColor: 'var(--primary-orange)',
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