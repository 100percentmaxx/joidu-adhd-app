import React from 'react'
import CircularCheckbox from './CircularCheckbox'

interface ExportCategoryProps {
  title: string
  description: string
  stats: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function ExportCategory({
  title,
  description,
  stats,
  checked,
  onChange
}: ExportCategoryProps) {
  return (
    <div 
      style={{
        backgroundColor: checked ? '#cae9ef' : '#FFFFFF',
        border: checked ? '2px solid #2847ef' : '2px solid #e2e2e2',
        borderRadius: '16px',
        padding: '16px',
        marginBottom: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
      onClick={() => onChange(!checked)}
      onMouseEnter={(e) => {
        if (!checked) {
          e.currentTarget.style.borderColor = '#2847ef'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }
      }}
      onMouseLeave={(e) => {
        if (!checked) {
          e.currentTarget.style.borderColor = '#e2e2e2'
          e.currentTarget.style.transform = 'translateY(0px)'
        }
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ flex: 1, marginRight: '16px' }}>
          <h3 style={{
            color: '#4c4c4c',
            fontSize: '16px',
            fontWeight: 500,
            margin: 0,
            marginBottom: '4px'
          }}>
            {title}
          </h3>
          
          <p style={{
            color: '#a5a5a5',
            fontSize: '14px',
            fontWeight: 400,
            margin: 0,
            marginBottom: '8px',
            lineHeight: '1.3'
          }}>
            {description}
          </p>
          
          <p style={{
            color: '#a5a5a5',
            fontSize: '12px',
            fontWeight: 400,
            margin: 0
          }}>
            {stats}
          </p>
        </div>
        
        <div onClick={(e) => e.stopPropagation()}>
          <CircularCheckbox
            checked={checked}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  )
}