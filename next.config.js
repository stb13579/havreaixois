/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker deployment
  // This creates a minimal production server with all dependencies
  output: 'standalone',
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
};
module.exports = nextConfig;
