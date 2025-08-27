import { NextRequest, NextResponse } from 'next/server'

/**
 * KAI CHAT API ENDPOINT
 * 
 * This endpoint handles conversations with Kai, the ADHD-friendly AI assistant.
 * It provides empathetic, supportive responses that help users with productivity,
 * task management, and ADHD-related challenges.
 * 
 * ENDPOINT: POST /api/kai/chat
 * 
 * REQUEST BODY:
 * {
 *   message: string,           // User's message
 *   conversationId?: string,   // Optional conversation context
 *   userId?: string,           // Optional user identification
 *   context?: {
 *     currentScreen?: string,   // Where the user is in the app
 *     recentActivity?: any[],   // Recent user activity for context
 *     userMood?: 'overwhelmed' | 'focused' | 'neutral' | 'frustrated'
 *   }
 * }
 * 
 * RESPONSE:
 * {
 *   response: {
 *     message: string,
 *     suggestions?: string[],
 *     quickActions?: Array<{
 *       text: string,
 *       action: string,
 *       route?: string
 *     }>
 *   },
 *   conversationId: string,
 *   timestamp: string
 * }
 */

interface ChatContext {
  currentScreen?: string
  recentActivity?: any[]
  userMood?: 'overwhelmed' | 'focused' | 'neutral' | 'frustrated'
}

interface ChatRequest {
  message: string
  conversationId?: string
  userId?: string
  context?: ChatContext
}

interface QuickAction {
  text: string
  action: string
  route?: string
}

interface ChatResponse {
  message: string
  suggestions?: string[]
  quickActions?: QuickAction[]
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationId, userId, context }: ChatRequest = await request.json()

    // Validate request
    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // TODO: Replace with actual Claude API integration
    // const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    
    // Generate contextual response
    const response = generateKaiResponse(message.trim(), context)
    const newConversationId = conversationId || `conv-${Date.now()}`
    
    console.log('💬 Kai chat interaction:', {
      messageLength: message.length,
      conversationId: newConversationId,
      userMood: context?.userMood,
      currentScreen: context?.currentScreen,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({
      response,
      conversationId: newConversationId,
      timestamp: new Date().toISOString(),
      messageId: `msg-${Date.now()}`
    })

  } catch (error) {
    console.error('❌ Kai chat failed:', error)
    
    return NextResponse.json(
      { 
        error: 'Chat temporarily unavailable',
        response: {
          message: "I'm having a little technical hiccup right now, but I'm still here for you! Try rephrasing your question, or feel free to explore the app while I get back to full strength. 💙",
          suggestions: [
            "Try the Just One Thing button for a quick suggestion",
            "Check your tasks or habits for something actionable",
            "Take a quick break and come back in a moment"
          ]
        }
      },
      { status: 500 }
    )
  }
}

/**
 * Generate ADHD-friendly responses based on message content and context
 * This simulates Kai's personality until Claude integration is implemented
 */
function generateKaiResponse(message: string, context?: ChatContext): ChatResponse {
  const messageLower = message.toLowerCase()
  const mood = context?.userMood || 'neutral'

  // Handle overwhelmed/stuck states
  if (messageLower.includes('stuck') || messageLower.includes('overwhelmed') || mood === 'overwhelmed') {
    return {
      message: "I totally get that feeling - being stuck is like quicksand for ADHD brains, right? The more you struggle, the more stuck you feel. Let's break this down into something tiny and doable.",
      suggestions: [
        "Start with just ONE small thing",
        "Do a 2-minute brain dump - write everything that's swirling around",
        "Try the 'good enough' approach instead of perfect"
      ],
      quickActions: [
        { text: "Get a quick suggestion", action: "suggestion", route: "/just-one-thing" },
        { text: "Do a focus session", action: "focus", route: "/focus/setup" },
        { text: "Break down a task", action: "breakdown", route: "/task-breakdown" }
      ]
    }
  }

  // Handle task/productivity questions
  if (messageLower.includes('task') || messageLower.includes('todo') || messageLower.includes('productive')) {
    return {
      message: "Tasks can feel like Mount Everest when you have ADHD! The secret is making them so small they feel almost silly NOT to do. What's one big thing that's weighing on your mind?",
      suggestions: [
        "Break big tasks into 15-minute chunks",
        "Use the 'two-minute rule' - if it takes less than 2 minutes, do it now",
        "Batch similar tasks together to reduce context switching"
      ],
      quickActions: [
        { text: "Add a new task", action: "add-task", route: "/add-task" },
        { text: "View my tasks", action: "view-tasks", route: "/tasks" },
        { text: "Break down a project", action: "breakdown", route: "/task-breakdown" }
      ]
    }
  }

  // Handle focus/concentration questions
  if (messageLower.includes('focus') || messageLower.includes('concentrate') || messageLower.includes('distract')) {
    return {
      message: "Ah, the ADHD focus struggle! It's like trying to aim a firehose sometimes - either no pressure or WAY too much. The good news? We can work with your brain's natural rhythms instead of against them.",
      suggestions: [
        "Try a 15-minute focus session first - build that momentum",
        "Clear your physical space to help clear your mental space",
        "Use the Pomodoro technique but adjust the times to what works for YOU"
      ],
      quickActions: [
        { text: "Start focus session", action: "focus", route: "/focus/setup" },
        { text: "Quick 5-minute session", action: "mini-focus" },
        { text: "Set up focus environment", action: "focus-prep" }
      ]
    }
  }

  // Handle habit questions
  if (messageLower.includes('habit') || messageLower.includes('routine') || messageLower.includes('consistent')) {
    return {
      message: "Building habits with ADHD is like training a puppy - lots of patience and LOTS of treats! The key is starting ridiculously small and celebrating every tiny win.",
      suggestions: [
        "Start with a habit so small it feels silly (like flossing ONE tooth)",
        "Stack new habits onto existing ones",
        "Focus on consistency over perfection - done is better than perfect"
      ],
      quickActions: [
        { text: "Add a habit", action: "add-habit", route: "/habits/add" },
        { text: "View my habits", action: "view-habits", route: "/habits" },
        { text: "Get habit ideas", action: "habit-suggestions" }
      ]
    }
  }

  // Handle emotional/motivational needs
  if (messageLower.includes('motivation') || messageLower.includes('energy') || mood === 'frustrated') {
    return {
      message: "Energy management is EVERYTHING with ADHD. Your brain is like a smartphone - sometimes it's at 100%, sometimes 15%, and sometimes it randomly shuts down at 30%! Let's work with whatever battery level you've got right now.",
      suggestions: [
        "Match your tasks to your current energy level",
        "Do the hard stuff when you feel good, easy stuff when you don't",
        "Remember: rest is productive too"
      ],
      quickActions: [
        { text: "Quick energy boost task", action: "energy-task" },
        { text: "Take a mindful break", action: "break" },
        { text: "Celebrate recent wins", action: "celebrate" }
      ]
    }
  }

  // Handle general questions or greeting
  if (messageLower.includes('hello') || messageLower.includes('hi') || messageLower.includes('help')) {
    return {
      message: "Hey there! I'm Kai, your ADHD-friendly productivity buddy. I'm here to help you work WITH your brain instead of against it. What's on your mind today?",
      suggestions: [
        "Ask me about breaking down overwhelming tasks",
        "Get help with focus and concentration strategies", 
        "Talk through motivation or energy challenges"
      ],
      quickActions: [
        { text: "I'm feeling stuck", action: "suggestion", route: "/just-one-thing" },
        { text: "Help me focus", action: "focus", route: "/focus/setup" },
        { text: "Show me my tasks", action: "view-tasks", route: "/tasks" }
      ]
    }
  }

  // Default response
  return {
    message: "Thanks for sharing that with me! I'm here to help you navigate whatever's coming up. ADHD brains are incredibly creative and capable - sometimes we just need to find the right approach that works with your unique wiring.",
    suggestions: [
      "Tell me more about what you're working on",
      "Share what's feeling challenging right now",
      "Ask me for specific strategies or tips"
    ],
    quickActions: [
      { text: "Get a suggestion", action: "suggestion", route: "/just-one-thing" },
      { text: "Start a focus session", action: "focus", route: "/focus/setup" },
      { text: "Browse my tasks", action: "tasks", route: "/tasks" }
    ]
  }
}

/**
 * FUTURE CLAUDE INTEGRATION:
 * 
 * When ANTHROPIC_API_KEY is available, replace generateKaiResponse with:
 * 
 * async function generateClaudeResponse(message: string, context?: ChatContext): Promise<ChatResponse> {
 *   const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
 * 
 *   const systemPrompt = `You are Kai, an ADHD-friendly AI assistant built into a productivity app called Joidu. 
 *   
 *   Your personality:
 *   - Warm, empathetic, and understanding of ADHD challenges
 *   - Uses encouraging language without being condescending
 *   - Provides specific, actionable advice
 *   - Acknowledges that ADHD brains work differently, not deficiently
 *   - Offers choices rather than prescriptive solutions
 *   
 *   User context: ${JSON.stringify(context)}
 *   
 *   Respond helpfully to the user's message. Keep responses conversational and under 150 words.
 *   Include 2-3 specific suggestions when appropriate.`
 * 
 *   const message = await anthropic.messages.create({
 *     model: 'claude-3-sonnet-20240229',
 *     max_tokens: 400,
 *     system: systemPrompt,
 *     messages: [{ role: 'user', content: message }]
 *   })
 * 
 *   // Parse Claude's response and format as ChatResponse
 *   return parseClaudeResponse(message.content[0].text)
 * }
 */