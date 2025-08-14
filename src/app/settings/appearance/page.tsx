'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import ThemeSelector from './components/ThemeSelector'
import DisplayOption from './components/DisplayOption'
import ToggleRow from './components/ToggleRow'

interface AppearanceSettings {
  theme: 'light' | 'dark' | 'auto'
  textSize: 'small' | 'medium' | 'large' | 'xlarge'
  highContrast: boolean
  reduceMotion: boolean
  focusIndicators: boolean
}

export default function AppearancePage() {
  const router = useRouter()
  
  const [settings, setSettings] = useState<AppearanceSettings>({
    theme: 'light',
    textSize: 'medium',
    highContrast: false,
    reduceMotion: false,
    focusIndicators: true
  })

  const handleBack = () => {
    router.push("/settings")
  }

  const updateSetting = <K extends keyof AppearanceSettings>(
    key: K,
    value: AppearanceSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleThemeChange = (selectedTheme: 'light' | 'dark' | 'auto') => {
    updateSetting('theme', selectedTheme)
    // In a real app, this would apply theme changes immediately
    console.log(`Theme changed to: ${selectedTheme}`)
  }

  const handleTextSizeNavigation = () => {
    // Navigate to text size adjustment screen
    console.log('Navigate to text size settings')
  }

  const toggleAccessibilityFeature = (feature: keyof AppearanceSettings, enabled: boolean) => {
    updateSetting(feature, enabled)
    
    // Apply accessibility changes immediately
    switch (feature) {
      case 'highContrast':
        document.body.classList.toggle('high-contrast', enabled)
        break
      case 'reduceMotion':
        document.body.classList.toggle('reduce-motion', enabled)
        break
      case 'focusIndicators':
        document.body.classList.toggle('enhanced-focus', enabled)
        break
    }
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
          Appearance
        </h1>
        <div style={{ width: '40px' }}></div>
      </div>

      {/* Content */}
      <div style={{ padding: '0 20px' }}>
        {/* Theme Section */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{
            color: '#4c4c4c',
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '24px'
          }}>
            Theme
          </h2>

          <ThemeSelector
            selectedTheme={settings.theme}
            onThemeChange={handleThemeChange}
          />
        </div>

        {/* Display Options Section */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{
            color: '#4c4c4c',
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '24px'
          }}>
            Display Options
          </h2>

          {/* Text Size */}
          <DisplayOption
            title="Text Size"
            subtitle="Larger text for better readability"
            type="navigation"
            onNavigate={handleTextSizeNavigation}
          />

          {/* High Contrast */}
          <ToggleRow
            title="High Contrast"
            subtitle="Stronger color for better visibility"
            value={settings.highContrast}
            onToggle={(value) => toggleAccessibilityFeature('highContrast', value)}
            spacing={8}
          />

          {/* Reduce Motion */}
          <ToggleRow
            title="Reduce Motion"
            subtitle="Minimize animations and transitions"
            value={settings.reduceMotion}
            onToggle={(value) => toggleAccessibilityFeature('reduceMotion', value)}
            spacing={8}
          />

          {/* Focus Indicators */}
          <ToggleRow
            title="Focus Indicators"
            subtitle="Enhanced visual focus cues"
            value={settings.focusIndicators}
            onToggle={(value) => toggleAccessibilityFeature('focusIndicators', value)}
            spacing={60}
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