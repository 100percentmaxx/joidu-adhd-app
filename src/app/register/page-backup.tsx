import { SignUp } from '@clerk/nextjs'

/**
 * REGISTRATION PAGE WITH CLERK INTEGRATION
 * 
 * This is the main entry point for new users to create their Joidu account.
 * Uses Clerk's built-in SignUp component with custom styling to match
 * Joidu's branded design and ADHD-friendly user experience.
 * 
 * ROUTE: /register
 * 
 * USER FLOW:
 * 1. New user visits /register (entry point)
 * 2. Completes registration with Clerk's SignUp component
 * 3. Email verification handled automatically by Clerk
 * 4. Redirected to /onboarding for personalization setup
 * 5. Finally proceeds to main app experience
 * 
 * DESIGN FEATURES:
 * - Branded joidu_banner.svg for premium first impression
 * - Primary Blue background (#2847ef) for brand consistency
 * - White rounded form container (24px top corners)
 * - Custom Clerk styling to match Joidu design system
 * - ADHD-friendly visual hierarchy and spacing
 */
export default function RegisterPage() {
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
      
      {/* Registration Form Container */}
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
            Create Your Account
          </h1>
          <p 
            className="text-center mb-8 leading-relaxed"
            style={{ color: '#a5a5a5', fontSize: '15px' }}
          >
            Join thousands managing ADHD with confidence
          </p>
          
          <SignUp 
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
                alertClerkError: "text-[#f4b7ae] bg-red-50 border border-red-200 rounded-lg p-3 mb-4"
              },
              layout: {
                socialButtonsPlacement: "bottom",
                socialButtonsVariant: "blockButton"
              }
            }}
            redirectUrl="/onboarding"
            signInUrl="/sign-in"
          />
        </div>
      </div>
    </div>
  )
}