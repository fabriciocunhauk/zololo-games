"use client";
import { AnimatePresence, motion } from "framer-motion";
import { classNames } from "@/app/utils/appearance";

export type Feedback = {
  tone: "success" | "error";
  text: string;
};

const toneClasses: Record<Feedback["tone"], string> = {
  success: "bg-green-200 text-green-800 border-green-400",
  error: "bg-red-200 text-red-800 border-red-400",
};

export default function FeedbackMessage({
  feedback,
}: {
  feedback: Feedback | null;
}) {
  return (
    <AnimatePresence>
      {feedback && (
        <motion.div
          key="feedback"
          role="status"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={classNames(
            "mt-4 sm:mt-8 p-2 sm:p-3 rounded-xl border-4 text-base sm:text-xl md:text-2xl font-bold shadow-lg text-center",
            toneClasses[feedback.tone]
          )}
        >
          {feedback.text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
