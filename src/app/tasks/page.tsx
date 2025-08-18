'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft, Plus, Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'
import LightningFAB from '@/components/ui/LightningFAB'

type FilterType = 'all' | 'today' | 'week' | 'priority' | 'category'
type Category = 'work' | 'health' | 'personal' | 'social' | 'creative' | 'finance'
type Priority = 'low' | 'medium' | 'high'

interface Task {
  id: string
  name: string
  category: Category
  priority: Priority
  dueDate: Date
  section: 'focus' | 'today' | 'tomorrow'
}

export default function Tasks() {
  const router = useRouter()
  const currentDate = new Date()
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({})
  const [activeFilter, setActiveFilter] = useState<FilterType>('today')

  // Define task data with categories, priorities, and dates
  const allTasks: Task[] = [
    {
      id: '1',
      name: 'Reply to Naoya Oka email',
      category: 'work',
      priority: 'high',
      dueDate: new Date(currentDate),
      section: 'focus'
    },
    {
      id: '2', 
      name: 'Reply to emails',
      category: 'work',
      priority: 'medium',
      dueDate: new Date(currentDate),
      section: 'today'
    },
    {
      id: '3',
      name: 'Meditate 15 min.',
      category: 'health', 
      priority: 'medium',
      dueDate: new Date(currentDate),
      section: 'today'
    },
    {
      id: '4',
      name: 'Repair garden gate',
      category: 'personal',
      priority: 'low',
      dueDate: new Date(currentDate),
      section: 'today'
    },
    {
      id: '5',
      name: 'Buy bread',
      category: 'personal',
      priority: 'low', 
      dueDate: new Date(currentDate),
      section: 'today'
    },
    {
      id: '6',
      name: 'Print bank statements',
      category: 'finance',
      priority: 'medium',
      dueDate: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000), // Tomorrow
      section: 'tomorrow'
    },
    {
      id: '7',
      name: 'Call John to confirm Thurs.',
      category: 'social',
      priority: 'high',
      dueDate: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000), // Tomorrow
      section: 'tomorrow'
    }
  ]
  
  // Load completed tasks and filter state from localStorage
  useEffect(() => {
    // Only access localStorage on client side
    if (typeof window === 'undefined') return
    
    const savedTasks = localStorage.getItem('joidu-completed-tasks')
    if (savedTasks) {
      try {
        setCompletedTasks(JSON.parse(savedTasks))
      } catch (error) {
        console.error('Error loading completed tasks:', error)
      }
    }

    const savedFilter = localStorage.getItem('joidu-tasks-filter')
    if (savedFilter) {
      setActiveFilter(savedFilter as FilterType)
    }
  }, [])

  // Save filter state to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('joidu-tasks-filter', activeFilter)
    }
  }, [activeFilter])

  // Category colors and icons mapping
  const categoryData = {
    work: { color: 'var(--category-work-light)', icon: '/icons/work.svg' },
    health: { color: 'var(--category-health-light)', icon: '/icons/health.svg' },
    personal: { color: 'var(--category-personal-light)', icon: '/icons/personal.svg' },
    social: { color: 'var(--category-social-light)', icon: '/icons/social.svg' },
    creative: { color: 'var(--category-creative-light)', icon: '/icons/creative.svg' },
    finance: { color: 'var(--category-finance-light)', icon: '/icons/finance.svg' }
  }

  // Filter tasks based on active filter
  const getFilteredTasks = () => {
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay()) // Sunday
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6) // Saturday

    switch (activeFilter) {
      case 'today':
        return allTasks.filter(task => 
          task.dueDate.toDateString() === today.toDateString()
        )
      case 'week':
        return allTasks.filter(task => 
          task.dueDate >= startOfWeek && task.dueDate <= endOfWeek
        )
      case 'priority':
        return allTasks
          .filter(task => task.priority === 'high')
          .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
      case 'category':
        return allTasks.sort((a, b) => {
          if (a.category !== b.category) {
            return a.category.localeCompare(b.category)
          }
          return a.dueDate.getTime() - b.dueDate.getTime()
        })
      case 'all':
      default:
        return allTasks.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
    }
  }

  const filteredTasks = getFilteredTasks()

  // Group tasks by section for display
  const groupTasksBySection = (tasks: Task[]) => {
    if (activeFilter === 'category') {
      // Group by category when category filter is active
      return tasks.reduce((groups, task) => {
        const category = task.category
        if (!groups[category]) {
          groups[category] = []
        }
        groups[category].push(task)
        return groups
      }, {} as Record<string, Task[]>)
    } else {
      // Group by section (focus, today, tomorrow)
      return tasks.reduce((groups, task) => {
        const section = task.section
        if (!groups[section]) {
          groups[section] = []
        }
        groups[section].push(task)
        return groups
      }, {} as Record<string, Task[]>)
    }
  }

  const groupedTasks = groupTasksBySection(filteredTasks)

  // Function to render individual task item
  const renderTaskItem = (task: Task) => {
    const categoryInfo = categoryData[task.category]
    return (
      <div key={task.id} className="flex overflow-hidden" style={{ height: '60px' }}>
        <div className="flex items-center justify-between" style={{ 
          backgroundColor: categoryInfo.color,
          borderRadius: '12px',
          width: '100px',
          height: '100%',
          paddingLeft: '12px',
          paddingRight: '12px'
        }}>
          <img src={categoryInfo.icon} alt={task.category} style={{ width: '30px', height: '30px' }} />
          {renderCheckbox(task.name)}
        </div>
        <div className="flex-1 flex items-center" style={{ 
          backgroundColor: 'var(--card-background)',
          paddingLeft: '16px'
        }}>
          <button 
            onClick={() => handleTaskDetail(task.name)}
            style={{ 
              color: completedTasks[task.name] ? 'var(--text-disabled)' : 'var(--text-primary)', 
              fontSize: '17px', 
              fontWeight: 500,
              textDecoration: completedTasks[task.name] ? 'line-through' : 'none',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            {task.name}
            {activeFilter === 'priority' && (
              <span className="ml-2 px-2 py-1 text-xs rounded-full" style={{
                backgroundColor: task.priority === 'high' ? '#ff4444' : task.priority === 'medium' ? '#ffa500' : '#44ff44',
                color: 'white'
              }}>
                {task.priority.toUpperCase()}
              </span>
            )}
          </button>
        </div>
      </div>
    )
  }

  // Function to render focus section (special styling)
  const renderFocusSection = (tasks: Task[]) => {
    if (tasks.length === 0) return null
    
    return (
      <div style={{ backgroundColor: 'var(--category-personal-light)', border: '2px solid var(--category-personal-dark)', borderRadius: '12px', padding: '4px' }}>
        <h3 style={{ color: 'var(--primary-blue)', fontSize: '17px', fontWeight: '500', marginBottom: '4px', paddingLeft: '8px', paddingTop: '4px' }}>
          Focus on Just One Thing
        </h3>
        {tasks.map(task => (
          <div key={task.id} style={{ backgroundColor: 'var(--card-background)', border: '2px solid var(--category-personal-dark)', borderRadius: '8px', padding: '8px 16px', display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            {renderCheckbox(task.name)}
            <button 
              onClick={() => handleTaskDetail(task.name)}
              style={{ 
                color: completedTasks[task.name] ? 'var(--text-disabled)' : 'var(--text-primary)', 
                fontWeight: '500', 
                marginLeft: '12px',
                textDecoration: completedTasks[task.name] ? 'line-through' : 'none',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              {task.name}
            </button>
          </div>
        ))}
      </div>
    )
  }

  // Function to get section title
  const getSectionTitle = (key: string) => {
    if (activeFilter === 'category') {
      return key.charAt(0).toUpperCase() + key.slice(1)
    }
    switch (key) {
      case 'focus': return 'Focus on Just One Thing'
      case 'today': return 'Today'
      case 'tomorrow': return 'Tomorrow'
      default: return key
    }
  }
  
  const handleTaskComplete = (taskName: string) => {
    const newCompletedTasks = { ...completedTasks, [taskName]: true }
    setCompletedTasks(newCompletedTasks)
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('joidu-completed-tasks', JSON.stringify(newCompletedTasks))
    }
    // Navigate to celebration screen with task name
    router.push(`/task-complete?task=${encodeURIComponent(taskName)}`)
  }

  const handleTaskDetail = (taskName: string) => {
    // Navigate to task detail screen
    router.push(`/task-detail?task=${encodeURIComponent(taskName)}`)
  }
  
  const renderCheckbox = (taskName: string, isCompleted?: boolean) => {
    const completed = isCompleted || completedTasks[taskName]
    
    if (completed) {
      return (
        <div 
          className="w-6 h-6 rounded-full flex items-center justify-center" 
          style={{ 
            backgroundColor: 'var(--checkbox-checked)',
            border: 'none'
          }}
        >
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="3"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="20,6 9,17 4,12"></polyline>
          </svg>
        </div>
      )
    }
    
    return (
      <button 
        onClick={() => handleTaskComplete(taskName)}
        className="w-6 h-6 rounded-full transition-all duration-200 hover:bg-gray-50" 
        style={{ 
          backgroundColor: 'var(--input-background)',
          border: '2px solid var(--checkbox-unchecked)'
        }}
      ></button>
    )
  }
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
  const monthName = monthNames[currentDate.getMonth()]
  const selectedDay = 16 // Tuesday, April 16 as shown in mockup
  
  // Generate calendar dates for the week
  const weekDates = [14, 15, 16, 17, 18, 19, 20]

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-5 py-4">
        <button 
          onClick={() => router.push('/')}
          className="flex items-center justify-center w-10 h-10"
        >
          <ArrowLeft className="w-6 h-6" style={{ color: 'var(--primary-blue)' }} />
        </button>
        <button 
          onClick={() => router.push('/add-task')}
          className="flex items-center justify-center w-10 h-10"
        >
          <Plus className="w-6 h-6" style={{ color: 'var(--primary-blue)' }} />
        </button>
      </div>

      {/* Tasks/Schedule Slider */}
      <div className="flex flex-col items-center px-5 py-4">
        <div className="relative" style={{ width: '360px', height: '36px', backgroundColor: 'var(--button-secondary-bg)', borderRadius: '18px', padding: '2px' }}>
          <button 
            className="slider-button absolute text-white font-medium"
            style={{ 
              width: '180px', 
              height: '32px', 
              backgroundColor: 'var(--primary-blue)',
              left: '2px',
              top: '2px',
              fontSize: '16px',
              fontWeight: '500',
              borderRadius: '16px'
            }}
          >
            Tasks
          </button>
          <button 
            className="slider-button absolute text-white font-medium"
            style={{ 
              width: '180px', 
              height: '32px', 
              backgroundColor: 'var(--button-secondary-bg)',
              left: '182px',
              top: '2px',
              fontSize: '16px',
              fontWeight: '500',
              borderRadius: '16px'
            }}
          >
            Schedule
          </button>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex justify-between mt-4" style={{ width: '360px' }}>
          <button 
            onClick={() => setActiveFilter('today')}
            className="slider-button text-white font-medium transition-all duration-200 hover:scale-105"
            style={{ 
              width: '80px', 
              height: '36px', 
              backgroundColor: activeFilter === 'today' ? 'var(--primary-blue)' : 'var(--button-secondary-bg)',
              fontSize: '14px',
              borderRadius: '18px'
            }}
          >
            Today
          </button>
          <button 
            onClick={() => setActiveFilter('week')}
            className="slider-button text-white font-medium transition-all duration-200 hover:scale-105"
            style={{ 
              width: '80px', 
              height: '36px', 
              backgroundColor: activeFilter === 'week' ? 'var(--primary-blue)' : 'var(--button-secondary-bg)',
              fontSize: '14px',
              borderRadius: '18px'
            }}
          >
            This Week
          </button>
          <button 
            onClick={() => setActiveFilter('priority')}
            className="slider-button text-white font-medium transition-all duration-200 hover:scale-105"
            style={{ 
              width: '80px', 
              height: '36px', 
              backgroundColor: activeFilter === 'priority' ? 'var(--primary-blue)' : 'var(--button-secondary-bg)',
              fontSize: '14px',
              borderRadius: '18px'
            }}
          >
            Priority
          </button>
          <button 
            onClick={() => setActiveFilter('category')}
            className="slider-button text-white font-medium transition-all duration-200 hover:scale-105"
            style={{ 
              width: '80px', 
              height: '36px', 
              backgroundColor: activeFilter === 'category' ? 'var(--primary-blue)' : 'var(--button-secondary-bg)',
              fontSize: '14px',
              borderRadius: '18px'
            }}
          >
            Category
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="px-5 mb-6">
        <div className="text-center mb-3">
          <h3 className="font-bold" style={{ color: 'var(--primary-blue)' }}>
            {monthName}
          </h3>
        </div>
        
        {/* Days of week */}
        <div className="grid grid-cols-7 gap-0 text-center mb-1">
          {dayNames.map((day, index) => (
            <div key={index} className="text-blue-600 font-medium" style={{ color: 'var(--primary-blue)' }}>
              {day}
            </div>
          ))}
        </div>
        
        {/* Dates */}
        <div className="grid grid-cols-7 gap-0 text-center">
          {weekDates.map((date, index) => (
            <div key={index} className="text-blue-600" style={{ color: 'var(--primary-blue)' }}>
              <div className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-full mx-auto ${
                date === selectedDay 
                  ? 'text-white' 
                  : 'text-blue-600'
              }`} style={{
                backgroundColor: date === selectedDay ? 'var(--primary-blue)' : 'transparent',
                color: date === selectedDay ? '#ffffff' : 'var(--primary-blue)'
              }}>
                {date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="px-5 mb-6">
        <div style={{ height: '1px', backgroundColor: 'var(--border-color)' }}></div>
      </div>

      {/* Dynamic Task Sections */}
      <div className="px-5 space-y-6">
        <div className="transition-all duration-300 ease-in-out">
          {Object.entries(groupedTasks).length === 0 ? (
            <div className="text-center py-8">
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
                No tasks found for the selected filter.
              </p>
              <button
                onClick={() => setActiveFilter('today')}
                className="mt-2 px-4 py-2 rounded-lg transition-all duration-200"
                style={{
                  backgroundColor: 'var(--primary-blue)',
                  color: 'white',
                  fontSize: '14px'
                }}
              >
                Show Today's Tasks
              </button>
            </div>
          ) : (
            Object.entries(groupedTasks).map(([key, tasks]) => {
              if (tasks.length === 0) return null
              
              // Special rendering for focus section
              if (key === 'focus' && activeFilter !== 'category') {
                return renderFocusSection(tasks)
              }
              
              // Regular section rendering
              return (
                <div key={key} className="animate-fadeIn">
                  <h2 className="mb-3" style={{ color: 'var(--text-primary)', fontSize: '17px', fontWeight: 500, marginTop: '12px' }}>
                    {getSectionTitle(key)}
                    {activeFilter === 'category' && (
                      <span className="ml-2 px-2 py-1 text-xs rounded-full" style={{
                        backgroundColor: categoryData[key as Category]?.color || 'var(--button-secondary-bg)',
                        color: 'var(--text-primary)'
                      }}>
                        {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
                      </span>
                    )}
                  </h2>
                  <div className="bg-white rounded-lg" style={{ 
                    backgroundColor: 'var(--card-background)',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    padding: '16px'
                  }}>
                    <div className="space-y-2">
                      {tasks.map(task => renderTaskItem(task))}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Add Task Button - Below task sections */}
      <div className="px-5" style={{ marginTop: '12px' }}>
        <div className="flex justify-end">
          <button
            onClick={() => router.push('/add-task')}
            className="px-6 py-3 rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: 'var(--primary-blue)',
              color: 'white',
              fontSize: '16px',
              fontWeight: 600
            }}
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Bottom spacing for navigation */}
      <div className="h-20"></div>

      {/* Lightning FAB */}
      <LightningFAB />
    </div>
  )
} 