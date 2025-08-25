'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { useSignIn } from '@clerk/nextjs'

/**
 * SIGN-IN PAGE
 * 
 * Login page for existing Joidu users with the same branded design
 * as the registration screen. Maintains visual consistency while
 * providing a streamlined login experience for returning users.
 * 
 * ROUTE: /sign-in
 * 
 * USER FLOW:
 * 1. Existing user visits /sign-in
 * 2. Enters email and password
 * 3. Redirected to main app (/) after successful login
 * 4. Can switch to registration if they don't have an account
 */
export default function SignInPage() {
  const router = useRouter()
  const { isLoaded, signIn, setActive } = useSignIn()
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  // UI state
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'Please enter your email address'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Please enter your password'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isLoaded || !validateForm()) return

    setIsSubmitting(true)
    setErrors({})

    try {
      const result = await signIn.create({
        identifier: formData.email,
        password: formData.password
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.push('/') // Redirect to main app
      }
    } catch (err: any) {
      const errorMessage = err.errors?.[0]?.message || 'Invalid email or password'
      setErrors({ general: errorMessage })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{ backgroundColor: '#2847ef' }} className="min-h-screen flex flex-col">
      {/* Branded Banner */}
      <div className="w-full">
        <img 
          src="/icons/joidu_banner.svg" 
          alt="Joidu - Activate Your Potential"
          className="w-full h-auto"
        />
      </div>

      {/* Form Section */}
      <div className="flex-1 flex flex-col">
        <div 
          className="flex-1 px-5 py-8"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px 24px 0 0',
            marginTop: '-12px'
          }}
        >
          <div className="max-w-sm mx-auto w-full">
            <h1 
              className="text-2xl font-bold text-center mb-4"
              style={{ color: '#4c4c4c' }}
            >
              Welcome Back
            </h1>
            
            <p 
              className="text-center mb-8 leading-relaxed"
              style={{ color: '#a5a5a5', fontSize: '15px' }}
            >
              Sign in to continue your productivity journey
            </p>

            <form onSubmit={handleSubmit}>
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
                  <p className="mt-2 text-sm" style={{ color: '#f4b7ae' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="mb-6">
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
                    placeholder="Enter your password"
                    autoComplete="current-password"
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
                  <p className="mt-2 text-sm" style={{ color: '#f4b7ae' }}>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Sign In Button */}
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
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </button>

              {/* Register Link */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => router.push('/register')}
                  className="text-center transition-colors"
                  style={{ 
                    color: '#2847ef', 
                    fontSize: '15px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Don't have an account? Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}