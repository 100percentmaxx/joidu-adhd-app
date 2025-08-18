'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function EmailSupportPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [priority, setPriority] = useState('Normal')
  const [includeData, setIncludeData] = useState(true)
  const [userEmail, setUserEmail] = useState('user@example.com') // This would be auto-populated
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleBack = () => {
    router.push('/settings/help')
  }

  const categories = [
    {
      id: 'technical',
      title: 'Technical Issue',
      description: 'Bug reports, app not working, crashes'
    },
    {
      id: 'account',
      title: 'Account Help',
      description: 'Login, settings, data sync issues'
    },
    {
      id: 'feature',
      title: 'Feature Question',
      description: 'How to use specific features'
    },
    {
      id: 'accessibility',
      title: 'Accessibility Support',
      description: 'ADHD accommodations, usability'
    },
    {
      id: 'billing',
      title: 'Billing & Subscription',
      description: 'Payment, upgrades, cancellations'
    },
    {
      id: 'feedback',
      title: 'General Feedback',
      description: 'Suggestions, compliments, concerns'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedCategory || !subject.trim() || !message.trim()) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      setTimeout(() => {
        router.push('/settings/help')
      }, 3000)
    }, 2000)
  }

  const getPlaceholderText = () => {
    switch (selectedCategory) {
      case 'technical':
        return 'Please describe what happened, when it occurred, and any error messages you saw...'
      case 'account':
        return 'Tell us about the account issue you\'re experiencing...'
      case 'feature':
        return 'Which feature would you like help with? What are you trying to accomplish?'
      case 'accessibility':
        return 'How can we make Joidu work better for your ADHD needs?'
      case 'billing':
        return 'Please describe your billing question or concern...'
      case 'feedback':
        return 'We\'d love to hear your thoughts, suggestions, or feedback...'
      default:
        return 'Please provide as much detail as possible so we can help you effectively...'
    }
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#cae9ef', padding: '20px' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '2px solid #e2e2e2',
          padding: '40px',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <Image
              src="/icons/celebration.svg"
              alt="Success"
              width={64}
              height={64}
              style={{ margin: '0 auto' }}
            />
          </div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '16px'
          }}>
            Support Request Sent! 🎉
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#4c4c4c',
            marginBottom: '24px',
            lineHeight: '1.4'
          }}>
            Thank you for reaching out. Our ADHD-aware support team will respond to your email within 24 hours.
          </p>
          <p style={{
            fontSize: '14px',
            color: '#a5a5a5',
            margin: 0
          }}>
            Redirecting you back to Help & Support...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#cae9ef' }}>
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
          Email Support
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
                src="/icons/email.svg"
                alt="Email"
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
              Get Personalized Help
            </h1>
            
            <p style={{
              fontSize: '16px',
              fontWeight: 400,
              color: '#a5a5a5',
              margin: 0
            }}>
              Our ADHD-aware support team is here to help you succeed
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Support Category Selection */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#4c4c4c',
                marginBottom: '24px'
              }}>
                What can we help you with?
              </h2>

              {categories.map((category) => (
                <label
                  key={category.id}
                  style={{
                    display: 'block',
                    backgroundColor: selectedCategory === category.id ? '#f0f8ff' : '#fafafa',
                    border: selectedCategory === category.id ? '2px solid #2847ef' : '2px solid #e2e2e2',
                    borderRadius: '12px',
                    padding: '16px',
                    marginBottom: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="radio"
                      name="category"
                      value={category.id}
                      checked={selectedCategory === category.id}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      style={{ marginRight: '12px' }}
                    />
                    <div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#4c4c4c',
                        marginBottom: '4px'
                      }}>
                        {category.title}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#a5a5a5'
                      }}>
                        {category.description}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {/* Form Fields */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: 600,
                color: '#4c4c4c',
                marginBottom: '8px'
              }}>
                Subject *
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief description of your request..."
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #e2e2e2',
                  fontSize: '16px',
                  marginBottom: '16px'
                }}
              />

              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: 600,
                color: '#4c4c4c',
                marginBottom: '8px'
              }}>
                Tell us more *
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={getPlaceholderText()}
                required
                rows={6}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #e2e2e2',
                  fontSize: '16px',
                  marginBottom: '16px',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />

              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: 600,
                color: '#4c4c4c',
                marginBottom: '8px'
              }}>
                Priority Level
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #e2e2e2',
                  fontSize: '16px',
                  marginBottom: '16px'
                }}
              >
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
              </select>

              {/* Include Data Checkbox */}
              <label 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '8px',
                  cursor: 'pointer'
                }}
                onClick={() => setIncludeData(!includeData)}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: includeData ? '#ddede3' : '#ffffff',
                    border: includeData ? '2px solid #a8e2bb' : '2px solid #a5a5a5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '8px',
                    transition: 'all 0.2s ease',
                    opacity: 1
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.8'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1'
                  }}
                >
                  {includeData && (
                    <span style={{ 
                      color: 'white', 
                      fontSize: '12px', 
                      fontWeight: 'bold',
                      lineHeight: '1'
                    }}>
                      ✓
                    </span>
                  )}
                </div>
                <span style={{
                  fontSize: '16px',
                  color: '#4c4c4c'
                }}>
                  Include my app data for faster troubleshooting
                </span>
                <input
                  type="checkbox"
                  checked={includeData}
                  onChange={(e) => setIncludeData(e.target.checked)}
                  style={{ display: 'none' }}
                  aria-label="Include app data for troubleshooting"
                />
              </label>
              <p style={{
                fontSize: '14px',
                color: '#a5a5a5',
                margin: 0,
                marginBottom: '16px',
                marginLeft: '28px'
              }}>
                {includeData 
                  ? "We'll only include anonymous usage data - no personal content"
                  : "Only your message and selected category will be sent"
                }
              </p>
            </div>

            {/* User Info Section */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: 600,
                color: '#4c4c4c',
                marginBottom: '8px'
              }}>
                Your Email
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #e2e2e2',
                  fontSize: '16px',
                  marginBottom: '8px'
                }}
              />
              <p style={{
                fontSize: '14px',
                color: '#a5a5a5',
                margin: 0
              }}>
                We typically respond within 24 hours
              </p>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end'
            }}>
              <button
                type="button"
                onClick={handleBack}
                style={{
                  backgroundColor: '#f5f5f5',
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
                disabled={isSubmitting || !selectedCategory || !subject.trim() || !message.trim()}
                style={{
                  backgroundColor: isSubmitting ? '#a5a5a5' : '#2847ef',
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
                {isSubmitting ? 'Sending...' : 'Send Support Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}