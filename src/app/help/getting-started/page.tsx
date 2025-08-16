'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function GettingStartedPage() {
  const router = useRouter()

  const handleNext = () => {
    router.push('/help/getting-started-2')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e6e1f4', padding: '20px' }}>
      {/* White Container */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '2px solid #e2e2e2',
        padding: '20px',
        marginBottom: '24px'
      }}>
        {/* Hero Section */}
        <div className="text-center" style={{ marginBottom: '32px' }}>
          {/* Rocket Icon with gentle bounce animation */}
          <div style={{ marginBottom: '32px' }}>
            <Image
              src="/icons/rocket.svg"
              alt="Rocket"
              width={80}
              height={80}
              className="rocket-bounce"
              style={{ margin: '0 auto' }}
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
            Welcome to Your ADHD-Friendly Productivity Partner!
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '16px',
            fontWeight: 400,
            color: '#a5a5a5',
            marginBottom: '32px',
            lineHeight: '1.4'
          }}>
            Let's set you up for success with gentle, brain-friendly productivity
          </p>
        </div>

        {/* Introduction Box */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '2px solid #e2e2e2',
          padding: '20px',
          marginBottom: '32px'
        }}>
          <p style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '16px',
            lineHeight: '1.4'
          }}>
            Hi there! 👋 We know starting something new can feel overwhelming, especially for ADHD brains. That's why we've made this guide super gentle and flexible.
          </p>
          <p style={{
            fontSize: '16px',
            fontWeight: 400,
            color: '#4c4c4c',
            margin: 0,
            lineHeight: '1.4'
          }}>
            You can always come back to any section, skip things that don't feel right, or just jump straight into using Joidu. There's no wrong way to do this!
          </p>
        </div>

        {/* Path Selection Section */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#2847ef',
            marginBottom: '24px'
          }}>
            Choose Your Journey:
          </h2>

          <button
            disabled
            style={{
              backgroundColor: '#2847ef',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: 500,
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              width: '100%',
              height: '48px',
              marginBottom: '16px',
              opacity: 0.7,
              cursor: 'not-allowed'
            }}
          >
            Get me started in 5 minutes
          </button>

          <button
            disabled
            style={{
              backgroundColor: '#fa772c',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: 500,
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              width: '100%',
              height: '48px',
              marginBottom: '16px',
              opacity: 0.7,
              cursor: 'not-allowed'
            }}
          >
            I want the full tour
          </button>

          <button
            disabled
            style={{
              backgroundColor: '#e2e2e2',
              color: '#4c4c4c',
              fontSize: '16px',
              fontWeight: 500,
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              width: '100%',
              height: '48px',
              marginBottom: '12px',
              opacity: 0.7,
              cursor: 'not-allowed'
            }}
          >
            I'll figure it out myself
          </button>

          <p style={{
            fontSize: '12px',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#4c4c4c',
            margin: 0
          }}>
            All paths currently lead to the full tour - customization coming soon!
          </p>
        </div>

        {/* Encouragement Box */}
        <div style={{
          backgroundColor: '#ddede3',
          borderRadius: '16px',
          padding: '16px',
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: '24px'
        }}>
          <Image
            src="/icons/celebration.svg"
            alt="Celebration"
            width={24}
            height={24}
            style={{ marginRight: '8px', marginTop: '2px' }}
          />
          <p style={{
            fontSize: '14px',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#4c4c4c',
            margin: 0,
            lineHeight: '1.4'
          }}>
            Remember: This guide is here to support you, not test you. Go at your own pace and celebrate every step forward! 🌟
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}>
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
          Get Started →
        </button>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        .rocket-bounce {
          animation: gentle-bounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}