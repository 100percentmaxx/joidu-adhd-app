# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Joidu is an ADHD-friendly Next.js 14 application focused on task management and productivity tools. The app is built with TypeScript, Tailwind CSS, and uses modern web technologies including Clerk for authentication, Prisma with SQLite for data persistence, and Anthropic Claude for AI integration.

## Development Commands

- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks
- `npm run db:generate` - Generate Prisma client after schema changes
- `npm run db:push` - Push database schema changes to SQLite
- `npm run db:studio` - Open Prisma Studio for database management

## Architecture & Key Patterns

### App Structure
- Uses Next.js 14 App Router architecture in `src/app/`
- Main navigation areas: Home (`/`), Tasks (`/tasks`), Focus (`/focus`), Habits (`/habits`), KaiHelp (`/kaihelp`)
- Fixed bottom tab navigation with active/inactive state management

### Component Organization
- **UI Components**: Base components in `src/components/ui/`
- **Layout Components**: Navigation and layout in `src/components/layout/`
- **Feature Components**: Feature-specific components in `src/components/features/`
- **Icon System**: Custom SVG icon system with active/inactive variants in `src/components/icons/`

### Database Layer
- Prisma ORM with SQLite database (`prisma/dev.db`)
- Global Prisma client instance in `src/lib/prisma.ts` with development mode optimization
- Basic User model defined, expandable for app features

### Styling System
- **ADHD-Friendly Design**: Carefully chosen color palette optimized for ADHD users
- **Primary Colors**: Orange (`#fa772c`) for attention, Blue (`#2847ef`) for calm
- **Background**: Soft background (`#fefbf7`) easy on the eyes
- **Category Colors**: Light/dark pairs for different task categories
- **Custom Spacing**: Micro to massive scale (4px to 64px)
- **Typography**: Defined font sizes from micro (10px) to display-large (34px)

### Icon Management
- SVG icons stored in both `/public/icons/` and `/src/joidu-icons/`
- Icon component system supports active/inactive variants for navigation
- Navigation icons automatically switch based on current route

## Required Environment Variables

```env
# Database
DATABASE_URL="file:./dev.db"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Anthropic
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

## Key Dependencies

- **Framework**: Next.js 14 with App Router
- **Authentication**: Clerk for user management
- **Database**: Prisma ORM with SQLite
- **AI Integration**: Anthropic SDK
- **Backend Services**: Supabase
- **Styling**: Tailwind CSS with custom ADHD-friendly design system
- **Icons**: Lucide React + custom SVG system
- **Utilities**: class-variance-authority, clsx, tailwind-merge

## Development Notes

- Database schema changes require `npm run db:generate` then `npm run db:push`
- Icon variants (active/inactive) are handled automatically by navigation components
- The app uses a mobile-first design with bottom tab navigation
- Custom Tailwind classes use `adhd-` prefix for brand-specific styling
- Component state management follows React best practices with hooks