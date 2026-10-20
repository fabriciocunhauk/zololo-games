"use client";
import { motion } from "framer-motion";

const RULES = [
  "Solve the math problem that appears",
  "Pop the bubble with the correct answer",
  "Earn 10 points for each correct answer",
  "Be quick before the bubbles float away!",
] as const;

export default function StartScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 xl:p-8 mt-4 sm:mt-6 xl:mt-8 shadow-xl border-2 border-pink-300 max-w-md text-center"
    >
      <h2 className="font-display text-lg sm:text-xl xl:text-2xl text-pink-600 mb-4">
        How to play
      </h2>
      <ul className="list-disc list-inside text-left space-y-2 text-gray-700 mb-6 text-sm sm:text-base">
        {RULES.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>
      <p className="text-xs xl:text-sm text-gray-500">
        Perfect for ages 5–8 to practise basic maths.
      </p>
    </motion.div>
  );
}
