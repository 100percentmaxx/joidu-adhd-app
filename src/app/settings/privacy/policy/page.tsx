'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Download, MessageCircle, Shield, Eye, X, UserCheck, Mail } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/settings/privacy')
  }

  const handleDownloadPolicy = () => {
    // In a real app, this would trigger PDF download
    console.log('Download full privacy policy PDF')
  }

  const handleContactSupport = () => {
    router.push('/help/email-support')
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
          fontSize: '17px', 
          fontWeight: 600 
        }}>
          Privacy Policy
        </h1>
        <div style={{ width: '40px' }}></div>
      </div>

      {/* Content */}
      <div style={{ padding: '0 20px' }}>
        
        {/* Header Info */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '2px solid #e2e2e2',
          padding: '20px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <Shield className="w-12 h-12" style={{ color: '#2847ef', margin: '0 auto' }} />
          </div>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '8px'
          }}>
            Your Privacy Matters
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#a5a5a5',
            margin: 0
          }}>
            Last updated: December 15, 2024
          </p>
        </div>

        {/* Key Highlights */}
        <div style={{
          backgroundColor: '#ddede3',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#4c4c4c',
            marginBottom: '16px'
          }}>
            🎯 The Bottom Line
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '14px', color: '#4c4c4c' }}>
              • Your data stays on your device by default
            </div>
            <div style={{ fontSize: '14px', color: '#4c4c4c' }}>
              • We never sell or share your personal information
            </div>
            <div style={{ fontSize: '14px', color: '#4c4c4c' }}>
              • Cloud sync is optional and encrypted
            </div>
            <div style={{ fontSize: '14px', color: '#4c4c4c' }}>
              • You can export your data anytime
            </div>
          </div>
        </div>

        {/* What We Collect */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '2px solid #e2e2e2',
          padding: '20px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Eye className="w-6 h-6" style={{ color: '#2847ef' }} />
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#4c4c4c',
              margin: 0
            }}>
              What We Collect (Spoiler: Very Little!)
            </h3>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#4c4c4c',
              marginBottom: '8px'
            }}>
              Information You Choose to Share:
            </h4>
            <div style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ fontSize: '14px', color: '#4c4c4c' }}>
                • Tasks, habits, and notes you create
              </div>
              <div style={{ fontSize: '14px', color: '#4c4c4c' }}>
                • Focus session preferences
              </div>
              <div style={{ fontSize: '14px', color: '#4c4c4c' }}>
                • App settings and customizations
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#4c4c4c',
              marginBottom: '8px'
            }}>
              Technical Information (Anonymous):
            </h4>
            <div style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ fontSize: '14px', color: '#4c4c4c' }}>
                • App performance data (crash reports)
              </div>
              <div style={{ fontSize: '14px', color: '#4c4c4c' }}>
                • Feature usage statistics (no personal content)
              </div>
              <div style={{ fontSize: '14px', color: '#4c4c4c' }}>
                • Device type and app version
              </div>
            </div>
          </div>
        </div>

        {/* How We Use Your Data */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '2px solid #e2e2e2',
          padding: '20px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <UserCheck className="w-6 h-6" style={{ color: '#2847ef' }} />
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#4c4c4c',
              margin: 0
            }}>
              How We Use Your Data
            </h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              backgroundColor: '#f0f8ff',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #e0e7ff'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#2847ef', marginBottom: '4px' }}>
                To Make the App Work for You
              </div>
              <div style={{ fontSize: '13px', color: '#4c4c4c' }}>
                Store your tasks, sync between devices, provide AI suggestions
              </div>
            </div>

            <div style={{
              backgroundColor: '#f0f8ff',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #e0e7ff'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#2847ef', marginBottom: '4px' }}>
                To Improve the App
              </div>
              <div style={{ fontSize: '13px', color: '#4c4c4c' }}>
                Fix bugs, understand which features help ADHD users most
              </div>
            </div>

            <div style={{
              backgroundColor: '#f0f8ff',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #e0e7ff'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#2847ef', marginBottom: '4px' }}>
                To Keep Your Data Safe
              </div>
              <div style={{ fontSize: '13px', color: '#4c4c4c' }}>
                Security monitoring, fraud prevention, system maintenance
              </div>
            </div>
          </div>
        </div>

        {/* What We Never Do */}
        <div style={{
          backgroundColor: '#fef2f2',
          borderRadius: '16px',
          border: '2px solid #fecaca',
          padding: '20px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <X className="w-6 h-6" style={{ color: '#dc2626' }} />
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#dc2626',
              margin: 0
            }}>
              What We Never Do
            </h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '14px', color: '#4c4c4c' }}>
              ✗ Sell your personal information to anyone
            </div>
            <div style={{ fontSize: '14px', color: '#4c4c4c' }}>
              ✗ Share your tasks or notes with third parties
            </div>
            <div style={{ fontSize: '14px', color: '#4c4c4c' }}>
              ✗ Use your data to target ads
            </div>
            <div style={{ fontSize: '14px', color: '#4c4c4c' }}>
              ✗ Read your personal content for AI training
            </div>
            <div style={{ fontSize: '14px', color: '#4c4c4c' }}>
              ✗ Track your location or browsing habits
            </div>
          </div>
        </div>

        {/* Your Rights */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '2px solid #e2e2e2',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <UserCheck className="w-6 h-6" style={{ color: '#2847ef' }} />
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#4c4c4c',
              margin: 0
            }}>
              Your Rights
            </h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              backgroundColor: '#fafafa',
              borderRadius: '8px'
            }}>
              <Download className="w-5 h-5" style={{ color: '#a8e2bb' }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#4c4c4c' }}>
                  Export Your Data
                </div>
                <div style={{ fontSize: '12px', color: '#a5a5a5' }}>
                  Download everything in multiple formats
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              backgroundColor: '#fafafa',
              borderRadius: '8px'
            }}>
              <X className="w-5 h-5" style={{ color: '#a8e2bb' }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#4c4c4c' }}>
                  Delete Your Account
                </div>
                <div style={{ fontSize: '12px', color: '#a5a5a5' }}>
                  Permanently remove all your data
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              backgroundColor: '#fafafa',
              borderRadius: '8px'
            }}>
              <Eye className="w-5 h-5" style={{ color: '#a8e2bb' }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#4c4c4c' }}>
                  Access Your Information
                </div>
                <div style={{ fontSize: '12px', color: '#a5a5a5' }}>
                  See exactly what we have stored
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div style={{
          backgroundColor: '#cae9ef',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <MessageCircle className="w-6 h-6" style={{ color: '#2847ef' }} />
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#4c4c4c',
              margin: 0
            }}>
              Questions About Privacy?
            </h3>
          </div>
          
          <p style={{
            fontSize: '14px',
            color: '#4c4c4c',
            marginBottom: '16px',
            lineHeight: '1.4'
          }}>
            We believe privacy should be simple to understand. If you have any questions about how we handle your data, we're here to help!
          </p>

          <button
            onClick={handleContactSupport}
            style={{
              backgroundColor: '#2847ef',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 600,
              padding: '12px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              marginRight: '12px'
            }}
          >
            Contact Privacy Team
          </button>
        </div>

        {/* Download Full Policy */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '2px solid #e2e2e2',
          padding: '20px',
          marginBottom: '60px',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#4c4c4c',
            marginBottom: '12px'
          }}>
            Want the Full Details?
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#a5a5a5',
            marginBottom: '16px'
          }}>
            Download our complete privacy policy for all the legal details
          </p>
          <button
            onClick={handleDownloadPolicy}
            style={{
              backgroundColor: '#f0f8ff',
              color: '#2847ef',
              fontSize: '14px',
              fontWeight: 600,
              padding: '12px 20px',
              borderRadius: '8px',
              border: '2px solid #2847ef',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              margin: '0 auto'
            }}
          >
            <Download className="w-4 h-4" />
            Download Full Policy (PDF)
          </button>
        </div>
      </div>
    </div>
  )
}