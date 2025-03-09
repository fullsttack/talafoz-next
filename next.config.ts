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
    // Optimize images for better performance
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
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
      'lucide-react',
      'sonner',
      'tailwind-merge',
      'class-variance-authority',
      'clsx',
    ],
    // Add modern bundling for better tree-shaking
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  
  // Simplified webpack configuration with treeshaking improvements
  webpack: (config, { dev, isServer }) => {
    // Enable aggressive tree shaking
    if (!dev) {
      config.optimization.usedExports = true;
      
      // Reduce bundle size
      config.optimization.minimize = true;
      
      // Improve code splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 30,
        maxAsyncRequests: 30,
        minSize: 20000,
        maxSize: 244000, // ~240kb chunk size limit
      };
    }
    
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
