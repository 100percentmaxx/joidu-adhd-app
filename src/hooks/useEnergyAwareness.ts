import { useState, useEffect, useCallback } from 'react'
import { EnergyLevel, TimeOfDay, EnergyRecommendation } from '@/types/focus'

export function useEnergyAwareness() {
  const [currentEnergy, setCurrentEnergy] = useState<EnergyLevel>('medium')
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning')

  // Determine time of day
  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours()
      
      if (hour >= 6 && hour < 12) {
        setTimeOfDay('morning')
      } else if (hour >= 12 && hour < 18) {
        setTimeOfDay('afternoon')
      } else {
        setTimeOfDay('evening')
      }
    }

    updateTimeOfDay()
    
    // Update every hour
    const interval = setInterval(updateTimeOfDay, 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // Auto-detect energy level based on user patterns
  useEffect(() => {
    const detectEnergyLevel = () => {
      // Load user's historical patterns
      const savedPatterns = localStorage.getItem('user-energy-patterns')
      const patterns = savedPatterns ? JSON.parse(savedPatterns) : null

      if (patterns && patterns[timeOfDay]) {
        setCurrentEnergy(patterns[timeOfDay])
      } else {
        // Default energy patterns for ADHD brains
        switch (timeOfDay) {
          case 'morning':
            setCurrentEnergy('high') // ADHD brains often have best focus in morning
            break
          case 'afternoon':
            setCurrentEnergy('medium') // Post-lunch dip is real
            break
          case 'evening':
            setCurrentEnergy('low') // Mental fatigue by evening
            break
        }
      }
    }

    detectEnergyLevel()
  }, [timeOfDay])

  // Get duration recommendation based on energy and time
  const getRecommendation = useCallback((): EnergyRecommendation => {
    let duration: number
    let reasoning: string
    let confidence: number

    switch (currentEnergy) {
      case 'high':
        if (timeOfDay === 'morning') {
          duration = 45
          reasoning = "Your ADHD brain is at peak focus in the morning. Take advantage with a longer session!"
          confidence = 0.9
        } else {
          duration = 30
          reasoning = "High energy detected! You can handle a solid focus session."
          confidence = 0.8
        }
        break
        
      case 'medium':
        duration = 25
        reasoning = "A classic Pomodoro session works well with medium energy levels."
        confidence = 0.7
        break
        
      case 'low':
        duration = 15
        reasoning = "Low energy? No problem. A short focused burst can still be productive."
        confidence = 0.8
        break
    }

    // Adjust for evening fatigue
    if (timeOfDay === 'evening' && duration > 25) {
      duration = Math.min(duration, 20)
      reasoning = "Evening sessions work best when kept short and gentle."
      confidence = 0.9
    }

    return { duration, reasoning, confidence }
  }, [currentEnergy, timeOfDay])

  // Record successful session for learning
  const recordSuccessfulSession = useCallback((duration: number, completed: boolean) => {
    const patterns = JSON.parse(localStorage.getItem('user-energy-patterns') || '{}')
    
    if (!patterns[timeOfDay]) {
      patterns[timeOfDay] = { successful: [], failed: [] }
    }

    const sessionData = {
      duration,
      completed,
      timestamp: new Date().toISOString(),
      energy: currentEnergy
    }

    if (completed) {
      patterns[timeOfDay].successful.push(sessionData)
    } else {
      patterns[timeOfDay].failed.push(sessionData)
    }

    // Keep only last 20 sessions per time period
    patterns[timeOfDay].successful = patterns[timeOfDay].successful.slice(-20)
    patterns[timeOfDay].failed = patterns[timeOfDay].failed.slice(-20)

    localStorage.setItem('user-energy-patterns', JSON.stringify(patterns))

    // Update current energy based on patterns
    const recentSessions = [...patterns[timeOfDay].successful, ...patterns[timeOfDay].failed]
      .slice(-5) // Last 5 sessions
    
    if (recentSessions.length >= 3) {
      const avgCompletionRate = recentSessions.filter(s => s.completed).length / recentSessions.length
      
      if (avgCompletionRate > 0.7) {
        setCurrentEnergy('high')
      } else if (avgCompletionRate > 0.4) {
        setCurrentEnergy('medium')
      } else {
        setCurrentEnergy('low')
      }
    }
  }, [currentEnergy, timeOfDay])

  // Manual energy level adjustment
  const setEnergyLevel = useCallback((level: EnergyLevel) => {
    setCurrentEnergy(level)
    
    // Save user's manual preference
    const preferences = JSON.parse(localStorage.getItem('energy-preferences') || '{}')
    preferences[new Date().toDateString()] = level
    localStorage.setItem('energy-preferences', JSON.stringify(preferences))
  }, [])

  // Get energy-specific encouragement messages
  const getEncouragement = useCallback(() => {
    const messages = {
      high: [
        "Your focus superpower is activated! 🚀",
        "Perfect timing - your brain is ready to dive deep!",
        "High energy detected! Time to tackle that big task."
      ],
      medium: [
        "Steady energy is perfect for consistent progress. ⚡",
        "You've got good focus potential right now!",
        "Medium energy means reliable productivity ahead."
      ],
      low: [
        "Low energy doesn't mean low value! Every bit counts. 💙",
        "Gentle focus sessions can be surprisingly effective.",
        "Your brain deserves compassion. Small steps are still steps."
      ]
    }

    const messageList = messages[currentEnergy]
    return messageList[Math.floor(Math.random() * messageList.length)]
  }, [currentEnergy])

  return {
    currentEnergy,
    timeOfDay,
    recommendation: getRecommendation(),
    recordSuccessfulSession,
    setEnergyLevel,
    encouragement: getEncouragement()
  }
}