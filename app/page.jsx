"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, message } from "antd";
import { SmileOutlined, ThunderboltOutlined } from "@ant-design/icons";
import Splash from "./components/Splash";

export default function Home() {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUserId(localStorage.getItem("cuid"));
    }
  }, []);

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-[#f5f0e3] to-[#cfbb8a] dark:bg-[#232325e6] justify-center max-w-screen noscroll">
      {/* <Splash /> */}
      <div className="w-screen p-4 noscroll">
        {contextHolder}
        <div className="w-full h-screen flex flex-col py-20 sm:py-32 items-center justify-start gap-8 noscroll text-center">
          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-gray-100"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            🔎 Find the Emoji, Beat the Clock!
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="max-w-2xl text-lg sm:text-xl text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Race against time to spot hidden emojis, challenge your friends, and
            climb the leaderboard in this fun & addictive web-based game.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Button
              type="primary"
              size="large"
              icon={<ThunderboltOutlined />}
              href="/home"
              className="px-8 py-6 text-lg font-semibold rounded-2xl shadow-lg"
            >
              Start Playing
            </Button>
            <Button
              size="large"
              icon={<SmileOutlined />}
              href="/home"
              className="px-8 py-6 text-lg font-semibold rounded-2xl shadow-md"
            >
              Try a Demo
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
