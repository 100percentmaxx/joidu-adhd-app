import React from 'react'

export default function PrivacyInfoBox() {
  return (
    <div style={{
      backgroundColor: '#cae9ef',
      borderRadius: '16px',
      padding: '16px',
      marginBottom: '32px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px'
    }}>
      {/* Icon */}
      <img 
        src="/icons/privacy.svg" 
        alt="Privacy & Security" 
        style={{ 
          width: '32px', 
          height: '32px',
          flexShrink: 0
        }} 
      />
      
      {/* Content */}
      <div style={{ flex: 1 }}>
        <h3 style={{
          color: '#4c4c4c',
          fontSize: '18px',
          fontWeight: 600,
          margin: 0,
          marginBottom: '14px'
        }}>
          Your Data, Your Control
        </h3>
        
        <p style={{
          color: '#4c4c4c',
          fontSize: '14px',
          fontWeight: 400,
          margin: 0,
          marginBottom: '14px',
          lineHeight: '1.4'
        }}>
          All your personal information stays on your device by default. You control what gets shared and when.
        </p>
        
        <p style={{
          color: '#4c4c4c',
          fontSize: '14px',
          fontWeight: 400,
          margin: 0,
          lineHeight: '1.4'
        }}>
          Joidu is built with privacy as the default. Your ADHD patterns, tasks, and personal information never leave your device unless you explicitly choose to sync across devices.
        </p>
      </div>
    </div>
  )
}