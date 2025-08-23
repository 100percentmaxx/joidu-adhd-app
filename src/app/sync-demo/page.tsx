'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import SyncingData from '@/components/loading/SyncingData'
import { simulateSync, SyncScenarios } from '@/utils/syncUtils'

/**
 * SYNC DEMO PAGE
 * 
 * This page demonstrates different sync scenarios using the SyncingData component.
 * It shows how the component can be used for various sync operations with different
 * durations and messaging.
 * 
 * Access this page at /sync-demo to test different sync scenarios.
 */

type SyncScenario = keyof typeof SyncScenarios

export default function SyncDemoPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [currentScenario, setCurrentScenario] = useState<SyncScenario | null>(null)

  const handleStartSync = async (scenario: SyncScenario) => {
    setCurrentScenario(scenario)
    setIsLoading(true)
    
    const config = SyncScenarios[scenario]
    
    try {
      await simulateSync(
        scenario.toLowerCase(), 
        config.message, 
        config.duration
      )
    } catch (error) {
      console.error('Sync failed:', error)
    }
  }

  const handleSyncComplete = () => {
    setIsLoading(false)
    setCurrentScenario(null)
    console.log(`${currentScenario} sync completed!`)
  }

  const handleSyncCancel = () => {
    setIsLoading(false)
    setCurrentScenario(null)
    console.log(`${currentScenario} sync cancelled!`)
  }

  if (isLoading && currentScenario) {
    const config = SyncScenarios[currentScenario]
    return (
      <SyncingData
        onSyncComplete={handleSyncComplete}
        onCancel={handleSyncCancel}
        syncDuration={config.duration}
      />
    )
  }

  return (
    <div style={{ 
      backgroundColor: 'var(--background)', 
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h1 style={{ 
          color: 'var(--primary-blue)', 
          fontSize: '28px', 
          fontWeight: 700,
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          Sync Demo
        </h1>
        
        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '16px',
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          Test different sync scenarios with the SyncingData loading screen:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {(Object.keys(SyncScenarios) as SyncScenario[]).map((scenario) => {
            const config = SyncScenarios[scenario]
            const displayName = scenario.replace('_', ' ').toLowerCase()
              .replace(/\b\w/g, l => l.toUpperCase())
            
            return (
              <button
                key={scenario}
                onClick={() => handleStartSync(scenario)}
                style={{
                  padding: '16px',
                  backgroundColor: '#ffffff',
                  border: '2px solid var(--border-color)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary-blue)'
                  e.currentTarget.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <div style={{ 
                  fontSize: '17px', 
                  fontWeight: 600, 
                  color: 'var(--text-primary)',
                  marginBottom: '4px'
                }}>
                  {displayName}
                </div>
                <div style={{ 
                  fontSize: '14px', 
                  color: 'var(--text-secondary)'
                }}>
                  {config.message} ({config.duration/1000}s)
                </div>
              </button>
            )
          })}
        </div>

        <div style={{ 
          marginTop: '48px', 
          padding: '16px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 600, 
            color: 'var(--text-primary)',
            marginBottom: '8px'
          }}>
            Features Demonstrated:
          </h3>
          <ul style={{ 
            fontSize: '14px', 
            color: 'var(--text-secondary)',
            paddingLeft: '20px',
            lineHeight: '1.6'
          }}>
            <li>Rotating sync icon animation</li>
            <li>Smooth progress bar animation</li>
            <li>Auto-dismiss when complete</li>
            <li>Cancel functionality with back arrow</li>
            <li>ADHD-friendly messaging and timing</li>
            <li>Accessibility features with ARIA labels</li>
          </ul>
        </div>

        <button
          onClick={() => router.push('/')}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: 'var(--primary-blue)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            marginTop: '24px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}