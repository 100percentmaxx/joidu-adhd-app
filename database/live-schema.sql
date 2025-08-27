-- ============================================
-- JOIDU ADHD APP - LIVE SUPABASE DATABASE SCHEMA
-- ============================================
-- Execute this SQL in the Supabase SQL Editor
-- to create all required tables with proper security

-- Users table (connected to Clerk)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  preferences JSONB DEFAULT '{"adhdPreferences": {"colorCoding": true, "audioReminders": false, "focusMode": "standard", "breakInterval": 25, "preferredTaskSize": "medium"}}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('work', 'health', 'personal', 'social', 'creative', 'finance')),
  is_completed BOOLEAN DEFAULT FALSE,
  estimated_minutes INTEGER,
  actual_minutes INTEGER,
  due_date TIMESTAMP WITH TIME ZONE,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Schedule events table
CREATE TABLE schedule_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  category TEXT NOT NULL CHECK (category IN ('work', 'health', 'personal', 'social', 'creative', 'finance')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habits table
CREATE TABLE habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('work', 'health', 'personal', 'social', 'creative', 'finance')),
  frequency TEXT NOT NULL CHECK (frequency IN ('daily', 'weekdays', 'threePerWeek', 'custom')),
  streak INTEGER DEFAULT 0,
  best_streak INTEGER DEFAULT 0,
  total_completions INTEGER DEFAULT 0,
  last_completed TIMESTAMP WITH TIME ZONE,
  target_time TIME,
  estimated_minutes INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habit completions table for tracking individual completions
CREATE TABLE habit_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  mood_before TEXT,
  mood_after TEXT,
  difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5),
  notes TEXT
);

-- KaiHelp conversation table for AI chat history
CREATE TABLE kai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  context JSONB DEFAULT '{}',
  user_mood TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE kai_conversations ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies (users can only access their own data)
-- Note: These policies use auth.jwt() which works with Clerk authentication

-- Users table policies
CREATE POLICY "Users can view own profile" ON users 
  FOR SELECT USING (clerk_user_id = auth.jwt() ->> 'sub');
  
CREATE POLICY "Users can update own profile" ON users 
  FOR UPDATE USING (clerk_user_id = auth.jwt() ->> 'sub');

CREATE POLICY "Users can insert own profile" ON users 
  FOR INSERT WITH CHECK (clerk_user_id = auth.jwt() ->> 'sub');

-- Tasks table policies
CREATE POLICY "Users can manage own tasks" ON tasks 
  FOR ALL USING (user_id IN (
    SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'
  ));

-- Schedule events table policies
CREATE POLICY "Users can manage own events" ON schedule_events 
  FOR ALL USING (user_id IN (
    SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'
  ));

-- Habits table policies
CREATE POLICY "Users can manage own habits" ON habits 
  FOR ALL USING (user_id IN (
    SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'
  ));

-- Habit completions table policies
CREATE POLICY "Users can manage own habit completions" ON habit_completions 
  FOR ALL USING (user_id IN (
    SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'
  ));

-- Kai conversations table policies
CREATE POLICY "Users can manage own kai conversations" ON kai_conversations 
  FOR ALL USING (user_id IN (
    SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'
  ));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to update updated_at automatically
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_users_clerk_user_id ON users(clerk_user_id);
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_created_at ON tasks(created_at DESC);
CREATE INDEX idx_habits_user_id ON habits(user_id);
CREATE INDEX idx_habit_completions_habit_id ON habit_completions(habit_id);
CREATE INDEX idx_kai_conversations_user_id ON kai_conversations(user_id);

-- Insert sample data for testing (optional - remove in production)
-- This will be created automatically when users sign up via Clerk webhook

COMMENT ON TABLE users IS 'User profiles connected to Clerk authentication';
COMMENT ON TABLE tasks IS 'ADHD-friendly task management with time estimates and priorities';
COMMENT ON TABLE habits IS 'Habit tracking with streaks and frequency settings';
COMMENT ON TABLE habit_completions IS 'Individual habit completion records for analytics';
COMMENT ON TABLE kai_conversations IS 'AI chat history for KaiHelp assistant';
COMMENT ON TABLE schedule_events IS 'Calendar events and scheduled activities';

-- Success message
SELECT 'Joidu database schema created successfully! 🎉' AS message;