'use client'

import { useState, useEffect } from 'react'

interface SuggestedTask {
  id: string
  title: string
  category: string
  categoryColor: string
  categoryIcon: string
  estimatedMinutes: number
  priority: 'low' | 'medium' | 'high'
  context: string
}

interface UserContext {
  timeOfDay: number
  userState: 'overwhelmed' | 'focused' | 'neutral'
  availableTime: 'short' | 'medium' | 'long'
  recentTasks: any[]
}

// Sample tasks for AI suggestions (in real app, this would come from user's actual tasks)
const sampleTasks: SuggestedTask[] = [
  {
    id: '1',
    title: 'Reply to Naoya Oka email',
    category: 'Work',
    categoryColor: '#f9dac5',
    categoryIcon: 'work.svg',
    estimatedMinutes: 3,
    priority: 'high',
    context: 'Quick email response'
  },
  {
    id: '2', 
    title: 'Water the plants',
    category: 'Home',
    categoryColor: '#4ade80',
    categoryIcon: 'home.svg',
    estimatedMinutes: 5,
    priority: 'medium',
    context: 'Simple household task'
  },
  {
    id: '3',
    title: 'Review meeting notes',
    category: 'Work',
    categoryColor: '#f9dac5', 
    categoryIcon: 'work.svg',
    estimatedMinutes: 8,
    priority: 'medium',
    context: 'Preparation task'
  },
  {
    id: '4',
    title: 'Organize desk drawer',
    category: 'Personal',
    categoryColor: '#f59e0b',
    categoryIcon: 'personal.svg',
    estimatedMinutes: 10,
    priority: 'low',
    context: 'Quick organization'
  },
  {
    id: '5',
    title: 'Text mom back',
    category: 'Personal',
    categoryColor: '#f59e0b',
    categoryIcon: 'personal.svg', 
    estimatedMinutes: 2,
    priority: 'high',
    context: 'Family communication'
  },
  {
    id: '6',
    title: 'Update project status',
    category: 'Work',
    categoryColor: '#f9dac5',
    categoryIcon: 'work.svg',
    estimatedMinutes: 7,
    priority: 'medium',
    context: 'Status update'
  }
]

const calculateTaskScore = (task: SuggestedTask, context: UserContext): number => {
  let score = 0
  
  // Favor short tasks when overwhelmed
  if (context.userState === 'overwhelmed') {
    score += task.estimatedMinutes <= 5 ? 20 : 10
    score += task.estimatedMinutes <= 10 ? 10 : 0
  }
  
  // Priority scoring
  score += task.priority === 'high' ? 15 : task.priority === 'medium' ? 10 : 5
  
  // Time of day preferences
  const hour = context.timeOfDay
  if (hour >= 9 && hour <= 11) { // Morning - favor work tasks
    score += task.category === 'Work' ? 10 : 0
  } else if (hour >= 14 && hour <= 16) { // Afternoon - favor personal tasks
    score += task.category === 'Personal' ? 10 : 0
  }
  
  // Avoid very long tasks when looking for "just one thing"
  score -= task.estimatedMinutes > 15 ? 20 : 0
  
  return score
}

const aiTaskSuggestion = (context: UserContext, excludeIds: string[] = []): SuggestedTask => {
  const availableTasks = sampleTasks.filter(task => !excludeIds.includes(task.id))
  
  const scoredTasks = availableTasks.map(task => ({
    ...task,
    score: calculateTaskScore(task, context)
  }))
  
  // Sort by score and return top suggestion
  const sortedTasks = scoredTasks.sort((a, b) => b.score - a.score)
  return sortedTasks[0]
}

export const useJustOneThing = () => {
  const [currentSuggestion, setCurrentSuggestion] = useState<SuggestedTask | null>(null)
  const [previousSuggestions, setPreviousSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getUserContext = (): UserContext => {
    const now = new Date()
    return {
      timeOfDay: now.getHours(),
      userState: 'overwhelmed', // Default to overwhelmed when using Just-One-Thing
      availableTime: 'short', // Assume short when seeking help
      recentTasks: [] // Would load from user's actual recent tasks
    }
  }

  const getSuggestion = async () => {
    setIsLoading(true)
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const context = getUserContext()
    const suggestion = aiTaskSuggestion(context, previousSuggestions)
    
    setCurrentSuggestion(suggestion)
    setIsLoading(false)
  }

  const getNextSuggestion = async () => {
    if (currentSuggestion) {
      setPreviousSuggestions(prev => [...prev, currentSuggestion.id])
    }
    await getSuggestion()
  }

  const resetSuggestions = () => {
    setPreviousSuggestions([])
    setCurrentSuggestion(null)
  }

  // Get initial suggestion when hook is first used
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      getSuggestion()
    }
  }, [])

  return {
    currentSuggestion,
    isLoading,
    getSuggestion,
    getNextSuggestion,
    resetSuggestions
  }
}