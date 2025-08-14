import React from 'react'
import SettingsRow, { SettingsRowProps } from './SettingsRow'

export interface SettingsSectionProps {
  label: string
  rows: SettingsRowProps[]
  bottomSpacing?: number
}

export default function SettingsSection({ 
  label, 
  rows, 
  bottomSpacing = 24 
}: SettingsSectionProps) {
  return (
    <div style={{ marginBottom: `${bottomSpacing}px` }}>
      {/* Section Label */}
      {label && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{
            color: '#a5a5a5',
            fontSize: '14px',
            fontWeight: 500,
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {label}
          </h2>
        </div>
      )}

      {/* Section Rows */}
      <div className="space-y-2">
        {rows.map((row, index) => (
          <SettingsRow
            key={index}
            icon={row.icon}
            title={row.title}
            subtext={row.subtext}
            onPress={row.onPress}
            showChevron={row.showChevron}
            showToggle={row.showToggle}
            toggleValue={row.toggleValue}
            onToggleChange={row.onToggleChange}
          />
        ))}
      </div>
    </div>
  )
}