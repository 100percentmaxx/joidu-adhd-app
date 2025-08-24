'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle, Search } from 'lucide-react'

interface ConnectionLostProps {
  onConnectionRestored?: () => void
  onExit?: () => void
  showBackButton?: boolean
  autoRetryInterval?: number // milliseconds
  connectionLostAt?: Date
}

/**
 * CONNECTION LOST SCREEN COMPONENT
 * 
 * This screen appears when the app loses internet connectivity and cannot reach
 * the servers. It's designed to reduce anxiety about connectivity issues by
 * clearly communicating that the app continues to work offline and all data
 * is preserved safely. This is especially important for ADHD users who may
 * worry about losing their organizational progress.
 * 
 * KEY DESIGN PRINCIPLES:
 * - Immediate reassurance about data safety and preservation
 * - Clear communication that core app features continue to work
 * - Helpful troubleshooting without being condescending
 * - Calm, non-urgent presentation to reduce stress
 * - Automatic background reconnection without user intervention
 * 
 * DATA PRESERVATION APPROACH:
 * - All user data (tasks, habits, focus sessions) saved locally first
 * - Sync happens in background when connection is available
 * - No functionality loss for core productivity features
 * - Clear indication of what works offline vs online
 * - Automatic sync when connection is restored
 * 
 * OFFLINE STATE PATTERN:
 * - App continues normal operation with local data
 * - Online-only features gracefully degraded or queued
 * - User sees clear indication of offline status
 * - Automatic retry and reconnection in background
 * - Seamless transition back to online mode
 * 
 * USER ANXIETY REDUCTION:
 * - Lead with data safety, not connection problems
 * - Emphasize continued functionality over limitations
 * - Provide actionable troubleshooting steps
 * - Show that the app is actively trying to reconnect
 * - Maintain professional, calm tone throughout
 * 
 * USAGE SCENARIOS:
 * - WiFi network interruptions or weak signals
 * - Cellular data connectivity issues
 * - Server connectivity problems from user's ISP
 * - Temporary network outages or maintenance
 * - Switching between WiFi and cellular networks
 */
export default function ConnectionLost({
  onConnectionRestored,
  onExit,
  showBackButton = true,
  autoRetryInterval = 12000, // 12 seconds default - frequent enough to reconnect quickly, not so frequent as to drain battery
  connectionLostAt
}: ConnectionLostProps) {
  const router = useRouter()
  
  // State for managing connection monitoring
  const [isCheckingConnection, setIsCheckingConnection] = useState(false)
  const [lastRetryAttempt, setLastRetryAttempt] = useState<Date | null>(null)
  const [connectionLostTime] = useState(connectionLostAt || new Date())

  /**
   * AUTO-RETRY CONNECTION DETECTION
   * 
   * Continuously monitors network connectivity in the background without
   * user intervention. This provides a seamless experience when connectivity
   * is restored - users don't need to manually retry or refresh.
   * 
   * The retry logic is designed to be respectful of battery life and network
   * resources while still providing quick reconnection when possible.
   */
  useEffect(() => {
    const checkConnection = async () => {
      setIsCheckingConnection(true)
      setLastRetryAttempt(new Date())
      
      try {
        // Multiple connection check strategies for reliability
        const connectionChecks = [
          // 1. Try to fetch a small, fast-loading resource
          fetch('/api/health', { 
            method: 'HEAD',
            cache: 'no-cache',
            signal: AbortSignal.timeout(5000) // 5 second timeout
          }),
          
          // 2. Check browser's network status
          navigator.onLine,
          
          // 3. Try a minimal network request to a reliable endpoint
          fetch('https://httpbin.org/status/200', { 
            method: 'HEAD',
            cache: 'no-cache',
            mode: 'no-cors',
            signal: AbortSignal.timeout(3000) // 3 second timeout
          })
        ]
        
        // If any connection check succeeds, we're back online
        const results = await Promise.allSettled([
          connectionChecks[0],
          Promise.resolve(connectionChecks[1]),
          connectionChecks[2]
        ])
        
        const hasConnection = results.some(result => 
          result.status === 'fulfilled' && 
          (result.value === true || (typeof result.value === 'object' && result.value?.ok))
        )
        
        if (hasConnection && onConnectionRestored) {
          console.log('Connection restored!')
          onConnectionRestored()
          return
        }
        
      } catch (error) {
        // Connection still down - this is expected during offline periods
        console.log('Connection check failed (expected while offline):', error)
      } finally {
        setIsCheckingConnection(false)
      }
    }

    // Initial check after a brief delay
    const initialDelay = setTimeout(checkConnection, 3000)
    
    // Set up periodic connection monitoring
    const interval = setInterval(checkConnection, autoRetryInterval)
    
    // Also listen to browser's online/offline events for immediate feedback
    const handleOnline = () => {
      console.log('Browser detected online status')
      checkConnection()
    }
    
    const handleOffline = () => {
      console.log('Browser detected offline status')
    }
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      clearTimeout(initialDelay)
      clearInterval(interval)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [autoRetryInterval, onConnectionRestored])

  /**
   * EXIT HANDLER
   * 
   * Allows users to return to the app and continue working offline.
   * This is important because many core features (task management,
   * focus timer, habit tracking) work perfectly fine without internet.
   */
  const handleExit = () => {
    if (onExit) {
      onExit()
    } else {
      router.back()
    }
  }

  /**
   * FORMAT CONNECTION LOST TIME
   * 
   * Shows users how long they've been offline, which can help with
   * troubleshooting and understanding the scope of the connectivity issue.
   */
  const formatOfflineDuration = (): string => {
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - connectionLostTime.getTime()) / 60000)
    
    if (diffMinutes < 1) return 'just now'
    if (diffMinutes === 1) return '1 minute ago'
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`
    
    const hours = Math.floor(diffMinutes / 60)
    if (hours === 1) return '1 hour ago'
    return `${hours} hours ago`
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
      aria-label="Connection lost - app continues to work offline with local data"
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
            aria-label="Return to app (offline mode)"
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
        {/* 1. WIFI ICON - Static (80px) */}
        <div style={{ 
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            src="/icons/wifi.svg" 
            alt=""
            style={{ 
              width: '80px', 
              height: '80px',
              opacity: 0.7 // Slightly faded to indicate offline state
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
          Connection Lost
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
          Can't reach our servers right now, but don't worry - your data is safe!
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
          {/* A. DATA SAFETY HEADER */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <CheckCircle size={16} style={{ color: '#22c55e' }} />
            <span style={{
              fontSize: '17px',
              fontWeight: 500,
              color: '#4c4c4c'
            }}>
              Your data is safe
            </span>
          </div>

          {/* B. DATA SAFETY EXPLANATION */}
          <p style={{
            fontSize: '15px',
            fontWeight: 400,
            color: '#4c4c4c',
            margin: '0 0 24px 0',
            lineHeight: '1.4',
            textAlign: 'center'
          }}>
            Everything you've added is saved locally. Once you're back online, we'll sync everything automatically.
          </p>

          {/* C. TROUBLESHOOTING SECTION */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px'
          }}>
            <Search size={16} style={{ color: '#4c4c4c' }} />
            <span style={{
              fontSize: '15px',
              fontWeight: 500,
              color: '#4c4c4c'
            }}>
              What you can try:
            </span>
          </div>

          {/* D. SUGGESTION TEXT */}
          <p style={{
            fontSize: '15px',
            fontWeight: 400,
            color: '#4c4c4c',
            margin: '0',
            lineHeight: '1.4',
            textAlign: 'center'
          }}>
            Check your WiFi or cellular signal.
          </p>

          {/* Connection Status Info */}
          <div style={{
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid #f0f0f0',
            fontSize: '13px',
            color: '#666',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: '6px' }}>
              Connection lost {formatOfflineDuration()}
            </div>
            {isCheckingConnection ? (
              <div style={{ color: '#2847ef' }}>
                Checking connection...
              </div>
            ) : (
              <div>
                Next check in {autoRetryInterval / 1000} seconds
              </div>
            )}
            {lastRetryAttempt && (
              <div style={{ fontSize: '12px', marginTop: '4px' }}>
                Last attempt: {lastRetryAttempt.toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>

        {/* Additional Features Available Offline */}
        <div style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: '#f8fffe',
          borderRadius: '8px',
          border: '1px solid #e0f7fa',
          width: '100%',
          maxWidth: '360px'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: 500,
            color: '#4c4c4c',
            marginBottom: '8px',
            textAlign: 'center'
          }}>
            ✅ Still works offline:
          </div>
          <div style={{
            fontSize: '13px',
            color: '#666',
            lineHeight: '1.4',
            textAlign: 'center'
          }}>
            Tasks • Habits • Focus Timer • Calendar • Notes
          </div>
        </div>

        {/* Hidden status for screen readers */}
        <div 
          style={{ 
            position: 'absolute', 
            left: '-9999px' 
          }}
          aria-live="polite"
        >
          {isCheckingConnection 
            ? 'Checking for internet connection...' 
            : `Connection lost ${formatOfflineDuration()}. App continues to work offline with local data. All features available except cloud sync.`
          }
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
 * // Basic connection lost screen
 * <ConnectionLost 
 *   onConnectionRestored={() => {
 *     console.log('Back online!')
 *     setIsOffline(false)
 *   }}
 * />
 * 
 * // With custom retry interval and connection time
 * <ConnectionLost 
 *   autoRetryInterval={15000} // Check every 15 seconds
 *   connectionLostAt={new Date(lastOnlineTimestamp)}
 *   onExit={() => navigateToOfflineMode()}
 * />
 * 
 * // For critical connectivity (no exit option)
 * <ConnectionLost 
 *   showBackButton={false}
 *   autoRetryInterval={8000} // More frequent checking
 *   onConnectionRestored={() => syncAllPendingData()}
 * />
 * 
 * OFFLINE STATE PATTERN BEST PRACTICES:
 * 
 * 1. DATA FIRST: Always emphasize data safety before connection issues
 * 2. CONTINUED FUNCTIONALITY: Show what still works, not what doesn't
 * 3. AUTOMATIC RETRY: Check connection in background without user action
 * 4. CLEAR FEEDBACK: Show connection status and retry attempts
 * 5. GRACEFUL DEGRADATION: Core features work offline, advanced features queue
 * 6. SEAMLESS TRANSITION: Auto-return to online mode when connection restored
 * 
 * DEVELOPMENT INTEGRATION:
 * 
 * // Network status monitoring
 * const useNetworkStatus = () => {
 *   const [isOnline, setIsOnline] = useState(navigator.onLine)
 *   
 *   useEffect(() => {
 *     const handleOnline = () => setIsOnline(true)
 *     const handleOffline = () => setIsOnline(false)
 *     
 *     window.addEventListener('online', handleOnline)
 *     window.addEventListener('offline', handleOffline)
 *     
 *     return () => {
 *       window.removeEventListener('online', handleOnline)
 *       window.removeEventListener('offline', handleOffline)
 *     }
 *   }, [])
 *   
 *   return isOnline
 * }
 * 
 * // App with offline handling
 * const App = () => {
 *   const isOnline = useNetworkStatus()
 *   const [showConnectionLost, setShowConnectionLost] = useState(false)
 *   
 *   useEffect(() => {
 *     if (!isOnline) {
 *       setShowConnectionLost(true)
 *     }
 *   }, [isOnline])
 *   
 *   if (showConnectionLost && !isOnline) {
 *     return (
 *       <ConnectionLost
 *         onConnectionRestored={() => {
 *           setShowConnectionLost(false)
 *           // Trigger any pending syncs
 *           syncPendingData()
 *         }}
 *       />
 *     )
 *   }
 *   
 *   return <NormalApp />
 * }
 * 
 * DATA PRESERVATION STRATEGIES:
 * 
 * 1. LOCAL-FIRST ARCHITECTURE: Save all user actions locally immediately
 * 2. SYNC QUEUE: Store server-bound actions in queue for when online
 * 3. CONFLICT RESOLUTION: Handle data conflicts when reconnecting
 * 4. INCREMENTAL SYNC: Only sync changes, not full datasets
 * 5. OFFLINE INDICATORS: Show users what's synced vs pending
 * 6. DATA INTEGRITY: Validate data consistency after reconnection
 * 
 * ADHD-SPECIFIC CONSIDERATIONS:
 * 
 * 1. ANXIETY REDUCTION: Lead with reassurance, not problems
 * 2. CONTINUITY: Maintain workflow even during connectivity issues
 * 3. PREDICTABILITY: Clear patterns for offline/online transitions
 * 4. NO DATA LOSS: Critical for users who rely on the app for organization
 * 5. CALM COMMUNICATION: Avoid urgent or alarming language
 * 6. IMMEDIATE FEEDBACK: Quick acknowledgment of user actions offline
 */