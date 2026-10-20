"use client";
import { motion } from "framer-motion";

export default function MathProblem({ problem }: { problem: string }) {
  return (
    <motion.div
      key={problem}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-lg text-center backdrop-blur-sm p-4"
    >
      <p
        data-testid="math-problem"
        className="font-display text-3xl xl:text-4xl text-pink-700"
      >
        {problem}
      </p>
    </motion.div>
  );
}
