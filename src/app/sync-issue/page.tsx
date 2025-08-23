'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import SyncIssue from '@/components/loading/SyncIssue'

/**
 * SYNC ISSUE TEST PAGE
 * 
 * This page demonstrates the SyncIssue screen component.
 * It can be accessed at /sync-issue to test the sync error functionality.
 * 
 * In a real application, this component would be shown:
 * - When sync operations fail due to network issues
 * - During server-side sync service outages
 * - When authentication issues prevent cloud sync
 * - For data conflicts requiring resolution
 * - During timeout issues in sync operations
 */
export default function SyncIssuePage() {
  const router = useRouter()
  const [isRetrying, setIsRetrying] = useState(false)
  const [retryAttempts, setRetryAttempts] = useState(0)

  const handleRetry = async () => {
    setIsRetrying(true)
    setRetryAttempts(prev => prev + 1)
    
    // Simulate retry attempt
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsRetrying(false)
    
    // Simulate occasional success (30% chance)
    if (Math.random() < 0.3) {
      alert(`✅ Sync Successful!\\n\\nAttempt #${retryAttempts + 1} succeeded.\\n\\nAll your data is now synchronized with the cloud.`)
      router.push('/')
    } else {
      console.log(`Retry attempt #${retryAttempts + 1} failed`)
    }
  }

  const handleExit = () => {
    console.log('User chose to continue offline')
    router.push('/')
  }

  // Simulate last sync time (2 hours ago for demo)
  const lastSyncTime = new Date(Date.now() - (2 * 60 * 60 * 1000))

  return (
    <SyncIssue
      onRetry={handleRetry}
      onExit={handleExit}
      showBackButton={true}
      lastSyncTime={lastSyncTime}
      errorDetails="Network timeout during sync operation"
      isRetrying={isRetrying}
    />
  )
}