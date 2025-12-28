import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.mapbox.com',
        pathname: '/styles/**',
      },
    ],
  },
};

export default nextConfig;
