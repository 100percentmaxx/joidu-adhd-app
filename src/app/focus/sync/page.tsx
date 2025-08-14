'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FocusSession } from '@/types/focus'

interface SessionWithStats {
  id: string
  taskTitle: string
  duration: number
  startTime: Date
  endTime?: Date
  breaks: any[]
  isCompleted: boolean
  stats: {
    totalTimeSpent: number
    breaksUsed: number
    completionPercentage: number
    wasCompleted: boolean
    productivityScore: number
  }
  completedAt: string
}

interface WeeklyStats {
  totalSessions: number
  totalFocusTime: number
  averageSessionLength: number
  averageCompletionRate: number
  mostProductiveDay: string
  totalBreaksTaken: number
}

export default function FocusSyncPage() {
  const router = useRouter()
  const [sessionHistory, setSessionHistory] = useState<SessionWithStats[]>([])
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('week')
  const [showExportOptions, setShowExportOptions] = useState(false)

  useEffect(() => {
    // Load session history
    const history = typeof window !== 'undefined' 
      ? JSON.parse(localStorage.getItem('focus-session-history') || '[]') as SessionWithStats[]
      : [] as SessionWithStats[]
    setSessionHistory(history)

    // Calculate weekly statistics
    if (history.length > 0) {
      calculateWeeklyStats(history)
    }
  }, [])

  const calculateWeeklyStats = (sessions: SessionWithStats[]) => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const weekSessions = sessions.filter(session => 
      new Date(session.completedAt) >= oneWeekAgo
    )

    if (weekSessions.length === 0) {
      setWeeklyStats({
        totalSessions: 0,
        totalFocusTime: 0,
        averageSessionLength: 0,
        averageCompletionRate: 0,
        mostProductiveDay: 'No data',
        totalBreaksTaken: 0
      })
      return
    }

    const totalFocusTime = weekSessions.reduce((sum, session) => sum + session.stats.totalTimeSpent, 0)
    const averageSessionLength = Math.round(totalFocusTime / weekSessions.length)
    const averageCompletionRate = Math.round(
      weekSessions.reduce((sum, session) => sum + session.stats.completionPercentage, 0) / weekSessions.length
    )
    const totalBreaksTaken = weekSessions.reduce((sum, session) => sum + session.stats.breaksUsed, 0)

    // Find most productive day
    const dayStats: { [key: string]: number } = {}
    weekSessions.forEach(session => {
      const day = new Date(session.completedAt).toLocaleDateString('en-US', { weekday: 'long' })
      dayStats[day] = (dayStats[day] || 0) + session.stats.totalTimeSpent
    })

    const mostProductiveDay = Object.keys(dayStats).reduce((a, b) => 
      dayStats[a] > dayStats[b] ? a : b
    ) || 'No data'

    setWeeklyStats({
      totalSessions: weekSessions.length,
      totalFocusTime,
      averageSessionLength,
      averageCompletionRate,
      mostProductiveDay,
      totalBreaksTaken
    })
  }

  const getFilteredSessions = () => {
    if (selectedPeriod === 'all') return sessionHistory

    const now = new Date()
    const cutoff = new Date()

    if (selectedPeriod === 'week') {
      cutoff.setDate(now.getDate() - 7)
    } else if (selectedPeriod === 'month') {
      cutoff.setMonth(now.getMonth() - 1)
    }

    return sessionHistory.filter(session => 
      new Date(session.completedAt) >= cutoff
    )
  }

  const exportData = (format: 'json' | 'csv') => {
    const data = getFilteredSessions()
    
    if (format === 'json') {
      const dataStr = JSON.stringify(data, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
      
      const exportFileDefaultName = `joidu-focus-sessions-${selectedPeriod}.json`
      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileDefaultName)
      linkElement.click()
    } else if (format === 'csv') {
      const csvContent = [
        'Task,Date,Duration (min),Completed,Focus Time (min),Breaks,Completion %,Focus Score',
        ...data.map(session => [
          session.taskTitle.replace(/,/g, ';'),
          new Date(session.completedAt).toLocaleDateString(),
          session.duration,
          session.stats.wasCompleted ? 'Yes' : 'No',
          session.stats.totalTimeSpent,
          session.stats.breaksUsed,
          session.stats.completionPercentage,
          session.stats.productivityScore
        ].join(','))
      ].join('\n')

      const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent)
      const exportFileDefaultName = `joidu-focus-sessions-${selectedPeriod}.csv`
      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileDefaultName)
      linkElement.click()
    }
    
    setShowExportOptions(false)
  }

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all focus session data? This cannot be undone.')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('focus-session-history')
        localStorage.removeItem('break-history')
        localStorage.removeItem('dismissal-history')
        localStorage.removeItem('session-history')
      }
      setSessionHistory([])
      setWeeklyStats(null)
    }
  }

  const getSessionIcon = (session: SessionWithStats) => {
    if (session.stats.wasCompleted) return '🏆'
    if (session.stats.completionPercentage > 75) return '💪'
    if (session.stats.completionPercentage > 50) return '👍'
    return '⭐'
  }

  const filteredSessions = getFilteredSessions()

  return (
    <div className="min-h-screen p-5" style={{ backgroundColor: '#fefbf7' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 style={{ 
              color: '#2847ef', 
              fontSize: '28px', 
              fontWeight: 600,
              marginBottom: '8px'
            }}>
              Focus Insights 📊
            </h1>
            <p style={{ 
              color: '#a5a5a5', 
              fontSize: '16px' 
            }}>
              Your ADHD focus journey analytics
            </p>
          </div>
          <button
            onClick={() => router.push('/focus/setup')}
            className="px-6 py-3 rounded-lg text-white font-semibold"
            style={{ backgroundColor: '#fa772c' }}
          >
            New Session
          </button>
        </div>

        {/* Period Selector */}
        <div className="flex space-x-2 mb-6">
          {['week', 'month', 'all'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period as any)}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200"
              style={{
                backgroundColor: selectedPeriod === period ? '#2847ef' : 'white',
                color: selectedPeriod === period ? 'white' : '#4c4c4c',
                border: `2px solid ${selectedPeriod === period ? '#2847ef' : '#e2e2e2'}`
              }}
            >
              {period === 'week' ? 'Past Week' : period === 'month' ? 'Past Month' : 'All Time'}
            </button>
          ))}
        </div>

        {sessionHistory.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="mb-6">
              <span style={{ fontSize: '80px' }}>📈</span>
            </div>
            <h2 style={{ 
              color: '#2847ef', 
              fontSize: '24px', 
              fontWeight: 600,
              marginBottom: '12px'
            }}>
              No Focus Sessions Yet
            </h2>
            <p style={{ 
              color: '#4c4c4c', 
              fontSize: '16px',
              lineHeight: '1.4',
              marginBottom: '24px',
              maxWidth: '400px',
              margin: '0 auto 24px'
            }}>
              Start your first focus session to see your progress and insights here. 
              Your future self will thank you! 🧠✨
            </p>
            <button
              onClick={() => router.push('/focus/setup')}
              className="px-8 py-4 rounded-lg text-white font-bold text-lg"
              style={{ backgroundColor: '#fa772c' }}
            >
              Start Your First Session 🚀
            </button>
          </div>
        ) : (
          <>
            {/* Weekly Stats */}
            {weeklyStats && selectedPeriod === 'week' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div 
                  className="p-4 rounded-lg text-center"
                  style={{ backgroundColor: 'white', border: '1px solid #e2e2e2' }}
                >
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fa772c', marginBottom: '4px' }}>
                    {weeklyStats.totalSessions}
                  </div>
                  <div style={{ fontSize: '12px', color: '#a5a5a5' }}>
                    Sessions
                  </div>
                </div>

                <div 
                  className="p-4 rounded-lg text-center"
                  style={{ backgroundColor: 'white', border: '1px solid #e2e2e2' }}
                >
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2847ef', marginBottom: '4px' }}>
                    {weeklyStats.totalFocusTime}m
                  </div>
                  <div style={{ fontSize: '12px', color: '#a5a5a5' }}>
                    Total Focus
                  </div>
                </div>

                <div 
                  className="p-4 rounded-lg text-center"
                  style={{ backgroundColor: 'white', border: '1px solid #e2e2e2' }}
                >
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#a8e2bb', marginBottom: '4px' }}>
                    {weeklyStats.averageCompletionRate}%
                  </div>
                  <div style={{ fontSize: '12px', color: '#a5a5a5' }}>
                    Avg Completion
                  </div>
                </div>

                <div 
                  className="p-4 rounded-lg text-center"
                  style={{ backgroundColor: 'white', border: '1px solid #e2e2e2' }}
                >
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#4c4c4c', marginBottom: '4px' }}>
                    {weeklyStats.mostProductiveDay}
                  </div>
                  <div style={{ fontSize: '12px', color: '#a5a5a5' }}>
                    Best Day
                  </div>
                </div>
              </div>
            )}

            {/* Export Options */}
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ 
                color: '#4c4c4c', 
                fontSize: '20px', 
                fontWeight: 600
              }}>
                Session History ({filteredSessions.length} sessions)
              </h2>
              
              <div className="relative">
                <button
                  onClick={() => setShowExportOptions(!showExportOptions)}
                  className="px-4 py-2 rounded-lg font-medium border-2 border-gray-300 hover:border-orange-300 transition-colors"
                  style={{ backgroundColor: 'white', color: '#4c4c4c' }}
                >
                  Export Data 📤
                </button>
                
                {showExportOptions && (
                  <div 
                    className="absolute right-0 top-12 z-10 bg-white border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden"
                    style={{ minWidth: '160px' }}
                  >
                    <button
                      onClick={() => exportData('json')}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                      style={{ color: '#4c4c4c' }}
                    >
                      Export as JSON
                    </button>
                    <button
                      onClick={() => exportData('csv')}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                      style={{ color: '#4c4c4c' }}
                    >
                      Export as CSV
                    </button>
                    <hr style={{ borderColor: '#e2e2e2' }} />
                    <button
                      onClick={clearAllData}
                      className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors"
                      style={{ color: '#dc2626' }}
                    >
                      Clear All Data
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Session List */}
            <div className="space-y-3 mb-6">
              {filteredSessions.map((session) => (
                <div 
                  key={`${session.id}-${session.completedAt}`}
                  className="p-4 rounded-lg border transition-all duration-200 hover:shadow-sm"
                  style={{ 
                    backgroundColor: 'white', 
                    borderColor: session.stats.wasCompleted ? '#a8e2bb' : '#e2e2e2',
                    borderWidth: session.stats.wasCompleted ? '2px' : '1px'
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span style={{ fontSize: '20px' }}>
                          {getSessionIcon(session)}
                        </span>
                        <h3 style={{ 
                          color: '#4c4c4c', 
                          fontSize: '16px', 
                          fontWeight: 500
                        }}>
                          {session.taskTitle}
                        </h3>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span style={{ color: '#a5a5a5' }}>Date:</span>
                          <div style={{ color: '#4c4c4c', fontWeight: 500 }}>
                            {new Date(session.completedAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <span style={{ color: '#a5a5a5' }}>Focus Time:</span>
                          <div style={{ color: '#4c4c4c', fontWeight: 500 }}>
                            {session.stats.totalTimeSpent}m
                          </div>
                        </div>
                        <div>
                          <span style={{ color: '#a5a5a5' }}>Completion:</span>
                          <div style={{ color: '#4c4c4c', fontWeight: 500 }}>
                            {session.stats.completionPercentage}%
                          </div>
                        </div>
                        <div>
                          <span style={{ color: '#a5a5a5' }}>Breaks:</span>
                          <div style={{ color: '#4c4c4c', fontWeight: 500 }}>
                            {session.stats.breaksUsed}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4 text-right">
                      <div 
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{
                          backgroundColor: session.stats.productivityScore >= 80 ? '#a8e2bb' : 
                                          session.stats.productivityScore >= 60 ? '#f7e98e' : '#f4b7ae',
                          color: session.stats.productivityScore >= 80 ? '#2d5016' : 
                                 session.stats.productivityScore >= 60 ? '#5d4e00' : '#7c2d12'
                        }}
                      >
                        {session.stats.productivityScore} Score
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ADHD Insights */}
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: '#e6f3ff', border: '1px solid #2847ef' }}
            >
              <div className="flex items-start space-x-3">
                <span style={{ fontSize: '24px' }}>🧠</span>
                <div>
                  <h4 style={{ 
                    color: '#2847ef', 
                    fontSize: '16px', 
                    fontWeight: 600,
                    marginBottom: '8px'
                  }}>
                    ADHD Success Pattern Recognition
                  </h4>
                  <p style={{ 
                    color: '#4c4c4c', 
                    fontSize: '14px',
                    lineHeight: '1.4'
                  }}>
                    {weeklyStats ? (
                      <>
                        You've focused for <strong>{weeklyStats.totalFocusTime} minutes</strong> this week! 
                        Your <strong>{weeklyStats.mostProductiveDay}</strong>s seem to work well for you. 
                        Taking <strong>{weeklyStats.totalBreaksTaken} breaks</strong> shows you're listening to your ADHD brain's needs. 
                        Keep building these patterns! 🌟
                      </>
                    ) : (
                      "Once you complete a few sessions, I'll help you identify your unique ADHD focus patterns and peak productivity times! 🎯"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Navigation */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 rounded-lg font-medium text-gray-600 border-2 border-gray-300 hover:border-gray-400 transition-all duration-200"
            style={{ backgroundColor: 'white' }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}