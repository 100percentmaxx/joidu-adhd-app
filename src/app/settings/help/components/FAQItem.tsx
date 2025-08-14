import React from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItemProps {
  question: string
  answer: string
  isExpanded: boolean
  onToggle: () => void
  spacing?: number
}

export default function FAQItem({ 
  question, 
  answer, 
  isExpanded, 
  onToggle, 
  spacing = 8 
}: FAQItemProps) {
  return (
    <div
      className="help-card"
      style={{
        backgroundColor: 'white',
        border: '2px solid #e2e2e2',
        borderRadius: '16px',
        padding: '16px',
        marginBottom: `${spacing}px`,
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
      {/* Question Button */}
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'left',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0
        }}
      >
        <span style={{
          color: '#4c4c4c',
          fontSize: '16px',
          fontWeight: 500,
          flex: 1,
          paddingRight: '12px'
        }}>
          {question}
        </span>
        
        <ChevronDown 
          style={{ 
            width: '16px', 
            height: '16px', 
            color: '#a5a5a5',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            flexShrink: 0
          }} 
        />
      </button>
      
      {/* Answer Content */}
      {isExpanded && (
        <div style={{
          marginTop: '12px',
          paddingTop: '12px',
          borderTop: '1px solid #e2e2e2'
        }}>
          <p style={{
            color: '#4c4c4c',
            fontSize: '14px',
            fontWeight: 400,
            margin: 0,
            lineHeight: '1.4'
          }}>
            {answer}
          </p>
        </div>
      )}
    </div>
  )
}