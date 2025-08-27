'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

/**
 * EMAIL VERIFICATION PAGE FOR REGISTRATION
 * 
 * This page is shown after a user signs up and needs to verify their email.
 * Clerk redirects to this page during the email verification flow.
 * 
 * FLOW:
 * 1. User registers -> redirected here
 * 2. User checks email and clicks verification link
 * 3. Auto-redirects to onboarding once verified
 */

export default function VerifyEmailPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [checkingVerification, setCheckingVerification] = useState(false)

  useEffect(() => {
    if (isLoaded && user?.emailAddresses[0]?.verification?.status === 'verified') {
      console.log('✅ Email verified, redirecting to welcome...')
      // Redirect to welcome page after successful verification
      router.push('/onboarding/welcome')
    }
  }, [isLoaded, user, router])

  // Periodically check verification status
  useEffect(() => {
    if (!isLoaded || !user) return

    const checkInterval = setInterval(() => {
      console.log('🔍 Checking email verification status...')
      
      if (user?.emailAddresses[0]?.verification?.status === 'verified') {
        setCheckingVerification(true)
        setTimeout(() => {
          router.push('/onboarding/welcome')
        }, 1000)
        clearInterval(checkInterval)
      }
    }, 3000) // Check every 3 seconds

    return () => clearInterval(checkInterval)
  }, [isLoaded, user, router])

  const handleResendEmail = async () => {
    try {
      console.log('📧 Resending verification email...')
      await user?.emailAddresses[0]?.prepareVerification({ strategy: 'email_code' })
      alert('Verification email sent! Please check your inbox.')
    } catch (error) {
      console.error('❌ Failed to resend email:', error)
      alert('Failed to resend email. Please try again.')
    }
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (checkingVerification) {
    return (
      <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Email Verified! 🎉
            </h1>
          </div>
          
          <p className="text-gray-600 mb-6">
            Taking you to your welcome screen...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--primary-blue)' }}>
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-lg">
        <div className="mb-6">
          <img 
            src="/icons/joidu_drop_logo.svg" 
            alt="Joidu"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">
            Check Your Email 📧
          </h1>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            We've sent a verification link to:
          </p>
          <p className="font-medium text-gray-800 bg-gray-50 p-3 rounded-lg">
            {user?.emailAddresses[0]?.emailAddress}
          </p>
        </div>
        
        <p className="text-gray-600 mb-6">
          Please check your inbox and click the verification link to continue to Joidu.
        </p>
        
        <div className="border-t pt-6">
          <p className="text-sm text-gray-500 mb-3">
            Didn't receive an email?
          </p>
          <button 
            onClick={handleResendEmail}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Resend verification email
          </button>
        </div>
        
        <div className="mt-6 text-xs text-gray-400">
          <p>Make sure to check your spam folder!</p>
        </div>
      </div>
    </div>
  )
}