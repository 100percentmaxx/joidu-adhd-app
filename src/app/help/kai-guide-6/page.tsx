'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function KaiGuide6Page() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/help/kai-guide-5')
  }

  const handleNext = () => {
    router.push('/help/kai-guide-7')
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
            src="/icons/alert.svg"
            alt="Alert"
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
            What Kai Can't Do (And That's OK) 💭
          </h1>
        </div>

        {/* Kai is NOT Section */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '12px'
          }}>
            Kai is NOT:
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
              • A replacement for therapy or professional mental health support
            </li>
            <li style={{ marginBottom: '4px' }}>
              • A medical advisor - always consult healthcare providers for ADHD medication questions
            </li>
            <li style={{ marginBottom: '4px' }}>
              • A miracle cure - ADHD management takes time and patience
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Perfect - Kai is learning and improving, just like you
            </li>
          </ul>
        </div>

        {/* When to Seek Other Support Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '12px'
          }}>
            When to Seek Other Support:
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
              • Crisis situations - Reach out to mental health professionals
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Medication questions - Talk to your doctor or psychiatrist
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Relationship issues - Consider couples or family therapy
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Major life decisions - Kai can help organize thoughts, but big choices need human wisdom
            </li>
          </ul>
        </div>

        {/* Support Resources Box */}
        <div style={{
          backgroundColor: 'var(--warning-light)',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '12px'
          }}>
            Additional ADHD Resources:
          </h3>
          <ul style={{
            fontSize: '14px',
            color: 'var(--text-primary)',
            paddingLeft: '16px',
            lineHeight: '1.6',
            margin: 0,
            marginBottom: '12px',
            listStyle: 'none'
          }}>
            <li style={{ marginBottom: '4px' }}>
              • ADHD organizations and support groups
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Crisis hotlines and mental health resources
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Therapy directories and professional support
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Medication management with healthcare providers
            </li>
          </ul>
          <p style={{
            fontSize: '14px',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'var(--text-primary)',
            margin: 0,
            textAlign: 'center',
            lineHeight: '1.4'
          }}>
            Kai works best alongside professional support, not instead of it
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