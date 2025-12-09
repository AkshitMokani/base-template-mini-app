import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Next.js 16 Turbopack config
  turbopack: {
    resolveAlias: {
      "thread-stream/test": "false",
      "pino/test": "false",
    },
  },

  // ✅ Webpack override without types
  webpack(config) {
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    config.module.rules.push({
      test: /thread-stream\/test|pino\/test/,
      use: "ignore-loader",
    });

    return config;
  },

  // ❗ ESLint + TS configs removed (no longer supported in Next.js 16)
  // eslint: { ignoreDuringBuilds: true },
  // typescript: { ignoreBuildErrors: true },

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
