-- JOIDU ADHD TASK MANAGEMENT APP - DATABASE SCHEMA
-- This SQL file creates the complete database schema for Supabase
-- Run this in your Supabase SQL Editor

-- =====================================================
-- USERS TABLE (Connected to Clerk Authentication)
-- =====================================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  preferences JSONB DEFAULT '{
    "adhdPreferences": {
      "preferredStepDuration": 15,
      "maxStepsPerSession": 4,
      "includeBreaks": true,
      "difficultyPreference": "easy-first",
      "motivationLevel": "medium"
    },
    "notificationSettings": {
      "enableBreakReminders": true,
      "enableCelebrations": true,
      "quietHours": {
        "enabled": false,
        "startTime": "22:00",
        "endTime": "08:00"
      }
    },
    "uiPreferences": {
      "theme": "light",
      "textSize": "medium",
      "reduceMotion": false
    }
  }',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TASKS TABLE
-- =====================================================

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('work', 'health', 'personal', 'social', 'creative', 'finance')),
  is_completed BOOLEAN DEFAULT FALSE,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  estimated_minutes INTEGER,
  actual_minutes INTEGER,
  due_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  -- ADHD-specific fields
  energy_level TEXT CHECK (energy_level IN ('low', 'medium', 'high')),
  focus_score INTEGER CHECK (focus_score >= 1 AND focus_score <= 5),
  mood_after TEXT CHECK (mood_after IN ('frustrated', 'neutral', 'satisfied', 'proud')),
  -- Task breakdown fields
  parent_task_id UUID REFERENCES tasks(id),
  is_subtask BOOLEAN DEFAULT FALSE,
  step_order INTEGER,
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for performance
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_category ON tasks(category);
CREATE INDEX idx_tasks_completed ON tasks(is_completed);

-- =====================================================
-- SCHEDULE EVENTS TABLE
-- =====================================================

CREATE TABLE schedule_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  category TEXT NOT NULL,
  notes TEXT,
  -- ADHD-helpful features
  reminder_minutes INTEGER DEFAULT 15,
  energy_required TEXT CHECK (energy_required IN ('low', 'medium', 'high')),
  prep_time_minutes INTEGER,
  is_flexible BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for performance
CREATE INDEX idx_events_user_id ON schedule_events(user_id);
CREATE INDEX idx_events_start_time ON schedule_events(start_time);

-- =====================================================
-- HABITS TABLE
-- =====================================================

CREATE TABLE habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  frequency TEXT NOT NULL CHECK (frequency IN ('daily', 'weekdays', 'threePerWeek', 'custom')),
  -- Habit tracking
  streak INTEGER DEFAULT 0,
  best_streak INTEGER DEFAULT 0,
  last_completed TIMESTAMP WITH TIME ZONE,
  total_completions INTEGER DEFAULT 0,
  -- ADHD-friendly features  
  target_time TIME,
  estimated_minutes INTEGER,
  reminder_enabled BOOLEAN DEFAULT TRUE,
  celebration_threshold INTEGER DEFAULT 7, -- Celebrate every 7 completions
  -- Flexible scheduling
  custom_frequency JSONB, -- For custom frequency patterns
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for performance
CREATE INDEX idx_habits_user_id ON habits(user_id);
CREATE INDEX idx_habits_active ON habits(is_active);

-- =====================================================
-- HABIT COMPLETIONS TABLE (Detailed tracking)
-- =====================================================

CREATE TABLE habit_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL,
  -- ADHD insights
  mood_before TEXT CHECK (mood_before IN ('resistant', 'neutral', 'motivated', 'excited')),
  mood_after TEXT CHECK (mood_after IN ('frustrated', 'neutral', 'satisfied', 'proud')),
  difficulty_level INTEGER CHECK (difficulty_level >= 1 AND difficulty_level <= 5),
  notes TEXT,
  actual_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for performance
CREATE INDEX idx_habit_completions_habit_id ON habit_completions(habit_id);
CREATE INDEX idx_habit_completions_completed_at ON habit_completions(completed_at);

-- =====================================================
-- FOCUS SESSIONS TABLE
-- =====================================================

CREATE TABLE focus_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
  planned_minutes INTEGER NOT NULL,
  actual_minutes INTEGER,
  session_type TEXT DEFAULT 'work' CHECK (session_type IN ('work', 'break', 'deep-work', 'review')),
  -- Session tracking
  started_at TIMESTAMP WITH TIME ZONE NOT NULL,
  ended_at TIMESTAMP WITH TIME ZONE,
  completed BOOLEAN DEFAULT FALSE,
  -- ADHD insights
  focus_quality INTEGER CHECK (focus_quality >= 1 AND focus_quality <= 5),
  distraction_count INTEGER DEFAULT 0,
  energy_before TEXT CHECK (energy_before IN ('low', 'medium', 'high')),
  energy_after TEXT CHECK (energy_after IN ('low', 'medium', 'high')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for performance
CREATE INDEX idx_focus_sessions_user_id ON focus_sessions(user_id);
CREATE INDEX idx_focus_sessions_started_at ON focus_sessions(started_at);

-- =====================================================
-- KAI CONVERSATIONS TABLE (AI Chat History)
-- =====================================================

CREATE TABLE kai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  title TEXT,
  conversation_type TEXT DEFAULT 'general' CHECK (conversation_type IN (
    'general', 'tasks', 'focus', 'habits', 'planning', 'ideas', 'analytics', 'thought', 'breakdown'
  )),
  is_starred BOOLEAN DEFAULT FALSE,
  last_message_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE kai_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES kai_conversations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'kai')),
  message_text TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'thought', 'suggestion', 'breakdown')),
  metadata JSONB, -- For storing additional context, suggestions, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for performance
CREATE INDEX idx_kai_conversations_user_id ON kai_conversations(user_id);
CREATE INDEX idx_kai_messages_conversation_id ON kai_messages(conversation_id);
CREATE INDEX idx_kai_messages_created_at ON kai_messages(created_at);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE focus_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE kai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE kai_messages ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can manage own profile" ON users 
  FOR ALL USING (clerk_user_id = auth.jwt() ->> 'sub');

-- Tasks policies
CREATE POLICY "Users can manage own tasks" ON tasks 
  FOR ALL USING (user_id IN (
    SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'
  ));

-- Schedule events policies  
CREATE POLICY "Users can manage own events" ON schedule_events 
  FOR ALL USING (user_id IN (
    SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'
  ));

-- Habits policies
CREATE POLICY "Users can manage own habits" ON habits 
  FOR ALL USING (user_id IN (
    SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'
  ));

-- Habit completions policies
CREATE POLICY "Users can manage own habit completions" ON habit_completions 
  FOR ALL USING (user_id IN (
    SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'
  ));

-- Focus sessions policies
CREATE POLICY "Users can manage own focus sessions" ON focus_sessions 
  FOR ALL USING (user_id IN (
    SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'
  ));

-- Kai conversations policies
CREATE POLICY "Users can manage own conversations" ON kai_conversations 
  FOR ALL USING (user_id IN (
    SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'
  ));

CREATE POLICY "Users can manage own messages" ON kai_messages 
  FOR ALL USING (user_id IN (
    SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'
  ));

-- =====================================================
-- AUTOMATED FUNCTIONS FOR ADHD-FRIENDLY FEATURES
-- =====================================================

-- Function to update habit streaks
CREATE OR REPLACE FUNCTION update_habit_streak()
RETURNS TRIGGER AS $$
BEGIN
  -- Update streak and total completions
  UPDATE habits SET
    streak = CASE 
      WHEN last_completed IS NULL OR last_completed < CURRENT_DATE - INTERVAL '1 day' THEN 1
      WHEN last_completed = CURRENT_DATE - INTERVAL '1 day' THEN streak + 1
      ELSE streak
    END,
    best_streak = GREATEST(
      best_streak, 
      CASE 
        WHEN last_completed IS NULL OR last_completed < CURRENT_DATE - INTERVAL '1 day' THEN 1
        WHEN last_completed = CURRENT_DATE - INTERVAL '1 day' THEN streak + 1
        ELSE streak
      END
    ),
    total_completions = total_completions + 1,
    last_completed = NEW.completed_at
  WHERE id = NEW.habit_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update habit streaks
CREATE TRIGGER trigger_update_habit_streak
  AFTER INSERT ON habit_completions
  FOR EACH ROW
  EXECUTE FUNCTION update_habit_streak();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at columns
CREATE TRIGGER trigger_users_updated_at BEFORE UPDATE ON users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_tasks_updated_at BEFORE UPDATE ON tasks 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SAMPLE DATA FOR TESTING (Optional)
-- =====================================================

-- Insert sample user (replace with your actual Clerk user ID for testing)
/*
INSERT INTO users (clerk_user_id, email, name) 
VALUES ('user_test123', 'test@example.com', 'Test User');

-- Insert sample tasks
INSERT INTO tasks (user_id, title, category, estimated_minutes) VALUES
((SELECT id FROM users WHERE clerk_user_id = 'user_test123'), 'Reply to important emails', 'work', 15),
((SELECT id FROM users WHERE clerk_user_id = 'user_test123'), 'Go for a 20-minute walk', 'health', 20),
((SELECT id FROM users WHERE clerk_user_id = 'user_test123'), 'Organize desk drawer', 'personal', 10);

-- Insert sample habits
INSERT INTO habits (user_id, title, category, frequency, target_time) VALUES
((SELECT id FROM users WHERE clerk_user_id = 'user_test123'), 'Morning meditation', 'health', 'daily', '08:00:00'),
((SELECT id FROM users WHERE clerk_user_id = 'user_test123'), 'Review daily tasks', 'work', 'daily', '09:00:00');
*/

-- =====================================================
-- VIEWS FOR ADHD-FRIENDLY ANALYTICS
-- =====================================================

-- View for task completion analytics
CREATE VIEW task_completion_stats AS
SELECT 
  u.id as user_id,
  u.name,
  COUNT(*) as total_tasks,
  COUNT(*) FILTER (WHERE is_completed = true) as completed_tasks,
  ROUND(COUNT(*) FILTER (WHERE is_completed = true)::numeric / COUNT(*)::numeric * 100, 2) as completion_rate,
  AVG(actual_minutes) FILTER (WHERE actual_minutes IS NOT NULL) as avg_actual_time,
  AVG(estimated_minutes) FILTER (WHERE estimated_minutes IS NOT NULL) as avg_estimated_time
FROM users u
LEFT JOIN tasks t ON u.id = t.user_id
WHERE t.created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY u.id, u.name;

-- View for habit streak analytics  
CREATE VIEW habit_streak_stats AS
SELECT 
  u.id as user_id,
  u.name,
  h.title as habit_title,
  h.streak as current_streak,
  h.best_streak,
  h.total_completions,
  COUNT(hc.id) FILTER (WHERE hc.completed_at >= CURRENT_DATE - INTERVAL '7 days') as completions_this_week
FROM users u
LEFT JOIN habits h ON u.id = h.user_id
LEFT JOIN habit_completions hc ON h.id = hc.habit_id
WHERE h.is_active = true
GROUP BY u.id, u.name, h.id, h.title, h.streak, h.best_streak, h.total_completions;

COMMENT ON TABLE users IS 'User profiles connected to Clerk authentication with ADHD-friendly preferences';
COMMENT ON TABLE tasks IS 'Tasks with ADHD-specific features like energy tracking and mood analysis';
COMMENT ON TABLE habits IS 'Habit tracking with flexible scheduling and celebration milestones';
COMMENT ON TABLE focus_sessions IS 'Focus session tracking with quality metrics and distraction counts';
COMMENT ON TABLE kai_conversations IS 'AI chat conversations with categorization and starring';

-- Schema creation complete! 
-- Remember to:
-- 1. Set up your environment variables
-- 2. Configure Clerk webhook to create users
-- 3. Test the connection with the API endpoints