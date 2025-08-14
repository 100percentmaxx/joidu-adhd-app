import React, { useState, useEffect } from 'react'
import StarRating from './StarRating'
import ThankYouMessage from './ThankYouMessage'

interface RatingModalProps {
  isOpen: boolean
  onClose: () => void
}

interface RatingData {
  stars: number // 1-5
  feedback?: string
  timestamp: Date
  userId?: string
}

const RateJoiduModal: React.FC<RatingModalProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [showThankYou, setShowThankYou] = useState(false)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setRating(0)
      setFeedback('')
      setShowThankYou(false)
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const saveRating = (ratingData: RatingData) => {
    // Store locally during development
    const ratings = JSON.parse(localStorage.getItem('joidu_ratings') || '[]')
    ratings.push(ratingData)
    localStorage.setItem('joidu_ratings', JSON.stringify(ratings))
    
    console.log('Rating saved:', ratingData)
    // TODO: Replace with API call when backend is ready
    // await submitRating(ratingData)
  }

  const handleSubmitRating = () => {
    if (rating === 0) return

    const ratingData: RatingData = {
      stars: rating,
      feedback: feedback.trim() || undefined,
      timestamp: new Date()
    }

    saveRating(ratingData)
    setShowThankYou(true)
  }

  const handleMaybeLater = () => {
    onClose()
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}
        onClick={onClose}
      >
        {/* Modal Container */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
            animation: 'modalSlideIn 300ms ease-out',
            overflow: 'hidden'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {showThankYou ? (
            <ThankYouMessage onClose={onClose} />
          ) : (
            <div style={{ padding: '32px' }}>
              {/* Header Section */}
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                {/* Icon */}
                <div style={{ marginBottom: '16px' }}>
                  <img 
                    src="/icons/rate.svg" 
                    alt="Rate Joidu" 
                    style={{ 
                      width: '48px', 
                      height: '48px',
                      filter: 'brightness(0) saturate(100%) invert(51%) sepia(85%) saturate(2618%) hue-rotate(11deg) brightness(102%) contrast(95%)'
                    }} 
                  />
                </div>

                {/* Title */}
                <h2 style={{
                  color: '#4c4c4c',
                  fontSize: '28px',
                  fontWeight: 700,
                  margin: 0,
                  marginBottom: '12px'
                }}>
                  Enjoying Joidu?
                </h2>

                {/* Subtitle */}
                <p style={{
                  color: '#a5a5a5',
                  fontSize: '16px',
                  fontWeight: 400,
                  margin: 0,
                  lineHeight: '1.4',
                  maxWidth: '320px',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}>
                  Your feedback helps us build better tools for ADHD brains like yours
                </p>
              </div>

              {/* Rating Component */}
              <div style={{ marginBottom: '24px' }}>
                <StarRating 
                  rating={rating} 
                  onRatingChange={setRating}
                  size={40}
                />
              </div>

              {/* Feedback Text Area */}
              <div style={{ marginBottom: '32px' }}>
                <label style={{
                  display: 'block',
                  color: '#4c4c4c',
                  fontSize: '16px',
                  fontWeight: 500,
                  marginBottom: '8px',
                  textAlign: 'left'
                }}>
                  Tell us more (optional)
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="What do you love about Joidu? Any suggestions?"
                  rows={3}
                  style={{
                    width: '100%',
                    backgroundColor: '#f8f9fa',
                    border: '2px solid #e2e2e2',
                    borderRadius: '12px',
                    padding: '16px',
                    fontSize: '14px',
                    color: '#4c4c4c',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#2847ef'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e2e2e2'
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center'
              }}>
                <button
                  onClick={handleMaybeLater}
                  style={{
                    backgroundColor: '#e2e2e2',
                    color: '#4c4c4c',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease',
                    width: '40%',
                    height: '48px'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#d1d1d1'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#e2e2e2'
                  }}
                >
                  Maybe Later
                </button>

                <button
                  onClick={handleSubmitRating}
                  disabled={rating === 0}
                  style={{
                    backgroundColor: rating === 0 ? '#a5a5a5' : '#2847ef',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    fontWeight: 500,
                    cursor: rating === 0 ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.2s ease',
                    width: '55%',
                    height: '48px'
                  }}
                  onMouseOver={(e) => {
                    if (rating > 0) {
                      e.currentTarget.style.backgroundColor = '#1e3acf'
                    }
                  }}
                  onMouseOut={(e) => {
                    if (rating > 0) {
                      e.currentTarget.style.backgroundColor = '#2847ef'
                    }
                  }}
                >
                  Submit Rating
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  )
}

export default RateJoiduModal