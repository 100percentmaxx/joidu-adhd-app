/**
 * APP INITIALIZATION UTILITIES
 * 
 * Helper functions and utilities for managing app startup, initialization,
 * and welcome screen flows. These utilities ensure a smooth first impression
 * and consistent initialization experience across different launch scenarios.
 */

export interface InitializationConfig {
  isFirstLaunch: boolean
  userHasSeenWelcome: boolean
  appVersion: string
  lastVersionSeen?: string
  initializationSteps: InitializationStep[]
}

export interface InitializationStep {
  id: string
  name: string
  estimatedDuration: number // milliseconds
  isRequired: boolean
  description: string
}

export interface WelcomeContext {
  userType: 'new' | 'returning' | 'updated' | 'reset'
  showBackButton: boolean
  duration: number
  customMessage?: string
}

/**
 * INITIALIZATION SCENARIOS
 * 
 * Different app launch scenarios that determine the welcome experience.
 * Each scenario is carefully crafted to provide the right first impression.
 */
export const InitializationScenarios = {
  FIRST_LAUNCH: {
    welcomeContext: {
      userType: 'new' as const,
      showBackButton: false, // No exit for first-time users
      duration: 3000, // Longer for first impression
    },
    steps: [
      { id: 'database', name: 'Setting up your workspace', estimatedDuration: 800, isRequired: true, description: 'Initializing local database' },
      { id: 'preferences', name: 'Preparing your preferences', estimatedDuration: 600, isRequired: true, description: 'Setting up default ADHD-friendly settings' },
      { id: 'theme', name: 'Choosing your calm theme', estimatedDuration: 400, isRequired: true, description: 'Applying soothing visual design' },
      { id: 'features', name: 'Organizing your tools', estimatedDuration: 700, isRequired: true, description: 'Setting up productivity features' },
      { id: 'ready', name: 'Almost ready for calm productivity', estimatedDuration: 500, isRequired: true, description: 'Final setup touches' }
    ]
  },
  
  RETURNING_USER: {
    welcomeContext: {
      userType: 'returning' as const,
      showBackButton: true,
      duration: 2000, // Shorter for returning users
    },
    steps: [
      { id: 'preferences', name: 'Loading your settings', estimatedDuration: 600, isRequired: true, description: 'Restoring user preferences' },
      { id: 'data', name: 'Syncing your progress', estimatedDuration: 800, isRequired: true, description: 'Loading tasks and habits' },
      { id: 'ready', name: 'Welcome back to calm productivity', estimatedDuration: 600, isRequired: true, description: 'Setup complete' }
    ]
  },
  
  APP_UPDATE: {
    welcomeContext: {
      userType: 'updated' as const,
      showBackButton: true,
      duration: 2500,
      customMessage: 'Preparing new features for your ADHD brain'
    },
    steps: [
      { id: 'migration', name: 'Updating your data', estimatedDuration: 900, isRequired: true, description: 'Migrating to new app version' },
      { id: 'features', name: 'Setting up new features', estimatedDuration: 800, isRequired: true, description: 'Configuring new productivity tools' },
      { id: 'preferences', name: 'Optimizing for you', estimatedDuration: 600, isRequired: true, description: 'Applying updated ADHD settings' },
      { id: 'ready', name: 'Ready with enhanced calm productivity', estimatedDuration: 200, isRequired: true, description: 'Update complete' }
    ]
  },
  
  RESET_APP: {
    welcomeContext: {
      userType: 'reset' as const,
      showBackButton: true,
      duration: 3500,
      customMessage: 'Creating your fresh start for productivity'
    },
    steps: [
      { id: 'cleanup', name: 'Clearing old data', estimatedDuration: 800, isRequired: true, description: 'Removing previous configuration' },
      { id: 'database', name: 'Rebuilding your workspace', estimatedDuration: 1000, isRequired: true, description: 'Reinitializing clean database' },
      { id: 'preferences', name: 'Restoring ADHD-friendly defaults', estimatedDuration: 700, isRequired: true, description: 'Setting up optimized preferences' },
      { id: 'features', name: 'Organizing your fresh tools', estimatedDuration: 700, isRequired: true, description: 'Reconfiguring productivity features' },
      { id: 'ready', name: 'Your fresh start is ready', estimatedDuration: 300, isRequired: true, description: 'Reset complete' }
    ]
  }
} as const

/**
 * APP INITIALIZATION MANAGER
 * 
 * Manages the app startup process and determines the appropriate welcome
 * experience based on user context and app state.
 */
export class InitializationManager {
  private static readonly STORAGE_KEY = 'joidu_initialization_state'
  
  /**
   * Determine the appropriate initialization scenario
   */
  static determineScenario(): keyof typeof InitializationScenarios {
    const state = this.getInitializationState()
    
    // First launch - user has never seen the app
    if (!state.userHasSeenWelcome) {
      return 'FIRST_LAUNCH'
    }
    
    // App update - version has changed
    if (state.lastVersionSeen !== state.appVersion) {
      return 'APP_UPDATE'
    }
    
    // Check if app was reset
    if (this.wasAppReset()) {
      return 'RESET_APP'
    }
    
    // Default to returning user
    return 'RETURNING_USER'
  }
  
  /**
   * Get the current initialization state
   */
  static getInitializationState(): InitializationConfig {
    if (typeof window === 'undefined') {
      // Server-side default
      return this.getDefaultState()
    }
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        return { ...this.getDefaultState(), ...parsed }
      }
    } catch (error) {
      console.warn('Failed to load initialization state:', error)
    }
    
    return this.getDefaultState()
  }
  
  /**
   * Update initialization state
   */
  static updateInitializationState(updates: Partial<InitializationConfig>): void {
    if (typeof window === 'undefined') return
    
    try {
      const current = this.getInitializationState()
      const updated = { ...current, ...updates }
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated))
    } catch (error) {
      console.warn('Failed to save initialization state:', error)
    }
  }
  
  /**
   * Mark welcome as seen
   */
  static markWelcomeAsSeen(): void {
    this.updateInitializationState({
      userHasSeenWelcome: true,
      lastVersionSeen: this.getCurrentAppVersion()
    })
  }
  
  /**
   * Check if app was reset
   */
  private static wasAppReset(): boolean {
    if (typeof window === 'undefined') return false
    
    // Check for reset flag (would be set by reset functionality)
    const resetFlag = localStorage.getItem('joidu_app_reset')
    if (resetFlag) {
      localStorage.removeItem('joidu_app_reset')
      return true
    }
    
    return false
  }
  
  /**
   * Get default initialization state
   */
  private static getDefaultState(): InitializationConfig {
    return {
      isFirstLaunch: true,
      userHasSeenWelcome: false,
      appVersion: this.getCurrentAppVersion(),
      initializationSteps: []
    }
  }
  
  /**
   * Get current app version
   */
  private static getCurrentAppVersion(): string {
    // In a real app, this would come from package.json or environment
    return '1.0.0'
  }
}

/**
 * INITIALIZATION ORCHESTRATOR
 * 
 * Orchestrates the actual initialization process with proper timing and error handling.
 */
export class InitializationOrchestrator {
  /**
   * Run full app initialization
   */
  static async initialize(scenario: keyof typeof InitializationScenarios): Promise<void> {
    const config = InitializationScenarios[scenario]
    
    try {
      // Run initialization steps
      for (const step of config.steps) {
        await this.runInitializationStep(step)
      }
      
      // Mark as completed
      InitializationManager.markWelcomeAsSeen()
      
    } catch (error) {
      console.error('Initialization failed:', error)
      throw new Error('Failed to initialize app')
    }
  }
  
  /**
   * Run a single initialization step
   */
  private static async runInitializationStep(step: InitializationStep): Promise<void> {
    console.log(`Initializing: ${step.name}`)
    
    // Simulate the work (in real app, this would do actual initialization)
    await new Promise(resolve => setTimeout(resolve, step.estimatedDuration))
    
    console.log(`Completed: ${step.name}`)
  }
  
  /**
   * Get welcome context for current scenario
   */
  static getWelcomeContext(scenario: keyof typeof InitializationScenarios): WelcomeContext {
    return InitializationScenarios[scenario].welcomeContext
  }
}

/**
 * HELPER FUNCTIONS
 */

/**
 * Check if this is a first launch
 */
export function isFirstLaunch(): boolean {
  return !InitializationManager.getInitializationState().userHasSeenWelcome
}

/**
 * Check if app needs welcome screen
 */
export function shouldShowWelcome(): boolean {
  const scenario = InitializationManager.determineScenario()
  return scenario === 'FIRST_LAUNCH' || scenario === 'APP_UPDATE' || scenario === 'RESET_APP'
}

/**
 * Get estimated initialization time
 */
export function getEstimatedInitTime(scenario: keyof typeof InitializationScenarios): number {
  const config = InitializationScenarios[scenario]
  return config.steps.reduce((total, step) => total + step.estimatedDuration, 0)
}

/**
 * USAGE EXAMPLES:
 * 
 * // In your main app component
 * const [showWelcome, setShowWelcome] = useState(shouldShowWelcome())
 * const scenario = InitializationManager.determineScenario()
 * const welcomeContext = InitializationOrchestrator.getWelcomeContext(scenario)
 * 
 * if (showWelcome) {
 *   return (
 *     <Welcome
 *       initializationDuration={welcomeContext.duration}
 *       showBackButton={welcomeContext.showBackButton}
 *       onInitializationComplete={() => {
 *         InitializationManager.markWelcomeAsSeen()
 *         setShowWelcome(false)
 *       }}
 *     />
 *   )
 * }
 * 
 * // For app reset functionality
 * const resetApp = () => {
 *   localStorage.setItem('joidu_app_reset', 'true')
 *   InitializationManager.updateInitializationState({ userHasSeenWelcome: false })
 *   window.location.reload()
 * }
 */