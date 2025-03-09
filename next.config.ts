import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["avatar.vercel.sh"],
  },
  // Optimize bundle size by enabling compression
  compress: true,
  
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Optimize production build
  swcMinify: true,
  
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
    // Prefer smaller bundle sizes
    optimizeServerReact: true,
  },
  
  // Custom webpack configuration to optimize bundle size
  webpack: (config, { dev, isServer }) => {
    // Only apply optimizations for production builds
    if (!dev) {
      // Split chunks more aggressively for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          default: false,
          vendors: false,
          // Create a separate chunk for large libraries
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom|framer-motion)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // Create a commons chunk for modules used in multiple places
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            priority: 20,
          },
          // Create separate chunks for larger libraries
          lib: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            name(module: any) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`;
            },
            priority: 10,
          },
        },
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
