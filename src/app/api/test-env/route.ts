import { NextResponse } from 'next/server'

/**
 * ENVIRONMENT VARIABLES TEST ENDPOINT
 * 
 * This endpoint verifies that all required environment variables
 * are properly configured for the Joidu app to function correctly.
 * 
 * ENDPOINT: GET /api/test-env
 */

export async function GET() {
  try {
    // Check all environment variables
    const envCheck = {
      // Supabase Configuration
      supabase: {
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        urlPrefix: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) || 'missing',
        isLiveConnection: process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('idbutruwnjmcetuvybhz.supabase.co') || false
      },
      
      // Clerk Authentication
      clerk: {
        hasPublishableKey: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        hasSecretKey: !!process.env.CLERK_SECRET_KEY,
        hasWebhookSecret: !!process.env.CLERK_WEBHOOK_SECRET,
        publishableKeyPrefix: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.substring(0, 20) || 'missing'
      },
      
      // AI Integration
      ai: {
        hasAnthropicKey: !!process.env.ANTHROPIC_API_KEY
      },
      
      // General
      nodeEnv: process.env.NODE_ENV || 'unknown',
      nextjsEnv: process.env.NEXT_PUBLIC_VERCEL_ENV || 'local'
    }
    
    // Calculate overall status
    const criticalMissing = !envCheck.supabase.hasUrl || 
                           !envCheck.supabase.hasAnonKey || 
                           !envCheck.clerk.hasPublishableKey ||
                           !envCheck.clerk.hasSecretKey
    
    const warnings = []
    
    if (!envCheck.supabase.hasServiceKey) warnings.push('SUPABASE_SERVICE_ROLE_KEY missing (optional)')
    if (!envCheck.clerk.hasWebhookSecret) warnings.push('CLERK_WEBHOOK_SECRET missing (needed for webhooks)')
    if (!envCheck.ai.hasAnthropicKey) warnings.push('ANTHROPIC_API_KEY missing (needed for AI features)')
    
    const status = criticalMissing ? 'CRITICAL_MISSING' : warnings.length > 0 ? 'WARNINGS' : 'ALL_CONFIGURED'
    
    return NextResponse.json({
      status: status,
      message: criticalMissing 
        ? 'Critical environment variables are missing' 
        : warnings.length > 0 
          ? 'All critical variables present, some optional ones missing'
          : 'All environment variables configured correctly',
      environment: envCheck,
      warnings: warnings,
      ready: !criticalMissing,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('❌ Environment check failed:', error)
    
    return NextResponse.json({
      status: 'ERROR',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

/**
 * POST endpoint for detailed environment debugging
 */
export async function POST() {
  try {
    const allEnvKeys = Object.keys(process.env)
    const joiduRelatedKeys = allEnvKeys.filter(key => 
      key.includes('SUPABASE') || 
      key.includes('CLERK') || 
      key.includes('ANTHROPIC') ||
      key.includes('NEXT_PUBLIC')
    )
    
    const envDetails: Record<string, any> = {}
    
    joiduRelatedKeys.forEach(key => {
      const value = process.env[key]
      envDetails[key] = {
        exists: !!value,
        length: value?.length || 0,
        preview: value ? `${value.substring(0, 10)}...` : 'undefined'
      }
    })
    
    return NextResponse.json({
      status: 'Environment Debug Info',
      totalEnvVars: allEnvKeys.length,
      joiduRelatedVars: joiduRelatedKeys.length,
      details: envDetails,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    return NextResponse.json({
      status: 'Debug Failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}