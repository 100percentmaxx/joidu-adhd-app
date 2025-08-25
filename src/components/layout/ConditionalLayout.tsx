'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import BottomTabBar from '@/components/layout/BottomTabBar'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

/**
 * CONDITIONAL LAYOUT COMPONENT
 * 
 * This component conditionally renders the main app layout elements
 * (like BottomTabBar) based on the current route. Certain pages like
 * onboarding, loading screens, and standalone demos should not show
 * the main app navigation.
 * 
 * PAGES WITHOUT BOTTOM NAVIGATION:
 * - /onboarding - Full onboarding flow with its own navigation
 * - /welcome - Welcome/loading screens
 * - /welcome-demo - Welcome screen demonstrations
 * - /maintenance - Maintenance screens
 * - /connection-lost - Connection error screens
 * - /sync-issue - Sync error screens
 * - Loading screens and modals
 * 
 * This ensures users have a clean, focused experience during
 * onboarding and error states without app navigation distractions.
 */
export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()

  // Define routes that should NOT show the main app navigation
  const routesWithoutBottomNav = [
    '/onboarding',
    '/register',
    '/sign-in',
    '/welcome',
    '/welcome-demo', 
    '/maintenance',
    '/connection-lost',
    '/sync-issue',
    '/task-breakdown-demo',
    '/sync-demo'
  ]

  // Check if current route should hide bottom navigation
  const hideBottomNav = routesWithoutBottomNav.some(route => pathname.startsWith(route))

  return (
    <>
      <main style={{ 
        flex: 1, 
        paddingBottom: hideBottomNav ? '0' : '80px' // No padding when bottom nav is hidden
      }}>
        {children}
      </main>
      {/* Only show BottomTabBar on regular app pages */}
      {!hideBottomNav && <BottomTabBar />}
    </>
  )
}

/**
 * USAGE EXAMPLES:
 * 
 * This component is used in the root layout to conditionally show navigation:
 * 
 * // In layout.tsx
 * <ConditionalLayout>
 *   {children}
 * </ConditionalLayout>
 * 
 * ROUTE BEHAVIOR:
 * 
 * ✅ Routes WITH bottom navigation:
 * - / (Home)
 * - /tasks
 * - /focus
 * - /habits
 * - /kaihelp
 * - /settings
 * - All settings subpages
 * - All help pages
 * 
 * ❌ Routes WITHOUT bottom navigation:
 * - /onboarding (and all onboarding screens)
 * - /welcome, /welcome-demo
 * - /maintenance
 * - /connection-lost
 * - /sync-issue
 * - Demo pages like /task-breakdown-demo
 * 
 * ADDING NEW ROUTES:
 * 
 * To exclude a new route from bottom navigation, add it to the
 * routesWithoutBottomNav array:
 * 
 * const routesWithoutBottomNav = [
 *   '/onboarding',
 *   '/welcome',
 *   '/your-new-route'  // Add here
 * ]
 * 
 * DEVELOPMENT CONSIDERATIONS:
 * 
 * - Uses startsWith() to catch nested routes (e.g., /onboarding/step-1)
 * - Adjusts main content padding based on navigation visibility
 * - Client-side component to access pathname
 * - Maintains app layout consistency across regular pages
 * - Provides clean, distraction-free experience for special flows
 */