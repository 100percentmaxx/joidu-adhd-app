import React from 'react'

export default function ProHero() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      marginBottom: '32px'
    }}>
      {/* Logo Container */}
      <div 
        className="sparkle-container"
        style={{
          width: '120px',
          height: '120px',
          background: 'linear-gradient(135deg, #fa772c 0%, #2847ef 100%)',
          borderRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
          marginBottom: '24px',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.35)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0px)'
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.25)'
        }}
      >
        <img 
          src="/icons/joidu_drop_logo.svg" 
          alt="Joidu Pro" 
          style={{ 
            width: '80px', 
            height: '80px'
            // Removed filter to show original orange color
          }} 
        />

        {/* Sparkle Elements */}
        <div 
          className="sparkle-1"
          style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            width: '4px',
            height: '4px',
            backgroundColor: '#FFFFFF',
            borderRadius: '50%'
          }}
        />
        <div 
          className="sparkle-2"
          style={{
            position: 'absolute',
            top: '32px',
            left: '24px',
            width: '3px',
            height: '3px',
            backgroundColor: '#FFFFFF',
            borderRadius: '50%'
          }}
        />
        <div 
          className="sparkle-3"
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '28px',
            width: '4px',
            height: '4px',
            backgroundColor: '#FFFFFF',
            borderRadius: '50%'
          }}
        />
      </div>

      {/* Title & Description */}
      <h1 style={{
        color: '#4c4c4c',
        fontSize: '32px',
        fontWeight: 700,
        margin: 0,
        marginBottom: '12px',
        textAlign: 'center'
      }}>
        Joidu Pro
      </h1>
      
      <p style={{
        color: '#4c4c4c',
        fontSize: '16px',
        fontWeight: 400,
        margin: 0,
        marginBottom: '24px',
        textAlign: 'center',
        lineHeight: '1.4',
        maxWidth: '300px'
      }}>
        Unlock advanced features designed specifically for ADHD productivity
      </p>

      {/* Free Plan Status */}
      <div 
        style={{
          backgroundColor: '#f8f9fa',
          border: '2px solid #e2e2e2',
          borderRadius: '16px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#2847ef'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#e2e2e2'
          e.currentTarget.style.transform = 'translateY(0px)'
        }}
      >
        <img 
          src="/icons/free.svg" 
          alt="Free Plan" 
          style={{ width: '24px', height: '24px' }} 
        />
        <span style={{
          color: '#4c4c4c',
          fontSize: '16px',
          fontWeight: 500
        }}>
          Currently on Free Plan
        </span>
      </div>

      {/* Add CSS animation */}
      <style jsx>{`
        @keyframes sparkle {
          0%, 100% { 
            opacity: 0; 
            transform: scale(0) rotate(0deg); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1) rotate(180deg); 
          }
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .sparkle-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: shimmer 2s infinite;
        }

        .sparkle-1 { 
          animation: sparkle 1.5s ease-in-out infinite; 
        }
        .sparkle-2 { 
          animation: sparkle 1.5s ease-in-out infinite 0.5s; 
        }
        .sparkle-3 { 
          animation: sparkle 1.5s ease-in-out infinite 1s; 
        }
        
        @media (prefers-reduced-motion: reduce) {
          .sparkle-1, .sparkle-2, .sparkle-3 {
            animation: none;
            opacity: 0.5;
          }
          
          .sparkle-container::before {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}