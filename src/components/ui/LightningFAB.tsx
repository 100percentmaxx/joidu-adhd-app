'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface LightningFABProps {
  show?: boolean // Control visibility per screen
}

export default function LightningFAB({ show = true }: LightningFABProps) {
  const router = useRouter()

  if (!show) return null

  const handlePress = () => {
    router.push('/just-one-thing')
  }

  return (
    <div className="fixed z-50" style={{ bottom: '100px', right: '20px' }}>
      <button 
        onClick={handlePress}
        className="transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          width: '56px',
          height: '56px',
          backgroundColor: 'transparent',
          borderRadius: '50%',
          boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        aria-label="Get help with one thing"
      >
        <img 
          src="/icons/Just_One_Thing.svg" 
          alt="Lightning"
          style={{ width: '56px', height: '56px' }}
        />
      </button>
    </div>
  )
}