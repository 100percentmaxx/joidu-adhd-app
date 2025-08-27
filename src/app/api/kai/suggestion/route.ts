import { NextRequest, NextResponse } from 'next/server'

/**
 * KAI SUGGESTION API ENDPOINT
 * 
 * This endpoint provides AI-powered "Just One Thing" suggestions for ADHD users
 * who are feeling stuck or overwhelmed. It analyzes user context and returns
 * a single, actionable task suggestion.
 * 
 * ENDPOINT: POST /api/kai/suggestion
 * 
 * REQUEST BODY:
 * {
 *   userContext: {
 *     currentScreen: string,      // Current page/route user is on
 *     recentTasks: Task[],        // Recent task activity
 *     timeOfDay: number,          // Hour of day (0-23)
 *     userState: 'overwhelmed' | 'focused' | 'neutral',
 *     availableTime: 'short' | 'medium' | 'long'
 *   },
 *   requestType: 'just-one-thing' | 'task-breakdown' | 'focus-suggestion'
 * }
 * 
 * RESPONSE:
 * {
 *   suggestion: {
 *     task: string,
 *     reasoning: string,
 *     estimatedTime: string,
 *     category: string,
 *     priority: 'low' | 'medium' | 'high'
 *   }
 * }
 */

interface UserContext {
  currentScreen?: string
  recentTasks?: any[]
  timeOfDay?: number
  userState?: 'overwhelmed' | 'focused' | 'neutral'
  availableTime?: 'short' | 'medium' | 'long'
}

interface SuggestionRequest {
  userContext: UserContext
  requestType: 'just-one-thing' | 'task-breakdown' | 'focus-suggestion'
  userId?: string
}

interface TaskSuggestion {
  task: string
  reasoning: string
  estimatedTime: string
  category: string
  priority: 'low' | 'medium' | 'high'
  icon?: string
  color?: string
}

export async function POST(request: NextRequest) {
  try {
    const { userContext, requestType, userId }: SuggestionRequest = await request.json()

    // Validate request
    if (!userContext || !requestType) {
      return NextResponse.json(
        { error: 'Missing required fields: userContext and requestType' },
        { status: 400 }
      )
    }

    // TODO: Replace with actual Claude API integration
    // const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    
    // For now, return contextual mock suggestions
    const suggestion = generateContextualSuggestion(userContext, requestType)
    
    console.log('🤖 AI suggestion requested:', {
      requestType,
      userState: userContext.userState,
      timeOfDay: userContext.timeOfDay,
      currentScreen: userContext.currentScreen,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({ 
      suggestion,
      timestamp: new Date().toISOString(),
      requestId: `kai-${Date.now()}`
    })

  } catch (error) {
    console.error('❌ AI suggestion failed:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to get AI suggestion',
        fallback: {
          task: "Take 3 deep breaths",
          reasoning: "Sometimes the best thing is to just breathe and reset",
          estimatedTime: "1 minute",
          category: "wellness",
          priority: "high"
        }
      },
      { status: 500 }
    )
  }
}

/**
 * Generate contextual suggestions based on user state and time
 * This simulates AI logic until real Claude integration is implemented
 */
function generateContextualSuggestion(context: UserContext, requestType: string): TaskSuggestion {
  const { timeOfDay = new Date().getHours(), userState = 'neutral', currentScreen } = context

  // Morning suggestions (6-11 AM)
  if (timeOfDay >= 6 && timeOfDay < 12) {
    if (userState === 'overwhelmed') {
      return {
        task: "Write down just 3 things you want to accomplish today",
        reasoning: "Morning overwhelm is common with ADHD. Start with a brain dump to clear your head.",
        estimatedTime: "5 minutes",
        category: "planning",
        priority: "high",
        color: "#4ade80",
        icon: "planning.svg"
      }
    }
    
    return {
      task: "Reply to one important email",
      reasoning: "Morning energy is perfect for communication. Pick the most urgent one.",
      estimatedTime: "10 minutes", 
      category: "work",
      priority: "medium",
      color: "#f9dac5",
      icon: "work.svg"
    }
  }

  // Afternoon suggestions (12-17 PM)
  if (timeOfDay >= 12 && timeOfDay < 17) {
    if (userState === 'overwhelmed') {
      return {
        task: "Do a 5-minute desk cleanup",
        reasoning: "Afternoon brain fog hits hard. A quick tidy can refresh your mental space.",
        estimatedTime: "5 minutes",
        category: "personal",
        priority: "medium",
        color: "#f59e0b", 
        icon: "personal.svg"
      }
    }
    
    return {
      task: "Drink a full glass of water",
      reasoning: "Afternoon is prime dehydration time. Your ADHD brain needs fuel.",
      estimatedTime: "2 minutes",
      category: "health",
      priority: "high",
      color: "#4ade80",
      icon: "health.svg"
    }
  }

  // Evening suggestions (17+ PM)
  if (timeOfDay >= 17) {
    return {
      task: "Text one person you care about",
      reasoning: "Evening is perfect for connection. A simple 'thinking of you' text counts.",
      estimatedTime: "3 minutes",
      category: "social",
      priority: "low",
      color: "#a78bfa",
      icon: "social.svg"
    }
  }

  // Default fallback
  return {
    task: "Stand up and stretch for 30 seconds",
    reasoning: "Your body and brain need movement to stay focused.",
    estimatedTime: "1 minute",
    category: "wellness",
    priority: "medium",
    color: "#4ade80",
    icon: "health.svg"
  }
}

/**
 * FUTURE CLAUDE INTEGRATION:
 * 
 * When ANTHROPIC_API_KEY is available, replace generateContextualSuggestion with:
 * 
 * async function generateClaudeSuggestion(context: UserContext, requestType: string): Promise<TaskSuggestion> {
 *   const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
 * 
 *   const prompt = `You are Kai, an ADHD-friendly AI assistant. A user is feeling ${context.userState || 'neutral'} 
 *   and needs help with a "${requestType}" suggestion. Current time: ${context.timeOfDay}:00.
 * 
 *   Context: ${JSON.stringify(context)}
 * 
 *   Provide ONE specific, actionable task suggestion that:
 *   - Takes 15 minutes or less
 *   - Is achievable right now
 *   - Builds momentum without overwhelming
 *   - Uses encouraging, ADHD-friendly language
 * 
 *   Format your response as JSON:
 *   {
 *     "task": "specific action to take",
 *     "reasoning": "why this helps right now", 
 *     "estimatedTime": "X minutes",
 *     "category": "work|personal|health|social|creative|planning",
 *     "priority": "low|medium|high"
 *   }`
 * 
 *   const message = await anthropic.messages.create({
 *     model: 'claude-3-sonnet-20240229',
 *     max_tokens: 300,
 *     messages: [{ role: 'user', content: prompt }]
 *   })
 * 
 *   return JSON.parse(message.content[0].text)
 * }
 */