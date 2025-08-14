import React from 'react'

interface FormatSelectorProps {
  selectedFormat: 'json' | 'csv' | 'pdf'
  onFormatChange: (format: 'json' | 'csv' | 'pdf') => void
}

export default function FormatSelector({ selectedFormat, onFormatChange }: FormatSelectorProps) {
  const formatOptions = [
    {
      id: 'json' as const,
      title: 'JSON',
      subtitle: 'Developer Friendly'
    },
    {
      id: 'csv' as const,
      title: 'CSV',
      subtitle: 'Spreadsheet Ready'
    },
    {
      id: 'pdf' as const,
      title: 'PDF',
      subtitle: 'Human Readable'
    }
  ]

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '8px',
      marginBottom: '24px'
    }}>
      {formatOptions.map((option) => {
        const isSelected = selectedFormat === option.id
        
        return (
          <button
            key={option.id}
            onClick={() => onFormatChange(option.id)}
            style={{
              backgroundColor: isSelected ? '#cae9ef' : '#FFFFFF',
              border: isSelected ? '2px solid #2847ef' : '2px solid #e2e2e2',
              borderRadius: '12px',
              padding: '16px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.currentTarget.style.borderColor = '#2847ef'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.currentTarget.style.borderColor = '#e2e2e2'
                e.currentTarget.style.transform = 'translateY(0px)'
              }
            }}
          >
            <h3 style={{
              color: '#4c4c4c',
              fontSize: '16px',
              fontWeight: 600,
              margin: 0
            }}>
              {option.title}
            </h3>
            
            <p style={{
              color: '#a5a5a5',
              fontSize: '12px',
              fontWeight: 400,
              margin: 0,
              textAlign: 'center'
            }}>
              {option.subtitle}
            </p>
          </button>
        )
      })}
    </div>
  )
}