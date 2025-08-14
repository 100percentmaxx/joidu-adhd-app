# Joidu Component Patterns
Version 1.0

**Purpose:** Reusable UI component specifications for consistent implementation across the Joidu ADHD task management app.

---

## Navigation Components

### Bottom Tab Navigation

**Usage:** Primary app navigation across 5 main sections

**Structure:**
```
TabBar
├── HomeTab (active: #2847ef, inactive: #a5a5a5)
├── TasksTab 
├── FocusTab
├── HabitsTab (active state shown in mockups)
└── KaiHelpTab
```

**Specifications:**
- Container: 83px height, #FFFFFF background
- Icons: 24x24px, centered above labels
- Labels: 10pt Medium (500), 4px below icons
- Active state: #2847ef color for both icon and text
- Inactive state: #a5a5a5 color
- Touch target: Full tab width, 83px height
- Safe area: Includes bottom safe area padding

**States:**
- Default: Inactive styling
- Active: Blue color, no additional visual indicators
- Press: Brief opacity change (0.7) during touch

---

## Header Components

### Screen Header

**Usage:** Standard header for all main screens

**Specifications:**
- Container: Full width, 44px + status bar height
- Background: #FFFFFF or transparent
- Title: 17pt Semibold (600), #4c4c4c, centered
- Back button: Blue arrow "←" + "Back" text, left-aligned
- Action buttons: 17pt Regular (400), #2847ef, right-aligned
- Bottom border: 1px solid #e2e2e2 (conditional)

**Variants:**
- **Transparent:** No background, no border (Home screen)
- **Solid:** White background with border (secondary screens)
- **Modal:** Includes close/cancel actions

### Greeting Header

**Usage:** Personalized welcome on Home dashboard

**Specifications:**
- Title: "Good Morning, [Name]!" - 34pt Bold (700), #2847ef
- Subtitle: Date format "Tuesday, April 16" - 17pt Regular (400), #a5a5a5
- Spacing: 4px between title and subtitle
- Margins: 20px left/right, 24px from top

---

## Button Components

### Primary Button

**Usage:** Main actions, form submissions

**Specifications:**
- Background: #2847ef (Primary Blue)
- Text: #FFFFFF, 15pt Medium (500)
- Padding: 12px vertical, 20px horizontal  
- Border radius: 8px
- Min height: 44px
- Letter spacing: 0.25px
- Shadow: None (flat design)

**States:**
- Default: Blue background
- Pressed: Scale 0.95, 100ms duration
- Disabled: #e2e2e2 background, #a5a5a5 text

### Secondary Button  

**Usage:** Secondary actions, cancel buttons

**Specifications:**
- Background: #e2e2e2
- Text: #4c4c4c, 15pt Medium (500)
- Border: None
- Same padding/sizing as Primary Button

**States:**
- Default: Light gray background
- Pressed: Scale 0.95, slightly darker background
- Disabled: Reduced opacity (0.5)

### Orange Lightning Button (FAB)

**Usage:** "Just-One-Thing" intervention system

**Specifications:**
- Background: #fa772c (Primary Orange)
- Size: 56px diameter (circular)
- Icon: Lightning bolt, white, 24px
- Position: Fixed, typically bottom-right
- Margin: 20px from screen edges
- Shadow: 0 4px 8px rgba(0,0,0,0.15)
- Z-index: High (above other content)

**States:**
- Default: Orange with shadow
- Pressed: Scale 0.9, shadow reduces
- Hover: Subtle pulse animation (optional)

### Category Pills

**Usage:** Category selection, filtering

**Specifications:**
- Padding: 8px vertical, 16px horizontal
- Border radius: 20px (fully rounded)
- Font: 13pt Medium (500)
- Letter spacing: 0.5px
- Min height: 36px

**States:**
- **Selected:** Solid category color background, white text, blue border outline
- **Unselected:** White background, category color text, category color border
- **Pressed:** Brief scale 0.95

**Category Colors:**
- Work: #f9dac5 (light) / #f9c075 (dark)
- Health: #ddede3 (light) / #a8e2bb (dark)  
- Personal: #cae9ef (light) / #98e1ea (dark)
- Social: #e6e1f4 (light) / #c8bfef (dark)
- Creative: #f2d3d1 (light) / #f4b7ae (dark)
- Finance: #fef7d6 (light) / #f7e98e (dark)

### Accept/Action Button

**Usage:** AI suggestions, quick confirmations

**Specifications:**
- Background: #2847ef
- Text: "Accept", white, 13pt Medium (500)
- Padding: 6px vertical, 12px horizontal
- Border radius: 8px
- Compact sizing for inline use

---

## Card Components

### Task Card

**Usage:** Individual tasks in lists and dashboard

**Structure:**
```
TaskCard
├── CategoryIcon (colored circle, 8px diameter)
├── Checkbox (20px circle, right-aligned)
├── TaskTitle (17pt Medium)
└── TaskMeta (optional - 13pt Regular, secondary color)
```

**Specifications:**
- Container: #FFFFFF background, 12px border radius
- Padding: 16px all sides
- Border: 1px solid #e2e2e2
- Shadow: 0 1px 3px rgba(0,0,0,0.1)
- Margin: 8px bottom between cards

**Interactive States:**
- Default: White background
- Pressed: Scale 0.98
- Completed: Checkbox filled, title with strikethrough
- Hover: Subtle shadow increase

### Schedule Event Card

**Usage:** Calendar events and appointments

**Structure:**
```
EventCard
├── CategoryIcon (left, 16px)
├── TimeRange ("7:00 - 8:00", 15pt Semibold)
└── EventTitle ("Personal trainer", 15pt Medium)
```

**Specifications:**
- Background: Category color (light variant)
- Border radius: 12px
- Padding: 12px vertical, 16px horizontal
- No border or shadow
- Margin: 8px bottom between events

**Category Backgrounds:**
- Work: #f9dac5, Health: #ddede3, Personal: #cae9ef
- Social: #e6e1f4, Creative: #f2d3d1, Finance: #fef7d6

### Habit/Routine Card

**Usage:** Habit tracking, routine display

**Structure:**
```
HabitCard
├── CategoryIcon (top-left)
├── HabitTitle (15pt Medium, #4c4c4c)
├── HabitMeta ("12 min • 4 day streak", 13pt Regular, #a5a5a5)
└── ProgressIndicator (optional)
```

**Specifications:**
- Background: #FFFFFF or light category tint
- Border: 2px solid category color (when emphasized)
- Border radius: 12px  
- Padding: 16px
- Width: Flexible, can be in grid layout

**Progress Elements:**
- Progress bar: 6px height, 3px border radius
- Background: #e2e2e2, Fill: category color
- Streak text: 13pt Regular, #a5a5a5

---

## Form Components

### Text Input

**Usage:** Text entry, search, form fields

**Specifications:**
- Background: #FFFFFF
- Border: 1px solid #e2e2e2
- Border radius: 12px
- Padding: 14px vertical, 16px horizontal
- Font: 15pt Regular (400), #4c4c4c
- Placeholder: #a5a5a5

**States:**
- Default: Light gray border
- Focused: #2847ef border, 2px width
- Error: #f4b7ae border, 2px width
- Disabled: #e2e2e2 background, #a5a5a5 text

### AI Suggestion Card

**Usage:** Kai AI suggestions and recommendations

**Structure:**
```
SuggestionCard
├── AIIcon (sparkle icon, blue)
├── SuggestionText (15pt Regular, #4c4c4c)
└── AcceptButton (compact blue button)
```

**Specifications:**
- Background: #cae9ef (light blue tint)
- Border radius: 12px
- Padding: 12px vertical, 16px horizontal
- No border
- Includes Accept button on right

### Toggle Switch

**Usage:** Settings, preferences, boolean options

**Specifications:**
- Track width: 44px, height: 26px
- Track radius: 13px (fully rounded)
- Handle: 22px diameter circle, #FFFFFF
- Off state: #e2e2e2 track
- On state: #2847ef track
- Animation: 0.2s ease transition

**States:**
- Off: Handle left, gray track
- On: Handle right, blue track  
- Disabled: Reduced opacity (0.5)

### Time Picker

**Usage:** Time selection for events and habits

**Specifications:**
- Background: #FFFFFF
- Border: 1px solid #e2e2e2
- Border radius: 12px
- Padding: 12px vertical, 16px horizontal
- Text: 15pt Regular (400), #4c4c4c
- Clock icon: 16px, #a5a5a5, right-aligned

---

## List Components

### Section Header

**Usage:** Grouping content sections

**Structure:**
```
SectionHeader
├── SectionTitle ("Tasks", 17pt Semibold, #4c4c4c)
└── AllButton ("All", 15pt Regular, #a5a5a5, right-aligned)
```

**Specifications:**
- Background: Blue accent bar (#2847ef, 4px height, 24px width)
- Padding: 8px vertical, 0px horizontal
- Margin: 24px top (section spacing)
- Full width container

### Filter Pills Row

**Usage:** Category filtering in list views

**Specifications:**
- Container: Horizontal scroll view
- Pill spacing: 8px between items
- Content margins: 20px left/right
- Height: Auto-sizing based on pill content
- Scroll indicators: Hidden

---

## Modal Components

### Add Item Modal

**Usage:** Creating new tasks, events, habits

**Specifications:**
- Background: #fefbf7 (app background)
- Presentation: Slide up from bottom
- Header: Standard with cancel/save actions
- Content padding: 20px left/right
- Form spacing: 16px between form sections

### Settings Screen

**Usage:** App preferences and configuration

**Specifications:**
- Background: #fefbf7
- Section groups: White cards with 12px radius
- Section spacing: 24px between groups
- Setting rows: 44px min height, 16px padding

---

## Loading & Empty States

### Loading Skeleton

**Usage:** Content loading states

**Specifications:**
- Base color: #F0F0F0
- Shimmer: Animated gradient overlay
- Border radius: Matches target component
- Duration: 1.5s loop animation

### Empty State

**Usage:** No content scenarios

**Specifications:**
- Icon: 48px, #a5a5a5
- Title: 17pt Semibold, #4c4c4c
- Description: 15pt Regular, #a5a5a5
- Action button: Primary button style
- Vertical centering in available space

---

## Accessibility Patterns

### Touch Targets
- Minimum size: 44x44px for all interactive elements
- Spacing: 8px minimum between adjacent targets
- Clear visual feedback for all interactive states

### Focus Management
- Visible focus indicators for keyboard navigation
- Logical tab order through interactive elements
- Focus trapping in modals

### Color & Contrast
- Text contrast ratios meet WCAG AA standards
- Color is not the only indicator of state/meaning
- High contrast mode support

---

## Animation Patterns

### Micro-interactions
- Button press: Scale 0.95, 100ms ease-out
- Card tap: Scale 0.98, 150ms ease-out
- Loading: Fade in content, 300ms ease-in-out

### Transitions
- Screen navigation: Standard platform transitions
- Modal presentation: Slide up, 400ms ease-out
- Modal dismissal: Slide down, 300ms ease-in

### Performance
- 60fps target for all animations
- Prefer transform/opacity changes over layout
- Reduce motion support for accessibility

This component pattern system ensures consistent, accessible, and ADHD-friendly interfaces throughout the Joidu app.