/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker deployment
  // This creates a minimal production server with all dependencies
  output: 'standalone',
  // Generate unique build ID to prevent cache mismatches
  generateBuildId: async () => {
    // Use timestamp + random string for unique build ID
    return `${Date.now()}-${Math.random().toString(36).substring(7)}`;
  },
  images: {
    unoptimized: true, // Keep this for Railway/Docker deployment
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'a0.muscache.com' }, // Airbnb CDN (if you later use it)
    ],
  },
  trailingSlash: true,
  // Enable detailed logging for debugging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // Show more detailed errors in development
  reactStrictMode: true,
  // Add headers to prevent caching issues with server actions
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
