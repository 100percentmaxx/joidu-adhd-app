import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { completionContent } from '../content/sections'

interface CompletionScreenProps {
  onStartUsing: () => void
}

export default function CompletionScreen({ onStartUsing }: CompletionScreenProps) {
  const router = useRouter()
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Stop confetti animation after 3 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleBookmark = () => {
    // Save bookmark in localStorage
    try {
      localStorage.setItem('joidu-bookmarked-guide', 'true')
      alert('Guide bookmarked! You can find it in Help & Support.')
    } catch (error) {
      console.error('Error bookmarking guide:', error)
    }
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Confetti Animation */}
      {showConfetti && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '200px',
          pointerEvents: 'none',
          zIndex: 1
        }}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '-10px',
                left: `${Math.random() * 100}%`,
                width: '8px',
                height: '8px',
                backgroundColor: ['#2847ef', '#fa772c', '#a8e2bb', '#f9c075', '#c8bfef'][i % 5],
                animation: `confettiFall 3s linear infinite ${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Celebration Header */}
      <div style={{ marginBottom: '32px', position: 'relative', zIndex: 2 }}>
        {/* Celebration Icon */}
        <div style={{
          marginBottom: '24px',
          animation: showConfetti ? 'celebrationPulse 1s ease-in-out infinite' : 'none'
        }}>
          <img 
            src="/icons/celebration.svg" 
            alt="Celebration" 
            style={{ 
              width: '64px', 
              height: '64px'
            }} 
          />
        </div>

        {/* Title */}
        <h1 style={{
          color: '#2847ef',
          fontSize: '28px',
          fontWeight: 700,
          margin: 0,
          marginBottom: '12px',
          lineHeight: '1.3'
        }}>
          {completionContent.title}
        </h1>

        {/* Subtitle */}
        <p style={{
          color: '#a5a5a5',
          fontSize: '16px',
          fontWeight: 400,
          margin: 0,
          lineHeight: '1.4',
          maxWidth: '320px'
        }}>
          {completionContent.subtitle}
        </p>
      </div>

      {/* Ready Checklist */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px',
        width: '100%',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
      }}>
        <h3 style={{
          color: '#4c4c4c',
          fontSize: '18px',
          fontWeight: 600,
          margin: 0,
          marginBottom: '16px'
        }}>
          You're ready to:
        </h3>
        
        <ul style={{
          margin: 0,
          paddingLeft: '0',
          listStyle: 'none'
        }}>
          {completionContent.checklist.map((item, index) => (
            <li key={index} style={{
              display: 'flex',
              alignItems: 'flex-start',
              color: '#4c4c4c',
              fontSize: '16px',
              lineHeight: '1.4',
              marginBottom: '12px'
            }}>
              <span style={{
                color: '#4CAF50',
                fontSize: '18px',
                marginRight: '12px',
                marginTop: '-2px'
              }}>
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
        marginBottom: '24px'
      }}>
        <button
          onClick={onStartUsing}
          style={{
            backgroundColor: '#2847ef',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#1e3acf'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#2847ef'
          }}
        >
          Start Using Joidu
        </button>

        <button
          onClick={handleBookmark}
          style={{
            backgroundColor: 'transparent',
            color: '#2847ef',
            border: '2px solid #2847ef',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '16px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#2847ef'
            e.currentTarget.style.color = 'white'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = '#2847ef'
          }}
        >
          Bookmark This Guide
        </button>

        <button
          onClick={() => router.push('/kaihelp')}
          style={{
            backgroundColor: '#fa772c',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '16px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#e6691a'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#fa772c'
          }}
        >
          Chat with Kai
        </button>
      </div>

      {/* Quick Reference Card */}
      <div style={{
        backgroundColor: '#cae9ef',
        borderRadius: '16px',
        padding: '16px',
        width: '100%'
      }}>
        <h4 style={{
          color: '#4c4c4c',
          fontSize: '16px',
          fontWeight: 600,
          margin: 0,
          marginBottom: '12px'
        }}>
          📚 Quick reminders:
        </h4>
        
        <ul style={{
          margin: 0,
          paddingLeft: '0',
          listStyle: 'none'
        }}>
          {completionContent.reminders.map((reminder, index) => (
            <li key={index} style={{
              color: '#4c4c4c',
              fontSize: '14px',
              lineHeight: '1.4',
              marginBottom: '8px',
              paddingLeft: '16px',
              position: 'relative'
            }}>
              <span style={{
                position: 'absolute',
                left: '0',
                top: '0'
              }}>
                •
              </span>
              {reminder}
            </li>
          ))}
        </ul>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes confettiFall {
          to {
            transform: translateY(200px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes celebrationPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}