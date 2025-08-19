'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Bell, Heart, Clock, CheckCircle2, AlertTriangle } from 'lucide-react'

interface NotificationSettings {
  taskReminders: boolean
  habitNudges: boolean
  focusBreaks: boolean
  dailyCheckins: boolean
}

export default function NotificationPermissionsPage() {
  const router = useRouter()
  const [systemPermission, setSystemPermission] = useState<'granted' | 'denied' | 'not-requested'>('not-requested')
  const [settings, setSettings] = useState<NotificationSettings>({
    taskReminders: false,
    habitNudges: false,
    focusBreaks: false,
    dailyCheckins: false
  })
  const [isTestingNotification, setIsTestingNotification] = useState(false)

  useEffect(() => {
    checkNotificationPermission()
    loadNotificationSettings()
  }, [])

  const checkNotificationPermission = () => {
    if ('Notification' in window) {
      const permission = Notification.permission
      if (permission === 'granted') {
        setSystemPermission('granted')
      } else if (permission === 'denied') {
        setSystemPermission('denied')
      } else {
        // 'default' or any other value maps to 'not-requested'
        setSystemPermission('not-requested')
      }
    }
  }

  const loadNotificationSettings = () => {
    const saved = localStorage.getItem('notificationSettings')
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }

  const saveNotificationSettings = (newSettings: NotificationSettings) => {
    localStorage.setItem('notificationSettings', JSON.stringify(newSettings))
  }

  const handleBack = () => {
    router.push('/settings/privacy')
  }

  const requestSystemPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        setSystemPermission('granted')
        return true
      } else if (permission === 'denied') {
        setSystemPermission('denied')
        return false
      } else {
        setSystemPermission('not-requested')
        return false
      }
    }
    return Notification.permission === 'granted'
  }

  const handleToggleNotification = async (type: keyof NotificationSettings, enabled: boolean) => {
    if (enabled && systemPermission !== 'granted') {
      const granted = await requestSystemPermission()
      if (!granted) {
        return // Don't enable if system permission denied
      }
    }

    const newSettings = { ...settings, [type]: enabled }
    setSettings(newSettings)
    saveNotificationSettings(newSettings)
  }

  const handleTestNotification = async () => {
    if (systemPermission !== 'granted') {
      const granted = await requestSystemPermission()
      if (!granted) return
    }

    setIsTestingNotification(true)
    
    // Show a gentle test notification
    new Notification('Joidu - Gentle Reminder 🌟', {
      body: 'This is what your supportive notifications will look like. You\'re doing great!',
      icon: '/icons/logo.png',
      tag: 'joidu-test'
    })

    setTimeout(() => {
      setIsTestingNotification(false)
    }, 2000)
  }

  const getSystemPermissionStatus = () => {
    switch (systemPermission) {
      case 'granted':
        return { icon: CheckCircle2, color: '#a8e2bb', text: 'System Notifications Enabled' }
      case 'denied':
        return { icon: AlertTriangle, color: '#f87171', text: 'System Notifications Blocked' }
      default:
        return { icon: Bell, color: '#fbbf24', text: 'System Permission Not Requested' }
    }
  }

  const notificationTypes = [
    {
      key: 'taskReminders' as keyof NotificationSettings,
      icon: CheckCircle2,
      title: 'Task Reminders',
      description: 'Never harsh or judgmental',
      example: '"Gentle nudge: Your task is ready when you are ✨"'
    },
    {
      key: 'habitNudges' as keyof NotificationSettings,
      icon: Heart,
      title: 'Habit Nudges',
      description: 'Supportive encouragement only',
      example: '"Time for your morning routine - you\'ve got this! 🌱"'
    },
    {
      key: 'focusBreaks' as keyof NotificationSettings,
      icon: Clock,
      title: 'Focus Breaks',
      description: 'Protect against hyperfocus burnout',
      example: '"Great work! How about a gentle break? 🧘‍♀️"'
    },
    {
      key: 'dailyCheckins' as keyof NotificationSettings,
      icon: Bell,
      title: 'Daily Check-ins',
      description: 'Optional motivational messages',
      example: '"How are you feeling today? Remember, progress isn\'t perfection 💙"'
    }
  ]

  const statusInfo = getSystemPermissionStatus()

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
          Notification Permissions
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
            <Bell className="w-12 h-12" style={{ color: '#2847ef', margin: '0 auto' }} />
          </div>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '12px'
          }}>
            Gentle Reminders for ADHD Brains
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#4c4c4c',
            margin: 0,
            lineHeight: '1.4'
          }}>
            Our notifications are designed to be supportive, never overwhelming. Every message uses encouraging language that works with your brain, not against it.
          </p>
        </div>

        {/* System Permission Status */}
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
              System Permission Status
            </h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <statusInfo.icon className="w-5 h-5" style={{ color: statusInfo.color }} />
              <span style={{
                fontSize: '14px',
                fontWeight: 600,
                color: statusInfo.color
              }}>
                {statusInfo.text}
              </span>
            </div>
          </div>

          {systemPermission === 'denied' && (
            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '16px'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#dc2626',
                margin: 0,
                lineHeight: '1.4'
              }}>
                Notifications are blocked in your system settings. To receive Joidu reminders, please enable notifications in your device settings.
              </p>
            </div>
          )}

          <button
            onClick={handleTestNotification}
            disabled={isTestingNotification}
            style={{
              backgroundColor: isTestingNotification ? '#a5a5a5' : '#f0f8ff',
              color: isTestingNotification ? '#FFFFFF' : '#2847ef',
              fontSize: '14px',
              fontWeight: 600,
              padding: '12px 16px',
              borderRadius: '8px',
              border: `2px solid ${isTestingNotification ? '#a5a5a5' : '#2847ef'}`,
              cursor: isTestingNotification ? 'not-allowed' : 'pointer',
              width: '100%'
            }}
          >
            {isTestingNotification ? 'Sending Test...' : 'Send Test Notification'}
          </button>
        </div>

        {/* Notification Types */}
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
            Notification Types
          </h3>
          
          {notificationTypes.map((type, index) => (
            <div
              key={type.key}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                padding: '16px',
                backgroundColor: '#fafafa',
                borderRadius: '12px',
                marginBottom: index === notificationTypes.length - 1 ? 0 : '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#ddede3',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '4px'
                }}>
                  <type.icon className="w-4 h-4" style={{ color: '#a8e2bb' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#4c4c4c',
                    marginBottom: '4px'
                  }}>
                    {type.title}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#a5a5a5',
                    marginBottom: '8px'
                  }}>
                    {type.description}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#4c4c4c',
                    fontStyle: 'italic',
                    backgroundColor: '#f0f8ff',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    border: '1px solid #e0e7ff'
                  }}>
                    Example: {type.example}
                  </div>
                </div>
              </div>
              
              <label style={{
                position: 'relative',
                display: 'inline-block',
                width: '50px',
                height: '28px',
                cursor: 'pointer',
                marginLeft: '16px',
                marginTop: '8px'
              }}>
                <input
                  type="checkbox"
                  checked={settings[type.key]}
                  onChange={(e) => handleToggleNotification(type.key, e.target.checked)}
                  style={{ display: 'none' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: settings[type.key] ? '#2847ef' : '#e2e2e2',
                    borderRadius: '14px',
                    transition: 'all 0.3s ease'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: settings[type.key] ? '24px' : '2px',
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '50%',
                    transition: 'all 0.3s ease'
                  }}
                />
              </label>
            </div>
          ))}
        </div>

        {/* Notification Philosophy */}
        <div style={{
          backgroundColor: '#cae9ef',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '60px'
        }}>
          <h4 style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '8px'
          }}>
            💙 Our Notification Philosophy
          </h4>
          <p style={{
            fontSize: '14px',
            color: '#4c4c4c',
            margin: 0,
            lineHeight: '1.4'
          }}>
            All Joidu notifications use supportive, non-urgent language. We never use words like "overdue," "failed," or "missed." Instead, our reminders are gentle nudges designed to encourage rather than stress you out.
          </p>
        </div>
      </div>
    </div>
  )
}