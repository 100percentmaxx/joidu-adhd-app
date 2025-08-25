import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/theme.css'
import ConditionalLayout from '@/components/layout/ConditionalLayout'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Joidu - Activate Your Potential',
  description: 'ADHD-friendly task management app designed to work with your brain, not against it.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Debug environment variable loading
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  console.log('Clerk publishable key loaded:', publishableKey ? 'YES' : 'NO')
  
  return (
    <ClerkProvider
      publishableKey={publishableKey}
    >
      <html lang="en">
        <body className={`${inter.className}`}>
          {/* Debug info for development */}
          {process.env.NODE_ENV === 'development' && (
            <div style={{position: 'fixed', top: 0, left: 0, background: 'red', color: 'white', padding: '4px', zIndex: 9999, fontSize: '12px'}}>
              Key: {publishableKey ? 'LOADED' : 'MISSING'}
            </div>
          )}
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
} 