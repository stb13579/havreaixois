/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static HTML export
  images: {
    unoptimized: true,
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
