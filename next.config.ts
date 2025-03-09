import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh',
      },
    ],
  },
  // Optimize bundle size by enabling compression
  compress: true,
  
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Set output mode for proper static assets
  output: 'standalone',
  
  // Optimize production build
  // swcMinify is removed as it's unrecognized in Next.js 15.1.6
  
  // Configure how Next.js handles JavaScript
  experimental: {
    // Optimize for modern browsers
    optimizeCss: true,
    // Improve code splitting
    optimizePackageImports: [
      'framer-motion',
      'lottie-react',
      '@tsparticles/react',
      '@tsparticles/slim',
      'embla-carousel-react',
    ],
    // Prefer smaller bundle sizes - remove optimizeServerReact as it may not be supported
  },
  
  // Simplified webpack configuration
  webpack: (config) => {
    return config;
  },
  
  // Configure headers for better caching and performance
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        // Cache static assets longer
        source: '/(.*)\.(jpg|jpeg|png|gif|webp|svg|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache JSON files (like Lottie animations)
        source: '/json/(.*).json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
