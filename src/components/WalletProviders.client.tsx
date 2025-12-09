"use client";

import React from "react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { sdk } from "@farcaster/frame-sdk";
import "@rainbow-me/rainbowkit/styles.css";

// This file MUST NOT contain WagmiProvider or QueryClientProvider.
// Those are already in app/providers.tsx.

export default function WalletProviders({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    try {
      sdk.actions.ready();
    } catch {}
  }, []);

  return <RainbowKitProvider>{children}</RainbowKitProvider>;
}
