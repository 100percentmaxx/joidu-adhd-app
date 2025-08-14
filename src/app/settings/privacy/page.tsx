'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import PrivacyInfoBox from './components/PrivacyInfoBox'
import DataStorageSection from './components/DataStorageSection'
import AILearningSection from './components/AILearningSection'
import PermissionsSection from './components/PermissionsSection'
import AccountLegalSection from './components/AccountLegalSection'

interface PrivacySettings {
  dataStorage: {
    localStorageEnabled: boolean
    cloudSyncEnabled: boolean
  }
  aiLearning: {
    onDeviceProcessing: boolean
    anonymousAnalytics: boolean
  }
  permissions: {
    calendarAccess: boolean
    notificationAccess: boolean
  }
  preferences: {
    dataSharingConsent: boolean
    marketingConsent: boolean
  }
}

export default function PrivacySettingsPage() {
  const router = useRouter()
  
  const [settings, setSettings] = useState<PrivacySettings>({
    dataStorage: {
      localStorageEnabled: true,
      cloudSyncEnabled: false
    },
    aiLearning: {
      onDeviceProcessing: true,
      anonymousAnalytics: false
    },
    permissions: {
      calendarAccess: false,
      notificationAccess: false
    },
    preferences: {
      dataSharingConsent: false,
      marketingConsent: false
    }
  })

  const handleBack = () => {
    router.push("/settings")
  }

  const updatePrivacySetting = (
    category: keyof PrivacySettings,
    setting: string,
    value: boolean
  ) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }))

    // Store in localStorage for persistence
    localStorage.setItem(`privacy_${category}_${setting}`, String(value))
    
    // Handle specific privacy setting changes
    switch (category) {
      case 'dataStorage':
        if (setting === 'cloudSyncEnabled' && value) {
          console.log('Show cloud sync setup flow')
        }
        break
      case 'aiLearning':
        if (setting === 'onDeviceProcessing' && !value) {
          console.log('Disable AI features')
        }
        break
    }
  }

  const handleCalendarPermission = () => {
    console.log('Navigate to calendar permission settings')
  }

  const handleNotificationPermission = () => {
    console.log('Navigate to notification permission settings')
  }

  const handlePrivacyPolicy = () => {
    console.log('Open privacy policy document')
  }

  const handleDeleteAccount = () => {
    const confirmed = confirm(
      "Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data."
    )
    
    if (confirmed) {
      console.log('Navigate to account deletion flow')
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
          Privacy Settings
        </h1>
        <div style={{ width: '40px' }}></div>
      </div>

      {/* Content */}
      <div style={{ padding: '0 20px' }}>
        {/* Privacy Info Box */}
        <PrivacyInfoBox />

        {/* Data Storage Section */}
        <DataStorageSection
          localStorageEnabled={settings.dataStorage.localStorageEnabled}
          cloudSyncEnabled={settings.dataStorage.cloudSyncEnabled}
          onLocalStorageToggle={(value) => updatePrivacySetting('dataStorage', 'localStorageEnabled', value)}
          onCloudSyncToggle={(value) => updatePrivacySetting('dataStorage', 'cloudSyncEnabled', value)}
        />

        {/* AI & Learning Section */}
        <AILearningSection
          onDeviceProcessing={settings.aiLearning.onDeviceProcessing}
          anonymousAnalytics={settings.aiLearning.anonymousAnalytics}
          onDeviceProcessingToggle={(value) => updatePrivacySetting('aiLearning', 'onDeviceProcessing', value)}
          onAnonymousAnalyticsToggle={(value) => updatePrivacySetting('aiLearning', 'anonymousAnalytics', value)}
        />

        {/* Sharing & Permissions Section */}
        <PermissionsSection
          onCalendarPermission={handleCalendarPermission}
          onNotificationPermission={handleNotificationPermission}
        />

        {/* Account & Legal Section */}
        <AccountLegalSection
          onPrivacyPolicy={handlePrivacyPolicy}
          onDeleteAccount={handleDeleteAccount}
        />

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