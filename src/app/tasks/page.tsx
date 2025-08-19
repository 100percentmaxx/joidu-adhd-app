'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft, Plus, Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'
import LightningFAB from '@/components/ui/LightningFAB'

type FilterType = 'all' | 'today' | 'week' | 'priority' | 'category'
type Category = 'work' | 'health' | 'personal' | 'social' | 'creative' | 'finance'
type Priority = 'low' | 'medium' | 'high'
type ViewType = 'tasks' | 'schedule'

interface Task {
  id: string
  name: string
  category: Category
  priority: Priority
  dueDate: Date
  section: 'focus' | 'today' | 'tomorrow'
}

interface ScheduleEvent {
  id: string
  title: string
  startTime: string // "7:00"
  endTime: string   // "8:00"
  date: string      // "2024-04-16"
  category: Category
  icon?: string     // icon name from joidu-icons
}

export default function Tasks() {
  const router = useRouter()
  const currentDate = new Date()
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({})
  const [activeFilter, setActiveFilter] = useState<FilterType>('today')
  const [activeView, setActiveView] = useState<ViewType>('tasks')

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

  // Sample schedule events data
  const scheduleEvents: ScheduleEvent[] = [
    // Tuesday, April 16
    {
      id: 'e1',
      title: 'Personal trainer',
      startTime: '7:00',
      endTime: '8:00',
      date: '2024-04-16',
      category: 'health',
      icon: 'health.svg'
    },
    {
      id: 'e2',
      title: 'Meeting with Emma',
      startTime: '11:00',
      endTime: '11:30',
      date: '2024-04-16',
      category: 'work',
      icon: 'work.svg'
    },
    {
      id: 'e3',
      title: 'Coffee with Kay',
      startTime: '1:00',
      endTime: '2:00',
      date: '2024-04-16',
      category: 'social',
      icon: 'social.svg'
    },
    {
      id: 'e4',
      title: 'Pick up laundry',
      startTime: '3:00',
      endTime: '4:30',
      date: '2024-04-16',
      category: 'personal',
      icon: 'personal.svg'
    },
    {
      id: 'e5',
      title: 'Collins dinner',
      startTime: '7:00',
      endTime: '8:30',
      date: '2024-04-16',
      category: 'social',
      icon: 'social.svg'
    },
    // Wednesday, April 17
    {
      id: 'e6',
      title: 'Performance review',
      startTime: '8:00',
      endTime: '9:00',
      date: '2024-04-17',
      category: 'work',
      icon: 'work.svg'
    },
    {
      id: 'e7',
      title: 'Financial advisor appt.',
      startTime: '1:00',
      endTime: '2:00',
      date: '2024-04-17',
      category: 'finance',
      icon: 'finance.svg'
    },
    // Thursday, April 18
    {
      id: 'e8',
      title: 'Work on presentation',
      startTime: '3:00',
      endTime: '4:30',
      date: '2024-04-18',
      category: 'work',
      icon: 'work.svg'
    },
    {
      id: 'e9',
      title: 'Racquet ball w/ Curtis',
      startTime: '5:00',
      endTime: '6:00',
      date: '2024-04-18',
      category: 'health',
      icon: 'health.svg'
    },
    {
      id: 'e10',
      title: 'Oil painting class',
      startTime: '6:30',
      endTime: '8:00',
      date: '2024-04-18',
      category: 'creative',
      icon: 'creative.svg'
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
  
  const handleTaskToggle = (taskName: string) => {
    const isCurrentlyCompleted = completedTasks[taskName]
    
    if (isCurrentlyCompleted) {
      // Uncheck the task
      const newCompletedTasks = { ...completedTasks }
      delete newCompletedTasks[taskName]
      setCompletedTasks(newCompletedTasks)
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('joidu-completed-tasks', JSON.stringify(newCompletedTasks))
      }
    } else {
      // Check the task
      const newCompletedTasks = { ...completedTasks, [taskName]: true }
      setCompletedTasks(newCompletedTasks)
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('joidu-completed-tasks', JSON.stringify(newCompletedTasks))
      }
      // Navigate to celebration screen with task name
      router.push(`/task-complete?task=${encodeURIComponent(taskName)}`)
    }
  }

  const handleTaskDetail = (taskName: string) => {
    // Navigate to task detail screen
    router.push(`/task-detail?task=${encodeURIComponent(taskName)}`)
  }
  
  const renderCheckbox = (taskName: string, isCompleted?: boolean) => {
    const completed = isCompleted || completedTasks[taskName]
    
    if (completed) {
      return (
        <button 
          onClick={() => handleTaskToggle(taskName)}
          className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-80" 
          style={{ 
            backgroundColor: 'var(--checkbox-checked)',
            border: 'none',
            cursor: 'pointer'
          }}
          title="Click to uncheck task"
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
        </button>
      )
    }
    
    return (
      <button 
        onClick={() => handleTaskToggle(taskName)}
        className="w-6 h-6 rounded-full transition-all duration-200 hover:bg-gray-50" 
        style={{ 
          backgroundColor: 'var(--input-background)',
          border: '2px solid var(--checkbox-unchecked)',
          cursor: 'pointer'
        }}
        title="Click to check task"
      ></button>
    )
  }
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
  const monthName = monthNames[currentDate.getMonth()]
  const selectedDay = 16 // Tuesday, April 16 as shown in mockup
  
  // Generate calendar dates for the week
  const weekDates = [14, 15, 16, 17, 18, 19, 20]

  // Schedule functions
  const groupEventsByDay = () => {
    return scheduleEvents.reduce((groups, event) => {
      const eventDate = new Date(event.date)
      const dayKey = eventDate.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric'
      })
      
      if (!groups[dayKey]) {
        groups[dayKey] = []
      }
      groups[dayKey].push(event)
      return groups
    }, {} as Record<string, ScheduleEvent[]>)
  }

  const renderScheduleEvent = (event: ScheduleEvent) => {
    const categoryInfo = categoryData[event.category]
    return (
      <div 
        key={event.id}
        className="flex items-center transition-all duration-200 hover:scale-105 cursor-pointer"
        style={{
          /* 
           * WHITE CARD DESIGN - matches Home screen "Today's Schedule" section
           * - White background instead of colored
           * - Proper border and shadow
           * - Consistent padding and spacing
           */
          backgroundColor: 'var(--card-background)', // White in light mode, dark in dark mode
          border: '1px solid var(--border-color)',   // Light gray border
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'    // Subtle shadow for depth
        }}
        onClick={() => {
          // Handle event click - could navigate to event detail
          console.log('Event clicked:', event.title)
        }}
      >
        {/* 
         * CATEGORY ICON CIRCLE - Left side
         * - Small colored circle background matching category
         * - White icon on colored background for contrast
         * - Fixed size for consistency
         */}
        <div 
          className="flex items-center justify-center"
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: categoryInfo.color, // Category color for the circle
            borderRadius: '8px',
            marginRight: '12px',
            flexShrink: 0 // Prevent icon from shrinking
          }}
        >
          <img 
            src={categoryInfo.icon} 
            alt={event.category} 
            style={{ width: '16px', height: '16px' }} // Smaller icon size to fit in circle
          />
        </div>
        
        {/* 
         * TIME AND TITLE SECTION - Right side
         * - Time: 15pt semibold, primary text color
         * - Title: 15pt medium, primary text color  
         * - Horizontal layout: Time - Title on same line
         */}
        <div className="flex items-center flex-1">
          {/* Time Range */}
          <div 
            style={{
              color: 'var(--text-primary)', // Dark gray in light mode, light in dark mode
              fontSize: '15px',            // 15pt as specified
              fontWeight: '600',           // Semibold
              marginRight: '12px',
              flexShrink: 0               // Prevent time from wrapping
            }}
          >
            {event.startTime} - {event.endTime}
          </div>
          
          {/* Event Title */}
          <div 
            style={{
              color: 'var(--text-primary)', // Same color as time for consistency
              fontSize: '15px',            // 15pt as specified
              fontWeight: '500',           // Medium weight
              flex: 1                     // Take remaining space
            }}
          >
            {event.title}
          </div>
        </div>
      </div>
    )
  }

  const renderScheduleView = () => {
    const groupedEvents = groupEventsByDay()
    
    return (
      <div className="px-5 space-y-6">
        {/* Month Navigation Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button 
              className="p-2"
              style={{ color: 'var(--primary-blue)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>
            <h2 style={{ 
              color: 'var(--primary-blue)', 
              fontSize: '20px', 
              fontWeight: '600',
              margin: '0 16px'
            }}>
              April
            </h2>
            <button 
              className="p-2"
              style={{ color: 'var(--primary-blue)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
          </div>
          <button 
            onClick={() => router.push('/add-task')}
            className="flex items-center justify-center"
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: 'var(--primary-blue)',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Plus className="w-5 h-5" style={{ color: 'white' }} />
          </button>
        </div>

        {/* Events by Day */}
        {Object.entries(groupedEvents).length === 0 ? (
          <div className="text-center py-8">
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              No events scheduled
            </p>
          </div>
        ) : (
          Object.entries(groupedEvents).map(([dayKey, events]) => (
            <div key={dayKey} className="animate-fadeIn">
              {/* 
               * DAY HEADER - OUTSIDE card container
               * - Standalone text element, not inside a card
               * - 17pt Medium weight, primary text color
               * - 24px margin bottom for proper spacing
               * - First header has no top margin, others have 24px
               */}
              <h3 
                style={{ 
                  color: 'var(--text-primary)',  // Dark gray in light mode, light in dark mode
                  fontSize: '17px',            // 17pt as specified in requirements  
                  fontWeight: '500',           // Medium weight (not 600/semibold)
                  marginBottom: '24px',        // 24px spacing before cards
                  marginTop: dayKey === Object.keys(groupedEvents)[0] ? '0' : '24px' // No margin on first, 24px on others
                }}
              >
                {dayKey}
              </h3>
              
              {/* 
               * EVENT CARDS CONTAINER
               * - Each event is its own white card
               * - Cards are separate from the day header
               * - No wrapping container around cards
               */}
              <div>
                {events.map(event => renderScheduleEvent(event))}
              </div>
            </div>
          ))
        )}
      </div>
    )
  }

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

      {/* Tasks/Schedule Toggle */}
      <div className="flex flex-col items-center px-5 py-4">
        <div className="relative" style={{ width: '360px', height: '36px', backgroundColor: 'var(--button-secondary-bg)', borderRadius: '18px', padding: '2px' }}>
          {/* Sliding Background */}
          <div 
            className="absolute transition-all duration-300 ease-in-out"
            style={{ 
              width: '178px', 
              height: '32px', 
              backgroundColor: 'var(--primary-blue)',
              borderRadius: '16px',
              left: activeView === 'tasks' ? '2px' : '180px',
              top: '2px'
            }}
          />
          {/* Tasks Button */}
          <button 
            onClick={() => setActiveView('tasks')}
            className="absolute transition-all duration-300 ease-in-out z-10"
            style={{ 
              width: '178px', 
              height: '32px', 
              backgroundColor: 'transparent',
              left: '2px',
              top: '2px',
              fontSize: '16px',
              fontWeight: '500',
              borderRadius: '16px',
              border: 'none',
              cursor: 'pointer',
              color: activeView === 'tasks' ? 'white' : 'var(--text-secondary)'
            }}
          >
            Tasks
          </button>
          {/* Schedule Button */}
          <button 
            onClick={() => setActiveView('schedule')}
            className="absolute transition-all duration-300 ease-in-out z-10"
            style={{ 
              width: '178px', 
              height: '32px', 
              backgroundColor: 'transparent',
              left: '180px',
              top: '2px',
              fontSize: '16px',
              fontWeight: '500',
              borderRadius: '16px',
              border: 'none',
              cursor: 'pointer',
              color: activeView === 'schedule' ? 'white' : 'var(--text-secondary)'
            }}
          >
            Schedule
          </button>
        </div>
        
        {/* Filter Buttons - Only show for Tasks view */}
        {activeView === 'tasks' && (
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
        )}
      </div>

      {/* Main Content - Conditional Rendering */}
      {activeView === 'tasks' ? (
        <>
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
        </>
      ) : (
        /* Schedule View */
        renderScheduleView()
      )}

      {/* Bottom spacing for navigation */}
      <div className="h-20"></div>

      {/* Lightning FAB */}
      <LightningFAB />
    </div>
  )
} 