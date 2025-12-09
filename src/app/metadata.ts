// src/app/metadata.ts

import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://hypermatch.vercel.app"),

  title: "⚡ HyperMatch",
  description:
    "Didn't match your soulmate IRL? Try your luck here 😏 — A fun Web3 memory game built at Hyperthon Ahmedabad.",

  openGraph: {
    title: "⚡ HyperMatch — Play the Web3 Memory Game!",
    description: "Match emojis, earn points, and flex your score on Farcaster & X 🎮",
    url: "https://hypermatch.vercel.app",
    siteName: "HyperMatch",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "⚡ HyperMatch — Web3 Memory Game",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "⚡ HyperMatch — Play the Web3 Memory Game!",
    description: "Match emojis, earn points, and flex your score on Farcaster & X 🎮",
    images: ["/og-image.png"],
    creator: "@akshit_mokani",
  },

  // ⭐ MINI APP + FRAME + BASE
  other: {
    // FRAME
    "fc:frame": "vNext",
    "fc:frame:image": "https://hypermatch.vercel.app/og-image.png",

    // Mini App (required)
    "fc:app:id": "F4jnVmzDZXj8",
    "fc:app:noindex": "false",

    // Launch button
    "fc:frame:button:1": "🎮 Play HyperMatch",
    "fc:frame:button:1:action": "launch_miniapp",
    "fc:frame:button:1:target": "hypermatch",

    // BASE APP PREVIEW
    "base:app:id": "6938574b4173bc2ae00fd646",
  },
};
