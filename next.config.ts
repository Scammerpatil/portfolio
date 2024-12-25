import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "cdn.jsdelivr.net",
      },
      {
        hostname: "cdn.simpleicons.org",
      },
    ],
  },
};

export default nextConfig;
