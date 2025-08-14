import React from 'react'

interface ThemeCardProps {
  theme: 'light' | 'dark' | 'auto'
  title: string
  subtitle: string
  iconSrc: string
  isSelected: boolean
  onSelect: () => void
}

export default function ThemeCard({ theme, title, subtitle, iconSrc, isSelected, onSelect }: ThemeCardProps) {
  return (
    <button
      onClick={onSelect}
      style={{
        backgroundColor: isSelected ? '#cae9ef' : '#FFFFFF',
        border: isSelected ? '2px solid #2847ef' : '2px solid #e2e2e2',
        borderRadius: '12px',
        padding: '16px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
        minHeight: 'auto',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = '#2847ef'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = '#e2e2e2'
          e.currentTarget.style.transform = 'translateY(0px)'
        }
      }}
    >
      {/* Icon */}
      <img 
        src={iconSrc} 
        alt={`${title} theme`} 
        style={{ 
          width: '48px', 
          height: '48px' 
        }} 
      />
      
      {/* Title */}
      <h3 style={{
        color: '#4c4c4c',
        fontSize: '16px',
        fontWeight: 600,
        margin: 0
      }}>
        {title}
      </h3>
      
      {/* Subtitle */}
      <p style={{
        color: '#a5a5a5',
        fontSize: '12px',
        fontWeight: 400,
        margin: 0,
        textAlign: 'center'
      }}>
        {subtitle}
      </p>
    </button>
  )
}