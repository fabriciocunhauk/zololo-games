"use client";
import { AnimatePresence, motion } from "framer-motion";

export default function CountdownOverlay({ countdown }: { countdown: number }) {
  return (
    <AnimatePresence>
      {countdown >= 0 && (
        <motion.div
          key="countdown-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-pink-300/70 flex items-center justify-center z-50"
        >
          <motion.div
            key={countdown}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-display text-white text-7xl xl:text-9xl drop-shadow-lg"
          >
            {countdown > 0 ? countdown : "GO!"}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
