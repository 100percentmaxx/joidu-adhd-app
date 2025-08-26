'use client'

import React from 'react'
import HyperfocusProtectionSystem from '@/components/notifications/HyperfocusProtectionSystem'

/**
 * HYPERFOCUS PROTECTION DEMO PAGE
 * 
 * This page demonstrates the break suggestion modal and hyperfocus protection system
 * designed specifically for ADHD users who may work for extended periods without
 * taking necessary breaks.
 * 
 * ROUTE: /hyperfocus-demo
 * 
 * Features demonstrated:
 * - Activity detection and focus session tracking
 * - Escalating break suggestions (gentle → moderate → strong)
 * - Natural break point detection (waits for activity pauses)
 * - Snooze functionality and user choice preservation
 * - Health-focused messaging that respects autonomy
 * 
 * This page helps users understand how the system protects their wellbeing
 * while respecting their need for deep focus periods.
 */
export default function HyperfocusProtectionDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🧠 Hyperfocus Protection Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Intelligent break suggestions that protect ADHD users from hyperfocus burnout
            while respecting their deep work needs and personal autonomy.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Protection Strategy */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-3">🛡️</span>
              Protection Strategy
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-700">Smart Timing</h3>
                  <p className="text-gray-600 text-sm">Waits for natural pauses (8+ seconds of inactivity) before suggesting breaks</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-700">Escalating Intensity</h3>
                  <p className="text-gray-600 text-sm">Starts gentle at 30min, becomes stronger at 60+ minutes</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-700">User Choice</h3>
                  <p className="text-gray-600 text-sm">Always allows "5 more min" snooze or break dismissal</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-700">Activity Detection</h3>
                  <p className="text-gray-600 text-sm">Monitors typing, clicking, scrolling to understand work patterns</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Break Benefits */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-3">💚</span>
              Why Breaks Matter
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-700">Prevents Burnout</h3>
                  <p className="text-gray-600 text-sm">Extended hyperfocus can lead to mental exhaustion and reduced productivity</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-700">Boosts Creativity</h3>
                  <p className="text-gray-600 text-sm">Brief breaks allow the mind to make new connections and find solutions</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-700">Physical Health</h3>
                  <p className="text-gray-600 text-sm">Prevents eye strain, poor posture, and dehydration from long sessions</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-700">Sustained Performance</h3>
                  <p className="text-gray-600 text-sm">Regular breaks help maintain high-quality output over longer periods</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Escalation Levels */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            📊 Escalation Levels
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
              <div className="text-2xl mb-3">☕</div>
              <h3 className="font-semibold text-gray-700 mb-2">30 Minutes</h3>
              <p className="text-sm text-gray-600 mb-2"><strong>Gentle Suggestion</strong></p>
              <p className="text-xs text-gray-500">"Maybe a quick pause? 30 minutes of good focus!"</p>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
              <div className="text-2xl mb-3">🌸</div>
              <h3 className="font-semibold text-gray-700 mb-2">45 Minutes</h3>
              <p className="text-sm text-gray-600 mb-2"><strong>Moderate Suggestion</strong></p>
              <p className="text-xs text-gray-500">"Time for a break? Maybe stretch or grab some water?"</p>
            </div>
            
            <div className="text-center p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
              <div className="text-2xl mb-3">🧠</div>
              <h3 className="font-semibold text-gray-700 mb-2">60 Minutes</h3>
              <p className="text-sm text-gray-600 mb-2"><strong>Strong Suggestion</strong></p>
              <p className="text-xs text-gray-500">"Your brain needs care! A break will boost productivity."</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
              <div className="text-2xl mb-3">💚</div>
              <h3 className="font-semibold text-gray-700 mb-2">90+ Minutes</h3>
              <p className="text-sm text-gray-600 mb-2"><strong>Health Focus</strong></p>
              <p className="text-xs text-gray-500">"Your wellbeing matters! Please take a proper break."</p>
            </div>
          </div>
        </div>
        
        {/* Activity Tracking */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-semibent text-gray-800 mb-6 text-center">
            🔍 Activity Detection
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Tracked Activities</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-green-500 font-semibold">✓</span>
                  <span className="text-gray-700">Keyboard input (typing, shortcuts)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500 font-semibold">✓</span>
                  <span className="text-gray-700">Mouse clicks and movement</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500 font-semibold">✓</span>
                  <span className="text-gray-700">Page scrolling and navigation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500 font-semibold">✓</span>
                  <span className="text-gray-700">Window focus and tab switching</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500 font-semibold">✓</span>
                  <span className="text-gray-700">Touch interactions on mobile</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Smart Detection</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-gray-700 font-medium">Natural Pauses</span>
                    <p className="text-sm text-gray-600">Waits for 8+ seconds of inactivity before suggesting breaks</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-gray-700 font-medium">Session Tracking</span>
                    <p className="text-sm text-gray-600">Automatically starts/ends sessions based on activity</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-gray-700 font-medium">Respectful Timing</span>
                    <p className="text-sm text-gray-600">Never interrupts active work or typing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Example Messages */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            💬 Example Break Messages
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
              <span className="text-2xl">☕</span>
              <div>
                <h3 className="font-semibold text-gray-700">"Maybe a quick pause?"</h3>
                <p className="text-gray-600">30 minutes of good focus! A brief break could refresh your mind.</p>
                <div className="flex space-x-2 mt-2">
                  <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">5 more min</span>
                  <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm">Sure thing</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">💡 Short breaks boost creativity</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg">
              <span className="text-2xl">🌸</span>
              <div>
                <h3 className="font-semibold text-gray-700">"Time for a break?"</h3>
                <p className="text-gray-600">You've been focused for 45 minutes. Maybe stretch or grab some water?</p>
                <div className="flex space-x-2 mt-2">
                  <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">5 more min</span>
                  <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm">Good idea</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">⚡ Breaks prevent mental fatigue</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg">
              <span className="text-2xl">🧠</span>
              <div>
                <h3 className="font-semibold text-gray-700">"Your brain needs care"</h3>
                <p className="text-gray-600">An hour of intense focus! A short break will actually boost your productivity.</p>
                <p className="text-sm text-gray-500 italic">Research shows breaks improve focus and creativity</p>
                <div className="flex space-x-2 mt-2">
                  <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">5 more min</span>
                  <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm">Good call</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">🌟 Your wellbeing matters most</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Integration Guide */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            🔧 How It Works
          </h2>
          
          <div className="bg-white/10 backdrop-blur rounded-lg p-6">
            <h3 className="font-semibold mb-3">Activity Detection Process:</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">1</div>
                <span>System detects user activity (typing, clicking, scrolling)</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">2</div>
                <span>Starts tracking focus session when continuous activity begins</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">3</div>
                <span>Monitors for natural break points (8+ seconds of inactivity)</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">4</div>
                <span>Suggests break during pause, respecting user's choice to continue</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">5</div>
                <span>Escalates suggestion intensity based on session duration</span>
              </div>
            </div>
            
            <p className="mt-4 text-sm opacity-90">
              In development mode, use the demo controls on the left to test different break suggestion levels!
            </p>
          </div>
        </div>
      </div>
      
      {/* Include the hyperfocus protection system for this demo */}
      <HyperfocusProtectionSystem 
        enableProtection={true}
        firstBreakThreshold={30}
        escalationInterval={15}
        maxIntensity="strong"
        userName="Demo User"
        showDetailedStats={true}
        onBreakTaken={(duration, type) => {
          console.log(`Break taken after ${duration} minutes (${type})`)
        }}
        onBreakSnoozed={(duration) => {
          console.log(`Break snoozed at ${duration} minutes`)
        }}
      />
    </div>
  )
}