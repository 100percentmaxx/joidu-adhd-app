'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Plus } from 'lucide-react'

// TypeScript interfaces
interface PreparationItem {
  id: string
  title: string
  completed: boolean
  estimatedTime: string
}

interface RelatedTask {
  id: string
  title: string
  completed: boolean
  dueNote: string
}

interface EventDetail {
  id: string
  title: string
  startTime: string
  endTime: string
  date: string
  category: 'work' | 'health' | 'personal' | 'social' | 'creative' | 'finance'
  location: string
  travelAlert?: string
  preparationItems: PreparationItem[]
  relatedTasks: RelatedTask[]
  kaiSuggestions: {
    optimalPrepTime: string
    notes: string
  }
}

interface CategoryInfo {
  name: string
  lightColor: string
  darkColor: string
  icon: string
}

export default function ScheduleDetail() {
  const router = useRouter()
  const params = useParams()
  const eventId = params.eventId as string

  // Category configuration matching the app's design system
  const categoryData: Record<string, CategoryInfo> = {
    work: { 
      name: 'Work', 
      lightColor: '#f9dac5', 
      darkColor: '#e0943a',
      icon: '/src/joidu-icons/work.svg' 
    },
    health: { 
      name: 'Health', 
      lightColor: '#ddede3', 
      darkColor: '#4ade80',
      icon: '/src/joidu-icons/health.svg' 
    },
    personal: { 
      name: 'Personal', 
      lightColor: '#e0e7ff', 
      darkColor: '#818cf8',
      icon: '/src/joidu-icons/personal.svg' 
    },
    social: { 
      name: 'Social', 
      lightColor: '#fce7f3', 
      darkColor: '#f472b6',
      icon: '/src/joidu-icons/social.svg' 
    },
    creative: { 
      name: 'Creative', 
      lightColor: '#fed7d7', 
      darkColor: '#f56565',
      icon: '/src/joidu-icons/creative.svg' 
    },
    finance: { 
      name: 'Finance', 
      lightColor: '#d1fae5', 
      darkColor: '#34d399',
      icon: '/src/joidu-icons/finance.svg' 
    }
  }

  // Mock event data - in production this would come from API/localStorage
  const [eventData, setEventData] = useState<EventDetail>({
    id: eventId,
    title: 'Meeting with Emma',
    startTime: '11:00',
    endTime: '11:30',
    date: 'Tuesday, 16 April',
    category: 'work',
    location: 'Conference Room B (2nd floor)',
    travelAlert: 'Leave 10 min early - heavy traffic',
    preparationItems: [
      { id: '1', title: 'Review Q3 budget numbers', completed: true, estimatedTime: '6 min.' },
      { id: '2', title: 'Print presentation handouts', completed: false, estimatedTime: '3 min.' },
      { id: '3', title: 'Charge laptop', completed: false, estimatedTime: '2 min.' }
    ],
    relatedTasks: [
      { id: '1', title: 'Finish Q3 Report', completed: false, dueNote: 'Due before meeting.' }
    ],
    kaiSuggestions: {
      optimalPrepTime: 'Start preparing at 10:30 AM. This gives you 30 minutes to gather materials and mentally transition.',
      notes: 'Ask about new analytics tool Sarah mentioned last week. Also discuss timeline for Q4 planning.'
    }
  })

  // Handle checkbox toggles
  const togglePreparationItem = (itemId: string) => {
    setEventData(prev => ({
      ...prev,
      preparationItems: prev.preparationItems.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    }))
  }

  const toggleRelatedTask = (taskId: string) => {
    setEventData(prev => ({
      ...prev,
      relatedTasks: prev.relatedTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }))
  }

  // Handle navigation
  const handleBack = () => {
    router.back()
  }

  const handleAddReminder = () => {
    // TODO: Implement reminder creation
    console.log('Add reminder for event:', eventId)
  }

  const handleEdit = () => {
    // TODO: Navigate to edit screen
    router.push(`/edit-event/${eventId}`)
  }

  const handleGetDirections = () => {
    // TODO: Open maps app
    console.log('Get directions to:', eventData.location)
  }

  // Render checkbox component
  const renderCheckbox = (completed: boolean, onChange: () => void) => {
    return (
      <button
        onClick={onChange}
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          border: completed ? 'none' : '2px solid #a5a5a5',
          backgroundColor: completed ? '#ddede3' : 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        {completed && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path 
              d="M20 6L9 17L4 12" 
              stroke="#a8e2bb" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    )
  }

  const categoryInfo = categoryData[eventData.category]

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fefbf7' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <button 
          onClick={handleBack}
          className="flex items-center justify-center w-10 h-10"
        >
          <ArrowLeft className="w-6 h-6" style={{ color: '#2847ef' }} />
        </button>
        <h1 style={{ 
          color: '#2847ef', 
          fontSize: '17px', 
          fontWeight: 600 
        }}>
          Schedule Detail
        </h1>
        <button className="flex items-center justify-center w-10 h-10">
          <Plus className="w-6 h-6" style={{ color: '#2847ef' }} />
        </button>
      </div>

      {/* Main Content */}
      <div className="px-5 pb-32">
        {/* Main Event Card */}
        <div 
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '24px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Category Header */}
          <div 
            style={{
              backgroundColor: categoryInfo.lightColor,
              padding: '16px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <img 
              src={categoryInfo.icon} 
              alt={categoryInfo.name}
              style={{ width: '24px', height: '24px' }}
            />
          </div>

          {/* Event Details */}
          <div style={{ padding: '20px' }}>
            <h2 style={{
              fontSize: '22px',
              fontWeight: 600,
              color: '#4c4c4c',
              marginBottom: '8px'
            }}>
              {eventData.title}
            </h2>
            
            <p style={{
              fontSize: '15px',
              color: '#a5a5a5',
              marginBottom: '16px'
            }}>
              {eventData.startTime} - {eventData.endTime}  {eventData.date}
            </p>

            {/* Travel Alert */}
            {eventData.travelAlert && (
              <div style={{
                backgroundColor: '#fa772c',
                borderRadius: '20px',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                width: 'fit-content'
              }}>
                <img 
                  src="/src/joidu-icons/alert.svg" 
                  alt="Alert"
                  style={{ width: '16px', height: '16px', marginRight: '8px' }}
                />
                <span style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'white'
                }}>
                  {eventData.travelAlert}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Location and Travel Section */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '17px',
            fontWeight: 500,
            color: '#4c4c4c',
            marginBottom: '12px'
          }}>
            Location and Travel
          </h3>
          
          <p style={{
            fontSize: '15px',
            color: '#4c4c4c',
            marginBottom: '12px'
          }}>
            {eventData.location}
          </p>

          <button
            onClick={handleGetDirections}
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              color: '#2847ef',
              fontSize: '15px',
              cursor: 'pointer'
            }}
          >
            <img 
              src="/src/joidu-icons/location.svg" 
              alt="Location"
              style={{ width: '16px', height: '16px', marginRight: '8px' }}
            />
            Get directions
          </button>
        </div>

        {/* Preparation Checklist Section */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '17px',
            fontWeight: 500,
            color: '#4c4c4c',
            marginBottom: '16px'
          }}>
            Preparation Checklist
          </h3>

          {eventData.preparationItems.map((item) => (
            <div 
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px'
              }}
            >
              {renderCheckbox(item.completed, () => togglePreparationItem(item.id))}
              <div style={{ marginLeft: '12px', flex: 1 }}>
                <p style={{
                  fontSize: '15px',
                  color: '#4c4c4c',
                  marginBottom: '2px'
                }}>
                  {item.title}
                </p>
                <p style={{
                  fontSize: '13px',
                  color: '#a5a5a5'
                }}>
                  ⏱ {item.estimatedTime}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Related Tasks Section */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '17px',
            fontWeight: 500,
            color: '#4c4c4c',
            marginBottom: '16px'
          }}>
            Related Tasks
          </h3>

          {eventData.relatedTasks.map((task) => (
            <div 
              key={task.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px'
              }}
            >
              {renderCheckbox(task.completed, () => toggleRelatedTask(task.id))}
              <div style={{ marginLeft: '12px', flex: 1 }}>
                <p style={{
                  fontSize: '15px',
                  color: '#4c4c4c',
                  marginBottom: '2px'
                }}>
                  {task.title}
                </p>
                <p style={{
                  fontSize: '13px',
                  color: '#a5a5a5'
                }}>
                  {task.dueNote}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Kai's Suggestions Section */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '18px'
          }}>
            <img 
              src="/src/joidu-icons/kai.svg" 
              alt="Kai"
              style={{ width: '24px', height: '24px', marginRight: '12px' }}
            />
            <h3 style={{
              fontSize: '17px',
              fontWeight: 500,
              color: '#4c4c4c'
            }}>
              Kai's Suggestions
            </h3>
          </div>

          <div style={{
            backgroundColor: '#cae9ef',
            borderRadius: '16px',
            padding: '16px'
          }}>
            {/* Optimal prep time */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <img 
                  src="/src/joidu-icons/ideas_color.svg" 
                  alt="Ideas"
                  style={{ width: '16px', height: '16px', marginRight: '8px' }}
                />
                <h4 style={{
                  fontSize: '15px',
                  fontWeight: 500,
                  color: '#4c4c4c'
                }}>
                  Optimal prep time
                </h4>
              </div>
              <p style={{
                fontSize: '15px',
                color: '#4c4c4c',
                lineHeight: '1.4'
              }}>
                {eventData.kaiSuggestions.optimalPrepTime}
              </p>
            </div>

            {/* Notes & Ideas */}
            <div>
              <h4 style={{
                fontSize: '15px',
                fontWeight: 500,
                color: '#4c4c4c',
                marginBottom: '8px'
              }}>
                Notes & Ideas
              </h4>
              <p style={{
                fontSize: '15px',
                color: '#4c4c4c',
                lineHeight: '1.4'
              }}>
                {eventData.kaiSuggestions.notes}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div style={{
        position: 'fixed',
        bottom: '100px', // Above tab bar
        left: '20px',
        right: '20px',
        display: 'flex',
        gap: '12px'
      }}>
        <button
          onClick={handleAddReminder}
          style={{
            flex: 1,
            backgroundColor: '#2847ef',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '15px',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          + Reminder
        </button>
        
        <button
          onClick={handleEdit}
          style={{
            flex: 1,
            backgroundColor: '#2847ef',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '15px',
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          Edit
        </button>
      </div>

      {/* Bottom spacing for tab navigation */}
      <div style={{ height: '80px' }}></div>
    </div>
  )
}