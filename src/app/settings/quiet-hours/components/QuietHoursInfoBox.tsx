import React from 'react'

export default function QuietHoursInfoBox() {
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
        src="/icons/quiet.svg" 
        alt="Quiet Hours" 
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
          Protect Your Focus Time
        </h3>
        
        <p style={{
          color: '#4c4c4c',
          fontSize: '14px',
          fontWeight: 400,
          margin: 0,
          marginBottom: '14px',
          lineHeight: '1.4'
        }}>
          Set times when you don't want notifications or interruptions. Perfect for sleep, deep work, or recharge time.
        </p>
        
        <p style={{
          color: '#4c4c4c',
          fontSize: '14px',
          fontWeight: 400,
          margin: 0,
          lineHeight: '1.4'
        }}>
          Hyperfocus detection helps protect your flow states, while emergency override ensures you don't miss truly urgent deadlines.
        </p>
      </div>
    </div>
  )
}