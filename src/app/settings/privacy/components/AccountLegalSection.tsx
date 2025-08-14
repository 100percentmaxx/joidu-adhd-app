import React from 'react'
import { ChevronRight } from 'lucide-react'

interface AccountLegalSectionProps {
  onPrivacyPolicy: () => void
  onDeleteAccount: () => void
}

export default function AccountLegalSection({
  onPrivacyPolicy,
  onDeleteAccount
}: AccountLegalSectionProps) {
  return (
    <div style={{ marginBottom: '60px' }}>
      <h2 style={{
        color: '#4c4c4c',
        fontSize: '20px',
        fontWeight: 600,
        marginBottom: '20px'
      }}>
        Account & Legal
      </h2>

      {/* Privacy Policy Row */}
      <button
        onClick={onPrivacyPolicy}
        style={{
          width: '100%',
          backgroundColor: '#FFFFFF',
          border: '2px solid #e2e2e2',
          borderRadius: '16px',
          padding: '20px',
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
            Privacy Policy
          </h3>
          <p style={{
            color: '#a5a5a5',
            fontSize: '14px',
            fontWeight: 400,
            margin: 0
          }}>
            Read our privacy commitment
          </p>
        </div>
        
        <ChevronRight 
          className="w-4 h-4" 
          style={{ color: '#a5a5a5' }} 
        />
      </button>

      {/* Delete Account & Data Row */}
      <button
        onClick={onDeleteAccount}
        style={{
          width: '100%',
          backgroundColor: '#FFFFFF',
          border: '2px solid #e2e2e2',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '60px',
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
            Delete Account & Data
          </h3>
          <p style={{
            color: '#a5a5a5',
            fontSize: '14px',
            fontWeight: 400,
            margin: 0
          }}>
            Permanently remove all your information
          </p>
        </div>
        
        <ChevronRight 
          className="w-4 h-4" 
          style={{ color: '#a5a5a5' }} 
        />
      </button>
    </div>
  )
}