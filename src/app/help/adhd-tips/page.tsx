'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function ADHDTipsPage() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/settings/help')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--guide-adhd-tips)', padding: '20px' }}>
      {/* White Container */}
      <div style={{
        backgroundColor: 'var(--card-background)',
        borderRadius: '16px',
        border: '2px solid var(--border-color)',
        padding: '20px',
        marginBottom: '24px'
      }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ marginBottom: '32px' }}>
            <Image
              src="/icons/brain.svg"
              alt="Brain"
              width={80}
              height={80}
              style={{ 
                margin: '0 auto',
                animation: 'gentle-pulse 2s ease-in-out infinite'
              }}
            />
          </div>
          
          <h1 style={{
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: 0,
            marginBottom: '24px'
          }}>
            ADHD-Specific Tips & Strategies
          </h1>
          
          <p style={{
            fontSize: '16px',
            fontWeight: 400,
            color: 'var(--text-secondary)',
            margin: 0,
            marginBottom: '32px'
          }}>
            Evidence-based strategies designed specifically for ADHD brains
          </p>
        </div>

        {/* Coming Soon Box */}
        <div style={{
          backgroundColor: 'var(--card-background)',
          borderRadius: '16px',
          border: '2px solid var(--border-color)',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <Image
              src="/icons/maintenance.svg"
              alt="Maintenance"
              width={24}
              height={24}
              style={{ margin: '0 auto' }}
            />
          </div>
          
          <h2 style={{
            fontSize: '24px',
            fontWeight: 700,
            color: 'var(--primary-orange)',
            margin: 0,
            marginBottom: '16px'
          }}>
            Coming Soon!
          </h2>
          
          <p style={{
            fontSize: '16px',
            fontWeight: 400,
            color: 'var(--text-primary)',
            margin: 0,
            marginBottom: '20px',
            lineHeight: '1.4'
          }}>
            We're carefully curating the most helpful, evidence-based ADHD strategies and tips specifically for your unique brain. This section will include:
          </p>

          {/* Preview List */}
          <ul style={{
            fontSize: '14px',
            color: 'var(--text-primary)',
            paddingLeft: '16px',
            lineHeight: '1.6',
            margin: 0,
            marginBottom: '32px',
            listStyle: 'none',
            textAlign: 'left'
          }}>
            <li style={{ marginBottom: '4px' }}>
              • Executive Function Support - Practical strategies for planning, organizing, and time management
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Emotional Regulation - Tools for managing ADHD-related emotions and overwhelm
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Focus & Attention - Techniques to work with your brain's natural attention patterns
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Daily Life Hacks - Simple tricks that make everyday tasks easier
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Workplace Strategies - Professional tips for ADHD success at work
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Relationship Tips - Communication strategies for personal and professional relationships
            </li>
          </ul>
        </div>

        {/* Encouragement Box */}
        <div style={{
          backgroundColor: 'var(--success-light)',
          borderRadius: '16px',
          padding: '16px',
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: '24px'
        }}>
          <Image
            src="/icons/celebrate.svg"
            alt="Celebrate"
            width={24}
            height={24}
            style={{ marginRight: '8px', marginTop: '2px' }}
          />
          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '8px'
            }}>
              💡 In the meantime:
            </h3>
            <p style={{
              fontSize: '14px',
              fontWeight: 400,
              color: 'var(--text-primary)',
              margin: 0,
              lineHeight: '1.4'
            }}>
              Explore the Getting Started Guide and Understanding Kai AI to learn how Joidu works with your ADHD brain. Every feature is designed with neurodivergent minds in mind!
            </p>
          </div>
        </div>

        {/* Stay Updated Box */}
        <div style={{
          backgroundColor: 'var(--guide-kai-ai)',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '8px'
          }}>
            📬 Want to know when it's ready?
          </h3>
          <p style={{
            fontSize: '14px',
            fontWeight: 400,
            color: 'var(--text-primary)',
            margin: 0,
            lineHeight: '1.4'
          }}>
            This section is in active development. Check back soon or follow our updates for the latest ADHD productivity strategies!
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
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
          ← Back to Help
        </button>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes gentle-pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  )
}