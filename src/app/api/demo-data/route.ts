import { NextRequest, NextResponse } from 'next/server'
import { getUser, createUser, getTasks, createTask, getHabits, createHabit } from '@/lib/database'

/**
 * DEMO DATA ENDPOINT
 * 
 * This endpoint demonstrates Supabase integration by creating sample data
 * for testing and development purposes.
 * 
 * ENDPOINT: POST /api/demo-data
 * 
 * REQUEST BODY:
 * {
 *   clerkUserId: string,  // Clerk user ID
 *   action: 'create-user' | 'create-tasks' | 'create-habits' | 'get-all'
 * }
 */

export async function POST(request: NextRequest) {
  try {
    const { clerkUserId, action } = await request.json()

    if (!clerkUserId) {
      return NextResponse.json(
        { error: 'clerkUserId is required' },
        { status: 400 }
      )
    }

    console.log(`🧪 Demo data action: ${action} for user: ${clerkUserId}`)

    let result: any = {}

    switch (action) {
      case 'create-user':
        result = await createDemoUser(clerkUserId)
        break
        
      case 'create-tasks':
        result = await createDemoTasks(clerkUserId)
        break
        
      case 'create-habits':
        result = await createDemoHabits(clerkUserId)
        break
        
      case 'get-all':
        result = await getAllUserData(clerkUserId)
        break
        
      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: create-user, create-tasks, create-habits, or get-all' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      action,
      clerkUserId,
      result,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Demo data operation failed:', error)
    
    return NextResponse.json({
      error: 'Demo data operation failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

/**
 * Create a demo user profile
 */
async function createDemoUser(clerkUserId: string) {
  try {
    // Check if user already exists
    let user = await getUser(clerkUserId)
    
    if (user) {
      return {
        status: 'exists',
        user,
        message: 'User already exists'
      }
    }

    // Create new user
    user = await createUser(
      clerkUserId,
      'demo@joidu.app',
      'Demo User'
    )

    return {
      status: 'created',
      user,
      message: 'Demo user created successfully'
    }

  } catch (error) {
    throw new Error(`Failed to create demo user: ${error}`)
  }
}

/**
 * Create sample tasks for demo user
 */
async function createDemoTasks(clerkUserId: string) {
  try {
    // Get user profile
    const user = await getUser(clerkUserId)
    if (!user) {
      throw new Error('User not found. Create user first.')
    }

    // Sample ADHD-friendly tasks
    const sampleTasks = [
      {
        title: 'Reply to important emails',
        description: 'Check inbox and respond to 3 most urgent emails',
        category: 'work' as const,
        estimated_minutes: 15,
        priority: 'high' as const,
      },
      {
        title: 'Take a 10-minute walk',
        description: 'Fresh air and movement to boost energy and focus',
        category: 'health' as const,
        estimated_minutes: 10,
        priority: 'medium' as const,
      },
      {
        title: 'Organize desk drawer',
        description: 'Sort through one desk drawer - keep, donate, or toss',
        category: 'personal' as const,
        estimated_minutes: 20,
        priority: 'low' as const,
      },
      {
        title: 'Call a friend',
        description: 'Quick check-in call with someone you care about',
        category: 'social' as const,
        estimated_minutes: 15,
        priority: 'medium' as const,
      },
      {
        title: 'Brainstorm project ideas',
        description: 'Write down 5 creative ideas for upcoming project',
        category: 'creative' as const,
        estimated_minutes: 25,
        priority: 'medium' as const,
      },
      {
        title: 'Review monthly budget',
        description: 'Quick check of expenses vs income this month',
        category: 'finance' as const,
        estimated_minutes: 30,
        priority: 'high' as const,
      }
    ]

    const createdTasks = []
    for (const taskData of sampleTasks) {
      const task = await createTask(user.id, taskData)
      createdTasks.push(task)
    }

    return {
      status: 'created',
      count: createdTasks.length,
      tasks: createdTasks,
      message: `${createdTasks.length} demo tasks created`
    }

  } catch (error) {
    throw new Error(`Failed to create demo tasks: ${error}`)
  }
}

/**
 * Create sample habits for demo user
 */
async function createDemoHabits(clerkUserId: string) {
  try {
    // Get user profile
    const user = await getUser(clerkUserId)
    if (!user) {
      throw new Error('User not found. Create user first.')
    }

    // Sample ADHD-friendly habits
    const sampleHabits = [
      {
        title: 'Morning meditation',
        description: '5 minutes of mindful breathing to start the day',
        category: 'health',
        frequency: 'daily' as const,
        target_time: '08:00:00',
        estimated_minutes: 5,
      },
      {
        title: 'Evening brain dump',
        description: 'Write down tomorrow\'s top 3 priorities',
        category: 'personal',
        frequency: 'daily' as const,
        target_time: '21:00:00',
        estimated_minutes: 10,
      },
      {
        title: 'Hydration check',
        description: 'Drink a full glass of water',
        category: 'health',
        frequency: 'threePerWeek' as const,
        estimated_minutes: 1,
      },
      {
        title: 'Tidy workspace',
        description: 'Clear desk and put things back in place',
        category: 'work',
        frequency: 'weekdays' as const,
        estimated_minutes: 5,
      }
    ]

    const createdHabits = []
    for (const habitData of sampleHabits) {
      const habit = await createHabit(user.id, habitData)
      createdHabits.push(habit)
    }

    return {
      status: 'created',
      count: createdHabits.length,
      habits: createdHabits,
      message: `${createdHabits.length} demo habits created`
    }

  } catch (error) {
    throw new Error(`Failed to create demo habits: ${error}`)
  }
}

/**
 * Get all user data
 */
async function getAllUserData(clerkUserId: string) {
  try {
    // Get user profile
    const user = await getUser(clerkUserId)
    if (!user) {
      return {
        status: 'not-found',
        message: 'User not found. Create user first.'
      }
    }

    // Get user's tasks and habits
    const [tasks, habits] = await Promise.all([
      getTasks(user.id),
      getHabits(user.id)
    ])

    return {
      status: 'found',
      user: {
        id: user.id,
        clerk_user_id: user.clerk_user_id,
        email: user.email,
        name: user.name,
        created_at: user.created_at
      },
      tasks: {
        count: tasks.length,
        items: tasks.map(task => ({
          id: task.id,
          title: task.title,
          category: task.category,
          is_completed: task.is_completed,
          estimated_minutes: task.estimated_minutes,
          created_at: task.created_at
        }))
      },
      habits: {
        count: habits.length,
        items: habits.map(habit => ({
          id: habit.id,
          title: habit.title,
          category: habit.category,
          frequency: habit.frequency,
          streak: habit.streak,
          created_at: habit.created_at
        }))
      },
      message: `User found with ${tasks.length} tasks and ${habits.length} habits`
    }

  } catch (error) {
    throw new Error(`Failed to get user data: ${error}`)
  }
}

/**
 * GET handler for demo data information
 */
export async function GET() {
  return NextResponse.json({
    message: 'Demo data endpoint for Supabase integration testing',
    usage: {
      endpoint: 'POST /api/demo-data',
      actions: [
        'create-user - Create a demo user profile',
        'create-tasks - Create sample tasks for user',
        'create-habits - Create sample habits for user',
        'get-all - Get all user data (user, tasks, habits)'
      ]
    },
    example: {
      method: 'POST',
      body: {
        clerkUserId: 'user_abc123',
        action: 'create-user'
      }
    },
    timestamp: new Date().toISOString()
  })
}

/**
 * TESTING WORKFLOW:
 * 
 * 1. Create user:
 *    POST /api/demo-data { clerkUserId: "user_123", action: "create-user" }
 * 
 * 2. Create tasks:
 *    POST /api/demo-data { clerkUserId: "user_123", action: "create-tasks" }
 * 
 * 3. Create habits:
 *    POST /api/demo-data { clerkUserId: "user_123", action: "create-habits" }
 * 
 * 4. Get all data:
 *    POST /api/demo-data { clerkUserId: "user_123", action: "get-all" }
 * 
 * This allows you to test the full Supabase integration workflow
 * without needing to set up the frontend components first.
 */