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
  // Temporarily hardcode the key to test if that's the only issue
  const publishableKey = 'pk_test_dGVhY2hpbmctdGVycmllci05NC5jbGVyay5hY2NvdW50cy5kZXYk'
  console.log('Using hardcoded Clerk publishable key for testing')
  
  return (
    <ClerkProvider
      publishableKey={publishableKey}
    >
      <html lang="en">
        <body className={`${inter.className}`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
} 