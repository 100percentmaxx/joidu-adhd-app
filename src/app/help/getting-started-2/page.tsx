'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function GettingStarted2Page() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/help/getting-started')
  }

  const handleNext = () => {
    router.push('/help/getting-started-3')
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
        {/* Section Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <Image
            src="/icons/kai.svg"
            alt="Kai AI Assistant"
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
            Say Hello to Kai 👋
          </h1>
        </div>

        {/* Introduction Text */}
        <p style={{
          fontSize: '16px',
          fontWeight: 400,
          color: '#4c4c4c',
          marginBottom: '20px',
          lineHeight: '1.4'
        }}>
          Meet Kai, your AI assistant who actually gets ADHD brains. Unlike other productivity apps that feel like they're judging you, Kai is here to support you exactly as you are.
        </p>

        {/* What Makes Kai Special Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '12px'
          }}>
            What makes Kai special:
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
              • Non-judgmental: Never makes you feel bad about incomplete tasks
            </li>
            <li style={{ marginBottom: '4px' }}>
              • ADHD-aware: Understands executive function challenges
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Adaptive: Learns your patterns without being creepy about it
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Private: All learning happens on your device only
            </li>
          </ul>
        </div>

        {/* Try It Now Box */}
        <div style={{
          backgroundColor: '#cae9ef',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          <div style={{ marginBottom: '8px' }}>
            <Image
              src="/icons/twinkle.svg"
              alt="Twinkle"
              width={24}
              height={24}
              style={{ margin: '0 auto' }}
            />
          </div>
          
          <h3 style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#2847ef',
            marginBottom: '18px'
          }}>
            Try Asking Kai Now!
          </h3>

          <button
            disabled
            style={{
              backgroundColor: '#2847ef',
              color: '#FFFFFF',
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

          <p style={{
            fontSize: '14px',
            fontWeight: 400,
            color: '#4c4c4c',
            margin: 0,
            lineHeight: '1.4'
          }}>
            Example prompt: Try asking: "I'm feeling overwhelmed with my to-do list"
          </p>
        </div>

        {/* Pro Tip Box */}
        <div style={{
          backgroundColor: '#fef7d6',
          borderRadius: '16px',
          padding: '16px',
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: '24px'
        }}>
          <Image
            src="/icons/ideas_color.svg"
            alt="Ideas"
            width={24}
            height={24}
            style={{ marginRight: '8px', marginTop: '2px' }}
          />
          <div>
            <p style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#4c4c4c',
              marginBottom: '4px'
            }}>
              Pro tip:
            </p>
            <p style={{
              fontSize: '14px',
              fontWeight: 400,
              color: '#4c4c4c',
              margin: 0,
              lineHeight: '1.4'
            }}>
              You can talk to Kai like a friend. Say things like "I'm feeling overwhelmed" or "Help me break down this project" and watch the magic happen.
            </p>
          </div>
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