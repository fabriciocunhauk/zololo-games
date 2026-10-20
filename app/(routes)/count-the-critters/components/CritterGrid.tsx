"use client";
import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/app/components/Container";
import { classNames } from "@/app/utils/appearance";
import type { CritterRound } from "../utils/generateCritterRound";

function getGridColumns(count: number) {
  if (count <= 4) return "grid-cols-2";
  if (count <= 6) return "grid-cols-3";
  return "grid-cols-3 sm:grid-cols-4";
}

export default function CritterGrid({
  critters,
}: {
  critters: CritterRound<StaticImageData>["critters"];
}) {
  return (
    <Container
      size="sm"
      classes={{
        container: classNames(
          "grid place-items-center p-1 sm:p-3 gap-1 sm:gap-2 md:gap-3 w-full min-h-40 sm:h-60",
          "bg-blue-50/70 rounded-2xl shadow-inner",
          getGridColumns(critters.length)
        ),
      }}
    >
      <AnimatePresence mode="wait">
        {critters.map(({ image, tilt }, index) => (
          <motion.div
            key={index}
            data-testid="critter"
            initial={{ opacity: 0, scale: 0.5, rotate: tilt }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: tilt }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="relative flex items-center justify-center p-0.5 sm:p-1 w-full aspect-square max-w-14 max-h-14"
          >
            <Image
              src={image}
              alt={`Critter ${index + 1}`}
              fill
              sizes="56px"
              className="object-contain drop-shadow-md"
              priority
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </Container>
  );
}
