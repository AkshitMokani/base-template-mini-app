"use client";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";
import { sdk } from "@farcaster/frame-sdk";

const emojis = ["😎", "🤓", "🥳", "🤖", "🐵", "👑", "💥", "🧠"];

export default function HyperMatch() {
  const { isConnected } = useAccount();

  const [screen, setScreen] = useState<"intro" | "game" | "result">("intro");
  const [cards, setCards] = useState<
    { id: number; emoji: string; flipped: boolean; matched: boolean }[]
  >([]);
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
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false,
      }));
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
    if (
      flipped.length === 2 ||
      cards[index].flipped ||
      cards[index].matched
    )
      return;

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
    let finalScore = score + (won ? time * 10 : 0);
    setScore(finalScore);
    if (finalScore > highest) {
      setHighest(finalScore);
      localStorage.setItem("highestScore", finalScore.toString());
    }
    setScreen("result");
  };

  // Share functions omitted for brevity, keep as you had them...

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-900 text-white p-6">
      {screen === "intro" && (
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-6xl font-extrabold tracking-wide drop-shadow-lg">
            ⚡ HYPERMATCH ⚡
          </h1>
          <p className="text-xl opacity-80">Flip cards, not relationships.</p>

          <div className="mx-auto">
            <ConnectButton />
          </div>


          <div className="bg-white/10 p-5 rounded-2xl text-left shadow-lg">
            <h2 className="text-2xl font-semibold mb-3">Rules:-</h2>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Each match = +10 points</li>
              <li>Each remaining second = +10 points</li>
              <li>You have 60 seconds ⏳</li>
              <li>Connect your wallet to start</li>
            </ul>
          </div>

          <button
            onClick={startGame}
            className="mt-4 w-full py-3 bg-yellow-400 text-black rounded-xl font-extrabold tracking-wide shadow-lg hover:bg-yellow-500 active:scale-95 transition-transform duration-150"
          >
            🎮 Start Match
          </button>
        </div>
      )}

      {screen === "game" && (
        <div className="flex flex-col items-center space-y-6">
          <div className="flex justify-between w-full max-w-md text-lg font-semibold tracking-wide px-2">
            <p>⏱ {time}s</p>
            <p>🏆 Score: {score}</p>
          </div>

          {/* Timer progress bar */}
          <div className="w-full max-w-md bg-white/20 rounded-full h-2 overflow-hidden mb-2">
            <div
              className="bg-yellow-400 h-2 transition-all duration-1000"
              style={{ width: `${(time / 60) * 100}%` }}
            />
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-4 gap-4 max-w-md">
            {cards.map((card, index) => (
              <div
                key={card.id}
                onClick={() => handleFlip(index)}
                className={`relative w-20 h-28 cursor-pointer perspective ${
                  card.flipped || card.matched
                    ? "cursor-default"
                    : "hover:scale-110"
                }`}
              >
                <div
                  className={`absolute w-full h-full rounded-xl shadow-lg transition-transform duration-500 transform-style-preserve-3d ${
                    card.flipped || card.matched ? "rotate-y-180" : ""
                  }`}
                >
                  {/* Front of card */}
                  <div className="absolute backface-hidden bg-white/90 text-black flex items-center justify-center text-4xl rounded-xl select-none">
                    {card.emoji}
                  </div>
                  {/* Back of card */}
                  <div className="absolute backface-hidden bg-gradient-to-tr from-purple-800 to-indigo-900 rounded-xl shadow-inner w-full h-full flex items-center justify-center text-4xl text-white">
                    ❓
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {screen === "result" && (
        <div className="max-w-md text-center space-y-5">
          <h2 className="text-4xl font-extrabold drop-shadow-lg">🎯 Game Over</h2>
          <p className="text-xl">
            Final Score: <span className="font-bold">{score}</span>
          </p>
          <p className="text-lg opacity-80">
            Highest Score: <span className="font-semibold">{highest}</span>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <button
              onClick={() => window.open(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `Just played HYPERMATCH 🎮 and scored ${score}!`
                )}`, "_blank")}
              className="bg-sky-400 px-5 py-3 rounded-xl text-black font-bold shadow-md hover:bg-sky-500 transition"
            >
              🐦 Twitter
            </button>
            <button
              onClick={async () => {
                try {
                  await sdk.actions.composeCast({
                    text: `Just played HYPERMATCH 🎮 and scored ${score}!`,
                    embeds: ["https://farcaster.xyz/miniapps/F4jnVmzDZXj8/hypermatch"],
                  });
                } catch {
                  window.open(
                    `https://warpcast.com/~/compose?text=${encodeURIComponent(
                      `Just played HYPERMATCH 🎮 and scored ${score}!`
                    )}`,
                    "_blank"
                  );
                }
              }}
              className="bg-purple-600 px-5 py-3 rounded-xl text-white font-bold shadow-md hover:bg-purple-700 transition"
            >
              📣 Farcaster
            </button>
            <button
              onClick={() => window.open(
                `https://warpcast.com/~/compose?text=${encodeURIComponent(
                  `Just played HYPERMATCH 🎮 and scored ${score}!`
                )}`, "_blank")}
              className="bg-blue-600 px-5 py-3 rounded-xl text-white font-bold shadow-md hover:bg-blue-700 transition"
            >
              🔵 Base
            </button>
          </div>

          <button
            onClick={startGame}
            className="mt-6 w-full py-3 bg-yellow-400 text-black rounded-xl font-extrabold shadow-lg hover:bg-yellow-500 active:scale-95 transition-transform duration-150"
          >
            🔁 Play Again
          </button>
        </div>
      )}

      {/* Custom styles for flip effect */}
      <style jsx>{`
        .perspective {
          perspective: 800px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      `}</style>
    </div>
  );
}
