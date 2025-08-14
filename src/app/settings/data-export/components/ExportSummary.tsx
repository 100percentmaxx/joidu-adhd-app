import React from 'react'

interface ExportSummaryProps {
  selectedCount: number
  estimatedSize: string
  format: string
  deliveryMethod: string
}

export default function ExportSummary({
  selectedCount,
  estimatedSize,
  format,
  deliveryMethod
}: ExportSummaryProps) {
  const summaryRows = [
    {
      label: 'Selected Items',
      value: `${selectedCount} categories`
    },
    {
      label: 'Estimated Size',
      value: estimatedSize
    },
    {
      label: 'Format',
      value: format
    },
    {
      label: 'Delivery',
      value: deliveryMethod
    }
  ]

  return (
    <div 
      style={{
        backgroundColor: '#cae9ef',
        borderRadius: '16px',
        padding: '16px',
        marginBottom: '24px',
        border: '2px solid transparent',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#2847ef'
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'transparent'
        e.currentTarget.style.transform = 'translateY(0px)'
      }}
    >
      <h3 style={{
        color: '#4c4c4c',
        fontSize: '18px',
        fontWeight: 600,
        margin: 0,
        marginBottom: '16px'
      }}>
        Export Summary
      </h3>
      
      {summaryRows.map((row, index) => (
        <div
          key={row.label}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: index === summaryRows.length - 1 ? 0 : '12px'
          }}
        >
          <span style={{
            color: '#4c4c4c',
            fontSize: '14px',
            fontWeight: 400
          }}>
            {row.label}
          </span>
          
          <span style={{
            color: '#2847ef',
            fontSize: '14px',
            fontWeight: 600
          }}>
            {row.value}
          </span>
        </div>
      ))}
    </div>
  )
}