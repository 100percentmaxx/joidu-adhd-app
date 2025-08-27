import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * SIMPLE SUPABASE CONNECTION TEST
 * 
 * This endpoint provides a straightforward test of the Supabase connection
 * with clear error reporting and debugging information.
 */

export async function GET() {
  try {
    console.log('🔍 Testing Supabase connection...')

    // Check environment variables first
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        status: 'Configuration Error',
        error: 'Missing environment variables',
        details: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseKey
        }
      }, { status: 500 })
    }

    // Test basic connection with a simple query
    console.log('🔌 Testing basic connection...')
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .limit(1)
    
    if (error) {
      console.error('❌ Supabase query error:', error)
      
      // Check if it's a schema issue (tables don't exist)
      if (error.message.includes('Could not find') || error.message.includes('does not exist')) {
        return NextResponse.json({
          status: 'Schema Not Created',
          error: 'Database tables do not exist',
          details: {
            message: error.message,
            solution: 'Create the database schema using the SQL in /database/live-schema.sql'
          },
          connection: 'OK',
          timestamp: new Date().toISOString()
        }, { status: 200 }) // Not a connection error, just missing schema
      }
      
      return NextResponse.json({
        status: 'Connection Failed',
        error: error.message,
        details: error,
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }
    
    // Connection successful
    console.log('✅ Supabase connection successful')
    
    return NextResponse.json({
      status: 'Connected to Supabase successfully',
      connection: {
        url: `${supabaseUrl.substring(0, 30)}...`,
        tablesAccessible: true,
        userTableRows: Array.isArray(data) ? data.length : 0
      },
      environment: {
        hasUrl: true,
        hasKey: true,
        isLiveConnection: supabaseUrl.includes('idbutruwnjmcetuvybhz.supabase.co')
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Unexpected error:', error)
    
    return NextResponse.json({
      status: 'Unexpected Error',
      error: error instanceof Error ? error.message : 'Unknown error',
      type: error instanceof Error ? error.constructor.name : 'Unknown',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

/**
 * Test with table creation check
 */
export async function POST() {
  try {
    const tablesToTest = ['users', 'tasks', 'habits', 'schedule_events', 'kai_conversations']
    const results: Record<string, any> = {}
    
    for (const tableName of tablesToTest) {
      try {
        const { error } = await supabase
          .from(tableName)
          .select('*')
          .limit(1)
        
        results[tableName] = {
          exists: !error,
          error: error?.message || null
        }
      } catch (err) {
        results[tableName] = {
          exists: false,
          error: err instanceof Error ? err.message : 'Unknown error'
        }
      }
    }
    
    const allTablesExist = Object.values(results).every((result: any) => result.exists)
    
    return NextResponse.json({
      status: allTablesExist ? 'All Tables Accessible' : 'Some Tables Missing',
      tables: results,
      summary: {
        totalTables: tablesToTest.length,
        accessibleTables: Object.values(results).filter((r: any) => r.exists).length,
        schemaComplete: allTablesExist
      },
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    return NextResponse.json({
      status: 'Table Test Failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}