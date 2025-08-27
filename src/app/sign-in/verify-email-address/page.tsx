'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

/**
 * SIGN-IN EMAIL VERIFICATION PAGE
 * 
 * This page handles email verification during the sign-in process.
 * Some users may need to verify their email even when signing in.
 * 
 * FLOW:
 * 1. User tries to sign in -> redirected here if email needs verification
 * 2. User verifies email via link
 * 3. Auto-redirects to main app once verified
 */

export default function SignInVerifyPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    if (isLoaded && user) {
      // Check if user is fully verified
      const emailVerified = user.emailAddresses[0]?.verification?.status === 'verified'
      
      if (emailVerified) {
        console.log('✅ User verified during sign-in, redirecting to app...')
        setIsVerified(true)
        setTimeout(() => {
          router.push('/')
        }, 1500)
      }
    }
  }, [isLoaded, user, router])

  // Periodically check verification status during sign-in
  useEffect(() => {
    if (!isLoaded || !user || isVerified) return

    const checkInterval = setInterval(() => {
      console.log('🔍 Checking sign-in verification status...')
      
      const emailVerified = user.emailAddresses[0]?.verification?.status === 'verified'
      
      if (emailVerified) {
        setIsVerified(true)
        setTimeout(() => {
          router.push('/')
        }, 1500)
        clearInterval(checkInterval)
      }
    }, 3000) // Check every 3 seconds

    return () => clearInterval(checkInterval)
  }, [isLoaded, user, router, isVerified])

  const handleResendEmail = async () => {
    try {
      console.log('📧 Resending sign-in verification email...')
      await user?.emailAddresses[0]?.prepareVerification({ strategy: 'email_code' })
      alert('Verification email sent! Please check your inbox.')
    } catch (error) {
      console.error('❌ Failed to resend sign-in email:', error)
      alert('Failed to resend email. Please try again.')
    }
  }

  const handleBackToSignIn = () => {
    router.push('/sign-in')
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

  if (isVerified) {
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
              Welcome Back! 🎉
            </h1>
          </div>
          
          <p className="text-gray-600 mb-6">
            Email verified! Taking you to your dashboard...
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
            Almost There! ✨
          </h1>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Please verify your email to continue to Joidu:
          </p>
          <p className="font-medium text-gray-800 bg-gray-50 p-3 rounded-lg">
            {user?.emailAddresses[0]?.emailAddress}
          </p>
        </div>
        
        <p className="text-gray-600 mb-6">
          We've sent a verification link to your email. Click the link to sign in.
        </p>
        
        <div className="border-t pt-6 space-y-3">
          <p className="text-sm text-gray-500">
            Need help?
          </p>
          
          <div className="flex flex-col gap-2">
            <button 
              onClick={handleResendEmail}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Resend verification email
            </button>
            
            <button 
              onClick={handleBackToSignIn}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              Back to Sign In
            </button>
          </div>
        </div>
        
        <div className="mt-6 text-xs text-gray-400">
          <p>Check your spam folder if you don't see the email!</p>
        </div>
      </div>
    </div>
  )
}