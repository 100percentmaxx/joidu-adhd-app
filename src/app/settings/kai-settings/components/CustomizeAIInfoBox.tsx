import React from 'react'

export default function CustomizeAIInfoBox() {
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
        src="/icons/kai.svg" 
        alt="Kai AI" 
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
          marginBottom: '18px'
        }}>
          Customize Your AI Assistant
        </h3>
        
        <p style={{
          color: '#4c4c4c',
          fontSize: '14px',
          fontWeight: 400,
          margin: 0,
          lineHeight: '1.4'
        }}>
          Control how Kai learns from your patterns and provides suggestions.
        </p>
        
        <p style={{
          color: '#4c4c4c',
          fontSize: '12px',
          fontWeight: 400,
          margin: 0,
          marginTop: '12px',
          lineHeight: '1.3'
        }}>
          <strong>NOTE:</strong> All learning happens on your device. Your personal data never leaves your phone unless you choose to sync across devices.
        </p>
      </div>
    </div>
  )
}