import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Disable type checking during the build phase
    ignoreBuildErrors: true,
  },
  webpack(config) {
    // Optionally modify Webpack settings here
    return config;
  },
};

export default nextConfig;
