import React from 'react'
import ProBadge from './ProBadge'

interface ProFeatureCardProps {
  icon: string
  title: string
  description: string
  spacing?: number
}

export default function ProFeatureCard({ 
  icon, 
  title, 
  description, 
  spacing = 16 
}: ProFeatureCardProps) {
  return (
    <div 
      style={{
        backgroundColor: '#FFFFFF',
        border: '2px solid #e2e2e2',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: `${spacing}px`,
        position: 'relative',
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
      {/* PRO Badge - Top Right */}
      <ProBadge 
        className="absolute top-4 right-4"
        style={{ position: 'absolute', top: '16px', right: '16px' }}
      />
      
      {/* Content */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
        paddingRight: '60px' // Space for PRO badge
      }}>
        {/* Icon */}
        <img 
          src={icon} 
          alt={title} 
          style={{ 
            width: '32px', 
            height: '32px',
            flexShrink: 0
          }} 
        />
        
        {/* Text Content */}
        <div style={{ flex: 1 }}>
          <h3 style={{
            color: '#4c4c4c',
            fontSize: '18px',
            fontWeight: 600,
            margin: 0,
            marginBottom: '8px'
          }}>
            {title}
          </h3>
          
          <p style={{
            color: '#a5a5a5',
            fontSize: '14px',
            fontWeight: 400,
            margin: 0,
            lineHeight: '1.4'
          }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}