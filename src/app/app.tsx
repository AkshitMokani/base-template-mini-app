"use client";

import { useEffect } from "react";
import { sdk } from "@farcaster/frame-sdk";

export default function Home() {
  useEffect(() => {
    // Tell Farcaster your app is ready
    sdk.actions.ready();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white">
      <h1 className="text-4xl font-bold mb-4">⚡ HyperMatch</h1>
      <p className="text-lg mb-8">Match, earn & vibe — now on Base!</p>

      <button
        onClick={() => alert("Game starting soon!")}
        className="px-6 py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 font-semibold text-white transition"
      >
        Start Game
      </button>
    </main>
  );
}
