'use client'

import React from 'react'
import Image from 'next/image'

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#4c4c4c' }}>
      {/* Stars Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="text-center z-10">
        {/* Rocket Icon with Vibration Animation */}
        <div className="mb-8 inline-block animate-bounce">
          <Image
            src="/src/joidu-icons/start.svg"
            alt="Rocket"
            width={60}
            height={60}
            className="animate-pulse"
            style={{
              animation: 'vibrate 0.3s ease-in-out infinite alternate'
            }}
          />
        </div>

        {/* Coming Soon Title */}
        <h1 className="text-white text-2xl font-semibold mb-6">
          Coming Soon!
        </h1>

        {/* Description Text */}
        <p className="text-white text-base max-w-md mx-auto leading-relaxed">
          We are working to bring you the best guide we possibly can. Check back soon!
        </p>
      </div>

      {/* Custom CSS for vibrate animation */}
      <style jsx>{`
        @keyframes vibrate {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(1px, -1px) rotate(-1deg); }
          50% { transform: translate(-1px, 2px) rotate(1deg); }
          75% { transform: translate(2px, 1px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
      `}</style>
    </div>
  )
}