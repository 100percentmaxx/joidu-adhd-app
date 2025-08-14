'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import HelpInfoBox from './components/HelpInfoBox'
import SearchBar from './components/SearchBar'
import TopicCard from './components/TopicCard'
import FAQItem from './components/FAQItem'
import SupportCard from './components/SupportCard'

export default function HelpSupportPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const handleBack = () => {
    router.push("/settings")
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // TODO: Implement search functionality
  }

  const popularTopics = [
    {
      icon: '/icons/rocket.svg',
      title: 'Getting Started Guide',
      description: 'Coming soon - basic setup and usage guide',
      action: () => console.log('Getting Started Guide temporarily disabled')
    },
    {
      icon: '/icons/kai.svg',
      title: 'Understanding Kai AI',
      description: 'How your AI assistant learns and helps',
      action: () => console.log('Navigate to Kai AI guide')
    },
    {
      icon: '/icons/brain.svg',
      title: 'ADHD-Specific Tips',
      description: 'Strategies for managing ADHD challenges',
      action: () => console.log('Navigate to ADHD tips guide')
    },
    {
      icon: '/icons/privacy.svg',
      title: 'Privacy & Data',
      description: 'How we protect your information',
      action: () => console.log('Navigate to privacy guide')
    }
  ]

  const faqItems = [
    {
      question: 'How do I sync between devices?',
      answer: 'To sync between devices, ensure you\'re signed in with the same account on all devices. Your data will automatically sync when connected to the internet. You can check sync status in Settings > Account > Sync Settings.'
    },
    {
      question: 'Why isn\'t my reminder working?',
      answer: 'Make sure notifications are enabled for Joidu in your device settings. Check that Do Not Disturb mode isn\'t blocking notifications, and verify your reminder times in Settings > Notifications.'
    },
    {
      question: 'Can I export my data?',
      answer: 'Yes! You can export your data in multiple formats. Go to Settings > Data & Privacy > Export Data. Free users can export once per month, while Pro users have unlimited exports.'
    }
  ]

  const supportOptions = [
    {
      icon: '/icons/email.svg',
      title: 'Email Support',
      description: 'Get personalized help via email',
      action: () => window.location.href = 'mailto:support@joidu.app?subject=Support Request'
    },
    {
      icon: '/icons/bug.svg',
      title: 'Report Bug',
      description: 'Help us fix issues quickly',
      action: () => console.log('Open bug report form')
    },
    {
      icon: '/icons/ideas_color.svg',
      title: 'Feature Request',
      description: 'Suggest new features',
      action: () => console.log('Open feature request form')
    }
  ]

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index)
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
          Help & Support
        </h1>
        <div style={{ width: '40px' }}></div>
      </div>

      {/* Content */}
      <div style={{ padding: '0 20px' }}>
        {/* Help Info Box */}
        <HelpInfoBox />

        {/* Search Section */}
        <SearchBar 
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search help articles..."
        />

        {/* Popular Topics Section */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{
            color: '#4c4c4c',
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '20px'
          }}>
            Popular Topics
          </h2>

          {popularTopics.map((topic, index) => (
            <TopicCard
              key={topic.title}
              icon={topic.icon}
              title={topic.title}
              description={topic.description}
              onClick={topic.action}
              spacing={index === popularTopics.length - 1 ? 0 : 8}
            />
          ))}
        </div>

        {/* Quick Answers Section */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{
            color: '#4c4c4c',
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '20px'
          }}>
            Quick Answers
          </h2>

          {faqItems.map((faq, index) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isExpanded={expandedFAQ === index}
              onToggle={() => toggleFAQ(index)}
              spacing={index === faqItems.length - 1 ? 0 : 8}
            />
          ))}
        </div>

        {/* Need More Help Section */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{
            color: '#4c4c4c',
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '20px'
          }}>
            Need More Help?
          </h2>

          {supportOptions.map((option, index) => (
            <SupportCard
              key={option.title}
              icon={option.icon}
              title={option.title}
              description={option.description}
              onClick={option.action}
              spacing={index === supportOptions.length - 1 ? 0 : 8}
            />
          ))}
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