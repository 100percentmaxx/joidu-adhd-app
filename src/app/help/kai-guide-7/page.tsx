'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function KaiGuide7Page() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/help/kai-guide-6')
  }

  const handleFinish = () => {
    router.push('/settings/help')
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
            src="/icons/start.svg"
            alt="Start"
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
            Ready to Team Up with Kai?
          </h1>
        </div>

        {/* Summary Section */}
        <div style={{ marginBottom: '24px' }}>
          <p style={{
            fontSize: '16px',
            fontWeight: 400,
            color: '#4c4c4c',
            marginBottom: '12px',
            lineHeight: '1.4'
          }}>
            Kai isn't just another AI assistant - I'm your ADHD-aware productivity partner. Together, we can:
          </p>
          <ul style={{
            fontSize: '14px',
            color: '#4c4c4c',
            paddingLeft: '16px',
            lineHeight: '1.6',
            margin: 0,
            listStyle: 'none'
          }}>
            <li style={{ marginBottom: '4px' }}>
              • Turn overwhelming days into manageable ones
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Build routines that actually stick
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Celebrate your unique ADHD strengths
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Navigate challenges with understanding and support
            </li>
          </ul>
        </div>

        {/* Next Steps Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '12px'
          }}>
            Next Steps:
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
              • Start a conversation with Kai about your biggest ADHD challenge
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Explore the settings to customize communication style
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Try the Orange Lightning Button next time you feel stuck
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Remember: There's no wrong way to work with Kai - we'll figure it out together
            </li>
          </ul>
        </div>

        {/* Call-to-Action Buttons Box */}
        <div style={{
          backgroundColor: '#ddede3',
          borderRadius: '16px',
          padding: '16px',
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '16px'
          }}>
            Get Started with Kai:
          </h3>
          
          <button
            disabled
            style={{
              backgroundColor: '#2847ef',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 700,
              padding: '12px 16px',
              borderRadius: '12px',
              border: 'none',
              whiteSpace: 'nowrap',
              marginBottom: '12px',
              display: 'block',
              width: '100%',
              opacity: 0.7,
              cursor: 'not-allowed'
            }}
          >
            Start Chatting with Kai
          </button>

          <button
            disabled
            style={{
              backgroundColor: '#c8bfef',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 700,
              padding: '12px 16px',
              borderRadius: '12px',
              border: 'none',
              whiteSpace: 'nowrap',
              marginBottom: '12px',
              display: 'block',
              width: '100%',
              opacity: 0.7,
              cursor: 'not-allowed'
            }}
          >
            Customize My Settings
          </button>

          <button
            disabled
            style={{
              backgroundColor: '#fa772c',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 700,
              padding: '12px 16px',
              borderRadius: '12px',
              border: 'none',
              whiteSpace: 'nowrap',
              marginBottom: '12px',
              display: 'block',
              width: '100%',
              opacity: 0.7,
              cursor: 'not-allowed'
            }}
          >
            Try Just-One-Thing
          </button>

          <p style={{
            fontSize: '12px',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#4c4c4c',
            margin: 0
          }}>
            All features will be connected soon!
          </p>
        </div>

        {/* Completion Message */}
        <div style={{
          backgroundColor: '#cae9ef',
          borderRadius: '16px',
          padding: '16px',
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          <div style={{ marginBottom: '8px' }}>
            <Image
              src="/icons/celebration.svg"
              alt="Celebration"
              width={24}
              height={24}
              style={{ margin: '0 auto' }}
            />
          </div>
          <p style={{
            fontSize: '16px',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#4c4c4c',
            margin: 0,
            lineHeight: '1.4'
          }}>
            Congratulations! You now understand how Kai can support your ADHD journey. Welcome to your new productivity partnership! 🎉
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

        {/* Finish Button */}
        <button
          onClick={handleFinish}
          className="transition-transform hover:scale-105"
          style={{
            backgroundColor: '#2847ef',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: 700,
            padding: '12px 16px',
            borderRadius: '12px',
            border: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          Finish Guide
        </button>
      </div>
    </div>
  )
}