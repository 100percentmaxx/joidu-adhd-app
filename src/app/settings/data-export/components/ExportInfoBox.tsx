import React from 'react'

export default function ExportInfoBox() {
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
        src="/icons/export.svg" 
        alt="Data Export" 
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
          Export Your Data
        </h3>
        
        <p style={{
          color: '#4c4c4c',
          fontSize: '14px',
          fontWeight: 400,
          margin: 0,
          marginBottom: '14px',
          lineHeight: '1.4'
        }}>
          Download your information in a format you can use with other apps or keep as a backup.
        </p>
        
        <p style={{
          color: '#4c4c4c',
          fontSize: '14px',
          fontWeight: 400,
          margin: 0,
          lineHeight: '1.4'
        }}>
          Your export will be sent to your registered email address. Large exports may take a few minutes to process. All exported data remains private and secure.
        </p>
      </div>
    </div>
  )
}