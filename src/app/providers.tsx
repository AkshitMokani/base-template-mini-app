"use client";

import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "../lib/wagmi"; 
import { useEffect } from "react";
import { sdk } from "@farcaster/frame-sdk";

const WalletProviders = dynamic(
  () => import("../components/WalletProviders.client"),
  { ssr: false }
);

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      sdk.actions.ready();
    } catch {}
  }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <WalletProviders>{children}</WalletProviders>
      </QueryClientProvider>
    </WagmiProvider>
  );
}