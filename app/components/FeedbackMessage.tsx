"use client";
import { AnimatePresence, motion } from "framer-motion";
import { classNames } from "@/app/utils/appearance";

export type Feedback = {
  tone: "success" | "error" | "info";
  text: string;
};

const toneClasses: Record<Feedback["tone"], string> = {
  success: "bg-leaf/50",
  error: "bg-pink-primary/50",
  info: "bg-sky/50",
};

export default function FeedbackMessage({
  feedback,
}: {
  feedback: Feedback | null;
}) {
  // The live region stays mounted so screen readers announce every message,
  // including the first one after it was empty.
  return (
    <div role="status">
      <AnimatePresence>
        {feedback && (
          <motion.p
            key="feedback"
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={classNames(
              "mt-4 sm:mt-8 px-4 py-2 sm:py-3 rounded-2xl border-[3px] border-ink text-ink text-base sm:text-xl md:text-2xl font-bold shadow-[0_4px_0_var(--color-ink)] text-center",
              toneClasses[feedback.tone]
            )}
          >
            {feedback.text}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
