import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Deployed on Vercel — no 'output: export' needed (API routes require server)
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3bglobal.com",
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