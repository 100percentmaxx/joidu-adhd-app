'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Clock } from 'lucide-react'

interface MaintenanceProps {
  onMaintenanceComplete?: () => void
  onExit?: () => void
  showBackButton?: boolean
  estimatedMinutes?: number
  improvements?: string[]
  autoRefreshInterval?: number // milliseconds
  startTime?: Date
}

/**
 * MAINTENANCE SCREEN COMPONENT
 * 
 * This screen appears when the app is temporarily unavailable due to planned
 * maintenance, updates, or server improvements. It's designed to turn a potentially
 * frustrating downtime period into a positive experience by clearly communicating
 * the value being added and managing user expectations about duration.
 * 
 * KEY DESIGN PRINCIPLES:
 * - Transform downtime into anticipation for improvements
 * - Clear communication about maintenance duration and purpose
 * - Maintain user trust through transparency and regular updates
 * - Reduce frustration by explaining the benefits of waiting
 * - Professional appearance that reflects ongoing care for the product
 * 
 * USER RETENTION GOALS:
 * - Keep users informed rather than leaving them in the dark
 * - Build excitement about upcoming improvements
 * - Show that maintenance is purposeful, not just technical issues
 * - Provide clear expectations about when service will resume
 * - Demonstrate ongoing investment in product quality
 * 
 * COMMUNICATION PATTERN:
 * - Lead with benefit ("making Joidu even better") not inconvenience
 * - Specific improvements list shows tangible value
 * - Time estimates help users plan their return
 * - Auto-refresh reduces need for manual checking
 * - Professional tone maintains confidence in the service
 * 
 * USAGE SCENARIOS:
 * - Planned server maintenance windows
 * - Major feature deployments requiring downtime
 * - Database migrations or infrastructure updates
 * - Security patches requiring service restart
 * - Performance optimization requiring temporary shutdown
 */
export default function Maintenance({
  onMaintenanceComplete,
  onExit,
  showBackButton = true,
  estimatedMinutes = 15,
  improvements = [
    'Faster sync performance',
    'Better Kai AI responses', 
    'Enhanced security features'
  ],
  autoRefreshInterval = 60000, // 60 seconds default
  startTime
}: MaintenanceProps) {
  const router = useRouter()
  
  // State for managing maintenance status and timing
  const [timeRemaining, setTimeRemaining] = useState(estimatedMinutes)
  const [hasCheckedRecently, setHasCheckedRecently] = useState(false)
  const [maintenanceStarted] = useState(startTime || new Date())

  /**
   * AUTO-REFRESH AND RETRY LOGIC
   * 
   * Periodically checks if maintenance is complete by attempting to reconnect.
   * This provides a seamless transition back to normal app functionality when
   * maintenance is finished, without requiring user intervention.
   * 
   * The checking is done respectfully to avoid overwhelming the server during
   * maintenance operations.
   */
  useEffect(() => {
    const checkMaintenanceStatus = async () => {
      setHasCheckedRecently(true)
      
      try {
        // In a real implementation, this would ping a health endpoint
        // For demo purposes, we'll simulate maintenance completion randomly
        const isMaintenanceComplete = Math.random() < 0.1 // 10% chance per check
        
        if (isMaintenanceComplete && onMaintenanceComplete) {
          onMaintenanceComplete()
          return
        }
      } catch (error) {
        // Maintenance is still ongoing or network issues
        console.log('Maintenance check failed (expected during maintenance):', error)
      }
      
      // Reset the "recently checked" flag after a short delay
      setTimeout(() => setHasCheckedRecently(false), 3000)
    }

    // Initial check after component loads
    const initialDelay = setTimeout(checkMaintenanceStatus, 5000)
    
    // Set up periodic checking
    const interval = setInterval(checkMaintenanceStatus, autoRefreshInterval)
    
    return () => {
      clearTimeout(initialDelay)
      clearInterval(interval)
    }
  }, [autoRefreshInterval, onMaintenanceComplete])

  /**
   * TIME COUNTDOWN LOGIC
   * 
   * Provides users with a sense of progress and helps them plan when to return.
   * The countdown is estimated and may not be perfectly accurate, but gives users
   * a reasonable expectation of maintenance duration.
   */
  useEffect(() => {
    if (timeRemaining <= 0) return

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = Math.max(0, prev - 1)
        return newTime
      })
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [timeRemaining])

  /**
   * EXIT HANDLER
   * 
   * Allows users to leave the maintenance screen if needed. In some cases,
   * users might be able to use cached/offline functionality while maintenance
   * is ongoing.
   */
  const handleExit = () => {
    if (onExit) {
      onExit()
    } else {
      // In a real app, this might navigate to an offline mode or close the app
      router.back()
    }
  }

  /**
   * FORMAT TIME REMAINING
   * 
   * Converts minutes into human-readable format for user-friendly display.
   */
  const formatTimeRemaining = (minutes: number): string => {
    if (minutes <= 0) return 'Very soon'
    if (minutes === 1) return '1 minute'
    if (minutes < 60) return `${minutes} minutes`
    
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    
    if (hours === 1) {
      return remainingMinutes === 0 ? '1 hour' : `1 hour ${remainingMinutes} minutes`
    }
    
    return remainingMinutes === 0 ? `${hours} hours` : `${hours} hours ${remainingMinutes} minutes`
  }

  return (
    <div 
      style={{ 
        backgroundColor: '#fefbf7', // App default background
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px'
      }}
      role="status"
      aria-live="polite"
      aria-label="App maintenance in progress - improvements being made"
    >
      {/* CSS for fade-in animation */}
      <style jsx>{`
        @keyframes gentleFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .fade-in {
          animation: gentleFadeIn 0.6s ease-out;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .fade-in {
            animation: none;
          }
        }
      `}</style>

      {/* Header with Back Arrow and Title */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative',
        marginBottom: '40px' 
      }}>
        {/* Back Arrow - Absolutely positioned to left */}
        {showBackButton && (
          <button
            onClick={handleExit}
            style={{
              position: 'absolute',
              left: 0,
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
            aria-label="Exit maintenance screen"
          >
            <ArrowLeft 
              size={24} 
              style={{ color: '#2847ef' }} 
            />
          </button>
        )}
        
        {/* Centered Joidu Title */}
        <h1 style={{
          fontSize: '24px',
          fontWeight: 700,
          color: '#2847ef',
          margin: 0
        }}>
          Joidu
        </h1>
      </div>

      {/* Main Content - Vertically Centered */}
      <div 
        className="fade-in"
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
        {/* 1. MAINTENANCE ICON - Static (80px) */}
        <div style={{ 
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            src="/icons/maintenance.svg" 
            alt=""
            style={{ 
              width: '80px', 
              height: '80px'
            }}
            aria-hidden="true"
          />
        </div>

        {/* 2. TITLE TEXT */}
        <h2 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#4c4c4c',
          margin: '0 0 16px 0',
          lineHeight: '1.2'
        }}>
          Quick Maintenance
        </h2>

        {/* 3. DESCRIPTION TEXT */}
        <p style={{
          fontSize: '17px',
          fontWeight: 400,
          color: '#a5a5a5',
          margin: '0 0 32px 0',
          lineHeight: '1.4',
          maxWidth: '280px'
        }}>
          We're making Joidu even better! This should only take a few minutes.
        </p>

        {/* 4. STATUS CONTAINER */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '2px solid #e2e2e2',
          borderRadius: '12px',
          padding: '20px',
          width: '100%',
          maxWidth: '360px',
          textAlign: 'left'
        }}>
          {/* A. TIME ESTIMATE HEADER */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <Clock size={16} style={{ color: '#4c4c4c' }} />
            <span style={{
              fontSize: '17px',
              fontWeight: 500,
              color: '#4c4c4c'
            }}>
              Estimated Time
            </span>
          </div>

          {/* B. TIME REMAINING */}
          <div style={{
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            <p style={{
              fontSize: '15px',
              fontWeight: 400,
              color: '#4c4c4c',
              margin: 0,
              lineHeight: '1.4'
            }}>
              We'll be back online in about{' '}
              <strong style={{ color: '#2847ef' }}>
                {formatTimeRemaining(timeRemaining)}
              </strong>
              {hasCheckedRecently && (
                <span style={{ fontSize: '13px', color: '#666', display: 'block', marginTop: '4px' }}>
                  (Checking for updates...)
                </span>
              )}
            </p>
          </div>

          {/* C. IMPROVEMENTS SECTION */}
          <div>
            <h3 style={{
              fontSize: '15px',
              fontWeight: 500,
              color: '#4c4c4c',
              margin: '0 0 16px 0'
            }}>
              What we're improving:
            </h3>

            {/* Feature list with icons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {improvements.map((improvement, index) => {
                // Map improvements to appropriate emoji icons
                const getIcon = (text: string) => {
                  if (text.toLowerCase().includes('sync') || text.toLowerCase().includes('performance')) return '⚡'
                  if (text.toLowerCase().includes('ai') || text.toLowerCase().includes('kai')) return '🧠'
                  if (text.toLowerCase().includes('security')) return '🔒'
                  if (text.toLowerCase().includes('ui') || text.toLowerCase().includes('interface')) return '✨'
                  if (text.toLowerCase().includes('bug') || text.toLowerCase().includes('fix')) return '🐛'
                  return '🔧' // Default maintenance icon
                }

                return (
                  <div 
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <span style={{ fontSize: '16px' }} aria-hidden="true">
                      {getIcon(improvement)}
                    </span>
                    <span style={{
                      fontSize: '15px',
                      fontWeight: 400,
                      color: '#4c4c4c',
                      lineHeight: '1.3'
                    }}>
                      {improvement}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Additional status info for screen readers */}
        <div 
          style={{ 
            position: 'absolute', 
            left: '-9999px' 
          }}
          aria-live="polite"
        >
          Maintenance in progress. Estimated completion in {formatTimeRemaining(timeRemaining)}. 
          Improvements include: {improvements.join(', ')}.
        </div>
      </div>

      {/* Bottom spacing */}
      <div style={{ height: '40px' }} />
    </div>
  )
}

/**
 * INTEGRATION EXAMPLES:
 * 
 * // Basic maintenance screen
 * <Maintenance 
 *   onMaintenanceComplete={() => navigateToHome()}
 *   estimatedMinutes={15}
 * />
 * 
 * // Custom improvements and timing
 * <Maintenance 
 *   estimatedMinutes={30}
 *   improvements={[
 *     'Database optimization',
 *     'New productivity features',
 *     'Bug fixes and improvements'
 *   ]}
 *   onExit={() => navigateToOfflineMode()}
 * />
 * 
 * // Critical maintenance (no exit)
 * <Maintenance 
 *   showBackButton={false}
 *   estimatedMinutes={45}
 *   autoRefreshInterval={30000} // Check every 30 seconds
 * />
 * 
 * MAINTENANCE COMMUNICATION BEST PRACTICES:
 * 
 * 1. POSITIVE FRAMING: Lead with benefits, not inconvenience
 * 2. SPECIFIC IMPROVEMENTS: List tangible value being added
 * 3. REALISTIC TIMING: Provide honest estimates, not overly optimistic
 * 4. AUTO-UPDATE: Reduce user friction with automatic status checks
 * 5. TRANSPARENCY: Clear communication builds trust during downtime
 * 6. PROFESSIONAL TONE: Maintain confidence in the service
 * 
 * DEVELOPMENT INTEGRATION:
 * 
 * // Maintenance detection
 * const checkMaintenanceStatus = async () => {
 *   try {
 *     const response = await fetch('/api/health')
 *     if (response.status === 503) { // Service Unavailable
 *       setShowMaintenance(true)
 *     }
 *   } catch (error) {
 *     // Network or server error - might be maintenance
 *     setShowMaintenance(true)
 *   }
 * }
 * 
 * // Graceful degradation during maintenance
 * const MainApp = () => {
 *   const [isInMaintenance, setIsInMaintenance] = useState(false)
 *   
 *   if (isInMaintenance) {
 *     return (
 *       <Maintenance 
 *         onMaintenanceComplete={() => {
 *           setIsInMaintenance(false)
 *           window.location.reload() // Refresh to get updated app
 *         }}
 *       />
 *     )
 *   }
 *   
 *   return <NormalApp />
 * }
 * 
 * USER RETENTION STRATEGIES:
 * 
 * 1. EXPECTATION MANAGEMENT: Clear timelines reduce abandonment
 * 2. VALUE COMMUNICATION: Users wait when they understand benefits
 * 3. PROGRESS INDICATION: Time remaining gives sense of progress
 * 4. PROFESSIONAL APPEARANCE: Quality maintenance screens build confidence
 * 5. AUTO-RESUME: Seamless return when maintenance completes
 * 6. OPTIONAL EXIT: Respect user choice and autonomy
 */