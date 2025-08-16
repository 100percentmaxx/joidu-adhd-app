'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function GettingStarted6Page() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/help/getting-started-5')
  }

  const handleNext = () => {
    router.push('/help/getting-started-7')
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
            src="/icons/focus.svg"
            alt="Focus"
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
            Hyperfocus vs. Healthy Focus 🎯
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
          Traditional timers can trigger ADHD anxiety. Joidu's Focus Timer is different - it works WITH your brain, not against it.
        </p>

        {/* ADHD-Friendly Features Section */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '12px'
          }}>
            What makes our timer ADHD-friendly:
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
              • Gentle preparation: "Just a moment... we're preparing everything"
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Clean interface: No distracting elements during focus
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Hyperfocus protection: Suggests breaks before you burn out
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Flexible timing: Adjust based on your energy and task
            </li>
          </ul>
        </div>

        {/* How to Use Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '12px'
          }}>
            How to use it:
          </h2>
          <ol style={{
            fontSize: '14px',
            color: '#4c4c4c',
            paddingLeft: '16px',
            lineHeight: '1.6',
            margin: 0
          }}>
            <li style={{ marginBottom: '4px' }}>
              Pick a task (or let the orange button suggest one)
            </li>
            <li style={{ marginBottom: '4px' }}>
              Choose your focus time (start with 15-25 minutes)
            </li>
            <li style={{ marginBottom: '4px' }}>
              Let Joidu prepare your session
            </li>
            <li style={{ marginBottom: '4px' }}>
              Focus with gentle background support
            </li>
            <li style={{ marginBottom: '4px' }}>
              Celebrate when you're done!
            </li>
          </ol>
        </div>

        {/* Try Focus Box */}
        <div style={{
          backgroundColor: '#ddede3',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          <div style={{ marginBottom: '8px' }}>
            <Image
              src="/icons/focus.svg"
              alt="Focus"
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
            Try a Focus Session
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
            Try Focus Timer
          </button>

          <p style={{
            fontSize: '14px',
            fontWeight: 400,
            color: '#4c4c4c',
            margin: 0,
            lineHeight: '1.4'
          }}>
            Experience the gentle, ADHD-friendly approach to focused work
          </p>
        </div>

        {/* Energy-Aware Tips Box */}
        <div style={{
          backgroundColor: '#fef7d6',
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
            ⚡ Energy-aware suggestions:
          </h3>
          <p style={{
            fontSize: '14px',
            fontWeight: 400,
            color: '#4c4c4c',
            margin: 0,
            lineHeight: '1.4'
          }}>
            Morning = admin tasks, afternoon = creative work, evening = light planning. We help you match tasks to your natural rhythms.
          </p>
        </div>

        {/* ADHD Insight Box */}
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
            marginBottom: '16px'
          }}>
            🧠 ADHD insight:
          </h3>
          <p style={{
            fontSize: '14px',
            fontWeight: 400,
            color: '#4c4c4c',
            margin: 0,
            lineHeight: '1.4'
          }}>
            Your brain craves novelty and stimulation. Our timer includes subtle progress animations and gentle sounds to keep you engaged without being distracting.
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