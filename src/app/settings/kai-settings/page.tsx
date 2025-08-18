'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import CustomizeAIInfoBox from './components/CustomizeAIInfoBox'
import ResponseStyleSelector from './components/ResponseStyleSelector'
import EncouragementLevelSelector from './components/EncouragementLevelSelector'
import SuggestionFrequencySlider from './components/SuggestionFrequencySlider'
import ToggleOption from './components/ToggleOption'
import ResetLearningButton from './components/ResetLearningButton'

interface KaiAISettings {
  smartSuggestions: boolean
  suggestionFrequency: 'minimal' | 'balanced' | 'frequent'
  taskBreakdown: boolean
  autoCategorization: boolean
  responseStyle: 'concise' | 'balanced' | 'detailed'
  encouragementLevel: 'light' | 'moderate' | 'strong'
  learnFromUsage: boolean
  learnFromConversations: boolean
}

export default function KaiAISettingsPage() {
  const router = useRouter()
  
  const [settings, setSettings] = useState<KaiAISettings>({
    smartSuggestions: true,
    suggestionFrequency: 'balanced',
    taskBreakdown: true,
    autoCategorization: true,
    responseStyle: 'concise',
    encouragementLevel: 'strong',
    learnFromUsage: true,
    learnFromConversations: true
  })

  const handleBack = () => {
    router.push('/settings')
  }

  const updateSetting = <K extends keyof KaiAISettings>(
    key: K,
    value: KaiAISettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleResetLearning = () => {
    const confirmed = confirm(
      "Are you sure you want to reset Kai's learning? This will clear all learned patterns and preferences."
    )
    
    if (confirmed) {
      // Reset to default settings
      setSettings({
        smartSuggestions: true,
        suggestionFrequency: 'balanced',
        taskBreakdown: true,
        autoCategorization: true,
        responseStyle: 'concise',
        encouragementLevel: 'moderate',
        learnFromUsage: true,
        learnFromConversations: true
      })
      alert("Kai's learning has been reset to default settings.")
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <button 
          onClick={handleBack}
          className="flex items-center justify-center w-10 h-10"
        >
          <ArrowLeft className="w-6 h-6" style={{ color: 'var(--primary-blue)' }} />
        </button>
        <h1 style={{ 
          color: 'var(--primary-blue)', 
          fontSize: '17px', 
          fontWeight: 600 
        }}>
          Kai AI Settings
        </h1>
        <div style={{ width: '40px' }}></div>
      </div>

      {/* Content */}
      <div style={{ padding: '0 20px' }}>
        {/* Customize AI Info Box */}
        <CustomizeAIInfoBox />

        {/* Learning & Suggestions Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            color: 'var(--text-primary)',
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '20px'
          }}>
            Learning & Suggestions
          </h2>

          {/* Smart Suggestions */}
          <ToggleOption
            title="Smart Suggestions"
            subtitle="Let Kai proactively offer helpful suggestions."
            value={settings.smartSuggestions}
            onChange={(value) => updateSetting('smartSuggestions', value)}
            spacing={8}
          />

          {/* Suggestion Frequency Slider */}
          <SuggestionFrequencySlider
            value={settings.suggestionFrequency}
            onChange={(value) => updateSetting('suggestionFrequency', value)}
          />

          {/* Task Breakdown */}
          <ToggleOption
            title="Task Breakdown"
            subtitle="Automatically break down complex tasks."
            value={settings.taskBreakdown}
            onChange={(value) => updateSetting('taskBreakdown', value)}
            spacing={8}
          />

          {/* Auto-Categorization */}
          <ToggleOption
            title="Auto-Categorization"
            subtitle="Let Kai automatically sort your Just One Thing tasks."
            value={settings.autoCategorization}
            onChange={(value) => updateSetting('autoCategorization', value)}
            spacing={32}
          />
        </div>

        {/* Communication Style Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            color: 'var(--text-primary)',
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '18px'
          }}>
            Communication Style
          </h2>

          {/* Response Style */}
          <ResponseStyleSelector
            value={settings.responseStyle}
            onChange={(value) => updateSetting('responseStyle', value)}
          />

          {/* Encouragement Level */}
          <EncouragementLevelSelector
            value={settings.encouragementLevel}
            onChange={(value) => updateSetting('encouragementLevel', value)}
          />

          {/* Learn from Usage Patterns */}
          <ToggleOption
            title="Learn from Usage Patterns"
            subtitle="Help Kai understand your productivity patterns."
            value={settings.learnFromUsage}
            onChange={(value) => updateSetting('learnFromUsage', value)}
            spacing={8}
          />

          {/* Learn from Conversations */}
          <ToggleOption
            title="Learn from Conversations"
            subtitle="Use chat history to improve suggestions."
            value={settings.learnFromConversations}
            onChange={(value) => updateSetting('learnFromConversations', value)}
            spacing={24}
          />

          {/* Reset Kai's Learning Button */}
          <ResetLearningButton onReset={handleResetLearning} />
        </div>

        {/* Bottom Branding */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '20px' 
        }}>
          <p style={{
            color: 'var(--text-secondary)',
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