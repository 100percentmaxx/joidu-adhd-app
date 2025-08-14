import React from 'react'
import PrivacyToggle from './PrivacyToggle'

interface AILearningSectionProps {
  onDeviceProcessing: boolean
  anonymousAnalytics: boolean
  onDeviceProcessingToggle: (value: boolean) => void
  onAnonymousAnalyticsToggle: (value: boolean) => void
}

export default function AILearningSection({
  onDeviceProcessing,
  anonymousAnalytics,
  onDeviceProcessingToggle,
  onAnonymousAnalyticsToggle
}: AILearningSectionProps) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{
        color: '#4c4c4c',
        fontSize: '20px',
        fontWeight: 600,
        marginBottom: '20px'
      }}>
        AI & Learning
      </h2>

      {/* On-Device AI Processing Toggle */}
      <PrivacyToggle
        title="On-Device AI Processing"
        subtitle="AI learns from your patterns locally"
        value={onDeviceProcessing}
        onToggle={onDeviceProcessingToggle}
        spacing={8}
      />

      {/* Anonymous Usage Analytics Toggle */}
      <PrivacyToggle
        title="Anonymous Usage Analytics"
        subtitle="Help improve the app (no personal data)"
        value={anonymousAnalytics}
        onToggle={onAnonymousAnalyticsToggle}
        spacing={32}
      />
    </div>
  )
}