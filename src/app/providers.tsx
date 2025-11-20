"use client";

import { WagmiProvider, http } from "wagmi";
import { base } from "wagmi/chains";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { sdk } from "@farcaster/frame-sdk";
import "@rainbow-me/rainbowkit/styles.css";

const config = getDefaultConfig({
  appName: "HyperMatch",
  projectId: "YOUR_WALLETCONNECT_PROJECT_ID",
  chains: [base],
  transports: { [base.id]: http() },
});

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    sdk.actions.ready(); // ✅ tells Farcaster the app is ready
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
