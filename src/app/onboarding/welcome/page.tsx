'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

/**
 * SIMPLE WELCOME PAGE FOR EMAIL VERIFICATION FLOW
 * 
 * This is a simplified onboarding welcome shown after email verification.
 * It provides a brief welcome before redirecting to the main app or full onboarding.
 */

export default function OnboardingWelcomePage() {
  const { user } = useUser()
  const router = useRouter()
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Check if user wants full onboarding or direct to app
          const skipOnboarding = localStorage.getItem('joidu_skip_full_onboarding')
          
          if (skipOnboarding === 'true') {
            router.push('/')
          } else {
            router.push('/onboarding')
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const handleSkipToApp = () => {
    localStorage.setItem('joidu_skip_full_onboarding', 'true')
    router.push('/')
  }

  const handleFullOnboarding = () => {
    localStorage.setItem('joidu_skip_full_onboarding', 'false')
    router.push('/onboarding')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--background)' }}>
      <div className="text-center max-w-md">
        <div className="mb-8">
          <img 
            src="/icons/joidu_drop_logo.svg" 
            alt="Joidu"
            className="w-20 h-20 mx-auto mb-6"
          />
          
          <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Welcome to Joidu{user?.firstName ? `, ${user.firstName}` : ''}! 🎉
          </h1>
          
          <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
            Your ADHD-friendly productivity companion is ready to help you focus, organize, and thrive.
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Ready to get started?
          </h2>
          
          <div className="space-y-3">
            <button
              onClick={handleFullOnboarding}
              className="w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 hover:scale-105"
              style={{ 
                backgroundColor: 'var(--primary-blue)', 
                color: 'white' 
              }}
            >
              Take the quick tour (2 minutes)
            </button>
            
            <button
              onClick={handleSkipToApp}
              className="w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 hover:scale-105"
              style={{ 
                backgroundColor: 'var(--button-secondary-bg)', 
                color: 'var(--text-primary)' 
              }}
            >
              Jump right in
            </button>
          </div>
        </div>
        
        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          <p>Auto-starting in {countdown} seconds...</p>
          <p className="mt-2 text-xs opacity-75">
            You can always access the tour later from Settings
          </p>
        </div>
      </div>
    </div>
  )
}