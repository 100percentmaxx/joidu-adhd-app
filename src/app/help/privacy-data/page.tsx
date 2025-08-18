'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function PrivacyDataPage() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/settings/help')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--guide-privacy)', padding: '20px' }}>
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
              src="/icons/privacy.svg"
              alt="Privacy"
              width={80}
              height={80}
              style={{ 
                margin: '0 auto',
                animation: 'shield-pulse 2s ease-in-out infinite'
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
            Privacy & Data Protection
          </h1>
          
          <p style={{
            fontSize: '16px',
            fontWeight: 400,
            color: 'var(--text-secondary)',
            margin: 0,
            marginBottom: '32px'
          }}>
            Your data, your control - built with privacy as the foundation
          </p>
        </div>

        {/* Privacy First Box */}
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
              src="/icons/shield.svg"
              alt="Shield"
              width={24}
              height={24}
              style={{ margin: '0 auto' }}
            />
          </div>
          
          <h2 style={{
            fontSize: '24px',
            fontWeight: 700,
            color: 'var(--primary-blue)',
            margin: 0,
            marginBottom: '16px'
          }}>
            Privacy by Design
          </h2>
          
          <p style={{
            fontSize: '16px',
            fontWeight: 400,
            color: 'var(--text-primary)',
            margin: 0,
            marginBottom: '20px',
            lineHeight: '1.4'
          }}>
            Joidu is built with your privacy as the absolute priority. We believe your ADHD journey and personal productivity data should stay completely under your control.
          </p>

          {/* What's Covered Preview */}
          <div style={{ textAlign: 'left' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '12px'
            }}>
              This comprehensive guide will cover:
            </h3>
            
            <ul style={{
              fontSize: '14px',
              color: 'var(--text-primary)',
              paddingLeft: '16px',
              lineHeight: '1.6',
              margin: 0,
              marginBottom: '32px',
              listStyle: 'none'
            }}>
              <li style={{ marginBottom: '4px' }}>
                • Local-First Approach - How your data stays on your device by default
              </li>
              <li style={{ marginBottom: '4px' }}>
                • Optional Cloud Sync - Secure, encrypted sync when you choose it
              </li>
              <li style={{ marginBottom: '4px' }}>
                • AI Privacy - How Kai learns locally without sending data anywhere
              </li>
              <li style={{ marginBottom: '4px' }}>
                • Data Portability - Easy export in multiple formats you own
              </li>
              <li style={{ marginBottom: '4px' }}>
                • Transparency Reports - Exactly what data we collect (spoiler: very little!)
              </li>
              <li style={{ marginBottom: '4px' }}>
                • Your Rights - Complete control over your information
              </li>
            </ul>
          </div>
        </div>

        {/* Current Protection Box */}
        <div style={{
          backgroundColor: 'var(--guide-kai-ai)',
          borderRadius: '16px',
          padding: '16px',
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: '24px'
        }}>
          <Image
            src="/icons/strong.svg"
            alt="Strong"
            width={24}
            height={24}
            style={{ marginRight: '8px', marginTop: '2px' }}
          />
          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '16px'
            }}>
              🛡️ Already Protected:
            </h3>
            <p style={{
              fontSize: '14px',
              fontWeight: 400,
              color: 'var(--text-primary)',
              margin: 0,
              lineHeight: '1.4'
            }}>
              Even while this guide is in development, Joidu already operates with privacy-first principles. Your data is safe, local, and under your control right now!
            </p>
          </div>
        </div>

        {/* Quick Privacy Facts Box */}
        <div style={{
          backgroundColor: 'var(--warning-light)',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '12px'
          }}>
            ⚡ Quick Privacy Facts:
          </h3>
          <ul style={{
            fontSize: '14px',
            color: 'var(--text-primary)',
            paddingLeft: '16px',
            lineHeight: '1.6',
            margin: 0,
            listStyle: 'none'
          }}>
            <li style={{ marginBottom: '4px' }}>
              • All data stored locally on your device by default
            </li>
            <li style={{ marginBottom: '4px' }}>
              • No tracking or analytics without explicit permission
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Kai AI processes everything on-device
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Cloud sync is optional and encrypted end-to-end
            </li>
          </ul>
        </div>

        {/* Development Note Box */}
        <div style={{
          backgroundColor: 'var(--guide-getting-started)',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '16px'
          }}>
            📝 In Development:
          </h3>
          <p style={{
            fontSize: '14px',
            fontWeight: 400,
            color: 'var(--text-primary)',
            margin: 0,
            lineHeight: '1.4'
          }}>
            We're preparing detailed documentation about our privacy practices, data handling, and your rights. Transparency matters, especially for neurodivergent users who value trust and control.
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
        @keyframes shield-pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.08);
          }
        }
      `}</style>
    </div>
  )
}