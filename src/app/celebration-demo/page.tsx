'use client'

import React from 'react'
import CelebrationSystem from '@/components/notifications/CelebrationSystem'

/**
 * CELEBRATION DEMO PAGE
 * 
 * This page demonstrates the CelebrationModal component and achievement system
 * designed specifically for ADHD users who need extra recognition and positive
 * reinforcement for their accomplishments.
 * 
 * ROUTE: /celebration-demo
 * 
 * Features demonstrated:
 * - Different achievement types (tasks, streaks, focus, milestones)
 * - Bounce animations and confetti effects
 * - Auto-dismiss functionality
 * - ADHD-friendly messaging and choices
 * - Momentum-building vs. celebration-savoring options
 * 
 * This page is for development/testing and shows how the celebration system
 * provides immediate positive reinforcement while respecting user autonomy.
 */
export default function CelebrationDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎉 Celebration Modal Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ADHD-friendly achievement celebrations that provide immediate positive reinforcement
            while offering meaningful choices for building momentum.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Design Philosophy */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-3">🧠</span>
              ADHD-Friendly Design
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-700">Immediate Recognition</h3>
                  <p className="text-gray-600 text-sm">Celebrates achievements the moment they happen for instant dopamine boost</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-700">Choice & Autonomy</h3>
                  <p className="text-gray-600 text-sm">Offers options to savor the moment or build momentum</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-700">Effort Recognition</h3>
                  <p className="text-gray-600 text-sm">Celebrates the work and consistency, not just outcomes</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-700">Respectful Timing</h3>
                  <p className="text-gray-600 text-sm">Auto-dismisses to not demand indefinite attention</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Animation Features */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-3">✨</span>
              Animation Features
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-700">Celebratory Bounce</h3>
                  <p className="text-gray-600 text-sm">Gentle bounce animation that feels joyful without being overwhelming</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-700">Confetti Effects</h3>
                  <p className="text-gray-600 text-sm">Colorful confetti for major achievements using Joidu brand colors</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-700">Logo Pulse</h3>
                  <p className="text-gray-600 text-sm">Subtle pulse animation on the Joidu logo for warmth</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-700">Progress Indicator</h3>
                  <p className="text-gray-600 text-sm">Visual countdown for auto-dismiss timing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Achievement Types */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            🏆 Achievement Types
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="font-semibold text-gray-700 mb-2">Task Completion</h3>
              <p className="text-sm text-gray-600">1st task, 3 tasks, 5+ task milestones</p>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl mb-3">🔥</div>
              <h3 className="font-semibold text-gray-700 mb-2">Habit Streaks</h3>
              <p className="text-sm text-gray-600">3, 7, 14, 30+ day consistency</p>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-3">🧘‍♀️</div>
              <h3 className="font-semibold text-gray-700 mb-2">Focus Sessions</h3>
              <p className="text-sm text-gray-600">25min, 45min, multiple sessions</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-semibold text-gray-700 mb-2">Milestones</h3>
              <p className="text-sm text-gray-600">Personal bests, breakthroughs</p>
            </div>
          </div>
        </div>
        
        {/* Example Messages */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            💬 Example Achievement Messages
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
              <span className="text-2xl">🌅</span>
              <div>
                <h3 className="font-semibold text-gray-700">"Great start!"</h3>
                <p className="text-gray-600">First task of the day complete! You're setting the tone for success.</p>
                <div className="flex space-x-2 mt-2">
                  <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">Feels good</span>
                  <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm">Next one!</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg">
              <span className="text-2xl">🔥</span>
              <div>
                <h3 className="font-semibold text-gray-700">"You're unstoppable!"</h3>
                <p className="text-gray-600">3 tasks crushed today! Your momentum is incredible. Ready to tackle one more?</p>
                <div className="flex space-x-2 mt-2">
                  <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">Celebrate first</span>
                  <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm">Let's go!</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
              <span className="text-2xl">🌟</span>
              <div>
                <h3 className="font-semibold text-gray-700">"One week strong!"</h3>
                <p className="text-gray-600">7 days of task completion! This habit is becoming second nature.</p>
                <div className="flex space-x-2 mt-2">
                  <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">Amazing feeling</span>
                  <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm">Two weeks next?</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
              <span className="text-2xl">🚀</span>
              <div>
                <h3 className="font-semibold text-gray-700">"30-day legend!"</h3>
                <p className="text-gray-600">30 days of unstoppable momentum! You've transformed your life!</p>
                <div className="flex space-x-2 mt-2">
                  <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">I'm incredible</span>
                  <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm">What's next?</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Integration Guide */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            🔧 Integration Guide
          </h2>
          
          <div className="bg-white/10 backdrop-blur rounded-lg p-6">
            <h3 className="font-semibold mb-3">How to Trigger Celebrations:</h3>
            
            <div className="space-y-3 text-sm font-mono">
              <div className="bg-black/20 p-3 rounded">
                <span className="text-green-300">// Task completion</span><br/>
                <span className="text-blue-300">window.joiduCelebrations</span>.taskCompleted(3)
              </div>
              
              <div className="bg-black/20 p-3 rounded">
                <span className="text-green-300">// Focus session</span><br/>
                <span className="text-blue-300">window.joiduCelebrations</span>.focusSessionCompleted(25)
              </div>
              
              <div className="bg-black/20 p-3 rounded">
                <span className="text-green-300">// Habit streak</span><br/>
                <span className="text-blue-300">window.joiduCelebrations</span>.habitStreakReached('meditation', 7)
              </div>
            </div>
            
            <p className="mt-4 text-sm opacity-90">
              In development mode, use the demo controls in the top-left to test different celebration types!
            </p>
          </div>
        </div>
      </div>
      
      {/* Include the celebration system for this demo */}
      <CelebrationSystem 
        enableAutoDetection={true}
        userName="Demo User"
        currentRoute="/celebration-demo"
      />
    </div>
  )
}