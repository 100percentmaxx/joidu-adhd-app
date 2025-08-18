'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Plus, Send, Mic, Star, Search, ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

type ConversationType = 'tasks' | 'focus' | 'habits' | 'planning' | 'ideas' | 'analytics' | 'thought' | 'kaihelp' | 'custom'
type ViewMode = 'recent' | 'categories' | 'chat' | 'thought-capture'

interface Message {
  id: string
  sender: 'user' | 'kai'
  text: string
  timestamp: string
  type?: 'text' | 'thought'
  selectedCategory?: ConversationType
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

export default function KaiHelpPage() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<ViewMode>('chat')
  const [activeConversation, setActiveConversation] = useState<string | null>('1')
  const [message, setMessage] = useState('')
  const [thoughtCapture, setThoughtCapture] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedOrganization, setSelectedOrganization] = useState('Recent')
  const [selectedCategory, setSelectedCategory] = useState<ConversationType | null>(null)
  const [isOneThoughtMode, setIsOneThoughtMode] = useState(false)
  const [selectedThoughtCategory, setSelectedThoughtCategory] = useState<ConversationType | null>(null)
  const [pendingCategoryMessageId, setPendingCategoryMessageId] = useState<string | null>(null)
  
  // Ref for auto-scrolling messages
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample conversations data
  const [conversations, setConversations] = useState<Conversation[]>([
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

  // Category data using CSS variables
  const categories = [
    { type: 'tasks' as ConversationType, label: 'Tasks', color: 'var(--primary-blue)', bgColor: 'var(--category-personal-light)', borderColor: 'var(--category-personal-dark)' },
    { type: 'focus' as ConversationType, label: 'Focus', color: 'var(--category-social-dark)', bgColor: 'var(--category-social-light)', borderColor: 'var(--category-social-dark)' },
    { type: 'habits' as ConversationType, label: 'Habits', color: 'var(--primary-orange)', bgColor: 'var(--category-work-dark)', borderColor: 'var(--category-work-dark)' },
    { type: 'planning' as ConversationType, label: 'Planning', color: 'var(--category-health-dark)', bgColor: 'var(--category-health-light)', borderColor: 'var(--category-health-dark)' },
    { type: 'ideas' as ConversationType, label: 'Ideas', color: 'var(--category-creative-dark)', bgColor: 'var(--category-creative-light)', borderColor: 'var(--category-creative-dark)' },
    { type: 'analytics' as ConversationType, label: 'Analytics', color: 'var(--category-finance-dark)', bgColor: 'var(--category-finance-light)', borderColor: 'var(--category-finance-dark)' },
    { type: 'thought' as ConversationType, label: '1 Thought', color: 'var(--primary-blue)', bgColor: 'var(--category-work-light)', borderColor: 'var(--category-work-dark)' }
  ]

  const handleSendMessage = () => {
    if (message.trim() && activeConversation) {
      const userMessage = message.trim()
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      
      // If in 1 Thought mode with selected category, save as categorized thought
      if (isOneThoughtMode && selectedThoughtCategory) {
        // Add the user thought message
        setConversations(prevConversations => 
          prevConversations.map(conv => 
            conv.id === activeConversation
              ? {
                  ...conv,
                  messages: [
                    ...conv.messages,
                    {
                      id: Date.now().toString(),
                      sender: 'user' as const,
                      text: userMessage,
                      timestamp: currentTime,
                      type: 'thought',
                      selectedCategory: selectedThoughtCategory
                    }
                  ]
                }
              : conv
          )
        )
        
        // Store category name before resetting
        const categoryName = selectedThoughtCategory.charAt(0).toUpperCase() + selectedThoughtCategory.slice(1)
        
        // Reset 1 Thought mode and selected category
        setIsOneThoughtMode(false)
        setSelectedThoughtCategory(null)
        setPendingCategoryMessageId(null)
        setMessage('')
        
        // Add Kai's confirmation response
        setTimeout(() => {
          setConversations(prevConversations => 
            prevConversations.map(conv => 
              conv.id === activeConversation
                ? {
                    ...conv,
                    messages: [
                      ...conv.messages,
                      {
                        id: (Date.now() + 1).toString(),
                        sender: 'kai' as const,
                        text: `Great! I've saved your thought under ${categoryName}. What else would you like to work on?`,
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      }
                    ]
                  }
                : conv
            )
          )
          // Scroll to show Kai's response
          setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
          }, 100)
        }, 500)
        
      } else {
        // Regular message handling
        // Add the user message to the active conversation
        setConversations(prevConversations => 
          prevConversations.map(conv => 
            conv.id === activeConversation
              ? {
                  ...conv,
                  messages: [
                    ...conv.messages,
                    {
                      id: Date.now().toString(),
                      sender: 'user' as const,
                      text: userMessage,
                      timestamp: currentTime
                    }
                  ]
                }
              : conv
          )
        )
        setMessage('')
        
        // Add a simple AI response after a short delay
        setTimeout(() => {
          setConversations(prevConversations => 
            prevConversations.map(conv => 
              conv.id === activeConversation
                ? {
                    ...conv,
                    messages: [
                      ...conv.messages,
                      {
                        id: (Date.now() + 1).toString(),
                        sender: 'kai' as const,
                        text: "Thanks for your message! I'm here to help with your ADHD productivity needs. What would you like to work on?",
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      }
                    ]
                  }
                : conv
            )
          )
          // Scroll to show Kai's response
          setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
          }, 100)
        }, 1000)
      }
      
      // Scroll to bottom after adding message
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
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
    const iconMap: Record<ConversationType, string> = {
      tasks: '/icons/chat_tasks.svg',
      focus: '/icons/chat_focus.svg',
      habits: '/icons/chat_habits.svg',
      planning: '/icons/chat_planning.svg',
      ideas: '/icons/chat_ideas.svg',
      analytics: '/icons/chat_analytics.svg',
      thought: '/icons/chat_1_thought_white.svg',
      kaihelp: '/icons/chat_kaihelp.svg',
      custom: '/icons/chat_custom.svg'
    }
    return iconMap[type] || '/icons/chat_default.svg'
  }

  const getCurrentConversation = () => {
    return conversations.find(c => c.id === activeConversation)
  }

  // Handle category selection for 1 Thought
  const handleThoughtCategorySelect = (category: ConversationType) => {
    setSelectedThoughtCategory(category)
    
    // Add Kai's response message with category selection
    if (activeConversation) {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      const messageId = Date.now().toString()
      
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === activeConversation
            ? {
                ...conv,
                messages: [
                  // Remove previous pending category message if exists
                  ...conv.messages.filter(msg => msg.id !== pendingCategoryMessageId),
                  {
                    id: messageId,
                    sender: 'kai' as const,
                    text: `What thought or idea would you like to categorize under:`,
                    timestamp: currentTime,
                    selectedCategory: category
                  }
                ]
              }
            : conv
        )
      )
      
      // Set this as the pending message that can be deleted if category changes
      setPendingCategoryMessageId(messageId)
      
      // Scroll to show Kai's response
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  // Save thought with category
  const saveThoughtWithCategory = (category: string) => {
    console.log('Saving thought:', message, 'in category:', category)
    // Here we would save to conversations with isOneThought: true
    setIsOneThoughtMode(false)
    setSelectedThoughtCategory(null)
    setMessage('')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <button 
          onClick={() => router.push('/')}
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
      {viewMode === 'chat' && (
        <div className="px-5" style={{ marginTop: '20px' }}>
          <button 
            onClick={() => {
              if (!sidebarOpen) {
                // First set sidebar open, then navigate
                setSidebarOpen(true)
                // Navigate to sorted page with sidebar already open
                setTimeout(() => {
                  router.push('/kaihelp/sorted?sidebar=open')
                }, 50)
              } else {
                setSidebarOpen(false)
              }
            }}
            className="flex items-center justify-center w-10 h-10"
          >
            <img 
              src={sidebarOpen ? "/icons/sidebar_popout_close.svg" : "/icons/sidebar_popout_open.svg"}
              alt="sidebar toggle"
              style={{ width: '24px', height: '24px' }}
            />
          </button>
        </div>
      )}


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
              style={{ backgroundColor: 'var(--primary-blue)' }}
            >
              <Star className="w-8 h-8" style={{ color: 'white' }} />
            </div>
            <h2 style={{ 
              color: 'var(--primary-blue)', 
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
              backgroundColor: 'var(--primary-blue)',
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
          <div 
            className="flex-1 px-5 py-4 overflow-y-auto"
            style={{ 
              paddingBottom: isOneThoughtMode ? '200px' : '4px',
              transition: 'padding-bottom 0.3s ease'
            }}
          >
            <div className="space-y-4">
              {getCurrentConversation()?.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className="max-w-[280px] px-4 py-3"
                      style={{
                        backgroundColor: 'var(--card-background)',
                        border: msg.sender === 'user' ? '2px solid var(--checkbox-checked)' : '2px solid var(--primary-blue)',
                        borderRadius: '16px',
                        color: 'var(--text-primary)'
                      }}
                    >
                      <p style={{ 
                        fontSize: '15px', 
                        lineHeight: '1.4',
                        whiteSpace: 'pre-wrap'
                      }}>
                        {msg.text}
                      </p>
                      
                      {/* Show category pill if message has selectedCategory */}
                      {msg.selectedCategory && (
                        <div className="flex justify-center" style={{ marginTop: '12px' }}>
                          <div
                            className="flex items-center justify-center px-2 py-2"
                            style={{
                              backgroundColor: 
                                msg.selectedCategory === 'tasks' ? '#98e1ea' :
                                msg.selectedCategory === 'focus' ? '#c8bfef' :
                                msg.selectedCategory === 'habits' ? '#f9c075' :
                                msg.selectedCategory === 'planning' ? '#a8e2bb' :
                                msg.selectedCategory === 'ideas' ? '#f4b7ae' :
                                msg.selectedCategory === 'analytics' ? '#f7e98e' :
                                msg.selectedCategory === 'kaihelp' ? '#2847ef' :
                                msg.selectedCategory === 'custom' ? '#ddede3' :
                                '#2847ef',
                              borderRadius: '12px',
                              width: '105px', // Increased width by 20px (was 85px)
                              height: '36px' // Fixed height to match popup pills
                            }}
                          >
                            {(msg.selectedCategory !== 'custom') && (
                              <img 
                                src={msg.selectedCategory === 'kaihelp' ? '/icons/kai_white.svg' : getConversationIcon(msg.selectedCategory)} 
                                alt={msg.selectedCategory} 
                                style={{ width: '16px', height: '16px', marginRight: '4px' }} 
                              />
                            )}
                            <span style={{ 
                              color: 'white', 
                              fontSize: '13px', 
                              fontWeight: 500 
                            }}>
                              {msg.selectedCategory === 'kaihelp' ? 'KaiHelp' :
                               msg.selectedCategory === 'custom' ? 'Custom' :
                               msg.selectedCategory.charAt(0).toUpperCase() + msg.selectedCategory.slice(1)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <span style={{
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      marginTop: '4px',
                      marginLeft: msg.sender === 'user' ? '0' : '8px',
                      marginRight: msg.sender === 'user' ? '8px' : '0'
                    }}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              {/* Invisible div to scroll to */}
              <div ref={messagesEndRef} />
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
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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
              {/* KaiHelp */}
              <button 
                onClick={() => handleThoughtCategorySelect('kaihelp')}
                className="flex items-center justify-center px-2 py-2 transition-all duration-200 w-full"
                style={{ 
                  backgroundColor: '#2847ef', 
                  borderRadius: '12px',
                  border: selectedThoughtCategory === 'kaihelp' ? '2px solid #cae9ef' : '2px solid transparent'
                }}
              >
                <img src="/icons/kai_white.svg" alt="kaihelp" style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                <span style={{ color: 'white', fontSize: '13px', fontWeight: 500 }}>KaiHelp</span>
              </button>

              {/* Tasks */}
              <button 
                onClick={() => handleThoughtCategorySelect('tasks')}
                className="flex items-center justify-center px-2 py-2 transition-all duration-200 w-full"
                style={{ 
                  backgroundColor: '#98e1ea', 
                  borderRadius: '12px',
                  border: selectedThoughtCategory === 'tasks' ? '2px solid #2847ef' : '2px solid transparent'
                }}
              >
                <img src="/icons/sidebar_popout_tasks.svg" alt="tasks" style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                <span style={{ color: 'white', fontSize: '13px', fontWeight: 500 }}>Tasks</span>
              </button>

              {/* Focus */}
              <button 
                onClick={() => handleThoughtCategorySelect('focus')}
                className="flex items-center justify-center px-2 py-2 transition-all duration-200 w-full"
                style={{ 
                  backgroundColor: '#c8bfef', 
                  borderRadius: '12px',
                  border: selectedThoughtCategory === 'focus' ? '2px solid #2847ef' : '2px solid transparent'
                }}
              >
                <img src="/icons/sidebar_popout_focus.svg" alt="focus" style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                <span style={{ color: 'white', fontSize: '13px', fontWeight: 500 }}>Focus</span>
              </button>

              {/* Habits */}
              <button 
                onClick={() => handleThoughtCategorySelect('habits')}
                className="flex items-center justify-center px-2 py-2 transition-all duration-200 w-full"
                style={{ 
                  backgroundColor: '#f9c075', 
                  borderRadius: '12px',
                  border: selectedThoughtCategory === 'habits' ? '2px solid #2847ef' : '2px solid transparent'
                }}
              >
                <img src="/icons/sidebar_popout_habits.svg" alt="habits" style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                <span style={{ color: 'white', fontSize: '13px', fontWeight: 500 }}>Habits</span>
              </button>

              {/* Planning */}
              <button 
                onClick={() => handleThoughtCategorySelect('planning')}
                className="flex items-center justify-center px-2 py-2 transition-all duration-200 w-full"
                style={{ 
                  backgroundColor: '#a8e2bb', 
                  borderRadius: '12px',
                  border: selectedThoughtCategory === 'planning' ? '2px solid #2847ef' : '2px solid transparent'
                }}
              >
                <img src="/icons/sidebar_popout_planning.svg" alt="planning" style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                <span style={{ color: 'white', fontSize: '13px', fontWeight: 500 }}>Planning</span>
              </button>

              {/* Ideas */}
              <button 
                onClick={() => handleThoughtCategorySelect('ideas')}
                className="flex items-center justify-center px-2 py-2 transition-all duration-200 w-full"
                style={{ 
                  backgroundColor: '#f4b7ae', 
                  borderRadius: '12px',
                  border: selectedThoughtCategory === 'ideas' ? '2px solid #2847ef' : '2px solid transparent'
                }}
              >
                <img src="/icons/sidebar_popout_ideas.svg" alt="ideas" style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                <span style={{ color: 'white', fontSize: '13px', fontWeight: 500 }}>Ideas</span>
              </button>

              {/* Analytics */}
              <button 
                onClick={() => handleThoughtCategorySelect('analytics')}
                className="flex items-center justify-center px-2 py-2 transition-all duration-200 w-full"
                style={{ 
                  backgroundColor: '#f7e98e', 
                  borderRadius: '12px',
                  border: selectedThoughtCategory === 'analytics' ? '2px solid #2847ef' : '2px solid transparent'
                }}
              >
                <img src="/icons/sidebar_popout_analytics.svg" alt="analytics" style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                <span style={{ color: 'white', fontSize: '13px', fontWeight: 500 }}>Analytics</span>
              </button>

              {/* Custom */}
              <button 
                onClick={() => handleThoughtCategorySelect('custom')}
                className="flex items-center justify-center px-2 py-2 transition-all duration-200 w-full"
                style={{ 
                  backgroundColor: '#ddede3', 
                  borderRadius: '12px',
                  border: selectedThoughtCategory === 'custom' ? '2px solid #2847ef' : '2px solid transparent'
                }}
              >
                <span style={{ color: 'white', fontSize: '13px', fontWeight: 500 }}>Custom</span>
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
            <div className="p-5">
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
              <div style={{ marginBottom: '12px' }}>
                <h3 style={{ 
                  color: 'var(--text-secondary)', 
                  fontSize: '16px', 
                  fontWeight: 500,
                  marginLeft: '12px'
                }}>
                  Sort by Category
                </h3>
              </div>

              {/* Category Buttons - Vertical Stack */}
              <div className="space-y-3" style={{ marginLeft: '12px' }}>
                {/* Tasks - Household/Errands Dark */}
                <button 
                  onClick={() => {
                    setSelectedCategory('tasks')
                    // Update the sorted page with the new selection
                    const params = new URLSearchParams()
                    params.set('category', 'tasks')
                    if (selectedOrganization && selectedOrganization !== 'Recent') {
                      params.set('sort', selectedOrganization)
                    }
                    router.push(`/kaihelp/sorted?${params.toString()}`)
                  }}
                  className="w-full flex items-center p-4 rounded-lg" 
                  style={{ 
                    backgroundColor: '#98e1ea',
                    border: selectedCategory === 'tasks' ? '2px solid #2847ef' : '2px solid transparent'
                  }}
                >
                  <img src="/icons/sidebar_popout_tasks.svg" alt="tasks" style={{ width: '24px', height: '24px', marginRight: '12px' }} />
                  <span style={{ color: 'white', fontSize: '16px', fontWeight: 500 }}>Tasks</span>
                </button>

                {/* Focus - Social/Relationships Dark */}
                <button 
                  onClick={() => {
                    setSelectedCategory('focus')
                    const params = new URLSearchParams()
                    params.set('category', 'focus')
                    if (selectedOrganization && selectedOrganization !== 'Recent') {
                      params.set('sort', selectedOrganization)
                    }
                    router.push(`/kaihelp/sorted?${params.toString()}`)
                  }}
                  className="w-full flex items-center p-4 rounded-lg" 
                  style={{ 
                    backgroundColor: '#c8bfef',
                    border: selectedCategory === 'focus' ? '2px solid #2847ef' : '2px solid transparent'
                  }}
                >
                  <img src="/icons/sidebar_popout_focus.svg" alt="focus" style={{ width: '24px', height: '24px', marginRight: '12px' }} />
                  <span style={{ color: 'white', fontSize: '16px', fontWeight: 500 }}>Focus</span>
                </button>

                {/* Habits - Learning/Creative Dark */}
                <button 
                  key="habits-sidebar-button"
                  onClick={() => {
                    setSelectedCategory('habits')
                    const params = new URLSearchParams()
                    params.set('category', 'habits')
                    if (selectedOrganization && selectedOrganization !== 'Recent') {
                      params.set('sort', selectedOrganization)
                    }
                    router.push(`/kaihelp/sorted?${params.toString()}`)
                  }}
                  className="w-full flex items-center p-4 rounded-lg" 
                  style={{ 
                    backgroundColor: '#f9c075',
                    border: selectedCategory === 'habits' ? '2px solid #2847ef' : '2px solid transparent',
                    transition: 'none' // Disable any transitions that might cause flashing
                  }}
                >
                  <img src="/icons/sidebar_popout_habits.svg" alt="habits" style={{ width: '24px', height: '24px', marginRight: '12px' }} />
                  <span style={{ color: 'white', fontSize: '16px', fontWeight: 500 }}>Habits</span>
                </button>

                {/* Planning - Personal Care/Health Dark */}
                <button 
                  onClick={() => {
                    setSelectedCategory('planning')
                    const params = new URLSearchParams()
                    params.set('category', 'planning')
                    if (selectedOrganization && selectedOrganization !== 'Recent') {
                      params.set('sort', selectedOrganization)
                    }
                    router.push(`/kaihelp/sorted?${params.toString()}`)
                  }}
                  className="w-full flex items-center p-4 rounded-lg" 
                  style={{ 
                    backgroundColor: '#a8e2bb',
                    border: selectedCategory === 'planning' ? '2px solid #2847ef' : '2px solid transparent'
                  }}
                >
                  <img src="/icons/sidebar_popout_planning.svg" alt="planning" style={{ width: '24px', height: '24px', marginRight: '12px' }} />
                  <span style={{ color: 'white', fontSize: '16px', fontWeight: 500 }}>Planning</span>
                </button>

                {/* Ideas - Learning/Creative Dark */}
                <button 
                  onClick={() => {
                    setSelectedCategory('ideas')
                    const params = new URLSearchParams()
                    params.set('category', 'ideas')
                    if (selectedOrganization && selectedOrganization !== 'Recent') {
                      params.set('sort', selectedOrganization)
                    }
                    router.push(`/kaihelp/sorted?${params.toString()}`)
                  }}
                  className="w-full flex items-center p-4 rounded-lg" 
                  style={{ 
                    backgroundColor: '#f4b7ae',
                    border: selectedCategory === 'ideas' ? '2px solid #2847ef' : '2px solid transparent'
                  }}
                >
                  <img src="/icons/sidebar_popout_ideas.svg" alt="ideas" style={{ width: '24px', height: '24px', marginRight: '12px' }} />
                  <span style={{ color: 'white', fontSize: '16px', fontWeight: 500 }}>Ideas</span>
                </button>

                {/* Analytics - Finance/Admin Dark */}
                <button 
                  onClick={() => {
                    setSelectedCategory('analytics')
                    const params = new URLSearchParams()
                    params.set('category', 'analytics')
                    if (selectedOrganization && selectedOrganization !== 'Recent') {
                      params.set('sort', selectedOrganization)
                    }
                    router.push(`/kaihelp/sorted?${params.toString()}`)
                  }}
                  className="w-full flex items-center p-4 rounded-lg" 
                  style={{ 
                    backgroundColor: '#f7e98e',
                    border: selectedCategory === 'analytics' ? '2px solid #2847ef' : '2px solid transparent'
                  }}
                >
                  <img src="/icons/sidebar_popout_analytics.svg" alt="analytics" style={{ width: '24px', height: '24px', marginRight: '12px' }} />
                  <span style={{ color: 'white', fontSize: '16px', fontWeight: 500 }}>Analytics</span>
                </button>

                {/* 1 Thought - Primary Blue */}
                <button 
                  onClick={() => {
                    setSelectedCategory('thought')
                    const params = new URLSearchParams()
                    params.set('category', 'thought')
                    if (selectedOrganization && selectedOrganization !== 'Recent') {
                      params.set('sort', selectedOrganization)
                    }
                    router.push(`/kaihelp/sorted?${params.toString()}`)
                  }}
                  className="w-full flex items-center p-4 rounded-lg" 
                  style={{ 
                    backgroundColor: '#2847ef',
                    border: selectedCategory === 'thought' ? '2px solid #2847ef' : '2px solid transparent'
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
                    color: '#a5a5a5', 
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