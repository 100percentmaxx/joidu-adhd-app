'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function GettingStarted4Page() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/help/getting-started-3')
  }

  const handleNext = () => {
    router.push('/help/getting-started-5')
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
            src="/icons/Just_One_Thing.svg"
            alt="Just One Thing"
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
            Your Overwhelm Rescue System ⚡
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
          The orange lightning button is Joidu's signature feature. It's like having a gentle friend who notices when you're stuck and offers help.
        </p>

        {/* When to Use Section */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '12px'
          }}>
            When to use it:
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
              • You're staring at your task list feeling paralyzed
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Everything feels too big and overwhelming
            </li>
            <li style={{ marginBottom: '4px' }}>
              • You want to do something but can't pick what
            </li>
            <li style={{ marginBottom: '4px' }}>
              • You need a gentle nudge to get moving
            </li>
          </ul>
        </div>

        {/* What Happens Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '12px'
          }}>
            What happens when you tap it:
          </h2>
          <ol style={{
            fontSize: '14px',
            color: '#4c4c4c',
            paddingLeft: '16px',
            lineHeight: '1.6',
            margin: 0
          }}>
            <li style={{ marginBottom: '4px' }}>
              Kai gives you an empathetic message (no judgment!)
            </li>
            <li style={{ marginBottom: '4px' }}>
              You get one simple, manageable task suggestion
            </li>
            <li style={{ marginBottom: '4px' }}>
              You can accept it, try something else, or chat with Kai
            </li>
            <li style={{ marginBottom: '4px' }}>
              No pressure - you can always skip and try later
            </li>
          </ol>
        </div>

        {/* Try It Demo Box */}
        <div style={{
          backgroundColor: '#f9dac5',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          <div style={{ 
            marginBottom: '8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Image
                src="/icons/Just_One_Thing.svg"
                alt="Just One Thing"
                width={24}
                height={24}
              />
            </div>
          </div>
          
          <h3 style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#fa772c',
            marginBottom: '18px'
          }}>
            Try the Orange Button!
          </h3>

          <button
            disabled
            style={{
              backgroundColor: '#fa772c',
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
            Try Just-One-Thing
          </button>

          <p style={{
            fontSize: '14px',
            fontWeight: 400,
            color: '#4c4c4c',
            margin: 0,
            lineHeight: '1.4'
          }}>
            Demo: Experience the gentle intervention system
          </p>
        </div>

        {/* Secret Sauce Box */}
        <div style={{
          backgroundColor: '#cae9ef',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '16px'
          }}>
            🤫 The secret sauce:
          </h3>
          <p style={{
            fontSize: '14px',
            fontWeight: 400,
            color: '#4c4c4c',
            margin: 0,
            lineHeight: '1.4'
          }}>
            We pick tasks based on your energy, time of day, and what's actually doable right now. No impossible suggestions!
          </p>
        </div>

        {/* Reassurance Box */}
        <div style={{
          backgroundColor: '#ddede3',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '16px'
          }}>
            🤗 Remember:
          </h3>
          <p style={{
            fontSize: '14px',
            fontWeight: 400,
            color: '#4c4c4c',
            margin: 0,
            lineHeight: '1.4'
          }}>
            There's no such thing as "failing" at using the orange button. If a suggestion doesn't feel right, just try something else. We're here to support you, not add pressure.
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