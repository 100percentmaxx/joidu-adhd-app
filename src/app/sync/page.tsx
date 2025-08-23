'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import SyncingData from '@/components/loading/SyncingData'

/**
 * SYNC TEST PAGE
 * 
 * This page demonstrates the SyncingData loading screen component.
 * It can be accessed at /sync to test the loading screen functionality.
 * 
 * In a real application, this component would be used:
 * - During app initialization
 * - When manually syncing data
 * - During login/authentication flows
 * - When updating user settings
 */
export default function SyncPage() {
  const router = useRouter()

  const handleSyncComplete = () => {
    // In real app, this would redirect to the appropriate screen
    console.log('Sync completed!')
    router.push('/')
  }

  const handleSyncCancel = () => {
    // In real app, this would cancel the sync operation
    console.log('Sync cancelled!')
    router.back()
  }

  return (
    <SyncingData
      onSyncComplete={handleSyncComplete}
      onCancel={handleSyncCancel}
      syncDuration={4000} // 4 second demo
    />
  )
}