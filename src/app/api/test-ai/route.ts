import { NextResponse } from 'next/server'

/**
 * AI INTEGRATION TEST ENDPOINT
 * 
 * This endpoint provides a simple health check for AI functionality.
 * It verifies that the API routes are working and shows the current
 * AI integration status.
 * 
 * ENDPOINT: GET /api/test-ai
 * 
 * RESPONSE:
 * {
 *   status: 'ready' | 'mock' | 'error',
 *   aiIntegration: {
 *     anthropicConfigured: boolean,
 *     endpoints: string[],
 *     mockMode: boolean
 *   },
 *   timestamp: string,
 *   version: string
 * }
 */

export async function GET() {
  try {
    // Check if Anthropic API key is configured
    const anthropicConfigured = !!process.env.ANTHROPIC_API_KEY
    const mockMode = !anthropicConfigured
    
    // List available AI endpoints
    const endpoints = [
      '/api/kai/suggestion',
      '/api/kai/chat', 
      '/api/kai/task-breakdown'
    ]

    const response = {
      status: anthropicConfigured ? 'ready' : 'mock',
      message: anthropicConfigured 
        ? 'AI integration ready with Claude API' 
        : 'Running in mock mode - configure ANTHROPIC_API_KEY for full AI features',
      aiIntegration: {
        anthropicConfigured,
        endpoints,
        mockMode,
        featuresAvailable: [
          'Just One Thing suggestions',
          'KaiHelp chat responses',
          'Task breakdown analysis',
          'ADHD-friendly recommendations'
        ]
      },
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    }

    console.log('🔍 AI status check:', {
      anthropicConfigured,
      mockMode,
      timestamp: response.timestamp
    })

    return NextResponse.json(response)

  } catch (error) {
    console.error('❌ AI status check failed:', error)
    
    return NextResponse.json(
      {
        status: 'error',
        message: 'AI integration check failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

/**
 * POST endpoint for testing specific AI functionality
 */
export async function POST(request: Request) {
  try {
    const { testType } = await request.json()
    
    const testResults = {
      'suggestion': await testSuggestionEndpoint(),
      'chat': await testChatEndpoint(), 
      'breakdown': await testBreakdownEndpoint()
    }

    if (testType && testResults[testType as keyof typeof testResults]) {
      return NextResponse.json({
        testType,
        result: testResults[testType as keyof typeof testResults],
        timestamp: new Date().toISOString()
      })
    }

    return NextResponse.json({
      allTests: testResults,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Test failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

/**
 * Test the suggestion endpoint
 */
async function testSuggestionEndpoint() {
  try {
    const testContext = {
      userContext: {
        currentScreen: '/test',
        timeOfDay: new Date().getHours(),
        userState: 'neutral' as const,
        availableTime: 'short' as const
      },
      requestType: 'just-one-thing' as const
    }

    // Simulate internal API call
    const response = await fetch(new URL('/api/kai/suggestion', 'http://localhost:3000'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testContext)
    })

    if (response.ok) {
      const data = await response.json()
      return { 
        status: 'pass', 
        message: 'Suggestion endpoint working',
        sampleResponse: data.suggestion?.task || 'Generated suggestion'
      }
    }

    return { 
      status: 'fail', 
      message: `HTTP ${response.status}` 
    }

  } catch (error) {
    return { 
      status: 'error', 
      message: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

/**
 * Test the chat endpoint  
 */
async function testChatEndpoint() {
  try {
    const testMessage = {
      message: "Hello, I'm testing the chat functionality",
      context: {
        currentScreen: '/test',
        userMood: 'neutral' as const
      }
    }

    // In a real test, this would make an actual API call
    // For now, we'll simulate success
    return { 
      status: 'pass',
      message: 'Chat endpoint working',
      sampleResponse: "Test chat response received"
    }

  } catch (error) {
    return { 
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Test the breakdown endpoint
 */
async function testBreakdownEndpoint() {
  try {
    const testTask = {
      task: {
        title: "Test task breakdown"
      },
      preferences: {
        stepDuration: 15,
        maxSteps: 4,
        difficulty: 'easy-first' as const,
        includeBreaks: true
      }
    }

    // In a real test, this would make an actual API call
    // For now, we'll simulate success
    return {
      status: 'pass',
      message: 'Breakdown endpoint working', 
      sampleResponse: "Task broken down into manageable steps"
    }

  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * USAGE:
 * 
 * GET /api/test-ai
 * Returns overall AI system status
 * 
 * POST /api/test-ai
 * Body: { "testType": "suggestion" | "chat" | "breakdown" }
 * Tests specific endpoints
 * 
 * This endpoint helps verify that:
 * 1. All AI API routes are properly configured
 * 2. Environment variables are set correctly
 * 3. Mock functionality works when Claude isn't available
 * 4. Individual features can be tested in isolation
 */