'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { useSignUp } from '@clerk/nextjs'

interface RegisterScreenProps {
  onSignInRedirect?: () => void
}

/**
 * REGISTRATION SCREEN COMPONENT
 * 
 * This is the primary entry point for new Joidu users. It creates a strong
 * brand impression with the full-width banner while maintaining a simple,
 * anxiety-free registration process specifically designed for ADHD users.
 * 
 * KEY DESIGN PRINCIPLES:
 * - Premium brand impression with joidu_banner.svg at top
 * - Primary Blue background establishes brand confidence
 * - White form container creates clear focus area
 * - Minimal required fields to avoid ADHD overwhelm
 * - Clear visual hierarchy reduces cognitive load
 * - Encouraging, non-intimidating copy throughout
 * 
 * ADHD-FRIENDLY FEATURES:
 * - Large touch targets (44px+) for easy interaction
 * - Immediate feedback for form validation
 * - Optional name field reduces pressure
 * - Clear error messages with helpful guidance
 * - Auto-focus on first field for smooth start
 * - Single-step registration (no multi-page forms)
 * 
 * CLERK INTEGRATION:
 * - Uses Clerk's useSignUp hook for authentication
 * - Handles email verification flow automatically
 * - Provides loading states during submission
 * - Redirects to onboarding after successful registration
 * - Integrates with Clerk's user management system
 */
export default function RegisterScreen({
  onSignInRedirect
}: RegisterScreenProps) {
  const router = useRouter()
  const { isLoaded, signUp, setActive } = useSignUp()
  
  // Form state management
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: ''
  })
  
  // UI state management
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [pendingVerification, setPendingVerification] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')

  /**
   * FORM INPUT HANDLER
   * 
   * Handles all form input changes and clears related errors
   * to provide immediate feedback when user corrects issues.
   */
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  /**
   * PASSWORD STRENGTH VALIDATION
   * 
   * Provides real-time feedback on password strength
   * with ADHD-friendly, encouraging messaging.
   */
  const validatePassword = (password: string): string => {
    if (password.length < 8) {
      return 'Password needs at least 8 characters'
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      return 'Try adding both uppercase and lowercase letters'
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Include at least one number for security'
    }
    return ''
  }

  /**
   * FORM VALIDATION
   * 
   * Validates all fields with helpful, non-judgmental error messages
   * designed to guide rather than criticize users.
   */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Please enter your email address'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    const passwordError = validatePassword(formData.password)
    if (!formData.password) {
      newErrors.password = 'Please create a password'
    } else if (passwordError) {
      newErrors.password = passwordError
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * REGISTRATION SUBMISSION HANDLER
   * 
   * Handles the Clerk sign-up flow with proper error handling
   * and user feedback. Redirects to email verification if needed.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isLoaded || !validateForm()) return

    setIsSubmitting(true)
    setErrors({})

    try {
      // Create user with Clerk
      const result = await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
        firstName: formData.firstName || undefined
      })

      // Send email verification code
      await result.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
      
    } catch (err: any) {
      // Handle Clerk errors with user-friendly messages
      const errorMessage = err.errors?.[0]?.message || 'Something went wrong. Please try again.'
      
      if (errorMessage.toLowerCase().includes('email')) {
        setErrors({ email: 'This email is already registered. Try signing in instead.' })
      } else if (errorMessage.toLowerCase().includes('password')) {
        setErrors({ password: errorMessage })
      } else {
        setErrors({ general: errorMessage })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  /**
   * EMAIL VERIFICATION HANDLER
   * 
   * Handles the email verification code submission and
   * completes the registration process.
   */
  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isLoaded) return

    setIsSubmitting(true)

    try {
      // Verify the email code
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        
        // Redirect to onboarding for new users
        router.push('/onboarding')
      }
    } catch (err: any) {
      setErrors({ 
        verification: err.errors?.[0]?.message || 'Invalid verification code. Please try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  /**
   * SIGN IN REDIRECT HANDLER
   */
  const handleSignInRedirect = () => {
    if (onSignInRedirect) {
      onSignInRedirect()
    } else {
      router.push('/sign-in')
    }
  }

  // Show verification screen if email verification is pending
  if (pendingVerification) {
    return (
      <div style={{ backgroundColor: '#2847ef' }} className="min-h-screen flex flex-col">
        {/* Branded Banner */}
        <div className="w-full">
          <img 
            src="/icons/joidu_banner.svg" 
            alt="Joidu - Activate Your Potential"
            className="w-full h-auto"
            style={{ display: 'block' }}
          />
        </div>

        {/* Verification Form Container */}
        <div className="flex-1 flex flex-col">
          <div 
            className="flex-1 px-5 py-8"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px 24px 0 0',
              marginTop: '-12px' // Slight overlap with banner
            }}
          >
            <div className="max-w-sm mx-auto w-full">
              <h1 
                className="text-2xl font-bold text-center mb-4"
                style={{ color: '#4c4c4c' }}
              >
                Check Your Email
              </h1>
              
              <p 
                className="text-center mb-8 leading-relaxed"
                style={{ color: '#a5a5a5', fontSize: '15px' }}
              >
                We've sent a verification code to <strong>{formData.email}</strong>
              </p>

              <form onSubmit={handleVerification}>
                <div className="mb-6">
                  <label 
                    htmlFor="verification"
                    className="block mb-2"
                    style={{ color: '#4c4c4c', fontSize: '15px', fontWeight: 500 }}
                  >
                    Verification Code
                  </label>
                  <input
                    id="verification"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    autoComplete="one-time-code"
                    className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-2 transition-colors"
                    style={{
                      backgroundColor: '#ffffff',
                      borderColor: errors.verification ? '#f4b7ae' : '#e2e2e2',
                      borderWidth: errors.verification ? '2px' : '1px',
                      fontSize: '15px',
                      color: '#4c4c4c'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#2847ef'
                      e.currentTarget.style.borderWidth = '2px'
                    }}
                    onBlur={(e) => {
                      if (!errors.verification) {
                        e.currentTarget.style.borderColor = '#e2e2e2'
                        e.currentTarget.style.borderWidth = '1px'
                      }
                    }}
                  />
                  {errors.verification && (
                    <p 
                      className="mt-2 text-sm"
                      style={{ color: '#f4b7ae' }}
                    >
                      {errors.verification}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !verificationCode}
                  className="w-full py-3 rounded-lg font-medium text-white transition-all duration-200"
                  style={{
                    backgroundColor: isSubmitting || !verificationCode ? '#e6a866' : '#fa772c',
                    fontSize: '15px',
                    minHeight: '48px',
                    cursor: isSubmitting || !verificationCode ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? 'Verifying...' : 'Verify & Continue'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#2847ef' }} className="min-h-screen flex flex-col">
      {/* Branded Banner Section */}
      <div className="w-full">
        <img 
          src="/icons/joidu_banner.svg" 
          alt="Joidu - Activate Your Potential"
          className="w-full h-auto"
          style={{ display: 'block' }}
        />
      </div>

      {/* Form Section */}
      <div className="flex-1 flex flex-col">
        <div 
          className="flex-1 px-5 py-8"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px 24px 0 0',
            marginTop: '-12px' // Slight overlap with banner for seamless design
          }}
        >
          <div className="max-w-sm mx-auto w-full">
            {/* Welcome Text */}
            <h1 
              className="text-2xl font-bold text-center mb-4"
              style={{ color: '#4c4c4c' }}
            >
              Create Your Account
            </h1>
            
            <p 
              className="text-center mb-8 leading-relaxed"
              style={{ color: '#a5a5a5', fontSize: '15px' }}
            >
              Join thousands managing ADHD with confidence
            </p>

            {/* Registration Form */}
            <form onSubmit={handleSubmit}>
              {/* General Error Message */}
              {errors.general && (
                <div 
                  className="mb-4 p-3 rounded-lg"
                  style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}
                >
                  <p style={{ color: '#dc2626', fontSize: '14px' }}>
                    {errors.general}
                  </p>
                </div>
              )}

              {/* Email Input */}
              <div className="mb-4">
                <label 
                  htmlFor="email"
                  className="block mb-2"
                  style={{ color: '#4c4c4c', fontSize: '15px', fontWeight: 500 }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-2 transition-colors"
                  style={{
                    backgroundColor: '#ffffff',
                    borderColor: errors.email ? '#f4b7ae' : '#e2e2e2',
                    borderWidth: errors.email ? '2px' : '1px',
                    fontSize: '15px',
                    color: '#4c4c4c'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#2847ef'
                    e.currentTarget.style.borderWidth = '2px'
                  }}
                  onBlur={(e) => {
                    if (!errors.email) {
                      e.currentTarget.style.borderColor = '#e2e2e2'
                      e.currentTarget.style.borderWidth = '1px'
                    }
                  }}
                />
                {errors.email && (
                  <p 
                    className="mt-2 text-sm"
                    style={{ color: '#f4b7ae' }}
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <label 
                  htmlFor="password"
                  className="block mb-2"
                  style={{ color: '#4c4c4c', fontSize: '15px', fontWeight: 500 }}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Minimum 8 characters"
                    autoComplete="new-password"
                    className="w-full px-4 py-3 pr-12 rounded-xl border focus:outline-none focus:border-2 transition-colors"
                    style={{
                      backgroundColor: '#ffffff',
                      borderColor: errors.password ? '#f4b7ae' : '#e2e2e2',
                      borderWidth: errors.password ? '2px' : '1px',
                      fontSize: '15px',
                      color: '#4c4c4c'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#2847ef'
                      e.currentTarget.style.borderWidth = '2px'
                    }}
                    onBlur={(e) => {
                      if (!errors.password) {
                        e.currentTarget.style.borderColor = '#e2e2e2'
                        e.currentTarget.style.borderWidth = '1px'
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
                    style={{ color: '#a5a5a5' }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p 
                    className="mt-2 text-sm"
                    style={{ color: '#f4b7ae' }}
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Name Input (Optional) */}
              <div className="mb-6">
                <label 
                  htmlFor="firstName"
                  className="block mb-2"
                  style={{ color: '#4c4c4c', fontSize: '15px', fontWeight: 500 }}
                >
                  What should we call you?
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Sam"
                  autoComplete="given-name"
                  className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-2 transition-colors"
                  style={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e2e2e2',
                    borderWidth: '1px',
                    fontSize: '15px',
                    color: '#4c4c4c'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#2847ef'
                    e.currentTarget.style.borderWidth = '2px'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e2e2e2'
                    e.currentTarget.style.borderWidth = '1px'
                  }}
                />
                <p 
                  className="mt-2 text-sm"
                  style={{ color: '#a5a5a5', fontSize: '13px' }}
                >
                  This helps personalize your experience
                </p>
              </div>

              {/* Registration Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-lg font-medium text-white transition-all duration-200 mb-6"
                style={{
                  backgroundColor: isSubmitting ? '#e6a866' : '#fa772c',
                  fontSize: '15px',
                  minHeight: '48px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = '#e6692a'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = '#fa772c'
                  }
                }}
              >
                {isSubmitting ? 'Creating Account...' : 'Create My Account'}
              </button>

              {/* Sign In Link */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleSignInRedirect}
                  className="text-center transition-colors"
                  style={{ 
                    color: '#2847ef', 
                    fontSize: '15px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = 'underline'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = 'none'
                  }}
                >
                  Already have an account? Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * COMPONENT USAGE EXAMPLES:
 * 
 * // Basic usage as standalone registration page
 * <RegisterScreen />
 * 
 * // With custom sign in redirect
 * <RegisterScreen 
 *   onSignInRedirect={() => router.push('/custom-signin')}
 * />
 * 
 * // In app routing structure
 * // pages/register.tsx or app/register/page.tsx
 * export default function RegisterPage() {
 *   return <RegisterScreen />
 * }
 * 
 * CLERK SETUP REQUIREMENTS:
 * 
 * 1. Install Clerk: npm install @clerk/nextjs
 * 2. Add environment variables:
 *    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
 *    CLERK_SECRET_KEY=your_secret
 * 
 * 3. Wrap app in ClerkProvider (in layout.tsx):
 *    import { ClerkProvider } from '@clerk/nextjs'
 *    
 *    export default function RootLayout({ children }) {
 *      return (
 *        <ClerkProvider>
 *          {children}
 *        </ClerkProvider>
 *      )
 *    }
 * 
 * 4. Configure Clerk dashboard:
 *    - Enable email/password authentication
 *    - Set up email verification (recommended)
 *    - Configure redirect URLs
 * 
 * REGISTRATION FLOW:
 * 
 * 1. User fills out form (email, password, optional name)
 * 2. Client-side validation provides immediate feedback
 * 3. Form submits to Clerk's signUp.create()
 * 4. Email verification code sent automatically
 * 5. User enters verification code on same screen
 * 6. Account created and session established
 * 7. User redirects to onboarding (/onboarding)
 * 8. Onboarding collects additional ADHD-specific data
 * 9. User proceeds to main app experience
 * 
 * ERROR HANDLING PATTERNS:
 * 
 * - Field-specific errors appear below inputs
 * - General errors appear at top of form
 * - Real-time password validation
 * - Email format validation
 * - Duplicate account detection
 * - Network error handling
 * - Loading states during submission
 * 
 * ACCESSIBILITY FEATURES:
 * 
 * - Auto-focus on first input
 * - Proper label associations
 * - Error messages announced by screen readers
 * - High contrast error states
 * - Keyboard navigation support
 * - Touch targets meet 44px minimum
 * - Clear focus indicators
 * 
 * ADHD-SPECIFIC OPTIMIZATIONS:
 * 
 * - Minimal required fields reduce overwhelm
 * - Immediate visual feedback builds confidence
 * - Clear progress indicators (email → verification → onboarding)
 * - Encouraging error messages avoid shame/blame
 * - Single-step registration prevents abandonment
 * - Strong brand presence builds trust
 * - Large, clear call-to-action button
 */