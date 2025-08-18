'use client'

import React, { useState, useEffect } from 'react'
import { Medal, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import LightningFAB from '@/components/ui/LightningFAB'

export default function Home() {
  const router = useRouter()
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({})
  
  // Load completed tasks from localStorage on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem('joidu-completed-tasks')
        if (saved) {
          const parsed = JSON.parse(saved)
          setCompletedTasks(parsed || {})
        }
      } catch (error) {
        console.error('Error loading completed tasks:', error)
      }
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])
  
  const handleTaskComplete = (taskName: string) => {
    const newCompletedTasks = { ...completedTasks, [taskName]: true }
    setCompletedTasks(newCompletedTasks)
    // Save to localStorage
    try {
      localStorage.setItem('joidu-completed-tasks', JSON.stringify(newCompletedTasks))
    } catch (error) {
      console.error('Error saving completed tasks:', error)
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
  const currentDate = new Date()
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
  const dayName = dayNames[currentDate.getDay()]
  const monthName = monthNames[currentDate.getMonth()]
  const day = currentDate.getDate()

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header Section */}
      <div className="px-5" style={{ marginTop: '24px', position: 'relative' }}>
        {/* Settings Gear Icon */}
        <button
          onClick={() => router.push('/settings')}
          style={{
            position: 'absolute',
            top: '-8px',
            right: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          <Settings 
            className="w-6 h-6" 
            style={{ color: 'var(--settings-icon)' }} 
          />
        </button>

        <h1 className="mb-1" style={{ 
          color: 'var(--primary-blue)', 
          fontSize: '34px', 
          fontWeight: 700 
        }}>
          Good Morning, Sam!
        </h1>
        <p style={{ 
          color: 'var(--primary-blue)', 
          fontSize: '17px', 
          fontWeight: 400,
          marginTop: '4px'
        }}>
          {dayName}, {monthName} {day}
        </p>
      </div>

      {/* Today's Schedule Section */}
      <div className="px-5" style={{ marginTop: '24px' }}>
        <div className="border" style={{ 
          backgroundColor: 'var(--card-background)', 
          borderRadius: '12px', 
          border: '1px solid var(--border-color)', 
          padding: '16px', 
          paddingBottom: '56px',
          paddingTop: '24px',
          position: 'relative'
        }}>
          {/* Section header inside container - positioned at top with zero padding */}
          <div className="inline-block px-2 py-1.5 text-sm font-medium text-white" style={{ 
            backgroundColor: 'var(--primary-blue)',
            borderRadius: '12px 0px 12px 0px',
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '10',
            width: '140px'
          }}>
            Today's Schedule
          </div>
          
          <div className="space-y-2" style={{ marginTop: '24px' }}>
            {/* Personal trainer - Health */}
            <div className="flex overflow-hidden" style={{ height: '60px' }}>
              <div className="flex items-center justify-center" style={{ 
                backgroundColor: 'var(--category-health-light)',
                borderRadius: '12px 0px 0px 12px',
                width: '60px',
                height: '100%'
              }}>
                <img src="/icons/health.svg" alt="health" style={{ width: '30px', height: '30px' }} />
              </div>
              <div className="flex-1 border-r border-t border-b flex items-center" style={{ 
                backgroundColor: 'var(--card-background)', 
                borderColor: 'var(--category-health-light)',
                borderWidth: '3px',
                borderRadius: '0px 12px 12px 0px',
                paddingLeft: '16px',
                height: '100%'
              }}>
                <div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '17px', fontWeight: 700 }}>
                    7:00 - 8:00
                  </div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '17px', fontWeight: 500 }}>
                    Personal trainer
                  </div>
                </div>
              </div>
            </div>
            
            {/* Meeting with Emma - Work */}
            <div className="flex overflow-hidden" style={{ height: '60px' }}>
              <div className="flex items-center justify-center" style={{ 
                backgroundColor: 'var(--category-work-light)',
                borderRadius: '12px 0px 0px 12px',
                width: '60px',
                height: '100%'
              }}>
                <img src="/icons/work.svg" alt="work" style={{ width: '30px', height: '30px' }} />
              </div>
              <div className="flex-1 border-r border-t border-b flex items-center" style={{ 
                backgroundColor: 'var(--card-background)', 
                borderColor: 'var(--category-work-light)',
                borderWidth: '3px',
                borderRadius: '0px 12px 12px 0px',
                paddingLeft: '16px',
                height: '100%'
              }}>
                <div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '17px', fontWeight: 700 }}>
                    11:00 - 11:30
                  </div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '17px', fontWeight: 500 }}>
                    Meeting with Emma
                  </div>
                </div>
              </div>
            </div>
            
            {/* Coffee with Kay - Social */}
            <div className="flex overflow-hidden" style={{ height: '60px' }}>
              <div className="flex items-center justify-center" style={{ 
                backgroundColor: 'var(--category-social-light)',
                borderRadius: '12px 0px 0px 12px',
                width: '60px',
                height: '100%'
              }}>
                <img src="/icons/social.svg" alt="social" style={{ width: '30px', height: '30px' }} />
              </div>
              <div className="flex-1 border-r border-t border-b flex items-center" style={{ 
                backgroundColor: 'var(--card-background)', 
                borderColor: 'var(--category-social-light)',
                borderWidth: '3px',
                borderRadius: '0px 12px 12px 0px',
                paddingLeft: '16px',
                height: '100%'
              }}>
                <div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '17px', fontWeight: 700 }}>
                    1:00 - 2:00
                  </div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '17px', fontWeight: 500 }}>
                    Coffee with Kay
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* All button positioned bottom-right inside container */}
          <button className="absolute text-sm font-medium text-white" style={{ 
            backgroundColor: 'var(--button-secondary-bg)',
            borderRadius: '12px',
            bottom: '12px',
            right: '16px',
            width: '60px',
            height: '32px',
            fontSize: '14px',
            fontWeight: 500
          }}>
            All
          </button>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="px-5" style={{ marginTop: '24px' }}>
        <div className="border" style={{ 
          backgroundColor: 'var(--card-background)', 
          borderRadius: '12px', 
          border: '1px solid var(--border-color)', 
          padding: '16px', 
          paddingBottom: '56px',
          paddingTop: '24px',
          position: 'relative'
        }}>
          {/* Section header inside container - positioned at top of container */}
          <div className="inline-block px-2 py-1.5 text-sm font-medium text-white" style={{ 
            backgroundColor: 'var(--primary-blue)',
            borderRadius: '12px 0px 12px 0px',
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '10',
            width: '140px'
          }}>
            Tasks
          </div>
          
          <div className="space-y-2" style={{ marginTop: '24px' }}>
            {/* Reply to emails - Work */}
            <div className="flex overflow-hidden" style={{ height: '60px' }}>
              <div className="flex items-center justify-between" style={{ 
                backgroundColor: 'var(--category-work-light)',
                borderRadius: '12px',
                width: '100px',
                height: '100%',
                paddingLeft: '12px',
                paddingRight: '12px'
              }}>
                <img src="/icons/work.svg" alt="work" style={{ width: '30px', height: '30px' }} />
                {renderCheckbox('Reply to emails')}
              </div>
              <div className="flex-1 flex items-center" style={{ 
                backgroundColor: 'var(--card-background)',
                paddingLeft: '16px'
              }}>
                <button 
                  onClick={() => handleTaskDetail('Reply to emails')}
                  style={{ 
                    color: completedTasks['Reply to emails'] ? 'var(--text-disabled)' : 'var(--text-primary)', 
                    fontSize: '17px', 
                    fontWeight: 500,
                    textDecoration: completedTasks['Reply to emails'] ? 'line-through' : 'none',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  Reply to emails
                </button>
              </div>
            </div>
            
            {/* Meditate - Health */}
            <div className="flex overflow-hidden" style={{ height: '60px' }}>
              <div className="flex items-center justify-between" style={{ 
                backgroundColor: 'var(--category-health-light)',
                borderRadius: '12px',
                width: '100px',
                height: '100%',
                paddingLeft: '12px',
                paddingRight: '12px'
              }}>
                <img src="/icons/health.svg" alt="health" style={{ width: '30px', height: '30px' }} />
                {renderCheckbox('Meditate 15 min.')}
              </div>
              <div className="flex-1 flex items-center" style={{ 
                backgroundColor: 'var(--card-background)',
                paddingLeft: '16px'
              }}>
                <button 
                  onClick={() => handleTaskDetail('Meditate 15 min.')}
                  style={{ 
                    color: completedTasks['Meditate 15 min.'] ? 'var(--text-disabled)' : 'var(--text-primary)', 
                    fontSize: '17px', 
                    fontWeight: 500,
                    textDecoration: completedTasks['Meditate 15 min.'] ? 'line-through' : 'none',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  Meditate 15 min.
                </button>
              </div>
            </div>
            
            {/* Repair garden gate - Personal */}
            <div className="flex overflow-hidden" style={{ height: '60px' }}>
              <div className="flex items-center justify-between" style={{ 
                backgroundColor: 'var(--category-personal-light)',
                borderRadius: '12px',
                width: '100px',
                height: '100%',
                paddingLeft: '12px',
                paddingRight: '12px'
              }}>
                <img src="/icons/personal.svg" alt="personal" style={{ width: '30px', height: '30px' }} />
                {renderCheckbox('Repair garden gate')}
              </div>
              <div className="flex-1 flex items-center" style={{ 
                backgroundColor: 'var(--card-background)',
                paddingLeft: '16px'
              }}>
                <button 
                  onClick={() => handleTaskDetail('Repair garden gate')}
                  style={{ 
                    color: completedTasks['Repair garden gate'] ? 'var(--text-disabled)' : 'var(--text-primary)', 
                    fontSize: '17px', 
                    fontWeight: 500,
                    textDecoration: completedTasks['Repair garden gate'] ? 'line-through' : 'none',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  Repair garden gate
                </button>
              </div>
            </div>
          </div>
          
          {/* All button positioned bottom-right inside container */}
          <button className="absolute text-sm font-medium text-white" style={{ 
            backgroundColor: 'var(--button-secondary-bg)',
            borderRadius: '12px',
            bottom: '12px',
            right: '16px',
            width: '60px',
            height: '32px',
            fontSize: '14px',
            fontWeight: 500
          }}>
            All
          </button>
        </div>
      </div>

      {/* Habits Section */}
      <div className="px-5" style={{ marginTop: '24px' }}>
        <div className="border" style={{ 
          backgroundColor: 'var(--card-background)', 
          borderRadius: '12px', 
          border: '1px solid var(--border-color)', 
          padding: '16px', 
          paddingBottom: '56px',
          paddingTop: '24px',
          position: 'relative'
        }}>
          {/* Section header inside container - positioned at top of container */}
          <div className="inline-block px-2 py-1.5 text-sm font-medium text-white" style={{ 
            backgroundColor: 'var(--primary-blue)',
            borderRadius: '12px 0px 12px 0px',
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '10',
            width: '140px'
          }}>
            Habits
          </div>
          
          <div className="grid grid-cols-2 gap-2" style={{ marginTop: '24px' }}>
            {/* Morning Routine - Health */}
            <button 
              onClick={() => router.push('/habits?expand=morning-routine')}
              className="rounded-lg p-4 cursor-pointer transition-all duration-200 hover:scale-105" 
              style={{ 
                backgroundColor: 'var(--category-health-light)', 
                borderRadius: '12px',
                aspectRatio: '1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '16px',
                border: 'none'
              }}>
              <div className="flex flex-col items-start">
                <div className="w-10 h-10 flex items-center justify-center mb-4">
                  <img src="/icons/health.svg" alt="health" style={{ width: '40px', height: '40px' }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)', fontSize: '17px' }}>
                  Morning Routine
                </h3>
                <div className="flex items-center space-x-4">
                  <span className="text-xs flex items-center text-gray-500">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    12 min.
                  </span>
                  <span className="text-xs flex items-center text-gray-500">
                    <Medal className="w-3 h-3 mr-1" />
                    84 day streak
                  </span>
                </div>
              </div>
            </button>
            
            {/* Work Startup - Work */}
            <button 
              onClick={() => router.push('/habits?expand=work-startup')}
              className="rounded-lg p-4 cursor-pointer transition-all duration-200 hover:scale-105" 
              style={{ 
                backgroundColor: 'var(--category-work-light)', 
                borderRadius: '12px',
                aspectRatio: '1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '16px',
                border: 'none'
              }}>
              <div className="flex flex-col items-start">
                <div className="w-10 h-10 flex items-center justify-center mb-4">
                  <img src="/icons/work.svg" alt="work" style={{ width: '40px', height: '40px' }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)', fontSize: '17px' }}>
                  Work Startup
                </h3>
                <div className="flex items-center space-x-4">
                  <span className="text-xs flex items-center text-gray-500">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    15 min
                  </span>
                  <span className="text-xs flex items-center text-gray-500">
                    <Medal className="w-3 h-3 mr-1" />
                    2 day streak
                  </span>
                </div>
              </div>
            </button>
          </div>
          
          {/* Add button positioned 8px to the left of All button */}
          <button 
            onClick={() => router.push('/habits/add')}
            className="absolute text-sm font-medium text-white transition-all duration-200 hover:scale-105" 
            style={{ 
              backgroundColor: 'var(--checkbox-checked)',
              borderRadius: '12px',
              bottom: '12px',
              right: '84px',
              width: '60px',
              height: '32px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            Add
          </button>

          {/* All button positioned bottom-right inside container */}
          <button 
            onClick={() => router.push('/habits')}
            className="absolute text-sm font-medium text-white transition-all duration-200 hover:scale-105" 
            style={{ 
              backgroundColor: 'var(--button-secondary-bg)',
              borderRadius: '12px',
              bottom: '12px',
              right: '16px',
              width: '60px',
              height: '32px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            All
          </button>
        </div>
      </div>

      {/* Bottom spacer to ensure content can scroll above FAB */}
      <div style={{ height: '120px' }}></div>

      {/* Just One Thing FAB */}
      <LightningFAB />
    </div>
  )
}