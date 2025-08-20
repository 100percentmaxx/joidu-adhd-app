'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { ArrowLeft, Plus, Calendar } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
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

function TasksContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentDate = new Date()
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({})
  const [activeFilter, setActiveFilter] = useState<FilterType>('today')
  const [activeView, setActiveView] = useState<ViewType>('tasks')
  const [userEvents, setUserEvents] = useState<ScheduleEvent[]>([])
  
  // Schedule view state for month navigation
  const [currentMonth, setCurrentMonth] = useState(new Date())

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
  
  // Load completed tasks, filter state, and events from localStorage
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

export default function Tasks() {
  return (
    <Suspense fallback={<div style={{ backgroundColor: 'var(--background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: 'var(--primary-blue)', fontSize: '17px' }}>Loading...</div>
    </div>}>
      <TasksContent />
    </Suspense>
  )
} 