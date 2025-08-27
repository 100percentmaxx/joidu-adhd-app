'use client'

import { useState, useEffect, useCallback } from 'react'
import { useUser } from '@clerk/nextjs'
import type { UserResource } from '@clerk/types'
import { 
  getOrCreateUser, 
  getTasks, 
  getHabits, 
  getTaskAnalytics,
  getHabitAnalytics,
  subscribeToUserData,
  createTask,
  updateTask,
  deleteTask,
  createHabit,
  completeHabit
} from '@/lib/database'
import type { Database } from '@/lib/supabase'

/**
 * SUPABASE DATA HOOK FOR JOIDU
 * 
 * This hook provides ADHD-friendly database integration with:
 * - Automatic user creation/retrieval
 * - Real-time data synchronization  
 * - Optimistic updates for immediate feedback
 * - Loading states and error handling
 * - Progress tracking and analytics
 */

type DbUser = Database['public']['Tables']['users']['Row']
type DbTask = Database['public']['Tables']['tasks']['Row']
type DbHabit = Database['public']['Tables']['habits']['Row']

interface UseSupabaseDataReturn {
  // User data
  user: DbUser | null
  
  // Tasks
  tasks: DbTask[]
  tasksLoading: boolean
  tasksError: string | null
  
  // Habits
  habits: DbHabit[]
  habitsLoading: boolean
  habitsError: string | null
  
  // Analytics
  taskAnalytics: any
  habitAnalytics: any
  analyticsLoading: boolean
  
  // Actions
  actions: {
    // Task actions
    createTask: (taskData: Omit<DbTask, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>
    updateTask: (taskId: string, updates: Partial<DbTask>) => Promise<void>
    deleteTask: (taskId: string) => Promise<void>
    toggleTaskComplete: (taskId: string, isCompleted: boolean) => Promise<void>
    
    // Habit actions
    createHabit: (habitData: Omit<DbHabit, 'id' | 'user_id' | 'created_at' | 'streak' | 'best_streak' | 'total_completions'>) => Promise<void>
    completeHabit: (habitId: string, completionData?: any) => Promise<void>
    
    // Refresh data
    refreshTasks: () => Promise<void>
    refreshHabits: () => Promise<void>
    refreshAnalytics: () => Promise<void>
  }
}

export function useSupabaseData(): UseSupabaseDataReturn {
  const { user: clerkUser, isLoaded: clerkLoaded } = useUser()
  
  // State management
  const [user, setUser] = useState<DbUser | null>(null)
  const [tasks, setTasks] = useState<DbTask[]>([])
  const [habits, setHabits] = useState<DbHabit[]>([])
  const [taskAnalytics, setTaskAnalytics] = useState<any>(null)
  const [habitAnalytics, setHabitAnalytics] = useState<any>(null)
  
  // Loading states
  const [tasksLoading, setTasksLoading] = useState(true)
  const [habitsLoading, setHabitsLoading] = useState(true)
  const [analyticsLoading, setAnalyticsLoading] = useState(false)
  
  // Error states
  const [tasksError, setTasksError] = useState<string | null>(null)
  const [habitsError, setHabitsError] = useState<string | null>(null)

  /**
   * Initialize user and load data
   */
  useEffect(() => {
    if (clerkLoaded && clerkUser) {
      initializeUser()
    }
  }, [clerkLoaded, clerkUser])

  const initializeUser = useCallback(async () => {
    if (!clerkUser) return
    
    try {
      console.log('🔄 Initializing user data...')
      
      // Get or create user profile
      const dbUser = await getOrCreateUser(clerkUser)
      setUser(dbUser)
      
      // Load initial data
      await Promise.all([
        loadTasks(dbUser.id),
        loadHabits(dbUser.id)
      ])
      
      // Set up real-time subscriptions
      const unsubscribe = subscribeToUserData(dbUser.id, {
        onTaskChange: (payload) => {
          console.log('📝 Task updated:', payload)
          // Refresh tasks on change
          loadTasks(dbUser.id)
        },
        onHabitChange: (payload) => {
          console.log('🔄 Habit updated:', payload)
          // Refresh habits on change
          loadHabits(dbUser.id)
        }
      })
      
      // Cleanup subscriptions
      return () => {
        unsubscribe()
      }
      
    } catch (error) {
      console.error('❌ Failed to initialize user:', error)
      setTasksError('Failed to initialize user data')
    }
  }, [clerkUser])

  /**
   * Load tasks with error handling
   */
  const loadTasks = useCallback(async (userId: string) => {
    try {
      setTasksLoading(true)
      setTasksError(null)
      
      const userTasks = await getTasks(userId, { limit: 100 })
      setTasks(userTasks)
      
      console.log(`✅ Loaded ${userTasks.length} tasks`)
      
    } catch (error) {
      console.error('❌ Failed to load tasks:', error)
      setTasksError('Failed to load tasks')
      // Keep existing tasks on error
    } finally {
      setTasksLoading(false)
    }
  }, [])

  /**
   * Load habits with error handling
   */
  const loadHabits = useCallback(async (userId: string) => {
    try {
      setHabitsLoading(true)
      setHabitsError(null)
      
      const userHabits = await getHabits(userId)
      setHabits(userHabits)
      
      console.log(`✅ Loaded ${userHabits.length} habits`)
      
    } catch (error) {
      console.error('❌ Failed to load habits:', error)
      setHabitsError('Failed to load habits')
      // Keep existing habits on error
    } finally {
      setHabitsLoading(false)
    }
  }, [])

  /**
   * Load analytics data
   */
  const loadAnalytics = useCallback(async (userId: string) => {
    try {
      setAnalyticsLoading(true)
      
      const [taskStats, habitStats] = await Promise.all([
        getTaskAnalytics(userId, 30), // Last 30 days
        getHabitAnalytics(userId, 30)
      ])
      
      setTaskAnalytics(taskStats)
      setHabitAnalytics(habitStats)
      
      console.log('📊 Analytics loaded')
      
    } catch (error) {
      console.error('❌ Failed to load analytics:', error)
    } finally {
      setAnalyticsLoading(false)
    }
  }, [])

  /**
   * TASK ACTIONS WITH OPTIMISTIC UPDATES
   */
  
  const createTaskAction = useCallback(async (taskData: any) => {
    if (!user) throw new Error('User not initialized')
    
    try {
      // Optimistic update - add task to UI immediately
      const optimisticTask = {
        id: `temp-${Date.now()}`,
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_completed: false,
        ...taskData
      } as DbTask
      
      setTasks(prev => [optimisticTask, ...prev])
      
      // Create in database
      const newTask = await createTask(user.id, taskData)
      
      // Replace optimistic task with real one
      setTasks(prev => prev.map(task => 
        task.id === optimisticTask.id ? newTask : task
      ))
      
      console.log('✅ Task created:', newTask.title)
      
    } catch (error) {
      // Remove optimistic task on error
      setTasks(prev => prev.filter(task => !task.id.startsWith('temp-')))
      console.error('❌ Failed to create task:', error)
      throw error
    }
  }, [user])

  const updateTaskAction = useCallback(async (taskId: string, updates: Partial<DbTask>) => {
    if (!user) throw new Error('User not initialized')
    
    try {
      // Optimistic update
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      ))
      
      // Update in database
      const updatedTask = await updateTask(taskId, updates)
      
      // Replace with real data
      setTasks(prev => prev.map(task => 
        task.id === taskId ? updatedTask : task
      ))
      
      console.log('✅ Task updated:', updatedTask.title)
      
    } catch (error) {
      // Revert optimistic update
      await loadTasks(user.id)
      console.error('❌ Failed to update task:', error)
      throw error
    }
  }, [user, loadTasks])

  const deleteTaskAction = useCallback(async (taskId: string) => {
    if (!user) throw new Error('User not initialized')
    
    try {
      // Optimistic update - remove from UI immediately  
      const taskToDelete = tasks.find(task => task.id === taskId)
      setTasks(prev => prev.filter(task => task.id !== taskId))
      
      // Delete from database
      await deleteTask(taskId)
      
      console.log('🗑️ Task deleted')
      
    } catch (error) {
      // Revert optimistic update
      await loadTasks(user.id)
      console.error('❌ Failed to delete task:', error)
      throw error
    }
  }, [user, tasks, loadTasks])

  const toggleTaskCompleteAction = useCallback(async (taskId: string, isCompleted: boolean) => {
    const updates = { 
      is_completed: isCompleted
    }
    
    await updateTaskAction(taskId, updates)
    
    if (isCompleted) {
      console.log('🎉 Task completed! Great work!')
    }
  }, [updateTaskAction])

  /**
   * HABIT ACTIONS
   */
  
  const createHabitAction = useCallback(async (habitData: any) => {
    if (!user) throw new Error('User not initialized')
    
    try {
      const newHabit = await createHabit(user.id, habitData)
      setHabits(prev => [newHabit, ...prev])
      
      console.log('✅ Habit created:', newHabit.title)
      
    } catch (error) {
      console.error('❌ Failed to create habit:', error)
      throw error
    }
  }, [user])

  const completeHabitAction = useCallback(async (habitId: string, completionData = {}) => {
    if (!user) throw new Error('User not initialized')
    
    try {
      await completeHabit(habitId, completionData)
      
      // Refresh habits to get updated streak
      await loadHabits(user.id)
      
      console.log('🔥 Habit completed! Streak updated!')
      
    } catch (error) {
      console.error('❌ Failed to complete habit:', error)
      throw error
    }
  }, [user, loadHabits])

  /**
   * REFRESH ACTIONS
   */
  
  const refreshTasks = useCallback(async () => {
    if (user) {
      await loadTasks(user.id)
    }
  }, [user, loadTasks])

  const refreshHabits = useCallback(async () => {
    if (user) {
      await loadHabits(user.id)
    }
  }, [user, loadHabits])

  const refreshAnalytics = useCallback(async () => {
    if (user) {
      await loadAnalytics(user.id)
    }
  }, [user, loadAnalytics])

  return {
    // Data
    user,
    tasks,
    habits,
    taskAnalytics,
    habitAnalytics,
    
    // Loading states
    tasksLoading,
    habitsLoading, 
    analyticsLoading,
    
    // Error states
    tasksError,
    habitsError,
    
    // Actions
    actions: {
      createTask: createTaskAction,
      updateTask: updateTaskAction,
      deleteTask: deleteTaskAction,
      toggleTaskComplete: toggleTaskCompleteAction,
      createHabit: createHabitAction,
      completeHabit: completeHabitAction,
      refreshTasks,
      refreshHabits,
      refreshAnalytics
    }
  }
}

/**
 * USAGE EXAMPLE:
 * 
 * function TasksPage() {
 *   const { 
 *     tasks, 
 *     tasksLoading, 
 *     tasksError, 
 *     actions 
 *   } = useSupabaseData()
 * 
 *   const handleCreateTask = async () => {
 *     await actions.createTask({
 *       title: 'New task',
 *       category: 'work',
 *       estimated_minutes: 30
 *     })
 *   }
 * 
 *   if (tasksLoading) return <div>Loading tasks...</div>
 *   if (tasksError) return <div>Error: {tasksError}</div>
 * 
 *   return (
 *     <div>
 *       {tasks.map(task => (
 *         <TaskCard 
 *           key={task.id} 
 *           task={task}
 *           onComplete={() => actions.toggleTaskComplete(task.id, !task.is_completed)}
 *         />
 *       ))}
 *     </div>
 *   )
 * }
 */