'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export default function CalendarAccessPage() {
  const router = useRouter()
  const [calendarAccess, setCalendarAccess] = useState(false)
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'not-requested'>('not-requested')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check current calendar permission status
    checkCalendarPermission()
  }, [])

  const checkCalendarPermission = async () => {
    try {
      // This would be implemented with actual calendar API
      // For now, simulate checking permission
      const savedPermission = localStorage.getItem('calendarPermission')
      if (savedPermission) {
        const status = savedPermission as 'granted' | 'denied'
        setPermissionStatus(status)
        setCalendarAccess(status === 'granted')
      }
    } catch (error) {
      console.log('Error checking calendar permission:', error)
    }
  }

  const handleBack = () => {
    router.push('/settings/privacy')
  }

  const handleToggleCalendarAccess = async (enabled: boolean) => {
    setIsLoading(true)
    
    if (enabled) {
      try {
        // In a real app, this would request calendar permission
        // Simulating permission request
        setTimeout(() => {
          const granted = Math.random() > 0.3 // 70% chance of success for demo
          const newStatus = granted ? 'granted' : 'denied'
          setPermissionStatus(newStatus)
          setCalendarAccess(granted)
          localStorage.setItem('calendarPermission', newStatus)
          setIsLoading(false)
        }, 1500)
      } catch (error) {
        setPermissionStatus('denied')
        setCalendarAccess(false)
        setIsLoading(false)
      }
    } else {
      setCalendarAccess(false)
      setPermissionStatus('denied')
      localStorage.setItem('calendarPermission', 'denied')
      setIsLoading(false)
    }
  }

  const getStatusIcon = () => {
    switch (permissionStatus) {
      case 'granted':
        return <CheckCircle className="w-5 h-5" style={{ color: '#a8e2bb' }} />
      case 'denied':
        return <XCircle className="w-5 h-5" style={{ color: '#f87171' }} />
      case 'not-requested':
        return <AlertCircle className="w-5 h-5" style={{ color: '#fbbf24' }} />
    }
  }

  const getStatusText = () => {
    switch (permissionStatus) {
      case 'granted':
        return 'Access Granted'
      case 'denied':
        return 'Access Denied'
      case 'not-requested':
        return 'Not Requested'
    }
  }

  const getStatusColor = () => {
    switch (permissionStatus) {
      case 'granted':
        return '#a8e2bb'
      case 'denied':
        return '#f87171'
      case 'not-requested':
        return '#fbbf24'
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fefbf7' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <button 
          onClick={handleBack}
          className="flex items-center justify-center w-10 h-10"
        >
          <ArrowLeft className="w-6 h-6" style={{ color: '#2847ef' }} />
        </button>
        <h1 style={{ 
          color: '#2847ef', 
          fontSize: '17px', 
          fontWeight: 600 
        }}>
          Calendar Access
        </h1>
        <div style={{ width: '40px' }}></div>
      </div>

      {/* Content */}
      <div style={{ padding: '0 20px' }}>
        
        {/* Hero Section */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '2px solid #e2e2e2',
          padding: '20px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <Calendar className="w-12 h-12" style={{ color: '#2847ef', margin: '0 auto' }} />
          </div>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '12px'
          }}>
            Smart Calendar Integration
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#4c4c4c',
            margin: 0,
            lineHeight: '1.4'
          }}>
            Joidu can read your calendar to provide smart scheduling suggestions and help you plan your day around existing commitments.
          </p>
        </div>

        {/* Current Status */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '2px solid #e2e2e2',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#4c4c4c'
            }}>
              Current Status
            </h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {getStatusIcon()}
              <span style={{
                fontSize: '14px',
                fontWeight: 600,
                color: getStatusColor()
              }}>
                {getStatusText()}
              </span>
            </div>
          </div>

          {/* Toggle Switch */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
            backgroundColor: '#fafafa',
            borderRadius: '12px'
          }}>
            <div>
              <span style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#4c4c4c'
              }}>
                Enable Calendar Access
              </span>
              <div style={{
                fontSize: '14px',
                color: '#a5a5a5',
                marginTop: '2px'
              }}>
                Allow Joidu to read your calendar events
              </div>
            </div>
            
            <label style={{
              position: 'relative',
              display: 'inline-block',
              width: '50px',
              height: '28px',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}>
              <input
                type="checkbox"
                checked={calendarAccess}
                onChange={(e) => handleToggleCalendarAccess(e.target.checked)}
                disabled={isLoading}
                style={{ display: 'none' }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: calendarAccess ? '#2847ef' : '#e2e2e2',
                  borderRadius: '14px',
                  transition: 'all 0.3s ease',
                  opacity: isLoading ? 0.5 : 1
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '2px',
                  left: calendarAccess ? '24px' : '2px',
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '50%',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {isLoading && (
                  <div style={{
                    width: '12px',
                    height: '12px',
                    border: '2px solid #e2e2e2',
                    borderTop: '2px solid #2847ef',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                )}
              </div>
            </label>
          </div>
        </div>

        {/* Benefits Section */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '2px solid #e2e2e2',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#4c4c4c',
            marginBottom: '16px'
          }}>
            How This Helps Your ADHD Brain
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#ddede3',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <XCircle className="w-4 h-4" style={{ color: '#a8e2bb' }} />
              </div>
              <div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#4c4c4c'
                }}>
                  Avoid scheduling conflicts
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#a5a5a5'
                }}>
                  Never accidentally plan tasks during meetings
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#ddede3',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Clock className="w-4 h-4" style={{ color: '#a8e2bb' }} />
              </div>
              <div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#4c4c4c'
                }}>
                  Discover optimal focus times
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#a5a5a5'
                }}>
                  Find gaps in your schedule for deep work
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#ddede3',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Calendar className="w-4 h-4" style={{ color: '#a8e2bb' }} />
              </div>
              <div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#4c4c4c'
                }}>
                  Integrate with daily planning
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#a5a5a5'
                }}>
                  See your full day at a glance
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Information */}
        <div style={{
          backgroundColor: '#cae9ef',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '20px'
        }}>
          <h4 style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '8px'
          }}>
            🔒 Your Privacy is Protected
          </h4>
          <p style={{
            fontSize: '14px',
            color: '#4c4c4c',
            margin: 0,
            lineHeight: '1.4'
          }}>
            Joidu only reads event times and titles to avoid scheduling conflicts. We never access event content, attendees, locations, or other personal details.
          </p>
        </div>

        {/* Learn More Section */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '2px solid #e2e2e2',
          padding: '20px',
          marginBottom: '60px'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#4c4c4c',
            marginBottom: '12px'
          }}>
            Learn More
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#4c4c4c',
            marginBottom: '16px',
            lineHeight: '1.4'
          }}>
            Calendar access is completely optional. You can revoke permission at any time through your device settings or by toggling this switch.
          </p>
          <button
            onClick={() => router.push('/settings/privacy/policy')}
            style={{
              backgroundColor: '#f0f8ff',
              color: '#2847ef',
              fontSize: '14px',
              fontWeight: 600,
              padding: '12px 16px',
              borderRadius: '8px',
              border: '2px solid #2847ef',
              cursor: 'pointer'
            }}
          >
            Read Privacy Policy
          </button>
        </div>
      </div>

      {/* CSS for loading animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}