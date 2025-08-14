import React from 'react'
import { ChevronRight } from 'lucide-react'

export interface SettingsRowProps {
  icon: React.ReactNode
  title: string
  subtext: string
  onPress?: () => void
  showChevron?: boolean
  showToggle?: boolean
  toggleValue?: boolean
  onToggleChange?: (value: boolean) => void
}

export default function SettingsRow({
  icon,
  title,
  subtext,
  onPress,
  showChevron = false,
  showToggle = false,
  toggleValue = false,
  onToggleChange
}: SettingsRowProps) {
  const handleToggle = () => {
    if (onToggleChange) {
      onToggleChange(!toggleValue)
    }
  }

  const handlePress = () => {
    if (onPress) {
      onPress()
    }
  }

  return (
    <button
      className="settings-row"
      onClick={showToggle ? undefined : handlePress}
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        border: '2px solid #e2e2e2',
        borderRadius: '16px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        cursor: showToggle ? 'default' : 'pointer',
        minHeight: '56px',
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
      <div className="flex items-center justify-center mr-3">
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 text-left">
        <h3 style={{
          color: '#4c4c4c',
          fontSize: '16px',
          fontWeight: 600,
          marginBottom: '2px',
          margin: 0
        }}>
          {title}
        </h3>
        <p style={{
          color: '#a5a5a5',
          fontSize: '14px',
          fontWeight: 400,
          margin: 0
        }}>
          {subtext}
        </p>
      </div>

      {/* Right Side - Toggle or Chevron */}
      {showToggle && (
        <div 
          onClick={handleToggle}
          style={{
            width: '48px',
            height: '28px',
            backgroundColor: toggleValue ? '#2847ef' : '#e2e2e2',
            borderRadius: '14px',
            position: 'relative',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              position: 'absolute',
              top: '2px',
              left: toggleValue ? '22px' : '2px',
              transition: 'left 0.2s ease',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>
      )}
      
      {showChevron && (
        <ChevronRight 
          className="w-5 h-5" 
          style={{ color: '#a5a5a5' }} 
        />
      )}
      
      {/* CSS for accessibility */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .settings-row {
            transition: none !important;
          }
          
          .settings-row:hover {
            transform: none !important;
          }
        }
      `}</style>
    </button>
  )
}