import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GuideSection as GuideSectionType } from '../content/sections'

interface GuideSectionProps {
  section: GuideSectionType
}

export default function GuideSection({ section }: GuideSectionProps) {
  const router = useRouter()
  const [tipExpanded, setTipExpanded] = useState(false)

  const handleInteraction = () => {
    // Navigate to the specified route
    if (section.interactive.action.startsWith('/')) {
      router.push(section.interactive.action)
    }
  }

  return (
    <div>
      {/* Section Title with Icon */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <img 
          src={section.icon} 
          alt="" 
          style={{ 
            width: '48px', 
            height: '48px',
            marginRight: '16px'
          }} 
        />
        <h2 style={{
          color: '#4c4c4c',
          fontSize: '24px',
          fontWeight: 600,
          margin: 0
        }}>
          {section.title}
        </h2>
      </div>

      {/* Main Content Container */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        marginBottom: '24px'
      }}>
        {/* Introduction Text */}
        <p style={{
          color: '#4c4c4c',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '1.4',
          margin: 0,
          marginBottom: section.content.features ? '20px' : '16px'
        }}>
          {section.content.intro}
        </p>

        {/* Features List */}
        {section.content.features && (
          <div style={{ marginBottom: '20px' }}>
            <ul style={{
              margin: 0,
              paddingLeft: '0',
              listStyle: 'none'
            }}>
              {section.content.features.map((feature, index) => (
                <li key={index} style={{
                  color: '#4c4c4c',
                  fontSize: '16px',
                  lineHeight: '1.4',
                  marginBottom: '8px',
                  paddingLeft: '20px',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#2847ef',
                    borderRadius: '50%',
                    marginTop: '8px'
                  }} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Examples List */}
        {section.content.examples && (
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{
              color: '#4c4c4c',
              fontSize: '16px',
              fontWeight: 600,
              margin: 0,
              marginBottom: '12px'
            }}>
              Examples:
            </h4>
            <ul style={{
              margin: 0,
              paddingLeft: '0',
              listStyle: 'none'
            }}>
              {section.content.examples.map((example, index) => (
                <li key={index} style={{
                  color: '#4c4c4c',
                  fontSize: '16px',
                  lineHeight: '1.4',
                  marginBottom: '8px',
                  paddingLeft: '20px',
                  position: 'relative',
                  backgroundColor: '#f9f9f9',
                  padding: '8px 8px 8px 28px',
                  borderRadius: '8px'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '12px',
                    top: '12px',
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#fa772c',
                    borderRadius: '50%'
                  }} />
                  {example}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Interactive Button */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          marginBottom: '16px'
        }}>
          <button
            onClick={handleInteraction}
            style={{
              backgroundColor: '#2847ef',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 24px',
              fontSize: '16px',
              fontWeight: 500,
              cursor: 'pointer',
              height: '44px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#1e3acf'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#2847ef'
            }}
          >
            {section.interactive.buttonText}
          </button>
        </div>
      </div>

      {/* Tip Box */}
      {section.content.tip && (
        <div style={{
          backgroundColor: '#fef7d6',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <p style={{
            color: '#4c4c4c',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '1.4',
            margin: 0
          }}>
            {section.content.tip}
          </p>
        </div>
      )}

      {/* Reassurance Box */}
      {section.content.reassurance && (
        <div style={{
          backgroundColor: '#ddede3',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <p style={{
            color: '#4c4c4c',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '1.4',
            margin: 0
          }}>
            {section.content.reassurance}
          </p>
        </div>
      )}

      {/* Insight Box */}
      {section.content.insight && (
        <div style={{
          backgroundColor: '#f0f4ff',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px',
          border: '1px solid #e1e8ff'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-start',
            gap: '12px'
          }}>
            <img 
              src="/icons/brain.svg" 
              alt="Brain" 
              style={{ 
                width: '20px', 
                height: '20px',
                marginTop: '2px',
                flexShrink: 0
              }} 
            />
            <p style={{
              color: '#4c4c4c',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '1.4',
              margin: 0
            }}>
              {section.content.insight}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}