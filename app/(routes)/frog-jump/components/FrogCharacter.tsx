"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import frogImage from "@/public/images/frog-jump/frog.png";

export default function FrogCharacter({ left }: { left: string }) {
  return (
    <motion.div
      className="absolute top-5 z-20 flex items-end justify-center w-12 h-12"
      initial={{ left, bottom: "8px", opacity: 0, x: "-50%" }}
      animate={{
        left,
        bottom: "8px",
        opacity: 1,
        x: "-50%",
        transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.2 },
      }}
    >
      <Image
        src={frogImage}
        alt="Frog"
        fill
        sizes="48px"
        className="object-contain drop-shadow-md"
      />
    </motion.div>
  );
}
