import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // output: 'export',  ← REMOVED (was blocking server features)
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3bglobal.com",      // ← ADDED for blog images
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    cpus: 2,
    workerThreads: false,
  },
};

export default nextConfig;