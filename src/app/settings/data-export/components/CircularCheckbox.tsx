import React from 'react'
import { Check } from 'lucide-react'

interface CircularCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  size?: number
}

export default function CircularCheckbox({ checked, onChange, size = 24 }: CircularCheckboxProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="w-6 h-6 rounded-full transition-all duration-200 hover:bg-gray-50"
      style={{
        backgroundColor: checked ? '#a8e2bb' : '#FFFFFF',
        border: checked ? 'none' : '2px solid #a5a5a5',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}
      aria-checked={checked}
      role="checkbox"
    >
      {checked && (
        <Check 
          className="w-3 h-3" 
          style={{ color: '#FFFFFF' }} 
        />
      )}
    </button>
  )
}