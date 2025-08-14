import React from 'react'

export default function MoneyBackGuarantee() {
  return (
    <div 
      style={{
        backgroundColor: '#f8f9fa',
        border: '2px solid #e2e2e2',
        borderRadius: '16px',
        padding: '16px',
        marginBottom: '60px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
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
      {/* Shield Icon */}
      <img 
        src="/icons/shield.svg" 
        alt="Money-back guarantee" 
        style={{ 
          width: '24px', 
          height: '24px',
          flexShrink: 0,
          marginTop: '2px'
        }} 
      />
      
      {/* Text Content */}
      <div style={{ flex: 1 }}>
        <h3 style={{
          color: '#4c4c4c',
          fontSize: '16px',
          fontWeight: 600,
          margin: 0,
          marginBottom: '4px'
        }}>
          7-Day Money-Back Guarantee
        </h3>
        
        <p style={{
          color: '#a5a5a5',
          fontSize: '14px',
          fontWeight: 400,
          margin: 0,
          lineHeight: '1.4'
        }}>
          Try Pro risk-free. If it doesn't help your ADHD brain function better, we'll refund everything.
        </p>
      </div>
    </div>
  )
}