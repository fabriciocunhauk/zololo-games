"use client";
import { motion } from "framer-motion";
import { classNames } from "@/app/utils/appearance";
import type { JumpProblem } from "../utils/generateJumpProblem";

export default function ProblemDisplay({
  start,
  operation,
  jump,
}: Pick<JumpProblem, "start" | "operation" | "jump">) {
  return (
    <motion.div
      key={`${start}-${operation}-${jump}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-8 text-center border-4 border-blue-400"
    >
      <p
        data-testid="jump-problem"
        className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-700"
      >
        Start at <span className="text-purple-600">{start}</span>, jump{" "}
        <span
          className={classNames(
            "font-extrabold",
            operation === "+" ? "text-green-600" : "text-red-600"
          )}
        >
          {operation}
        </span>{" "}
        <span className="text-orange-600">{jump}</span>.
      </p>
      <p className="text-lg sm:text-xl md:text-2xl font-semibold mt-2 text-gray-600">
        Where do you land?
      </p>
    </motion.div>
  );
}
