'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { ArrowLeft, Plus, Calendar } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import LightningFAB from '@/components/ui/LightningFAB'
import { useSupabaseData } from '@/hooks/useSupabaseData'
import { useUser } from '@clerk/nextjs'

type FilterType = 'all' | 'today' | 'week' | 'priority' | 'category'
type Category = 'work' | 'health' | 'personal' | 'social' | 'creative' | 'finance'
type Priority = 'low' | 'medium' | 'high'
type ViewType = 'tasks' | 'schedule'

// Updated to match Supabase Task structure
interface Task {
  id: string
  title: string // Changed from 'name' to 'title' to match Supabase schema
  category: Category
  priority: Priority
  estimated_minutes: number | null
  is_completed: boolean
  created_at: string
  due_date?: string | null
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

function TasksContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentDate = new Date()
  const { user: clerkUser } = useUser()
  
  // Supabase data integration
  const {
    tasks,
    tasksLoading,
    tasksError,
    actions
  } = useSupabaseData()
  
  const [activeFilter, setActiveFilter] = useState<FilterType>('today')
  const [activeView, setActiveView] = useState<ViewType>('tasks')
  const [userEvents, setUserEvents] = useState<ScheduleEvent[]>([])
  
  // Schedule view state for month navigation
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  // Tasks view calendar state - Enhanced dual navigation system
  const [selectedDate, setSelectedDate] = useState(new Date()) // Currently selected date
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    // Initialize to start of current week (can be any 7-day period)
    const today = new Date()
    const dayOfWeek = today.getDay() // 0 = Sunday, 1 = Monday, etc.
    const weekStart = new Date(today)
    weekStart.setDate(today.getDate() - dayOfWeek) // Start from Sunday
    return weekStart
  })
  const [tasksCurrentMonth, setTasksCurrentMonth] = useState(new Date()) // Month shown in Tasks view

  // Transform Supabase tasks to match component structure
  const transformSupabaseTasks = (supabaseTasks: any[]): Task[] => {
    return supabaseTasks.map(task => ({
      id: task.id,
      title: task.title,
      category: task.category as Category,
      priority: task.priority as Priority,
      estimated_minutes: task.estimated_minutes,
      is_completed: task.is_completed,
      created_at: task.created_at,
      due_date: task.due_date
    }))
  }
  
  const allTasks = transformSupabaseTasks(tasks || [])

  // Sample schedule events data with current dates
  const getSampleEvents = (): ScheduleEvent[] => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    const dayAfter = new Date(today)
    dayAfter.setDate(today.getDate() + 2)
    
    const formatDate = (date: Date) => date.toISOString().split('T')[0]
    
    return [
      // Today
      {
        id: 'e1',
        title: 'Personal trainer',
        startTime: '7:00',
        endTime: '8:00',
        date: formatDate(today),
        category: 'health',
        icon: 'health.svg'
      },
      {
        id: 'e2',
        title: 'Meeting with Emma',
        startTime: '11:00',
        endTime: '11:30',
        date: formatDate(today),
        category: 'work',
        icon: 'work.svg'
      },
      {
        id: 'e3',
        title: 'Coffee with Kay',
        startTime: '1:00',
        endTime: '2:00',
        date: formatDate(today),
        category: 'social',
        icon: 'social.svg'
      },
      {
        id: 'e4',
        title: 'Pick up laundry',
        startTime: '3:00',
        endTime: '4:30',
        date: formatDate(today),
        category: 'personal',
        icon: 'personal.svg'
      },
      {
        id: 'e5',
        title: 'Collins dinner',
        startTime: '7:00',
        endTime: '8:30',
        date: formatDate(today),
        category: 'social',
        icon: 'social.svg'
      },
      // Tomorrow
      {
        id: 'e6',
        title: 'Performance review',
        startTime: '8:00',
        endTime: '9:00',
        date: formatDate(tomorrow),
        category: 'work',
        icon: 'work.svg'
      },
      {
        id: 'e7',
        title: 'Financial advisor appt.',
        startTime: '1:00',
        endTime: '2:00',
        date: formatDate(tomorrow),
        category: 'finance',
        icon: 'finance.svg'
      },
      // Day after tomorrow
      {
        id: 'e8',
        title: 'Work on presentation',
        startTime: '3:00',
        endTime: '4:30',
        date: formatDate(dayAfter),
        category: 'work',
        icon: 'work.svg'
      },
      {
        id: 'e9',
        title: 'Racquet ball w/ Curtis',
        startTime: '5:00',
        endTime: '6:00',
        date: formatDate(dayAfter),
        category: 'health',
        icon: 'health.svg'
      },
      {
        id: 'e10',
        title: 'Oil painting class',
        startTime: '6:30',
        endTime: '8:00',
        date: formatDate(dayAfter),
        category: 'creative',
        icon: 'creative.svg'
      }
    ]
  }

  // Get combined events (sample + user events)
  const getAllEvents = (): ScheduleEvent[] => {
    const sampleEvents = getSampleEvents()
    return [...sampleEvents, ...userEvents]
  }
  
  // Load filter state and events from localStorage
  useEffect(() => {
    // Only access localStorage on client side
    if (typeof window === 'undefined') return
    
    const savedFilter = localStorage.getItem('joidu-tasks-filter')
    if (savedFilter) {
      setActiveFilter(savedFilter as FilterType)
    }

    // Load user events from localStorage
    const savedEvents = localStorage.getItem('joidu-events')
    if (savedEvents) {
      try {
        const events = JSON.parse(savedEvents)
        setUserEvents(events)
      } catch (error) {
        console.error('Error loading events:', error)
      }
    }
  }, [])

  // Handle URL parameters to set initial view
  useEffect(() => {
    const view = searchParams.get('view')
    if (view === 'schedule') {
      setActiveView('schedule')
    }
  }, [searchParams])

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

  // ==========================================
  // DUAL NAVIGATION SYSTEM - Calendar Functions
  // ==========================================

  /**
   * MONTH NAVIGATION (Top Level)
   * - Changes the month displayed in the calendar header
   * - Updates the current week to show a week from the new month
   * - Maintains selected date if it exists in the new month
   */
  const navigateTasksMonth = (direction: 'prev' | 'next') => {
    setTasksCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth)
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1)
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1)
      }
      
      // Update current week to show first week of new month
      const firstDayOfMonth = new Date(newMonth.getFullYear(), newMonth.getMonth(), 1)
      const dayOfWeek = firstDayOfMonth.getDay()
      const weekStart = new Date(firstDayOfMonth)
      weekStart.setDate(firstDayOfMonth.getDate() - dayOfWeek) // Start from Sunday
      setCurrentWeekStart(weekStart)
      
      return newMonth
    })
  }

  /**
   * WEEK NAVIGATION (Secondary Level)
   * - Moves the displayed week by 7 days in either direction
   * - Can cross month boundaries seamlessly
   * - Updates month display if week crosses into different month
   */
  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeekStart(prevWeekStart => {
      const newWeekStart = new Date(prevWeekStart)
      if (direction === 'prev') {
        newWeekStart.setDate(newWeekStart.getDate() - 7)
      } else {
        newWeekStart.setDate(newWeekStart.getDate() + 7)
      }
      
      // Update month display if week crossed month boundary
      const weekMiddle = new Date(newWeekStart)
      weekMiddle.setDate(newWeekStart.getDate() + 3) // Wednesday of the week
      
      if (weekMiddle.getMonth() !== tasksCurrentMonth.getMonth() || 
          weekMiddle.getFullYear() !== tasksCurrentMonth.getFullYear()) {
        setTasksCurrentMonth(new Date(weekMiddle.getFullYear(), weekMiddle.getMonth(), 1))
      }
      
      return newWeekStart
    })
  }

  /**
   * DATE SELECTION
   * - Handles clicking on individual calendar dates
   * - Updates selected date and task filtering
   * - Provides visual feedback with blue circle
   */
  const handleDateSelect = (date: Date) => {
    setSelectedDate(new Date(date))
  }

  /**
   * WEEK DATES GENERATION
   * - Generates array of 7 dates starting from currentWeekStart
   * - Handles month boundaries (may show dates from 2 different months)
   * - Returns Date objects for proper comparison and formatting
   */
  const getWeekDates = (): Date[] => {
    const dates: Date[] = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart)
      date.setDate(currentWeekStart.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  /**
   * SWIPE GESTURE HANDLING
   * - Detects horizontal swipes on calendar area
   * - Left swipe: Next week, Right swipe: Previous week
   * - Uses touch events with minimum distance threshold
   */
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    setTouchStartX(touch.clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return
    
    const touch = e.changedTouches[0]
    const diff = touchStartX - touch.clientX
    const minSwipeDistance = 50 // Minimum pixels for swipe detection
    
    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        // Swiped left - next week
        navigateWeek('next')
      } else {
        // Swiped right - previous week
        navigateWeek('prev')
      }
    }
    setTouchStartX(null)
  }

  // Touch handling state for swipe gestures
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  /**
   * KEYBOARD NAVIGATION SUPPORT
   * - Arrow keys for week navigation
   * - Enter/Space for date selection
   * - Escape to return to today
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        navigateWeek('prev')
        break
      case 'ArrowRight':
        e.preventDefault()
        navigateWeek('next')
        break
      case 'ArrowUp':
        e.preventDefault()
        navigateTasksMonth('prev')
        break
      case 'ArrowDown':
        e.preventDefault()
        navigateTasksMonth('next')
        break
      case 'Home':
      case 'Escape':
        e.preventDefault()
        // Return to today
        const today = new Date()
        setSelectedDate(today)
        const dayOfWeek = today.getDay()
        const weekStart = new Date(today)
        weekStart.setDate(today.getDate() - dayOfWeek)
        setCurrentWeekStart(weekStart)
        setTasksCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1))
        break
    }
  }

  // Filter tasks based on active filter and selected date
  const getFilteredTasks = () => {
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay()) // Sunday
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6) // Saturday

    switch (activeFilter) {
      case 'today':
        // Show tasks for selected date or tasks without due dates (default to today)
        return allTasks.filter(task => {
          if (!task.due_date) return true // Show tasks without due dates
          const taskDate = new Date(task.due_date)
          return taskDate.toDateString() === selectedDate.toDateString()
        })
      case 'week':
        return allTasks.filter(task => {
          if (!task.due_date) return true // Include tasks without due dates
          const taskDate = new Date(task.due_date)
          return taskDate >= startOfWeek && taskDate <= endOfWeek
        })
      case 'priority':
        return allTasks
          .filter(task => task.priority === 'high')
          .sort((a, b) => {
            const dateA = a.due_date ? new Date(a.due_date).getTime() : 0
            const dateB = b.due_date ? new Date(b.due_date).getTime() : 0
            return dateA - dateB
          })
      case 'category':
        return allTasks.sort((a, b) => {
          if (a.category !== b.category) {
            return a.category.localeCompare(b.category)
          }
          const dateA = a.due_date ? new Date(a.due_date).getTime() : 0
          const dateB = b.due_date ? new Date(b.due_date).getTime() : 0
          return dateA - dateB
        })
      case 'all':
      default:
        return allTasks.sort((a, b) => {
          const dateA = a.due_date ? new Date(a.due_date).getTime() : 0
          const dateB = b.due_date ? new Date(b.due_date).getTime() : 0
          return dateA - dateB
        })
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
      // Group by priority or time-based sections
      return tasks.reduce((groups, task) => {
        let section = 'today' // Default section
        
        if (task.priority === 'high') {
          section = 'focus'
        } else if (task.due_date) {
          const taskDate = new Date(task.due_date)
          const tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          
          if (taskDate.toDateString() === tomorrow.toDateString()) {
            section = 'tomorrow'
          }
        }
        
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
          {renderCheckbox(task)}
        </div>
        <div className="flex-1 flex items-center" style={{ 
          backgroundColor: 'var(--card-background)',
          paddingLeft: '16px'
        }}>
          <button 
            onClick={() => handleTaskDetail(task)}
            style={{ 
              color: task.is_completed ? 'var(--text-disabled)' : 'var(--text-primary)', 
              fontSize: '17px', 
              fontWeight: 500,
              textDecoration: task.is_completed ? 'line-through' : 'none',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            {task.title}
            {activeFilter === 'priority' && (
              <span className="ml-2 px-2 py-1 text-xs rounded-full" style={{
                backgroundColor: task.priority === 'high' ? '#ff4444' : task.priority === 'medium' ? '#ffa500' : '#44ff44',
                color: 'white'
              }}>
                {task.priority.toUpperCase()}
              </span>
            )}
            {task.estimated_minutes && (
              <span className="ml-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                ~{task.estimated_minutes}min
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
            {renderCheckbox(task)}
            <button 
              onClick={() => handleTaskDetail(task)}
              style={{ 
                color: task.is_completed ? 'var(--text-disabled)' : 'var(--text-primary)', 
                fontWeight: '500', 
                marginLeft: '12px',
                textDecoration: task.is_completed ? 'line-through' : 'none',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              {task.title}
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
  
  const handleTaskToggle = async (task: Task) => {
    try {
      if (task.is_completed) {
        // Uncheck the task
        await actions.toggleTaskComplete(task.id, false)
      } else {
        // Check the task
        await actions.toggleTaskComplete(task.id, true)
        // Navigate to celebration screen with task name
        router.push(`/task-complete?task=${encodeURIComponent(task.title)}`)
      }
    } catch (error) {
      console.error('Failed to toggle task:', error)
      // Could add user feedback here
    }
  }

  const handleTaskDetail = (task: Task) => {
    // Navigate to task detail screen with task ID
    router.push(`/task-detail?taskId=${task.id}&task=${encodeURIComponent(task.title)}`)
  }
  
  const renderCheckbox = (task: Task) => {
    const completed = task.is_completed
    
    if (completed) {
      return (
        <button 
          onClick={() => handleTaskToggle(task)}
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
        onClick={() => handleTaskToggle(task)}
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
  // Calendar display constants
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
  // Get current week dates for display
  const weekDates = getWeekDates()
  const monthName = monthNames[tasksCurrentMonth.getMonth()]

  // Month navigation functions for Schedule view
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth)
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1)
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1)
      }
      return newMonth
    })
  }

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long' })
  }

  // Smart date labeling logic for Schedule view
  const getDateLabel = (eventDate: Date): string => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    
    // Clear time for accurate date comparison
    const eventDateOnly = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate())
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const tomorrowOnly = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate())
    
    if (eventDateOnly.getTime() === todayOnly.getTime()) {
      return 'Today'
    } else if (eventDateOnly.getTime() === tomorrowOnly.getTime()) {
      return 'Tomorrow'
    } else {
      // Format as "Wednesday, April 17"
      return eventDate.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric'
      })
    }
  }

  // Schedule functions - Filter events by current month and group by day
  const groupEventsByDay = () => {
    // Filter events to only show those in the current viewed month
    const monthEvents = getAllEvents().filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.getMonth() === currentMonth.getMonth() && 
             eventDate.getFullYear() === currentMonth.getFullYear()
    })

    // Group filtered events by date with smart labeling
    return monthEvents.reduce((groups, event) => {
      const eventDate = new Date(event.date)
      const dateLabel = getDateLabel(eventDate)
      
      if (!groups[dateLabel]) {
        groups[dateLabel] = []
      }
      groups[dateLabel].push(event)
      return groups
    }, {} as Record<string, ScheduleEvent[]>)
  }

  const renderScheduleEvent = (event: ScheduleEvent) => {
    const categoryInfo = categoryData[event.category]
    return (
      <div 
        key={event.id}
        className="flex overflow-hidden transition-all duration-200 hover:scale-105 cursor-pointer"
        style={{
          /* 
           * EXACT COPY of Home screen schedule card styling
           * - Two-part structure: colored tab + white card
           * - Fixed height, proper border radius on each part
           * - 3px category-colored border on white section
           * - Margin is now handled by container logic
           */
          height: '60px' // Fixed height like Home screen
        }}
        onClick={() => {
          // Navigate to event detail screen
          const eventSlug = event.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
          router.push(`/schedule/${eventSlug}`)
        }}
      >
        {/* 
         * LEFT CATEGORY TAB - Colored section with icon
         * - Category background color
         * - Rounded left corners only
         * - Fixed 60px width
         * - Icon centered
         */}
        <div 
          className="flex items-center justify-center"
          style={{
            backgroundColor: categoryInfo.color,
            borderRadius: '12px 0px 0px 12px', // Only left corners rounded
            width: '60px',
            height: '100%'
          }}
        >
          <img 
            src={categoryInfo.icon} 
            alt={event.category} 
            style={{ width: '30px', height: '30px' }} // Same icon size as Home screen
          />
        </div>
        
        {/* 
         * RIGHT WHITE CARD SECTION - Content area
         * - White background
         * - 3px border in category color (top, right, bottom)
         * - Rounded right corners only
         * - Text content: Time above, Title below (vertical stack)
         */}
        <div 
          className="flex-1 border-r border-t border-b flex items-center"
          style={{ 
            backgroundColor: 'var(--card-background)', // White background
            borderColor: categoryInfo.color,           // Category color border
            borderWidth: '3px',                       // 3px border thickness
            borderRadius: '0px 12px 12px 0px',        // Only right corners rounded
            paddingLeft: '16px',                      // Left padding for content
            height: '100%'
          }}
        >
          {/* 
           * TEXT CONTENT - Vertical stack like Home screen
           * - Time: 17px bold (top line)
           * - Title: 17px medium (bottom line)
           * - Both use primary text color
           */}
          <div>
            {/* Time Range - Top line, bold */}
            <div style={{ 
              color: 'var(--text-primary)', 
              fontSize: '17px', 
              fontWeight: 700 // Bold like Home screen
            }}>
              {event.startTime} - {event.endTime}
            </div>
            
            {/* Event Title - Bottom line, medium */}
            <div style={{ 
              color: 'var(--text-primary)', 
              fontSize: '17px', 
              fontWeight: 500 // Medium weight like Home screen
            }}>
              {event.title}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderScheduleView = () => {
    const groupedEvents = groupEventsByDay()
    
    return (
      <div className="px-5">
        {/* Events by Day - Smart date labeling is now handled in groupEventsByDay */}
        {Object.entries(groupedEvents).length === 0 ? (
          <div className="text-center py-8">
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              No events scheduled for {getMonthName(currentMonth)}
            </p>
          </div>
        ) : (
          Object.entries(groupedEvents).map(([dateLabel, events]) => (
            <div key={dateLabel} className="animate-fadeIn">
              {/* 
               * DATE HEADER - OUTSIDE white container  
               * - Smart labels: "Today", "Tomorrow", or "Wednesday, April 17"
               * - 17pt Medium weight, #4c4c4c color
               * - 24px margin top, 16px margin bottom
               * - Positioned above each day's event group
               */}
              <h3 
                style={{ 
                  color: 'var(--text-primary)',  // #4c4c4c in light mode, theme-aware
                  fontSize: '17px',            // 17pt as specified
                  fontWeight: '500',           // Medium weight
                  marginBottom: '16px',        // 16px before white container
                  marginTop: dateLabel === Object.keys(groupedEvents)[0] ? '0' : '24px' // 24px between sections
                }}
              >
                {dateLabel}
              </h3>
              
              {/* 
               * WHITE CONTAINER for all events of this day
               * - Groups all events for a single date
               * - White background with 2px #e2e2e2 border
               * - 12px border radius, 16px inner padding
               * - Contains multiple event cards with proper spacing
               */}
              <div style={{
                backgroundColor: 'var(--card-background)', // White (theme-aware)
                border: '2px solid var(--border-color)',   // 2px light gray (#e2e2e2)
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '12px'
              }}>
                {/* 
                 * EVENT CARDS - Each day's scheduled events
                 * - Maintains Home screen two-part styling (colored tab + white card)
                 * - 8px spacing between cards, no margin on last card
                 * - All events for this date grouped together
                 */}
                {events.map((event, index) => (
                  <div
                    key={event.id}
                    style={{
                      marginBottom: index === events.length - 1 ? '0' : '8px'
                    }}
                  >
                    {renderScheduleEvent(event)}
                  </div>
                ))}
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
        
        .calendar-transition {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .calendar-slide-in {
          animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .week-nav-btn:hover {
          background-color: rgba(40, 71, 239, 0.1);
          border-radius: 50%;
        }
        
        .month-nav-btn:hover {
          background-color: rgba(40, 71, 239, 0.1);
          border-radius: 8px;
        }
        
        .date-btn:focus {
          outline: 2px solid var(--primary-blue);
          outline-offset: 2px;
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
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        /* Smooth transitions for task content when date changes */
        .task-content-transition {
          animation: contentFadeIn 0.4s ease-out;
        }
        
        @keyframes contentFadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      {/* Top Navigation Bar */}
      {/* Top Navigation - Reduced padding for 18px spacing */}
      <div className="flex items-center justify-between px-5" style={{ paddingTop: '16px', paddingBottom: '18px' }}>
        <button 
          onClick={() => router.push('/')}
          className="flex items-center justify-center w-10 h-10"
        >
          <ArrowLeft className="w-6 h-6" style={{ color: 'var(--primary-blue)' }} />
        </button>
        <button 
          onClick={() => {
            // Context-aware navigation based on current tab
            if (activeView === 'schedule') {
              router.push('/add-event')
            } else {
              router.push('/add-task') // Default for Tasks view and others
            }
          }}
          className="flex items-center justify-center w-10 h-10"
        >
          <Plus className="w-6 h-6" style={{ color: 'var(--primary-blue)' }} />
        </button>
      </div>

      {/* Tasks/Schedule Toggle */}
      <div className="flex flex-col items-center px-5" style={{ paddingBottom: '18px' }}>
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
              onClick={() => {
                setActiveFilter('today')
                // When "Today" is clicked, navigate to and select today's date
                const today = new Date()
                setSelectedDate(today)
                // Update week to show today
                const dayOfWeek = today.getDay()
                const weekStart = new Date(today)
                weekStart.setDate(today.getDate() - dayOfWeek)
                setCurrentWeekStart(weekStart)
                // Update month display
                setTasksCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1))
              }}
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

      {/* Month Navigation - 18px below the Tasks/Schedule toggle */}
      {activeView === 'schedule' && (
        <div className="flex items-center justify-center px-5" style={{ paddingBottom: '18px' }}>
          {/* 
           * PROMINENT MONTH NAVIGATION
           * - Positioned 18px below the Tasks/Schedule toggle
           * - Large, prominent month name (22pt Semibold)
           * - Blue color matching app theme (#2847ef)
           * - Left/right arrows for month navigation
           * - Functional month switching with event filtering
           */}
          <div className="flex items-center">
            <button 
              onClick={() => navigateMonth('prev')}
              className="p-3 transition-all duration-200 hover:scale-110"
              style={{ 
                color: 'var(--primary-blue)',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>
            
            {/* Month Name - Prominent display */}
            <h2 style={{ 
              color: 'var(--primary-blue)',  // #2847ef theme color
              fontSize: '22px',             // 22pt Semibold as specified
              fontWeight: '600',            // Semibold weight
              margin: '0 24px',             // Generous spacing from arrows
              minWidth: '120px',            // Prevent layout shift
              textAlign: 'center'           // Center the month name
            }}>
              {getMonthName(currentMonth)}
            </h2>
            
            <button 
              onClick={() => navigateMonth('next')}
              className="p-3 transition-all duration-200 hover:scale-110"
              style={{ 
                color: 'var(--primary-blue)',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Main Content - Conditional Rendering */}
      {activeView === 'tasks' ? (
        <>
          {/* 
           * INTERACTIVE CALENDAR WITH DUAL NAVIGATION
           * - Month navigation at top (primary level)
           * - Week navigation below dates (secondary level)
           * - Mobile swipe gestures on calendar area
           * - Date selection with blue circle indicator
           * - Handles month boundaries seamlessly
           */}
          <div 
            className="px-5 mb-6"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="application"
            aria-label="Interactive calendar - Use arrow keys to navigate, Home or Escape to return to today"
          >
            {/* 
             * MONTH NAVIGATION (Primary Level)
             * - Left/right arrows around month name
             * - #2847ef color, 16px size, 8px spacing
             * - Updates both month display and current week
             */}
            <div className="flex items-center justify-center mb-3">
              <button 
                onClick={() => navigateTasksMonth('prev')}
                className="month-nav-btn p-2 transition-all duration-200 hover:scale-110"
                style={{ 
                  color: 'var(--primary-blue)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
                aria-label="Previous month"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15,18 9,12 15,6"></polyline>
                </svg>
              </button>
              
              <h3 
                className="font-bold mx-2"
                style={{ 
                  color: 'var(--primary-blue)',
                  minWidth: '120px',
                  textAlign: 'center'
                }}
              >
                {monthName}
              </h3>
              
              <button 
                onClick={() => navigateTasksMonth('next')}
                className="month-nav-btn p-2 transition-all duration-200 hover:scale-110"
                style={{ 
                  color: 'var(--primary-blue)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
                aria-label="Next month"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </button>
            </div>
            
            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-0 text-center mb-2">
              {dayNames.map((day, index) => (
                <div key={index} className="text-blue-600 font-medium py-1" style={{ color: 'var(--primary-blue)' }}>
                  {day}
                </div>
              ))}
            </div>
            
            {/* 
             * CALENDAR DATES WITH SWIPE GESTURES
             * - Shows any 7-day period (not limited to calendar weeks)
             * - Touch/swipe enabled for mobile navigation
             * - Visual selection state with blue circle
             * - Clickable date selection
             */}
            <div 
              className="calendar-transition grid grid-cols-7 gap-0 text-center mb-4"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{ touchAction: 'pan-y' }} // Allow vertical scroll but capture horizontal
            >
              {weekDates.map((date, index) => {
                const isSelected = date.toDateString() === selectedDate.toDateString()
                const isToday = date.toDateString() === new Date().toDateString()
                
                return (
                  <div key={index} className="text-blue-600 py-1" style={{ color: 'var(--primary-blue)' }}>
                    <button
                      onClick={() => handleDateSelect(date)}
                      className="date-btn w-8 h-8 flex items-center justify-center text-sm font-medium rounded-full mx-auto transition-all duration-200 hover:scale-110"
                      style={{
                        backgroundColor: isSelected ? 'var(--primary-blue)' : 'transparent',
                        color: isSelected ? '#ffffff' : 'var(--primary-blue)',
                        border: isToday && !isSelected ? '2px solid var(--primary-blue)' : 'none',
                        cursor: 'pointer',
                        minWidth: '32px',
                        minHeight: '32px' // Proper touch target size
                      }}
                      aria-label={`Select ${date.toLocaleDateString()}`}
                    >
                      {date.getDate()}
                    </button>
                  </div>
                )
              })}
            </div>
            
            {/* 
             * WEEK NAVIGATION (Secondary Level)
             * - Positioned below calendar dates
             * - 60px apart horizontally, centered
             * - #2847ef color, 16px size, 44px touch targets
             * - Shifts week by 7 days in either direction
             */}
            <div className="flex items-center justify-center">
              <button 
                onClick={() => navigateWeek('prev')}
                className="week-nav-btn flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ 
                  color: 'var(--primary-blue)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  width: '44px',
                  height: '44px',
                  marginRight: '30px' // 60px apart total
                }}
                aria-label="Previous week"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15,18 9,12 15,6"></polyline>
                </svg>
              </button>
              
              <button 
                onClick={() => navigateWeek('next')}
                className="week-nav-btn flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ 
                  color: 'var(--primary-blue)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  width: '44px',
                  height: '44px',
                  marginLeft: '30px' // 60px apart total
                }}
                aria-label="Next week"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* Horizontal Line */}
          <div className="px-5 mb-6">
            <div style={{ height: '1px', backgroundColor: 'var(--border-color)' }}></div>
          </div>

          {/* Dynamic Task Sections */}
          <div className="px-5 space-y-6">
            <div className="task-content-transition transition-all duration-300 ease-in-out">
              {tasksLoading ? (
                <div className="text-center py-8">
                  <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
                    Loading your tasks...
                  </p>
                </div>
              ) : tasksError ? (
                <div className="text-center py-8">
                  <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
                    Error loading tasks: {tasksError}
                  </p>
                  <button
                    onClick={() => actions.refreshTasks()}
                    className="mt-2 px-4 py-2 rounded-lg transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--primary-blue)',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  >
                    Try Again
                  </button>
                </div>
              ) : !clerkUser ? (
                <div className="text-center py-8">
                  <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
                    Please sign in to view your tasks.
                  </p>
                </div>
              ) : Object.entries(groupedTasks).length === 0 ? (
                <div className="text-center py-8">
                  <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
                    No tasks found. Create your first task!
                  </p>
                  <button
                    onClick={() => router.push('/add-task')}
                    className="mt-2 px-4 py-2 rounded-lg transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--primary-blue)',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  >
                    Add Your First Task
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

export default function Tasks() {
  return (
    <Suspense fallback={<div style={{ backgroundColor: 'var(--background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: 'var(--primary-blue)', fontSize: '17px' }}>Loading...</div>
    </div>}>
      <TasksContent />
    </Suspense>
  )
} 