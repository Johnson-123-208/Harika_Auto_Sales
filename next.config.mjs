/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    remotePatterns: [],
    // Allow images from the public folder with special characters
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;

