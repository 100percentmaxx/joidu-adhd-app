/**
 * AI TASK BREAKDOWN UTILITIES
 * 
 * Helper functions and utilities for managing AI-powered task breakdown
 * operations. These utilities provide ADHD-friendly task analysis and
 * step generation for complex tasks.
 */

export interface TaskBreakdownRequest {
  title: string
  description?: string
  category?: string
  estimatedDuration?: number
  userPreferences?: ADHDPreferences
}

export interface ADHDPreferences {
  preferredStepDuration: number // Minutes per step (5, 10, 15, 25, etc.)
  maxStepsPerSession: number // Maximum steps before suggesting a break
  includeBreaks: boolean
  difficultyPreference: 'easy-first' | 'hard-first' | 'mixed'
  motivationLevel: 'low' | 'medium' | 'high'
}

export interface TaskStep {
  id: string
  title: string
  description: string
  estimatedMinutes: number
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  isBreak?: boolean
  tips?: string[]
}

export interface TaskBreakdownResult {
  originalTask: string
  totalSteps: number
  estimatedTotalTime: number
  steps: TaskStep[]
  adhdConsiderations: string[]
  successTips: string[]
}

/**
 * ADHD TASK ANALYSIS PATTERNS
 * 
 * Common task patterns that benefit from specific ADHD-friendly approaches.
 * These help the AI understand how to best break down different types of tasks.
 */
export const TaskPatterns = {
  CLEANING: {
    approach: 'room-by-room',
    breakFrequency: 15, // minutes
    startWithEasiest: true,
    includeRewards: true
  },
  CREATIVE: {
    approach: 'phase-based',
    breakFrequency: 25, // minutes (Pomodoro-style)
    startWithEasiest: false,
    includeRewards: true
  },
  ADMINISTRATIVE: {
    approach: 'batch-similar',
    breakFrequency: 20, // minutes
    startWithEasiest: true,
    includeRewards: false
  },
  LEARNING: {
    approach: 'progressive-complexity',
    breakFrequency: 15, // minutes
    startWithEasiest: true,
    includeRewards: true
  },
  ORGANIZING: {
    approach: 'category-based',
    breakFrequency: 10, // minutes
    startWithEasiest: true,
    includeRewards: true
  }
} as const

/**
 * AI TASK BREAKDOWN ENGINE
 * 
 * Simulates AI analysis and breakdown of complex tasks into ADHD-friendly steps.
 * In production, this would connect to an actual AI service.
 */
export class AITaskBreakdown {
  private static defaultPreferences: ADHDPreferences = {
    preferredStepDuration: 15,
    maxStepsPerSession: 4,
    includeBreaks: true,
    difficultyPreference: 'easy-first',
    motivationLevel: 'medium'
  }

  /**
   * Main task breakdown function
   */
  static async analyzeTask(request: TaskBreakdownRequest): Promise<TaskBreakdownResult> {
    const preferences = { ...this.defaultPreferences, ...request.userPreferences }
    
    // Simulate AI processing time
    await this.delay(2000 + Math.random() * 2000) // 2-4 seconds
    
    // Determine task pattern based on title/category
    const pattern = this.identifyTaskPattern(request.title, request.category)
    
    // Generate ADHD-optimized steps
    const steps = this.generateSteps(request, pattern, preferences)
    
    // Calculate totals
    const totalTime = steps.reduce((sum, step) => sum + step.estimatedMinutes, 0)
    
    return {
      originalTask: request.title,
      totalSteps: steps.length,
      estimatedTotalTime: totalTime,
      steps,
      adhdConsiderations: this.generateADHDConsiderations(request, pattern),
      successTips: this.generateSuccessTips(preferences)
    }
  }

  /**
   * Identify task pattern for optimal breakdown approach
   */
  private static identifyTaskPattern(title: string, category?: string): keyof typeof TaskPatterns {
    const titleLower = title.toLowerCase()
    
    if (titleLower.includes('clean') || titleLower.includes('tidy') || titleLower.includes('organize')) {
      return titleLower.includes('organize') ? 'ORGANIZING' : 'CLEANING'
    }
    
    if (titleLower.includes('write') || titleLower.includes('create') || titleLower.includes('design')) {
      return 'CREATIVE'
    }
    
    if (titleLower.includes('learn') || titleLower.includes('study') || titleLower.includes('research')) {
      return 'LEARNING'
    }
    
    if (titleLower.includes('fill') || titleLower.includes('form') || titleLower.includes('paperwork')) {
      return 'ADMINISTRATIVE'
    }
    
    return 'ORGANIZING' // Default fallback
  }

  /**
   * Generate ADHD-optimized task steps
   */
  private static generateSteps(
    request: TaskBreakdownRequest, 
    pattern: keyof typeof TaskPatterns, 
    preferences: ADHDPreferences
  ): TaskStep[] {
    const steps: TaskStep[] = []
    const patternConfig = TaskPatterns[pattern]
    
    // Generate main task steps based on pattern
    const mainSteps = this.generateMainSteps(request.title, pattern, preferences)
    
    // Insert breaks between steps if enabled
    if (preferences.includeBreaks) {
      mainSteps.forEach((step, index) => {
        steps.push(step)
        
        // Add break after every few steps (based on maxStepsPerSession)
        if ((index + 1) % preferences.maxStepsPerSession === 0 && index < mainSteps.length - 1) {
          steps.push(this.createBreakStep(patternConfig.breakFrequency))
        }
      })
    } else {
      steps.push(...mainSteps)
    }
    
    // Sort by difficulty preference
    return this.sortStepsByDifficulty(steps, preferences.difficultyPreference)
  }

  /**
   * Generate main task steps (without breaks)
   */
  private static generateMainSteps(title: string, pattern: keyof typeof TaskPatterns, preferences: ADHDPreferences): TaskStep[] {
    // This is simplified - in production, AI would generate contextual steps
    const baseSteps = [
      {
        id: '1',
        title: `Start with the first part of "${title}"`,
        description: 'Begin with the easiest or most motivating aspect',
        estimatedMinutes: preferences.preferredStepDuration,
        difficulty: 'easy' as const,
        category: 'preparation'
      },
      {
        id: '2', 
        title: 'Work on the main section',
        description: 'Focus on the core task requirements',
        estimatedMinutes: preferences.preferredStepDuration * 1.5,
        difficulty: 'medium' as const,
        category: 'execution'
      },
      {
        id: '3',
        title: 'Handle the challenging parts',
        description: 'Tackle any difficult or complex elements',
        estimatedMinutes: preferences.preferredStepDuration,
        difficulty: 'hard' as const,
        category: 'problem-solving'
      },
      {
        id: '4',
        title: 'Review and finalize',
        description: 'Check your work and make final adjustments',
        estimatedMinutes: preferences.preferredStepDuration * 0.5,
        difficulty: 'easy' as const,
        category: 'completion'
      }
    ]

    return baseSteps.map(step => ({
      ...step,
      tips: this.generateStepTips(step.difficulty, pattern)
    }))
  }

  /**
   * Create break step
   */
  private static createBreakStep(duration: number): TaskStep {
    return {
      id: `break-${Date.now()}`,
      title: `Take a ${duration}-minute break`,
      description: 'Rest, hydrate, or do a quick mindfulness exercise',
      estimatedMinutes: duration,
      difficulty: 'easy',
      category: 'break',
      isBreak: true,
      tips: [
        'Stand up and stretch',
        'Get some fresh air if possible', 
        'Avoid social media during breaks',
        'Stay hydrated'
      ]
    }
  }

  /**
   * Sort steps by difficulty preference
   */
  private static sortStepsByDifficulty(steps: TaskStep[], preference: ADHDPreferences['difficultyPreference']): TaskStep[] {
    const breakSteps = steps.filter(step => step.isBreak)
    const workSteps = steps.filter(step => !step.isBreak)
    
    const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 }
    
    let sortedWorkSteps: TaskStep[]
    
    switch (preference) {
      case 'easy-first':
        sortedWorkSteps = workSteps.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty])
        break
      case 'hard-first':
        sortedWorkSteps = workSteps.sort((a, b) => difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty])
        break
      case 'mixed':
      default:
        sortedWorkSteps = workSteps // Keep original order for mixed approach
        break
    }
    
    // Re-integrate break steps at appropriate intervals
    return [...sortedWorkSteps, ...breakSteps]
  }

  /**
   * Generate ADHD-specific considerations
   */
  private static generateADHDConsiderations(request: TaskBreakdownRequest, pattern: keyof typeof TaskPatterns): string[] {
    return [
      'Task has been broken into manageable chunks to prevent overwhelm',
      'Each step has a clear start and end point',
      'Break reminders are included to maintain focus',
      'Steps are ordered to build momentum and confidence'
    ]
  }

  /**
   * Generate success tips based on preferences
   */
  private static generateSuccessTips(preferences: ADHDPreferences): string[] {
    const tips = [
      'Set a timer for each step to maintain focus',
      'Celebrate completing each step before moving on',
      'If you get stuck, try the next step and come back later'
    ]
    
    if (preferences.motivationLevel === 'low') {
      tips.push('Start with just the first step - momentum builds naturally')
    }
    
    if (preferences.includeBreaks) {
      tips.push('Honor your break times - they help maintain performance')
    }
    
    return tips
  }

  /**
   * Generate step-specific tips
   */
  private static generateStepTips(difficulty: TaskStep['difficulty'], pattern: keyof typeof TaskPatterns): string[] {
    const baseTips = {
      easy: ['Take your time', 'This is a great warm-up step'],
      medium: ['Focus on one thing at a time', 'Break this down further if needed'],
      hard: ['This is the challenging part - you\'ve got this', 'Consider doing this when your energy is highest']
    }
    
    return baseTips[difficulty]
  }

  /**
   * Utility delay function
   */
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

/**
 * USAGE EXAMPLES:
 * 
 * // Basic task breakdown
 * const result = await AITaskBreakdown.analyzeTask({
 *   title: "Clean my entire house",
 *   description: "Spring cleaning - every room needs attention"
 * })
 * 
 * // With user preferences
 * const customResult = await AITaskBreakdown.analyzeTask({
 *   title: "Write a presentation",
 *   category: "work",
 *   userPreferences: {
 *     preferredStepDuration: 25, // Pomodoro timing
 *     maxStepsPerSession: 3,
 *     includeBreaks: true,
 *     difficultyPreference: 'easy-first',
 *     motivationLevel: 'low'
 *   }
 * })
 */