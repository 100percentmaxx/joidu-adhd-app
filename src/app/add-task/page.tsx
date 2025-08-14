'use client'

import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Category = 'work' | 'health' | 'personal' | 'social' | 'creative' | 'finance'
type EnergyLevel = 'low' | 'medium' | 'high'
type Duration = 'quick' | 'medium' | 'long'
type DueDate = 'today' | 'tomorrow' | 'other'

interface TaskFormData {
  description: string
  category: Category | null
  dueDate: DueDate
  customDate: string
  duration: Duration | null
  energyLevel: EnergyLevel | null
  reminder: boolean
}

const categoryData = {
  work: { color: '#f9dac5', icon: '/icons/work.svg', label: 'Work' },
  health: { color: '#ddede3', icon: '/icons/health.svg', label: 'Health' },
  personal: { color: '#cae9ef', icon: '/icons/personal.svg', label: 'Personal' },
  social: { color: '#e6e1f4', icon: '/icons/social.svg', label: 'Social' },
  creative: { color: '#efc7c2', icon: '/icons/creative.svg', label: 'Creative' },
  finance: { color: '#f7e98e', icon: '/icons/finance_white.svg', label: 'Finance' }
}

const durationData = {
  quick: { icon: '/icons/fast.svg', label: 'Quick', time: '< 15 min' },
  medium: { icon: '/icons/timer.svg', label: 'Medium', time: '15-60 min' },
  long: { icon: '/icons/clock.svg', label: 'Long', time: '> 1 hour' }
}

export default function AddTask() {
  const router = useRouter()
  const [formData, setFormData] = useState<TaskFormData>({
    description: '',
    category: 'work',
    dueDate: 'today',
    customDate: '',
    duration: 'medium',
    energyLevel: 'medium',
    reminder: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.description.trim()) {
      newErrors.description = 'Task description is required'
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Task created:', formData)
      router.push('/tasks')
    }
  }

  const categories: Category[] = ['work', 'health', 'personal', 'social', 'creative', 'finance']

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fefbf7' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <button 
          onClick={() => router.back()}
          className="flex items-center justify-center w-10 h-10"
        >
          <ArrowLeft className="w-6 h-6" style={{ color: '#2847ef' }} />
        </button>
        <h1 style={{ 
          color: '#2847ef', 
          fontSize: '17px', 
          fontWeight: 600 
        }}>
          Add Task
        </h1>
        <div className="w-10" />
      </div>

      <div className="px-5 space-y-0">
        {/* Task Description */}
        <div className="mb-6">
          <label style={{ 
            color: '#4c4c4c', 
            fontSize: '17px', 
            fontWeight: 500,
            display: 'block',
            marginBottom: '8px'
          }}>
            What do you need to do?
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Prepare presentation slides"
            className="w-full p-3 rounded-lg border"
            style={{
              backgroundColor: 'white',
              borderColor: errors.description ? '#ff4444' : '#e2e2e2',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: 400,
              color: '#4c4c4c',
              height: '44px',
              resize: 'none',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          />
          {errors.description && (
            <p style={{ color: '#ff4444', fontSize: '14px', marginTop: '4px' }}>
              {errors.description}
            </p>
          )}
        </div>

        {/* AI Suggestion Box */}
        <div className="mb-6 p-3 rounded-lg" style={{
          backgroundColor: '#cae9ef',
          borderRadius: '12px'
        }}>
          <div className="flex items-center space-x-3">
            <img src="/icons/kai.svg" alt="kai" style={{ width: '24px', height: '24px' }} />
            <div className="flex-1">
              <span style={{ color: '#4c4c4c', fontSize: '14px', fontWeight: 500 }}>
                This seems like a complex task. I can break it into smaller steps?
              </span>
            </div>
            <button 
              className="px-3 py-1 rounded text-white"
              style={{ 
                backgroundColor: '#2847ef',
                fontSize: '14px',
                fontWeight: 500,
                borderRadius: '12px',
                border: 'none'
              }}
              onClick={() => {
                // AI suggestion functionality
              }}
            >
              Accept
            </button>
          </div>
        </div>

        {/* Separator Line */}
        <div style={{ height: '2px', backgroundColor: '#e2e2e2', margin: '24px 0' }}></div>

        {/* Category Selection */}
        <div className="mb-6">
          <label style={{ 
            color: '#4c4c4c', 
            fontSize: '17px', 
            fontWeight: 500,
            display: 'block',
            marginBottom: '12px'
          }}>
            Category
          </label>
          <div className="grid grid-cols-3 gap-2" style={{ maxWidth: '100%' }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFormData(prev => ({ ...prev, category }))}
                className="flex items-center p-3 rounded-lg transition-all"
                style={{
                  backgroundColor: categoryData[category].color,
                  border: formData.category === category ? '2px solid #2847ef' : '1px solid transparent',
                  borderRadius: '8px',
                  height: '48px',
                  width: '100%'
                }}
              >
                <img 
                  src={categoryData[category].icon} 
                  alt={category} 
                  style={{ width: '24px', height: '24px', marginRight: '8px' }} 
                />
                <span style={{ 
                  color: 'white', 
                  fontSize: '16px', 
                  fontWeight: 500
                }}>
                  {categoryData[category].label}
                </span>
              </button>
            ))}
          </div>
          {errors.category && (
            <p style={{ color: '#ff4444', fontSize: '14px', marginTop: '4px' }}>
              {errors.category}
            </p>
          )}
        </div>

        {/* Separator Line */}
        <div style={{ height: '2px', backgroundColor: '#e2e2e2', margin: '24px 0' }}></div>

        {/* When do you want to do this? */}
        <div className="mb-6">
          <label style={{ 
            color: '#4c4c4c', 
            fontSize: '17px', 
            fontWeight: 500,
            display: 'block',
            marginBottom: '8px'
          }}>
            When do you want to do this? (Optional)
          </label>
          <input
            type="text"
            value={formData.customDate}
            onChange={(e) => setFormData(prev => ({ ...prev, customDate: e.target.value }))}
            placeholder="Wednesday, 2 July"
            className="w-full p-3 rounded-lg border mb-3"
            style={{
              backgroundColor: 'white',
              borderColor: '#e2e2e2',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: 400,
              color: '#4c4c4c',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          />
          
          {/* Quick Date Options */}
          <div className="flex space-x-2">
            {[
              { value: 'today', label: 'Today' },
              { value: 'tomorrow', label: 'Tomorrow' },
              { value: 'other', label: 'Other' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setFormData(prev => ({ ...prev, dueDate: option.value as DueDate }))}
                className="flex-1 py-2 px-4 rounded-lg font-medium"
                style={{
                  backgroundColor: '#2847ef',
                  color: 'white',
                  fontSize: '14px',
                  borderRadius: '20px',
                  border: 'none'
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Separator Line */}
        <div style={{ height: '2px', backgroundColor: '#e2e2e2', margin: '24px 0' }}></div>

        {/* How long might this take? */}
        <div className="mb-6">
          <label style={{ 
            color: '#4c4c4c', 
            fontSize: '17px', 
            fontWeight: 500,
            display: 'block',
            marginBottom: '12px'
          }}>
            How long might this take? (Optional)
          </label>
          <div className="flex space-x-2">
            {Object.entries(durationData).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setFormData(prev => ({ ...prev, duration: key as Duration }))}
                className="flex-1 p-4 rounded-lg border text-center"
                style={{
                  backgroundColor: formData.duration === key ? '#cae9ef' : 'white',
                  border: formData.duration === key ? '2px solid #2847ef' : '1px solid #e2e2e2',
                  borderRadius: '8px',
                  height: '80px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img src={data.icon} alt={key} style={{ width: '20px', height: '20px', marginBottom: '4px' }} />
                <div style={{ color: '#4c4c4c', fontSize: '14px', fontWeight: 500, marginBottom: '2px' }}>
                  {data.label}
                </div>
                <div style={{ color: '#a5a5a5', fontSize: '12px' }}>
                  {data.time}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Energy Level */}
        <div className="mb-6" style={{ marginTop: '10px' }}>
          <label style={{ 
            color: '#4c4c4c', 
            fontSize: '17px', 
            fontWeight: 500,
            display: 'block',
            marginBottom: '12px'
          }}>
            Energy needed? (Optional)
          </label>
          <div className="flex space-x-2">
            {[
              { value: 'low', label: 'Low', color: '#a8e2bb' },
              { value: 'medium', label: 'Medium', color: '#f7e98e' },
              { value: 'high', label: 'High', color: '#efc7c2' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setFormData(prev => ({ ...prev, energyLevel: option.value as EnergyLevel }))}
                className="flex-1 p-4 rounded-lg border text-center"
                style={{
                  backgroundColor: formData.energyLevel === option.value ? '#cae9ef' : 'white',
                  border: formData.energyLevel === option.value ? '2px solid #2847ef' : '1px solid #e2e2e2',
                  borderRadius: '8px',
                  height: '80px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div 
                  className="rounded-full mb-2"
                  style={{ 
                    width: '14px',
                    height: '14px',
                    backgroundColor: option.color,
                    border: '2px solid #a5a5a5'
                  }}
                ></div>
                <div style={{ color: '#4c4c4c', fontSize: '14px', fontWeight: 500 }}>
                  {option.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Separator Line */}
        <div style={{ height: '2px', backgroundColor: '#e2e2e2', margin: '24px 0' }}></div>

        {/* Set Reminder */}
        <div className="flex items-center justify-between p-4 rounded-lg mb-6" style={{
          backgroundColor: '#fefbf7',
          borderRadius: '8px'
        }}>
          <span style={{ 
            color: '#4c4c4c', 
            fontSize: '17px', 
            fontWeight: 500 
          }}>
            Set reminder
          </span>
          <button
            onClick={() => setFormData(prev => ({ ...prev, reminder: !prev.reminder }))}
            className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
            style={{
              backgroundColor: formData.reminder ? '#2847ef' : '#e2e2e2'
            }}
          >
            <span
              className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              style={{
                transform: formData.reminder ? 'translateX(1.5rem)' : 'translateX(0.25rem)'
              }}
            />
          </button>
        </div>

        {/* Separator Line */}
        <div style={{ height: '2px', backgroundColor: '#e2e2e2', margin: '24px 0' }}></div>

        {/* Second AI Suggestion Box */}
        <div className="mb-6 p-3 rounded-lg" style={{
          backgroundColor: '#cae9ef',
          borderRadius: '12px'
        }}>
          <div className="flex items-center space-x-3">
            <img src="/icons/kai.svg" alt="kai" style={{ width: '24px', height: '24px' }} />
            <div className="flex-1">
              <span style={{ color: '#4c4c4c', fontSize: '14px', fontWeight: 500 }}>
                Based on your patterns, you handle emails best in the morning (9 - 11 AM) when your focus is sharpest. Consider doing this first thing you wake!
              </span>
            </div>
            <button 
              className="px-3 py-1 rounded text-white"
              style={{ 
                backgroundColor: '#2847ef',
                fontSize: '14px',
                fontWeight: 500,
                borderRadius: '12px',
                border: 'none'
              }}
              onClick={() => {
                // AI suggestion functionality
              }}
            >
              Accept
            </button>
          </div>
        </div>

        {/* Add Task Button */}
        <div className="mb-8" style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleSubmit}
            className="py-3 px-8 rounded-lg text-white font-semibold"
            style={{
              backgroundColor: '#2847ef',
              fontSize: '16px',
              borderRadius: '8px',
              border: 'none',
              width: 'auto',
              minWidth: '120px'
            }}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  )
}