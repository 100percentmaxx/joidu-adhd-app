import React from 'react'

export default function HelpInfoBox() {
  return (
    <div style={{
      backgroundColor: '#cae9ef',
      borderRadius: '16px',
      padding: '16px',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px'
    }}>
      {/* Help Icon */}
      <img 
        src="/icons/help.svg" 
        alt="help" 
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
          We're Here to Help
        </h3>
        
        <p style={{
          color: '#4c4c4c',
          fontSize: '14px',
          fontWeight: 400,
          margin: 0,
          marginBottom: '8px',
          lineHeight: '1.4'
        }}>
          Find answers, get support, and learn how to make the most of Joidu for your ADHD brain.
        </p>
        
        <p style={{
          color: '#4c4c4c',
          fontSize: '14px',
          fontWeight: 400,
          margin: 0,
          lineHeight: '1.4'
        }}>
          Our team understands ADHD challenges and is here to support you every step of the way.
        </p>
      </div>
    </div>
  )
}