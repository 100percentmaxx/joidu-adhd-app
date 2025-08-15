'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function KaiGuidePage() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/settings/help')
  }

  const handleNext = () => {
    // router.push('/help/kai-guide-2') // Inactive for now
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#cae9ef', padding: '20px' }}>
      {/* Hero Section */}
      <div className="text-center mb-8">
        {/* Kai Icon with animations */}
        <div className="mb-8 inline-block">
          <Image
            src="/icons/kai.svg"
            alt="Kai AI Assistant"
            width={80}
            height={80}
            className="kai-sparkle"
            style={{
              animation: 'gentle-pulse 2s ease-in-out infinite, sparkle 3s ease-in-out infinite'
            }}
          />
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#2847ef',
          marginBottom: '24px',
          lineHeight: '1.2'
        }}>
          Meet Kai, Your ADHD-Aware Assistant
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '16px',
          fontWeight: 400,
          color: '#4c4c4c',
          marginBottom: '32px',
          lineHeight: '1.4'
        }}>
          Learn how Kai understands your brain and helps you thrive
        </p>
      </div>

      {/* White Container - extends to bottom */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        border: '2px solid #e2e2e2',
        padding: '20px',
        marginBottom: '32px'
      }}>
        {/* Introduction Text */}
        <p style={{
          fontSize: '18px',
          fontWeight: 700,
          color: '#4c4c4c',
          lineHeight: '1.4',
          marginBottom: '32px'
        }}>
          Hi! I'm Kai, and I'm here to help you work WITH your ADHD brain, not against it. Let me show you what makes me different from other AI assistants.
        </p>

        {/* Section Title */}
        <h2 style={{
          fontSize: '16px',
          fontWeight: 700,
          color: '#2847ef',
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          What Makes Kai Special
        </h2>

        {/* Brain Icon and Title */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '18px'
        }}>
          <Image
            src="/icons/brain.svg"
            alt="Brain"
            width={24}
            height={24}
            style={{ marginRight: '8px' }}
          />
          <h3 style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#4c4c4c',
            margin: 0
          }}>
            Why Kai Gets ADHD Brains
          </h3>
        </div>

        {/* Description Text */}
        <p style={{
          fontSize: '14px',
          fontWeight: 400,
          color: '#4c4c4c',
          padding: '20px',
          marginBottom: '18px',
          lineHeight: '1.4',
          textAlign: 'justify'
        }}>
          Most productivity tools feel like they're designed for neurotypical brains. Kai is different - I was specifically trained to understand ADHD challenges and strengths.
        </p>

        {/* Bullet List */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '16px'
          }}>
            What this means for you:
          </p>
          
          <ul style={{
            fontSize: '14px',
            color: '#4c4c4c',
            paddingLeft: '0',
            lineHeight: '1.6',
            margin: 0,
            listStyle: 'none'
          }}>
            <li style={{ marginBottom: '8px' }}>
              • <strong>No judgment:</strong> I never make you feel bad about incomplete tasks or missed deadlines
            </li>
            <li style={{ marginBottom: '8px' }}>
              • <strong>ADHD-aware suggestions:</strong> I understand executive function challenges and work around them
            </li>
            <li style={{ marginBottom: '8px' }}>
              • <strong>Energy-sensitive:</strong> I know your brain works differently at different times of day
            </li>
            <li style={{ marginBottom: '8px' }}>
              • <strong>Celebration-focused:</strong> I emphasize wins and progress, not perfection
            </li>
          </ul>
        </div>

        {/* Interactive Element - Blue Container within White */}
        <div style={{
          backgroundColor: '#cae9ef',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'center'
        }}>
          {/* Twinkle Icon and Title */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '18px'
          }}>
            <Image
              src="/icons/twinkle.svg"
              alt="Twinkle"
              width={24}
              height={24}
              style={{ marginRight: '8px' }}
            />
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#2847ef',
              margin: 0
            }}>
              Try Asking Kai Now!
            </h3>
          </div>

          {/* Chat Button (inactive) */}
          <button
            disabled
            style={{
              backgroundColor: '#2847ef',
              color: 'white',
              fontSize: '14px',
              fontWeight: 700,
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              whiteSpace: 'nowrap',
              marginBottom: '18px',
              opacity: 0.7,
              cursor: 'not-allowed'
            }}
          >
            Chat with Kai Now
          </button>

          {/* Example Prompt */}
          <p style={{
            fontSize: '14px',
            color: '#4c4c4c',
            margin: 0,
            lineHeight: '1.4'
          }}>
            <strong>Example prompt:</strong> Try asking: "I'm feeling overwhelmed with my to-do list"
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
            backgroundColor: '#f9c075',
            color: 'white',
            fontSize: '14px',
            fontWeight: 700,
            padding: '12px 16px',
            borderRadius: '8px',
            border: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          ← Back
        </button>

        {/* Next Button (inactive) */}
        <button
          disabled
          style={{
            backgroundColor: '#f9c075',
            color: 'white',
            fontSize: '14px',
            fontWeight: 700,
            padding: '12px 16px',
            borderRadius: '8px',
            border: 'none',
            whiteSpace: 'nowrap',
            opacity: 0.5,
            cursor: 'not-allowed'
          }}
        >
          Next →
        </button>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gentle-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 1; }
          25% { opacity: 0.8; }
          50% { opacity: 1; }
          75% { opacity: 0.9; }
        }
      `}</style>
    </div>
  )
}