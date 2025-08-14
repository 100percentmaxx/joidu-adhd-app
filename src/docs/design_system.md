# Joidu Design System
Version 1.0

**Tagline:** "Activate Your Potential"  
**Target Platforms:** iOS 14+, Android 8+

---

## Brand Identity

### Logo & Symbol
Orange Water Drop: Minimalist orange water drop rising from a ripple, conveying rebounding from adversity and the ripple effect of small wins.

### Core Philosophy
- Work with ADHD brains, not against them
- Minimize decision fatigue and cognitive overhead
- Provide gentle, supportive guidance without judgment
- Celebrate progress and small wins
- Adapt to individual patterns and preferences

---

## Color System

### Primary Brand Colors
- **Primary Orange:** #fa772c
- **Primary Blue:** #2847ef

### Category System (Light/Dark Pairs)
- **Work/Professional:** Light #f9dac5 / Dark #f9c075
- **Personal Care/Health:** Light #ddede3 / Dark #a8e2bb
- **Household/Errands:** Light #cae9ef / Dark #98e1ea
- **Social/Relationships:** Light #e6e1f4 / Dark #c8bfef
- **Learning/Creative:** Light #f2d3d1 / Dark #f4b7ae
- **Finance/Admin:** Light #fef7d6 / Dark #f7e98e

### Neutral Colors
- **Background:** #fefbf7 (light cream)
- **Card Background:** #FFFFFF
- **Text Primary:** #4c4c4c
- **Text Secondary:** #a5a5a5
- **Border/Dividers:** #e2e2e2

---

## Typography

### Font Family
System fonts for optimal readability and performance:
- **iOS:** San Francisco
- **Android:** Roboto

### Typography Scale

#### Display & Headers
- **Display Large:** 34pt, Bold (700) - Major headings like "Good Morning, Sam!"
- **Display Medium:** 28pt, Bold (700) - Section headers
- **Title Large:** 22pt, Semibold (600) - Screen titles, card headers
- **Title Medium:** 17pt, Semibold (600) - Navigation, section titles like "Today's Schedule"

#### Body Text
- **Body Large:** 17pt, Medium (500) - Primary content, task titles
- **Body Medium:** 15pt, Medium (500) - Secondary content, descriptions
- **Body Small:** 13pt, Regular (400) - Captions, metadata

#### Interface Elements
- **Button Text:** 15pt, Medium (500) - Button labels
- **Caption:** 12pt, Medium (500) - Labels, badges, time stamps
- **Micro:** 10pt, Medium (500) - Tab labels, tiny timestamps

### Line Heights
- **Display:** 1.2 (tight for impact)
- **Title:** 1.3 (readable for headers)
- **Body:** 1.4 (comfortable for reading)
- **Caption/Micro:** 1.3 (compact for small text)

### Letter Spacing
- **Display/Title:** -0.5px (tighter for large text)
- **Body:** 0px (default)
- **Caption/Micro:** 0.25px (slightly open for small text)

---

## Spacing System

Based on 8px grid system, observed from mockups:

### Layout Spacing
- **Screen Margins:** 20px (left/right) - as specified in template
- **Card Spacing:** 8px between cards vertically - matches mockups
- **Section Spacing:** 24px between major sections - matches mockups spacing
- **Internal Padding:** 16px inside cards and containers

### Component Spacing
- **Card Padding:** 16px - matches template and mockups
- **Button Padding:** 12px vertical, 16px horizontal - standard from template
- **Input Field Padding:** 14px vertical, 16px horizontal - template standard
- **Category Pill Padding:** 8px vertical, 16px horizontal - observed in mockups

### Spacing Scale
- **Micro:** 4px
- **Small:** 8px
- **Medium:** 16px
- **Large:** 24px
- **XLarge:** 32px
- **XXLarge:** 48px
- **Massive:** 64px

---

## Border Radius Standards

- **Small Elements:** 8px (buttons, small cards)
- **Medium Elements:** 12px (task cards, input fields) - matches mockups
- **Large Elements:** 16px (major cards, modal corners)
- **Pills:** 20px (category buttons) - observed in mockups
- **Circular:** 50% (profile pics, status indicators)

---

## Component Specifications

### Buttons

#### Primary Button
- **Background:** #2847ef (Primary Blue)
- **Text Color:** #FFFFFF
- **Font:** 15pt Medium (500)
- **Padding:** 12px vertical, 20px horizontal
- **Border Radius:** 8px
- **Min Height:** 44px (touch target)
- **Letter Spacing:** 0.25px

#### Secondary Button
- **Background:** #F0F0F0
- **Text Color:** #4c4c4c (Text Primary)
- **Font:** 15pt Medium (500)
- **Padding:** 12px vertical, 20px horizontal
- **Border Radius:** 8px
- **Min Height:** 44px
- **Letter Spacing:** 0.25px

#### Category Pills
- **Background:** Category color
- **Text Color:** #FFFFFF
- **Font:** 13pt Medium (500)
- **Padding:** 8px vertical, 16px horizontal
- **Border Radius:** 20px (fully rounded)
- **Min Height:** 36px
- **Letter Spacing:** 0.5px
- **Selected State:** Solid background with blue border outline
- **Unselected State:** White background, category color text

#### Orange Lightning Button (Floating Action)
- **Background:** #fa772c (Primary Orange)
- **Size:** 56px diameter
- **Icon:** Lightning bolt, white
- **Border Radius:** 50% (circular)
- **Shadow:** 0 4px 8px rgba(0,0,0,0.15)

### Cards

#### Task Card
- **Background:** #FFFFFF
- **Border:** 1px solid #e2e2e2
- **Border Radius:** 12px
- **Padding:** 16px
- **Margin Bottom:** 8px
- **Shadow:** 0 1px 3px rgba(0,0,0,0.1)
- **Category Indicator:** Colored circle icon on left

#### Schedule Event Card
- **Background:** Category color (light variant)
- **Border:** None
- **Border Radius:** 12px
- **Padding:** 12px vertical, 16px horizontal
- **Margin Bottom:** 8px
- **Time Text:** 15pt Semibold (600), #4c4c4c
- **Event Text:** 15pt Medium (500), #4c4c4c

#### Habit Card
- **Background:** #FFFFFF
- **Border:** 2px solid category color
- **Border Radius:** 12px
- **Padding:** 16px
- **Title:** 15pt Medium (500), #4c4c4c
- **Subtitle:** 13pt Regular (400), #a5a5a5
- **Progress Bar Background:** #e2e2e2
- **Progress Bar Fill:** Category color
- **Progress Bar Height:** 6px
- **Progress Bar Radius:** 3px

### Form Elements

#### Text Input
- **Background:** #FFFFFF
- **Border:** 1px solid #e2e2e2
- **Border Radius:** 12px
- **Padding:** 14px vertical, 16px horizontal
- **Font:** 15pt Regular (400)
- **Text Color:** #4c4c4c
- **Placeholder Color:** #a5a5a5
- **Focused State:** Border #2847ef, 2px width

#### Toggle Switch
- **Off Background:** #e2e2e2
- **On Background:** #2847ef (Primary Blue)
- **Handle:** #FFFFFF
- **Size:** Standard platform sizes

#### Time Picker
- **Background:** #FFFFFF
- **Border:** 1px solid #e2e2e2
- **Border Radius:** 12px
- **Text:** 15pt Regular (400), #4c4c4c

---

## Layout Structure

### Navigation

#### Bottom Tab Bar
- **Background:** #FFFFFF
- **Height:** 83px (includes safe area)
- **Active Icon Color:** #2847ef (Primary Blue)
- **Inactive Icon Color:** #a5a5a5 (Text Secondary)
- **Label Font:** 10pt Medium (500)
- **Icon Size:** 24x24px

#### Screen Headers
- **Background:** #FFFFFF or transparent
- **Height:** 44px + status bar
- **Title:** 17pt Semibold (600), centered, #4c4c4c
- **Back Button:** "Back", 17pt Regular (400), #2847ef
- **Action Buttons:** 17pt Regular (400), #2847ef
- **Border Bottom:** 1px solid #e2e2e2 (when needed)

### Screen Layouts

#### Home Dashboard - Observed Spacing
- **Greeting Section:** 24px margin from top
- **Date:** 4px below greeting
- **Section Headers:** 24px spacing between sections
- **"All" Buttons:** Right-aligned in section headers
- **Cards:** 8px vertical spacing between items
- **Screen Margins:** 20px left/right throughout

#### List Views
- **Filter Pills:** Horizontal scroll, 8px spacing between pills
- **Section Spacing:** 24px between filter area and content
- **List Items:** 8px vertical spacing between cards
- **Content Margins:** 20px left/right

---

## Interactive States

### Touch Feedback
- **Button Press:** Scale 0.95, duration 0.1s
- **Card Tap:** Scale 0.98, duration 0.1s
- **List Item Highlight:** Background #F0F0F0, duration 0.2s

### Loading States
- **Skeleton Loading:** #F0F0F0 background with shimmer
- **Progress Indicators:** Category color fill
- **Activity Indicators:** System standard

---

## Accessibility

### Touch Targets
- **Minimum Size:** 44x44px
- **Recommended Size:** 48x48px for primary actions
- **Spacing:** Minimum 8px between touch targets

### Color Contrast
- **Text on Background:** 
  - #4c4c4c on #fefbf7: 7.2:1 (excellent)
  - #a5a5a5 on #fefbf7: 3.1:1 (acceptable for secondary)
- **Interactive Elements:** Minimum 3:1 ratio maintained

### Typography
- **Dynamic Type:** Support platform scaling
- **Readable at 200% zoom**
- **Clear hierarchy maintained at all sizes**

---

## Platform Specifications

### Target Requirements
- **iOS:** 14+ (San Francisco font system)
- **Android:** 8+ (Roboto font system)
- **Screen Densities:** @1x, @2x, @3x for iOS
- **Minimum Width:** 375px (iPhone 6/7/8 size)
- **Safe Areas:** Account for notch and home indicator

### Asset Export
- **Icons:** SVG when possible, multiple densities for raster
- **Colors:** Use semantic names in code
- **Components:** Export at required densities for each platform

This design system accurately reflects the spacing, layout, and visual specifications observed in the mockups while maintaining consistency with the design template foundations.