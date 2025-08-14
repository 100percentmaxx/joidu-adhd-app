'use client'

import React from 'react'
import { HabitSettings } from '@/types/habits'

interface ToggleSettingsProps {
  settings: HabitSettings
  onChange: (settings: HabitSettings) => void
}

export default function ToggleSettings({ settings, onChange }: ToggleSettingsProps) {
  const updateSetting = (key: keyof HabitSettings, value: boolean) => {
    onChange({ ...settings, [key]: value })
  }

  const ToggleSwitch = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <div
      onClick={onToggle}
      style={{
        width: '44px',
        height: '24px',
        backgroundColor: enabled ? '#2847ef' : '#e2e2e2',
        borderRadius: '12px',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
    >
      <div
        style={{
          width: '20px',
          height: '20px',
          backgroundColor: '#FFFFFF',
          borderRadius: '50%',
          position: 'absolute',
          top: '2px',
          left: enabled ? '22px' : '2px',
          transition: 'all 0.2s ease',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
        }}
      />
    </div>
  )

  return (
    <div style={{
      backgroundColor: '#fefbf7',
      padding: '0',
      borderRadius: '0',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      {/* Set Reminder */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span style={{
          fontSize: '16px',
          fontWeight: 500,
          color: '#4c4c4c'
        }}>
          Set reminder
        </span>
        <ToggleSwitch 
          enabled={settings.reminder} 
          onToggle={() => updateSetting('reminder', !settings.reminder)}
        />
      </div>

      {/* Track Streaks */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span style={{
          fontSize: '16px',
          fontWeight: 500,
          color: '#4c4c4c'
        }}>
          Track Streaks
        </span>
        <ToggleSwitch 
          enabled={settings.trackStreaks} 
          onToggle={() => updateSetting('trackStreaks', !settings.trackStreaks)}
        />
      </div>

      {/* Flexible Scheduling */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span style={{
          fontSize: '16px',
          fontWeight: 500,
          color: '#4c4c4c'
        }}>
          Flexible scheduling
        </span>
        <ToggleSwitch 
          enabled={settings.flexibleScheduling} 
          onToggle={() => updateSetting('flexibleScheduling', !settings.flexibleScheduling)}
        />
      </div>
    </div>
  )
}