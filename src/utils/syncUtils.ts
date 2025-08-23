/**
 * SYNC UTILITIES
 * 
 * Helper functions and utilities for managing data sync operations
 * throughout the Joidu app. These utilities make it easy to integrate
 * the SyncingData loading screen into any sync workflow.
 */

export interface SyncOperation {
  id: string
  name: string
  progress: number
  isComplete: boolean
  error?: string
}

/**
 * SYNC SCENARIOS
 * 
 * Common sync operations that might trigger the loading screen.
 * Each scenario includes typical duration and messaging.
 */
export const SyncScenarios = {
  INITIAL_LOAD: {
    duration: 3000,
    message: "Setting up your workspace..."
  },
  MANUAL_SYNC: {
    duration: 2500,
    message: "Syncing your latest changes..."
  },
  LOGIN_SYNC: {
    duration: 4000,
    message: "Loading your account data..."
  },
  SETTINGS_SYNC: {
    duration: 1500,
    message: "Saving your preferences..."
  },
  BACKUP_SYNC: {
    duration: 5000,
    message: "Creating backup of your data..."
  }
} as const

/**
 * SYNC MANAGER CLASS
 * 
 * Manages sync operations and provides hooks for the SyncingData component.
 * Handles both real progress tracking and simulated progress for better UX.
 */
export class SyncManager {
  private operations: Map<string, SyncOperation> = new Map()
  private listeners: Set<(operations: SyncOperation[]) => void> = new Set()

  /**
   * Start a new sync operation
   */
  startSync(id: string, name: string): void {
    const operation: SyncOperation = {
      id,
      name,
      progress: 0,
      isComplete: false
    }
    
    this.operations.set(id, operation)
    this.notifyListeners()
  }

  /**
   * Update progress for a sync operation
   */
  updateProgress(id: string, progress: number): void {
    const operation = this.operations.get(id)
    if (operation) {
      operation.progress = Math.min(100, Math.max(0, progress))
      operation.isComplete = operation.progress >= 100
      this.notifyListeners()
    }
  }

  /**
   * Mark a sync operation as complete
   */
  completeSync(id: string): void {
    const operation = this.operations.get(id)
    if (operation) {
      operation.progress = 100
      operation.isComplete = true
      this.notifyListeners()
      
      // Clean up completed operation after a delay
      setTimeout(() => {
        this.operations.delete(id)
        this.notifyListeners()
      }, 1000)
    }
  }

  /**
   * Mark a sync operation as failed
   */
  failSync(id: string, error: string): void {
    const operation = this.operations.get(id)
    if (operation) {
      operation.error = error
      this.notifyListeners()
    }
  }

  /**
   * Get all active sync operations
   */
  getActiveOperations(): SyncOperation[] {
    return Array.from(this.operations.values())
  }

  /**
   * Subscribe to sync operation updates
   */
  subscribe(listener: (operations: SyncOperation[]) => void): () => void {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  private notifyListeners(): void {
    const operations = this.getActiveOperations()
    this.listeners.forEach(listener => listener(operations))
  }
}

// Global sync manager instance
export const syncManager = new SyncManager()

/**
 * HELPER FUNCTIONS
 */

/**
 * Simulate a sync operation with realistic timing
 */
export async function simulateSync(
  operationId: string, 
  operationName: string,
  duration: number = 3000,
  onProgress?: (progress: number) => void
): Promise<void> {
  return new Promise((resolve) => {
    syncManager.startSync(operationId, operationName)
    
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(100, (elapsed / duration) * 100)
      
      syncManager.updateProgress(operationId, progress)
      
      if (onProgress) {
        onProgress(progress)
      }
      
      if (progress >= 100) {
        clearInterval(interval)
        syncManager.completeSync(operationId)
        resolve()
      }
    }, 50) // Update every 50ms for smooth progress
  })
}

/**
 * Delay utility for testing sync scenarios
 */
export const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms))

/**
 * USAGE EXAMPLES:
 * 
 * // Basic sync simulation
 * await simulateSync('login', 'Logging in', 2000)
 * 
 * // Sync with progress callback
 * await simulateSync('backup', 'Creating backup', 5000, (progress) => {
 *   console.log(`Backup progress: ${progress}%`)
 * })
 * 
 * // Manual sync management
 * syncManager.startSync('manual-sync', 'Manual sync')
 * syncManager.updateProgress('manual-sync', 50)
 * syncManager.completeSync('manual-sync')
 */