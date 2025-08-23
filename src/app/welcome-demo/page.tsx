'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Welcome from '@/components/loading/Welcome'

/**
 * WELCOME DEMO PAGE
 * 
 * This page demonstrates different welcome scenarios using the Welcome component.
 * It shows how the component can be used for various app initialization situations
 * with different configurations and messaging approaches.
 * 
 * Access this page at /welcome-demo to test different scenarios.
 */

interface WelcomeScenario {
  name: string
  duration: number
  showBackButton: boolean
  description: string
  useCase: string
}

const welcomeScenarios: WelcomeScenario[] = [
  {
    name: "First Launch",
    duration: 3000,
    showBackButton: false,
    description: "New user's first experience with Joidu",
    useCase: "Brand new users seeing the app for the first time"
  },
  {
    name: "Return User",
    duration: 2000,
    showBackButton: true,
    description: "Returning user after app update or extended absence",
    useCase: "Users coming back after updates or time away"
  },
  {
    name: "Quick Startup",
    duration: 1500,
    showBackButton: true,
    description: "Fast initialization for regular daily use",
    useCase: "Daily app launches for existing users"
  },
  {
    name: "Full Reset",
    duration: 4000,
    showBackButton: true,
    description: "Complete app reinitialization after reset",
    useCase: "After clearing data or major configuration changes"
  }
]

export default function WelcomeDemoPage() {
  const router = useRouter()
  const [isShowingWelcome, setIsShowingWelcome] = useState(false)
  const [currentScenario, setCurrentScenario] = useState<WelcomeScenario | null>(null)

  const handleStartWelcome = (scenario: WelcomeScenario) => {
    setCurrentScenario(scenario)
    setIsShowingWelcome(true)
  }

  const handleWelcomeComplete = () => {
    setIsShowingWelcome(false)
    const scenarioName = currentScenario?.name || 'Unknown'
    setCurrentScenario(null)
    
    // Show completion message
    alert(`✨ Welcome Complete!\n\nScenario: "${scenarioName}"\n\nJoidu is ready for productivity and calm!`)
  }

  const handleWelcomeExit = () => {
    setIsShowingWelcome(false)
    const scenarioName = currentScenario?.name || 'Unknown'
    setCurrentScenario(null)
    console.log(`User exited during: ${scenarioName}`)
  }

  if (isShowingWelcome && currentScenario) {
    return (
      <Welcome
        initializationDuration={currentScenario.duration}
        showBackButton={currentScenario.showBackButton}
        onInitializationComplete={handleWelcomeComplete}
        onExit={handleWelcomeExit}
      />
    )
  }

  return (
    <div style={{ 
      backgroundColor: 'var(--background)', 
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h1 style={{ 
          color: 'var(--primary-blue)', 
          fontSize: '28px', 
          fontWeight: 700,
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          Welcome Screen Demo
        </h1>
        
        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '16px',
          marginBottom: '32px',
          textAlign: 'center',
          lineHeight: '1.5'
        }}>
          Experience different welcome scenarios that create the first impression for Joidu users:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {welcomeScenarios.map((scenario, index) => {
            const isFirstLaunch = scenario.name === 'First Launch'
            
            return (
              <div
                key={index}
                style={{
                  padding: '20px',
                  backgroundColor: isFirstLaunch ? '#e6f3ff' : '#ffffff',
                  border: `2px solid ${isFirstLaunch ? 'var(--primary-blue)' : 'var(--border-color)'}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                onClick={() => handleStartWelcome(scenario)}
                onMouseEnter={(e) => {
                  if (!isFirstLaunch) {
                    e.currentTarget.style.borderColor = 'var(--primary-blue)'
                  }
                  e.currentTarget.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={(e) => {
                  if (!isFirstLaunch) {
                    e.currentTarget.style.borderColor = 'var(--border-color)'
                  }
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                {/* Priority Badge for First Launch */}
                {isFirstLaunch && (
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    padding: '4px 8px',
                    backgroundColor: 'var(--primary-blue)',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 600,
                    borderRadius: '12px'
                  }}>
                    CRITICAL
                  </div>
                )}
                
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: 600, 
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                  paddingRight: isFirstLaunch ? '80px' : '0'
                }}>
                  {scenario.name}
                </div>
                
                <div style={{ 
                  fontSize: '15px', 
                  color: 'var(--text-secondary)',
                  marginBottom: '12px',
                  lineHeight: '1.4',
                  fontStyle: 'italic'
                }}>
                  "{scenario.description}"
                </div>
                
                <div style={{ 
                  fontSize: '14px', 
                  color: 'var(--text-tertiary)',
                  marginBottom: '16px',
                  lineHeight: '1.4'
                }}>
                  <strong>Use Case:</strong> {scenario.useCase}
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  fontSize: '13px',
                  color: 'var(--text-tertiary)'
                }}>
                  <span>⏱️ Duration: {scenario.duration/1000}s</span>
                  <span>{scenario.showBackButton ? '← Back Button' : '🚫 No Exit'}</span>
                  <span>🏠 Calm & Welcoming</span>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ 
          marginTop: '48px', 
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px'
        }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: 600, 
            color: 'var(--text-primary)',
            marginBottom: '12px'
          }}>
            Welcome Screen Design Philosophy:
          </h3>
          <ul style={{ 
            fontSize: '14px', 
            color: 'var(--text-secondary)',
            paddingLeft: '20px',
            lineHeight: '1.8',
            margin: 0
          }}>
            <li>🕊️ <strong>Calm First Impression:</strong> Gentle animations and soothing colors</li>
            <li>💙 <strong>ADHD-Friendly:</strong> No overwhelming progress bars or urgent messaging</li>
            <li>🏡 <strong>Welcoming Tone:</strong> "Getting your space ready" vs "Loading data"</li>
            <li>⏱️ <strong>Respectful Timing:</strong> Short duration to value user time</li>
            <li>🎯 <strong>Purpose-Driven:</strong> Sets expectations for calm productivity</li>
            <li>♿ <strong>Accessible:</strong> Screen reader friendly with clear status updates</li>
          </ul>
        </div>

        <div style={{ 
          marginTop: '24px', 
          padding: '16px',
          backgroundColor: '#fff3cd',
          borderRadius: '8px',
          border: '1px solid #ffeaa7'
        }}>
          <div style={{ 
            fontSize: '14px', 
            color: '#856404',
            fontWeight: 500
          }}>
            💡 <strong>First Launch is Critical:</strong> This is your only chance to make a great first impression. The welcome screen sets the tone for the entire Joidu experience.
          </div>
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
            marginTop: '32px',
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