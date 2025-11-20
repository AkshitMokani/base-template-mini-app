// src/app/metadata.ts

export const metadata = {
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
        url: "og-image.png", // shorter, auto-resolved by metadataBase
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
    images: ["og-image.png"],
    creator: "@roshanonx",
  },

  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://hypermatch.vercel.app/og-image.png",
    "fc:frame:button:1": "🎮 Play Now",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": "https://hypermatch.vercel.app",
  },
};
