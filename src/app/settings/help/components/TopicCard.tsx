import React from 'react'
import { ChevronRight } from 'lucide-react'

interface TopicCardProps {
  icon: string
  title: string
  description: string
  onClick: () => void
  spacing?: number
}

export default function TopicCard({ 
  icon, 
  title, 
  description, 
  onClick, 
  spacing = 8 
}: TopicCardProps) {
  return (
    <button
      onClick={onClick}
      className="help-card"
      style={{
        width: '100%',
        backgroundColor: 'white',
        border: '2px solid #e2e2e2',
        borderRadius: '16px',
        padding: '16px',
        marginBottom: `${spacing}px`,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        textAlign: 'left',
        cursor: 'pointer',
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
          fontSize: '16px',
          fontWeight: 500,
          margin: 0,
          marginBottom: '4px'
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
      
      {/* Chevron */}
      <ChevronRight style={{ 
        width: '16px', 
        height: '16px', 
        color: '#a5a5a5',
        flexShrink: 0
      }} />
    </button>
  )
}