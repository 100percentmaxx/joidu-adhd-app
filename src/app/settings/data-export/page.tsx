'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, X, Download, FileText, Calendar, Target, MessageSquare, BarChart3 } from 'lucide-react'
import ExportInfoBox from './components/ExportInfoBox'
import ExportCategory from './components/ExportCategory'
import FormatSelector from './components/FormatSelector'
import ExportSummary from './components/ExportSummary'

interface ExportSettings {
  categories: {
    tasksProjects: boolean
    scheduleEvents: boolean
    habitsRoutines: boolean
    kaiConversations: boolean
    analyticsInsights: boolean
  }
  format: 'json' | 'csv' | 'pdf'
  estimatedSize: string
  deliveryMethod: 'email' | 'download'
}

// Sample data for preview
const sampleData = {
  tasks: [
    { id: 'task_001', title: 'Reply to client email', category: 'work', completed: false, created_date: '2024-08-14', estimated_minutes: 15 },
    { id: 'task_002', title: 'Review project proposal', category: 'work', completed: true, created_date: '2024-08-13', estimated_minutes: 30 },
    { id: 'task_003', title: 'Schedule dentist appointment', category: 'personal', completed: false, created_date: '2024-08-12', estimated_minutes: 10 },
    { id: 'task_004', title: 'Grocery shopping', category: 'personal', completed: true, created_date: '2024-08-11', estimated_minutes: 45 },
    { id: 'task_005', title: 'Team standup meeting prep', category: 'work', completed: false, created_date: '2024-08-10', estimated_minutes: 20 }
  ],
  events: [
    { id: 'evt_001', title: 'Team Standup', date: '2024-08-15', time: '09:00', duration: 30 },
    { id: 'evt_002', title: 'Client Meeting', date: '2024-08-15', time: '14:00', duration: 60 },
    { id: 'evt_003', title: 'Project Review', date: '2024-08-16', time: '10:30', duration: 90 }
  ],
  habits: [
    { id: 'habit_001', name: 'Morning meditation', frequency: 'daily', current_streak: 12, last_completed: '2024-08-14' },
    { id: 'habit_002', name: 'Evening walk', frequency: 'daily', current_streak: 8, last_completed: '2024-08-14' },
    { id: 'habit_003', name: 'Weekly planning', frequency: 'weekly', current_streak: 3, last_completed: '2024-08-11' }
  ],
  conversations: [
    { id: 'conv_001', timestamp: '2024-08-14T10:30:00Z', user_message: 'Help me prioritize my tasks for today', ai_response: 'Based on your schedule, I suggest...' },
    { id: 'conv_002', timestamp: '2024-08-14T15:20:00Z', user_message: 'I\'m feeling overwhelmed', ai_response: 'That\'s completely understandable...' }
  ],
  analytics: [
    { date: '2024-08-14', tasks_completed: 3, focus_time_minutes: 120, productivity_score: 0.75 },
    { date: '2024-08-13', tasks_completed: 5, focus_time_minutes: 180, productivity_score: 0.85 }
  ]
}

interface ExportPreviewModalProps {
  settings: ExportSettings
  onClose: () => void
  onExport: () => void
}

function ExportPreviewModal({ settings, onClose, onExport }: ExportPreviewModalProps) {
  const [activeTab, setActiveTab] = useState('tasks')

  const tabs = [
    { id: 'tasks', label: 'Tasks & Projects', icon: FileText, enabled: settings.categories.tasksProjects },
    { id: 'events', label: 'Schedule & Events', icon: Calendar, enabled: settings.categories.scheduleEvents },
    { id: 'habits', label: 'Habits & Routines', icon: Target, enabled: settings.categories.habitsRoutines },
    { id: 'conversations', label: 'Kai Conversations', icon: MessageSquare, enabled: settings.categories.kaiConversations },
    { id: 'analytics', label: 'Analytics & Insights', icon: BarChart3, enabled: settings.categories.analyticsInsights }
  ].filter(tab => tab.enabled)

  const getDataForTab = (tabId: string) => {
    switch (tabId) {
      case 'tasks': return sampleData.tasks.slice(0, 5)
      case 'events': return sampleData.events.slice(0, 3)
      case 'habits': return sampleData.habits
      case 'conversations': return sampleData.conversations
      case 'analytics': return sampleData.analytics
      default: return []
    }
  }

  const getDataCount = (tabId: string) => {
    switch (tabId) {
      case 'tasks': return { showing: 5, total: 47 }
      case 'events': return { showing: 3, total: 23 }
      case 'habits': return { showing: 3, total: 3 }
      case 'conversations': return { showing: 2, total: 156 }
      case 'analytics': return { showing: 2, total: 90 }
      default: return { showing: 0, total: 0 }
    }
  }

  const formatDataForDisplay = (data: any, tabId: string) => {
    if (settings.format === 'json') {
      return JSON.stringify(data, null, 2)
    } else if (settings.format === 'csv') {
      if (!data || data.length === 0) return 'No data'
      const headers = Object.keys(data[0]).join(',')
      return headers + '\n' + data.map((item: any) => Object.values(item).join(',')).join('\n')
    } else {
      return `PDF format will contain formatted tables and summaries of this data.`
    }
  }

  // Set initial active tab to first enabled tab
  React.useEffect(() => {
    if (tabs.length > 0) {
      setActiveTab(tabs[0].id)
    }
  }, [])

  const currentTabData = getDataForTab(activeTab)
  const currentCount = getDataCount(activeTab)

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '2px solid #e2e2e2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#4c4c4c',
            margin: 0
          }}>
            Export Preview
          </h2>
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            <X className="w-6 h-6" style={{ color: '#a5a5a5' }} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          padding: '0 20px',
          borderBottom: '1px solid #e2e2e2',
          display: 'flex',
          gap: '8px',
          overflowX: 'auto'
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '3px solid #2847ef' : '3px solid transparent',
                color: activeTab === tab.id ? '#2847ef' : '#a5a5a5',
                fontSize: '14px',
                fontWeight: 600,
                whiteSpace: 'nowrap'
              }}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: '20px' }}>
          {/* Data Count */}
          <div style={{
            backgroundColor: '#f0f8ff',
            border: '1px solid #e0e7ff',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
            fontSize: '14px',
            color: '#4c4c4c'
          }}>
            Showing {currentCount.showing} of {currentCount.total} items • Estimated size: {settings.estimatedSize}
          </div>

          {/* Preview Note */}
          <div style={{
            backgroundColor: '#fef7d6',
            border: '1px solid #fbbf24',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
            fontSize: '14px',
            color: '#4c4c4c'
          }}>
            💡 This is a preview - your actual export may contain more data based on your selection
          </div>

          {/* Data Display */}
          <div style={{
            backgroundColor: '#fafafa',
            border: '1px solid #e2e2e2',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#4c4c4c',
              marginBottom: '12px'
            }}>
              {settings.format.toUpperCase()} Format Preview:
            </h3>
            <pre style={{
              backgroundColor: '#f5f5f5',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              padding: '12px',
              overflow: 'auto',
              fontSize: '12px',
              fontFamily: 'monospace',
              maxHeight: '300px',
              margin: 0
            }}>
              {formatDataForDisplay(currentTabData, activeTab)}
            </pre>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center'
          }}>
            <button
              onClick={onClose}
              style={{
                backgroundColor: '#e2e2e2',
                color: '#4c4c4c',
                fontSize: '14px',
                fontWeight: 600,
                padding: '12px 20px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Modify Selection
            </button>
            <button
              onClick={() => {
                onExport()
                onClose()
              }}
              style={{
                backgroundColor: '#2847ef',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 600,
                padding: '12px 20px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Download className="w-4 h-4" />
              Looks Good, Export Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DataExportPage() {
  const router = useRouter()
  
  const [settings, setSettings] = useState<ExportSettings>({
    categories: {
      tasksProjects: true,
      scheduleEvents: true,
      habitsRoutines: true,
      kaiConversations: false,
      analyticsInsights: false
    },
    format: 'pdf',
    estimatedSize: '~2.4 MB',
    deliveryMethod: 'email'
  })

  const [isExporting, setIsExporting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleBack = () => {
    router.push('/settings')
  }

  const updateCategory = (category: keyof ExportSettings['categories'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: value
      }
    }))
    
    // Recalculate estimated size based on selected categories
    const selectedCount = Object.values({
      ...settings.categories,
      [category]: value
    }).filter(Boolean).length
    
    setSettings(prev => ({
      ...prev,
      estimatedSize: `~${selectedCount * 0.8} MB`
    }))
  }

  const updateFormat = (format: 'json' | 'csv' | 'pdf') => {
    setSettings(prev => ({ ...prev, format }))
  }

  const handlePreview = () => {
    if (getSelectedCount() === 0) return
    setShowPreview(true)
  }

  const handleExport = async () => {
    setIsExporting(true)
    
    try {
      // Simulate export process
      console.log('Generating export with settings:', settings)
      
      // Show success message after delay
      setTimeout(() => {
        alert('Export sent to your email address!')
        setIsExporting(false)
      }, 2000)
    } catch (error) {
      alert('Export failed. Please try again.')
      setIsExporting(false)
    }
  }

  const getSelectedCount = () => {
    return Object.values(settings.categories).filter(Boolean).length
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
          Data Export
        </h1>
        <div style={{ width: '40px' }}></div>
      </div>

      {/* Content */}
      <div style={{ padding: '0 20px' }}>
        {/* Export Info Box */}
        <ExportInfoBox />

        {/* What to Export Section */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{
            color: '#4c4c4c',
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '20px'
          }}>
            What to Export
          </h2>

          <ExportCategory
            title="Tasks & Projects"
            description="All your tasks, subtasks, and project information"
            stats="47 Tasks • 12 Projects • Last Updated: Today"
            checked={settings.categories.tasksProjects}
            onChange={(checked) => updateCategory('tasksProjects', checked)}
          />

          <ExportCategory
            title="Schedule & Events"
            description="Calendar events and scheduling information"
            stats="23 Events • This Month"
            checked={settings.categories.scheduleEvents}
            onChange={(checked) => updateCategory('scheduleEvents', checked)}
          />

          <ExportCategory
            title="Habits & Routines"
            description="Habit tracking data and routine configurations"
            stats="3 Habits • 45-day Streak"
            checked={settings.categories.habitsRoutines}
            onChange={(checked) => updateCategory('habitsRoutines', checked)}
          />

          <ExportCategory
            title="Kai Conversations"
            description="Chat history and AI interaction data"
            stats="156 Messages • Private Conversations"
            checked={settings.categories.kaiConversations}
            onChange={(checked) => updateCategory('kaiConversations', checked)}
          />

          <ExportCategory
            title="Analytics & Insights"
            description="Productivity patterns and personal analytics"
            stats="90 days of data • Usage patterns"
            checked={settings.categories.analyticsInsights}
            onChange={(checked) => updateCategory('analyticsInsights', checked)}
          />
        </div>

        {/* Export Format Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            color: '#4c4c4c',
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '20px'
          }}>
            Export Format
          </h2>

          <FormatSelector
            selectedFormat={settings.format}
            onFormatChange={updateFormat}
          />
        </div>

        {/* Export Summary */}
        <ExportSummary
          selectedCount={getSelectedCount()}
          estimatedSize={settings.estimatedSize}
          format={settings.format.toUpperCase()}
          deliveryMethod="Email attachment"
        />

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '60px',
          justifyContent: 'center'
        }}>
          <button
            onClick={handlePreview}
            disabled={isExporting || getSelectedCount() === 0}
            style={{
              width: '120px',
              height: '48px',
              backgroundColor: '#f4b7ae',
              borderRadius: '8px',
              border: 'none',
              cursor: (isExporting || getSelectedCount() === 0) ? 'not-allowed' : 'pointer',
              opacity: (isExporting || getSelectedCount() === 0) ? 0.6 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: 500
            }}>
              Preview
            </span>
          </button>

          <button
            onClick={handleExport}
            disabled={isExporting || getSelectedCount() === 0}
            style={{
              width: '120px',
              height: '48px',
              backgroundColor: '#2847ef',
              borderRadius: '8px',
              border: 'none',
              cursor: (isExporting || getSelectedCount() === 0) ? 'not-allowed' : 'pointer',
              opacity: (isExporting || getSelectedCount() === 0) ? 0.6 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: 500
            }}>
              {isExporting ? 'Exporting...' : 'Export Data'}
            </span>
          </button>
        </div>

        {/* Bottom Branding */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '20px' 
        }}>
          <p style={{
            color: '#a5a5a5',
            fontSize: '12px',
            fontWeight: 400,
            margin: 0
          }}>
            Joidu v1.2.1 - Made with ❤️ for ADHD brains
          </p>
        </div>
      </div>

      {/* Export Preview Modal */}
      {showPreview && <ExportPreviewModal settings={settings} onClose={() => setShowPreview(false)} onExport={handleExport} />}
    </div>
  )
}