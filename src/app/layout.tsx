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
  // Use environment variable with fallback for debugging
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_test_dGVhY2hpbmctdGVycmllci05NC5jbGVyay5hY2NvdW50cy5kZXYk'
  
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    console.warn('⚠️ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable not found, using fallback')
  } else {
    console.log('✅ Using NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY from environment variables')
  }
  
  return (
    <ClerkProvider
      publishableKey={publishableKey}
    >
      <html lang="en">
        <body className={`${inter.className}`} style={{ backgroundColor: 'var(--background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <ThemeProvider>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
} 