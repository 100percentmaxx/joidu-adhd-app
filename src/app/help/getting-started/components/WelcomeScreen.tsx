import React from 'react'
import { welcomeContent } from '../content/sections'

interface WelcomeScreenProps {
  onSelectPath: (path: 'quick' | 'complete' | 'skip') => void
}

export default function WelcomeScreen({ onSelectPath }: WelcomeScreenProps) {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      textAlign: 'center'
    }}>
      {/* Hero Section */}
      <div style={{ marginBottom: '32px' }}>
        {/* Rocket Icon with gentle bounce */}
        <div style={{
          marginBottom: '24px',
          animation: 'gentleBounce 2s ease-in-out infinite'
        }}>
          <img 
            src="/icons/rocket.svg" 
            alt="Rocket" 
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
          {welcomeContent.title}
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
          {welcomeContent.subtitle}
        </p>
      </div>

      {/* Introduction Text Box */}
      <div style={{
        backgroundColor: '#cae9ef',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '32px',
        width: '100%',
        maxWidth: '400px'
      }}>
        <p style={{
          color: '#4c4c4c',
          fontSize: '16px',
          fontWeight: 400,
          margin: 0,
          marginBottom: '16px',
          lineHeight: '1.4'
        }}>
          {welcomeContent.introText}
        </p>
        <p style={{
          color: '#4c4c4c',
          fontSize: '16px',
          fontWeight: 400,
          margin: 0,
          lineHeight: '1.4'
        }}>
          {welcomeContent.additionalText}
        </p>
      </div>

      {/* Path Selection Buttons */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        marginBottom: '48px'
      }}>
        {welcomeContent.paths.map((path) => (
          <button
            key={path.id}
            onClick={() => onSelectPath(path.id as 'quick' | 'complete' | 'skip')}
            style={{
              backgroundColor: path.color,
              color: path.textColor || 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '16px',
              fontWeight: 500,
              cursor: 'pointer',
              height: '48px',
              transition: 'all 0.2s ease',
              width: '100%'
            }}
            onMouseOver={(e) => {
              if (path.id === 'quick') {
                e.currentTarget.style.backgroundColor = '#1e3acf'
              } else if (path.id === 'complete') {
                e.currentTarget.style.backgroundColor = '#e6691a'
              } else {
                e.currentTarget.style.backgroundColor = '#d5d5d5'
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = path.color
            }}
          >
            {path.text}
          </button>
        ))}
      </div>

      {/* Gentle Bounce Animation */}
      <style jsx>{`
        @keyframes gentleBounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
          60% {
            transform: translateY(-4px);
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