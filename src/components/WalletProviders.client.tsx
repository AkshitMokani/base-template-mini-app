"use client";

import React from "react";
import { WagmiProvider, http } from "wagmi";
import { base } from "wagmi/chains";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { sdk } from "@farcaster/frame-sdk";
import "@rainbow-me/rainbowkit/styles.css";

const config = getDefaultConfig({
  appName: "HyperMatch",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "YOUR_WALLETCONNECT_PROJECT_ID",
  chains: [base],
  transports: { [base.id]: http() },
});

const queryClient = new QueryClient();

export default function WalletProviders({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    try {
      sdk.actions.ready();
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
