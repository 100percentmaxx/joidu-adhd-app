import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-adhd-orange">
            Joidu
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-adhd-orange transition-colors">
              Home
            </Link>
            <Link href="/features" className="text-gray-700 hover:text-adhd-orange transition-colors">
              Features
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-adhd-orange transition-colors">
              About
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="secondary" size="sm">
              Sign In
            </Button>
            <Button size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
} 