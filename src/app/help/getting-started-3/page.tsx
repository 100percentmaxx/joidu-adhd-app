'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function GettingStarted3Page() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/help/getting-started-2')
  }

  const handleNext = () => {
    router.push('/help/getting-started-4')
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
            src="/icons/home_color.svg"
            alt="Home"
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
            Your Daily Command Center
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
          Your Home screen is designed to give you clarity without overwhelm. Let's tour what you'll see each day:
        </p>

        {/* Home Screen Features Section */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '12px'
          }}>
            What you'll find on your Home screen:
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
              • <strong>Good Morning, [Name]!</strong> - We greet you by name because you matter
            </li>
            <li style={{ marginBottom: '4px' }}>
              • <strong>Today's Schedule</strong> - See upcoming events with beautiful category colors
            </li>
            <li style={{ marginBottom: '4px' }}>
              • <strong>Tasks Section</strong> - Only shows 3-5 priority tasks to avoid overwhelm
            </li>
            <li style={{ marginBottom: '4px' }}>
              • <strong>Habits Section</strong> - Your routines with progress bars and streak counters
            </li>
          </ul>
        </div>

        {/* Orange Lightning Button Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '12px'
          }}>
            The Orange Lightning Button ⚡
          </h2>
          <p style={{
            fontSize: '14px',
            fontWeight: 400,
            color: '#4c4c4c',
            margin: 0,
            lineHeight: '1.4'
          }}>
            This is your secret weapon! When you feel stuck or overwhelmed, tap it for gentle help. It's like having a supportive friend who notices when you need assistance.
          </p>
        </div>

        {/* Try Dashboard Box */}
        <div style={{
          backgroundColor: '#ddede3',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          <div style={{ marginBottom: '8px' }}>
            <Image
              src="/icons/home_active.svg"
              alt="Dashboard"
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
            See Your Dashboard
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
            See My Dashboard
          </button>

          <p style={{
            fontSize: '14px',
            fontWeight: 400,
            color: '#4c4c4c',
            margin: 0,
            lineHeight: '1.4'
          }}>
            Preview: Your personalized Home screen with gentle colors and clear sections
          </p>
        </div>

        {/* Design Philosophy Box */}
        <div style={{
          backgroundColor: '#cae9ef',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '12px'
          }}>
            📱 What you'll notice:
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
              • Gentle colors that won't strain your eyes
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Lots of white space to reduce visual clutter
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Clear sections so you know where everything is
            </li>
            <li style={{ marginBottom: '4px' }}>
              • No overwhelming numbers or statistics
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