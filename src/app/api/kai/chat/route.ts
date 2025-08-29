import { NextRequest, NextResponse } from 'next/server';
import { KAI_SYSTEM_PROMPT, getContextualPrompt } from '@/lib/kai-config';
import { callClaude } from '@/lib/anthropic';

/**
 * KAI CHAT API ENDPOINT WITH FULL AI INTEGRATION
 * 
 * This endpoint handles conversations with Kai using the complete ADHD-specific
 * personality system and Claude AI integration for empathetic, contextual responses.
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
 *     userTasks?: any[],        // User's current tasks
 *     timeOfDay?: number,       // Hour of day for context
 *     userEnergyLevel?: 'low' | 'medium' | 'high',
 *     recentActivity?: string,  // Recent user activity
 *     recentResponses?: string[], // For response variation
 *     userMood?: 'overwhelmed' | 'focused' | 'neutral' | 'frustrated'
 *   }
 * }
 * 
 * RESPONSE:
 * {
 *   response: {
 *     message: string,
 *     suggestions?: string[],
 *     tone: string,
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
  userTasks?: any[]
  timeOfDay?: number
  userEnergyLevel?: 'low' | 'medium' | 'high'
  recentActivity?: string
  recentResponses?: string[]
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
  tone: string
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

    const fullPrompt = KAI_SYSTEM_PROMPT + "\n\n" + getContextualPrompt(context || {});
    
    const userPrompt = `User message: "${message}"
    
    Please respond as Kai with:
    - Empathetic acknowledgment of their situation
    - Specific, actionable ADHD-friendly suggestions (2-3 options)
    - Encouraging tone without toxic positivity
    - Keep response under 150 words for ADHD attention spans
    
    Focus on practical help while validating their ADHD experience.`;

    const newConversationId = conversationId || `conv-${Date.now()}`

    if (process.env.ANTHROPIC_API_KEY) {
      const response = await callClaude(fullPrompt, userPrompt);
      
      const chatResponse: ChatResponse = {
        message: response.content,
        suggestions: [
          "Take a 5-minute brain break",
          "Let's break this into smaller steps", 
          "Try the 2-minute rule"
        ],
        tone: "supportive"
      };

      return NextResponse.json({
        response: chatResponse,
        conversationId: newConversationId,
        timestamp: new Date().toISOString(),
        messageId: `msg-${Date.now()}`
      });
    } else {
      // Enhanced fallback system with ADHD personality
      const response = generateKaiResponse(message.trim(), context)
      
      return NextResponse.json({
        response,
        conversationId: newConversationId,
        timestamp: new Date().toISOString(),
        messageId: `msg-${Date.now()}`
      });
    }

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
          ],
          tone: "gentle"
        }
      },
      { status: 500 }
    )
  }
}

/**
 * Generate ADHD-friendly responses with enhanced personality
 * Enhanced fallback system that maintains Kai's empathetic approach
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
      tone: "empathetic",
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
      tone: "encouraging",
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
      tone: "understanding",
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
      tone: "playful",
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
      tone: "validating",
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
      tone: "welcoming",
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
    tone: "supportive",
    quickActions: [
      { text: "Get a suggestion", action: "suggestion", route: "/just-one-thing" },
      { text: "Start a focus session", action: "focus", route: "/focus/setup" },
      { text: "Browse my tasks", action: "tasks", route: "/tasks" }
    ]
  }
}

/**
 * CLAUDE AI INTEGRATION COMPLETE ✅
 * 
 * This endpoint now uses the full Kai personality system with Claude AI:
 * 
 * KEY FEATURES:
 * - ADHD-specific empathy and understanding built into system prompt
 * - Contextual responses based on user state, energy level, and time of day
 * - Response variation system to avoid repetitive interactions
 * - Comprehensive fallback system for development and error scenarios
 * - Tone detection and matching for appropriate emotional responses
 * 
 * PERSONALITY TRAITS:
 * - Validates ADHD experience without minimizing challenges
 * - Uses "we" language to create collaborative feeling
 * - Offers specific, actionable micro-steps
 * - Celebrates small wins and progress
 * - Maintains encouraging tone without toxic positivity
 * 
 * The AI integration provides personalized, empathetic chat responses
 * that truly understand and support ADHD users in their daily challenges.
 */