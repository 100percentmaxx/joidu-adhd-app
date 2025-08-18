'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function ReportBugPage() {
  const router = useRouter()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [description, setDescription] = useState('')
  const [severity, setSeverity] = useState('Medium')
  const [includeDeviceInfo, setIncludeDeviceInfo] = useState(true)
  const [userEmail, setUserEmail] = useState('user@example.com') // Auto-populated
  const [emailOnFix, setEmailOnFix] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Auto-populated device info
  const [deviceInfo] = useState({
    device: 'iPhone 14',
    os: 'iOS 16.5',
    appVersion: 'Joidu v1.2.1',
    browser: 'Safari 16.5'
  })

  const handleBack = () => {
    router.push('/settings/help')
  }

  const bugCategories = [
    {
      id: 'crashes',
      title: 'App Crashes',
      description: 'App closes unexpectedly or freezes'
    },
    {
      id: 'navigation',
      title: 'Navigation Issues',
      description: 'Problems moving between screens'
    },
    {
      id: 'tasks',
      title: 'Task Management',
      description: 'Tasks not saving, completing, or displaying correctly'
    },
    {
      id: 'focus',
      title: 'Focus Timer',
      description: 'Timer not working, notifications missing'
    },
    {
      id: 'habits',
      title: 'Habits Tracking',
      description: 'Habits not recording or showing wrong data'
    },
    {
      id: 'ai',
      title: 'KaiHelp/AI',
      description: 'Chat not responding or giving errors'
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Configuration options not working'
    },
    {
      id: 'sync',
      title: 'Data Sync',
      description: 'Problems with cloud sync or data loss'
    },
    {
      id: 'performance',
      title: 'Performance',
      description: 'App running slowly or using too much battery'
    },
    {
      id: 'ui',
      title: 'Visual/UI Issues',
      description: 'Display problems, text overlapping, colors wrong'
    }
  ]

  const severityOptions = [
    { id: 'Low', label: 'Low - Minor inconvenience' },
    { id: 'Medium', label: 'Medium - Affects my daily use' },
    { id: 'High', label: 'High - Prevents me from using the app' }
  ]

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedCategories.length === 0 || !description.trim()) {
      alert('Please select at least one bug category and describe the issue')
      return
    }

    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
    }, 2000)
  }

  const handleReportAnother = () => {
    setShowSuccess(false)
    setSelectedCategories([])
    setDescription('')
    setSeverity('Medium')
    setEmailOnFix(false)
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#f4b7ae', padding: '20px' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '2px solid #e2e2e2',
          padding: '40px',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <Image
              src="/icons/celebrate.svg"
              alt="Success"
              width={48}
              height={48}
              style={{ margin: '0 auto' }}
            />
          </div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '16px'
          }}>
            Bug Report Sent!
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#4c4c4c',
            marginBottom: '32px',
            lineHeight: '1.4'
          }}>
            Thank you for helping us improve Joidu. We'll investigate this issue and work on a fix.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button
              onClick={handleReportAnother}
              style={{
                backgroundColor: '#e74c3c',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: 600,
                padding: '12px 24px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Report Another Bug
            </button>
            <button
              onClick={handleBack}
              style={{
                backgroundColor: '#e2e2e2',
                color: '#4c4c4c',
                fontSize: '16px',
                fontWeight: 600,
                padding: '12px 24px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Back to Help
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f4b7ae' }}>
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
          Report Bug
        </h1>
        <div style={{ width: '40px' }}></div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '2px solid #e2e2e2',
          padding: '20px'
        }}>
          {/* Hero Section */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ marginBottom: '24px' }}>
              <Image
                src="/icons/bug.svg"
                alt="Bug"
                width={64}
                height={64}
                style={{ margin: '0 auto' }}
              />
            </div>
            
            <h1 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#4c4c4c',
              margin: 0,
              marginBottom: '16px'
            }}>
              Help Us Fix Issues Quickly
            </h1>
            
            <p style={{
              fontSize: '16px',
              fontWeight: 400,
              color: '#a5a5a5',
              margin: 0
            }}>
              Your bug reports help make Joidu better for everyone
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Bug Category Selection */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#4c4c4c',
                marginBottom: '24px'
              }}>
                What type of issue are you experiencing?
              </h2>

              <div style={{ display: 'grid', gap: '8px' }}>
                {bugCategories.map((category) => (
                  <label
                    key={category.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: selectedCategories.includes(category.id) ? '#f0f8ff' : '#fafafa',
                      border: selectedCategories.includes(category.id) ? '2px solid #2847ef' : '2px solid #e2e2e2',
                      borderRadius: '12px',
                      padding: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: selectedCategories.includes(category.id) ? '#a8e2bb' : '#ffffff',
                        border: selectedCategories.includes(category.id) ? 'none' : '2px solid #e2e2e2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '12px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {selectedCategories.includes(category.id) && (
                        <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>✓</span>
                      )}
                    </div>
                    <div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#4c4c4c',
                        marginBottom: '2px'
                      }}>
                        {category.title}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#a5a5a5'
                      }}>
                        {category.description}
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryToggle(category.id)}
                      style={{ display: 'none' }}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Device Info Section */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#4c4c4c',
                marginBottom: '12px'
              }}>
                Device Information
              </h3>
              
              <div style={{ 
                backgroundColor: '#fafafa', 
                borderRadius: '8px', 
                padding: '12px',
                marginBottom: '12px'
              }}>
                <div style={{ fontSize: '14px', color: '#4c4c4c', marginBottom: '4px' }}>
                  <strong>Device:</strong> {deviceInfo.device}
                </div>
                <div style={{ fontSize: '14px', color: '#4c4c4c', marginBottom: '4px' }}>
                  <strong>OS:</strong> {deviceInfo.os}
                </div>
                <div style={{ fontSize: '14px', color: '#4c4c4c', marginBottom: '4px' }}>
                  <strong>App Version:</strong> {deviceInfo.appVersion}
                </div>
                <div style={{ fontSize: '14px', color: '#4c4c4c' }}>
                  <strong>Browser:</strong> {deviceInfo.browser}
                </div>
              </div>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: includeDeviceInfo ? '#a8e2bb' : '#ffffff',
                    border: includeDeviceInfo ? 'none' : '2px solid #e2e2e2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {includeDeviceInfo && (
                    <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>✓</span>
                  )}
                </div>
                <span style={{ fontSize: '14px', color: '#4c4c4c' }}>
                  Include this device info
                </span>
                <input
                  type="checkbox"
                  checked={includeDeviceInfo}
                  onChange={(e) => setIncludeDeviceInfo(e.target.checked)}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            {/* Bug Description */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: 700,
                color: '#4c4c4c',
                marginBottom: '8px'
              }}>
                Tell us what happened
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe what you were trying to do when the bug occurred. Include:&#10;• What you expected to happen&#10;• What actually happened&#10;• Steps to reproduce the issue&#10;• Any error messages you saw"
                required
                rows={6}
                maxLength={1000}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #e2e2e2',
                  fontSize: '14px',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
              <div style={{
                fontSize: '12px',
                color: '#a5a5a5',
                textAlign: 'right',
                marginTop: '4px'
              }}>
                {description.length}/1000 characters
              </div>
            </div>

            {/* Severity Selection */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#4c4c4c',
                marginBottom: '12px'
              }}>
                How urgent is this issue?
              </h3>

              {severityOptions.map((option) => (
                <label
                  key={option.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: severity === option.id ? '#a8e2bb' : '#ffffff',
                      border: severity === option.id ? 'none' : '2px solid #e2e2e2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '8px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {severity === option.id && (
                      <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>✓</span>
                    )}
                  </div>
                  <span style={{ fontSize: '14px', color: '#4c4c4c' }}>
                    {option.label}
                  </span>
                  <input
                    type="radio"
                    name="severity"
                    value={option.id}
                    checked={severity === option.id}
                    onChange={(e) => setSeverity(e.target.value)}
                    style={{ display: 'none' }}
                  />
                </label>
              ))}
            </div>

            {/* Helpful Info Box */}
            <div style={{
              backgroundColor: '#cae9ef',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#4c4c4c',
                marginBottom: '8px'
              }}>
                💡 Helpful tip:
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#4c4c4c',
                margin: 0,
                lineHeight: '1.4'
              }}>
                The more details you provide, the faster we can fix the issue. Screenshots or screen recordings are especially helpful if you can include them!
              </p>
            </div>

            {/* Optional Contact */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#4c4c4c',
                marginBottom: '12px'
              }}>
                Follow up (optional)
              </h3>
              
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="your.email@example.com"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #e2e2e2',
                  fontSize: '14px',
                  marginBottom: '12px'
                }}
              />

              <label style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px',
                cursor: 'pointer'
              }}>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: emailOnFix ? '#a8e2bb' : '#ffffff',
                    border: emailOnFix ? 'none' : '2px solid #e2e2e2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {emailOnFix && (
                    <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>✓</span>
                  )}
                </div>
                <span style={{ fontSize: '14px', color: '#4c4c4c' }}>
                  Email me when this bug is fixed
                </span>
                <input
                  type="checkbox"
                  checked={emailOnFix}
                  onChange={(e) => setEmailOnFix(e.target.checked)}
                  style={{ display: 'none' }}
                />
              </label>
              
              <p style={{
                fontSize: '12px',
                color: '#a5a5a5',
                margin: 0,
                marginLeft: '28px'
              }}>
                We'll only contact you about this specific issue
              </p>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'flex-end'
            }}>
              <button
                type="button"
                onClick={handleBack}
                style={{
                  backgroundColor: '#e2e2e2',
                  color: '#4c4c4c',
                  fontSize: '16px',
                  fontWeight: 600,
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || selectedCategories.length === 0 || !description.trim()}
                style={{
                  backgroundColor: isSubmitting ? '#a5a5a5' : '#e74c3c',
                  color: '#FFFFFF',
                  fontSize: '16px',
                  fontWeight: 600,
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Bug Report'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}