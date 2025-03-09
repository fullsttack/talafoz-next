/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic optimizations
  reactStrictMode: true,
  compress: true,
  
  // Output optimization 
  output: 'standalone',
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    minimumCacheTTL: 60,
    domains: ['img.freepik.com']
  },
  
  // Cache and performance optimizations
  poweredByHeader: false, // Remove X-Powered-By header
  generateEtags: true, // Enable ETag generation for caching
  
  // Static page generation optimization
  staticPageGenerationTimeout: 60, // Increase timeout for static page generation
  
  // Enable webpack bundle analyzer in production build
  webpack: (config, { dev, isServer }) => {
    // Only run bundle analyzer on client and in production build
    if (!dev && !isServer) {
      // Enable only in specific environments or when specifically requested
      const runBundleAnalyzer = process.env.ANALYZE === 'true';
      
      if (runBundleAnalyzer) {
        // Use dynamic import instead of require
        import('webpack-bundle-analyzer').then(({ BundleAnalyzerPlugin }) => {
          config.plugins.push(
            new BundleAnalyzerPlugin({
              analyzerMode: 'server',
              analyzerPort: 8888,
              openAnalyzer: true,
            })
          );
        });
      }
      
      // Add aggressive code splitting for larger chunks
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        maxSize: 70000,
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](@react|react|react-dom|next|scheduler)[\\/]/,
            priority: 40,
            // Only use these modules once
            reuseExistingChunk: true,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            priority: 30,
            name(module) {
              // Get the package name
              const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
              const packageName = match ? match[1] : "";
              return `npm.${packageName.replace('@', '')}`;
            },
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      };
      
      // Add terser plugin options for better compression
      if (config.optimization.minimizer) {
        config.optimization.minimizer.forEach((minimizer) => {
          if (minimizer.constructor.name === 'TerserPlugin') {
            minimizer.options.terserOptions = {
              ...minimizer.options.terserOptions,
              compress: {
                ...minimizer.options.terserOptions.compress,
                drop_console: true,
                pure_funcs: ['console.info', 'console.debug', 'console.warn'],
              },
            };
          }
        });
      }
    }

    return config;
  },
  
  // HTTP headers optimization
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=31536000',
          },
        ],
      },
    ];
  },
  
  // Performance hints
  eslint: {
    // Only warn for performance issues in development
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig; 