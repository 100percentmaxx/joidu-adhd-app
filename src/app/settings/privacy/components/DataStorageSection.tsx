import React from 'react'
import PrivacyToggle from './PrivacyToggle'

interface DataStorageSectionProps {
  localStorageEnabled: boolean
  cloudSyncEnabled: boolean
  onLocalStorageToggle: (value: boolean) => void
  onCloudSyncToggle: (value: boolean) => void
}

export default function DataStorageSection({
  localStorageEnabled,
  cloudSyncEnabled,
  onLocalStorageToggle,
  onCloudSyncToggle
}: DataStorageSectionProps) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{
        color: '#4c4c4c',
        fontSize: '20px',
        fontWeight: 600,
        marginBottom: '20px'
      }}>
        Data Storage
      </h2>

      {/* Local Data Storage Toggle */}
      <PrivacyToggle
        title="Local Data Storage"
        subtitle="Keep all data on this device only"
        value={localStorageEnabled}
        onToggle={onLocalStorageToggle}
        spacing={8}
      />

      {/* Cloud Sync Toggle */}
      <PrivacyToggle
        title="Cloud Sync"
        subtitle="Sync data across your devices securely"
        value={cloudSyncEnabled}
        onToggle={onCloudSyncToggle}
        spacing={32}
      />
    </div>
  )
}