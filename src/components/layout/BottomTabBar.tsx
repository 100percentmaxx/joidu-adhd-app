'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface TabItem {
  name: string
  href: string
  iconActive: string
  iconInactive: string
  label: string
}

const tabs: TabItem[] = [
  {
    name: 'home',
    href: '/',
    iconActive: '/icons/home_active.svg',
    iconInactive: '/icons/home_inactive.svg',
    label: 'Home'
  },
  {
    name: 'tasks',
    href: '/tasks',
    iconActive: '/icons/tasks_active.svg',
    iconInactive: '/icons/tasks_inactive.svg',
    label: 'Tasks'
  },
  {
    name: 'focus',
    href: '/focus',
    iconActive: '/icons/focus_active.svg',
    iconInactive: '/icons/focus_inactive.svg',
    label: 'Focus'
  },
  {
    name: 'habits',
    href: '/habits',
    iconActive: '/icons/habits_active.svg',
    iconInactive: '/icons/habits_inactive.svg',
    label: 'Habits'
  },
  {
    name: 'kaihelp',
    href: '/kaihelp',
    iconActive: '/icons/kaihelp_active.svg',
    iconInactive: '/icons/kaihelp_inactive.svg',
    label: 'KaiHelp'
  }
]

export default function BottomTabBar() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTop: '1px solid #e2e2e2',
        height: '80px',
        zIndex: 50
      }} />
    )
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderTop: '1px solid #e2e2e2',
      zIndex: 50
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '80px',
        padding: '0 16px'
      }}>
        {tabs.map((tab) => {
          const isActive = tab.href === '/' 
            ? pathname === tab.href 
            : pathname.startsWith(tab.href)
          
          return (
            <Link
              key={tab.name}
              href={tab.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                height: '100%',
                textDecoration: 'none',
                transition: 'all 0.2s ease-out',
                color: isActive ? '#2847ef' : '#a5a5a5'
              }}
            >
              <img
                src={isActive ? tab.iconActive : tab.iconInactive}
                alt={tab.label}
                style={{
                  width: '24px',
                  height: '24px',
                  marginBottom: '4px'
                }}
              />
              <span style={{
                fontSize: '10px',
                fontWeight: 500,
                color: isActive ? '#2847ef' : '#a5a5a5'
              }}>
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
} 