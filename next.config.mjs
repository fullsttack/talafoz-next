/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic optimizations
  reactStrictMode: true,
  compress: true,
  swcMinify: true,
  
  // Output optimization
  output: 'standalone',
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    minimumCacheTTL: 60,
  },
  
  // Enable webpack bundle analyzer in production build
  webpack: (config, { dev, isServer }) => {
    // Optimize fonts
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'static/fonts/',
          publicPath: '/_next/static/fonts/',
        },
      },
    });

    // Only run bundle analyzer on client and in production build
    if (!dev && !isServer) {
      // Enable only in specific environments or when specifically requested
      const runBundleAnalyzer = process.env.ANALYZE === 'true';
      
      if (runBundleAnalyzer) {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: 8888,
            openAnalyzer: true,
          })
        );
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
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`;
            },
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
          },
        },
      };
    }

    return config;
  },
  
  // Experimental features
  experimental: {
    // Enable server components - only if you're using them
    // appDir: true,
    // Optimize JS serialization
    serverActions: true,
    // Optimize font loading
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
  },
  
  // Performance hints
  eslint: {
    // Only warn for performance issues in development
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig; 