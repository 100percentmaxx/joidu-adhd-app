'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function KaiGuide5Page() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/help/kai-guide-4')
  }

  const handleNext = () => {
    router.push('/help/kai-guide-6')
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
            src="/icons/rate.svg"
            alt="Rate"
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
            Getting the Most from Kai
          </h1>
        </div>

        {/* Best Practices Section */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '12px'
          }}>
            Best Practices:
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
              • Be honest about your struggles - Kai can't help if you're not real
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Use specific language - "I'm overwhelmed" vs "I feel bad"
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Try the suggestions - Kai learns what works for you over time
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Give feedback - Tell Kai when something helps or doesn't
            </li>
          </ul>
        </div>

        {/* Conversation Starters Section */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '12px'
          }}>
            Conversation Starters:
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
              • "I'm stuck" - Gets immediate gentle intervention
            </li>
            <li style={{ marginBottom: '4px' }}>
              • "Help me plan..." - Starts collaborative planning session
            </li>
            <li style={{ marginBottom: '4px' }}>
              • "I'm feeling..." - Triggers emotional support mode
            </li>
            <li style={{ marginBottom: '4px' }}>
              • "Break this down:" - Activates task breakdown assistance
            </li>
          </ul>
        </div>

        {/* Making It Habit Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '12px'
          }}>
            Making It Habit:
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
              • Start small - Ask Kai one question a day
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Use voice input when typing feels like too much
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Try the 1 Thought feature for random ideas
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Check in during overwhelm instead of suffering alone
            </li>
          </ul>
        </div>

        {/* Success Stories Box */}
        <div style={{
          backgroundColor: 'var(--guide-adhd-tips)',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '12px'
          }}>
            <Image
              src="/icons/strong.svg"
              alt="Success"
              width={24}
              height={24}
              style={{ marginRight: '8px', marginTop: '2px' }}
            />
            <p style={{
              fontSize: '14px',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              margin: 0,
              lineHeight: '1.4'
            }}>
              "Kai helped me realize I was trying to do admin work when my brain wanted to be creative. Now I match my tasks to my energy and get so much more done!"
            </p>
          </div>
          <p style={{
            fontSize: '14px',
            fontWeight: 400,
            color: 'var(--text-primary)',
            margin: 0,
            textAlign: 'right'
          }}>
            - Sarah, ADHD community member
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