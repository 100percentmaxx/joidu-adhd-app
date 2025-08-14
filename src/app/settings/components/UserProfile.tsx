import React from 'react'

export default function UserProfile() {
  // Mock user data - replace with actual user data
  const userName = "Sam Chen"
  const userEmail = "sam@example.com"

  return (
    <div style={{ position: 'relative' }}>
      {/* Profile Section */}
      <div style={{ 
        marginTop: '18px', 
        marginBottom: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Avatar */}
        <div 
          className="flex items-center justify-center"
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#fa772c',
            borderRadius: '50%'
          }}
        >
          <span style={{
            color: '#FFFFFF',
            fontSize: '48px',
            fontWeight: 700
          }}>
            S
          </span>
        </div>

        {/* User Info */}
        <div style={{ 
          marginTop: '18px',
          textAlign: 'center'
        }}>
          <h2 style={{
            color: '#4c4c4c',
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '4px',
            margin: 0
          }}>
            {userName}
          </h2>
          <p style={{
            color: '#a5a5a5',
            fontSize: '14px',
            fontWeight: 400,
            margin: 0
          }}>
            {userEmail}
          </p>
        </div>

        {/* Edit Button - positioned in lower right */}
        <button
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '0',
            backgroundColor: '#e2e2e2',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            padding: '5px 13px',
            borderRadius: '8px',
            border: 'none'
          }}
          onClick={() => {
            // TODO: Navigate to profile edit
          }}
        >
          Edit
        </button>
      </div>

      {/* Divider Line */}
      <div style={{
        width: '100%',
        height: '2px',
        backgroundColor: '#e2e2e2',
        marginBottom: '24px'
      }} />
    </div>
  )
}