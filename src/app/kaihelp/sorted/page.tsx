'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft, Plus, Send, Mic, Star, Search, ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

type ConversationType = 'tasks' | 'focus' | 'habits' | 'planning' | 'ideas' | 'analytics' | 'thought'
type ViewMode = 'recent' | 'categories' | 'chat' | 'thought-capture'

interface Message {
  id: string
  sender: 'user' | 'kai'
  text: string
  timestamp: string
  type?: 'text' | 'thought'
}

interface Conversation {
  id: string
  type: ConversationType
  title: string
  preview: string
  timestamp: string
  messages: Message[]
  isStarred?: boolean
  isOneThought?: boolean
}

export default function SortedKaiHelpPage() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<ViewMode>('recent')
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [thoughtCapture, setThoughtCapture] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedOrganization, setSelectedOrganization] = useState('Recent')
  const [isOneThoughtMode, setIsOneThoughtMode] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<ConversationType | null>(null)

  // Get URL parameters for filtering using window.location (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const category = urlParams.get('category') as ConversationType | null
      const sort = urlParams.get('sort')
      const shouldOpenSidebar = urlParams.get('sidebar') === 'open'
      
      if (category) {
        setSelectedCategory(category)
      }
      if (sort) {
        setSelectedOrganization(sort)
      }
      if (shouldOpenSidebar) {
        setSidebarOpen(true)
      }
    }
  }, [])

  // Sample conversations data
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      type: 'tasks',
      title: 'Break down my project into manageable...',
      preview: 'I am having trouble breaking my building project down into...',
      timestamp: '2 hours ago',
      isStarred: false,
      messages: [
        { id: '1', sender: 'user', text: 'I am having trouble breaking my building project down into manageable tasks. Can you help?', timestamp: '2:30 PM' },
        { id: '2', sender: 'kai', text: 'Hey! I totally get this - big projects can feel overwhelming. Let me help you break this down into bite-sized pieces that won\'t make your brain freeze up.\n\nFirst, can you tell me what kind of building project? And what\'s the main thing that\'s making it feel too big right now?', timestamp: '2:31 PM' },
        { id: '3', sender: 'user', text: 'It\'s a productivity app. I keep thinking about all the features I want and it feels impossible.', timestamp: '2:32 PM' }
      ]
    },
    {
      id: '2',
      type: 'focus',
      title: 'How long should my focus session be...',
      preview: 'How long should my focus session be...',
      timestamp: '4 hours ago',
      isStarred: false,
      messages: [
        { id: '1', sender: 'user', text: 'How long should my focus session be?', timestamp: '12:30 PM' }
      ]
    },
    {
      id: '3',
      type: 'habits',
      title: 'Reminder setup for daily meditation.',
      preview: 'Reminder setup for daily meditation.',
      timestamp: '1 day ago',
      isStarred: true,
      messages: [
        { id: '1', sender: 'user', text: 'Can you help me set up reminders for daily meditation?', timestamp: 'Yesterday' }
      ]
    },
    {
      id: '4',
      type: 'tasks',
      title: 'Help me organize today\'s priorities.',
      preview: 'Help me organize today\'s priorities.',
      timestamp: '1 day ago',
      isStarred: false,
      messages: [
        { id: '1', sender: 'user', text: 'Help me organize today\'s priorities.', timestamp: 'Yesterday' }
      ]
    },
    {
      id: '5',
      type: 'habits',
      title: 'Track progress on my thesis writing habit.',
      preview: 'Track progress on my thesis writing habit.',
      timestamp: '2 days ago',
      isStarred: false,
      messages: [
        { id: '1', sender: 'user', text: 'How can I track progress on my thesis writing habit?', timestamp: '2 days ago' }
      ]
    },
    {
      id: '6',
      type: 'analytics',
      title: 'What\'s my productivity trend this week?',
      preview: 'What\'s my productivity trend this week?',
      timestamp: '3 days ago',
      isStarred: false,
      messages: [
        { id: '1', sender: 'user', text: 'What\'s my productivity trend this week?', timestamp: '3 days ago' }
      ]
    },
    {
      id: '7',
      type: 'ideas',
      title: 'Ideas for managing email overload.',
      preview: 'Ideas for managing email overload.',
      timestamp: '4 days ago',
      isStarred: false,
      messages: [
        { id: '1', sender: 'user', text: 'Any ideas for managing email overload?', timestamp: '4 days ago' }
      ]
    },
    {
      id: '8',
      type: 'focus',
      title: 'Why did my focus timer keep interrupting?',
      preview: 'Why did my focus timer keep interrupting?',
      timestamp: '5 days ago',
      isStarred: false,
      messages: [
        { id: '1', sender: 'user', text: 'Why did my focus timer keep interrupting?', timestamp: '5 days ago' }
      ]
    },
    {
      id: '9',
      type: 'planning',
      title: 'Suggest a routine for morning productivity.',
      preview: 'Suggest a routine for morning productivity.',
      timestamp: '1 week ago',
      isStarred: false,
      messages: [
        { id: '1', sender: 'user', text: 'Can you suggest a routine for morning productivity?', timestamp: '1 week ago' }
      ]
    },
    {
      id: '10',
      type: 'ideas',
      title: '✨ What if we made a garden planning app?',
      preview: 'What if we made a garden planning app?',
      timestamp: '30 min ago',
      isStarred: false,
      isOneThought: true,
      messages: [
        { id: '1', sender: 'user', text: 'What if we made a garden planning app?', timestamp: '30 min ago', type: 'thought' }
      ]
    },
    {
      id: '11',
      type: 'tasks',
      title: '✨ Remember to call mom this weekend',
      preview: 'Remember to call mom this weekend',
      timestamp: '1 hour ago',
      isStarred: false,
      isOneThought: true,
      messages: [
        { id: '1', sender: 'user', text: 'Remember to call mom this weekend', timestamp: '1 hour ago', type: 'thought' }
      ]
    },
    {
      id: '12',
      type: 'focus',
      title: '✨ Why do I get distracted during calls?',
      preview: 'Why do I get distracted during calls?',
      timestamp: '3 hours ago',
      isStarred: false,
      isOneThought: true,
      messages: [
        { id: '1', sender: 'user', text: 'Why do I get distracted during calls?', timestamp: '3 hours ago', type: 'thought' }
      ]
    }
  ])

  // Category data using EXACT colors from design_system.md
  const categories = [
    { type: 'tasks' as ConversationType, label: 'Tasks', color: '#2847ef', bgColor: '#cae9ef', borderColor: '#98e1ea' }, // Primary Blue + Household/Errands colors
    { type: 'focus' as ConversationType, label: 'Focus', color: '#c8bfef', bgColor: '#e6e1f4', borderColor: '#c8bfef' }, // Social/Relationships colors
    { type: 'habits' as ConversationType, label: 'Habits', color: '#fa772c', bgColor: '#f9c075', borderColor: '#f9c075' }, // Primary Orange + Learning/Creative colors
    { type: 'planning' as ConversationType, label: 'Planning', color: '#a8e2bb', bgColor: '#ddede3', borderColor: '#a8e2bb' }, // Personal Care/Health colors  
    { type: 'ideas' as ConversationType, label: 'Ideas', color: '#f4b7ae', bgColor: '#f2d3d1', borderColor: '#f4b7ae' }, // Learning/Creative colors
    { type: 'analytics' as ConversationType, label: 'Analytics', color: '#f7e98e', bgColor: '#fef7d6', borderColor: '#f7e98e' }, // Finance/Admin colors
    { type: 'thought' as ConversationType, label: '1 Thought', color: '#2847ef', bgColor: '#f9dac5', borderColor: '#f9c075' } // Primary Blue + Work/Professional colors
  ]

  const handleSendMessage = () => {
    if (message.trim() && activeConversation) {
      // Here we would add the message to the conversation
      // For now, just clear the input
      setMessage('')
    }
  }

  const handleStartConversation = (type: ConversationType) => {
    // Create new conversation or find existing one
    const existingConv = conversations.find(c => c.type === type)
    if (existingConv) {
      setActiveConversation(existingConv.id)
      setViewMode('chat')
    } else {
      // Create new conversation logic would go here
      setViewMode('chat')
    }
  }

  const handleSaveThought = () => {
    if (thoughtCapture.trim()) {
      // Save thought logic would go here
      setThoughtCapture('')
      setViewMode('recent')
    }
  }

  const getConversationIcon = (type: ConversationType) => {
    const iconMap = {
      tasks: '/icons/chat_tasks.svg',
      focus: '/icons/chat_focus.svg',
      habits: '/icons/chat_habits.svg',
      planning: '/icons/chat_planning.svg',
      ideas: '/icons/chat_ideas.svg',
      analytics: '/icons/chat_analytics.svg',
      thought: '/icons/chat_1_thought_white.svg'
    }
    return iconMap[type]
  }

  const getCurrentConversation = () => {
    return conversations.find(c => c.id === activeConversation)
  }

  // Save thought with category
  const saveThoughtWithCategory = (category: string) => {
    console.log('Saving thought:', message, 'in category:', category)
    // Here we would save to conversations with isOneThought: true
    setIsOneThoughtMode(false)
    setMessage('')
  }

  const handleClearResults = () => {
    router.push('/kaihelp')
  }

  // Filter conversations based on selected category
  const filteredConversations = selectedCategory 
    ? selectedCategory === 'thought' 
      ? conversations.filter(conv => conv.isOneThought === true)
      : conversations.filter(conv => conv.type === selectedCategory)
    : conversations


  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <button 
          onClick={() => router.push('/kaihelp')}
          className="flex items-center justify-center w-10 h-10"
        >
          <ArrowLeft className="w-6 h-6" style={{ color: 'var(--primary-blue)' }} />
        </button>
        <h1 style={{ 
          color: 'var(--primary-blue)', 
          fontSize: '17px', 
          fontWeight: 600 
        }}>
          KaiHelp
        </h1>
        <button 
          onClick={() => setViewMode('thought-capture')}
          className="flex items-center justify-center w-10 h-10"
        >
          <Plus className="w-6 h-6" style={{ color: 'var(--primary-blue)' }} />
        </button>
      </div>

      {/* Sidebar Toggle - Positioned below header */}
      <div className="px-5" style={{ marginTop: '20px' }}>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center justify-center w-10 h-10"
        >
          <img 
            src={sidebarOpen ? "/icons/sidebar_popout_close.svg" : "/icons/sidebar_popout_open.svg"}
            alt="sidebar toggle"
            style={{ width: '24px', height: '24px' }}
          />
        </button>
      </div>

      {/* Content Area - Sort Results */}
      <div className="px-5" style={{ marginTop: '20px' }}>
        {/* Header with Clear button */}
        <div className="flex items-center justify-between mb-4">
          <h2 style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '16px', 
            fontWeight: 500 
          }}>
            {selectedCategory 
              ? selectedCategory === 'thought' 
                ? '1 Thought conversations'
                : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} conversations`
              : 'Recent chat history'
            }
          </h2>
          
          <button
            onClick={handleClearResults}
            className="px-3 py-1 rounded-lg"
            style={{
              backgroundColor: 'var(--error-light)',
              color: 'white',
              fontSize: '14px',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Clear
          </button>
        </div>

        {/* Filter indicator */}
        {selectedCategory && (
          <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--info-light)', border: '1px solid var(--primary-blue)' }}>
            <span style={{ color: 'var(--primary-blue)', fontSize: '14px', fontWeight: 500 }}>
              Showing {filteredConversations.length} conversations in "{selectedCategory === 'thought' ? '1 Thought' : selectedCategory}" category
            </span>
          </div>
        )}

        {/* Conversation List */}
        <div className="space-y-3 mb-6">
          {filteredConversations.map((conv) => {
            const category = categories.find(c => c.type === conv.type)
            return (
              <button
                key={conv.id}
                onClick={() => {
                  setActiveConversation(conv.id)
                  setViewMode('chat')
                }}
                className="w-full flex items-center p-4 rounded-lg transition-all duration-200 hover:shadow-sm"
                style={{ 
                  backgroundColor: 'white',
                  border: `2px solid ${category?.borderColor || '#e2e2e2'}`,
                  borderRadius: '12px'
                }}
              >
                <div className="mr-4">
                  <img 
                    src={getConversationIcon(conv.type)} 
                    alt={conv.type}
                    style={{ width: '48px', height: '48px' }}
                  />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center" style={{ marginBottom: '4px' }}>
                    {conv.isOneThought && (
                      <span style={{ fontSize: '16px', marginRight: '6px' }}>✨</span>
                    )}
                    <div style={{ 
                      color: '#4c4c4c', 
                      fontSize: '16px', 
                      fontWeight: 500
                    }}>
                      {conv.title}
                    </div>
                  </div>
                  <div style={{ 
                    color: 'var(--text-secondary)', 
                    fontSize: '14px' 
                  }}>
                    {conv.timestamp}
                  </div>
                </div>
                <div className="flex items-center ml-2 space-x-1">
                  {conv.isOneThought && (
                    <div 
                      className="px-2 py-1 rounded-full"
                      style={{ 
                        backgroundColor: 'var(--info-light)',
                        border: '1px solid var(--primary-blue)'
                      }}
                    >
                      <span style={{ 
                        color: 'var(--primary-blue)', 
                        fontSize: '10px', 
                        fontWeight: 600 
                      }}>
                        1 THOUGHT
                      </span>
                    </div>
                  )}
                  {conv.isStarred && (
                    <Star className="w-5 h-5" style={{ color: 'var(--warning-text)', fill: 'var(--warning-text)' }} />
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {viewMode === 'categories' && (
        <div className="px-5">
          {/* Categories Header */}
          <div className="mb-4">
            <h2 style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '16px', 
              fontWeight: 500, 
              marginBottom: '16px' 
            }}>
              Sort by Category
            </h2>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {categories.map((category) => {
              const categoryConversations = conversations.filter(c => c.type === category.type)
              return (
                <button
                  key={category.type}
                  onClick={() => handleStartConversation(category.type)}
                  className="p-4 rounded-lg transition-all duration-200 hover:scale-105"
                  style={{ 
                    backgroundColor: category.bgColor,
                    border: `1px solid ${category.color}20`
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div style={{ marginBottom: '8px' }}>
                      <img 
                        src={getConversationIcon(category.type)} 
                        alt={category.type}
                        style={{ width: '40px', height: '40px' }}
                      />
                    </div>
                    <span style={{ 
                      color: category.color, 
                      fontSize: '14px', 
                      fontWeight: 600,
                      marginBottom: '4px'
                    }}>
                      {category.label}
                    </span>
                    <span style={{ 
                      color: 'var(--text-secondary)', 
                      fontSize: '12px' 
                    }}>
                      {categoryConversations.length} conversation{categoryConversations.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Organization Section */}
          <div className="mb-4">
            <h3 style={{ 
              color: 'var(--text-primary)', 
              fontSize: '16px', 
              fontWeight: 600, 
              marginBottom: '12px' 
            }}>
              Organization
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg" style={{ backgroundColor: 'var(--card-background)' }}>
                <span style={{ color: 'var(--text-primary)', fontSize: '15px' }}>Recent</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg" style={{ backgroundColor: 'var(--card-background)' }}>
                <span style={{ color: 'var(--text-primary)', fontSize: '15px' }}>Starred</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg" style={{ backgroundColor: 'var(--card-background)' }}>
                <span style={{ color: 'var(--text-primary)', fontSize: '15px' }}>Archive</span>
              </button>
            </div>
          </div>

          {/* Help & Settings */}
          <div>
            <h3 style={{ 
              color: 'var(--text-primary)', 
              fontSize: '16px', 
              fontWeight: 600, 
              marginBottom: '12px' 
            }}>
              Help & Settings
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg" style={{ backgroundColor: 'var(--card-background)' }}>
                <span style={{ color: 'var(--text-primary)', fontSize: '15px' }}>Introduction</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg" style={{ backgroundColor: 'var(--card-background)' }}>
                <span style={{ color: 'var(--text-primary)', fontSize: '15px' }}>Tips for KaiHelp</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg" style={{ backgroundColor: 'var(--card-background)' }}>
                <span style={{ color: 'var(--text-primary)', fontSize: '15px' }}>Data Storage</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'thought-capture' && (
        <div className="px-5">
          {/* Thought Capture Header */}
          <div className="text-center mb-6">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#2847ef' }}
            >
              <Star className="w-8 h-8" style={{ color: 'white' }} />
            </div>
            <h2 style={{ 
              color: '#2847ef', 
              fontSize: '24px', 
              fontWeight: 600, 
              marginBottom: '8px' 
            }}>
              What thought or idea would you like to categorize under:
            </h2>
          </div>

          {/* Category Selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {categories.filter(c => c.type !== 'thought').map((category) => (
              <button
                key={category.type}
                className="p-3 rounded-lg transition-all duration-200 hover:scale-105"
                style={{ 
                  backgroundColor: category.bgColor,
                  border: `2px solid ${category.color}`
                }}
              >
                <span style={{ 
                  color: category.color, 
                  fontSize: '14px', 
                  fontWeight: 600
                }}>
                  {category.label}
                </span>
              </button>
            ))}
          </div>

          {/* Text Input */}
          <div className="mb-6">
            <textarea
              value={thoughtCapture}
              onChange={(e) => setThoughtCapture(e.target.value)}
              placeholder="Capture your thought or idea..."
              className="w-full p-4 rounded-lg resize-none"
              style={{
                backgroundColor: 'white',
                border: '2px solid #e2e2e2',
                fontSize: '16px',
                minHeight: '120px',
                color: '#4c4c4c'
              }}
              rows={4}
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveThought}
            className="w-full p-4 rounded-lg transition-all duration-200"
            style={{
              backgroundColor: '#2847ef',
              color: 'white',
              fontSize: '16px',
              fontWeight: 600
            }}
          >
            Save Thought
          </button>
        </div>
      )}

      {viewMode === 'chat' && getCurrentConversation() && (
        <div className="flex flex-col h-full">
          {/* Chat Messages */}
          <div className="flex-1 px-5 py-4 overflow-y-auto">
            <div className="space-y-4">
              {getCurrentConversation()?.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[280px] px-4 py-3 rounded-lg ${
                      msg.sender === 'user'
                        ? 'text-white'
                        : 'text-black'
                    }`}
                    style={{
                      backgroundColor: msg.sender === 'user' ? '#2847ef' : '#e8f4fd'
                    }}
                  >
                    <p style={{ 
                      fontSize: '15px', 
                      lineHeight: '1.4',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="px-5 py-4" style={{ backgroundColor: 'white' }}>
            <div className="flex items-center space-x-3">
              <button className="p-2">
                <Search className="w-5 h-5" style={{ color: '#a5a5a5' }} />
              </button>
              <div className="flex-1">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask..."
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                  style={{ fontSize: '16px', color: '#4c4c4c' }}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
              </div>
              <button 
                onClick={handleSendMessage}
                className="p-2"
              >
                <Send className="w-5 h-5" style={{ color: '#2847ef' }} />
              </button>
              <button className="p-2">
                <Mic className="w-5 h-5" style={{ color: '#a5a5a5' }} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Entry Section */}
      <div className="fixed bottom-20 left-0 right-0 px-5 py-3" style={{ backgroundColor: 'var(--button-secondary-bg)' }}>
        <div className="flex items-center space-x-3">
          {/* Upload Button */}
          <button className="p-2">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#a5a5a5" 
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
          </button>
          
          {/* Chat Input Field */}
          <div className="flex-1 flex items-center rounded-full" style={{ 
            backgroundColor: 'var(--input-background)', 
            padding: '8px 16px'
          }}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Aa"
              className="flex-1 bg-transparent outline-none"
              style={{ 
                fontSize: '16px', 
                color: 'var(--text-primary)',
                border: 'none'
              }}
            />
            
            {/* 1 Thought Button */}
            <button 
              onClick={() => setIsOneThoughtMode(!isOneThoughtMode)}
              className="ml-2 transition-all duration-200"
            >
              <img 
                src={isOneThoughtMode ? "/icons/1_thought_active.svg" : "/icons/1_thought_inactive.svg"}
                alt="1 thought" 
                style={{ width: '24px', height: '24px' }}
              />
            </button>
          </div>
          
          {/* Microphone Button */}
          <button className="p-2">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#a5a5a5" 
              strokeWidth="2"
            >
              <path d="M12 2a4 4 0 0 0-4 4v6a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </button>
        </div>

        {/* 1 Thought Category Pills */}
        {isOneThoughtMode && (
          <div className="mt-3 px-2">
            <div className="grid grid-cols-4 gap-2">
              {/* Tasks */}
              <button 
                onClick={() => saveThoughtWithCategory('tasks')}
                className="p-3 rounded-lg text-center transition-all duration-200"
                style={{ backgroundColor: 'var(--kaihelp-category-tasks)' }}
              >
                <img src="/icons/sidebar_popout_tasks.svg" alt="tasks" style={{ width: '20px', height: '20px', margin: '0 auto 4px' }} />
                <span style={{ color: 'white', fontSize: '12px', fontWeight: 500 }}>Tasks</span>
              </button>

              {/* Focus */}
              <button 
                onClick={() => saveThoughtWithCategory('focus')}
                className="p-3 rounded-lg text-center transition-all duration-200"
                style={{ backgroundColor: 'var(--kaihelp-category-focus)' }}
              >
                <img src="/icons/sidebar_popout_focus.svg" alt="focus" style={{ width: '20px', height: '20px', margin: '0 auto 4px' }} />
                <span style={{ color: 'white', fontSize: '12px', fontWeight: 500 }}>Focus</span>
              </button>

              {/* Habits */}
              <button 
                onClick={() => saveThoughtWithCategory('habits')}
                className="p-3 rounded-lg text-center transition-all duration-200"
                style={{ backgroundColor: 'var(--kaihelp-category-habits)' }}
              >
                <img src="/icons/sidebar_popout_habits.svg" alt="habits" style={{ width: '20px', height: '20px', margin: '0 auto 4px' }} />
                <span style={{ color: 'white', fontSize: '12px', fontWeight: 500 }}>Habits</span>
              </button>

              {/* Planning */}
              <button 
                onClick={() => saveThoughtWithCategory('planning')}
                className="p-3 rounded-lg text-center transition-all duration-200"
                style={{ backgroundColor: 'var(--kaihelp-category-planning)' }}
              >
                <img src="/icons/sidebar_popout_planning.svg" alt="planning" style={{ width: '20px', height: '20px', margin: '0 auto 4px' }} />
                <span style={{ color: 'white', fontSize: '12px', fontWeight: 500 }}>Planning</span>
              </button>

              {/* Ideas */}
              <button 
                onClick={() => saveThoughtWithCategory('ideas')}
                className="p-3 rounded-lg text-center transition-all duration-200"
                style={{ backgroundColor: 'var(--kaihelp-category-ideas)' }}
              >
                <img src="/icons/sidebar_popout_ideas.svg" alt="ideas" style={{ width: '20px', height: '20px', margin: '0 auto 4px' }} />
                <span style={{ color: 'white', fontSize: '12px', fontWeight: 500 }}>Ideas</span>
              </button>

              {/* Analytics */}
              <button 
                onClick={() => saveThoughtWithCategory('analytics')}
                className="p-3 rounded-lg text-center transition-all duration-200"
                style={{ backgroundColor: 'var(--kaihelp-category-analytics)' }}
              >
                <img src="/icons/sidebar_popout_analytics.svg" alt="analytics" style={{ width: '20px', height: '20px', margin: '0 auto 4px' }} />
                <span style={{ color: 'white', fontSize: '12px', fontWeight: 500 }}>Analytics</span>
              </button>

              {/* KaiHelp (replacing 1 Thought) */}
              <button 
                onClick={() => saveThoughtWithCategory('kaihelp')}
                className="p-3 rounded-lg text-center transition-all duration-200"
                style={{ backgroundColor: 'var(--kaihelp-category-kaihelp)' }}
              >
                <img src="/icons/kai_white.svg" alt="kaihelp" style={{ width: '20px', height: '20px', margin: '0 auto 4px' }} />
                <span style={{ color: 'white', fontSize: '12px', fontWeight: 500 }}>KaiHelp</span>
              </button>

              {/* User Defined */}
              <button 
                onClick={() => saveThoughtWithCategory('user_defined')}
                className="p-3 rounded-lg text-center transition-all duration-200 flex flex-col items-center justify-center"
                style={{ backgroundColor: 'var(--kaihelp-category-custom)' }}
              >
                <span style={{ color: 'white', fontSize: '12px', fontWeight: 500 }}>User Defined</span>
              </button>
            </div>
          </div>
        )}
      </div>


      {/* Bottom spacing for navigation */}
      <div className="h-20"></div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed top-0 left-0 h-full w-80 z-50 shadow-lg overflow-y-auto" style={{ backgroundColor: 'var(--background)' }}>
            <div className="p-5" style={{ paddingBottom: '100px' }}>
              {/* Sidebar Close Button */}
              <div className="mb-3">
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center justify-center w-10 h-10"
                >
                  <img 
                    src="/icons/sidebar_popout_close.svg"
                    alt="close sidebar"
                    style={{ width: '24px', height: '24px' }}
                  />
                </button>
              </div>

              {/* Sort by Category Title */}
              <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ 
                  color: 'var(--text-secondary)', 
                  fontSize: '16px', 
                  fontWeight: 500,
                  marginLeft: '12px',
                  margin: 0
                }}>
                  Sort by Category
                </h3>
                {selectedCategory && (
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    style={{
                      backgroundColor: 'transparent',
                      color: 'var(--primary-blue)',
                      fontSize: '14px',
                      fontWeight: 500,
                      border: 'none',
                      cursor: 'pointer',
                      marginRight: '12px'
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Buttons - Vertical Stack */}
              <div className="space-y-3" style={{ marginLeft: '12px' }}>
                {/* Tasks - Household/Errands Dark */}
                <button 
                  onClick={() => setSelectedCategory('tasks')}
                  className="w-full flex items-center p-4 rounded-lg" 
                  style={{ 
                    backgroundColor: 'var(--kaihelp-category-tasks)',
                    border: selectedCategory === 'tasks' ? '2px solid var(--primary-blue)' : '2px solid transparent'
                  }}
                >
                  <img src="/icons/sidebar_popout_tasks.svg" alt="tasks" style={{ width: '24px', height: '24px', marginRight: '12px' }} />
                  <span style={{ color: 'white', fontSize: '16px', fontWeight: 500 }}>Tasks</span>
                </button>

                {/* Focus - Social/Relationships Dark */}
                <button 
                  onClick={() => setSelectedCategory('focus')}
                  className="w-full flex items-center p-4 rounded-lg" 
                  style={{ 
                    backgroundColor: 'var(--kaihelp-category-focus)',
                    border: selectedCategory === 'focus' ? '2px solid var(--primary-blue)' : '2px solid transparent'
                  }}
                >
                  <img src="/icons/sidebar_popout_focus.svg" alt="focus" style={{ width: '24px', height: '24px', marginRight: '12px' }} />
                  <span style={{ color: 'white', fontSize: '16px', fontWeight: 500 }}>Focus</span>
                </button>

                {/* Habits - Learning/Creative Dark */}
                <button 
                  onClick={() => setSelectedCategory('habits')}
                  className="w-full flex items-center p-4 rounded-lg" 
                  style={{ 
                    backgroundColor: 'var(--kaihelp-category-habits)',
                    border: selectedCategory === 'habits' ? '2px solid var(--primary-blue)' : '2px solid transparent'
                  }}
                >
                  <img src="/icons/sidebar_popout_habits.svg" alt="habits" style={{ width: '24px', height: '24px', marginRight: '12px' }} />
                  <span style={{ color: 'white', fontSize: '16px', fontWeight: 500 }}>Habits</span>
                </button>

                {/* Planning - Personal Care/Health Dark */}
                <button 
                  onClick={() => setSelectedCategory('planning')}
                  className="w-full flex items-center p-4 rounded-lg" 
                  style={{ 
                    backgroundColor: 'var(--kaihelp-category-planning)',
                    border: selectedCategory === 'planning' ? '2px solid var(--primary-blue)' : '2px solid transparent'
                  }}
                >
                  <img src="/icons/sidebar_popout_planning.svg" alt="planning" style={{ width: '24px', height: '24px', marginRight: '12px' }} />
                  <span style={{ color: 'white', fontSize: '16px', fontWeight: 500 }}>Planning</span>
                </button>

                {/* Ideas - Learning/Creative Dark */}
                <button 
                  onClick={() => setSelectedCategory('ideas')}
                  className="w-full flex items-center p-4 rounded-lg" 
                  style={{ 
                    backgroundColor: 'var(--kaihelp-category-ideas)',
                    border: selectedCategory === 'ideas' ? '2px solid var(--primary-blue)' : '2px solid transparent'
                  }}
                >
                  <img src="/icons/sidebar_popout_ideas.svg" alt="ideas" style={{ width: '24px', height: '24px', marginRight: '12px' }} />
                  <span style={{ color: 'white', fontSize: '16px', fontWeight: 500 }}>Ideas</span>
                </button>

                {/* Analytics - Finance/Admin Dark */}
                <button 
                  onClick={() => setSelectedCategory('analytics')}
                  className="w-full flex items-center p-4 rounded-lg" 
                  style={{ 
                    backgroundColor: 'var(--kaihelp-category-analytics)',
                    border: selectedCategory === 'analytics' ? '2px solid var(--primary-blue)' : '2px solid transparent'
                  }}
                >
                  <img src="/icons/sidebar_popout_analytics.svg" alt="analytics" style={{ width: '24px', height: '24px', marginRight: '12px' }} />
                  <span style={{ color: 'white', fontSize: '16px', fontWeight: 500 }}>Analytics</span>
                </button>

                {/* 1 Thought - Primary Blue */}
                <button 
                  onClick={() => setSelectedCategory('thought')}
                  className="w-full flex items-center p-4 rounded-lg" 
                  style={{ 
                    backgroundColor: 'var(--kaihelp-category-kaihelp)',
                    border: selectedCategory === 'thought' ? '2px solid var(--info-text)' : '2px solid transparent'
                  }}
                >
                  <img src="/icons/sidebar_popout_1_thought.svg" alt="1 thought" style={{ width: '24px', height: '24px', marginRight: '12px' }} />
                  <span style={{ color: 'white', fontSize: '16px', fontWeight: 500 }}>1 Thought</span>
                </button>
              </div>

              {/* Organization Section */}
              <div style={{ marginTop: '12px', marginLeft: '20px' }}>
                <h4 style={{ 
                  color: 'var(--text-secondary)', 
                  fontSize: '16px', 
                  fontWeight: 500,
                  marginBottom: '12px'
                }}>
                  Organization
                </h4>
                
                <div style={{ marginLeft: '8px' }}>
                  <div style={{ 
                    color: 'var(--text-secondary)', 
                    fontSize: '14px', 
                    fontWeight: 500,
                    marginBottom: '4px'
                  }}>
                    Sort by:
                  </div>
                  <div style={{ 
                    fontSize: '14px', 
                    fontWeight: 500,
                    lineHeight: '1.5'
                  }}>
                    {['Recent', 'Media/Images', 'Links', 'Notes', 'Files', 'Archives', 'Clear History'].map((item) => (
                      <div 
                        key={item}
                        onClick={() => setSelectedOrganization(item)}
                        style={{ 
                          color: selectedOrganization === item ? 'var(--primary-blue)' : 'var(--text-secondary)',
                          cursor: 'pointer'
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Help & Settings Section */}
              <div style={{ marginTop: '12px', marginLeft: '20px' }}>
                <h4 style={{ 
                  color: 'var(--text-secondary)', 
                  fontSize: '16px', 
                  fontWeight: 500,
                  marginBottom: '12px'
                }}>
                  Help & Settings
                </h4>
                
                <div style={{ marginLeft: '8px' }}>
                  <div style={{ 
                    color: 'var(--text-secondary)', 
                    fontSize: '14px', 
                    fontWeight: 500,
                    lineHeight: '1.5'
                  }}>
                    <div>Instructions</div>
                    <div>Tips for KaiHelp</div>
                    <div>Settings</div>
                    <div>Other Feedback</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}