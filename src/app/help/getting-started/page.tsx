'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import WelcomeScreen from './components/WelcomeScreen'
import GuideSection from './components/GuideSection'
import CompletionScreen from './components/CompletionScreen'
import ProgressBar from './components/ProgressBar'
import NavigationButtons from './components/NavigationButtons'
import { guideSections } from './content/sections'

type GuideState = 'welcome' | 'guide' | 'completed'
type PathType = 'quick' | 'complete' | 'skip'

export default function GettingStartedPage() {
  const router = useRouter()
  const [currentState, setCurrentState] = useState<GuideState>('welcome')
  const [currentSection, setCurrentSection] = useState(1)
  const [selectedPath, setSelectedPath] = useState<PathType | null>(null)
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set())

  // Load saved progress from localStorage
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('joidu-guide-progress')
      if (savedProgress) {
        const progress = JSON.parse(savedProgress)
        setCurrentState(progress.currentState || 'welcome')
        setCurrentSection(progress.currentSection || 1)
        setSelectedPath(progress.selectedPath || null)
        setCompletedSections(new Set(progress.completedSections || []))
      }
    } catch (error) {
      console.error('Error loading guide progress:', error)
    }
  }, [])

  // Save progress to localStorage whenever state changes
  useEffect(() => {
    try {
      const progress = {
        currentState,
        currentSection,
        selectedPath,
        completedSections: Array.from(completedSections)
      }
      localStorage.setItem('joidu-guide-progress', JSON.stringify(progress))
    } catch (error) {
      console.error('Error saving guide progress:', error)
    }
  }, [currentState, currentSection, selectedPath, completedSections])

  const handleBack = () => {
    if (currentState === 'welcome') {
      router.push('/settings/help')
    } else {
      setCurrentState('welcome')
      setCurrentSection(1)
    }
  }

  const handleSelectPath = (path: PathType) => {
    setSelectedPath(path)
    
    if (path === 'skip') {
      // Skip directly to the app
      router.push('/')
    } else {
      // Start the guide
      setCurrentState('guide')
      setCurrentSection(1)
      
      // For quick start, mark non-essential sections as completed
      if (path === 'quick') {
        const quickSections = new Set([1, 2, 3]) // Essential sections for quick start
        const allSections = new Set([4, 5, 6, 7]) // Non-essential sections
        setCompletedSections(allSections)
      }
    }
  }

  const handlePrevious = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1)
    }
  }

  const handleNext = () => {
    // Mark current section as completed
    const newCompleted = new Set(completedSections)
    newCompleted.add(currentSection)
    setCompletedSections(newCompleted)
    
    if (currentSection < guideSections.length) {
      setCurrentSection(currentSection + 1)
    }
  }

  const handleComplete = () => {
    // Mark final section as completed
    const newCompleted = new Set(completedSections)
    newCompleted.add(currentSection)
    setCompletedSections(newCompleted)
    
    setCurrentState('completed')
  }

  const handleStartUsing = () => {
    // Mark guide as fully completed
    try {
      localStorage.setItem('joidu-guide-completed', 'true')
    } catch (error) {
      console.error('Error marking guide as completed:', error)
    }
    
    // Navigate to home
    router.push('/')
  }

  const getTotalSteps = () => {
    if (selectedPath === 'quick') {
      return 3 // Only essential sections
    }
    return guideSections.length
  }

  const getDisplaySection = () => {
    if (selectedPath === 'quick') {
      // For quick start, show only sections 1, 2, 3
      const quickSections = [1, 2, 3]
      return quickSections[currentSection - 1]
    }
    return currentSection
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fefbf7' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        borderBottom: currentState !== 'welcome' ? '1px solid #f0f0f0' : 'none'
      }}>
        <button 
          onClick={handleBack}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ArrowLeft size={24} style={{ color: '#2847ef' }} />
        </button>
        
        <h1 style={{ 
          color: '#2847ef', 
          fontSize: '17px', 
          fontWeight: 600,
          margin: 0
        }}>
          Getting Started
        </h1>
        
        <div style={{ width: '40px' }}></div>
      </div>

      {/* Content */}
      <div style={{ 
        padding: '20px',
        paddingBottom: '40px'
      }}>
        {currentState === 'welcome' && (
          <WelcomeScreen onSelectPath={handleSelectPath} />
        )}

        {currentState === 'guide' && (
          <div>
            {/* Progress Bar */}
            <ProgressBar 
              currentStep={currentSection} 
              totalSteps={getTotalSteps()} 
            />

            {/* Current Section */}
            <GuideSection 
              section={guideSections[getDisplaySection() - 1]} 
            />

            {/* Navigation */}
            <NavigationButtons
              currentStep={currentSection}
              totalSteps={getTotalSteps()}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onComplete={handleComplete}
            />
          </div>
        )}

        {currentState === 'completed' && (
          <CompletionScreen onStartUsing={handleStartUsing} />
        )}
      </div>
    </div>
  )
}