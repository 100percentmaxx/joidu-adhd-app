'use client'

import React from 'react'
import NotificationSystem from '@/components/notifications/NotificationSystem'

/**
 * NOTIFICATION DEMO PAGE
 * 
 * This page demonstrates the GentleReminderModal component and NotificationSystem
 * in action. It shows how different types of notifications can be triggered
 * and customized for various use cases throughout the Joidu app.
 * 
 * ROUTE: /notifications-demo
 * 
 * This page is for development/testing purposes and shows:
 * - Different notification types (meditation, tasks, breaks, achievements)
 * - Proper integration patterns
 * - ADHD-friendly messaging examples
 * - Accessibility and responsive behavior
 * 
 * In development mode, you'll see demo controls that allow you to trigger
 * different notification types to test their appearance and behavior.
 */
export default function NotificationDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Gentle Reminder Notifications Demo
        </h1>
        
        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            About This Notification System
          </h2>
          
          <div className="space-y-4 text-gray-600">
            <p>
              The Gentle Reminder Modal system is designed specifically for ADHD-friendly UX.
              It provides supportive, non-intrusive notifications that help users without overwhelming them.
            </p>
            
            <h3 className="font-semibold text-gray-700 mt-6">Key Features:</h3>
            <ul className="list-disc ml-6 space-y-2">
              <li>Soft, welcoming visual design with gentle animations</li>
              <li>Supportive messaging that offers choice rather than demands</li>
              <li>Accessibility features including focus trapping and keyboard navigation</li>
              <li>Responsive design that works on all screen sizes</li>
              <li>Customizable for different types of reminders and notifications</li>
            </ul>
            
            <h3 className="font-semibold text-gray-700 mt-6">Notification Types:</h3>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Meditation Reminders:</strong> Gentle prompts for mindful breaks</li>
              <li><strong>Task Progress:</strong> Encouraging updates on accomplishments</li>
              <li><strong>Break Suggestions:</strong> Health-focused rest reminders</li>
              <li><strong>Achievement Celebrations:</strong> Positive reinforcement for success</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            ADHD-Friendly Design Principles
          </h2>
          
          <div className="space-y-3 text-gray-600">
            <div className="flex items-start space-x-3">
              <span className="text-green-500 font-semibold">✓</span>
              <span><strong>Non-intrusive:</strong> Smooth animations that don't startle</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-500 font-semibold">✓</span>
              <span><strong>Respectful:</strong> Easy dismissal and "remind later" options</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-500 font-semibold">✓</span>
              <span><strong>Supportive:</strong> Positive, encouraging language</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-500 font-semibold">✓</span>
              <span><strong>Clear:</strong> Simple layout with obvious actions</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-500 font-semibold">✓</span>
              <span><strong>Flexible:</strong> Customizable for different contexts</span>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <h3 className="font-semibold text-blue-800 mb-2">
            🧪 Development Mode Active
          </h3>
          <p className="text-blue-700">
            In development mode, you'll see demo controls in the top-left corner 
            that allow you to trigger different notification types. Try them out 
            to see how each notification looks and behaves!
          </p>
        </div>
        
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h3 className="font-semibold text-gray-700 mb-3">
            Integration Example
          </h3>
          <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
{`import NotificationSystem from '@/components/notifications/NotificationSystem'

export default function MyPage() {
  return (
    <div>
      {/* Your page content */}
      <h1>Welcome to Joidu!</h1>
      
      {/* Notification system for this page */}
      <NotificationSystem 
        enableAutoReminders={true}
        userName="Sarah"
        currentRoute="/my-page"
      />
    </div>
  )
}`}
          </pre>
        </div>
      </div>
      
      {/* Include the notification system for this demo page */}
      <NotificationSystem 
        enableAutoReminders={true}
        userName="Demo User"
        currentRoute="/notifications-demo"
      />
    </div>
  )
}