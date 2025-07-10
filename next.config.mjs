/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.themealdb.com'], // Add this line
    // remotePatterns: [new URL('www.themealdb.com')]
  },
};

export default nextConfig;
