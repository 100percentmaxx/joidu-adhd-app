'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ConnectionLost from '@/components/loading/ConnectionLost'

/**
 * CONNECTION LOST TEST PAGE
 * 
 * This page demonstrates the ConnectionLost screen component.
 * It can be accessed at /connection-lost to test the offline functionality.
 * 
 * In a real application, this component would be shown:
 * - When network connectivity is lost or unstable
 * - During WiFi network interruptions or weak signals
 * - When switching between WiFi and cellular networks
 * - During cellular data connectivity issues
 * - When server connectivity problems occur from user's ISP
 */
export default function ConnectionLostPage() {
  const router = useRouter()
  const [connectionLostAt] = useState(new Date(Date.now() - (5 * 60 * 1000))) // 5 minutes ago for demo
  const [reconnectAttempts, setReconnectAttempts] = useState(0)
  
  // Demo network simulation state
  const [simulatedOnline, setSimulatedOnline] = useState(false)

  const handleConnectionRestored = () => {
    console.log('Connection restored!')
    setSimulatedOnline(true)
    alert(`🎉 Connection Restored!\\n\\nWelcome back online!\\n\\nAttempts made: ${reconnectAttempts + 1}\\n\\nAll your offline changes are now syncing automatically.`)
    router.push('/')
  }

  const handleExit = () => {
    console.log('User returned to app in offline mode')
    router.push('/')
  }

  // Simulate periodic connection restoration attempts
  useEffect(() => {
    const interval = setInterval(() => {
      setReconnectAttempts(prev => prev + 1)
      
      // 20% chance of reconnection after 3rd attempt (to simulate real reconnection patterns)
      if (reconnectAttempts >= 2 && Math.random() < 0.2) {
        clearInterval(interval)
        handleConnectionRestored()
      }
    }, 12000) // Every 12 seconds to match component default

    return () => clearInterval(interval)
  }, [reconnectAttempts])

  return (
    <div style={{ backgroundColor: '#fefbf7', minHeight: '100vh' }}>
      {/* Demo Controls - Only shown in development/demo */}
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: 1000,
        backgroundColor: 'white',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '12px',
        maxWidth: '220px'
      }}>
        <div style={{ marginBottom: '8px', fontWeight: 600 }}>Demo Controls:</div>
        <div style={{ marginBottom: '8px' }}>
          <div>Offline Duration: 5 minutes</div>
          <div>Reconnect Attempts: {reconnectAttempts}</div>
          <div>Status: {simulatedOnline ? '🟢 Online' : '🔴 Offline'}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button
            onClick={handleConnectionRestored}
            style={{
              padding: '6px 8px',
              fontSize: '11px',
              backgroundColor: '#22c55e',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Simulate Reconnection
          </button>
          <button
            onClick={() => {
              setReconnectAttempts(0)
              setSimulatedOnline(false)
            }}
            style={{
              padding: '6px 8px',
              fontSize: '11px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reset Demo
          </button>
        </div>
        <div style={{ marginTop: '8px', fontSize: '10px', color: '#666' }}>
          Auto-reconnect: 20% chance after 3rd attempt
        </div>
      </div>

      {/* Connection Lost Screen */}
      <ConnectionLost
        onConnectionRestored={handleConnectionRestored}
        onExit={handleExit}
        showBackButton={true}
        autoRetryInterval={12000} // 12 seconds for demo visibility
        connectionLostAt={connectionLostAt}
      />
    </div>
  )
}

/**
 * REAL-WORLD INTEGRATION PATTERNS:
 * 
 * // 1. Network Status Hook
 * const useNetworkStatus = () => {
 *   const [isOnline, setIsOnline] = useState(navigator.onLine)
 *   const [connectionLostAt, setConnectionLostAt] = useState<Date | null>(null)
 *   
 *   useEffect(() => {
 *     const handleOnline = () => {
 *       setIsOnline(true)
 *       setConnectionLostAt(null)
 *     }
 *     
 *     const handleOffline = () => {
 *       setIsOnline(false)
 *       setConnectionLostAt(new Date())
 *     }
 *     
 *     window.addEventListener('online', handleOnline)
 *     window.addEventListener('offline', handleOffline)
 *     
 *     return () => {
 *       window.removeEventListener('online', handleOnline)
 *       window.removeEventListener('offline', handleOffline)
 *     }
 *   }, [])
 *   
 *   return { isOnline, connectionLostAt }
 * }
 * 
 * // 2. App with Offline Support
 * const AppWithOfflineSupport = () => {
 *   const { isOnline, connectionLostAt } = useNetworkStatus()
 *   const [showConnectionScreen, setShowConnectionScreen] = useState(false)
 *   const [offlineQueue, setOfflineQueue] = useState([])
 *   
 *   // Show connection screen for extended offline periods
 *   useEffect(() => {
 *     if (!isOnline && connectionLostAt) {
 *       const timer = setTimeout(() => {
 *         setShowConnectionScreen(true)
 *       }, 5000) // Show after 5 seconds offline
 *       
 *       return () => clearTimeout(timer)
 *     } else if (isOnline) {
 *       setShowConnectionScreen(false)
 *       // Process offline queue
 *       processOfflineQueue()
 *     }
 *   }, [isOnline, connectionLostAt])
 *   
 *   const processOfflineQueue = async () => {
 *     for (const action of offlineQueue) {
 *       try {
 *         await syncAction(action)
 *       } catch (error) {
 *         console.error('Failed to sync offline action:', error)
 *       }
 *     }
 *     setOfflineQueue([])
 *   }
 *   
 *   if (showConnectionScreen) {
 *     return (
 *       <ConnectionLost
 *         connectionLostAt={connectionLostAt}
 *         onConnectionRestored={() => {
 *           setShowConnectionScreen(false)
 *           processOfflineQueue()
 *         }}
 *       />
 *     )
 *   }
 *   
 *   return <MainApp isOffline={!isOnline} offlineQueue={offlineQueue} />
 * }
 * 
 * // 3. Offline-First Data Management
 * class OfflineDataManager {
 *   private syncQueue: any[] = []
 *   private localStorage = window.localStorage
 *   
 *   // Save data locally immediately
 *   async saveTask(task: Task) {
 *     // 1. Save to local storage immediately
 *     const tasks = this.getLocalTasks()
 *     tasks.push(task)
 *     this.localStorage.setItem('tasks', JSON.stringify(tasks))
 *     
 *     // 2. Add to sync queue for when online
 *     this.syncQueue.push({ action: 'CREATE_TASK', data: task })
 *     
 *     // 3. Try to sync if online
 *     if (navigator.onLine) {
 *       this.processSyncQueue()
 *     }
 *   }
 *   
 *   async processSyncQueue() {
 *     while (this.syncQueue.length > 0) {
 *       const item = this.syncQueue.shift()
 *       try {
 *         await this.syncToServer(item)
 *       } catch (error) {
 *         // Re-queue if sync fails
 *         this.syncQueue.unshift(item)
 *         break
 *       }
 *     }
 *   }
 *   
 *   getLocalTasks(): Task[] {
 *     const stored = this.localStorage.getItem('tasks')
 *     return stored ? JSON.parse(stored) : []
 *   }
 * }
 * 
 * // 4. Service Worker for Advanced Offline Support
 * // In service-worker.js
 * self.addEventListener('fetch', (event) => {
 *   // Cache API responses for offline use
 *   if (event.request.url.includes('/api/')) {
 *     event.respondWith(
 *       caches.match(event.request).then((response) => {
 *         if (response) {
 *           return response // Return cached version
 *         }
 *         
 *         return fetch(event.request).then((response) => {
 *           const responseClone = response.clone()
 *           caches.open('api-cache').then((cache) => {
 *             cache.put(event.request, responseClone)
 *           })
 *           return response
 *         }).catch(() => {
 *           // Return offline page or cached data
 *           return caches.match('/offline.html')
 *         })
 *       })
 *     )
 *   }
 * })
 * 
 * OFFLINE FEATURE MATRIX:
 * 
 * ✅ Core Features (Work Offline):
 * - Task creation, editing, completion
 * - Habit tracking and logging
 * - Focus timer and sessions
 * - Calendar viewing and event creation
 * - Notes and quick captures
 * - Local search functionality
 * - Settings and preferences
 * 
 * ⏳ Queued Features (Sync When Online):
 * - Cloud backup and restore
 * - Cross-device synchronization
 * - Share tasks or habits with others
 * - Export data to external services
 * - Account management changes
 * - Analytics and insights
 * 
 * ❌ Online-Only Features (Gracefully Disabled):
 * - AI-powered task breakdown (Kai)
 * - Weather-based schedule suggestions
 * - Calendar integration with external services
 * - Real-time collaboration
 * - Push notifications from server
 * - Social features and sharing
 */