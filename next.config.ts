import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  typescript: {
    // Disable type checking during the build phase
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  webpack(config) {
    // Alias react to our polyfill to provide useEffectEvent for Sanity
    // Use the '$' suffix for an exact match so sub-modules like 'react/jsx-runtime' still work
    config.resolve.alias = {
      ...config.resolve.alias,
      'react$': path.resolve(__dirname, 'lib/react-polyfill.js'),
    };
    return config;
  },
};

export default nextConfig;
