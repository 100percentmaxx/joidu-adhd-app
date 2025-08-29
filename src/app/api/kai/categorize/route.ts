import { NextRequest, NextResponse } from 'next/server';
import { callClaude } from '@/lib/anthropic';

/**
 * KAI TASK CATEGORIZATION ENDPOINT
 * 
 * This endpoint automatically categorizes tasks using ADHD-aware AI to help users
 * better organize their workload based on energy levels, cognitive load, and context.
 * 
 * ENDPOINT: POST /api/kai/categorize
 * 
 * REQUEST BODY:
 * {
 *   taskTitle: string,
 *   taskDescription?: string
 * }
 * 
 * RESPONSE:
 * {
 *   category: 'work' | 'health' | 'personal' | 'social' | 'creative' | 'finance'
 * }
 */

interface CategorizeRequest {
  taskTitle: string
  taskDescription?: string
}

export async function POST(request: NextRequest) {
  try {
    const { taskTitle, taskDescription }: CategorizeRequest = await request.json()

    // Validate request
    if (!taskTitle || !taskTitle.trim()) {
      return NextResponse.json(
        { error: 'Task title is required' },
        { status: 400 }
      )
    }

    const systemPrompt = `You are an AI that categorizes tasks for ADHD users. Categories: work, health, personal, social, creative, finance.
    
    Consider ADHD-specific needs:
    - Energy levels required
    - Time sensitivity
    - Cognitive load
    - Social vs solo work`;

    const userPrompt = `Categorize this task: "${taskTitle}" ${taskDescription ? `- ${taskDescription}` : ''}
    
    Respond with just the category name: work, health, personal, social, creative, or finance`;

    if (process.env.ANTHROPIC_API_KEY) {
      const response = await callClaude(systemPrompt, userPrompt, 50);
      const category = response.content.toLowerCase().trim();
      
      const validCategories = ['work', 'health', 'personal', 'social', 'creative', 'finance'];
      const finalCategory = validCategories.includes(category) ? category : 'personal';
      
      return NextResponse.json({ 
        category: finalCategory,
        confidence: 'high',
        timestamp: new Date().toISOString()
      });
    } else {
      // Fallback categorization logic
      const category = categorizeFallback(taskTitle, taskDescription);
      
      return NextResponse.json({ 
        category,
        confidence: 'fallback',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('❌ Task categorization failed:', error);
    
    return NextResponse.json({ 
      category: 'personal',
      confidence: 'error-fallback',
      timestamp: new Date().toISOString()
    });
  }
}

/**
 * Fallback categorization logic for development/backup
 */
function categorizeFallback(taskTitle: string, taskDescription?: string): string {
  const text = `${taskTitle} ${taskDescription || ''}`.toLowerCase();

  // Work-related keywords
  if (text.match(/\b(meeting|email|project|deadline|work|job|presentation|report|client|boss|team|office)\b/)) {
    return 'work';
  }

  // Health-related keywords
  if (text.match(/\b(doctor|dentist|exercise|workout|medication|health|therapy|appointment|gym|run|walk)\b/)) {
    return 'health';
  }

  // Social-related keywords
  if (text.match(/\b(call|text|friend|family|dinner|party|date|social|visit|birthday|wedding)\b/)) {
    return 'social';
  }

  // Creative-related keywords
  if (text.match(/\b(write|draw|paint|design|create|art|music|photo|blog|craft|hobby)\b/)) {
    return 'creative';
  }

  // Finance-related keywords
  if (text.match(/\b(pay|bill|budget|bank|money|tax|insurance|invest|finance|purchase|buy)\b/)) {
    return 'finance';
  }

  // Default to personal
  return 'personal';
}