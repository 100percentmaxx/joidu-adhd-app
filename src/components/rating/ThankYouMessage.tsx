import React, { useEffect } from 'react'

interface ThankYouMessageProps {
  onClose: () => void
}

const ThankYouMessage: React.FC<ThankYouMessageProps> = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div style={{ textAlign: 'center', padding: '32px' }}>
      {/* Success Icon */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '24px'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: '#fa772c',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
            <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Title */}
      <h2 style={{
        color: '#4c4c4c',
        fontSize: '32px',
        fontWeight: 700,
        margin: 0,
        marginBottom: '16px'
      }}>
        Thank you!
      </h2>

      {/* Message */}
      <p style={{
        color: '#4c4c4c',
        fontSize: '16px',
        fontWeight: 400,
        margin: 0,
        marginBottom: '16px',
        lineHeight: '1.4',
        maxWidth: '300px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        Your feedback helps us make Joidu even better for ADHD minds.
      </p>

      {/* Future Note */}
      <p style={{
        color: '#a5a5a5',
        fontSize: '14px',
        fontWeight: 400,
        margin: 0,
        marginBottom: '32px',
        lineHeight: '1.4'
      }}>
        App store ratings will be available when our mobile apps launch!
      </p>

      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          backgroundColor: '#2847ef',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 24px',
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
        Close
      </button>
    </div>
  )
}

export default ThankYouMessage