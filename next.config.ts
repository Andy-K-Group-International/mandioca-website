import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'imgservice.casai.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'itin-dev.wanderlogstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.hostelz.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
