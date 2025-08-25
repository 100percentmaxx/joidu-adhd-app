import { SignIn } from '@clerk/nextjs'

/**
 * SIGN-IN PAGE WITH CLERK INTEGRATION
 * 
 * Consistent styling with registration page:
 * - Proper banner sizing with 40px padding
 * - Single white container with 24px side margins  
 * - Fixed-width centered Sign In button
 * - Professional, cohesive appearance
 */
export default function SignInPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2847ef' }}>
      {/* Banner Section with Proper Padding */}
      <div className="p-10">
        <img 
          src="/icons/joidu_banner.svg" 
          alt="Joidu - Activate Your Potential"
          className="w-full h-auto max-h-30 object-contain mx-auto"
          style={{ maxHeight: '120px' }}
        />
      </div>
      
      {/* Single Form Container */}
      <div className="bg-white rounded-t-3xl mx-6 px-6 py-8 min-h-96">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Welcome Back!
          </h1>
          <p className="text-gray-500 mb-6 text-center text-sm">
            Ready to tackle your day?
          </p>
          
          <SignIn 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-none bg-transparent p-0 m-0",
                cardBox: "shadow-none border-none bg-transparent p-0 m-0",
                main: "bg-transparent p-0 m-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                formButtonPrimary: "bg-[#fa772c] hover:bg-[#e6692a] text-white !w-48 mx-auto block rounded-lg py-3 font-medium",
                formFieldInput: "border border-gray-200 focus:border-2 focus:border-[#2847ef] rounded-lg px-4 py-3 text-base w-full",
                formFieldLabel: "text-gray-700 font-medium text-sm mb-2",
                formFieldRow: "mb-4",
                identityPreviewText: "text-gray-700",
                identityPreviewEditButton: "text-[#2847ef]",
                formResendCodeLink: "text-[#2847ef]",
                footerActionLink: "text-[#2847ef] hover:underline",
                socialButtonsBlockButton: "border border-gray-300 hover:bg-gray-50 rounded-lg mb-2",
                otpCodeFieldInput: "border border-gray-200 focus:border-2 focus:border-[#2847ef] rounded-lg",
                formFieldErrorText: "text-red-500 text-sm mt-1",
                alertClerkError: "text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-4",
                formContainer: "bg-transparent p-0 m-0 shadow-none border-none",
                form: "bg-transparent p-0 m-0 shadow-none border-none",
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