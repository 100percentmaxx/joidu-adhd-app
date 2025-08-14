'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import UserProfile from './components/UserProfile'
import SettingsSection from './components/SettingsSection'
import { SettingsRowProps } from './components/SettingsRow'
import RateJoiduModal from '../../components/rating/RateJoiduModal'
import SignOutModal from '../../components/auth/SignOutModal'

function SettingsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Toggle states
  const [smartNotifications, setSmartNotifications] = useState(true)
  const [focusReminders, setFocusReminders] = useState(false)
  const [syncBackup, setSyncBackup] = useState(true)
  
  // Modal states
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [showSignOutModal, setShowSignOutModal] = useState(false)
  const [signOutInitialState, setSignOutInitialState] = useState<'initial' | 'backup'>('initial')
  const [exportCompleted, setExportCompleted] = useState(false)

  // Check for signout parameter on component mount
  useEffect(() => {
    const signoutParam = searchParams.get('signout')
    if (signoutParam === 'complete') {
      // Open sign out modal in initial state with export completed flag
      setSignOutInitialState('initial')
      setExportCompleted(true)
      setShowSignOutModal(true)
      // Clean up the URL parameter
      router.replace('/settings')
    }
  }, [searchParams, router])

  const handleBack = () => {
    router.push('/')
  }

  const handleNavigation = (route: string) => {
    router.push(route)
  }

  // Toggle handlers
  const toggleActions = {
    smartNotifications: (value: boolean) => {
      setSmartNotifications(value)
      // TODO: Implement smart notifications toggle logic
    },
    focusReminders: (value: boolean) => {
      setFocusReminders(value)
      // TODO: Implement focus reminders toggle logic
    },
    syncBackup: (value: boolean) => {
      setSyncBackup(value)
      // TODO: Implement sync & backup toggle logic
    }
  }

  // Settings routes
  const settingsRoutes = {
    appearance: '/settings/appearance',
    adhdPreferences: '/settings/adhd-preferences',
    kaiSettings: '/settings/kai-settings',
    quietHours: '/settings/quiet-hours',
    privacy: '/settings/privacy',
    dataExport: '/settings/data-export',
    pro: '/settings/pro',
    help: '/settings/help'
  }

  // Settings sections data
  const personalizationRows: SettingsRowProps[] = [
    {
      icon: <img src="/icons/preferences.svg" alt="preferences" style={{ width: '32px', height: '32px' }} />,
      title: 'Appearance',
      subtext: 'Theme, colors, layout',
      onPress: () => handleNavigation(settingsRoutes.appearance),
      showChevron: true
    }
  ]

  const adhdPreferencesRows: SettingsRowProps[] = [
    {
      icon: <img src="/icons/brain.svg" alt="brain" style={{ width: '32px', height: '32px' }} />,
      title: 'ADHD Preferences',
      subtext: 'Customize for your brain',
      onPress: () => handleNavigation(settingsRoutes.adhdPreferences),
      showChevron: true
    }
  ]

  const kaiSettingsRows: SettingsRowProps[] = [
    {
      icon: <img src="/icons/kai.svg" alt="kai" style={{ width: '32px', height: '32px' }} />,
      title: 'Kai Settings',
      subtext: 'AI assistant preferences',
      onPress: () => handleNavigation(settingsRoutes.kaiSettings),
      showChevron: true
    }
  ]

  const notificationsRows: SettingsRowProps[] = [
    {
      icon: <img src="/icons/smart_notify.svg" alt="smart notify" style={{ width: '32px', height: '32px' }} />,
      title: 'Smart Notifications',
      subtext: 'Context-aware reminders',
      showToggle: true,
      toggleValue: smartNotifications,
      onToggleChange: toggleActions.smartNotifications
    }
  ]

  const focusRemindersRows: SettingsRowProps[] = [
    {
      icon: <img src="/icons/focus.svg" alt="focus" style={{ width: '32px', height: '32px' }} />,
      title: 'Focus Reminders',
      subtext: 'Break and hydration alerts',
      showToggle: true,
      toggleValue: focusReminders,
      onToggleChange: toggleActions.focusReminders
    }
  ]

  const quietHoursRows: SettingsRowProps[] = [
    {
      icon: <img src="/icons/quiet.svg" alt="quiet" style={{ width: '32px', height: '32px' }} />,
      title: 'Quiet Hours',
      subtext: 'Do not disturb schedule',
      onPress: () => handleNavigation(settingsRoutes.quietHours),
      showChevron: true
    }
  ]

  const privacyRows: SettingsRowProps[] = [
    {
      icon: <img src="/icons/privacy.svg" alt="privacy" style={{ width: '32px', height: '32px' }} />,
      title: 'Privacy',
      subtext: 'Data usage and permissions',
      onPress: () => handleNavigation(settingsRoutes.privacy),
      showChevron: true
    }
  ]

  const exportRows: SettingsRowProps[] = [
    {
      icon: <img src="/icons/export.svg" alt="export" style={{ width: '32px', height: '32px' }} />,
      title: 'Export Data',
      subtext: 'Download your information',
      onPress: () => handleNavigation(settingsRoutes.dataExport),
      showChevron: true
    }
  ]

  const syncRows: SettingsRowProps[] = [
    {
      icon: <img src="/icons/sync_arrows.svg" alt="sync" style={{ width: '32px', height: '32px' }} />,
      title: 'Sync & Backup',
      subtext: 'Cloud synchronization',
      showToggle: true,
      toggleValue: syncBackup,
      onToggleChange: toggleActions.syncBackup
    }
  ]

  const proRows: SettingsRowProps[] = [
    {
      icon: <img src="/icons/joidu_drop_logo.svg" alt="joidu pro" style={{ width: '32px', height: '32px' }} />,
      title: 'Joidu Pro',
      subtext: 'Upgrade for advanced features',
      onPress: () => handleNavigation(settingsRoutes.pro),
      showChevron: true
    }
  ]

  const helpRows: SettingsRowProps[] = [
    {
      icon: <img src="/icons/help.svg" alt="help" style={{ width: '32px', height: '32px' }} />,
      title: 'Help & Support',
      subtext: 'FAQs and contact',
      onPress: () => handleNavigation(settingsRoutes.help),
      showChevron: true
    }
  ]

  const rateRows: SettingsRowProps[] = [
    {
      icon: <img src="/icons/rate.svg" alt="rate" style={{ width: '32px', height: '32px' }} />,
      title: 'Rate Joidu',
      subtext: 'Share your experience',
      onPress: () => {
        setShowRatingModal(true)
      },
      showChevron: true
    }
  ]

  const signoutRows: SettingsRowProps[] = [
    {
      icon: <img src="/icons/signout.svg" alt="signout" style={{ width: '32px', height: '32px' }} />,
      title: 'Sign Out',
      subtext: 'Logout from your account',
      onPress: () => {
        setSignOutInitialState('initial')
        setExportCompleted(false)
        setShowSignOutModal(true)
      },
      showChevron: true
    }
  ]

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
          Settings
        </h1>
        <div style={{ width: '40px' }}></div>
      </div>

      {/* Content */}
      <div className="px-5">
        {/* User Profile */}
        <UserProfile />

        {/* Personalization Section */}
        <SettingsSection 
          label="Personalization" 
          rows={personalizationRows}
          bottomSpacing={8}
        />
        <SettingsSection 
          label="" 
          rows={adhdPreferencesRows}
          bottomSpacing={8}
        />
        <SettingsSection 
          label="" 
          rows={kaiSettingsRows}
          bottomSpacing={24}
        />

        {/* Notifications & Reminders Section */}
        <SettingsSection 
          label="Notifications & Reminders" 
          rows={notificationsRows}
          bottomSpacing={8}
        />
        <SettingsSection 
          label="" 
          rows={focusRemindersRows}
          bottomSpacing={8}
        />
        <SettingsSection 
          label="" 
          rows={quietHoursRows}
          bottomSpacing={24}
        />

        {/* Data & Privacy Section */}
        <SettingsSection 
          label="Data & Privacy" 
          rows={privacyRows}
          bottomSpacing={8}
        />
        <SettingsSection 
          label="" 
          rows={exportRows}
          bottomSpacing={8}
        />
        <SettingsSection 
          label="" 
          rows={syncRows}
          bottomSpacing={24}
        />

        {/* Support & Account Section */}
        <SettingsSection 
          label="Support & Account" 
          rows={proRows}
          bottomSpacing={8}
        />
        <SettingsSection 
          label="" 
          rows={helpRows}
          bottomSpacing={8}
        />
        <SettingsSection 
          label="" 
          rows={rateRows}
          bottomSpacing={8}
        />
        <SettingsSection 
          label="" 
          rows={signoutRows}
          bottomSpacing={24}
        />

        {/* Bottom spacer for navigation */}
        <div style={{ height: '100px' }}></div>
      </div>

      {/* Rate Joidu Modal */}
      <RateJoiduModal 
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
      />

      {/* Sign Out Modal */}
      <SignOutModal 
        isOpen={showSignOutModal}
        onClose={() => {
          setShowSignOutModal(false)
          setExportCompleted(false)
        }}
        initialState={signOutInitialState}
        exportCompleted={exportCompleted}
      />
    </div>
  )
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingsContent />
    </Suspense>
  )
}