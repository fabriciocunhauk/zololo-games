"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type FloatingBlob = {
  size: number;
  left: number;
  top: number;
  x: number;
  y: number;
  rotate: number;
  duration: number;
};

function createBlobs(count: number): FloatingBlob[] {
  return Array.from({ length: count }, () => ({
    size: Math.random() * 100 + 50,
    left: Math.random() * 100,
    top: Math.random() * 100,
    y: Math.random() * 100 - 50,
    x: Math.random() * 50 - 25,
    rotate: Math.random() * 360,
    duration: Math.random() * 10 + 10,
  }));
}

export default function FloatingBackground() {
  // Created after mount so server and client markup match.
  const [blobs, setBlobs] = useState<FloatingBlob[]>([]);
  useEffect(() => setBlobs(createBlobs(10)), []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 overflow-hidden pointer-events-none motion-reduce:hidden"
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-pink-200/30"
          style={{
            width: blob.size,
            height: blob.size,
            left: `${blob.left}%`,
            top: `${blob.top}%`,
          }}
          animate={{
            y: [0, blob.y],
            x: [0, blob.x],
            rotate: [0, blob.rotate],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
