import { SignIn } from '@clerk/nextjs'

/**
 * SIGN-IN PAGE WITH CLERK INTEGRATION
 * 
 * Login page for existing Joidu users with the same branded design
 * as the registration screen. Uses Clerk's built-in SignIn component
 * with custom styling to maintain visual consistency.
 * 
 * ROUTE: /sign-in
 * 
 * USER FLOW:
 * 1. Existing user visits /sign-in
 * 2. Uses Clerk's SignIn component for authentication
 * 3. Redirected to main app (/) after successful login
 * 4. Can switch to registration if they don't have an account
 * 
 * DESIGN FEATURES:
 * - Branded joidu_banner.svg for consistency with registration
 * - Primary Blue background (#2847ef) for brand identity
 * - White rounded form container matching registration design
 * - Custom Clerk styling to match Joidu design system
 * - ADHD-friendly visual hierarchy and messaging
 */
export default function SignInPage() {
  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#2847ef' }}
    >
      {/* Branded Banner */}
      <div className="w-full">
        <img 
          src="/icons/joidu_banner.svg" 
          alt="Joidu - Activate Your Potential"
          className="w-full h-auto"
          style={{ display: 'block' }}
        />
      </div>
      
      {/* Sign-In Form Container */}
      <div 
        className="flex-1 px-5 py-8"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px 24px 0 0',
          marginTop: '-12px' // Slight overlap with banner
        }}
      >
        <div className="max-w-sm mx-auto w-full">
          <h1 
            className="text-2xl font-bold text-center mb-4"
            style={{ color: '#4c4c4c' }}
          >
            Welcome Back!
          </h1>
          <p 
            className="text-center mb-8 leading-relaxed"
            style={{ color: '#a5a5a5', fontSize: '15px' }}
          >
            Ready to tackle your day?
          </p>
          
          <SignIn 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-none bg-transparent p-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "border border-gray-200 text-gray-700 hover:bg-gray-50",
                formButtonPrimary: "bg-[#fa772c] hover:bg-[#e6692a] text-white font-medium py-3 rounded-lg text-base",
                formFieldInput: "border border-gray-200 focus:border-2 focus:border-[#2847ef] rounded-xl px-4 py-3 text-base",
                formFieldLabel: "text-[#4c4c4c] font-medium text-sm mb-2",
                identityPreviewText: "text-[#4c4c4c]",
                identityPreviewEditButton: "text-[#2847ef]",
                formResendCodeLink: "text-[#2847ef]",
                footerActionLink: "text-[#2847ef] hover:underline",
                otpCodeFieldInput: "border border-gray-200 focus:border-2 focus:border-[#2847ef] rounded-lg",
                formFieldErrorText: "text-[#f4b7ae] text-sm mt-1",
                alertClerkError: "text-[#f4b7ae] bg-red-50 border border-red-200 rounded-lg p-3 mb-4",
                forgotPasswordLink: "text-[#2847ef] hover:underline text-sm"
              },
              layout: {
                socialButtonsPlacement: "bottom",
                socialButtonsVariant: "blockButton"
              }
            }}
            redirectUrl="/"
            signUpUrl="/register"
          />
        </div>
      </div>
    </div>
  )
}