import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd15f34w2p8l1cc.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'overfast-api.tekrop.fr',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
