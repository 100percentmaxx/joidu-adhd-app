import React from 'react'
import { ChevronRight } from 'lucide-react'

interface DisplayOptionProps {
  title: string
  subtitle: string
  type: 'toggle' | 'navigation'
  value?: boolean
  onToggle?: (value: boolean) => void
  onNavigate?: () => void
}

export default function DisplayOption({ title, subtitle, type, value, onToggle, onNavigate }: DisplayOptionProps) {
  const handleClick = () => {
    if (type === 'toggle' && onToggle) {
      onToggle(!value)
    } else if (type === 'navigation' && onNavigate) {
      onNavigate()
    }
  }

  return (
    <button
      onClick={handleClick}
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        border: '2px solid #e2e2e2',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '8px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'left',
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
          margin: 0
        }}>
          {subtitle}
        </p>
      </div>
      
      {type === 'navigation' && (
        <ChevronRight 
          className="w-4 h-4" 
          style={{ color: '#a5a5a5' }} 
        />
      )}
      
      {type === 'toggle' && (
        <div
          style={{
            width: '44px',
            height: '24px',
            backgroundColor: value ? '#2847ef' : '#a5a5a5',
            borderRadius: '12px',
            position: 'relative',
            transition: 'background-color 0.2s ease'
          }}
        >
          <div style={{
            width: '20px',
            height: '20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '50%',
            position: 'absolute',
            top: '2px',
            left: value ? '22px' : '2px',
            transition: 'left 0.2s ease'
          }} />
        </div>
      )}
    </button>
  )
}