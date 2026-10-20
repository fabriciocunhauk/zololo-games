"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { classNames } from "@/app/utils/appearance";
import type { CardFace } from "../constants/cardImages";

type MemoryCardProps = {
  face: CardFace;
  position: number;
  isFaceUp: boolean;
  aspect: string;
  onFlip: () => void;
};

export default function MemoryCard({
  face,
  position,
  isFaceUp,
  aspect,
  onFlip,
}: MemoryCardProps) {
  return (
    <motion.button
      type="button"
      aria-label={isFaceUp ? face.name : `Card ${position}, face down`}
      className={classNames(
        "w-full max-w-[120px] sm:max-w-[140px] md:max-w-[160px] p-1 flex items-center justify-center cursor-pointer bg-white border-2 sm:border-4 border-pink-primary relative transition-transform duration-200 shadow-md sm:shadow-xl",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink",
        isFaceUp &&
          "hover:scale-105 hover:ring-2 sm:hover:ring-4 hover:ring-pink-primary/40",
        aspect
      )}
      onClick={onFlip}
      initial={false}
      animate={{ rotateY: isFaceUp ? 180 : 0 }}
      transition={{ duration: 0.1 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
    >
      <div className="w-full h-full" style={{ transformStyle: "preserve-3d" }}>
        <Image
          className="object-cover h-full w-full absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]"
          src={face.image}
          alt=""
        />
        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-pink-primary rounded text-white text-2xl sm:text-3xl font-display select-none [backface-visibility:hidden]">
          ?
        </div>
      </div>
    </motion.button>
  );
}
