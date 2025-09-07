"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Button } from "antd";
import "../components/styles.css";

const moods = [
  "😀",
  "😢",
  "😡",
  "🤩",
  "😴",
  "😎",
  "🤔",
  "🥳",
  "😭",
  "😇",
  "😤",
  "🤯",
  "🥺",
  "😱",
  "😍",
  "😅",
  "😌",
  "🤒",
  "😷",
  "🤕",
  "🥶",
  "🥵",
  "😈",
  "👻",
  "🤡",
  "💩",
  "🤖",
  "🎉",
  "🔥",
  "🌊",
  "🌸",
  "🍕",
  "☕",
  "⚡",
  "❤️",
  "⭐",
];

// Pick 5 random target emojis to find
const pickTargets = (arr, count = 5) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const IconWithDynamicScale = ({ index, x, y, onClick, found }) => {
  const iconRef = useRef(null);

  const row = Math.floor(index / 6);
  const isOffsetRow = row % 2 === 1;

  const distance = useTransform([x, y], ([latestX, latestY]) => {
    if (!iconRef.current) return 1;
    const rect = iconRef.current.getBoundingClientRect();
    const iconCenterX = rect.left + rect.width / 3;
    const iconCenterY = rect.top + rect.height / 3;

    const watchface = document.getElementById("watchface");
    if (!watchface) return 1;

    const watchfaceRect = watchface.getBoundingClientRect();
    const distanceFromLeft = Math.max(0, iconCenterX - watchfaceRect.left);
    const distanceFromRight = Math.max(0, watchfaceRect.right - iconCenterX);
    const distanceFromTop = Math.max(0, iconCenterY - watchfaceRect.top);
    const distanceFromBottom = Math.max(0, watchfaceRect.bottom - iconCenterY);

    const minDistance = Math.min(
      distanceFromLeft,
      distanceFromRight,
      distanceFromTop,
      distanceFromBottom
    );

    const margin = 70;
    if (
      iconCenterX < watchfaceRect.left ||
      iconCenterX > watchfaceRect.right ||
      iconCenterY < watchfaceRect.top ||
      iconCenterY > watchfaceRect.bottom
    ) {
      return 0;
    }
    if (minDistance < margin) {
      return minDistance / margin;
    }
    return 1;
  });

  return (
    <motion.div
      ref={iconRef}
      onClick={() => onClick(moods[index])}
      style={{ scale: distance }}
      className={`icon cursor-pointer transition-all ${
        isOffsetRow ? "offset" : ""
      } ${found ? "opacity-30" : ""}`}
      whileTap={{ scale: 0.8 }}
    >
      {moods[index]}
    </motion.div>
  );
};

export default function GamePage({ count = 36 }) {
  const hexagons = Array.from({ length: count });
  const dragRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [time, setTime] = useState(30); // 60 seconds
  const [lives, setLives] = useState(3);
  const [targets, setTargets] = useState([]);
  const [found, setFound] = useState([]);
  const [status, setStatus] = useState("playing"); // playing | won | lost

  useEffect(() => {
    setTargets(pickTargets(moods, 5));
  }, []);

  useEffect(() => {
    if (status !== "playing") return;
    if (time <= 0) {
      setStatus("lost");
      return;
    }
    const timer = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [time, status]);

  const handleClick = (emoji) => {
    if (status !== "playing") return;

    if (targets.includes(emoji)) {
      if (!found.includes(emoji)) {
        setFound([...found, emoji]);
        if (found.length + 1 === targets.length) {
          setStatus("won");
        }
      }
    } else {
      setLives((l) => {
        if (l - 1 <= 0) {
          setStatus("lost");
          return 0;
        }
        return l - 1;
      });
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-start min-h-screen bg-black dark:bg-[#232325e6] p-4 pt-20">
      {/* Game HUD */}
      <div className="flex flex-col w-full max-w-3xl justify-between items-center mb-4 text-lg font-bold text-[#999]">
        <div className="w-full">⏱ {time}s</div>
        <div className="w-full">❤️ {lives}</div>
        <br />
        <br />
        <div className="w-full">
          🎯 Find:{" "}
          {targets.map((t) => (
            <span
              key={t}
              className={`mx-1 ${
                found.includes(t) ? "line-through opacity-50" : ""
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <br />
      {/* Honeycomb Game Board */}
      <div ref={dragRef} id="watchface" className="watchface border-2">
        <motion.div
          id="draggablegrid"
          drag
          dragConstraints={{
            left: -180,
            right: 180,
            top: -80,
            bottom: 80,
          }}
          style={{ x, y }}
          className="draggable-grid"
        >
          <div className="grid-container">
            {hexagons.map((_, index) => (
              <IconWithDynamicScale
                key={index}
                index={index}
                x={x}
                y={y}
                onClick={handleClick}
                found={found.includes(moods[index])}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Status Screen */}
      {status !== "playing" && (
        <div className="mt-6 text-center">
          {status === "won" ? (
            <h2 className="text-3xl font-bold text-green-600">🎉 You Win!</h2>
          ) : (
            <h2 className="text-3xl font-bold text-red-600">💀 Game Over!</h2>
          )}
          <Button
            className="mt-4"
            type="primary"
            onClick={() => {
              setTime(60);
              setLives(3);
              setFound([]);
              setTargets(pickTargets(moods, 5));
              setStatus("playing");
            }}
          >
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
}
