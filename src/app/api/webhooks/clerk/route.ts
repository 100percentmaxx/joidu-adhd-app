import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { createUser, getUser } from '@/lib/database'

/**
 * CLERK WEBHOOK HANDLER
 * 
 * This webhook automatically creates user profiles in Supabase when users
 * sign up through Clerk authentication. This ensures seamless integration
 * between Clerk auth and Supabase data storage.
 * 
 * SUPPORTED EVENTS:
 * - user.created: Create new user profile in database
 * - user.updated: Update user profile information
 * - user.deleted: Clean up user data (optional)
 * 
 * SETUP INSTRUCTIONS:
 * 1. Add CLERK_WEBHOOK_SECRET to environment variables
 * 2. Configure webhook endpoint in Clerk Dashboard:
 *    URL: https://your-domain.com/api/webhooks/clerk
 *    Events: user.created, user.updated
 */

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ''

if (!webhookSecret) {
  throw new Error('Missing CLERK_WEBHOOK_SECRET environment variable')
}

export async function POST(request: NextRequest) {
  try {
    // Get headers for webhook verification
    const headerPayload = headers()
    const svixId = headerPayload.get('svix-id')
    const svixTimestamp = headerPayload.get('svix-timestamp')
    const svixSignature = headerPayload.get('svix-signature')

    if (!svixId || !svixTimestamp || !svixSignature) {
      return NextResponse.json(
        { error: 'Missing required webhook headers' },
        { status: 400 }
      )
    }

    // Get the request body
    const payload = await request.text()

    // Verify the webhook signature
    const webhook = new Webhook(webhookSecret)
    let event: any

    try {
      event = webhook.verify(payload, {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      })
    } catch (error) {
      console.error('❌ Webhook verification failed:', error)
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 400 }
      )
    }

    // Handle different event types
    console.log('📨 Clerk webhook received:', event.type)

    switch (event.type) {
      case 'user.created':
        await handleUserCreated(event.data)
        break
        
      case 'user.updated':
        await handleUserUpdated(event.data)
        break
        
      case 'user.deleted':
        await handleUserDeleted(event.data)
        break
        
      default:
        console.log('ℹ️ Unhandled webhook event:', event.type)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('❌ Webhook processing failed:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

/**
 * Handle user creation - create profile in Supabase
 */
async function handleUserCreated(userData: any) {
  try {
    console.log('👤 Creating user profile for:', userData.id)

    // Extract user information from Clerk data
    const clerkUserId = userData.id
    const email = userData.email_addresses?.[0]?.email_address || ''
    const firstName = userData.first_name || ''
    const lastName = userData.last_name || ''
    const name = `${firstName} ${lastName}`.trim() || null

    // Check if user already exists (shouldn't happen, but safety first)
    const existingUser = await getUser(clerkUserId)
    if (existingUser) {
      console.log('ℹ️ User profile already exists:', existingUser.id)
      return
    }

    // Create user profile in Supabase
    const newUser = await createUser(clerkUserId, email, name || '')

    console.log('✅ User profile created successfully:', {
      id: newUser.id,
      clerkUserId: newUser.clerk_user_id,
      email: newUser.email,
      name: newUser.name
    })

    // Optional: Create welcome tasks or habits for new users
    await createWelcomeContent(newUser.id)

  } catch (error) {
    console.error('❌ Failed to create user profile:', error)
    // Don't throw - webhook should return success even if user creation fails
    // The user can still use the app, profile will be created on first app use
  }
}

/**
 * Handle user updates - sync profile information
 */
async function handleUserUpdated(userData: any) {
  try {
    console.log('📝 Updating user profile for:', userData.id)

    const clerkUserId = userData.id
    const email = userData.email_addresses?.[0]?.email_address || ''
    const firstName = userData.first_name || ''
    const lastName = userData.last_name || ''
    const name = `${firstName} ${lastName}`.trim() || null

    // Get existing user
    const existingUser = await getUser(clerkUserId)
    if (!existingUser) {
      // User doesn't exist, create them
      await handleUserCreated(userData)
      return
    }

    // Update user information if it has changed
    const needsUpdate = 
      existingUser.email !== email ||
      existingUser.name !== (name || '')

    if (needsUpdate) {
      // Note: You'd need to implement updateUser function in database.ts
      // await updateUser(clerkUserId, { email, name: name || '' })
      console.log('📝 User profile would be updated (updateUser function not implemented)')
    } else {
      console.log('ℹ️ No changes needed for user profile')
    }

  } catch (error) {
    console.error('❌ Failed to update user profile:', error)
  }
}

/**
 * Handle user deletion - cleanup user data
 */
async function handleUserDeleted(userData: any) {
  try {
    console.log('🗑️ Cleaning up user data for:', userData.id)

    // In a real app, you might want to:
    // 1. Anonymize user data instead of deleting
    // 2. Keep data for a retention period
    // 3. Export data before deletion
    
    // For now, just log the event
    console.log('ℹ️ User deletion handled (cleanup not implemented)')
    
    // If you want to actually delete:
    // const user = await getUser(userData.id)
    // if (user) {
    //   await supabase.from('users').delete().eq('id', user.id)
    // }

  } catch (error) {
    console.error('❌ Failed to cleanup user data:', error)
  }
}

/**
 * Create welcome content for new users
 */
async function createWelcomeContent(userId: string) {
  try {
    // Import the functions we need
    const { createTask, createHabit } = await import('@/lib/database')

    // Create welcome tasks
    const welcomeTasks = [
      {
        title: 'Welcome to Joidu! 👋',
        description: 'Take a moment to explore the app and see what features might help you.',
        category: 'personal' as const,
        estimated_minutes: 10,
        priority: 'high' as const
      },
      {
        title: 'Try the Just-One-Thing button',
        description: 'When you feel stuck, tap the orange lightning button for an AI suggestion.',
        category: 'personal' as const,
        estimated_minutes: 5,
        priority: 'medium' as const
      },
      {
        title: 'Set up your first habit',
        description: 'Start small! Even 2 minutes of a new habit can build momentum.',
        category: 'health' as const,
        estimated_minutes: 5,
        priority: 'medium' as const
      }
    ]

    for (const taskData of welcomeTasks) {
      await createTask(userId, taskData)
    }

    // Create welcome habits
    const welcomeHabits = [
      {
        title: 'Daily check-in with Joidu',
        description: 'Open the app and see what needs attention',
        category: 'personal',
        frequency: 'daily' as const,
        estimated_minutes: 3
      }
    ]

    for (const habitData of welcomeHabits) {
      await createHabit(userId, habitData)
    }

    console.log('🎉 Welcome content created for new user')

  } catch (error) {
    console.error('❌ Failed to create welcome content:', error)
    // Don't throw - user creation should still succeed
  }
}

/**
 * GET handler for webhook endpoint verification
 */
export async function GET() {
  return NextResponse.json({
    message: 'Clerk webhook endpoint is active',
    timestamp: new Date().toISOString()
  })
}

/**
 * SETUP INSTRUCTIONS:
 * 
 * 1. Add to .env.local:
 *    CLERK_WEBHOOK_SECRET=your_webhook_secret_from_clerk_dashboard
 * 
 * 2. In Clerk Dashboard → Webhooks:
 *    - Endpoint URL: https://your-domain.com/api/webhooks/clerk
 *    - Subscribe to events: user.created, user.updated
 *    - Copy the webhook secret to your environment variables
 * 
 * 3. For local development, use ngrok or similar to expose localhost:
 *    ngrok http 3000
 *    Then use the ngrok URL + /api/webhooks/clerk
 * 
 * 4. Test the webhook:
 *    - Register a new user in your app
 *    - Check Clerk Dashboard → Webhooks → Logs
 *    - Verify user profile was created in Supabase
 */