import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import BottomTabBar from '@/components/layout/BottomTabBar'

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
      <body className={`${inter.className}`} style={{ backgroundColor: '#fefbf7', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <main style={{ flex: 1, paddingBottom: '80px' }}>
          {children}
        </main>
        <BottomTabBar />
      </body>
    </html>
  )
} 