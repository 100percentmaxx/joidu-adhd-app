'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import ProHero from './components/ProHero'
import ProFeatureCard from './components/ProFeatureCard'
import PricingSection from './components/PricingSection'
import MoneyBackGuarantee from './components/MoneyBackGuarantee'

export default function JoiduProPage() {
  const router = useRouter()
  const [isSubscribing, setIsSubscribing] = useState(false)

  const handleBack = () => {
    router.push("/settings")
  }

  const handleStartFreeTrial = async () => {
    setIsSubscribing(true)
    
    try {
      // Simulate subscription flow
      console.log('Starting free trial subscription...')
      
      // In a real app, this would initialize the subscription
      setTimeout(() => {
        alert('Free trial started! Welcome to Joidu Pro!')
        setIsSubscribing(false)
      }, 2000)
    } catch (error) {
      alert('Unable to start trial. Please try again.')
      setIsSubscribing(false)
    }
  }

  const proFeatures = [
    {
      icon: '/icons/analytics_color.svg',
      title: 'Advanced Analytics',
      description: 'Deep insights into your productivity patterns, energy levels, and ADHD-specific metrics'
    },
    {
      icon: '/icons/kai.svg',
      title: 'Enhanced Kai AI',
      description: 'More sophisticated suggestions, personalized coaching, and advanced pattern recognition'
    },
    {
      icon: '/icons/sync_arrows.svg',
      title: 'Cross-Device Sync',
      description: 'Securely sync your data across phone, tablet, and desktop with end-to-end encryption'
    },
    {
      icon: '/icons/custom.svg',
      title: 'Custom Themes',
      description: 'Personalize your app with custom color schemes and sensory-friendly options'
    },
    {
      icon: '/icons/export.svg',
      title: 'Unlimited Exports',
      description: 'Export your data in multiple formats with no limits, perfect for backup and analysis'
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
          Joidu Pro
        </h1>
        <div style={{ width: '40px' }}></div>
      </div>

      {/* Content */}
      <div style={{ padding: '0 20px' }}>
        {/* Hero Section */}
        <ProHero />

        {/* Pro Features Section */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{
            color: '#4c4c4c',
            fontSize: '24px',
            fontWeight: 600,
            marginBottom: '20px'
          }}>
            Pro Features
          </h2>

          {proFeatures.map((feature, index) => (
            <ProFeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              spacing={index === proFeatures.length - 1 ? 32 : 16}
            />
          ))}
        </div>

        {/* Pricing Section */}
        <PricingSection
          onStartTrial={handleStartFreeTrial}
          isSubscribing={isSubscribing}
        />

        {/* Money-Back Guarantee */}
        <MoneyBackGuarantee />

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