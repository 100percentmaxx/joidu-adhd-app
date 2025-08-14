import React from 'react'

export default function PersonalizationInfoBox() {
  return (
    <div 
      style={{
        backgroundColor: '#cae9ef',
        borderRadius: '16px',
        padding: '16px',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'flex-start'
      }}
    >
      {/* Brain Icon */}
      <div style={{ marginRight: '12px', flexShrink: 0 }}>
        <img 
          src="/icons/brain.svg" 
          alt="brain" 
          style={{ width: '32px', height: '32px' }} 
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <h3 style={{
          color: '#4c4c4c',
          fontSize: '18px',
          fontWeight: 600,
          margin: 0,
          marginBottom: '8px'
        }}>
          Personalize for Your Brain
        </h3>
        
        <p style={{
          color: '#4c4c4c',
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '1.4',
          margin: 0,
          marginBottom: '24px'
        }}>
          Adjust these settings to match how your ADHD brain works best. These help Kai provide better support and understand your unique ADHD patterns. This will allow Kai to provide more personalized support.
        </p>
        
        <p style={{
          color: '#4c4c4c',
          fontSize: '14px',
          fontWeight: 400,
          margin: 0
        }}>
          You can change them anytime.
        </p>
      </div>
    </div>
  )
}