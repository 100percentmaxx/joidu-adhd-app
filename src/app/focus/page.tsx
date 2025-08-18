'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function FocusPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect directly to setup screen
    router.replace('/focus/setup')
  }, [router])

  // Show minimal loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-orange-300 border-t-orange-600 rounded-full mx-auto mb-4"></div>
        <p style={{ color: 'var(--text-secondary)' }}>Loading Focus Timer...</p>
      </div>
    </div>
  )
} 