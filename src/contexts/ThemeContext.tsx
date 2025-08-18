'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'auto'

interface ThemeContextType {
  theme: Theme
  actualTheme: 'light' | 'dark' // The actual theme being displayed
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('auto')
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light')

  // Check system preference
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  }

  // Determine actual theme based on user preference and system setting
  const determineActualTheme = (userTheme: Theme): 'light' | 'dark' => {
    if (userTheme === 'auto') {
      return getSystemTheme()
    }
    return userTheme
  }

  // Apply theme to document
  const applyTheme = (actualTheme: 'light' | 'dark') => {
    if (typeof document !== 'undefined') {
      if (actualTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.documentElement.removeAttribute('data-theme')
      }
    }
  }

  // Set theme and persist to localStorage
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('joidu-theme', newTheme)
    }
    
    // Determine and apply actual theme
    const actual = determineActualTheme(newTheme)
    setActualTheme(actual)
    applyTheme(actual)
  }

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load saved theme preference
      const savedTheme = localStorage.getItem('joidu-theme') as Theme | null
      const initialTheme = savedTheme || 'auto'
      
      setThemeState(initialTheme)
      const actual = determineActualTheme(initialTheme)
      setActualTheme(actual)
      applyTheme(actual)

      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        if (initialTheme === 'auto') {
          const newActualTheme = e.matches ? 'dark' : 'light'
          setActualTheme(newActualTheme)
          applyTheme(newActualTheme)
        }
      }

      mediaQuery.addEventListener('change', handleSystemThemeChange)
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  // Update actual theme when user theme changes
  useEffect(() => {
    const actual = determineActualTheme(theme)
    setActualTheme(actual)
    applyTheme(actual)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, actualTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}