'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function GettingStarted5Page() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/help/getting-started-4')
  }

  const handleNext = () => {
    router.push('/help/getting-started-6')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e6e1f4', padding: '20px' }}>
      {/* White Container */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '2px solid #e2e2e2',
        padding: '20px',
        marginBottom: '24px'
      }}>
        {/* Section Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <Image
            src="/icons/habits_2.svg"
            alt="Habits"
            width={32}
            height={32}
            style={{ marginRight: '8px' }}
          />
          <h1 style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#4c4c4c',
            margin: 0
          }}>
            Start Small, Win Big 🌱
          </h1>
        </div>

        {/* Introduction Text */}
        <p style={{
          fontSize: '16px',
          fontWeight: 400,
          color: '#4c4c4c',
          marginBottom: '20px',
          lineHeight: '1.4'
        }}>
          ADHD brains love routine but struggle to build them. Here's how to start with something so small it feels almost silly:
        </p>

        {/* The 2-Minute Rule Section */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '12px'
          }}>
            The 2-Minute Rule:
          </h2>
          <p style={{
            fontSize: '14px',
            fontWeight: 400,
            color: '#4c4c4c',
            marginBottom: '12px',
            lineHeight: '1.4'
          }}>
            Start with habits that take less than 2 minutes. Seriously! Here are some examples:
          </p>
          <ul style={{
            fontSize: '14px',
            color: '#4c4c4c',
            paddingLeft: '16px',
            lineHeight: '1.6',
            margin: 0,
            listStyle: 'none'
          }}>
            <li style={{ marginBottom: '4px' }}>
              • Drink one glass of water when you wake up
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Write down one thing you're grateful for
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Do 10 jumping jacks
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Put your phone in the same spot every night
            </li>
          </ul>
        </div>

        {/* Why It Works Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '12px'
          }}>
            Why this works for ADHD:
          </h2>
          <ul style={{
            fontSize: '14px',
            color: '#4c4c4c',
            paddingLeft: '16px',
            lineHeight: '1.6',
            margin: 0,
            listStyle: 'none'
          }}>
            <li style={{ marginBottom: '4px' }}>
              • No decision fatigue - it's so simple!
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Quick dopamine hit from completion
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Easy to remember and stick with
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Builds momentum for bigger changes
            </li>
          </ul>
        </div>

        {/* Create Habit Box */}
        <div style={{
          backgroundColor: '#ddede3',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          <div style={{ marginBottom: '8px' }}>
            <Image
              src="/icons/habits_active.svg"
              alt="Habit"
              width={24}
              height={24}
              style={{ margin: '0 auto' }}
            />
          </div>
          
          <h3 style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#2847ef',
            marginBottom: '18px'
          }}>
            Create Your First Habit
          </h3>

          <button
            disabled
            style={{
              backgroundColor: '#2847ef',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 700,
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              whiteSpace: 'nowrap',
              marginBottom: '18px',
              opacity: 0.7,
              cursor: 'not-allowed'
            }}
          >
            Create My First Habit
          </button>

          <p style={{
            fontSize: '14px',
            fontWeight: 400,
            color: '#4c4c4c',
            margin: 0,
            lineHeight: '1.4'
          }}>
            Start with a simple morning routine - pick 2-3 tiny things you want to do each morning
          </p>
        </div>

        {/* Success Story Box */}
        <div style={{
          backgroundColor: '#cae9ef',
          borderRadius: '16px',
          padding: '16px',
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: '24px'
        }}>
          <Image
            src="/icons/celebration.svg"
            alt="Celebration"
            width={24}
            height={24}
            style={{ marginRight: '8px', marginTop: '2px' }}
          />
          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#4c4c4c',
              marginBottom: '8px'
            }}>
              ✨ Real user story:
            </h3>
            <p style={{
              fontSize: '14px',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#4c4c4c',
              margin: 0,
              lineHeight: '1.4'
            }}>
              "I started with just drinking water when I woke up. Now 6 months later, I have a whole morning routine that actually sticks!" - Sarah, ADHD community member
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="transition-transform hover:scale-105"
          style={{
            backgroundColor: '#f9c075',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: 700,
            padding: '12px 16px',
            borderRadius: '12px',
            border: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          ← Back
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="transition-transform hover:scale-105"
          style={{
            backgroundColor: '#f9c075',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: 700,
            padding: '12px 16px',
            borderRadius: '12px',
            border: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          Next →
        </button>
      </div>
    </div>
  )
}