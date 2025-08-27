import { supabase, type Database } from './supabase'
import type { UserResource } from '@clerk/types'

/**
 * JOIDU DATABASE ACCESS FUNCTIONS
 * 
 * This file provides ADHD-friendly database operations with:
 * - Type-safe CRUD operations
 * - Optimistic updates for immediate feedback
 * - Error handling with helpful messages
 * - Real-time subscriptions
 * - Analytics and progress tracking
 */

// Type aliases for cleaner code
type DbUser = Database['public']['Tables']['users']['Row']
type DbTask = Database['public']['Tables']['tasks']['Row']
type DbHabit = Database['public']['Tables']['habits']['Row']
type DbEvent = Database['public']['Tables']['schedule_events']['Row']

type NewUser = Database['public']['Tables']['users']['Insert']
type NewTask = Database['public']['Tables']['tasks']['Insert']
type NewHabit = Database['public']['Tables']['habits']['Insert']
type NewEvent = Database['public']['Tables']['schedule_events']['Insert']

// =====================================================
// USER MANAGEMENT FUNCTIONS
// =====================================================

/**
 * Create a new user profile when they first sign up with Clerk
 */
export async function createUser(clerkUserId: string, email: string, name?: string): Promise<DbUser> {
  const userData: NewUser = {
    clerk_user_id: clerkUserId,
    email,
    name: name || null,
  }

  const { data, error } = await supabase
    .from('users')
    .insert([userData])
    .select()
    .single()

  if (error) {
    console.error('❌ Failed to create user:', error)
    throw new Error(`Failed to create user profile: ${error.message}`)
  }

  console.log('✅ User created successfully:', data.id)
  return data
}

/**
 * Get user profile by Clerk user ID
 */
export async function getUser(clerkUserId: string): Promise<DbUser | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_user_id', clerkUserId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // User not found - this might be their first login
      return null
    }
    console.error('❌ Failed to get user:', error)
    throw new Error(`Failed to get user profile: ${error.message}`)
  }

  return data
}

/**
 * Update user preferences (ADHD settings, UI preferences, etc.)
 */
export async function updateUserPreferences(
  clerkUserId: string, 
  preferences: Record<string, any>
): Promise<DbUser> {
  const { data, error } = await supabase
    .from('users')
    .update({ 
      preferences,
      updated_at: new Date().toISOString()
    })
    .eq('clerk_user_id', clerkUserId)
    .select()
    .single()

  if (error) {
    console.error('❌ Failed to update user preferences:', error)
    throw new Error(`Failed to update preferences: ${error.message}`)
  }

  return data
}

/**
 * Get or create user (useful for Clerk webhook or first login)
 */
export async function getOrCreateUser(clerkUser: UserResource): Promise<DbUser> {
  let user = await getUser(clerkUser.id)
  
  if (!user) {
    // Create new user profile
    const email = clerkUser.emailAddresses[0]?.emailAddress || ''
    const name = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim()
    user = await createUser(clerkUser.id, email, name || undefined)
  }

  return user
}

// =====================================================
// TASK MANAGEMENT FUNCTIONS
// =====================================================

/**
 * Get all tasks for a user with optional filtering
 */
export async function getTasks(
  userId: string,
  options: {
    completed?: boolean
    category?: string
    dueDate?: string
    limit?: number
  } = {}
): Promise<DbTask[]> {
  let query = supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (options.completed !== undefined) {
    query = query.eq('is_completed', options.completed)
  }

  if (options.category) {
    query = query.eq('category', options.category)
  }

  if (options.dueDate) {
    query = query.lte('due_date', options.dueDate)
  }

  if (options.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('❌ Failed to get tasks:', error)
    throw new Error(`Failed to load tasks: ${error.message}`)
  }

  return data || []
}

/**
 * Create a new task
 */
export async function createTask(userId: string, taskData: Omit<NewTask, 'user_id'>): Promise<DbTask> {
  const newTask: NewTask = {
    user_id: userId,
    ...taskData
  }

  const { data, error } = await supabase
    .from('tasks')
    .insert([newTask])
    .select()
    .single()

  if (error) {
    console.error('❌ Failed to create task:', error)
    throw new Error(`Failed to create task: ${error.message}`)
  }

  console.log('✅ Task created:', data.title)
  return data
}

/**
 * Update task (with ADHD-friendly completion celebration)
 */
export async function updateTask(taskId: string, updates: Partial<DbTask>): Promise<DbTask> {
  const updateData = {
    ...updates,
    updated_at: new Date().toISOString()
  }

  // Task completion is tracked by is_completed boolean

  const { data, error } = await supabase
    .from('tasks')
    .update(updateData)
    .eq('id', taskId)
    .select()
    .single()

  if (error) {
    console.error('❌ Failed to update task:', error)
    throw new Error(`Failed to update task: ${error.message}`)
  }

  if (updates.is_completed) {
    console.log('🎉 Task completed:', data.title)
  }

  return data
}

/**
 * Delete task
 */
export async function deleteTask(taskId: string): Promise<void> {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId)

  if (error) {
    console.error('❌ Failed to delete task:', error)
    throw new Error(`Failed to delete task: ${error.message}`)
  }

  console.log('🗑️ Task deleted')
}

/**
 * Get task completion analytics for ADHD motivation
 */
export async function getTaskAnalytics(userId: string, days: number = 7) {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', startDate.toISOString())

  if (error) {
    throw new Error(`Failed to get task analytics: ${error.message}`)
  }

  const completed = data?.filter(task => task.is_completed) || []
  const total = data?.length || 0

  return {
    total,
    completed: completed.length,
    completionRate: total > 0 ? Math.round((completed.length / total) * 100) : 0,
    averageTimeAccuracy: calculateTimeAccuracy(completed),
    categoryBreakdown: getCategoryBreakdown(data || []),
    streakData: calculateCompletionStreak(completed)
  }
}

// =====================================================
// HABIT MANAGEMENT FUNCTIONS
// =====================================================

/**
 * Get all active habits for a user
 */
export async function getHabits(userId: string): Promise<DbHabit[]> {
  const { data, error } = await supabase
    .from('habits')
    .select('*')
    .eq('user_id', userId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('❌ Failed to get habits:', error)
    throw new Error(`Failed to load habits: ${error.message}`)
  }

  return data || []
}

/**
 * Create a new habit
 */
export async function createHabit(userId: string, habitData: Omit<NewHabit, 'user_id'>): Promise<DbHabit> {
  const newHabit: NewHabit = {
    user_id: userId,
    ...habitData
  }

  const { data, error } = await supabase
    .from('habits')
    .insert([newHabit])
    .select()
    .single()

  if (error) {
    console.error('❌ Failed to create habit:', error)
    throw new Error(`Failed to create habit: ${error.message}`)
  }

  console.log('✅ Habit created:', data.title)
  return data
}

/**
 * Complete a habit (with automatic streak calculation)
 */
export async function completeHabit(
  habitId: string,
  completionData: {
    mood_before?: string
    mood_after?: string
    difficulty_level?: number
    notes?: string
    actual_minutes?: number
  } = {}
): Promise<void> {
  // Get the habit and user info
  const { data: habit, error: habitError } = await supabase
    .from('habits')
    .select('user_id')
    .eq('id', habitId)
    .single()

  if (habitError) {
    throw new Error(`Failed to find habit: ${habitError.message}`)
  }

  // Record the completion
  const { error: completionError } = await supabase
    .from('habit_completions')
    .insert([{
      habit_id: habitId,
      user_id: habit.user_id,
      completed_at: new Date().toISOString(),
      ...completionData
    }])

  if (completionError) {
    console.error('❌ Failed to complete habit:', completionError)
    throw new Error(`Failed to record habit completion: ${completionError.message}`)
  }

  console.log('🔥 Habit completed! Streak updated automatically.')
}

/**
 * Get habit analytics and streaks
 */
export async function getHabitAnalytics(userId: string, days: number = 30) {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  // Get habits with recent completions
  const { data, error } = await supabase
    .from('habits')
    .select(`
      *,
      habit_completions!inner(
        completed_at,
        mood_before,
        mood_after,
        difficulty_level
      )
    `)
    .eq('user_id', userId)
    .eq('is_active', true)
    .gte('habit_completions.completed_at', startDate.toISOString())

  if (error) {
    throw new Error(`Failed to get habit analytics: ${error.message}`)
  }

  return {
    totalHabits: data?.length || 0,
    activeStreaks: data?.reduce((sum, habit) => sum + (habit.streak || 0), 0) || 0,
    bestStreak: Math.max(...(data?.map(habit => habit.best_streak || 0) || [0])),
    completionRate: calculateHabitCompletionRate(data || []),
    moodTrends: analyzeMoodTrends(data || [])
  }
}

// =====================================================
// SCHEDULE/EVENTS FUNCTIONS
// =====================================================

/**
 * Get schedule events for a date range
 */
export async function getScheduleEvents(
  userId: string,
  startDate: string,
  endDate: string
): Promise<DbEvent[]> {
  const { data, error } = await supabase
    .from('schedule_events')
    .select('*')
    .eq('user_id', userId)
    .gte('start_time', startDate)
    .lte('start_time', endDate)
    .order('start_time', { ascending: true })

  if (error) {
    console.error('❌ Failed to get events:', error)
    throw new Error(`Failed to load events: ${error.message}`)
  }

  return data || []
}

/**
 * Create a new schedule event
 */
export async function createScheduleEvent(userId: string, eventData: Omit<NewEvent, 'user_id'>): Promise<DbEvent> {
  const newEvent: NewEvent = {
    user_id: userId,
    ...eventData
  }

  const { data, error } = await supabase
    .from('schedule_events')
    .insert([newEvent])
    .select()
    .single()

  if (error) {
    console.error('❌ Failed to create event:', error)
    throw new Error(`Failed to create event: ${error.message}`)
  }

  console.log('📅 Event created:', data.title)
  return data
}


// =====================================================
// HELPER FUNCTIONS
// =====================================================

function calculateTimeAccuracy(completedTasks: DbTask[]): number {
  const tasksWithBothTimes = completedTasks.filter(
    task => task.estimated_minutes && task.actual_minutes
  )

  if (tasksWithBothTimes.length === 0) return 0

  const accuracyScores = tasksWithBothTimes.map(task => {
    const estimated = task.estimated_minutes!
    const actual = task.actual_minutes!
    const ratio = Math.min(estimated, actual) / Math.max(estimated, actual)
    return ratio * 100
  })

  return Math.round(accuracyScores.reduce((sum, score) => sum + score, 0) / accuracyScores.length)
}

function getCategoryBreakdown(tasks: DbTask[]) {
  const breakdown: Record<string, number> = {}
  tasks.forEach(task => {
    breakdown[task.category] = (breakdown[task.category] || 0) + 1
  })
  return breakdown
}

function calculateCompletionStreak(completedTasks: DbTask[]): { current: number; best: number } {
  // Sort by completion date
  const sorted = completedTasks
    .filter(task => task.is_completed)
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())

  let currentStreak = 0
  let bestStreak = 0
  let tempStreak = 0

  // Calculate streaks (simplified version)
  for (let i = 0; i < sorted.length; i++) {
    const today = new Date()
    const completionDate = new Date(sorted[i].updated_at)
    const daysDiff = Math.floor((today.getTime() - completionDate.getTime()) / (1000 * 60 * 60 * 24))

    if (daysDiff <= 1) {
      tempStreak++
      if (i === 0) currentStreak = tempStreak
    } else {
      bestStreak = Math.max(bestStreak, tempStreak)
      tempStreak = 0
    }
  }

  return { current: currentStreak, best: Math.max(bestStreak, tempStreak) }
}

function calculateHabitCompletionRate(habitsWithCompletions: any[]): number {
  if (habitsWithCompletions.length === 0) return 0

  const totalExpected = habitsWithCompletions.length * 30 // 30 days
  const totalCompleted = habitsWithCompletions.reduce(
    (sum, habit) => sum + (habit.habit_completions?.length || 0), 0
  )

  return Math.round((totalCompleted / totalExpected) * 100)
}

function analyzeMoodTrends(habitsWithCompletions: any[]) {
  const moods = habitsWithCompletions.flatMap(
    habit => habit.habit_completions?.map((c: any) => c.mood_after) || []
  ).filter(Boolean)

  const moodCounts = moods.reduce((acc: Record<string, number>, mood: string) => {
    acc[mood] = (acc[mood] || 0) + 1
    return acc
  }, {})

  return moodCounts
}

/**
 * REAL-TIME SUBSCRIPTIONS FOR ADHD-FRIENDLY UPDATES
 */
export function subscribeToUserData(userId: string, callbacks: {
  onTaskChange?: (payload: any) => void
  onHabitChange?: (payload: any) => void
  onEventChange?: (payload: any) => void
}) {
  const subscriptions: any[] = []

  if (callbacks.onTaskChange) {
    const taskSub = supabase
      .channel(`user-${userId}-tasks`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'tasks', filter: `user_id=eq.${userId}` }, 
        callbacks.onTaskChange
      )
      .subscribe()
    subscriptions.push(taskSub)
  }

  if (callbacks.onHabitChange) {
    const habitSub = supabase
      .channel(`user-${userId}-habits`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'habits', filter: `user_id=eq.${userId}` }, 
        callbacks.onHabitChange
      )
      .subscribe()
    subscriptions.push(habitSub)
  }

  if (callbacks.onEventChange) {
    const eventSub = supabase
      .channel(`user-${userId}-events`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'schedule_events', filter: `user_id=eq.${userId}` }, 
        callbacks.onEventChange
      )
      .subscribe()
    subscriptions.push(eventSub)
  }

  // Return cleanup function
  return () => {
    subscriptions.forEach(sub => sub.unsubscribe())
  }
}