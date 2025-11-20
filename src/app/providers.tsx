"use client";

import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { sdk } from "@farcaster/frame-sdk";

// Load wallet providers only on the client to avoid bundling native/mobile deps on the server.
const WalletProviders = dynamic(() => import("../components/WalletProviders.client"), { ssr: false });

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      sdk.actions.ready(); // tells Farcaster the app is ready
    } catch (e) {
      // ignore if sdk not available yet
    }
  }, []);

  return (
    <WalletProviders>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WalletProviders>
  );
}
