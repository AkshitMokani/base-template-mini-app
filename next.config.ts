import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Fix Turbopack crashes from pino + thread-stream
    serverComponentsExternalPackages: ["pino", "thread-stream"],
  },

  // Redirect farcaster.json to hosted manifest
  async redirects() {
    return [
      {
        source: "/.well-known/farcaster.json",
        destination:
          "https://api.farcaster.xyz/miniapps/hosted-manifest/019a8191-f580-1345-d65d-6ffec25d5057",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
