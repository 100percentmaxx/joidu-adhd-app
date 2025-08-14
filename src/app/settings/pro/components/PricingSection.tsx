import React from 'react'
import SparkleButton from './SparkleButton'

interface PricingSectionProps {
  onStartTrial: () => void
  isSubscribing: boolean
}

export default function PricingSection({ onStartTrial, isSubscribing }: PricingSectionProps) {
  return (
    <div style={{ marginBottom: '24px' }}>
      {/* Pricing Container */}
      <div 
        style={{
          border: '2px solid #2847ef',
          borderRadius: '16px',
          padding: '20px',
          position: 'relative',
          backgroundColor: '#FFFFFF',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-1px)'
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(40, 71, 239, 0.15)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0px)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* Limited Time Badge */}
        <div style={{
          backgroundColor: '#fa772c',
          color: '#FFFFFF',
          fontSize: '12px',
          fontWeight: 700,
          padding: '8px 16px',
          borderRadius: '20px',
          textAlign: 'center',
          marginBottom: '20px',
          display: 'inline-block',
          width: '100%'
        }}>
          LIMITED TIME
        </div>

        {/* Price */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '16px' 
        }}>
          <div style={{
            color: '#2847ef',
            fontSize: '48px',
            fontWeight: 700,
            lineHeight: '1',
            marginBottom: '8px'
          }}>
            $4.99
          </div>
          
          <div style={{
            color: '#a5a5a5',
            fontSize: '16px',
            fontWeight: 400,
            marginBottom: '12px'
          }}>
            per month
          </div>
          
          <div style={{
            color: '#a5a5a5',
            fontSize: '14px',
            fontWeight: 400
          }}>
            Cancel anytime • First week free
          </div>
        </div>

        {/* Start Free Trial Button */}
        <div style={{ marginBottom: '0' }}>
          <SparkleButton 
            onClick={onStartTrial}
            disabled={isSubscribing}
          >
            {isSubscribing ? 'Starting Trial...' : 'Start Free Trial'}
          </SparkleButton>
        </div>
      </div>
    </div>
  )
}