'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function GettingStarted7Page() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/help/getting-started-6')
  }

  const handleNext = () => {
    router.push('/help/getting-started-8')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--guide-getting-started)', padding: '20px' }}>
      {/* White Container */}
      <div style={{
        backgroundColor: 'var(--card-background)',
        borderRadius: '16px',
        border: '2px solid var(--border-color)',
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
            src="/icons/tasks_3.svg"
            alt="Tasks"
            width={32}
            height={32}
            style={{ marginRight: '8px' }}
          />
          <h1 style={{
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: 0
          }}>
            Tasks That Don't Overwhelm 📝
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
          Most task apps make ADHD brains feel worse. Joidu is designed to reduce stress, not create it.
        </p>

        {/* ADHD-Friendly Features Section */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '12px'
          }}>
            ADHD-friendly task features:
          </h2>
          <ul style={{
            fontSize: '14px',
            color: 'var(--text-primary)',
            paddingLeft: '16px',
            lineHeight: '1.6',
            margin: 0,
            listStyle: 'none'
          }}>
            <li style={{ marginBottom: '4px' }}>
              • <strong>Smart categorization:</strong> Visual colors help your brain sort information
            </li>
            <li style={{ marginBottom: '4px' }}>
              • <strong>Energy-aware suggestions:</strong> Match tasks to your current energy level
            </li>
            <li style={{ marginBottom: '4px' }}>
              • <strong>Automatic breakdown:</strong> Big tasks get split into manageable steps
            </li>
            <li style={{ marginBottom: '4px' }}>
              • <strong>Gentle reminders:</strong> Supportive nudges, never harsh alarms
            </li>
            <li style={{ marginBottom: '4px' }}>
              • <strong>Celebration mode:</strong> We party when you complete things!
            </li>
          </ul>
        </div>

        {/* Task Creation Tips Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '12px'
          }}>
            Pro tips for ADHD task success:
          </h2>
          <ul style={{
            fontSize: '14px',
            color: 'var(--text-primary)',
            paddingLeft: '16px',
            lineHeight: '1.6',
            margin: 0,
            listStyle: 'none'
          }}>
            <li style={{ marginBottom: '4px' }}>
              • Start tasks with action words: 'Call dentist' not 'dentist appointment'
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Include context: 'Reply to Emma's email about project timeline'
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Use your hyperfocus times for creative tasks
            </li>
            <li style={{ marginBottom: '4px' }}>
              • Save admin work for your alert morning hours
            </li>
          </ul>
        </div>

        {/* Create Task Box */}
        <div style={{
          backgroundColor: 'var(--success-light)',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          <div style={{ marginBottom: '8px' }}>
            <Image
              src="/icons/tasks_active.svg"
              alt="Tasks"
              width={24}
              height={24}
              style={{ margin: '0 auto' }}
            />
          </div>
          
          <h3 style={{
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--primary-blue)',
            marginBottom: '18px'
          }}>
            Create Your First Task
          </h3>

          <button
            disabled
            style={{
              backgroundColor: 'var(--primary-blue)',
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
            Create My First Task
          </button>

          <p style={{
            fontSize: '14px',
            fontWeight: 400,
            color: 'var(--text-primary)',
            margin: 0,
            lineHeight: '1.4'
          }}>
            Start simple: Pick one small thing you need to do today
          </p>
        </div>

        {/* Celebration Box */}
        <div style={{
          backgroundColor: 'var(--guide-adhd-tips)',
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
              color: 'var(--text-primary)',
              marginBottom: '8px'
            }}>
              🎉 Celebration matters:
            </h3>
            <p style={{
              fontSize: '14px',
              fontWeight: 400,
              color: 'var(--text-primary)',
              margin: 0,
              lineHeight: '1.4'
            }}>
              Every completed task gets confetti because your ADHD brain needs positive reinforcement. We're serious about celebrating wins!
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
            backgroundColor: 'var(--primary-orange)',
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
            backgroundColor: 'var(--primary-orange)',
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