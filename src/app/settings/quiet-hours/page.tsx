'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import QuietHoursInfoBox from './components/QuietHoursInfoBox'
import BedtimeSchedule from './components/BedtimeSchedule'
import DeepWorkHours from './components/DeepWorkHours'
import ToggleRow from './components/ToggleRow'

interface QuietHoursSettings {
  bedtimeStart: string
  bedtimeEnd: string
  bedtimeActiveDays: boolean[]
  deepWorkStart: string
  deepWorkEnd: string
  hyperfocusProtection: boolean
  allowUrgentReminders: boolean
}

export default function QuietHoursPage() {
  const router = useRouter()
  
  const [settings, setSettings] = useState<QuietHoursSettings>({
    bedtimeStart: '22:00', // 10:00 PM
    bedtimeEnd: '07:00',   // 7:00 AM
    bedtimeActiveDays: [true, true, true, true, true, false, false], // Sun-Thu selected
    deepWorkStart: '09:00', // 9:00 AM
    deepWorkEnd: '12:00',   // 12:00 PM
    hyperfocusProtection: true,
    allowUrgentReminders: true
  })

  const handleBack = () => {
    router.push("/settings")
  }

  const updateSetting = <K extends keyof QuietHoursSettings>(
    key: K,
    value: QuietHoursSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }))
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
          Quiet Hours
        </h1>
        <div style={{ width: '40px' }}></div>
      </div>

      {/* Content */}
      <div style={{ padding: '0 20px' }}>
        {/* Quiet Hours Info Box */}
        <QuietHoursInfoBox />

        {/* Sleep Schedule Section */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{
            color: '#4c4c4c',
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '20px'
          }}>
            Sleep Schedule
          </h2>

          <BedtimeSchedule
            startTime={settings.bedtimeStart}
            endTime={settings.bedtimeEnd}
            activeDays={settings.bedtimeActiveDays}
            onStartTimeChange={(time) => updateSetting('bedtimeStart', time)}
            onEndTimeChange={(time) => updateSetting('bedtimeEnd', time)}
            onActiveDaysChange={(days) => updateSetting('bedtimeActiveDays', days)}
          />
        </div>

        {/* Focus Protection Section */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{
            color: '#4c4c4c',
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '20px'
          }}>
            Focus Protection
          </h2>

          <DeepWorkHours
            startTime={settings.deepWorkStart}
            endTime={settings.deepWorkEnd}
            onStartTimeChange={(time) => updateSetting('deepWorkStart', time)}
            onEndTimeChange={(time) => updateSetting('deepWorkEnd', time)}
          />

          {/* Hyperfocus Protection Toggle */}
          <ToggleRow
            title="Hyperfocus Protection"
            subtitle="Reduce interruptions when you're in flow state."
            value={settings.hyperfocusProtection}
            onToggle={(value) => updateSetting('hyperfocusProtection', value)}
            spacing={20}
          />
        </div>

        {/* Emergency Override Section */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{
            color: '#4c4c4c',
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '20px'
          }}>
            Emergency Override
          </h2>

          {/* Allow Urgent Reminders Toggle */}
          <ToggleRow
            title="Allow Urgent Reminders"
            subtitle="Let critical deadlines break through quiet hours."
            value={settings.allowUrgentReminders}
            onToggle={(value) => updateSetting('allowUrgentReminders', value)}
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