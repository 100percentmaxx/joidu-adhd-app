/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.clerk.dev', 'img.clerk.com'],
  },
  eslint: {
    // Temporarily disable ESLint during builds to focus on functionality
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Temporarily ignore build errors during development  
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig 