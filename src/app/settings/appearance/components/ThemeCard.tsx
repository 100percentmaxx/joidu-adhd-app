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
  const getPreviewColors = () => {
    switch (theme) {
      case 'light':
        return {
          bg: '#fefbf7',
          card: '#FFFFFF',
          text: '#4c4c4c',
          accent: '#2847ef'
        }
      case 'dark':
        return {
          bg: '#1a1a1a',
          card: '#2a2a2a',
          text: '#e8e8e8',
          accent: '#4a67ff'
        }
      case 'auto':
        return {
          bg: 'linear-gradient(45deg, #fefbf7 50%, #1a1a1a 50%)',
          card: '#FFFFFF',
          text: '#4c4c4c',
          accent: '#2847ef'
        }
    }
  }

  const previewColors = getPreviewColors()

  return (
    <button
      onClick={onSelect}
      style={{
        backgroundColor: isSelected ? 'var(--info-light)' : 'var(--card-background)',
        border: isSelected ? '2px solid var(--primary-blue)' : '2px solid var(--border-color)',
        borderRadius: '12px',
        padding: '16px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        width: '100%',
        minHeight: 'auto',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = 'var(--primary-blue)'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = 'var(--border-color)'
          e.currentTarget.style.transform = 'translateY(0px)'
        }
      }}
    >
      {/* Theme Preview */}
      <div style={{
        width: '60px',
        height: '40px',
        borderRadius: '8px',
        background: previewColors.bg,
        border: '1px solid var(--border-color)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Preview Card */}
        <div style={{
          position: 'absolute',
          top: '6px',
          left: '6px',
          right: '6px',
          bottom: '6px',
          backgroundColor: previewColors.card,
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Preview Accent */}
          <div style={{
            width: '16px',
            height: '2px',
            backgroundColor: previewColors.accent,
            borderRadius: '1px'
          }} />
        </div>
      </div>
      
      {/* Title */}
      <h3 style={{
        color: 'var(--text-primary)',
        fontSize: '16px',
        fontWeight: 600,
        margin: 0
      }}>
        {title}
      </h3>
      
      {/* Subtitle */}
      <p style={{
        color: 'var(--text-secondary)',
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