"use client";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";
import { sdk } from "@farcaster/frame-sdk";
import Image from "next/image";

const emojis = ["😎", "🤓", "🥳", "🤖", "🐵", "👑", "💥", "🧠"];

export default function HyperMatch() {
  const { address, isConnected } = useAccount();

  const [screen, setScreen] = useState<"intro" | "game" | "result">("intro");
  const [cards, setCards] = useState<{ id: number; emoji: string; flipped: boolean; matched: boolean }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [highest, setHighest] = useState<number>(0);
  const [time, setTime] = useState(60);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const storedHigh = localStorage.getItem("highestScore");
    if (storedHigh) setHighest(parseInt(storedHigh));
  }, []);

  const startGame = () => {
    if (!isConnected) {
      alert("Please connect your wallet first!");
      return;
    }

    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, flipped: false, matched: false }));
    setCards(shuffled);
    setScreen("game");
    setScore(0);
    setTime(60);
    const interval = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(interval);
          endGame();
        }
        return t - 1;
      });
    }, 1000);
    setTimer(interval);
  };

  const handleFlip = (index: number) => {
    if (flipped.length === 2 || cards[index].flipped || cards[index].matched) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        newCards[first].matched = true;
        newCards[second].matched = true;
        setCards(newCards);
        setScore((prev) => prev + 10);
      } else {
        setTimeout(() => {
          newCards[first].flipped = false;
          newCards[second].flipped = false;
          setCards([...newCards]);
        }, 800);
      }
      setFlipped([]);
    }

    if (newCards.every((c) => c.matched)) {
      endGame(true);
    }
  };

  const endGame = (won = false) => {
    if (timer) clearInterval(timer);
    let finalScore = score + time * 10;
    if (!won) finalScore = score;
    setScore(finalScore);
    if (finalScore > highest) {
      setHighest(finalScore);
      localStorage.setItem("highestScore", finalScore.toString());
    }
    setScreen("result");
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(
      `Just played HYPERMATCH 🎮 and scored ${score}! @akshit_mokani ⚡ 
Vibecoded at HYPERTHON by @roshanonx & @BasedIndia ⚡`
    );
    const url = encodeURIComponent("https://farcaster.xyz/miniapps/F4jnVmzDZXj8/hypermatch");
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
  };

  const shareOnFarcaster = async () => {
    const text = `Just played HYPERMATCH 🎮 and scored ${score}! @aksh ⚡  
Play now: https://farcaster.xyz/miniapps/F4jnVmzDZXj8/hypermatch`;
    try {
      await sdk.actions.composeCast({
        text: text,
        embeds: ["https://farcaster.xyz/miniapps/F4jnVmzDZXj8/hypermatch"],
      });
    } catch (error) {
      console.error("Failed to compose cast:", error);
      // Fallback to Warpcast URL if SDK fails
      const farcasterURL = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}`;
      window.open(farcasterURL, "_blank");
    }
  };

  const shareOnBase = () => {
    const text = `Just played HYPERMATCH 🎮 and scored ${score}!

Built for Base • aksh.farcaster.eth

Play now:
https://hypermatch.vercel.app/`;

    const baseURL = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}`;
    window.open(baseURL, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800 text-white p-4">
      {screen === "intro" && (
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold">⚡ HYPERMATCH ⚡</h1>
          <p className="text-lg">Flip cards, not relationships.</p>

          <div className="flex justify-center mt-4">
            <ConnectButton />
          </div>

          <div className="mt-6 text-left bg-white/20 p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">Rules:</h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Each match = +10 points</li>
              <li>Each remaining second = +10 points</li>
              <li>You have 60 seconds ⏳</li>
              <li>Connect your wallet to start</li>
            </ul>
          </div>

          <button
            onClick={startGame}
            className="mt-6 px-6 py-3 bg-yellow-400 text-black rounded-lg font-bold hover:bg-yellow-500"
          >
            🎮 Start Match
          </button>
        </div>
      )}

      {screen === "game" && (
        <div className="flex flex-col items-center">
          <div className="flex justify-between w-full max-w-md mb-4 text-lg font-semibold">
            <p>⏱ {time}s</p>
            <p>🏆 Score: {score}</p>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {cards.map((card, index) => (
              <div
                key={card.id}
                onClick={() => handleFlip(index)}
                className={`w-16 h-16 flex items-center justify-center text-3xl rounded-lg cursor-pointer transition-all duration-300 ${
                  card.flipped || card.matched ? "bg-white text-black" : "bg-black/30"
                }`}
              >
                {card.flipped || card.matched ? card.emoji : "❓"}
              </div>
            ))}
          </div>
        </div>
      )}

      {screen === "result" && (
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold">🎯 Game Over</h2>
          <p>Final Score: {score}</p>
          <p>Highest Score: {highest}</p>
          <div className="flex gap-3 justify-center mt-4">
            <button onClick={shareOnTwitter} className="bg-sky-400 px-4 py-2 rounded-lg text-black font-bold">
              🐦 Share on Twitter
            </button>
            <button onClick={shareOnFarcaster} className="bg-purple-500 px-4 py-2 rounded-lg text-white font-bold">
              📣 Share on Farcaster
            </button>
            <button onClick={shareOnBase} className="bg-blue-500 px-4 py-2 rounded-lg text-white font-bold">
              🔵 Share on Base
            </button>
          </div>
          <button
            onClick={startGame}
            className="mt-5 px-6 py-3 bg-yellow-400 text-black rounded-lg font-bold hover:bg-yellow-500"
          >
            🔁 Play Again
          </button>
        </div>
      )}
    </div>
  );
}
