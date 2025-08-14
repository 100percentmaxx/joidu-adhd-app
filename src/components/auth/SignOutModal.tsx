'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

interface SignOutModalProps {
  isOpen: boolean
  onClose: () => void
  initialState?: 'initial' | 'backup'
  exportCompleted?: boolean
}

/**
 * SignOut Modal Component
 * Implements the exact two-state sign out flow as shown in mockups
 * State 1: Initial sign out confirmation with animated icon
 * State 2: Backup confirmation with export options
 */
const SignOutModal: React.FC<SignOutModalProps> = ({ isOpen, onClose, initialState = 'initial', exportCompleted = false }) => {
  const router = useRouter()
  const [currentState, setCurrentState] = useState<'initial' | 'backup'>('initial')
  const [isSigningOut, setIsSigningOut] = useState(false)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentState(initialState)
      setIsSigningOut(false)
    }
  }, [isOpen, initialState])

  // Handle escape key and body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleSignOutClick = () => {
    setCurrentState('backup')
  }

  const handleExportData = () => {
    console.log('Exporting user data...')
    // TODO: Implement data export functionality
    alert('Data export started! You will receive an email when ready.')
  }

  const handleConfirmSignOut = async () => {
    setIsSigningOut(true)
    
    try {
      // Simulate sign out process
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('User signed out successfully')
      // TODO: Implement actual sign out logic
      alert('You have been signed out successfully!')
      onClose()
    } catch (error) {
      console.error('Sign out error:', error)
      alert('Error signing out. Please try again.')
    } finally {
      setIsSigningOut(false)
    }
  }

  const handleCancel = () => {
    if (currentState === 'backup') {
      setCurrentState('initial')
    } else {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Modal Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
          animation: 'fadeIn 300ms ease-out'
        }}
        onClick={onClose}
      >
        {/* Modal Container */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#fefbf7',
            animation: 'slideUp 300ms ease-out',
            display: 'flex',
            flexDirection: 'column'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid #f0f0f0'
          }}>
            <button 
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ArrowLeft size={24} style={{ color: '#2847ef' }} />
            </button>
            
            <h1 style={{ 
              color: '#2847ef', 
              fontSize: '17px', 
              fontWeight: 600,
              margin: 0
            }}>
              Sign Out
            </h1>
            
            <div style={{ width: '40px' }}></div>
          </div>

          {/* Content Area */}
          <div style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto'
          }}>
            {currentState === 'initial' ? (
              <InitialSignOutScreen 
                onSignOutClick={handleSignOutClick}
                onCancel={handleCancel}
                onClose={onClose}
                router={router}
                exportCompleted={exportCompleted}
                setCurrentState={setCurrentState}
              />
            ) : (
              <BackupConfirmationScreen
                onExportData={handleExportData}
                onCancel={handleCancel}
                onConfirmSignOut={handleConfirmSignOut}
                isSigningOut={isSigningOut}
                onClose={onClose}
                router={router}
              />
            )}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        @keyframes slideToCenter {
          0% { transform: translateX(-50px); }
          70% { transform: translateX(20px); }
          100% { transform: translateX(0px); }
        }

        .signout-icon-scroll {
          animation: slideToCenter 3s ease-out forwards !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .signout-icon-scroll {
            animation: none !important;
          }
        }
      `}</style>
    </>
  )
}

/**
 * Initial Sign Out Screen (LEFT SCREEN from mockup)
 * Shows main confirmation with animated signout icon
 */
interface InitialSignOutScreenProps {
  onSignOutClick: () => void
  onCancel: () => void
  onClose: () => void
  router: AppRouterInstance
  exportCompleted: boolean
  setCurrentState: (state: 'initial' | 'backup') => void
}

const InitialSignOutScreen: React.FC<InitialSignOutScreenProps> = ({
  onSignOutClick,
  onCancel,
  onClose,
  router,
  exportCompleted,
  setCurrentState
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Main Icon Container with Animation */}
      <div style={{
        width: '120px',
        height: '120px',
        backgroundColor: '#c8bfef',
        borderRadius: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '32px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Continuously scrolling signout icon */}
        <div 
          className="signout-icon-scroll"
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            animation: 'slideToCenter 3s ease-out forwards'
          }}
        >
          <img 
            src="/icons/signout.svg" 
            alt="Sign Out" 
            style={{ 
              width: '77px', 
              height: '77px'
            }} 
          />
        </div>
      </div>

      {/* Title */}
      <h2 style={{
        color: '#4c4c4c',
        fontSize: '24px',
        fontWeight: 700,
        margin: 0,
        marginBottom: '12px',
        textAlign: 'center'
      }}>
        Sign Out of Joidu?
      </h2>

      {/* Subtitle */}
      <p style={{
        color: '#a5a5a5',
        fontSize: '16px',
        fontWeight: 400,
        margin: 0,
        marginBottom: '32px',
        textAlign: 'center',
        lineHeight: '1.4',
        maxWidth: '320px'
      }}>
        You'll need to sign back in to access your account and sync your data across devices
      </p>

      {/* White Container with Border - Everything from Warning down to Backup */}
      <div style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        border: '2px solid #e2e2e2',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '32px'
      }}>
        {/* Warning Section Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: '16px',
          paddingLeft: '40px'
        }}>
          <img 
            src="/icons/alert.svg" 
            alt="Warning" 
            style={{ 
              width: '24px', 
              height: '24px',
              marginLeft: '-40px',
              marginRight: '16px',
              marginTop: '2px',
              flexShrink: 0
            }} 
          />
          <h3 style={{
            color: '#4c4c4c',
            fontSize: '16px',
            fontWeight: 600,
            margin: 0
          }}>
            What happens when you sign out:
          </h3>
        </div>

        {/* Warning Bullets */}
        <div style={{
          paddingLeft: '40px',
          marginBottom: '24px'
        }}>
          <ul style={{
            color: '#a5a5a5',
            fontSize: '14px',
            lineHeight: '1.5',
            margin: 0,
            paddingLeft: '0',
            listStyle: 'none'
          }}>
            <li style={{ 
              marginBottom: '8px',
              position: 'relative',
              paddingLeft: '16px'
            }}>
              <span style={{
                position: 'absolute',
                left: '0',
                top: '0'
              }}>•</span>
              You'll lose access to cloud sync
            </li>
            <li style={{ 
              marginBottom: '8px',
              position: 'relative',
              paddingLeft: '16px'
            }}>
              <span style={{
                position: 'absolute',
                left: '0',
                top: '0'
              }}>•</span>
              Data on this device stays safe
            </li>
            <li style={{ 
              marginBottom: '8px',
              position: 'relative',
              paddingLeft: '16px'
            }}>
              <span style={{
                position: 'absolute',
                left: '0',
                top: '0'
              }}>•</span>
              Pro features will be disabled
            </li>
            <li style={{ 
              marginBottom: '8px',
              position: 'relative',
              paddingLeft: '16px'
            }}>
              <span style={{
                position: 'absolute',
                left: '0',
                top: '0'
              }}>•</span>
              You'll need to sign in again
            </li>
          </ul>
        </div>

        {/* Data Safety Section */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: '32px',
          paddingLeft: '40px'
        }}>
          <img 
            src="/icons/privacy.svg" 
            alt="Privacy" 
            style={{ 
              width: '24px', 
              height: '24px',
              marginLeft: '-40px',
              marginRight: '16px',
              marginTop: '2px',
              flexShrink: 0
            }} 
          />
          <div>
            <h4 style={{
              color: '#4c4c4c',
              fontSize: '16px',
              fontWeight: 600,
              margin: 0,
              marginBottom: '4px'
            }}>
              Your Data is Safe
            </h4>
            <p style={{
              color: '#a5a5a5',
              fontSize: '14px',
              fontWeight: 400,
              margin: 0,
              lineHeight: '1.4'
            }}>
              All your tasks, habits, and settings will remain on this device. Only cloud sync will be disabled.
            </p>
          </div>
        </div>

        {/* Backup Section with Blue Background */}
        <div style={{
          backgroundColor: '#cae9ef',
          borderRadius: '16px',
          padding: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '24px',
            paddingLeft: '40px'
          }}>
            <img 
              src="/icons/backup.svg" 
              alt="Backup" 
              style={{ 
                width: '24px', 
                height: '24px',
                marginLeft: '-40px',
                marginRight: '16px',
                marginTop: '2px',
                flexShrink: 0
              }} 
            />
            <h4 style={{
              color: '#4c4c4c',
              fontSize: '16px',
              fontWeight: 600,
              margin: 0
            }}>
              Want to backup first?
            </h4>
          </div>

          <p style={{
            color: exportCompleted ? '#4CAF50' : '#a5a5a5',
            fontSize: '14px',
            fontWeight: exportCompleted ? 500 : 400,
            margin: 0,
            marginBottom: '24px',
            lineHeight: '1.4'
          }}>
            {exportCompleted 
              ? '✓ Your data has been exported successfully! You can now proceed with signing out.' 
              : 'Consider exporting your data before signing out, just in case.'
            }
          </p>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center' 
          }}>
            <button
              onClick={() => {
                if (exportCompleted) {
                  // Data already exported, proceed to backup confirmation
                  setCurrentState('backup')
                } else {
                  // Go to export page
                  onClose()
                  router.push('/settings/signout-data-export')
                }
              }}
              style={{
                backgroundColor: exportCompleted ? '#4CAF50' : '#2847ef',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '16px',
                fontSize: '16px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                if (exportCompleted) {
                  e.currentTarget.style.backgroundColor = '#45a049'
                } else {
                  e.currentTarget.style.backgroundColor = '#1e3acf'
                }
              }}
              onMouseOut={(e) => {
                if (exportCompleted) {
                  e.currentTarget.style.backgroundColor = '#4CAF50'
                } else {
                  e.currentTarget.style.backgroundColor = '#2847ef'
                }
              }}
            >
              {exportCompleted ? '✓ Export Complete - Continue' : 'Export Data'}
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '12px',
        width: '100%'
      }}>
        <button
          onClick={onCancel}
          style={{
            flex: 1,
            backgroundColor: '#c8bfef',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '16px',
            fontSize: '16px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#b8addf'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#c8bfef'
          }}
        >
          Cancel
        </button>

        <button
          onClick={onSignOutClick}
          style={{
            flex: 1,
            backgroundColor: '#f9c075',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '16px',
            fontSize: '16px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#f7b563'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#f9c075'
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

/**
 * Backup Confirmation Screen (RIGHT SCREEN from mockup)
 * Shows expanded backup options with export functionality
 */
interface BackupConfirmationScreenProps {
  onExportData: () => void
  onCancel: () => void
  onConfirmSignOut: () => void
  isSigningOut: boolean
  onClose: () => void
  router: AppRouterInstance
}

const BackupConfirmationScreen: React.FC<BackupConfirmationScreenProps> = ({
  onExportData,
  onCancel,
  onConfirmSignOut,
  isSigningOut,
  onClose,
  router
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Expanded Backup Card */}
      <div style={{
        width: '100%',
        backgroundColor: '#cae9ef',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: '24px'
        }}>
          <img 
            src="/icons/backup.svg" 
            alt="Backup" 
            style={{ 
              width: '24px', 
              height: '24px',
              marginRight: '12px',
              marginTop: '2px',
              flexShrink: 0
            }} 
          />
          <h4 style={{
            color: '#4c4c4c',
            fontSize: '16px',
            fontWeight: 600,
            margin: 0
          }}>
            Want to backup first?
          </h4>
        </div>

        <p style={{
          color: '#a5a5a5',
          fontSize: '14px',
          fontWeight: 400,
          margin: 0,
          marginBottom: '24px',
          lineHeight: '1.4'
        }}>
          Consider exporting your data before signing out, just in case.
        </p>

        <button
          onClick={() => {
            onClose()
            router.push('/settings/signout-data-export')
          }}
          style={{
            backgroundColor: '#2847ef',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '16px',
            fontSize: '16px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#1e3acf'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#2847ef'
          }}
        >
          Export Data
        </button>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }}></div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <button
          onClick={onCancel}
          style={{
            flex: 1,
            backgroundColor: '#c8bfef',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '16px',
            fontSize: '16px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#b8addf'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#c8bfef'
          }}
        >
          Cancel
        </button>

        <button
          onClick={onConfirmSignOut}
          disabled={isSigningOut}
          style={{
            flex: 1,
            backgroundColor: isSigningOut ? '#a5a5a5' : '#f9c075',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '16px',
            fontSize: '16px',
            fontWeight: 500,
            cursor: isSigningOut ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseOver={(e) => {
            if (!isSigningOut) {
              e.currentTarget.style.backgroundColor = '#f7b563'
            }
          }}
          onMouseOut={(e) => {
            if (!isSigningOut) {
              e.currentTarget.style.backgroundColor = '#f9c075'
            }
          }}
        >
          {isSigningOut ? 'Signing Out...' : 'Sign Out'}
        </button>
      </div>

      {/* Footer */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '20px' 
      }}>
        <p style={{
          color: '#a5a5a5',
          fontSize: '12px',
          fontWeight: 400,
          margin: 0
        }}>
          Joidu v1.2.1 - Made with ❤️ for ADHD brains
        </p>
      </div>
    </div>
  )
}

export default SignOutModal