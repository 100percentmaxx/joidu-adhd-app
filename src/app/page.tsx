import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Joidu
        </h1>
        <p className="text-gray-600 mb-6">
          ADHD-friendly task management app
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/register"
            className="block w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Create Account
          </Link>
          
          <Link 
            href="/sign-in"
            className="block w-full bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}