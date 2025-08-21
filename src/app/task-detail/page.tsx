'use client'

import React, { Suspense } from 'react'
import { ArrowLeft, Plus, Clock, CheckCircle } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

type Category = 'work' | 'health' | 'personal' | 'social' | 'creative' | 'finance'

const categoryData = {
  work: { color: '#f9dac5', icon: '/icons/work.svg', label: 'Work' },
  health: { color: '#ddede3', icon: '/icons/health.svg', label: 'Health' },
  personal: { color: '#cae9ef', icon: '/icons/personal.svg', label: 'Personal' },
  social: { color: '#e6e1f4', icon: '/icons/social.svg', label: 'Social' },
  creative: { color: '#f4e1f4', icon: '/icons/creative.svg', label: 'Creative' },
  finance: { color: '#fef7d6', icon: '/icons/finance.svg', label: 'Finance' }
}

// Task category mapping
const taskCategories: Record<string, Category> = {
  'Reply to emails': 'work',
  'Reply to Naoya Oka email': 'work',
  'Meditate 15 min.': 'health',
  'Repair garden gate': 'personal',
  'Buy bread': 'personal',
  'Print bank statements': 'finance',
  'Call John to confirm Thurs.': 'social'
}

function TaskDetailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const taskName = searchParams.get('task') || 'Reply to emails'
  const category = taskCategories[taskName] || 'work'
  const categoryInfo = categoryData[category]

  const handleBack = () => {
    router.back()
  }

  const handleSchedule = () => {
    // Schedule functionality - could navigate to calendar or scheduling interface
    console.log('Schedule task:', taskName)
  }

  const handleFocus = () => {
    // Focus functionality - could start focus timer or mode
    console.log('Focus on task:', taskName)
  }

  const handleDone = () => {
    // Mark task as done and navigate to celebration
    router.push(`/task-complete?task=${encodeURIComponent(taskName)}`)
  }

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
          Tasks Detail
        </h1>
        <button className="flex items-center justify-center w-10 h-10">
          <Plus className="w-6 h-6" style={{ color: '#2847ef' }} />
        </button>
      </div>

      {/* Main Content */}
      <div className="px-5">
        {/* Task Detail Card */}
        <div 
          className="rounded-lg mb-6 overflow-hidden"
          style={{
            backgroundColor: 'white',
            border: `2px solid ${categoryInfo.color}`,
            borderRadius: '12px'
          }}
        >
          {/* Category header bar - spans full width with rounded top corners only */}
          <div 
            className="flex items-center px-4 py-3"
            style={{
              backgroundColor: categoryInfo.color,
              borderRadius: '10px 10px 0 0',
              margin: '-2px -2px 0 -2px',
              paddingTop: '12px',
              paddingBottom: '12px'
            }}
          >
            <img 
              src={categoryInfo.icon} 
              alt={category} 
              style={{ width: '24px', height: '24px' }} 
            />
          </div>

          {/* Card content with padding */}
          <div className="p-4">
            {/* Task title with checkbox */}
            <div className="flex items-center mb-6">
              <div 
                className="w-6 h-6 rounded-full mr-4" 
                style={{ 
                  backgroundColor: 'white',
                  border: '2px solid #e2e2e2'
                }}
              />
              <h1 style={{ 
                color: '#4c4c4c', 
                fontSize: '24px', 
                fontWeight: 600 
              }}>
                {taskName}
              </h1>
            </div>

            {/* Separator line */}
            <div style={{ height: '2px', backgroundColor: '#e2e2e2', margin: '24px 0' }}></div>

            {/* Focus level and time */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center mb-1">
                  <div 
                    className="w-3 h-3 rounded-full mr-1"
                    style={{ backgroundColor: '#f9c075' }}
                  />
                  <div 
                    className="w-3 h-3 rounded-full mr-1"
                    style={{ backgroundColor: '#f9c075' }}
                  />
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: '#e2e2e2' }}
                  />
                </div>
                <span style={{ 
                  color: '#a5a5a5', 
                  fontSize: '14px', 
                  fontWeight: 500 
                }}>
                  Focus: Medium
                </span>
              </div>
              <div className="text-right">
                <div className="flex items-center mb-1">
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#a5a5a5" 
                    strokeWidth="2"
                    className="mr-1"
                  >
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                  <span style={{ 
                    color: '#4c4c4c', 
                    fontSize: '16px', 
                    fontWeight: 500 
                  }}>
                    30 - 45 min.
                  </span>
                </div>
                <span style={{ 
                  color: '#a5a5a5', 
                  fontSize: '14px', 
                  fontWeight: 500 
                }}>
                  Estimated Time
                </span>
              </div>
            </div>

            {/* Separator line */}
            <div style={{ height: '2px', backgroundColor: '#e2e2e2', margin: '24px 0' }}></div>

            {/* Next Step Section */}
            <div className="mb-6">
              <h3 style={{ 
                color: '#4c4c4c', 
                fontSize: '18px', 
                fontWeight: 600,
                marginBottom: '8px'
              }}>
                Next Step
              </h3>
              <p style={{ 
                color: '#4c4c4c', 
                fontSize: '16px', 
                fontWeight: 400,
                lineHeight: '1.5'
              }}>
                Open email app and start with oldest unread.
              </p>
            </div>

            {/* Separator line */}
            <div style={{ height: '2px', backgroundColor: '#e2e2e2', margin: '24px 0' }}></div>

            {/* Break It Down Section */}
            <div className="mb-6">
              <h3 style={{ 
                color: '#4c4c4c', 
                fontSize: '18px', 
                fontWeight: 600,
                marginBottom: '12px'
              }}>
                Break It Down
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div 
                    className="w-2 h-2 rounded-full mt-2 mr-3"
                    style={{ backgroundColor: '#4c4c4c' }}
                  />
                  <span style={{ 
                    color: '#4c4c4c', 
                    fontSize: '16px', 
                    fontWeight: 400 
                  }}>
                    Check priority emails from boss
                  </span>
                </li>
                <li className="flex items-start">
                  <div 
                    className="w-2 h-2 rounded-full mt-2 mr-3"
                    style={{ backgroundColor: '#4c4c4c' }}
                  />
                  <span style={{ 
                    color: '#4c4c4c', 
                    fontSize: '16px', 
                    fontWeight: 400 
                  }}>
                    Respond to client questions
                  </span>
                </li>
                <li className="flex items-start">
                  <div 
                    className="w-2 h-2 rounded-full mt-2 mr-3"
                    style={{ backgroundColor: '#4c4c4c' }}
                  />
                  <span style={{ 
                    color: '#4c4c4c', 
                    fontSize: '16px', 
                    fontWeight: 400 
                  }}>
                    Archive or delete old emails
                  </span>
                </li>
                <li className="flex items-start">
                  <div 
                    className="w-2 h-2 rounded-full mt-2 mr-3"
                    style={{ backgroundColor: '#4c4c4c' }}
                  />
                  <span style={{ 
                    color: '#4c4c4c', 
                    fontSize: '16px', 
                    fontWeight: 400 
                  }}>
                    Set up auto-filters for newsletters
                  </span>
                </li>
              </ul>
            </div>

            {/* Separator line */}
            <div style={{ height: '2px', backgroundColor: '#e2e2e2', margin: '24px 0' }}></div>

            {/* Related Items Section */}
            <div>
              <h3 style={{ 
                color: '#4c4c4c', 
                fontSize: '18px', 
                fontWeight: 600,
                marginBottom: '12px'
              }}>
                Related Items
              </h3>
              <div 
                className="flex items-center p-3 rounded-lg"
                style={{
                  backgroundColor: 'white'
                }}
              >
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <img src="/icons/1_thought_active.svg" alt="thought" style={{ width: '24px', height: '24px' }} />
                </div>
                <div className="flex-1">
                  <h4 style={{ 
                    color: '#4c4c4c', 
                    fontSize: '16px', 
                    fontWeight: 600,
                    marginBottom: '2px'
                  }}>
                    Reply to Naoya Oka email
                  </h4>
                  <span style={{ 
                    color: '#a5a5a5', 
                    fontSize: '14px', 
                    fontWeight: 400 
                  }}>
                    Just One Thought from Focus task
                  </span>
                </div>
              </div>
            </div>

            {/* Separator line */}
            <div style={{ height: '2px', backgroundColor: '#e2e2e2', margin: '24px 0' }}></div>

            {/* Kai's Tip Section */}
            <div>
              <h2 style={{ 
                color: '#4c4c4c', 
                fontSize: '20px', 
                fontWeight: 600,
                marginBottom: '16px'
              }}>
                Kai's Tip
              </h2>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div 
                    className="w-8 h-8 flex items-center justify-center"
                  >
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24.01 23.85"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <style>
                          {`.st0 { fill: #2847ef; }
                           .st1 { fill: none; stroke: #2847ef; stroke-linecap: round; stroke-linejoin: round; }
                           .st2 { fill: #fff; }`}
                        </style>
                      </defs>
                      <path className="st2" d="M15.73,14.5c-.47,0,.27,2.2-2.36,2.33-.51.13,2.16.59,2.38,2.27h.22s.02-.07.03-.12c.05-.33.19-1.17.81-1.61.64-.46,1.62-.45,1.32-.56-.61-.22-1.47-.18-2.39-2.31Z"/>
                      <path className="st2" d="M15.76,19.1s.11.45.21,0h-.21,0Z"/>
                      <path className="st2" d="M15.83,9.09c.11-1.9,2.76-2.24,2.28-2.34h0s0,.01,0,.01c-2.26-.32-2.09-2.97-2.3-2.3-.34.55-.61,1.03-.92,1.44-.25.34-.62.5-1.4.86.11.48,1.01.48,1.39.85.38.38.25.59.96,1.48Z"/>
                      <path className="st2" d="M14.99,11.87h0s.12-.18-.1-.34c-.23-.16-.53-.04-.82-.18-.61-.29-1.24-.56-1.79-.94-.89-.62-1.1-1.68-1.43-2.68-.07-.21-.37-1.53-.56-1.53s-.24,1.36-.3,1.54c-.13,1.05-.38,1.98-1.15,2.69-.7.63-1.77.77-2.65,1.06-.16.05-.48,0-.69.16-.21.17.08.23.08.23.37.13.73.28,1.1.4.94.32,1.78.8,2.32,1.62.41.62.68,1.34,1.01,2.01.07.15.03.45.23.45s.38-.18.38-.18c.41-1.04.49-1.95,1.34-2.77.84-.82,1.97-1.11,3.03-1.53h0Z"/>
                      <path className="st1" d="M15.97,19.1h-.21"/>
                      <path className="st0" d="M15.32.05C8.96-.52,1.22,3.77.07,11.27c-1.3,7.68,15.78,12.85,17.05,12.53,5.34.62,6.63-4.15,6.84-6.73C24.36,9.94,22.5,1.47,15.32.05ZM16.81,17.37c-.62.45-.76,1.29-.81,1.61,0,.05-.02.08-.03.12-.1.45-.2-.03-.21,0h0s0,0,0,0c-.22-1.68-2.88-2.15-2.38-2.27,2.63-.14,1.89-2.33,2.36-2.33.92,2.13,1.78,2.09,2.39,2.31.3.11-.68.1-1.32.56ZM10.61,16.18s-.18.18-.38.18-.16-.29-.23-.45c-.33-.68-.59-1.39-1.01-2.01-.54-.82-1.38-1.3-2.32-1.62-.37-.12-.73-.27-1.1-.4,0,0-.29-.06-.08-.23.21-.17.53-.11.69-.16.88-.29,1.95-.43,2.65-1.06.77-.7,1.02-1.64,1.15-2.69.05-.18.11-1.54.3-1.54s.48,1.32.56,1.53c.33,1,.54,2.06,1.43,2.68.55.38,1.18.65,1.79.94.29.14.59.02.82.18.23.16.1.34.1.34h0s0,.01,0,.01c-1.06.42-2.19.71-3.03,1.53-.85.82-.93,1.73-1.34,2.77ZM13.47,6.75c.78-.36,1.15-.52,1.4-.86.31-.42.59-.89.92-1.44.22-.67.05,1.98,2.3,2.3h0c.49.1-2.17.43-2.28,2.33-.71-.88-.58-1.1-.96-1.48-.39-.37-1.28-.38-1.39-.85Z"/>
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 style={{ 
                    color: '#4c4c4c', 
                    fontSize: '16px', 
                    fontWeight: 600,
                    marginBottom: '8px'
                  }}>
                    Best time to tackle this
                  </h3>
                  <p style={{ 
                    color: '#4c4c4c', 
                    fontSize: '15px', 
                    lineHeight: '1.5',
                    fontWeight: 400
                  }}>
                    Based on your patterns, you handle emails best in the morning (9 - 11 AM) when your focus is sharpest. Consider doing this right after your coffee.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mb-8">
          {/* Schedule Button */}
          <button
            onClick={handleSchedule}
            className="flex-1 flex items-center justify-center py-4 rounded-lg"
            style={{
              backgroundColor: '#2847ef',
              borderRadius: '12px'
            }}
          >
            <Plus className="w-5 h-5 mr-2" style={{ color: 'white' }} />
            <span style={{ 
              color: 'white', 
              fontSize: '16px', 
              fontWeight: 600 
            }}>
              Schedule
            </span>
          </button>

          {/* Focus Button */}
          <button
            onClick={handleFocus}
            className="flex-1 flex items-center justify-center py-4 rounded-lg"
            style={{
              backgroundColor: '#efc7c2',
              borderRadius: '12px'
            }}
          >
            <Clock className="w-5 h-5 mr-2" style={{ color: 'white' }} />
            <span style={{ 
              color: 'white', 
              fontSize: '16px', 
              fontWeight: 600 
            }}>
              Focus
            </span>
          </button>

          {/* Done Button */}
          <button
            onClick={handleDone}
            className="flex-1 flex items-center justify-center py-4 rounded-lg"
            style={{
              backgroundColor: '#a8e2bb',
              borderRadius: '12px'
            }}
          >
            <CheckCircle className="w-5 h-5 mr-2" style={{ color: 'white' }} />
            <span style={{ 
              color: 'white', 
              fontSize: '16px', 
              fontWeight: 600 
            }}>
              Done
            </span>
          </button>
        </div>
      </div>

      {/* Bottom spacing for fixed nav */}
      <div className="h-20"></div>
    </div>
  )
}

export default function TaskDetail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TaskDetailContent />
    </Suspense>
  )
}