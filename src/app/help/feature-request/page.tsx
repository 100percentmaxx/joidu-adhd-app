'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function FeatureRequestPage() {
  const router = useRouter()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [description, setDescription] = useState('')
  const [impact, setImpact] = useState('Helpful')
  const [userTypes, setUserTypes] = useState<string[]>([])
  const [userEmail, setUserEmail] = useState('user@example.com') // Auto-populated
  const [emailUpdates, setEmailUpdates] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleBack = () => {
    router.push('/settings/help')
  }

  const featureCategories = [
    {
      id: 'tasks',
      title: 'Task Management',
      description: 'Better task organization, scheduling, priorities'
    },
    {
      id: 'focus',
      title: 'Focus & Productivity',
      description: 'Timer improvements, focus modes, productivity tracking'
    },
    {
      id: 'habits',
      title: 'Habits & Routines',
      description: 'Habit building, routine templates, streak tracking'
    },
    {
      id: 'ai',
      title: 'AI & KaiHelp',
      description: 'Smarter suggestions, better conversations, new AI features'
    },
    {
      id: 'navigation',
      title: 'Navigation & UI',
      description: 'App layout, screen design, ease of use improvements'
    },
    {
      id: 'analytics',
      title: 'Data & Analytics',
      description: 'Progress tracking, insights, reporting features'
    },
    {
      id: 'integrations',
      title: 'Integrations',
      description: 'Connect with other apps, calendar sync, third-party tools'
    },
    {
      id: 'accessibility',
      title: 'Accessibility',
      description: 'ADHD accommodations, visual improvements, usability'
    },
    {
      id: 'mobile',
      title: 'Mobile Experience',
      description: 'App performance, mobile-specific features'
    },
    {
      id: 'customization',
      title: 'Customization',
      description: 'Themes, settings, personalization options'
    }
  ]

  const impactOptions = [
    { id: 'Nice to have', label: 'Nice to have - Would be a small improvement' },
    { id: 'Helpful', label: 'Helpful - Would improve my daily experience' },
    { id: 'Game changer', label: 'Game changer - Would significantly impact how I use Joidu' }
  ]

  const userTypeOptions = [
    { id: 'student', title: 'Student', description: 'Academic tasks and study management' },
    { id: 'professional', title: 'Professional', description: 'Work projects and career productivity' },
    { id: 'parent', title: 'Parent', description: 'Family organization and household management' },
    { id: 'creative', title: 'Creative', description: 'Artistic projects and creative workflows' },
    { id: 'freelancer', title: 'Freelancer', description: 'Client work and business management' },
    { id: 'other', title: 'Other', description: 'Different use case' }
  ]

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleUserTypeToggle = (typeId: string) => {
    setUserTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedCategories.length === 0 || !description.trim()) {
      alert('Please select at least one category and describe your feature idea')
      return
    }

    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
    }, 2000)
  }

  const handleSuggestAnother = () => {
    setShowSuccess(false)
    setSelectedCategories([])
    setDescription('')
    setImpact('Helpful')
    setUserTypes([])
    setEmailUpdates(false)
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#fef7d6', padding: '20px' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '2px solid var(--border-color)',
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
            Feature Request Sent!
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#4c4c4c',
            marginBottom: '32px',
            lineHeight: '1.4'
          }}>
            Thank you for helping shape Joidu's future! We review all suggestions and prioritize based on community needs.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button
              onClick={handleSuggestAnother}
              style={{
                backgroundColor: 'var(--primary-blue)',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: 600,
                padding: '12px 24px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Suggest Another Feature
            </button>
            <button
              onClick={handleBack}
              style={{
                backgroundColor: 'var(--button-secondary-bg)',
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
    <div className="min-h-screen" style={{ backgroundColor: '#fef7d6' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <button 
          onClick={handleBack}
          className="flex items-center justify-center w-10 h-10"
        >
          <ArrowLeft className="w-6 h-6" style={{ color: 'var(--primary-blue)' }} />
        </button>
        <h1 style={{ 
          color: 'var(--primary-blue)', 
          fontSize: '17px', 
          fontWeight: 600 
        }}>
          Feature Request
        </h1>
        <div style={{ width: '40px' }}></div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '2px solid var(--border-color)',
          padding: '20px'
        }}>
          {/* Hero Section */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ 
              marginBottom: '24px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#ffffff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Image
                  src="/icons/ideas_color.svg"
                  alt="Ideas"
                  width={64}
                  height={64}
                />
              </div>
            </div>
            
            <h1 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#4c4c4c',
              margin: 0,
              marginBottom: '16px'
            }}>
              Suggest New Features
            </h1>
            
            <p style={{
              fontSize: '16px',
              fontWeight: 400,
              color: '#a5a5a5',
              margin: 0
            }}>
              Help us build the perfect ADHD productivity app together
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Feature Category Selection */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#4c4c4c',
                marginBottom: '24px'
              }}>
                What area would you like us to improve?
              </h2>

              <div style={{ display: 'grid', gap: '8px' }}>
                {featureCategories.map((category) => (
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
                        backgroundColor: selectedCategories.includes(category.id) ? '#ddede3' : '#ffffff',
                        border: selectedCategories.includes(category.id) ? '2px solid #a8e2bb' : '2px solid #a5a5a5',
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

            {/* Feature Description */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: 700,
                color: '#4c4c4c',
                marginBottom: '8px'
              }}>
                Describe your feature idea
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us about your feature idea! Include:&#10;• What problem would this solve for you?&#10;• How would you like it to work?&#10;• Why would this help ADHD users specifically?&#10;• Any examples from other apps you like?"
                required
                rows={6}
                maxLength={1500}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid var(--border-color)',
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
                {description.length}/1500 characters
              </div>
            </div>

            {/* Impact Assessment */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#4c4c4c',
                marginBottom: '12px'
              }}>
                How much would this help you?
              </h3>

              {impactOptions.map((option) => (
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
                      backgroundColor: impact === option.id ? '#ddede3' : '#ffffff',
                      border: impact === option.id ? '2px solid #a8e2bb' : '2px solid #a5a5a5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '8px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {impact === option.id && (
                      <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>✓</span>
                    )}
                  </div>
                  <span style={{ fontSize: '14px', color: '#4c4c4c' }}>
                    {option.label}
                  </span>
                  <input
                    type="radio"
                    name="impact"
                    value={option.id}
                    checked={impact === option.id}
                    onChange={(e) => setImpact(e.target.value)}
                    style={{ display: 'none' }}
                  />
                </label>
              ))}
            </div>

            {/* User Type Selection */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#4c4c4c',
                marginBottom: '12px'
              }}>
                How do you primarily use Joidu?
              </h3>

              <div style={{ display: 'grid', gap: '8px' }}>
                {userTypeOptions.map((type) => (
                  <label
                    key={type.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: userTypes.includes(type.id) ? '#f0f8ff' : '#fafafa',
                      border: userTypes.includes(type.id) ? '2px solid #2847ef' : '2px solid #e2e2e2',
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
                        backgroundColor: userTypes.includes(type.id) ? '#ddede3' : '#ffffff',
                        border: userTypes.includes(type.id) ? '2px solid #a8e2bb' : '2px solid #a5a5a5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '12px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {userTypes.includes(type.id) && (
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
                        {type.title}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#a5a5a5'
                      }}>
                        {type.description}
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={userTypes.includes(type.id)}
                      onChange={() => handleUserTypeToggle(type.id)}
                      style={{ display: 'none' }}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Inspiration Box */}
            <div style={{
              backgroundColor: '#cae9ef',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <Image
                  src="/icons/ideas_color.svg"
                  alt="Ideas"
                  width={20}
                  height={20}
                  style={{ marginRight: '8px' }}
                />
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#4c4c4c',
                  margin: 0
                }}>
                  Need inspiration?
                </h3>
              </div>
              <p style={{
                fontSize: '14px',
                color: '#4c4c4c',
                margin: 0,
                lineHeight: '1.4'
              }}>
                Think about your biggest ADHD challenges with productivity apps. What always frustrates you? What do you wish existed? Your lived experience is valuable!
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
                Stay in the loop (optional)
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
                  border: '2px solid var(--border-color)',
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
                    backgroundColor: emailUpdates ? '#ddede3' : '#ffffff',
                    border: emailUpdates ? '2px solid #a8e2bb' : '2px solid #a5a5a5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {emailUpdates && (
                    <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>✓</span>
                  )}
                </div>
                <span style={{ fontSize: '14px', color: '#4c4c4c' }}>
                  Email me about updates to this feature
                </span>
                <input
                  type="checkbox"
                  checked={emailUpdates}
                  onChange={(e) => setEmailUpdates(e.target.checked)}
                  style={{ display: 'none' }}
                />
              </label>
              
              <p style={{
                fontSize: '12px',
                color: '#a5a5a5',
                margin: 0,
                marginLeft: '28px'
              }}>
                We'll only contact you about features you've requested
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
                  backgroundColor: 'var(--button-secondary-bg)',
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
                  backgroundColor: isSubmitting ? 'var(--text-secondary)' : 'var(--primary-blue)',
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
                {isSubmitting ? 'Submitting...' : 'Submit Feature Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}