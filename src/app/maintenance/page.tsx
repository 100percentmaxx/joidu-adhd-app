'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Maintenance from '@/components/loading/Maintenance'

/**
 * MAINTENANCE TEST PAGE
 * 
 * This page demonstrates the Maintenance screen component.
 * It can be accessed at /maintenance to test the maintenance functionality.
 * 
 * In a real application, this component would be shown:
 * - During planned server maintenance windows
 * - When deploying major features that require downtime
 * - During database migrations or infrastructure updates
 * - For security patches requiring service restart
 * - When performing performance optimizations
 */
export default function MaintenancePage() {
  const router = useRouter()
  const [maintenanceStartTime] = useState(new Date())
  
  // Demo scenarios with different maintenance types
  const [currentScenario, setCurrentScenario] = useState<'quick' | 'feature' | 'security'>('quick')

  const handleMaintenanceComplete = () => {
    console.log('Maintenance completed!')
    alert(`🎉 Maintenance Complete!\\n\\nJoidu is back online with all the improvements ready.\\n\\nThanks for your patience!`)
    router.push('/')
  }

  const handleExit = () => {
    console.log('User exited during maintenance')
    router.push('/')
  }

  // Different maintenance scenarios for demo
  const scenarios = {
    quick: {
      estimatedMinutes: 15,
      improvements: [
        'Faster sync performance',
        'Better Kai AI responses',
        'Enhanced security features'
      ],
      autoRefreshInterval: 30000 // 30 seconds for demo
    },
    feature: {
      estimatedMinutes: 45,
      improvements: [
        'New habit tracking features',
        'Improved calendar integration',
        'Advanced focus mode tools',
        'Better notification system'
      ],
      autoRefreshInterval: 60000 // 60 seconds
    },
    security: {
      estimatedMinutes: 25,
      improvements: [
        'Critical security patches',
        'Enhanced data encryption',
        'Updated authentication system',
        'Privacy setting improvements'
      ],
      autoRefreshInterval: 45000 // 45 seconds
    }
  }

  const currentConfig = scenarios[currentScenario]

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
        maxWidth: '200px'
      }}>
        <div style={{ marginBottom: '8px', fontWeight: 600 }}>Demo Controls:</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button
            onClick={() => setCurrentScenario('quick')}
            style={{
              padding: '4px 8px',
              fontSize: '11px',
              backgroundColor: currentScenario === 'quick' ? '#2847ef' : '#f0f0f0',
              color: currentScenario === 'quick' ? 'white' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Quick Update (15m)
          </button>
          <button
            onClick={() => setCurrentScenario('feature')}
            style={{
              padding: '4px 8px',
              fontSize: '11px',
              backgroundColor: currentScenario === 'feature' ? '#2847ef' : '#f0f0f0',
              color: currentScenario === 'feature' ? 'white' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Feature Deploy (45m)
          </button>
          <button
            onClick={() => setCurrentScenario('security')}
            style={{
              padding: '4px 8px',
              fontSize: '11px',
              backgroundColor: currentScenario === 'security' ? '#2847ef' : '#f0f0f0',
              color: currentScenario === 'security' ? 'white' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Security Update (25m)
          </button>
        </div>
        <div style={{ marginTop: '8px', fontSize: '10px', color: '#666' }}>
          Auto-complete: 10% chance per check
        </div>
      </div>

      {/* Maintenance Screen */}
      <Maintenance
        onMaintenanceComplete={handleMaintenanceComplete}
        onExit={handleExit}
        showBackButton={true}
        estimatedMinutes={currentConfig.estimatedMinutes}
        improvements={currentConfig.improvements}
        autoRefreshInterval={currentConfig.autoRefreshInterval}
        startTime={maintenanceStartTime}
      />
    </div>
  )
}

/**
 * REAL-WORLD INTEGRATION EXAMPLE:
 * 
 * // In your main app component or route guard
 * const AppWithMaintenanceCheck = () => {
 *   const [maintenanceStatus, setMaintenanceStatus] = useState(null)
 *   
 *   useEffect(() => {
 *     const checkMaintenanceStatus = async () => {
 *       try {
 *         const response = await fetch('/api/health')
 *         if (response.status === 503) {
 *           const maintenanceInfo = await response.json()
 *           setMaintenanceStatus(maintenanceInfo)
 *         }
 *       } catch (error) {
 *         // Handle network errors
 *         console.error('Health check failed:', error)
 *       }
 *     }
 *     
 *     checkMaintenanceStatus()
 *     const interval = setInterval(checkMaintenanceStatus, 60000) // Check every minute
 *     
 *     return () => clearInterval(interval)
 *   }, [])
 *   
 *   if (maintenanceStatus) {
 *     return (
 *       <Maintenance
 *         estimatedMinutes={maintenanceStatus.estimatedDuration}
 *         improvements={maintenanceStatus.improvements}
 *         onMaintenanceComplete={() => {
 *           setMaintenanceStatus(null)
 *           window.location.reload() // Refresh to get updated app version
 *         }}
 *       />
 *     )
 *   }
 *   
 *   return <NormalApp />
 * }
 * 
 * // Backend API endpoint example (/api/health)
 * export default function handler(req, res) {
 *   const isInMaintenance = process.env.MAINTENANCE_MODE === 'true'
 *   
 *   if (isInMaintenance) {
 *     return res.status(503).json({
 *       message: 'Service temporarily unavailable due to maintenance',
 *       estimatedDuration: parseInt(process.env.MAINTENANCE_DURATION_MINUTES || '15'),
 *       improvements: [
 *         'Performance optimizations',
 *         'Security updates',
 *         'New feature deployments'
 *       ],
 *       startTime: process.env.MAINTENANCE_START_TIME
 *     })
 *   }
 *   
 *   res.status(200).json({ status: 'healthy' })
 * }
 */