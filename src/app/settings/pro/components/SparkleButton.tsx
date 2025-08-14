import React from 'react'

interface SparkleButtonProps {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  className?: string
}

export default function SparkleButton({ 
  children, 
  onClick, 
  disabled = false, 
  className = '' 
}: SparkleButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`sparkle-button ${className}`}
      style={{
        background: 'linear-gradient(90deg, #fa772c 0%, #2847ef 100%)',
        boxShadow: '0 6px 16px rgba(40, 71, 239, 0.3)',
        border: 'none',
        borderRadius: '16px',
        color: '#FFFFFF',
        fontSize: '18px',
        fontWeight: 700,
        height: '56px',
        width: '100%',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.2s ease'
      }}
    >
      {children}
      
      {/* Sparkle Elements */}
      <div 
        className="sparkle-1"
        style={{
          position: 'absolute',
          top: '8px',
          right: '16px',
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
          top: '16px',
          left: '32px',
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
          bottom: '12px',
          right: '32px',
          width: '4px',
          height: '4px',
          backgroundColor: '#FFFFFF',
          borderRadius: '50%'
        }}
      />

      {/* CSS Animations */}
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

        .sparkle-button::before {
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

        .sparkle-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(40, 71, 239, 0.4);
        }

        @media (prefers-reduced-motion: reduce) {
          .sparkle-1, .sparkle-2, .sparkle-3 {
            animation: none;
            opacity: 0.5;
          }
          
          .sparkle-button::before {
            animation: none;
          }
          
          .sparkle-button:hover {
            transform: none;
          }
        }
      `}</style>
    </button>
  )
}