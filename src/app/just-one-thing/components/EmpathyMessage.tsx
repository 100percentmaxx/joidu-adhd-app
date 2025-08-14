'use client'

import React from 'react'

interface EmpathyMessageProps {
  message?: string
  subtitle?: string
}

const defaultMessages = [
  "Hey, we all hit a little bump in the road from time to time. Get stuck.",
  "Feeling a bit scattered? That's totally normal for ADHD brains.",
  "Sometimes our minds need a gentle nudge to get moving again.",
  "No judgment here - just a friendly suggestion to help you forward."
]

const defaultSubtitles = [
  "No worries! Here's a suggestion to get you moving again:",
  "Let's try something simple to build momentum:",
  "How about starting with something quick?",
  "Here's a gentle way to get back on track:"
]

export default function EmpathyMessage({ 
  message = defaultMessages[0], 
  subtitle = defaultSubtitles[0] 
}: EmpathyMessageProps) {
  return (
    <div style={{
      backgroundColor: '#cae9ef',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '24px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: '12px'
    }}>
      {/* Kai Icon */}
      <div style={{ flexShrink: 0, marginTop: '2px' }}>
        <img 
          src="/icons/kai.svg" 
          alt="Kai"
          style={{ width: '32px', height: '32px' }}
        />
      </div>
      
      {/* Message Content */}
      <div style={{ flex: 1 }}>
        <p style={{
          fontSize: '16px',
          fontWeight: 500,
          color: '#4c4c4c',
          margin: '0 0 8px 0',
          lineHeight: '1.4'
        }}>
          {message}
        </p>
        <p style={{
          fontSize: '16px',
          fontWeight: 400,
          color: '#4c4c4c',
          margin: 0,
          lineHeight: '1.4'
        }}>
          {subtitle}
        </p>
      </div>
    </div>
  )
}