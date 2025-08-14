# Joidu

An ADHD-friendly Next.js 14 application built with TypeScript, Tailwind CSS, and modern web technologies.

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with ADHD-friendly color scheme
- **Authentication** with Clerk
- **Database** with Prisma and SQLite
- **AI Integration** with Anthropic Claude
- **Backend as a Service** with Supabase
- **Modern UI Components** with Lucide React icons

## ADHD-Friendly Design

This application uses a carefully chosen color palette designed to be ADHD-friendly:

- **Primary Orange**: #fa772c - High contrast, attention-grabbing
- **Primary Blue**: #2847ef - Calming, professional
- **Background**: #fefbf7 - Soft, easy on the eyes

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd joidu
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual API keys and configuration.

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Environment Variables

Create a `.env.local` file with the following variables:

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

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/          # Reusable components
│   ├── ui/            # Base UI components
│   ├── layout/        # Layout components
│   └── features/      # Feature-specific components
├── lib/               # Utility libraries
├── hooks/             # Custom React hooks
├── stores/            # State management
├── types/             # TypeScript type definitions
└── styles/            # Additional styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push database schema
- `npm run db:studio` - Open Prisma Studio

## Technologies Used

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Database**: Prisma with SQLite
- **AI**: Anthropic Claude
- **Backend**: Supabase
- **Icons**: Lucide React
- **UI Utilities**: class-variance-authority, clsx, tailwind-merge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. 