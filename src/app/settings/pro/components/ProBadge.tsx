import React from 'react'

interface ProBadgeProps {
  className?: string
  style?: React.CSSProperties
}

export default function ProBadge({ className = '', style }: ProBadgeProps) {
  return (
    <div 
      className={className}
      style={{
        background: 'linear-gradient(135deg, #fa772c 0%, #2847ef 100%)',
        color: '#FFFFFF',
        fontSize: '12px',
        fontWeight: 700,
        padding: '4px 8px',
        borderRadius: '12px',
        textAlign: 'center',
        minWidth: '40px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
    >
      PRO
    </div>
  )
}