export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-adhd-orange mb-4">Joidu</h3>
            <p className="text-gray-600 text-sm">
              Your ADHD-friendly application designed to help you stay focused and productive.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-adhd-orange transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-adhd-orange transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-adhd-orange transition-colors">Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-adhd-orange transition-colors">About</a></li>
              <li><a href="#" className="hover:text-adhd-orange transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-adhd-orange transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-adhd-orange transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-adhd-orange transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-adhd-orange transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-600">
            © 2024 Joidu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 