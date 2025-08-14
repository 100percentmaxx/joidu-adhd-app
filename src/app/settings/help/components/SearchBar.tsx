import React from 'react'
import { Search } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
}

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{
        position: 'relative',
        width: '100%'
      }}>
        <div style={{
          position: 'absolute',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1
        }}>
          <Search style={{ 
            width: '20px', 
            height: '20px', 
            color: '#a5a5a5' 
          }} />
        </div>
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%',
            backgroundColor: 'white',
            border: '2px solid #e2e2e2',
            borderRadius: '12px',
            padding: '16px 16px 16px 48px', // Extra left padding for search icon
            fontSize: '16px',
            color: '#4c4c4c',
            outline: 'none',
            transition: 'border-color 0.2s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#2847ef'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e2e2e2'
          }}
        />
      </div>
    </div>
  )
}