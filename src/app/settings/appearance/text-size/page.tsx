'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function TextSizePage() {
  const router = useRouter()
  const [selectedSize, setSelectedSize] = useState('Default')

  const textSizes = [
    { id: 'Small', label: 'Small', scale: 0.9 },
    { id: 'Default', label: 'Default', scale: 1.0 },
    { id: 'Large', label: 'Large', scale: 1.1 },
    { id: 'Larger', label: 'Larger', scale: 1.25 },
    { id: 'Largest', label: 'Largest', scale: 1.4 }
  ]

  const currentTextSize = textSizes.find(size => size.id === selectedSize)

  useEffect(() => {
    // Load saved text size preference
    const savedSize = localStorage.getItem('textSize') || 'Default'
    setSelectedSize(savedSize)
    
    // Apply the saved size to the document
    const scale = textSizes.find(size => size.id === savedSize)?.scale || 1.0
    document.documentElement.style.setProperty('--text-scale', scale.toString())
  }, [])

  const handleBack = () => {
    router.push('/settings/appearance')
  }

  const handleSizeChange = (sizeId: string) => {
    setSelectedSize(sizeId)
    const size = textSizes.find(s => s.id === sizeId)
    if (size) {
      // Save preference
      localStorage.setItem('textSize', sizeId)
      
      // Apply immediately to document
      document.documentElement.style.setProperty('--text-scale', size.scale.toString())
      
      // Haptic feedback (mobile)
      if ('vibrate' in navigator) {
        navigator.vibrate(10)
      }
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fefbf7' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <button 
          onClick={handleBack}
          className="flex items-center justify-center w-10 h-10"
        >
          <ArrowLeft className="w-6 h-6" style={{ color: '#2847ef' }} />
        </button>
        <h1 style={{ 
          color: '#2847ef', 
          fontSize: 'calc(17px * var(--text-scale, 1))', 
          fontWeight: 600 
        }}>
          Text Size
        </h1>
        <div style={{ width: '40px' }}></div>
      </div>

      {/* Content */}
      <div style={{ padding: '0 20px' }}>
        
        {/* Preview Section */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '2px solid #e2e2e2',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h2 style={{
            fontSize: 'calc(16px * var(--text-scale, 1))',
            fontWeight: 600,
            color: '#4c4c4c',
            marginBottom: '16px'
          }}>
            Preview
          </h2>
          
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{
              fontSize: `calc(18px * ${currentTextSize?.scale || 1})`,
              fontWeight: 600,
              color: '#4c4c4c',
              marginBottom: '8px'
            }}>
              Task Title Example
            </h3>
            <p style={{
              fontSize: `calc(16px * ${currentTextSize?.scale || 1})`,
              fontWeight: 400,
              color: '#4c4c4c',
              marginBottom: '8px',
              lineHeight: '1.4'
            }}>
              This is what your task descriptions will look like when you're reviewing your daily activities and planning ahead.
            </p>
            <p style={{
              fontSize: `calc(14px * ${currentTextSize?.scale || 1})`,
              fontWeight: 400,
              color: '#a5a5a5',
              margin: 0
            }}>
              Time estimates and small details
            </p>
          </div>
        </div>

        {/* Current Selection */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '2px solid #e2e2e2',
          padding: '20px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: 'calc(14px * var(--text-scale, 1))',
            color: '#a5a5a5',
            marginBottom: '8px'
          }}>
            Currently using:
          </p>
          <h3 style={{
            fontSize: 'calc(20px * var(--text-scale, 1))',
            fontWeight: 700,
            color: '#2847ef',
            margin: 0
          }}>
            {selectedSize}
          </h3>
        </div>

        {/* Size Control */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '2px solid #e2e2e2',
          padding: '20px',
          marginBottom: '60px'
        }}>
          <h2 style={{
            fontSize: 'calc(16px * var(--text-scale, 1))',
            fontWeight: 600,
            color: '#4c4c4c',
            marginBottom: '20px'
          }}>
            Choose Size
          </h2>

          {/* Size Options */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '12px'
          }}>
            {textSizes.map((size) => (
              <label
                key={size.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  backgroundColor: selectedSize === size.id ? '#f0f8ff' : '#fafafa',
                  border: selectedSize === size.id ? '2px solid #2847ef' : '2px solid #e2e2e2',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  minHeight: '44px'
                }}
                onClick={() => handleSizeChange(size.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {/* Radio Button */}
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: selectedSize === size.id ? '#a8e2bb' : '#ffffff',
                      border: selectedSize === size.id ? 'none' : '2px solid #e2e2e2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '12px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {selectedSize === size.id && (
                      <span style={{ 
                        color: 'white', 
                        fontSize: '12px', 
                        fontWeight: 'bold',
                        lineHeight: '1'
                      }}>
                        ✓
                      </span>
                    )}
                  </div>
                  
                  {/* Size Label */}
                  <div>
                    <span style={{
                      fontSize: `calc(16px * ${size.scale})`,
                      fontWeight: 600,
                      color: '#4c4c4c'
                    }}>
                      {size.label}
                    </span>
                    <div style={{
                      fontSize: 'calc(12px * var(--text-scale, 1))',
                      color: '#a5a5a5',
                      marginTop: '2px'
                    }}>
                      {size.scale === 1.0 ? 'Standard size' : `${Math.round(size.scale * 100)}% of standard`}
                    </div>
                  </div>
                </div>

                {/* Preview Text */}
                <div style={{
                  fontSize: `calc(14px * ${size.scale})`,
                  color: '#4c4c4c',
                  fontWeight: 400,
                  textAlign: 'right'
                }}>
                  Sample text
                </div>

                <input
                  type="radio"
                  name="textSize"
                  value={size.id}
                  checked={selectedSize === size.id}
                  onChange={() => handleSizeChange(size.id)}
                  style={{ display: 'none' }}
                  aria-label={`Set text size to ${size.label}`}
                />
              </label>
            ))}
          </div>

          {/* Additional Info */}
          <div style={{
            marginTop: '20px',
            padding: '16px',
            backgroundColor: '#cae9ef',
            borderRadius: '12px'
          }}>
            <p style={{
              fontSize: 'calc(14px * var(--text-scale, 1))',
              color: '#4c4c4c',
              margin: 0,
              lineHeight: '1.4'
            }}>
              💡 Text size changes apply immediately across the entire app. Your choice will be remembered for future sessions.
            </p>
          </div>
        </div>
      </div>

      {/* Global CSS for text scaling */}
      <style jsx global>{`
        :root {
          --text-scale: ${currentTextSize?.scale || 1};
        }
        
        /* Apply text scaling to common elements */
        body {
          font-size: calc(16px * var(--text-scale));
        }
        
        h1 {
          font-size: calc(24px * var(--text-scale));
        }
        
        h2 {
          font-size: calc(20px * var(--text-scale));
        }
        
        h3 {
          font-size: calc(18px * var(--text-scale));
        }
        
        /* Ensure minimum touch targets */
        button, input, select {
          min-height: 44px;
        }
        
        /* Scale specific app text classes */
        .text-body-large {
          font-size: calc(18px * var(--text-scale));
        }
        
        .text-body-medium {
          font-size: calc(16px * var(--text-scale));
        }
        
        .text-caption {
          font-size: calc(14px * var(--text-scale));
        }
        
        .text-small {
          font-size: calc(12px * var(--text-scale));
        }
      `}</style>
    </div>
  )
}