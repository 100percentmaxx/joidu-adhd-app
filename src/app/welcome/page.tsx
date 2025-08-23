'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Welcome from '@/components/loading/Welcome'

/**
 * WELCOME TEST PAGE
 * 
 * This page demonstrates the Welcome loading screen component.
 * It can be accessed at /welcome to test the first impression functionality.
 * 
 * In a real application, this component would be shown:
 * - On app first launch (new user)
 * - After major app updates
 * - When resetting/reinitializing the app
 * - Return users after extended absence
 */
export default function WelcomePage() {
  const router = useRouter()

  const handleInitializationComplete = () => {
    // In real app, this would navigate to home or onboarding
    console.log('Welcome initialization completed!')
    router.push('/')
  }

  const handleExit = () => {
    // In real app, this would exit the app or return to previous state
    console.log('User exited during welcome!')
    router.back()
  }

  return (
    <Welcome
      onInitializationComplete={handleInitializationComplete}
      onExit={handleExit}
      initializationDuration={2500} // 2.5 second demo
      showBackButton={true}
    />
  )
}