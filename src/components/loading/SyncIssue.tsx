'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, RotateCw } from 'lucide-react'

interface SyncIssueProps {
  onRetry?: () => void
  onExit?: () => void
  showBackButton?: boolean
  lastSyncTime?: Date
  errorDetails?: string
  isRetrying?: boolean
}

/**
 * SYNC ISSUE SCREEN COMPONENT
 * 
 * This screen appears when there are problems with data synchronization between
 * the app and cloud services. It's designed to be reassuring and informative
 * for ADHD users, emphasizing that their data is safe locally while the system
 * works to resolve sync issues.
 * 
 * KEY DESIGN PRINCIPLES:
 * - Reassuring messaging to reduce anxiety about data loss
 * - Clear status information about what's happening
 * - Emphasis on data safety and local storage
 * - Gentle, non-urgent visual design
 * - Actionable retry options without pressure
 * 
 * FIRST IMPRESSION GOALS:
 * - Communicate that data is safe and accessible locally
 * - Reduce panic or frustration about sync issues
 * - Provide clear information about what's being attempted
 * - Show that the system is actively working to resolve issues
 * - Maintain trust in the app's reliability
 * 
 * USAGE SCENARIOS:
 * - Network connectivity issues preventing sync
 * - Server-side sync service temporarily unavailable  
 * - Authentication issues with cloud services
 * - Data conflicts requiring resolution
 * - Timeout issues during sync operations
 */
export default function SyncIssue({
  onRetry,
  onExit,
  showBackButton = true,
  lastSyncTime,
  errorDetails,
  isRetrying = false
}: SyncIssueProps) {
  const router = useRouter()
  const [retryCount, setRetryCount] = useState(0)
  const [isLocalRetrying, setIsLocalRetrying] = useState(false)

  /**
   * RETRY HANDLER
   * 
   * Manages retry attempts with user feedback and count tracking.
   * Includes local retry state management for smooth UX.
   */
  const handleRetry = async () => {
    setIsLocalRetrying(true)
    setRetryCount(prev => prev + 1)
    
    try {
      if (onRetry) {
        await onRetry()
      }
    } catch (error) {
      console.warn('Retry failed:', error)
    } finally {
      // Keep retry state for a moment to show feedback
      setTimeout(() => {
        setIsLocalRetrying(false)
      }, 1000)
    }
  }

  /**
   * EXIT HANDLER
   * 
   * Allows users to continue using the app with local data only.
   * This is important for ADHD users who may not want to wait for sync resolution.
   */
  const handleExit = () => {
    if (onExit) {
      onExit()
    } else {
      router.back()
    }
  }

  /**
   * FORMAT LAST SYNC TIME
   * 
   * Provides human-readable sync timestamp for user reference.
   */
  const formatLastSync = (date: Date): string => {
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / 60000)
    
    if (diffMinutes < 1) return 'Just now'
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} hours ago`
    return `${Math.floor(diffMinutes / 1440)} days ago`
  }

  const showRetrySpinner = isRetrying || isLocalRetrying

  return (
    <div 
      style={{ 
        backgroundColor: '#fefbf7', // App default background
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px'
      }}
      role="alert"
      aria-live="polite"
      aria-label="Sync issue detected - your data is safe locally"
    >
      {/* Header with Back Arrow */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '40px' 
      }}>
        {showBackButton && (
          <button
            onClick={handleExit}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              transition: 'background-color 0.3s ease',
              opacity: 0.8,
              marginRight: '16px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(40, 71, 239, 0.1)'
              e.currentTarget.style.opacity = '1'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.opacity = '0.8'
            }}
            aria-label="Return to app with local data"
          >
            <ArrowLeft 
              size={24} 
              style={{ color: '#2847ef' }} 
            />
          </button>
        )}
        
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
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        maxWidth: '400px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* Static Sync Cloud Icon (80px) */}
        <div style={{ 
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            src="/icons/sync_cloud.svg" 
            alt=""
            style={{ 
              width: '80px', 
              height: '80px',
              opacity: 0.7 // Slightly faded to indicate issue state
            }}
            aria-hidden="true"
          />
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#4c4c4c',
          margin: '0 0 16px 0',
          lineHeight: '1.2'
        }}>
          Sync Issue
        </h2>

        {/* Reassuring Description */}
        <p style={{
          fontSize: '17px',
          fontWeight: 400,
          color: '#a5a5a5',
          margin: '0 0 32px 0',
          lineHeight: '1.4',
          maxWidth: '320px'
        }}>
          Having trouble connecting to the cloud, but all your data is safe locally while we work to resolve this
        </p>

        {/* Status Container */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '24px',
          width: '100%',
          maxWidth: '360px',
          border: '1px solid #e6e1f4',
          marginBottom: '32px',
          textAlign: 'left'
        }}>
          {/* Last Sync Time */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            paddingBottom: '12px',
            borderBottom: '1px solid #f5f5f5'
          }}>
            <span style={{
              fontSize: '14px',
              color: '#666666',
              fontWeight: 500
            }}>
              Last successful sync:
            </span>
            <span style={{
              fontSize: '14px',
              color: '#4c4c4c',
              fontWeight: 600
            }}>
              {lastSyncTime ? formatLastSync(lastSyncTime) : 'Unknown'}
            </span>
          </div>

          {/* Retry Status */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            paddingBottom: '12px',
            borderBottom: '1px solid #f5f5f5'
          }}>
            <span style={{
              fontSize: '14px',
              color: '#666666',
              fontWeight: 500
            }}>
              Retry status:
            </span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {showRetrySpinner && (
                <div style={{
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <RotateCw 
                    size={14} 
                    style={{ 
                      color: '#2847ef',
                      animation: 'spin 1s linear infinite'
                    }}
                  />
                </div>
              )}
              <span style={{
                fontSize: '14px',
                color: showRetrySpinner ? '#2847ef' : '#4c4c4c',
                fontWeight: 600
              }}>
                {showRetrySpinner 
                  ? 'Attempting to reconnect...' 
                  : retryCount > 0 
                    ? `${retryCount} attempt${retryCount > 1 ? 's' : ''} made`
                    : 'Ready to retry'
                }
              </span>
            </div>
          </div>

          {/* Status Bullet Points */}
          <div style={{ fontSize: '13px', color: '#666666', lineHeight: '1.5' }}>
            <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}>
              <span style={{ color: '#2847ef', marginRight: '8px', fontWeight: 600 }}>•</span>
              <span>Your tasks, habits, and progress are saved locally</span>
            </div>
            <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}>
              <span style={{ color: '#2847ef', marginRight: '8px', fontWeight: 600 }}>•</span>
              <span>You can continue using Joidu normally</span>
            </div>
            <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}>
              <span style={{ color: '#2847ef', marginRight: '8px', fontWeight: 600 }}>•</span>
              <span>Changes will sync automatically when connection is restored</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <span style={{ color: '#2847ef', marginRight: '8px', fontWeight: 600 }}>•</span>
              <span>No data will be lost during this process</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '100%',
          maxWidth: '280px'
        }}>
          {/* Retry Button */}
          <button
            onClick={handleRetry}
            disabled={showRetrySpinner}
            style={{
              width: '100%',
              padding: '14px 16px',
              backgroundColor: showRetrySpinner ? '#e6e1f4' : '#2847ef',
              color: showRetrySpinner ? '#999' : 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: showRetrySpinner ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              if (!showRetrySpinner) {
                e.currentTarget.style.backgroundColor = '#1e3cd4'
              }
            }}
            onMouseLeave={(e) => {
              if (!showRetrySpinner) {
                e.currentTarget.style.backgroundColor = '#2847ef'
              }
            }}
            aria-label={showRetrySpinner ? 'Retrying connection' : 'Try to sync again'}
          >
            {showRetrySpinner ? (
              <>
                <RotateCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
                Retrying...
              </>
            ) : (
              'Try Sync Again'
            )}
          </button>

          {/* Continue Offline Button */}
          <button
            onClick={handleExit}
            style={{
              width: '100%',
              padding: '14px 16px',
              backgroundColor: 'transparent',
              color: '#666666',
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#2847ef'
              e.currentTarget.style.color = '#2847ef'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e0e0e0'
              e.currentTarget.style.color = '#666666'
            }}
            aria-label="Continue using app with local data only"
          >
            Continue Offline
          </button>
        </div>
      </div>

      {/* Bottom spacing */}
      <div style={{ height: '40px' }} />

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

/**
 * INTEGRATION EXAMPLES:
 * 
 * // Basic usage for sync issues
 * <SyncIssue 
 *   onRetry={() => syncService.retry()} 
 *   onExit={() => navigateToHome()}
 *   lastSyncTime={new Date(lastSyncTimestamp)}
 * />
 * 
 * // With detailed error information
 * <SyncIssue 
 *   onRetry={() => handleRetry()}
 *   errorDetails="Network timeout during sync operation"
 *   isRetrying={syncInProgress}
 *   showBackButton={true}
 * />
 * 
 * // For critical first-time sync failures
 * <SyncIssue 
 *   showBackButton={false}
 *   onRetry={() => performInitialSync()}
 *   lastSyncTime={undefined} // No previous sync
 * />
 * 
 * SYNC ISSUE BEST PRACTICES:
 * 
 * 1. REASSURANCE: Always emphasize data safety and local storage
 * 2. CLARITY: Provide specific information about last successful sync
 * 3. OPTIONS: Give users choice between retrying and continuing offline
 * 4. FEEDBACK: Show clear retry progress and attempt counts
 * 5. ACCESSIBILITY: Ensure screen readers understand the sync status
 * 6. NON-BLOCKING: Allow users to continue working while sync resolves
 * 
 * DEVELOPMENT INTEGRATION:
 * 
 * // Sync error handling
 * const handleSyncError = (error) => {
 *   setShowSyncIssue(true)
 *   setSyncError(error)
 *   // Continue app functionality with local data
 * }
 * 
 * // Retry logic
 * const retrySyncOperation = async () => {
 *   try {
 *     await syncService.syncAllData()
 *     setShowSyncIssue(false)
 *   } catch (error) {
 *     // Handle continued sync issues
 *     console.error('Sync retry failed:', error)
 *   }
 * }
 */