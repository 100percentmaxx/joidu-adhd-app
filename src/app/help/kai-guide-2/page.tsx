'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function KaiGuide2Page() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/help/kai-guide')
  }

  const handleNext = () => {
    router.push('/help/kai-guide-3')
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
            src="/icons/privacy.svg"
            alt="Privacy"
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
            Your Privacy Comes First
          </h1>
        </div>

        {/* Main Content Text */}
        <p style={{
          fontSize: '16px',
          fontWeight: 400,
          color: '#4c4c4c',
          marginBottom: '20px',
          lineHeight: '1.4'
        }}>
          Here's how Kai gets smarter while keeping your data completely private:
        </p>

        {/* On-Device Learning Section */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '12px'
          }}>
            On-Device Learning:
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
              • All learning happens on YOUR device only
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Nothing gets sent to external servers
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Your patterns stay with you
            </li>
            <li style={{ marginBottom: '4px' }}>
              • You control what Kai remembers
            </li>
          </ul>
        </div>

        {/* What Kai Learns Section */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '12px'
          }}>
            What Kai learns about:
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
              • Task patterns: What types of tasks you struggle with
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Energy cycles: When you're most productive
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Communication preferences: Whether you like gentle or direct feedback
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Overwhelm triggers: What situations make you feel stuck
            </li>
          </ul>
        </div>

        {/* What Kai Never Learns Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '12px'
          }}>
            What Kai never learns:
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
              • Personal details from your conversations
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Sensitive information about your life
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Anything you mark as private
            </li>
          </ul>
        </div>

        {/* Privacy Reassurance Box */}
        <div style={{
          backgroundColor: 'var(--card-background)',
          border: '2px solid var(--success-light)',
          borderRadius: '16px',
          padding: '16px',
          display: 'flex',
          alignItems: 'flex-start'
        }}>
          <Image
            src="/icons/privacy.svg"
            alt="Privacy"
            width={24}
            height={24}
            style={{ marginRight: '8px', marginTop: '2px' }}
          />
          <p style={{
            fontSize: '14px',
            fontWeight: 400,
            color: 'var(--text-primary)',
            margin: 0,
            lineHeight: '1.4'
          }}>
            Your ADHD patterns and personal information never leave your device. Kai learns locally to help you better.
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