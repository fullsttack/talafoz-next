/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable compression
  compress: true,
  
  // Use SWC minifier for faster builds
  swcMinify: true,
  
  // Improve static page generation
  output: 'standalone',
  
  // Add other existing configurations here
  // ... existing code ...
}

module.exports = nextConfig; 