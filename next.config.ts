import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
  },
};

export default nextConfig;
