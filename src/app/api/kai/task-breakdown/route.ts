import { NextRequest, NextResponse } from 'next/server'

/**
 * KAI TASK BREAKDOWN API ENDPOINT
 * 
 * This endpoint provides AI-powered task breakdown for complex or overwhelming tasks.
 * It analyzes a task and breaks it down into ADHD-friendly, manageable steps.
 * 
 * ENDPOINT: POST /api/kai/task-breakdown
 * 
 * REQUEST BODY:
 * {
 *   task: {
 *     title: string,
 *     description?: string,
 *     category?: string,
 *     estimatedDuration?: number
 *   },
 *   preferences: {
 *     stepDuration: number,      // Preferred step duration in minutes
 *     maxSteps: number,          // Max steps before suggesting break
 *     difficulty: 'easy-first' | 'hard-first' | 'mixed',
 *     includeBreaks: boolean
 *   },
 *   userId?: string
 * }
 * 
 * RESPONSE:
 * {
 *   breakdown: {
 *     originalTask: string,
 *     totalSteps: number,
 *     estimatedTime: number,
 *     steps: Array<{
 *       id: string,
 *       title: string,
 *       description: string,
 *       estimatedMinutes: number,
 *       difficulty: 'easy' | 'medium' | 'hard',
 *       tips: string[]
 *     }>,
 *     adhdTips: string[],
 *     motivationBoosts: string[]
 *   }
 * }
 */

interface Task {
  title: string
  description?: string
  category?: string
  estimatedDuration?: number
}

interface UserPreferences {
  stepDuration: number
  maxSteps: number
  difficulty: 'easy-first' | 'hard-first' | 'mixed'
  includeBreaks: boolean
}

interface BreakdownRequest {
  task: Task
  preferences: UserPreferences
  userId?: string
}

interface TaskStep {
  id: string
  title: string
  description: string
  estimatedMinutes: number
  difficulty: 'easy' | 'medium' | 'hard'
  tips: string[]
  isBreak?: boolean
}

interface TaskBreakdown {
  originalTask: string
  totalSteps: number
  estimatedTime: number
  steps: TaskStep[]
  adhdTips: string[]
  motivationBoosts: string[]
}

export async function POST(request: NextRequest) {
  try {
    const { task, preferences, userId }: BreakdownRequest = await request.json()

    // Validate request
    if (!task || !task.title || !preferences) {
      return NextResponse.json(
        { error: 'Missing required fields: task.title and preferences' },
        { status: 400 }
      )
    }

    // TODO: Replace with actual Claude API integration
    // const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    
    // Generate breakdown using ADHD-friendly logic
    const breakdown = await generateTaskBreakdown(task, preferences)
    
    console.log('🧠 Task breakdown requested:', {
      taskTitle: task.title,
      taskCategory: task.category,
      stepDuration: preferences.stepDuration,
      maxSteps: preferences.maxSteps,
      totalStepsGenerated: breakdown.totalSteps,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({
      breakdown,
      timestamp: new Date().toISOString(),
      requestId: `breakdown-${Date.now()}`
    })

  } catch (error) {
    console.error('❌ Task breakdown failed:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to generate task breakdown',
        fallback: {
          originalTask: "Task breakdown",
          totalSteps: 1,
          estimatedTime: 15,
          steps: [{
            id: "fallback-1",
            title: "Start with any small part of this task",
            description: "Pick the easiest piece and begin there. Momentum builds naturally.",
            estimatedMinutes: 15,
            difficulty: "easy" as const,
            tips: ["Any progress is good progress", "Don't aim for perfection"]
          }],
          adhdTips: ["Start small, celebrate wins"],
          motivationBoosts: ["You've got this! One step at a time."]
        }
      },
      { status: 500 }
    )
  }
}

/**
 * Generate ADHD-optimized task breakdown
 * This simulates intelligent AI analysis until Claude integration is implemented
 */
async function generateTaskBreakdown(task: Task, preferences: UserPreferences): Promise<TaskBreakdown> {
  // Simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
  
  const steps: TaskStep[] = []
  const taskLower = task.title.toLowerCase()
  
  // Generate steps based on task type and preferences
  const mainSteps = generateMainSteps(task, preferences)
  
  // Add breaks between steps if enabled
  if (preferences.includeBreaks) {
    mainSteps.forEach((step, index) => {
      steps.push(step)
      
      // Add break after every `maxSteps` steps
      if ((index + 1) % preferences.maxSteps === 0 && index < mainSteps.length - 1) {
        steps.push({
          id: `break-${index}`,
          title: "Take a mindful break",
          description: "Step away, breathe, hydrate, or stretch for a few minutes",
          estimatedMinutes: Math.min(preferences.stepDuration / 2, 10),
          difficulty: 'easy',
          tips: [
            "Avoid screens during breaks",
            "Movement helps reset your focus",
            "Even 2 minutes makes a difference"
          ],
          isBreak: true
        })
      }
    })
  } else {
    steps.push(...mainSteps)
  }

  // Sort by difficulty preference
  const sortedSteps = sortStepsByDifficulty(steps, preferences.difficulty)
  const totalTime = sortedSteps.reduce((sum, step) => sum + step.estimatedMinutes, 0)

  return {
    originalTask: task.title,
    totalSteps: sortedSteps.length,
    estimatedTime: totalTime,
    steps: sortedSteps,
    adhdTips: generateADHDTips(task, preferences),
    motivationBoosts: generateMotivationBoosts(task.title)
  }
}

/**
 * Generate main task steps based on task type
 */
function generateMainSteps(task: Task, preferences: UserPreferences): TaskStep[] {
  const taskLower = task.title.toLowerCase()
  const stepDuration = preferences.stepDuration
  
  // Cleaning/organizing tasks
  if (taskLower.includes('clean') || taskLower.includes('organize') || taskLower.includes('tidy')) {
    return [
      {
        id: '1',
        title: 'Gather supplies and set timer',
        description: `Get what you need and set a ${stepDuration}-minute timer`,
        estimatedMinutes: 5,
        difficulty: 'easy',
        tips: ['Having supplies ready prevents getting sidetracked', 'Timers create helpful urgency']
      },
      {
        id: '2', 
        title: 'Sort items into keep, donate, trash',
        description: 'Make quick decisions - trust your first instinct',
        estimatedMinutes: stepDuration,
        difficulty: 'medium',
        tips: ['Use the 5-second rule for decisions', 'When in doubt, donate']
      },
      {
        id: '3',
        title: 'Put "keep" items in their homes',
        description: 'Everything gets a designated spot',
        estimatedMinutes: stepDuration,
        difficulty: 'medium', 
        tips: ['Group similar items together', 'Label containers if helpful']
      },
      {
        id: '4',
        title: 'Quick final cleanup and celebration',
        description: 'Do a final sweep and appreciate your work',
        estimatedMinutes: 5,
        difficulty: 'easy',
        tips: ['Take a before/after photo', 'Do a little victory dance!']
      }
    ]
  }
  
  // Creative/writing tasks
  if (taskLower.includes('write') || taskLower.includes('create') || taskLower.includes('design')) {
    return [
      {
        id: '1',
        title: 'Brain dump all ideas',
        description: 'Write down everything related to this project - no editing',
        estimatedMinutes: stepDuration,
        difficulty: 'easy',
        tips: ['Quantity over quality right now', 'Use bullet points or mind maps']
      },
      {
        id: '2',
        title: 'Create a rough outline or structure', 
        description: 'Organize your ideas into a logical flow',
        estimatedMinutes: stepDuration,
        difficulty: 'medium',
        tips: ['Start with main points, fill in details later', 'Use templates if available']
      },
      {
        id: '3',
        title: 'Work on the first section',
        description: 'Focus on just one part - aim for "good enough" draft',
        estimatedMinutes: stepDuration * 1.5,
        difficulty: 'hard',
        tips: ['Perfectionism is the enemy of done', 'Set a timer to prevent endless tweaking']
      },
      {
        id: '4',
        title: 'Quick review and polish',
        description: 'Read through and make obvious improvements',
        estimatedMinutes: stepDuration * 0.5,
        difficulty: 'easy',
        tips: ['Read aloud to catch issues', 'Save major edits for later']
      }
    ]
  }

  // Learning/studying tasks  
  if (taskLower.includes('learn') || taskLower.includes('study') || taskLower.includes('research')) {
    return [
      {
        id: '1',
        title: 'Set up learning environment',
        description: 'Clear space, gather materials, eliminate distractions',
        estimatedMinutes: 5,
        difficulty: 'easy',
        tips: ['Phone in another room or airplane mode', 'Have water and snacks ready']
      },
      {
        id: '2',
        title: 'Preview the material',
        description: 'Skim headings, summaries, key points to get overview',
        estimatedMinutes: stepDuration * 0.5,
        difficulty: 'easy',
        tips: ['Look for the big picture first', 'Note what looks most important']
      },
      {
        id: '3',
        title: 'Active learning session',
        description: 'Engage with material - take notes, ask questions, make connections',
        estimatedMinutes: stepDuration,
        difficulty: 'hard',
        tips: ['Teach it to an imaginary student', 'Use colors and diagrams if helpful']
      },
      {
        id: '4',
        title: 'Quick review and consolidate',
        description: 'Summarize key points in your own words',
        estimatedMinutes: stepDuration * 0.5,
        difficulty: 'medium',
        tips: ['What are the 3 most important things?', 'How does this connect to what you know?']
      }
    ]
  }

  // Default/generic breakdown
  return [
    {
      id: '1',
      title: 'Prepare and plan',
      description: `Take 5 minutes to think through what you need for "${task.title}"`,
      estimatedMinutes: 5,
      difficulty: 'easy',
      tips: ['Gather materials first', 'Clear your workspace']
    },
    {
      id: '2',
      title: 'Start with the easiest part',
      description: 'Begin with whatever feels most manageable right now',
      estimatedMinutes: stepDuration,
      difficulty: 'easy',
      tips: ['Momentum builds naturally', 'Done is better than perfect']
    },
    {
      id: '3', 
      title: 'Work on the main challenge',
      description: 'Tackle the core part of the task',
      estimatedMinutes: stepDuration,
      difficulty: 'hard',
      tips: ['Break this down further if needed', 'Take micro-breaks as needed']
    },
    {
      id: '4',
      title: 'Wrap up and review',
      description: 'Finish any loose ends and check your work',
      estimatedMinutes: stepDuration * 0.5,
      difficulty: 'medium',
      tips: ['Celebrate progress made', 'Note what worked well']
    }
  ]
}

/**
 * Sort steps by difficulty preference
 */
function sortStepsByDifficulty(steps: TaskStep[], preference: UserPreferences['difficulty']): TaskStep[] {
  const workSteps = steps.filter(step => !step.isBreak)
  const breakSteps = steps.filter(step => step.isBreak)
  
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
      sortedWorkSteps = workSteps // Keep original order
      break
  }
  
  // Reintegrate breaks at appropriate positions
  const finalSteps: TaskStep[] = []
  let breakIndex = 0
  
  sortedWorkSteps.forEach((step, index) => {
    finalSteps.push(step)
    
    // Add breaks where they should go
    if (breakIndex < breakSteps.length && (index + 1) % 2 === 0) {
      finalSteps.push(breakSteps[breakIndex])
      breakIndex++
    }
  })
  
  return finalSteps
}

/**
 * Generate ADHD-specific tips
 */
function generateADHDTips(task: Task, preferences: UserPreferences): string[] {
  return [
    "Set timers for each step to maintain focus and prevent hyperfocus",
    "Celebrate completing each step - your ADHD brain thrives on positive reinforcement",
    "If you get stuck, try the next step and circle back later",
    "Use the 'good enough' rule - perfectionism can be paralyzing for ADHD minds",
    "Take movement breaks between steps to reset your attention"
  ]
}

/**
 * Generate motivational boosts
 */
function generateMotivationBoosts(taskTitle: string): string[] {
  return [
    `You're breaking down "${taskTitle}" like a pro - that's executive function in action!`,
    "Every step completed builds momentum for the next one",
    "Your ADHD brain is capable of amazing focus when tasks are the right size",
    "Remember: progress over perfection, always",
    "You've got this! One manageable step at a time."
  ]
}

/**
 * FUTURE CLAUDE INTEGRATION:
 * 
 * When ANTHROPIC_API_KEY is available, replace the breakdown generation with:
 * 
 * async function generateClaudeBreakdown(task: Task, preferences: UserPreferences): Promise<TaskBreakdown> {
 *   const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
 * 
 *   const prompt = `Break down this task for someone with ADHD: "${task.title}"
 *   ${task.description ? `Description: ${task.description}` : ''}
 *   
 *   User preferences:
 *   - Preferred step duration: ${preferences.stepDuration} minutes
 *   - Max steps before break: ${preferences.maxSteps}
 *   - Difficulty preference: ${preferences.difficulty}
 *   - Include breaks: ${preferences.includeBreaks}
 *   
 *   Create 3-6 concrete, actionable steps that:
 *   - Are ADHD-friendly (clear start/end points)
 *   - Build momentum and confidence
 *   - Include specific tips for each step
 *   - Respect the user's energy patterns
 *   
 *   Format as JSON matching the TaskBreakdown interface.`
 * 
 *   const message = await anthropic.messages.create({
 *     model: 'claude-3-sonnet-20240229',
 *     max_tokens: 1000,
 *     messages: [{ role: 'user', content: prompt }]
 *   })
 * 
 *   return JSON.parse(message.content[0].text)
 * }
 */