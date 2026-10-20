"use client";
import { motion } from "framer-motion";

export default function ScoreDisplay({ score }: { score: number }) {
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border-2 border-pink-300"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-2xl font-bold text-center">
        Score:{" "}
        <span data-testid="score" className="font-extrabold text-pink-500">
          {score}
        </span>
      </div>
    </motion.div>
  );
}
