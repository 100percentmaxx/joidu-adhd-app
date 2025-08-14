'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
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
    console.log('Show preview of export data')
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
            disabled={isExporting}
            style={{
              width: '120px',
              height: '48px',
              backgroundColor: '#f4b7ae',
              borderRadius: '8px',
              border: 'none',
              cursor: isExporting ? 'not-allowed' : 'pointer',
              opacity: isExporting ? 0.6 : 1,
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
    </div>
  )
}