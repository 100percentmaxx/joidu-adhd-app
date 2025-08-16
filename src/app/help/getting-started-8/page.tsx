'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function GettingStarted8Page() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/help/getting-started-7')
  }

  const handleFinish = () => {
    router.push('/settings/help')
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
            src="/icons/rate.svg"
            alt="Rate"
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
            You're Ready to Activate Your Potential! 🚀
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
            Congratulations! You've learned about all the key features that make Joidu perfect for ADHD brains. You now know how to:
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
              • Work with Kai, your supportive AI assistant
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Use your Home dashboard for daily clarity
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Try the Orange Lightning Button when stuck
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Build habits that actually stick
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Focus without overwhelm
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Manage tasks with celebration, not pressure
            </li>
          </ul>
        </div>

        {/* Settings Preview Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '12px'
          }}>
            Customize Everything:
          </h2>
          <p style={{
            fontSize: '14px',
            fontWeight: 400,
            color: '#4c4c4c',
            margin: 0,
            lineHeight: '1.4'
          }}>
            Don't forget to explore Settings to make Joidu work perfectly for your unique ADHD brain. You can adjust communication styles, notification preferences, and much more.
          </p>
        </div>

        {/* Call-to-Action Buttons Box */}
        <div style={{
          backgroundColor: '#ddede3',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '16px'
          }}>
            Start Your ADHD Journey:
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
            Start Using Joidu
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
            Explore Settings
          </button>

          <button
            disabled
            style={{
              backgroundColor: '#a8e2bb',
              color: '#4c4c4c',
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
            Chat with Kai
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

        {/* Encouragement Box */}
        <div style={{
          backgroundColor: '#cae9ef',
          borderRadius: '16px',
          padding: '16px',
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: '24px'
        }}>
          <Image
            src="/icons/rate.svg"
            alt="Rate"
            width={24}
            height={24}
            style={{ marginRight: '8px', marginTop: '2px' }}
          />
          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#4c4c4c',
              marginBottom: '8px'
            }}>
              Remember:
            </h3>
            <p style={{
              fontSize: '14px',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#4c4c4c',
              margin: 0,
              lineHeight: '1.4'
            }}>
              There's no 'perfect' way to use Joidu. Trust your instincts, be gentle with yourself, and know that we're here to support you every step of the way. Small progress is still progress! 🌟
            </p>
          </div>
        </div>

        {/* Completion Celebration */}
        <div style={{
          backgroundColor: '#e6e1f4',
          borderRadius: '16px',
          padding: '16px',
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          <div style={{ marginBottom: '12px' }}>
            <Image
              src="/icons/start.svg"
              alt="Rocket"
              width={32}
              height={32}
              style={{ margin: '0 auto' }}
            />
          </div>
          <p style={{
            fontSize: '16px',
            fontWeight: 700,
            fontStyle: 'italic',
            color: '#2847ef',
            margin: 0,
            lineHeight: '1.4'
          }}>
            🎉 Welcome to your ADHD productivity journey! You're all set to activate your potential with tools designed specifically for how your brain works best.
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
          Complete Guide!
        </button>
      </div>
    </div>
  )
}