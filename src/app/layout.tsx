import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/theme.css'
import BottomTabBar from '@/components/layout/BottomTabBar'
import { ThemeProvider } from '@/contexts/ThemeContext'

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
  return (
    <html lang="en">
      <body className={`${inter.className}`} style={{ backgroundColor: 'var(--background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ThemeProvider>
          <main style={{ flex: 1, paddingBottom: '80px' }}>
            {children}
          </main>
          <BottomTabBar />
        </ThemeProvider>
      </body>
    </html>
  )
} 