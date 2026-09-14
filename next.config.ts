// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "pub-cc04a5183a0c49ae9964bc2a84e92e21.r2.dev",
      },
    ],
  },
};

export default nextConfig;