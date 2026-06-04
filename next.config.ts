import type { NextConfig } from "next";


const nextConfig: NextConfig = {

  output: 'export',

  trailingSlash: true,

  images: {

    unoptimized: true,

    remotePatterns: [

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

};

export default nextConfig;
