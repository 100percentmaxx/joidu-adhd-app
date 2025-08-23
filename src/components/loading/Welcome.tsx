'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

interface WelcomeProps {
  onInitializationComplete?: () => void
  onExit?: () => void
  initializationDuration?: number // Duration in milliseconds for app setup
  showBackButton?: boolean // Option to hide back button on first launch
}

/**
 * WELCOME LOADING SCREEN COMPONENT
 * 
 * This is the primary app initialization loading screen that appears when users
 * first launch Joidu or during major app updates. It creates a warm, welcoming
 * first impression that sets the tone for the calm, ADHD-friendly productivity
 * experience that Joidu provides.
 * 
 * KEY DESIGN PRINCIPLES:
 * - Calm and welcoming, not urgent or stressful
 * - Clean, minimal design without busy progress indicators
 * - Gentle, soothing animations that don't overwhelm
 * - Messaging focuses on creating a peaceful workspace, not just "loading"
 * - Sets expectation of calm productivity and organization
 * 
 * FIRST IMPRESSION GOALS:
 * - Reduce anxiety about using a new productivity app
 * - Communicate that Joidu understands ADHD needs
 * - Establish trust through professional, calming design
 * - Create anticipation for the organized, peaceful experience ahead
 * - Show that the app is preparing a personalized space for them
 * 
 * USAGE SCENARIOS:
 * - App first launch (new user experience)
 * - Major app updates with significant changes
 * - App reset or fresh start scenarios
 * - Return users after extended absence
 * - Database/profile initialization
 */
export default function Welcome({
  onInitializationComplete,
  onExit,
  initializationDuration = 2500, // 2.5 seconds default - enough to feel purposeful, not long enough to be annoying
  showBackButton = true
}: WelcomeProps) {
  const router = useRouter()
  
  // State for managing the app initialization lifecycle
  const [isInitializing, setIsInitializing] = useState(true)
  const [initializationProgress, setInitializationProgress] = useState(0)

  /**
   * APP INITIALIZATION SIMULATION
   * 
   * Simulates the app setup process with realistic timing.
   * In a real implementation, this would handle:
   * - Database connection and setup
   * - User preferences loading
   * - Theme and appearance configuration
   * - Local storage initialization
   * - Service worker registration
   * - Analytics and crash reporting setup
   * - Feature flags and configuration loading
   * - Initial data sync (if user is logged in)
   * 
   * The duration is kept short to respect user time while still
   * feeling purposeful and not rushed.
   */
  useEffect(() => {
    const startTime = Date.now()
    
    const initializationInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(100, (elapsed / initializationDuration) * 100)
      setInitializationProgress(progress)
      
      if (progress >= 100) {
        setIsInitializing(false)
        clearInterval(initializationInterval)
        
        // Auto-dismiss after showing completion briefly
        setTimeout(() => {
          if (onInitializationComplete) {
            onInitializationComplete()
          }
        }, 300) // Brief pause to show completion
      }
    }, 50) // Update every 50ms for smooth internal progress tracking
    
    return () => clearInterval(initializationInterval)
  }, [initializationDuration, onInitializationComplete])

  /**
   * EXIT APP HANDLER
   * 
   * Allows users to exit during app startup if needed.
   * This is particularly important for ADHD users who might
   * change their mind or realize they opened the app accidentally.
   */
  const handleExit = () => {
    setIsInitializing(false)
    if (onExit) {
      onExit()
    } else {
      // In a real app, this might close the app or navigate to home screen
      router.back()
    }
  }

  return (
    <div 
      style={{ 
        backgroundColor: '#cae9ef', // Light blue background from mockup
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px'
      }}
      role="status"
      aria-live="polite"
      aria-label="Welcome to Joidu, setting up your workspace"
    >
      {/* 
       * CALMING ANIMATION STYLES
       * 
       * These animations are designed to be gentle and soothing rather than
       * energetic or urgent. The floating animation mimics a gentle breathing
       * motion, which can be subconsciously calming for users.
       */}
      <style jsx>{`
        @keyframes gentleFloat {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-2px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        
        @keyframes calmFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .floating-logo {
          animation: gentleFloat 3s ease-in-out infinite;
        }
        
        .calm-fade-in {
          animation: calmFadeIn 0.5s ease-out;
        }
        
        /* 
         * Reduced motion accessibility
         * Respects user preferences for reduced motion
         */
        @media (prefers-reduced-motion: reduce) {
          .floating-logo {
            animation: none;
          }
          
          .calm-fade-in {
            animation: none;
          }
        }
      `}</style>

      {/* Back Arrow - Top Left (conditionally shown) */}
      {showBackButton && (
        <div style={{ marginBottom: '40px' }}>
          <button
            onClick={handleExit}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              transition: 'background-color 0.3s ease',
              opacity: 0.8
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(40, 71, 239, 0.1)'
              e.currentTarget.style.opacity = '1'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.opacity = '0.8'
            }}
            aria-label="Exit Joidu startup"
          >
            <ArrowLeft 
              size={24} 
              style={{ color: '#2847ef' }} 
            />
          </button>
        </div>
      )}

      {/* Main Content - Vertically Centered */}
      <div 
        className="calm-fade-in"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          maxWidth: '400px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        {/* 1. JOIDU LOGO - Gentle Floating Animation */}
        <div 
          className="floating-logo"
          style={{ 
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-hidden="true" // Decorative, screen reader will use text instead
        >
          <img 
            src="/icons/joidu_drop_logo.svg" 
            alt=""
            style={{ 
              width: '80px', 
              height: '80px' 
            }}
          />
        </div>

        {/* 2. WELCOME TITLE */}
        <h1 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#4c4c4c',
          margin: '0 0 16px 0',
          lineHeight: '1.2'
        }}>
          Welcome to Joidu
        </h1>

        {/* 3. PEACEFUL DESCRIPTION TEXT */}
        <p style={{
          fontSize: '17px',
          fontWeight: 400,
          color: '#a5a5a5',
          margin: '0',
          lineHeight: '1.4',
          maxWidth: '280px'
        }}>
          Getting your space ready for productivity and calm
        </p>

        {/* 
         * NO PROGRESS INDICATORS
         * 
         * Unlike other loading screens, this welcome screen keeps a clean,
         * minimal design. The absence of progress bars or dots creates a
         * calmer experience and lets users focus on the welcoming message
         * rather than how much time is remaining.
         * 
         * The floating logo provides just enough visual activity to show
         * the app is working without creating urgency or impatience.
         */}

        {/* Hidden progress status for screen readers */}
        <div 
          style={{ 
            position: 'absolute', 
            left: '-9999px' 
          }}
          aria-live="polite"
        >
          Setting up your Joidu workspace, {Math.round(initializationProgress)}% complete
        </div>
      </div>

      {/* Bottom spacing to maintain center alignment */}
      <div style={{ height: '60px' }} />
    </div>
  )
}

/**
 * INTEGRATION EXAMPLES:
 * 
 * // Basic usage for app startup
 * <Welcome onInitializationComplete={() => navigateToHome()} />
 * 
 * // For first-time users (hide back button)
 * <Welcome 
 *   showBackButton={false}
 *   onInitializationComplete={() => navigateToOnboarding()}
 *   initializationDuration={3000}
 * />
 * 
 * // For app updates
 * <Welcome
 *   onInitializationComplete={() => navigateToWhatsNew()}
 *   onExit={() => navigateToHome()}
 * />
 * 
 * FIRST IMPRESSION BEST PRACTICES:
 * 
 * 1. TIMING: Keep duration short (2-3 seconds max) to respect user time
 * 2. MESSAGING: Focus on benefits ("ready for productivity") not process ("loading data")
 * 3. ANIMATION: Gentle and calming, not energetic or urgent
 * 4. ACCESSIBILITY: Ensure screen readers understand what's happening
 * 5. EXIT OPTION: Always provide a way out for users who change their mind
 * 6. CONSISTENCY: Match the calm, organized tone of the overall app experience
 * 
 * DEVELOPMENT INTEGRATION:
 * 
 * // App.tsx or main layout component
 * const [isFirstLaunch, setIsFirstLaunch] = useState(true)
 * 
 * if (isFirstLaunch) {
 *   return <Welcome onInitializationComplete={() => setIsFirstLaunch(false)} />
 * }
 * 
 * // Or in a route guard/startup service
 * const initializeApp = async () => {
 *   // Show welcome screen
 *   const welcomePromise = showWelcomeScreen()
 *   
 *   // Perform actual initialization
 *   await Promise.all([
 *     loadUserPreferences(),
 *     initializeDatabase(),
 *     setupAnalytics(),
 *     welcomePromise // Ensure welcome shows for minimum duration
 *   ])
 * }
 */