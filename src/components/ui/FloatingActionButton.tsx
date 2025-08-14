'use client'

import React from 'react'
import Link from 'next/link'

interface FloatingActionButtonProps {
  href?: string
  onClick?: () => void
  className?: string
}

export default function FloatingActionButton({ 
  href, 
  onClick, 
  className = '' 
}: FloatingActionButtonProps) {
  const buttonContent = (
    <div className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-gentle">
      <img 
        src="/icons/Just_One_Thing.svg" 
        alt="Just One Thing" 
        className="w-14 h-14"
      />
    </div>
  )

  if (href) {
    return (
      <Link href={href} className={`fixed bottom-24 right-5 z-50 ${className}`}>
        {buttonContent}
      </Link>
    )
  }

  return (
    <button 
      onClick={onClick}
      className={`fixed bottom-24 right-5 z-50 ${className}`}
    >
      {buttonContent}
    </button>
  )
} 