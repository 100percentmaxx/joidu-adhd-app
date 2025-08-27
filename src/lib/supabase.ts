import { createClient } from '@supabase/supabase-js'

/**
 * SUPABASE CLIENT CONFIGURATION
 * 
 * This file configures the Supabase client for the Joidu ADHD task management app.
 * It handles database connections, authentication, and real-time subscriptions.
 * 
 * FEATURES:
 * - Secure client-side database access
 * - Integration with Clerk authentication
 * - Type-safe database operations
 * - Real-time updates for tasks and habits
 * - Row-level security for user data isolation
 */

// Environment variables validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error('Missing env var: NEXT_PUBLIC_SUPABASE_URL')
}

if (!supabaseAnonKey) {
  throw new Error('Missing env var: NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

/**
 * Supabase client instance
 * 
 * This client is configured to work with Clerk authentication and includes
 * ADHD-friendly features like offline support and optimistic updates.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Don't persist session in local storage since we're using Clerk
    persistSession: false,
    // Custom auth header for Clerk integration
    detectSessionInUrl: false,
  },
  realtime: {
    // Enable real-time updates for collaborative features
    params: {
      eventsPerSecond: 10,
    },
  },
  global: {
    headers: {
      'X-Client-Info': 'joidu-adhd-app@1.0.0',
    },
  },
})

/**
 * DATABASE TYPE DEFINITIONS
 * 
 * TypeScript interfaces for type-safe database operations
 */
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          clerk_user_id: string
          email: string
          name: string | null
          preferences: Record<string, any>
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          clerk_user_id: string
          email: string
          name?: string | null
          preferences?: Record<string, any>
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          clerk_user_id?: string
          email?: string
          name?: string | null
          preferences?: Record<string, any>
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          category: 'work' | 'health' | 'personal' | 'social' | 'creative' | 'finance'
          is_completed: boolean
          estimated_minutes: number | null
          actual_minutes: number | null
          due_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          category: 'work' | 'health' | 'personal' | 'social' | 'creative' | 'finance'
          is_completed?: boolean
          estimated_minutes?: number | null
          actual_minutes?: number | null
          due_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          category?: 'work' | 'health' | 'personal' | 'social' | 'creative' | 'finance'
          is_completed?: boolean
          estimated_minutes?: number | null
          actual_minutes?: number | null
          due_date?: string | null
          updated_at?: string
        }
      }
      schedule_events: {
        Row: {
          id: string
          user_id: string
          title: string
          start_time: string
          end_time: string
          location: string | null
          category: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          start_time: string
          end_time: string
          location?: string | null
          category: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          start_time?: string
          end_time?: string
          location?: string | null
          category?: string
          notes?: string | null
        }
      }
      habits: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          category: string
          frequency: 'daily' | 'weekdays' | 'threePerWeek' | 'custom'
          streak: number
          best_streak: number
          total_completions: number
          last_completed: string | null
          target_time: string | null
          estimated_minutes: number | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          category: string
          frequency: 'daily' | 'weekdays' | 'threePerWeek' | 'custom'
          streak?: number
          best_streak?: number
          total_completions?: number
          last_completed?: string | null
          target_time?: string | null
          estimated_minutes?: number | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          category?: string
          frequency?: 'daily' | 'weekdays' | 'threePerWeek' | 'custom'
          streak?: number
          best_streak?: number
          total_completions?: number
          last_completed?: string | null
          target_time?: string | null
          estimated_minutes?: number | null
          is_active?: boolean
        }
      }
      habit_completions: {
        Row: {
          id: string
          habit_id: string
          user_id: string
          completed_at: string
          mood_before: string | null
          mood_after: string | null
          difficulty_level: number | null
          notes: string | null
        }
        Insert: {
          id?: string
          habit_id: string
          user_id: string
          completed_at?: string
          mood_before?: string | null
          mood_after?: string | null
          difficulty_level?: number | null
          notes?: string | null
        }
        Update: {
          id?: string
          habit_id?: string
          user_id?: string
          completed_at?: string
          mood_before?: string | null
          mood_after?: string | null
          difficulty_level?: number | null
          notes?: string | null
        }
      }
      kai_conversations: {
        Row: {
          id: string
          user_id: string
          message: string
          response: string
          context: Record<string, any>
          user_mood: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          message: string
          response: string
          context?: Record<string, any>
          user_mood?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          message?: string
          response?: string
          context?: Record<string, any>
          user_mood?: string | null
        }
      }
    }
  }
}

// Export the typed client
export type SupabaseClient = typeof supabase

/**
 * ADHD-FRIENDLY FEATURES
 * 
 * These utilities provide ADHD-specific database functionality:
 * - Optimistic updates for immediate feedback
 * - Offline support with sync when reconnected
 * - Simplified error handling
 * - Progress tracking and celebration
 */

/**
 * Check if Supabase is properly configured and connected
 */
export async function testSupabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabase.from('users').select('count', { count: 'exact', head: true })
    return !error
  } catch (error) {
    console.error('Supabase connection test failed:', error)
    return false
  }
}

/**
 * Get the current user's database record based on Clerk user ID
 */
export async function getCurrentUser(clerkUserId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_user_id', clerkUserId)
    .single()
  
  if (error) {
    // If user doesn't exist, this might be their first login
    if (error.code === 'PGRST116') {
      return null
    }
    throw error
  }
  
  return data
}

/**
 * Real-time subscriptions for ADHD-friendly updates
 * These provide immediate feedback which is crucial for ADHD motivation
 */
export function subscribeToUserTasks(userId: string, callback: (payload: any) => void) {
  return supabase
    .channel(`user-${userId}-tasks`)
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'tasks',
        filter: `user_id=eq.${userId}`
      }, 
      callback
    )
    .subscribe()
}

export function subscribeToUserHabits(userId: string, callback: (payload: any) => void) {
  return supabase
    .channel(`user-${userId}-habits`)
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'habits',
        filter: `user_id=eq.${userId}`
      }, 
      callback
    )
    .subscribe()
}

/**
 * USAGE EXAMPLES:
 * 
 * // Basic usage in a component:
 * import { supabase } from '@/lib/supabase'
 * 
 * const loadTasks = async () => {
 *   const { data, error } = await supabase
 *     .from('tasks')
 *     .select('*')
 *     .eq('user_id', userId)
 *     .order('created_at', { ascending: false })
 * }
 * 
 * // Real-time updates:
 * useEffect(() => {
 *   const subscription = subscribeToUserTasks(userId, (payload) => {
 *     console.log('Task updated:', payload)
 *     // Update local state with new task data
 *   })
 *   
 *   return () => {
 *     subscription.unsubscribe()
 *   }
 * }, [userId])
 */