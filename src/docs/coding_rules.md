# Joidu Coding Rules
Version 1.0

**Purpose:** Development standards and patterns for the Joidu ADHD task management app, optimized for AI-assisted development with Cursor.

---

## Project Architecture

### Technology Stack

**Frontend Framework:**
- React Native 0.72+ for cross-platform mobile development
- TypeScript for type safety and better AI assistance
- Expo SDK 49+ for streamlined development and deployment

**Backend Services:**
- Supabase for database, authentication, and real-time features
- PostgreSQL with Row-Level Security (RLS)
- Supabase Edge Functions for AI processing

**State Management:**
- Zustand for global state (lightweight, TypeScript-friendly)
- React Query (TanStack Query) for server state management
- Local state with useState/useReducer for component-specific needs

**Navigation:**
- React Navigation 6+ with bottom tabs and stack navigation
- TypeScript navigation typing for better AI completion

---

## File Structure & Naming

### Project Organization
```
src/
├── components/           # Reusable UI components
│   ├── buttons/         # Button variants
│   ├── cards/           # Card components
│   ├── forms/           # Form elements
│   └── layout/          # Layout components
├── screens/             # Screen components
│   ├── Home/
│   ├── Tasks/
│   ├── Focus/
│   ├── Habits/
│   └── KaiHelp/
├── hooks/               # Custom React hooks
├── services/            # API and external service integrations
├── stores/              # Zustand stores
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── constants/           # App constants and configuration
└── assets/              # Images, fonts, etc.
```

### Naming Conventions

**Files and Folders:**
- PascalCase for React components: `TaskCard.tsx`
- camelCase for utilities and hooks: `formatDate.ts`, `useTaskManager.ts`
- kebab-case for assets: `icon-home-24.svg`
- Folders use camelCase: `components/buttons/`

**Components:**
- Prefix with component type: `ButtonPrimary`, `CardTask`, `ScreenHome`
- Suffix hooks with 'use': `useTaskFilters`, `useKaiChat`
- Store files end with 'Store': `taskStore.ts`, `userStore.ts`

---

## TypeScript Standards

### Type Definitions

**Core Data Types:**
```typescript
// types/core.ts
export interface Task {
  id: string
  title: string
  description?: string
  category: CategoryType
  isCompleted: boolean
  createdAt: Date
  updatedAt: Date
  estimatedMinutes?: number
  actualMinutes?: number
}

export interface ScheduleEvent {
  id: string
  title: string
  startTime: Date
  endTime: Date
  category: CategoryType
  location?: string
}

export interface Habit {
  id: string
  title: string
  category: CategoryType
  frequency: FrequencyType
  streak: number
  lastCompleted?: Date
  targetTime?: string
}

export type CategoryType = 
  | 'work' 
  | 'health' 
  | 'personal' 
  | 'social' 
  | 'creative' 
  | 'finance'

export type FrequencyType = 
  | 'daily' 
  | 'weekdays' 
  | 'threePerWeek' 
  | 'custom'
```

**Component Props:**
```typescript
// Always define props interfaces
interface TaskCardProps {
  task: Task
  onToggleComplete: (taskId: string) => void
  onPress?: (task: Task) => void
  showCategory?: boolean
}

// Use generic types for reusable components
interface ButtonProps<T = void> {
  title: string
  onPress: () => T
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  loading?: boolean
}
```

### Type Safety Rules

1. **No `any` types** - Use proper interfaces or `unknown`
2. **Strict null checks** - Handle undefined/null explicitly
3. **Discriminated unions** for component variants
4. **Generic types** for reusable components
5. **Utility types** like `Pick`, `Omit`, `Partial` when appropriate

---

## Component Patterns

### Component Structure

**Standard Component Template:**
```typescript
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colors, typography, spacing } from '../constants/theme'

interface ComponentNameProps {
  // Props definition
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  // Destructured props
}) => {
  // Hooks and state

  // Event handlers

  // Render helpers (if needed)

  return (
    <View style={styles.container}>
      {/* Component JSX */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // Styles using theme constants
  }
})
```

### Naming Rules for Components

**Component Names:**
- `ButtonPrimary` - Primary blue button
- `ButtonSecondary` - Secondary gray button  
- `ButtonFab` - Orange floating action button
- `CardTask` - Task display card
- `CardScheduleEvent` - Calendar event card
- `CardHabit` - Habit tracking card
- `InputText` - Standard text input
- `ToggleSwitch` - Settings toggle
- `PillCategory` - Category filter pill

**Screen Components:**
- `ScreenHome` - Home dashboard
- `ScreenTasks` - Task management
- `ScreenFocus` - Focus timer
- `ScreenHabits` - Habit tracking
- `ScreenKaiHelp` - AI chat assistant

---

## Styling Standards

### Theme Constants

**File: `constants/theme.ts`**
```typescript
export const colors = {
  // Primary brand colors
  primaryBlue: '#2847ef',
  primaryOrange: '#fa772c',
  
  // Category colors (light/dark pairs)
  categoryWork: { light: '#f9dac5', dark: '#f9c075' },
  categoryHealth: { light: '#ddede3', dark: '#a8e2bb' },
  categoryPersonal: { light: '#cae9ef', dark: '#98e1ea' },
  categorySocial: { light: '#e6e1f4', dark: '#c8bfef' },
  categoryCreative: { light: '#f2d3d1', dark: '#f4b7ae' },
  categoryFinance: { light: '#fef7d6', dark: '#f7e98e' },
  
  // Neutral colors
  background: '#fefbf7',
  cardBackground: '#FFFFFF',
  textPrimary: '#4c4c4c',
  textSecondary: '#a5a5a5',
  border: '#e2e2e2'
} as const

export const typography = {
  displayLarge: { fontSize: 34, fontWeight: '700' as const },
  titleMedium: { fontSize: 17, fontWeight: '600' as const },
  bodyLarge: { fontSize: 17, fontWeight: '500' as const },
  bodyMedium: { fontSize: 15, fontWeight: '500' as const },
  caption: { fontSize: 12, fontWeight: '500' as const }
} as const

export const spacing = {
  micro: 4,
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32
} as const

export const borderRadius = {
  small: 8,
  medium: 12,
  large: 16,
  pill: 20,
  circular: 999
} as const
```

### Style Patterns

**Use theme constants consistently:**
```typescript
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: spacing.medium
  },
  title: {
    ...typography.titleMedium,
    color: colors.textPrimary,
    marginBottom: spacing.small
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.medium,
    padding: spacing.medium,
    marginBottom: spacing.small
  }
})
```

**Category color helpers:**
```typescript
// utils/categoryColors.ts
export const getCategoryColor = (category: CategoryType, variant: 'light' | 'dark' = 'light') => {
  const categoryMap = {
    work: colors.categoryWork,
    health: colors.categoryHealth,
    personal: colors.categoryPersonal,
    social: colors.categorySocial,
    creative: colors.categoryCreative,
    finance: colors.categoryFinance
  }
  return categoryMap[category][variant]
}
```

---

## State Management Patterns

### Zustand Store Structure

**Task Store Example:**
```typescript
// stores/taskStore.ts
import { create } from 'zustand'
import { Task, CategoryType } from '../types/core'

interface TaskStore {
  tasks: Task[]
  selectedCategory: CategoryType | 'all'
  isLoading: boolean
  
  // Actions
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  toggleTaskComplete: (id: string) => void
  setSelectedCategory: (category: CategoryType | 'all') => void
  loadTasks: () => Promise<void>
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  selectedCategory: 'all',
  isLoading: false,
  
  addTask: (taskData) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(), // Use proper ID generation in production
      createdAt: new Date(),
      updatedAt: new Date(),
      isCompleted: false
    }
    set(state => ({ tasks: [...state.tasks, newTask] }))
  },
  
  updateTask: (id, updates) => {
    set(state => ({
      tasks: state.tasks.map(task => 
        task.id === id 
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      )
    }))
  },
  
  toggleTaskComplete: (id) => {
    const { updateTask } = get()
    const task = get().tasks.find(t => t.id === id)
    if (task) {
      updateTask(id, { isCompleted: !task.isCompleted })
    }
  },
  
  setSelectedCategory: (category) => {
    set({ selectedCategory: category })
  },
  
  loadTasks: async () => {
    set({ isLoading: true })
    try {
      // API call to load tasks
      // const tasks = await taskService.getTasks()
      // set({ tasks })
    } catch (error) {
      console.error('Failed to load tasks:', error)
    } finally {
      set({ isLoading: false })
    }
  }
}))
```

### Custom Hooks Pattern

**Task Management Hook:**
```typescript
// hooks/useTaskManager.ts
import { useTaskStore } from '../stores/taskStore'
import { useMemo } from 'react'

export const useTaskManager = () => {
  const {
    tasks,
    selectedCategory,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    setSelectedCategory
  } = useTaskStore()
  
  const filteredTasks = useMemo(() => {
    if (selectedCategory === 'all') return tasks
    return tasks.filter(task => task.category === selectedCategory)
  }, [tasks, selectedCategory])
  
  const completedTasks = useMemo(() => 
    filteredTasks.filter(task => task.isCompleted),
    [filteredTasks]
  )
  
  const incompleteTasks = useMemo(() => 
    filteredTasks.filter(task => !task.isCompleted),
    [filteredTasks]
  )
  
  return {
    tasks: filteredTasks,
    completedTasks,
    incompleteTasks,
    selectedCategory,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    setSelectedCategory
  }
}
```

---

## API Integration Patterns

### Supabase Service Layer

**Base Service:**
```typescript
// services/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

**Task Service:**
```typescript
// services/taskService.ts
import { supabase } from './supabaseClient'
import { Task } from '../types/core'

export const taskService = {
  async getTasks(): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },
  
  async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .insert(task)
      .select()
      .single()
    
    if (error) throw error
    return data
  },
  
  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },
  
  async deleteTask(id: string): Promise<void> {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}
```

---

## Error Handling Standards

### Error Boundary Pattern

```typescript
// components/ErrorBoundary.tsx
import React from 'react'
import { View, Text } from 'react-native'
import { colors, typography, spacing } from '../constants/theme'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props)
    this.state = { hasError: false }
  }
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>
            We're sorry, but something unexpected happened. Please try again.
          </Text>
        </View>
      )
    }
    
    return this.props.children
  }
}
```

### API Error Handling

```typescript
// utils/errorHandling.ts
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    // Log to analytics service
    console.error('API Error:', error.message)
    
    // Return user-friendly message
    return 'Something went wrong. Please try again.'
  }
  
  return 'An unexpected error occurred.'
}

// In components
const handleTaskCreate = async (taskData: Omit<Task, 'id'>) => {
  try {
    await taskService.createTask(taskData)
    // Success handling
  } catch (error) {
    const message = handleApiError(error)
    // Show user-friendly error message
    Alert.alert('Error', message)
  }
}
```

---

## Performance Optimization

### Memoization Patterns

```typescript
// Use React.memo for components
export const TaskCard = React.memo<TaskCardProps>(({ task, onToggleComplete }) => {
  // Component implementation
})

// Use useMemo for expensive calculations
const sortedTasks = useMemo(() => {
  return tasks.sort((a, b) => {
    if (a.isCompleted === b.isCompleted) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
    return a.isCompleted ? 1 : -1
  })
}, [tasks])

// Use useCallback for event handlers passed to child components
const handleTaskPress = useCallback((task: Task) => {
  navigation.navigate('TaskDetail', { taskId: task.id })
}, [navigation])
```

### List Optimization

```typescript
// Use FlatList with proper optimization
<FlatList
  data={tasks}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <TaskCard
      task={item}
      onToggleComplete={handleToggleComplete}
      onPress={handleTaskPress}
    />
  )}
  getItemLayout={(data, index) => ({
    length: TASK_CARD_HEIGHT,
    offset: TASK_CARD_HEIGHT * index,
    index
  })}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={10}
/>
```

---

## Accessibility Standards

### Accessibility Props

```typescript
// Always include accessibility props
<TouchableOpacity
  accessible={true}
  accessibilityRole="button"
  accessibilityLabel={`Mark ${task.title} as ${task.isCompleted ? 'incomplete' : 'complete'}`}
  accessibilityHint="Double tap to toggle task completion"
  onPress={() => onToggleComplete(task.id)}
>
  <Text>{task.title}</Text>
</TouchableOpacity>
```

### Screen Reader Support

```typescript
// Use semantic headings
<Text
  accessibilityRole="header"
  accessibilityLevel={1}
  style={styles.screenTitle}
>
  Tasks
</Text>

// Group related elements
<View
  accessible={true}
  accessibilityRole="summary"
  accessibilityLabel={`${incompleteTasks.length} incomplete tasks, ${completedTasks.length} completed tasks`}
>
  {/* Task statistics */}
</View>
```

---

## Testing Patterns

### Unit Test Structure

```typescript
// __tests__/components/TaskCard.test.tsx
import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { TaskCard } from '../TaskCard'
import { mockTask } from '../../__mocks__/taskMocks'

describe('TaskCard', () => {
  const mockOnToggleComplete = jest.fn()
  
  beforeEach(() => {
    jest.clearAllMocks()
  })
  
  it('renders task title correctly', () => {
    const { getByText } = render(
      <TaskCard task={mockTask} onToggleComplete={mockOnToggleComplete} />
    )
    
    expect(getByText(mockTask.title)).toBeTruthy()
  })
  
  it('calls onToggleComplete when pressed', () => {
    const { getByRole } = render(
      <TaskCard task={mockTask} onToggleComplete={mockOnToggleComplete} />
    )
    
    fireEvent.press(getByRole('button'))
    expect(mockOnToggleComplete).toHaveBeenCalledWith(mockTask.id)
  })
})
```

---

## Code Quality Rules

### ESLint Configuration

Key rules for Cursor AI assistance:
- `@typescript-eslint/no-unused-vars`: Error
- `@typescript-eslint/no-explicit-any`: Error  
- `react-hooks/exhaustive-deps`: Warn
- `react-native/no-unused-styles`: Error
- `react-native/split-platform-components`: Warn

### Prettier Configuration

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### Code Review Checklist

1. **TypeScript:** All types properly defined, no `any` usage
2. **Performance:** Proper memoization, list optimization
3. **Accessibility:** All interactive elements have proper labels
4. **Error Handling:** API calls wrapped in try-catch
5. **Testing:** Unit tests for complex logic
6. **Styling:** Uses theme constants, follows design system
7. **Naming:** Follows established conventions

---

## AI Development Guidelines

### Cursor-Specific Patterns

When working with Cursor AI:

1. **Descriptive Comments:** Add context for complex business logic
2. **Type Annotations:** Be explicit with types for better AI understanding
3. **Consistent Patterns:** Follow established patterns for similar functionality
4. **Documentation:** Include JSDoc comments for complex functions
5. **Examples:** Provide usage examples in component comments

### Code Generation Prompts

For consistent AI-generated code, use patterns like:
- "Create a new task card component following the existing TaskCard pattern"
- "Add error handling to this API call using the established error handling pattern"
- "Generate a Zustand store for habits following the taskStore structure"

This coding standards document ensures consistent, maintainable, and AI-friendly code throughout the Joidu application development process.