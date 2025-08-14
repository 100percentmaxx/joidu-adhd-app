'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import PersonalizationInfoBox from './components/PersonalizationInfoBox'
import InterruptionSensitivity from './components/InterruptionSensitivity'
import TaskBreakdownPreference from './components/TaskBreakdownPreference'
import EncouragementStyle from './components/EncouragementStyle'
import ToggleOption from './components/ToggleOption'

interface ADHDPreferences {
  interruptionSensitivity: 'low' | 'medium' | 'high'
  taskBreakdownStyle: 'simple' | 'detailed' | 'very-detailed'
  hyperfocusProtection: boolean
  encouragementStyle: 'gentle' | 'direct' | 'funny'
  mixUpEncouragement: boolean
  overwhelmDetection: boolean
}

export default function ADHDPreferencesPage() {
  const router = useRouter()
  
  const [preferences, setPreferences] = useState<ADHDPreferences>({
    interruptionSensitivity: 'medium',
    taskBreakdownStyle: 'simple',
    hyperfocusProtection: true,
    encouragementStyle: 'funny',
    mixUpEncouragement: true,
    overwhelmDetection: true
  })

  const handleBack = () => {
    router.push('/settings')
  }

  const updatePreference = <K extends keyof ADHDPreferences>(
    key: K,
    value: ADHDPreferences[K]
  ) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
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
          ADHD Preferences
        </h1>
        <div style={{ width: '40px' }}></div>
      </div>

      {/* Content */}
      <div style={{ padding: '0 20px' }}>
        {/* Personalization Info Box */}
        <PersonalizationInfoBox />

        {/* Focus & Attention Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            color: '#4c4c4c',
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '20px'
          }}>
            Focus & Attention
          </h2>

          {/* Interruption Sensitivity */}
          <InterruptionSensitivity
            value={preferences.interruptionSensitivity}
            onChange={(value) => updatePreference('interruptionSensitivity', value)}
          />

          {/* Task Breakdown Preference */}
          <TaskBreakdownPreference
            value={preferences.taskBreakdownStyle}
            onChange={(value) => updatePreference('taskBreakdownStyle', value)}
          />

          {/* Hyperfocus Protection */}
          <ToggleOption
            title="Hyperfocus Protection"
            subtitle="Reduce interruptions when you're in flow state."
            value={preferences.hyperfocusProtection}
            onChange={(value) => updatePreference('hyperfocusProtection', value)}
          />
        </div>

        {/* Emotional Support Section */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{
            color: '#4c4c4c',
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '20px'
          }}>
            Emotional Support
          </h2>

          {/* Encouragement Style with Mix It Up */}
          <EncouragementStyle
            value={preferences.encouragementStyle}
            onChange={(value) => updatePreference('encouragementStyle', value)}
            mixUpValue={preferences.mixUpEncouragement}
            onMixUpChange={(value) => updatePreference('mixUpEncouragement', value)}
          />

          {/* Overwhelm Detection */}
          <ToggleOption
            title="Overwhelm Detection"
            subtitle="Let Kai notice when you might be feeling overwhelmed."
            value={preferences.overwhelmDetection}
            onChange={(value) => updatePreference('overwhelmDetection', value)}
            spacing={8}
          />
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